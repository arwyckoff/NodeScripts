import * as acorn from 'acorn';
import { expect } from 'chai';
import csv from 'csv-parser';
import * as fs from 'fs';
import { componentsWithCalculateValue, componentsWithDisplayJS, componentsWithoutCustomJS, componentsWithValidationJS } from './test-components';
import { BaseApplicationForLogic, ConditionalLogicResultType, ConversionErrorReport, ConversionExceptionTypes, ConversionOutcome, ConversionOutcomeReport, CustomJSLogicType, CustomValidationFromConversion, EvaluationType, FormDefinitionComponent, FormulaStepValueType, GlobalLogicGroup, GlobalValueLogicGroup, LogicColumn, LogicCondition, LogicGroup, OutcomeItem } from './typings';
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
 /**
   * Call a function for each component in the list and their children.
   *
   * This function will be passed the component, the path to the component, and the key of the parent component (if present).
   * If the function returns `true`, the recursion will stop
   *
   * @param components List of components to iterate over
   * @param fn Function to call for each component found
   * @param includeAll Fire `fn` on layout components
   */
  function eachComponent (
    components: FormDefinitionComponent[],
    fn: (component: FormDefinitionComponent, path: string, parentKey?: string) => any,
    includeAll: boolean = false
  ) {
    doEachComponent(components, fn, includeAll, '', null);
  }

  function doEachComponent (
    components: FormDefinitionComponent[],
    fn: (component: FormDefinitionComponent, path: string, parentKey?: string) => any,
    includeAll: boolean,
    path: string,
    parent: FormDefinitionComponent|null
  ) {
    path = path || '';
    components.forEach((component) => {
      if (!component) {
        return;
      }
      const hasColumns = component.columns && Array.isArray(component.columns);
      const hasRows = component.rows && Array.isArray(component.rows);
      const hasComps = component.components && Array.isArray(component.components);
      let noRecurse = false;
      const newPath = component.key ? (path ? (`${path}.${component.key}`) : component.key) : '';

      if (includeAll || (!hasColumns && !hasRows && !hasComps)) {
        noRecurse = fn(component, newPath, parent?.key);
      }

      const subPath = () => {
        if (
          component.key && component.type && 
          !['panel', 'table', 'well', 'columns', 'fieldset', 'tabs', 'form'].includes(component.type) &&
          (
            ['datagrid', 'container', 'editgrid'].includes(component.type)
          )
        ) {
          return newPath;
        } else if (
          component.key &&
          component.type === 'form'
        ) {
          return `${newPath}.data`;
        }

        return path;
      };

      if (!noRecurse) {
        if (hasColumns && component.columns) {
          component.columns.forEach((column) => {
            if (column.components) {
              return doEachComponent(column.components, fn, includeAll, subPath(), component);
            }
          });
        } else if (hasRows && component.rows) {
          component.rows.forEach((row) => {
            if (Array.isArray(row)) {
              row.forEach((column) => {
                if (column.components) {
                  return doEachComponent(column.components, fn, includeAll, subPath(), component);
                }
              });
            }
          });
        } else if (hasComps && component.components) {
          doEachComponent(component.components, fn, includeAll, subPath(), component);
        }
      }
    });
  }
  function writeFile (content: string, path: string) {
    fs.writeFileSync(path, content);
  }

enum CustomLogicProps {
  CALCULATED_VALUE = 'calculateValue',
  DISPLAY = 'customConditional',
  VALIDATION = 'customValidation'
}
// new error handling function that adds to list of errors

class ConversionValidationException extends Error {
  constructor (
    public errorType: ConversionExceptionTypes
  ) {
    super('CONVERSION EXCEPTION:' + errorType);
    this.errorType = errorType;
  }
}

export const standardFieldKeys = [
  'cashAmountRequested',
  'inKindAmountRequested',
  'attention',
  'designation',
  'decision2',
  'reviewerFundingRecommendation'
]

