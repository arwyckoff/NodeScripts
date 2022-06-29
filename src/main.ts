import * as acorn from 'acorn';
import { expect } from 'chai';
import chaiExclude from 'chai-exclude';
import csv from 'csv-parser';
import * as fs from 'fs';
import { formFieldTypeMap } from './form_field_type_map';
import { componentsWithCalculateValue, componentsWithDisplayJS, componentsWithoutCustomJS, componentsWithValidationJS, testSets } from './test-components';
import { BaseApplicationForLogic, ConditionalLogicResultType, ConversionErrorReport, ConversionExceptionTypes, ConversionOutcome, ConversionOutcomeReport, CustomJSLogicType, CustomValidationFromConversion, EvaluationType, FilterModalTypes, FormDefinitionComponent, FormulaStepValueType, GlobalLogicGroup, GlobalValueLogicGroup, LogicColumn, LogicCondition, LogicGroup, OutcomeItem, ReferenceFieldTypes } from './typings';
const chai = require('chai')
chai.use(chaiExclude)

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
  'amountRequested',
  'inKindItems',
  'careOf',
  'designation',
  'decision',
  'reviewerRecommendedFundingAmount',
  'specialHandling'
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
  LOGICAL_EXPRESSION = 'LogicalExpression',
  // this would be something like moment(data.thing)
  CALL_EXPRESSION = 'CallExpression'
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
    formDefs: string[],
    testing: boolean
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
              formDefs,
              testing
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
              compType,
              compKey,
              testing
            );
            return result;

          case CustomJSLogicType.VALIDITY:
            const customValidation = convertJSStringToCustomValidation(
              parsed.right,
              compType,
              customMessage,
              formDefs,
              compKey,
              testing
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
        throw new ConversionValidationException(
          ConversionExceptionTypes.UNKNOWN_ERROR_ADAPTING_COMP
        );
      }
    }
    function getAdaptedValue (
      value: string
    ) {
      let adaptedValue: string|boolean = value;
      if (typeof(value) === 'string') {
        adaptedValue = value;
      } else if (typeof(value) === 'number') {
        adaptedValue = '' + value;
      }
      
      return adaptedValue;
    }
    function getValidationResult(
      customValidation: CustomValidationFromConversion
    ) {
      // TODO: check that value should be a string here
      const value = customValidation.leftChunk?.type == 'literal' ? customValidation.leftChunk?.literalVal : customValidation.rightChunk?.type == 'literal' ? customValidation.rightChunk?.literalVal : null;
      const adaptedValue = value ? getAdaptedValue(value) : null;
      const validationResult = {
        evaluationType: EvaluationType.ConditionallyTrue,
        useAnd: false,
        identifier: nonce(),
        conditions: [{
          sourceColumn: customValidation.leftChunk?.columns,
          comparison: customValidation.comparison,
          identifier: nonce(),
          value: adaptedValue,
          relatedColumn: customValidation.rightChunk?.columns,
          useAnd: false
        }],
        resultType: ConditionalLogicResultType.VALIDATION_MESSAGE,
        result: customValidation.errorMsg
      };
      // should remove related column if empty array
      if (!validationResult.conditions[0].relatedColumn?.length) {
        delete validationResult.conditions[0].relatedColumn
      }
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
    formDefs: string[],
    compKey: string,
    testing: boolean
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
          leftChunk = getValidationChunk(node, true, compType, formDefs, compKey, testing);
          rightChunk = getValidationChunk(node, false, compType, formDefs, compKey, testing);
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
    formDefs: string[],
    testing: boolean
  ) :GlobalLogicGroup<BaseApplicationForLogic> {
    let conditions = getConditionsFromJSString(
      node,
      parentNode,
      compType,
      compkey,
      0,
      formDefs,
      testing,
      false
    ) as any;
      let flattenedConditions;
      if (conditions?.conditions) {
        flattenedConditions = {
          ...conditions
        }
      } else {
        flattenedConditions = {
          conditions: [conditions],
          evaluationType: EvaluationType.ConditionallyTrue,
          identifier: nonce(),
          useAnd: false
        }
      }

    return flattenedConditions
  }

  function recursGetColumnsForMathString(
    node: AcornNode,
    formDefs: string[],
    compType: string,
    compKey: string,
    testing: boolean
    ): any[] {
    const values = [];
    if (node.left.left && node.left.operator === AcornOperator.PLUS) {
      const baseCol = getColumn(node, false, compKey, formDefs, compType, testing, true);
      values.push(
        ...recursGetColumnsForMathString(node.left, formDefs, compType, compKey, testing),
        baseCol
      )
    } else if (node.operator === AcornOperator.PLUS) {
      const leftCol = getColumn(node, true, compKey, formDefs, compType, testing, true);
      const rightCol = getColumn(node, false, compKey, formDefs, compType, testing, true);
      values.push(leftCol, rightCol);
    } else {
      // error as we are only handling addition currently
      throw new ConversionValidationException(
        ConversionExceptionTypes.FORMULA_MUST_BE_ADDITIONS
      ); 
    }
    return values;
  }

  function getFormulaFromBinaryExpressionNode (
    node: AcornNode,
    formDefs: string[],
    compType: string,
    compKey: string,
    testing: boolean
  ): any {
    const values = recursGetColumnsForMathString(
      node,
      formDefs,
      compType,
      compKey,
      testing
    );
    // if all values have items in array
    const allValuesHaveData = values.every((v) => v.length > 0);
    if (allValuesHaveData) {
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
    } else {
      throw new ConversionValidationException(
        ConversionExceptionTypes.COMPONENT_NOT_ON_FORM
      ); 
    }
  }
  function getSetValueFromJSString (
    node: AcornNode,
    parentNode: AcornNode,
    formDefs: string[],
    compType: string,
    compKey: string,
    testing: boolean
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
    const column = getColumn(parentNode, false, compKey, formDefs, compType, testing, true);
    return {
      conditions: [],
      evaluationType: EvaluationType.AlwaysTrue,
      identifier: nonce(),
      result: column,
      resultType: ConditionalLogicResultType.OTHER_COLUMN,
      useAnd: false
    }

    } else {
      throw new ConversionValidationException(
        ConversionExceptionTypes.SET_VALUE_NODE_TYPE_NOT_LITERAL_OR_MEMBER_EXP
      ); 
    }
  }

  function getResultFromCalculateValueString (
    node: AcornNode,
    parentNode: AcornNode,
    formDefs: string[],
    compType: string,
    compKey: string,
    testing: boolean
  ): {
    result: any,
    resultType: 'setValue'|'formula'
  } {
    let result;
    if (node.type === NodeType.BINARY_EXPRESSION) {
      result = getFormulaFromBinaryExpressionNode(node, formDefs, compType, compKey, testing)
      return {
        result,
        resultType: 'formula'
      }
    } else {
      result = getSetValueFromJSString(node, parentNode, formDefs, compType, compKey, testing);
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
    formDefs: string[],
    testing: boolean,
    needToCompareTypes: boolean
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
    if (multipleConditionsCheck.isMultipleConditions) {
      let left = node.left;
      let right = node.right;
      const leftCondition = left ? getConditionsFromJSString(left, node, compType, compKey, depth + 1, formDefs, testing, needToCompareTypes) : [];
      const rightCondition = right ? getConditionsFromJSString(right, node, compType, compKey, depth + 1, formDefs, testing, needToCompareTypes) : []; 
      
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
    } else {
      if (node.type === NodeType.CALL_EXPRESSION) {
        throw new ConversionValidationException(
          ConversionExceptionTypes.NO_COMP_TYPE
        );
      }
    }
    comparison = getComparison(node);
    sourceColumn = getColumn(node, true, compKey, formDefs, compType, testing, needToCompareTypes);
    relatedColumn = getColumn(node, false, compKey, formDefs, compType, testing, needToCompareTypes);
    value = getValue(node);
    useAnd = multipleConditionsCheck.useAnd || false;
    
    let response =  {
      conditions,
      comparison,
      sourceColumn,
      relatedColumn,
      value,
      identifier: nonce(),
      useAnd
    } as any;
    // removes properties that are null or undefined
    Object.keys(response)
    .forEach((key: string) => {
      if ((response[key] == null || !response[key] || !response[key]?.length) && key !== 'useAnd' && key !== 'value') {
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
  function getFormatByTypeOrField (
    refFieldType?: string,
    compType?: string
  ) {
    if (refFieldType) {
      switch (refFieldType) {
        default:
        case ReferenceFieldTypes.TextArea:
        case ReferenceFieldTypes.TextField:
          return 'text';
        case ReferenceFieldTypes.SelectBoxes:
        case ReferenceFieldTypes.CustomDataTable:
        case ReferenceFieldTypes.Radio:
          return 'select';
        case ReferenceFieldTypes.Checkbox:
          return 'checkbox';
        case ReferenceFieldTypes.Date:
          return 'date';
        case ReferenceFieldTypes.Number:
          return 'number';
        case ReferenceFieldTypes.Currency:
          return 'currency';
      }
    } else if (compType) {
      switch (compType) {
        default:
        case 'careOf':
        case 'designation':
          return 'text';
        case 'amountRequested':
        case 'reviewerRecommendedFundingAmount':
          return 'currency';
        case 'decision':
          return 'select';
      }
    } else {
      throw new ConversionValidationException(
        ConversionExceptionTypes.FIELD_MUST_HAVE_FIELD_TYPE_OR_COMP_TYPE
      )
    }
  }
  function getFormCompFromProp (
    formDefs: any[],
    prop: string,
    compType: string,
    testing: boolean,
    compKey: string,
    needToCompareTypes: boolean
  ): FormDefinitionComponent|undefined {
    let foundComp: FormDefinitionComponent|undefined = undefined;
    formDefs.find((formDef) => {
      eachComponent(formDef.components, (comp) => {
        if (comp.key == compType) {
          foundComp = comp;
          if (foundComp && testing) {
            return true;
          } else if (foundComp) {
            const checkForEmployeeInfo = foundComp?.type?.split('-')[0] === 'employeeInfo';
            if (checkForEmployeeInfo) {
              throw new ConversionValidationException(
                ConversionExceptionTypes.EMPLOYY_SSO_FIELDS_NOT_SUPPORTED
              );
            }
            const typeMap = formFieldTypeMap as any;
            /// change to also check clientID
            const mapValForFoundComp = typeMap[foundComp.key]
            const formatForFoundComp = getFormatByTypeOrField(
              mapValForFoundComp.type,
              undefined
            );
            const formatForEvaluatedComp = getFormatByTypeOrField(
              undefined,
              compType
            );
            if (formatForFoundComp == formatForEvaluatedComp || !needToCompareTypes) {
              return true;
            } else {
              throw new ConversionValidationException(
                ConversionExceptionTypes.COMPONENT_NOT_ON_FORM
              );
            }
          } else {
            throw new ConversionValidationException(
              ConversionExceptionTypes.FIELD_MUST_HAVE_FIELD_TYPE_OR_COMP_TYPE
            )
          }
        }
        throw new ConversionValidationException(
          ConversionExceptionTypes.UNABLE_TO_FIND_FIELD
        )
      })

      return foundComp;
    })
    return foundComp;
  }
  function getColumn (
    node: AcornNode,
    evaluateLeft: boolean,
    compKey: string,
    formDefs: any[],
    compType: string,
    testing: boolean,
    needToCompareTypes: boolean
  ): string[] {
    // validate that it exists on form
    const logicalGroup = evaluateLeft ? node.left : node.right;
    const obj = logicalGroup?.object?.name ?? false;
    const prop = (logicalGroup?.property?.name || logicalGroup?.property?.value) ?? false;
    let root: 'referenceFields'|'application';

    if (obj && prop) {
      const compFromForm = getFormCompFromProp(
        formDefs,
        compType,
        prop,
        testing,
        compKey,
        needToCompareTypes
      );
      if (compFromForm) {
        if (standardFieldKeys.includes(compFromForm.type)) {
          root = 'application';
        } else {
          root = 'referenceFields';
        }
        return [root, prop];
      } else {
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
        return FilterModalTypes.equals;
      case '!==':
      case '!=':
        return FilterModalTypes.notEqual;
      case '>':
        return FilterModalTypes.greaterThan;
      case '<':
        return FilterModalTypes.lessThan;
      case '>=':
        return FilterModalTypes.greaterThanOrEquals;
      case '<=':
        return FilterModalTypes.lessThanOrEquals;
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
  // for each of these with a value, pass component to method that removes CustomLogicProps data and replaces it with our logic
  // method should take component and type of logic
  // UNIT TESTS
  let testsPass = false;
  try {
    // components without any custom JS
    const componentsWithoutJSResults = convertArrayOfFormDefs(componentsWithoutCustomJS as any, true);
    // should have no results because no logic
    expect(componentsWithoutJSResults.conversionErrorReport).to.equal('{}');
    expect(componentsWithoutJSResults.conversionOutcomeReport).to.equal('{}');

    // components with validation
    const componentsWithValidationResults = convertArrayOfFormDefs(componentsWithValidationJS as any, true);
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
    const componentsWithDisplayResults = convertArrayOfFormDefs(componentsWithDisplayJS as any, true);
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
      componentsWithCalculateValue as any,
      true
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
    testSets.forEach((testSet, index) => {
      // TODO, is needed?
      const convertedTestSet = convertArrayOfFormDefs(
        testSet[0] as any,
        true
      );
      const convertedTestsetParsed = JSON.parse(convertedTestSet.definition) instanceof(Array) ? JSON.parse(convertedTestSet.definition)[0] : JSON.parse(convertedTestSet.definition)
      const convertedTestSetParsed = convertedTestsetParsed.components;
      // maybe add check for each type of logic and then compare?
      if (convertedTestSetParsed[0].formula) {
        expect(convertedTestSetParsed[0].formula).excluding('identifier').to.deep.equal(testSet[1][0].components[0].formula)
      }
      if (convertedTestSetParsed[0].customValidation) {
        expect(convertedTestSetParsed[0].customValidation.conditions).excluding('identifier').to.deep.equal(testSet[1][0].components[0].customValidation?.conditions)
      }
      if (convertedTestSetParsed[0].conditionalLogic) {
        expect(convertedTestSetParsed[0].conditionalLogic.conditions).excluding('identifier').to.deep.equal(testSet[1][0].components[0].conditionalLogic?.conditions)
      }
      if (convertedTestSetParsed[0].conditionalValue) {
        expect(convertedTestSetParsed[0].conditionalValue).excluding('identifier').to.deep.equal(testSet[1][0].components[0].conditionalValue)
      }
    })
    testsPass = true;
  } catch (e) {
    console.log(e)
    testsPass = false;
  }
  
  // CONVERSION
  let data: any[] = [];
  if (testsPass) {
    fs.createReadStream(
      '/Users/drew.wyckoff/Projects/Node scripts/src/conversion_forms_qa.csv'
    )
      .pipe(csv())
      .on('data', (chunk) => {
        try {
          const formDef = JSON.parse(chunk.definition);
  
          const arrayOfFormDef = formDef instanceof Array ? formDef : [formDef];
          let conversionResult = convertArrayOfFormDefs(arrayOfFormDef);
          if (conversionResult.conversionErrorReport !== '{}' ||
              conversionResult.conversionOutcomeReport !== '{}'
          ) {
            
            const result = {
              ...chunk,
              ...conversionResult
            }
            data.push(result)
          }
        } catch (e) {
          // unable to parse JSON for row
          const formId = JSON.parse(chunk.formId)
          console.log('unable to parse ID:', formId)
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
  function convertArrayOfFormDefs (
    arrayOfFormDef: string[],
    testing = false
  ) {
    // add columns for conversion types
    // validation converted
    // display converted
    // 
    // if no outcomes don't add form def
    let conversionResult = convertFormDefinitions(arrayOfFormDef, testing);
    let formDefs;
    if (conversionResult.formDefs[0].tabName) {
      formDefs = conversionResult.formDefs;
    } else if (conversionResult.formDefs.length === 1) {
      formDefs = conversionResult.formDefs[0];
    } else {
      throw new ConversionValidationException(
        ConversionExceptionTypes.FORMULA_MUST_BE_ADDITIONS
      ); 
    }
    const stringifyDef = JSON.stringify(formDefs);
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
    formDefs: string[],
    compKey: string,
    testing: boolean
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
        if (
          evaluationNode.name === "value" || 
          evaluationNode.name === 'input'
        ) {
          validationChunk.type = 'value';
          validationChunk.isValue = true;
          validationChunk.columns = compType.split('-');
          // this is the ref field itself
        } else {
          throw new ConversionValidationException(ConversionExceptionTypes.UNKNOWN_VARIABLE_DECLARED)
        }
      } else if (evaluationNode?.type === NodeType.MEMBER_EXPRESSION) {
        // this is columns
        const columns = getColumn(node.test, evaluateLeft, compKey, formDefs, compType, testing, false);
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

  function convertFormDefinitions (defs: any[], testing: boolean) {
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
                  defs,
                  testing
                );
                if (conditionalLogic && conditionalLogic.result) {
                
                  comp.conditionalLogic = conditionalLogic.result;
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
                  defs,
                  testing
                );
                if (conditionalValue && conditionalValue.result) {
                  switch (conditionalValue.resultType) {
                    case 'formula':
                      const refFieldProp = comp.type?.split('-').join('.');
                      const formula = {
                        property: refFieldProp,
                        ...conditionalValue.result
                      };
                      comp.formula = formula;
                      delete comp.calculateValue;
                      break;
                    case 'setValue':
                      comp.conditionalValue = [conditionalValue.result] as any;
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
                  defs,
                  testing
                );
                if (customValidation) {
                  // if custom validation chunk is value, map to ref field prop
                  comp.customValidation = customValidation.result as any;
                  delete comp.validate;
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
            const error = e as any;
            if ('errorType' in error) {
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
          }
        });

        return formDef
      } catch (e) {
        throw new ConversionValidationException(ConversionExceptionTypes.UNKNOWN_ERROR_ADAPTING_COMP)
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