// ACORN TYPING
export interface SourceLocation {
  start: { line: number, column: number };
  end: { line: number, column: number };
}
export interface Position {

}
export enum NodeType {
  IDENTIFIER = 'Identifier', // variable or property 
  MEMBER_EXPRESSION = 'MemberExpression', // multiple identifiers like data.property
  ASSIGNMENT_EXPRESSION = 'AssignmentExpression', // can be =
  LITERAL = 'Literal', // something like 1, 'a', or false
  BINARY_EXPRESSION = 'BinaryExpression', // can be +-*/
  CONDITIONAL_EXPRESSION = 'ConditionalExpression', // common for validity since we return string if invalid
  LOGICAL_EXPRESSION = 'LogicalExpression'
}
// export interface Node {
//   type: NodeType;
//   start: number;
//   end: number;
//   loc: any;
//   name: string;
//   value: string|number|boolean,
//   raw: string
// };
export enum AcornOperator {
  EQUALS = '=',
  DOUBLE_EQUALS = '==',
  TRIPPLE_EQUALS = '===',
  GREATER_THAN_EQUALS = '>=',
  LESS_THAN_EQUALS = '<=',
  GREATER_THAN = '>',
  LESS_THAN = '<',
  OR = '||',
  AND = '&&',
  NOT_EQUALS = '!=',
  DOUBLE_NOT_EQUALS = '!==',
  PLUS = '+'
}

export interface AcornNode {
  name: string;
  type: NodeType;
  start: number;
  end: number;
  loc: SourceLocation;
  operator: AcornOperator;
  value: string|number|boolean;
  raw: string;
  property: any;
  object: any;
  left: AcornNode;
  right: AcornNode;
  test?: AcornNode;
  consequent?: AcornNode;
  alternate?: AcornNode;
}

// RULES FOR VALIDATION
// replace "input" with the actual referenceFields-blahblah
// for  validation, result type will be ConditionalLogicResultType.ValidationMessage


const JSParser: () => Promise<void> = async () => {
  const parserOptions: acorn.Options = {
    locations: true,
    ecmaVersion: 2020,
    sourceType: 'script',
  };
  const singleCondition = `valid = input <= 10000 ? true : 'Please enter an amount $10000 or less';`
  const twoConditions = `show = (data.sumOfAggregateFields === 0.50 && data.sumOfAggregateFields === 1.50);true;`
  const JS = singleCondition;

  function convertCustomJS (
    customJS: string,
    logicType: CustomJSLogicType,
    compType: string,
    customMessage: string|undefined,
    compKey: string,
    formDefs: string[]
  ): {result: any, resultType: 'setValue'|'formula'|'display'|'validation'}|void {
    const parsed = acorn.Parser.parseExpressionAt(customJS, 0, parserOptions) as unknown as AcornNode;

    // first we have to check that the JS has a structure like "variable ="
    // if this is not the case, we log the errors
    checkFirstNode(parsed);
    if (!compType) {
      throw new ConversionValidationException(
        ConversionExceptionTypes.NO_COMP_TYPE
      );
      // error that there are errors  or no comp type
    } else {
      // we should actually just validate that the properties are correct based on what's returned below
      try {
        switch (logicType) {
          case CustomJSLogicType.DISPLAY:
            const conditionalLogic = convertJSStringToLogicGroup(
              parsed.right,
              parsed,
              compType,
              compKey,
              formDefs
            );
            return {
              result: conditionalLogic,
              resultType: 'display'
            };

          case CustomJSLogicType.CALCULATED_VALUE:
            const result = getResultFromCalculateValueString(
              parsed.right,
              parsed,
              formDefs,
              compType
            );
            return result;

          case CustomJSLogicType.VALIDITY:
            const customValidation = convertJSStringToCustomValidation(
              parsed.right,
              compType,
              customMessage,
              formDefs
            );
            // the value may be on the left or right node or may be null
            const validationResult = getValidationResult(customValidation);

            return {
              result: validationResult,
              resultType: 'validation'
            }
            // new work that should get the validity logic and set the string on right node as result with result type being validationMessage
            break;
        }
        // console.info(JSONResponse);
      } catch (e) {
        if (e instanceof ConversionValidationException) {
          // console.log(e);
          return;
        }

        throw e;
      }
    }

    function getValidationResult(
      customValidation: CustomValidationFromConversion
    ) {
      const value = customValidation.leftChunk?.type == 'literal' ? customValidation.leftChunk?.literalVal : customValidation.rightChunk?.type == 'literal' ? customValidation.rightChunk?.literalVal : null;

      const validationResult = {
        evaluationType: EvaluationType.ConditionallyTrue,
        useAnd: false,
        identifier: nonce(),
        conditions: [{
          sourceColumn: customValidation.leftChunk?.columns,
          comparison: customValidation.comparison,
          identifier: nonce(),
          value,
          relatedColumn: customValidation.rightChunk?.columns
        }],
        resultType: ConditionalLogicResultType.VALIDATION_MESSAGE,
        result: customValidation.errorMsg
      };
      return validationResult;
    }
  }

  function scrubJSString (js: string) {
    // remove leading + from data
    const stringWithoutLeadingPlusOnData = js.replace(/((\+)\b(data)\b)/g, ' data')
    // remove || 0 from logic
    const stringWithoutOrZero = stringWithoutLeadingPlusOnData.replace(/(\|\|0)|(\|\| 0)/g, '')

    return stringWithoutOrZero;
  }
  
  /**
   * This will return the logic type e.g. validation/conditional value/dislay
   */
  function getLogicTypeFromNode (node: AcornNode): CustomJSLogicType|void {
    const name = node.left.name;
    let type;

    switch (name) {
      case 'valid':
        type = CustomJSLogicType.VALIDITY;
        break;
      case 'show':
        type = CustomJSLogicType.DISPLAY;
        break;
      case 'value':
        type = CustomJSLogicType.CALCULATED_VALUE;
        break;
    }

    if (!type) {

      return;
    }

    return type;
  }
  function convertJSStringToCustomValidation (
    node: AcornNode,
    compType: string,
    customMessage: string|undefined,
    formDefs: string[]
  ) {
    // ex. "valid = data.thing1 > value ? true : 'this is not right"
    let comparison;
    let errorMsg;
    let leftChunk;
    let rightChunk;
    // step 1: make sure structure is evalution ? true : string
    if (node.type === NodeType.CONDITIONAL_EXPRESSION) {
      if (node.test && node.consequent && node.alternate) {
        if ((node.test.type === NodeType.BINARY_EXPRESSION) &&
             node.consequent.type === NodeType.LITERAL &&
             node.alternate.type === NodeType.LITERAL
        ) {
          // get column or static value from left
          leftChunk = getValidationChunk(node, true, compType, formDefs);
          rightChunk = getValidationChunk(node, false, compType, formDefs);
          comparison = getComparison(node.test);

        } else {
          throw new ConversionValidationException(
            ConversionExceptionTypes.CONDITIONAL_EXPRESSION_TOO_COMPLEX
          );
        }

      } else {
        throw new ConversionValidationException(
          ConversionExceptionTypes.CONDITIONAL_EXPRESSION_MALFORMED
        );
      }
      // step 2: get string for error and add as resultType 2 and result as string
      if (node.consequent?.value === true) {
        if (typeof(node.alternate?.raw) === 'string') {
          errorMsg = node.alternate.value as string;
        } else {
          throw new ConversionValidationException(
            ConversionExceptionTypes.MISSING_ERROR_MESSAGE
          );        }
      } else if (node.alternate?.value === true) {
        if (typeof(node.alternate?.raw) === 'string') {
          errorMsg = node.consequent?.value as string;
        } else {
          throw new ConversionValidationException(
            ConversionExceptionTypes.MISSING_ERROR_MESSAGE
          );        }
      } else {
        throw new ConversionValidationException(
          ConversionExceptionTypes.ERROR_MESSAGE_SETUP_INCORRECTLY
        );
      }

      if (!errorMsg) {
        if (customMessage && typeof customMessage == "string") {
          errorMsg = customMessage;
        } else {
          throw new ConversionValidationException(
            ConversionExceptionTypes.MISSING_ERROR_MESSAGE
          );
        }
      }
    } else {
      throw new ConversionValidationException(
        ConversionExceptionTypes.VALIDATION_STRING_IS_NOT_CONDITIONAL
      );
    }

    return {
      leftChunk,
      rightChunk,
      comparison,
      errorMsg
    }

  }
  function convertJSStringToLogicGroup (
    node: AcornNode,
    parentNode: AcornNode,
    compType: string,
    compkey: string,
    formDefs: string[]
  ) :GlobalLogicGroup<BaseApplicationForLogic> {
    const conditions = getConditionsFromJSString(
      node,
      parentNode,
      compType,
      compkey,
      0,
      formDefs
    ) as any;
    return {
        evaluationType: EvaluationType.ConditionallyTrue,
        useAnd: false,
        identifier: nonce(),
        conditions: [conditions]
      }
    }

  function recursGetColumnsForMathString(node: AcornNode, formDefs: string[], compType: string): any[] {
    const values = [];
    if (node.left.left && node.left.operator === AcornOperator.PLUS) {
      const baseCol = getColumn(node, false, undefined, formDefs, compType);
      values.push(
        ...recursGetColumnsForMathString(node.left, formDefs, compType),
        baseCol
      )
    } else if (node.operator === AcornOperator.PLUS) {
      const leftCol = getColumn(node, true, undefined, formDefs, compType);
      const rightCol = getColumn(node, false, undefined, formDefs, compType);
      values.push(leftCol, rightCol);
    }
    return values;
  }

  function getFormulaFromBinaryExpressionNode (node: AcornNode, formDefs: string[], compType: string): any {
    const values = recursGetColumnsForMathString(node, formDefs, compType);
    const adaptedValues = values.map((col) => {
      return {
        value: col.join('.'),
        type: FormulaStepValueType.ParentValue
      }
    })
    return {
      step: {
        type: 0,
        values: adaptedValues
      }
    }
  }
  function getSetValueFromJSString (
    node: AcornNode,
    parentNode: AcornNode,
    formDefs: string[],
    compType: string
  ): GlobalValueLogicGroup<string|number|boolean|string[], string|number|boolean|string[]>|void {
    if (node.type === NodeType.LITERAL) {
      // if type is Literal, this is set value and is static
      // this will end up using conditional value
      return {
        conditions: [],
        evaluationType: EvaluationType.AlwaysTrue,
        identifier: nonce(),
        result: node.value,
        resultType: ConditionalLogicResultType.STATIC_VALUE,
        useAnd: false
      }
    } else if (node.type === NodeType.MEMBER_EXPRESSION) {
    // if type is memberExpression, this is setting to the value of another field like value = data.thing1, this is set value and is based on another form field
    const column = getColumn(parentNode, false, undefined, formDefs, compType);
    return {
      conditions: [],
      evaluationType: EvaluationType.AlwaysTrue,
      identifier: nonce(),
      result: column,
      resultType: ConditionalLogicResultType.OTHER_COLUMN,
      useAnd: false
    }

    } else {
      // some type of error
      
    }

  }
  function getResultFromCalculateValueString (
    node: AcornNode,
    parentNode: AcornNode,
    formDefs: string[],
    compType: string
  ): {
    result: any,
    resultType: 'setValue'|'formula'
  } {
    let result;
    if (node.type === NodeType.BINARY_EXPRESSION) {
      result = getFormulaFromBinaryExpressionNode(node, formDefs, compType)
      return {
        result,
        resultType: 'formula'
      }
    } else {
      result = getSetValueFromJSString(node, parentNode, formDefs, compType);
      return {
        result,
        resultType: 'setValue'
      }
    }
  }
  function getConditionsFromJSString (
    node: AcornNode, 
    parentNode: AcornNode, 
    compType: string,
    compKey: string,
    depth: number,
    formDefs: string[]
  ): LogicGroup<BaseApplicationForLogic>|LogicCondition<BaseApplicationForLogic, LogicColumn<BaseApplicationForLogic>> {
    let conditions;
    let comparison;
    let sourceColumn;
    let relatedColumn;
    let value;
    let useAnd;
    const multipleConditionsCheck = checkForMultipleConditions(
      node,
      parentNode
    );
    // if (compKey === 'referenceFields-financialcontent' || compKey === 'financialcontent') {
    //   console.log(multipleConditionsCheck.isMultipleConditions)

      // asdf === 'asdf' || (asdf === 'asdf' || asdf === 'asdf')
      // asdf || asdf || asdf

    // }
    if (multipleConditionsCheck.isMultipleConditions) {
      let left = node.left;
      let right = node.right;
      const leftCondition = left ? getConditionsFromJSString(left, node, compType, compKey, depth + 1, formDefs) : [];
      const rightCondition = right ? getConditionsFromJSString(right, node, compType, compKey, depth + 1, formDefs) : []; 
      
      conditions = [
        leftCondition,
        rightCondition
      ];


      // something === 'asdf' || somethingElse === 'fdas' || somethingEvenElse === 'fdsaasdf';

      // (something === 'asdf' || somethingElse === 'fdsa') || somethingEvenElse === 'fdasasdf';
      if (node.operator === right.operator) {
        conditions = [
          ...(rightCondition as LogicGroup<unknown>).conditions,
          leftCondition
        ];
      } else if (node.operator === left.operator) {
        conditions = [
          ...(leftCondition as LogicGroup<unknown>).conditions,
          rightCondition
        ];
      } else {
        conditions = [
          leftCondition,
          rightCondition
        ];
      }
      // if (compKey === 'referenceFields-financialcontent' || compKey === 'financialcontent') {
      //   console.log(conditions)
      // }
    } else {
    }
    comparison = getComparison(node);
    sourceColumn = getColumn(node, true, compKey, formDefs, compType);
    relatedColumn = getColumn(node, false, compKey, formDefs, compType);
    value = getValue(node);
    useAnd = multipleConditionsCheck.useAnd;

    let response =  {
      conditions,
      comparison,
      sourceColumn,
      relatedColumn,
      value,
      identifier: nonce(),
      useAnd: useAnd ?? false
    } as any;
    // removes properties that are null or undefined
    Object.keys(response)
      .forEach((key: string) => {
        if (response[key] == null || !response[key] || !response[key]?.length) {

          delete response[key];
        }
      });

    return response;
  }

  function getValue (
    node: AcornNode
  ) {
    const hasValue = node.right?.type === NodeType.LITERAL
    // if node.right,type is Literal, return the value
    if (hasValue) {
      return node.right.value ?? null;
    }
  }
  function checkForCompOnFormDefs (
    formDefs: any[],
    prop: string
  ) {
    return formDefs.some((formDef) => {
      return formDef.components.some((component: any) => {
        return component.key == prop
      })
    })
  }
  function getColumn (
    node: AcornNode,
    evaluateLeft: boolean,
    compKey: string|undefined,
    formDefs: any[],
    compType: string
  ): string[] {
    // validate that it exists on form
    const logicalGroup = evaluateLeft ? node.left : node.right;
    const obj = logicalGroup?.object?.name ?? false;
    const prop = logicalGroup?.property?.name ?? false;
    let root: 'referenceFields'|'application';

    if (obj && prop) {
      const passes = checkForCompOnFormDefs(formDefs, prop);
      if (passes) {
        if (standardFieldKeys.includes(prop)) {
          root = 'application';
        } else {
          root = 'referenceFields';
        }
        return [root, prop];
      } else {
        console.log('no pass')
        throw new ConversionValidationException(
          ConversionExceptionTypes.COMPONENT_NOT_ON_FORM
        );
      }

    } else {
      return [];
    }

  }
  /**
   * 
   * @param node Acorn node from acorn.parse
   * @returns the GC/NPP/YC logic rule equivalent of a logical operator
   */
  function getComparison (node: AcornNode) {
    // TODO?: includes/contains
    const operator = node.operator;
    switch (operator) {
      case '==':
      case '===':
        return 'eq';
      case '!==':
      case '!=':
        return 'ne';
      case '>':
        return 'gt';
      case '<':
        return 'lt';
      case '>=':
        return 'ge';
      case '<=':
        return 'le';
    }
  }
  /**
   * 
   * @param node Acorn node from Acorn.parse
   * @returns boolean for whether multiple conditions are present and a boolean for whether the multiple conditions are joined by '&&'
   */
  function checkForMultipleConditions (node: AcornNode, parentNode: AcornNode) {
    const useAnd = parentNode.operator === AcornOperator.AND;

    return {
      isMultipleConditions: node.operator == AcornOperator.OR || node.operator === AcornOperator.AND,
      useAnd
    }
  }
  /**
   * 
   * @param node Acorn node from Acorn.parse
   * @returns an array of error strings based on possible malformed logic scenarios (e.g. data > 2 or 5 = 3)
   */
  function checkFirstNode (node: AcornNode) {
    const operatorIsEquals = node.operator === AcornOperator.EQUALS;
    const typeIsAssignment = node.type === NodeType.ASSIGNMENT_EXPRESSION;
    if (!operatorIsEquals) {
      throw new ConversionValidationException(
        ConversionExceptionTypes.BASE_OP_NOT_EQUALS
      );
    }
    if (!typeIsAssignment) {
      throw new ConversionValidationException(
        ConversionExceptionTypes.FIRST_NODE_NOT_ASSIGNMENT
      );
    }
  }
  /**
   * 
   * @param name name returned from acorn parsing as the left side of an identifier
   * @returns the type of logic based on the name used in the logic (e.g. returns 'visibility' if the property being assigned a value is 'show')
   */
  function getTypeOfLogic (name: string) {
    switch (name) {
      case 'show':
        return 'visibility'
    }
  }
  /**
   * 
   * @returns a guid used to identify a condition
   */
  function nonce () {
    const guidHolder = 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxxxxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx';
    const hex = '0123456789abcdef';
    let r = 0;
    let guidResponse = '';
    for (const guidChar of guidHolder) {
      if (guidChar !== '-' && guidChar !== '4') {
        // each x and y needs to be random
        // eslint-disable-next-line no-bitwise
        r = Math.random() * 16 | 0;
      }

      if (guidChar === 'x') {
        guidResponse += hex[r];
      } else if (guidChar === 'y') {
        // clock-seq-and-reserved first hex is filtered and remaining hex values are random
        // eslint-disable-next-line no-bitwise
        r &= 0x3; // bit and with 0011 to set pos 2 to zero ?0??
        // eslint-disable-next-line no-bitwise
        r |= 0x8; // set pos 3 to 1 as 1???
        guidResponse += hex[r];
      } else {
        guidResponse += guidChar;
      }
    }

    return guidResponse;
  }
  // take form definition and look for values here:
  CustomLogicProps;
  // for each of these with a value, pass component to method that removes CustomLogicProps data and replaces it with our logic
  // method should take component and type of logic
  // UNIT TESTS
  const testing = true;
  if (testing) {

    // components without any custom JS
    const componentsWithoutJSResults = convertArrayOfFormDefs(componentsWithoutCustomJS as any);
    // should have no results because no logic
    expect(componentsWithoutJSResults.conversionErrorReport).to.equal('{}');
    expect(componentsWithoutJSResults.conversionOutcomeReport).to.equal('{}');

    // components with validation
    const componentsWithValidationResults = convertArrayOfFormDefs(componentsWithValidationJS as any);
    const validationResultsParsed = JSON.parse(componentsWithValidationResults.conversionOutcomeReport);
    const validationPasses = everyResultItemMatchesOutcomeAndType(
      validationResultsParsed,
      ConversionOutcome.SUCCESS,
      CustomJSLogicType.VALIDITY
      );
    // should not have any errors
    expect(componentsWithValidationResults.conversionErrorReport).to.equal('{}');
    // all conversions should pass
    expect(validationPasses).to.be.true;


    // components with display
    const componentsWithDisplayResults = convertArrayOfFormDefs(componentsWithDisplayJS as any);
    const displayResultsParsed = JSON.parse(componentsWithDisplayResults.conversionOutcomeReport);
    const displayPasses = everyResultItemMatchesOutcomeAndType(
      displayResultsParsed,
      ConversionOutcome.SUCCESS,
      CustomJSLogicType.DISPLAY
      );
    // should not have any errors
    expect(componentsWithDisplayResults.conversionErrorReport).to.equal('{}');
    // all conversions should pass
    expect(displayPasses).to.be.true;

    // components with calculateValue
    const componentsWithCalculateValueResults = convertArrayOfFormDefs(
      componentsWithCalculateValue as any
    )
    const calculateValueResultsParsed = JSON.parse(componentsWithCalculateValueResults.conversionOutcomeReport);
    const calculateValuePasses = everyResultItemMatchesOutcomeAndType(
      calculateValueResultsParsed,
      ConversionOutcome.SUCCESS,
      CustomJSLogicType.CALCULATED_VALUE
    );
    // should not have any errors
    expect(componentsWithCalculateValueResults.conversionErrorReport).to.equal('{}');
    // all conversions should pass
    expect(calculateValuePasses).to.be.true;
  }
  // CONVERSION
  let data: any[] = [];
  if (!testing) {
    fs.createReadStream(
      '/Users/drew.wyckoff/Projects/Node scripts/src/conversion_forms_qa.csv'
    )
      .pipe(csv())
      .on('data', (chunk) => {
        try {
          const formDef = JSON.parse(chunk.definition);
  
          const arrayOfFormDef = formDef instanceof Array ? formDef : [formDef];
          let conversionResult = convertArrayOfFormDefs(arrayOfFormDef);
          const result = {
            ...chunk,
            ...conversionResult
          }
          data.push(result)
        } catch (e) {
          // really bad error, can't even read it as a JSON object
        }
      })
      .on('end', () => {
        const csvWriter = createCsvWriter({
          path: '/Users/drew.wyckoff/Projects/Node scripts/src/conversion_forms_qa_output.csv',
          header: [
              {id: 'clientId', title: 'clientId'},
              {id: 'clientName', title: 'clientName'},
              {id: 'formName', title: 'formName'},
              {id: 'formId', title: 'formId'},
              {id: 'formRevisionId', title: 'formRevisionId'},
              {id: 'version', title: 'version'},
              {id: 'definition', title: 'definition'},
              {id: 'conversionOutcomeReport', title: 'conversionOutcomeReport'},
              {id: 'conversionErrorReport', title: 'conversionErrorReport'}
          ]
      });
      csvWriter.writeRecords(data)
      .then( () => {
        console.log('done, tada!')
      })
        // TODO get these headers right
        // const headers = [
        //   'clientId',
        //   'clientName',
        //   'formName',
        //   'formId',
        //   'formRevisionId', 
        //   'version',
        //   'definition'
        // ];
        // const arrayOfData = stringify([
        //   ...headers,
        //   ...data
        // ])
        // fs.writeFileSync('/Users/drew.wyckoff/Projects/Node scripts/src/conversion_forms_qa_output.csv', arrayOfData);
   
      })
  }
  function convertArrayOfFormDefs (arrayOfFormDef: string[]) {
    let conversionResult = convertFormDefinitions(arrayOfFormDef);
    // add columns for conversion types
    // validation converted
    // display converted
    // 
    // if no outcomes don't add form def
    const stringifyDef = JSON.stringify(conversionResult.formDefs);
    const conversionOutcomeReport = JSON.stringify(conversionResult.conversionOutcomeReport);
    const conversionErrorReport = JSON.stringify(conversionResult.conversionErrorReport);

    const updatedFormResult = {
      definition: stringifyDef,
      conversionOutcomeReport,
      conversionErrorReport
    }

    return updatedFormResult;
  }
  function everyResultItemMatchesOutcomeAndType (
    resultObj: any,
    outcome: ConversionOutcome,
    type: CustomJSLogicType
  ) {
    const passes = Object.keys(resultObj).every((key) => {
      const matchesType = resultObj[key].filter((outcomeItem: OutcomeItem) => outcomeItem.type == type);
      const onlyOneMatchesType = matchesType.length == 1;
      const matchesOutcome = matchesType.every((outcomeItem: OutcomeItem) => outcomeItem.outcome == outcome);

      return onlyOneMatchesType && matchesOutcome;
    })

    return passes;
  }
  function getValidationChunk(
    node: AcornNode,
    evaluateLeft: boolean,
    compType: string,
    formDefs: string[]
  ) {
    let validationChunk: {
      type: 'column' | 'value' | 'literal',
      columns: string[],
      literalVal: any;
      isValue: boolean
    } = {
      type: 'column',
      columns: [],
      literalVal: null,
      isValue: false
    };
    const evaluationNode = evaluateLeft ? node.test?.left : node.test?.right;
    if (node && node.test) {
      if (evaluationNode?.type === NodeType.IDENTIFIER) {
        // this should be value
        if (evaluationNode.name === "value") {
          validationChunk.type = 'value';
          validationChunk.isValue = true;
          validationChunk.columns = compType.split('-');
          // this is the ref field itself
        } else {
          throw new ConversionValidationException(ConversionExceptionTypes.UNKNOWN_VARIABLE_DECLARED)
        }
      } else if (evaluationNode?.type === NodeType.MEMBER_EXPRESSION) {
        // this is columns
        const columns = getColumn(node.test, evaluateLeft, undefined, formDefs, compType);
        if (columns.length) {
          validationChunk.type = 'column';
          validationChunk.columns = columns;
          // this is a form field
        } else {
          throw new ConversionValidationException(ConversionExceptionTypes.UNKNOWN_PROPERTY_ON_FORM_DATA)
        }
      } else if (evaluationNode?.type === NodeType.LITERAL) {
        if (evaluationNode.value) {
          validationChunk.type = 'literal';
          validationChunk.literalVal = evaluationNode.value;
          // this is a static value
        } else {
          throw new ConversionValidationException(ConversionExceptionTypes.NO_VALUE_FOR_LITERAL_EXPRESSION)
        }
      } else {
        throw new ConversionValidationException(ConversionExceptionTypes.UNSUPPORTED_EVALUATION_FOR_VALIDATION)
      }

    } else {
      throw new ConversionValidationException(ConversionExceptionTypes.UNKNOWN_VALIDATION_ERROR)
    }

    return validationChunk;
  }
  function addConversionErrorToReport (
    conversionErrorReport: ConversionErrorReport,
    fieldName: string,
    errorType: ConversionExceptionTypes
  ): ConversionErrorReport {
    if (conversionErrorReport[fieldName]) {
      conversionErrorReport[fieldName].push({
        errorType
      })
    } else {
      conversionErrorReport[fieldName] = [({
        errorType
      })]
    }
    return conversionErrorReport;
  }
  function addConversionOutcomeToReport (
    conversionOutcomeReport: ConversionOutcomeReport,
    fieldName: string,
    outcome: ConversionOutcome,
    type: CustomJSLogicType
    ): ConversionOutcomeReport {
      if (conversionOutcomeReport[fieldName]) {
        conversionOutcomeReport[fieldName].push({
          outcome,
          type
        })
      } else {
        conversionOutcomeReport[fieldName] = [({
          outcome,
          type
        })]
      }
      
      return conversionOutcomeReport;
  }

  /**
   * TEST ME!
   * 
   * (o)     (o)
   *  '       '
   *      W
   *   _______
   *  /       \ 
   */

  function convertFormDefinitions (defs: any[]) {
    const conversionOutcomeReport: ConversionOutcomeReport = {};
    const conversionErrorReport: ConversionErrorReport = {};
    const formDefs = defs.map((formDef: any) => {
      // let adaptedComps: FormDefinitionComponent[] = [];
      try {
        eachComponent(formDef.components, (comp) => {
          try {
            // Attempt to convert each component
            if (comp.customConditional || comp.calculateValue || comp.validate?.custom) {
              if (comp.customConditional) {
                const cleanCustomConditional = scrubJSString(comp.customConditional);
                const conditionalLogic = convertCustomJS(
                  cleanCustomConditional,
                  CustomJSLogicType.DISPLAY,
                  comp.type,
                  undefined,
                  comp.key,
                  defs
                );
                if (conditionalLogic && conditionalLogic.result) {
                  comp.conditionalLogic = conditionalLogic.result as any;
                  delete comp.customConditional;
                  addConversionOutcomeToReport(
                    conversionOutcomeReport,
                    comp.type,
                    ConversionOutcome.SUCCESS,
                    CustomJSLogicType.DISPLAY
                  )
                }
              }
        
              if (comp.calculateValue) {
                const cleanCalculateValue = scrubJSString(comp.calculateValue);
                const conditionalValue = convertCustomJS(
                  cleanCalculateValue,
                  CustomJSLogicType.CALCULATED_VALUE,
                  comp.type,
                  undefined,
                  comp.key,
                  defs
                );
                if (conditionalValue && conditionalValue.result) {
                  switch (conditionalValue.resultType) {
                    case 'formula':
                      const refFieldProp = comp.type?.split('-').join('.');
                      const formula = {
                        property: refFieldProp,
                        step: conditionalValue.result
                      };
                      comp.formula = formula;
                      delete comp.calculateValue;
                      break;
                    case 'setValue':
                      comp.conditionalValue = conditionalValue.result as any;
                      delete comp.calculateValue;
                      break;
                  }
                  addConversionOutcomeToReport(
                    conversionOutcomeReport,
                    comp.type,
                    ConversionOutcome.SUCCESS,
                    CustomJSLogicType.CALCULATED_VALUE
                  )
                }
              }
        
              if (comp.validate?.custom) {
                const cleanValidationString = scrubJSString(comp.validate.custom);
                const customValidation = convertCustomJS(
                  cleanValidationString,
                  CustomJSLogicType.VALIDITY,
                  comp.type,
                  comp.validate?.customMessage,
                  comp.key,
                  defs
                );
                if (customValidation) {
                  // if custom validation chunk is value, map to ref field prop
                  comp.customValidation = customValidation as any;
                  delete comp.calculateValue;
                  addConversionOutcomeToReport(
                    conversionOutcomeReport,
                    comp.type,
                    ConversionOutcome.SUCCESS,
                    CustomJSLogicType.VALIDITY
                  )
                }
              }
            } else {
              // skipped
            }
          } catch (e) {
            // console.log(e)
            const error = e as any;
            if ('errorType' in error) {
              // console.log(error.errorType)
              addConversionErrorToReport(
                conversionErrorReport,
                comp.type,
                error.errorType
              )
            } else {
              addConversionErrorToReport(
                conversionErrorReport,
                comp.type,
                ConversionExceptionTypes.UNKOWN_ERROR
              )
            }
            // add error with addConversionOutcomeToReport
            // use switch case based 
            // if e.instance of
            // console.log(e);
            // convert e into something useful for conversion outcome report
            // addConversionOutcomeToReport(
            //   conversionOutcomeReport,
            //   comp.type,
            //   ConversionOutcome.FAILURE,
            //   null
            // )
            
          }
        });
        // save adaptedComps to csv

        return formDef
      } catch (e) {
        // error adapting comp
      }
    });
    const result = {
      formDefs,
      conversionOutcomeReport,
      conversionErrorReport
    }
    return result;

  }
};

JSParser();

// GC TYPING


// EX CONDITION
// conditions: [
//   {
//     comparison: "ge"
//     identifier: "ff7b60a69813411ba70c56bd605e2c1d761bf0182ee7411d94110645157e2413"
//     relatedColumn: null
//     sourceColumn: ["referenceFields", "sumOfAggregateFields"]
//     0: "referenceFields"
//     1: "sumOfAggregateFields"
//     useAnd: false
//     value: "4"
//   }
// ]
// evaluationType: 0
// identifier: "e954d145187145d48b262e427c5783eb426bd90445aa4df2968331214eb4c860"
// useAnd: false

// NOTES

// show
// valid
//  -- right side should be binary, logical, or conditional expression


// value
//  -- right side should be binary, logical, or conditional expression
