"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcornOperator = exports.NodeType = exports.standardFieldKeys = void 0;
var acorn = __importStar(require("acorn"));
var chai_1 = require("chai");
var chai_exclude_1 = __importDefault(require("chai-exclude"));
var csv_parser_1 = __importDefault(require("csv-parser"));
var fs = __importStar(require("fs"));
var Fields_Map_1 = require("./Fields_Map");
var test_components_1 = require("./test-components");
var typings_1 = require("./typings");
var chai = require('chai');
chai.use(chai_exclude_1.default);
var currentComponent;
var createCsvWriter = require('csv-writer').createObjectCsvWriter;
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
function eachComponent(components, fn, includeAll) {
    if (includeAll === void 0) { includeAll = false; }
    doEachComponent(components, fn, includeAll, '', null);
}
function doEachComponent(components, fn, includeAll, path, parent) {
    path = path || '';
    components.forEach(function (component) {
        if (!component) {
            return;
        }
        var hasColumns = component.columns && Array.isArray(component.columns);
        var hasRows = component.rows && Array.isArray(component.rows);
        var hasComps = component.components && Array.isArray(component.components);
        var noRecurse = false;
        var newPath = component.key ? (path ? (path + "." + component.key) : component.key) : '';
        if (includeAll || (!hasColumns && !hasRows && !hasComps)) {
            noRecurse = fn(component, newPath, parent === null || parent === void 0 ? void 0 : parent.key);
        }
        var subPath = function () {
            if (component.key && component.type &&
                !['panel', 'table', 'well', 'columns', 'fieldset', 'tabs', 'form'].includes(component.type) &&
                (['datagrid', 'container', 'editgrid'].includes(component.type))) {
                return newPath;
            }
            else if (component.key &&
                component.type === 'form') {
                return newPath + ".data";
            }
            return path;
        };
        if (!noRecurse) {
            if (hasColumns && component.columns) {
                component.columns.forEach(function (column) {
                    if (column.components) {
                        return doEachComponent(column.components, fn, includeAll, subPath(), component);
                    }
                });
            }
            else if (hasRows && component.rows) {
                component.rows.forEach(function (row) {
                    if (Array.isArray(row)) {
                        row.forEach(function (column) {
                            if (column.components) {
                                return doEachComponent(column.components, fn, includeAll, subPath(), component);
                            }
                        });
                    }
                });
            }
            else if (hasComps && component.components) {
                doEachComponent(component.components, fn, includeAll, subPath(), component);
            }
        }
    });
}
function writeFile(content, path) {
    fs.writeFileSync(path, content);
}
var CustomLogicProps;
(function (CustomLogicProps) {
    CustomLogicProps["CALCULATED_VALUE"] = "calculateValue";
    CustomLogicProps["DISPLAY"] = "customConditional";
    CustomLogicProps["VALIDATION"] = "customValidation";
})(CustomLogicProps || (CustomLogicProps = {}));
// new error handling function that adds to list of errors
var ConversionValidationException = /** @class */ (function (_super) {
    __extends(ConversionValidationException, _super);
    function ConversionValidationException(errorType) {
        var _this = _super.call(this, 'CONVERSION EXCEPTION:' + errorType) || this;
        _this.errorType = errorType;
        console.log(errorType);
        return _this;
    }
    return ConversionValidationException;
}(Error));
exports.standardFieldKeys = [
    'amountRequested',
    'inKindItems',
    'careOf',
    'designation',
    'decision',
    'reviewerRecommendedFundingAmount',
    'specialHandling'
];
var NodeType;
(function (NodeType) {
    NodeType["IDENTIFIER"] = "Identifier";
    NodeType["MEMBER_EXPRESSION"] = "MemberExpression";
    NodeType["ASSIGNMENT_EXPRESSION"] = "AssignmentExpression";
    NodeType["LITERAL"] = "Literal";
    NodeType["BINARY_EXPRESSION"] = "BinaryExpression";
    NodeType["CONDITIONAL_EXPRESSION"] = "ConditionalExpression";
    NodeType["LOGICAL_EXPRESSION"] = "LogicalExpression";
    // this would be something like moment(data.thing)
    NodeType["CALL_EXPRESSION"] = "CallExpression";
})(NodeType = exports.NodeType || (exports.NodeType = {}));
// export interface Node {
//   type: NodeType;
//   start: number;
//   end: number;
//   loc: any;
//   name: string;
//   value: string|number|boolean,
//   raw: string
// };
var AcornOperator;
(function (AcornOperator) {
    AcornOperator["EQUALS"] = "=";
    AcornOperator["DOUBLE_EQUALS"] = "==";
    AcornOperator["TRIPPLE_EQUALS"] = "===";
    AcornOperator["GREATER_THAN_EQUALS"] = ">=";
    AcornOperator["LESS_THAN_EQUALS"] = "<=";
    AcornOperator["GREATER_THAN"] = ">";
    AcornOperator["LESS_THAN"] = "<";
    AcornOperator["OR"] = "||";
    AcornOperator["AND"] = "&&";
    AcornOperator["NOT_EQUALS"] = "!=";
    AcornOperator["DOUBLE_NOT_EQUALS"] = "!==";
    AcornOperator["PLUS"] = "+";
})(AcornOperator = exports.AcornOperator || (exports.AcornOperator = {}));
// RULES FOR VALIDATION
// replace "input" with the actual referenceFields-blahblah
// for  validation, result type will be ConditionalLogicResultType.ValidationMessage
var JSParser = function () { return __awaiter(void 0, void 0, void 0, function () {
    function convertCustomJS(customJS, logicType, compType, customMessage, compKey, formDefs, testing, clientId) {
        var parsed = acorn.Parser.parseExpressionAt(customJS, 0, parserOptions);
        // first we have to check that the JS has a structure like "variable ="
        // if this is not the case, we log the errors
        checkFirstNode(parsed);
        if (!compType) {
            throw new ConversionValidationException(typings_1.ConversionExceptionTypes.NO_COMP_TYPE);
            // error that there are errors  or no comp type
        }
        else {
            // we should actually just validate that the properties are correct based on what's returned below
            // try {
            switch (logicType) {
                case typings_1.CustomJSLogicType.DISPLAY:
                    var conditionalLogic = convertJSStringToLogicGroup(parsed.right, parsed, compType, compKey, formDefs, testing, clientId);
                    return {
                        result: conditionalLogic,
                        resultType: 'display'
                    };
                case typings_1.CustomJSLogicType.CALCULATED_VALUE:
                    var result = getResultFromCalculateValueString(parsed.right, parsed, formDefs, compType, compKey, testing, clientId);
                    return result;
                case typings_1.CustomJSLogicType.VALIDITY:
                    var customValidation = convertJSStringToCustomValidation(parsed.right, compType, customMessage, formDefs, compKey, testing, clientId);
                    // the value may be on the left or right node or may be null
                    var validationResult = getValidationResult(customValidation);
                    return {
                        result: validationResult,
                        resultType: 'validation'
                    };
                    // new work that should get the validity logic and set the string on right node as result with result type being validationMessage
                    break;
            }
            // console.info(JSONResponse);
            // } catch (e) {
            //   // console.log(e)
            //   // throw new ConversionValidationException(
            //   //   ConversionExceptionTypes.UNKNOWN_ERROR_ADAPTING_COMP
            //   // );
            // }
        }
        function getAdaptedValue(value) {
            var adaptedValue = value;
            if (typeof (value) === 'string') {
                adaptedValue = value;
            }
            else if (typeof (value) === 'number') {
                adaptedValue = '' + value;
            }
            return adaptedValue;
        }
        function getValidationResult(customValidation) {
            var _a, _b, _c, _d, _e, _f, _g;
            // TODO: check that value should be a string here
            var value = ((_a = customValidation.leftChunk) === null || _a === void 0 ? void 0 : _a.type) == 'literal' ? (_b = customValidation.leftChunk) === null || _b === void 0 ? void 0 : _b.literalVal : ((_c = customValidation.rightChunk) === null || _c === void 0 ? void 0 : _c.type) == 'literal' ? (_d = customValidation.rightChunk) === null || _d === void 0 ? void 0 : _d.literalVal : null;
            var adaptedValue = value ? getAdaptedValue(value) : null;
            var validationResult = {
                evaluationType: typings_1.EvaluationType.ConditionallyTrue,
                useAnd: false,
                identifier: nonce(),
                conditions: [{
                        sourceColumn: (_e = customValidation.leftChunk) === null || _e === void 0 ? void 0 : _e.columns,
                        comparison: customValidation.comparison,
                        identifier: nonce(),
                        value: adaptedValue,
                        relatedColumn: (_f = customValidation.rightChunk) === null || _f === void 0 ? void 0 : _f.columns,
                        useAnd: false
                    }],
                resultType: typings_1.ConditionalLogicResultType.VALIDATION_MESSAGE,
                result: customValidation.errorMsg
            };
            // should remove related column if empty array
            if (!((_g = validationResult.conditions[0].relatedColumn) === null || _g === void 0 ? void 0 : _g.length)) {
                delete validationResult.conditions[0].relatedColumn;
            }
            return validationResult;
        }
    }
    function scrubJSString(js) {
        // remove leading + from data
        var stringWithoutLeadingPlusOnData = js.replace(/((\+)\b(data)\b)/g, ' data');
        // remove || 0 from logic
        var stringWithoutOrZero = stringWithoutLeadingPlusOnData.replace(/(\|\|0)|(\|\| 0)/g, '');
        return stringWithoutOrZero;
    }
    /**
     * This will return the logic type e.g. validation/conditional value/dislay
     */
    function getLogicTypeFromNode(node) {
        var name = node.left.name;
        var type;
        switch (name) {
            case 'valid':
                type = typings_1.CustomJSLogicType.VALIDITY;
                break;
            case 'show':
                type = typings_1.CustomJSLogicType.DISPLAY;
                break;
            case 'value':
                type = typings_1.CustomJSLogicType.CALCULATED_VALUE;
                break;
        }
        if (!type) {
            return;
        }
        return type;
    }
    function convertJSStringToCustomValidation(node, compType, customMessage, formDefs, compKey, testing, clientId) {
        var _a, _b, _c, _d, _e;
        // ex. "valid = data.thing1 > value ? true : 'this is not right"
        var comparison;
        var errorMsg;
        var leftChunk;
        var rightChunk;
        // step 1: make sure structure is evalution ? true : string
        if (node.type === NodeType.CONDITIONAL_EXPRESSION) {
            if (node.test && node.consequent && node.alternate) {
                if ((node.test.type === NodeType.BINARY_EXPRESSION) &&
                    node.consequent.type === NodeType.LITERAL &&
                    node.alternate.type === NodeType.LITERAL) {
                    // get column or static value from left
                    leftChunk = getValidationChunk(node, true, compType, formDefs, compKey, testing, clientId);
                    rightChunk = getValidationChunk(node, false, compType, formDefs, compKey, testing, clientId);
                    comparison = getComparison(node.test);
                }
                else {
                    throw new ConversionValidationException(typings_1.ConversionExceptionTypes.CONDITIONAL_EXPRESSION_TOO_COMPLEX);
                }
            }
            else {
                throw new ConversionValidationException(typings_1.ConversionExceptionTypes.CONDITIONAL_EXPRESSION_MALFORMED);
            }
            // step 2: get string for error and add as resultType 2 and result as string
            if (((_a = node.consequent) === null || _a === void 0 ? void 0 : _a.value) === true) {
                if (typeof ((_b = node.alternate) === null || _b === void 0 ? void 0 : _b.raw) === 'string') {
                    errorMsg = node.alternate.value;
                }
                else {
                    throw new ConversionValidationException(typings_1.ConversionExceptionTypes.MISSING_ERROR_MESSAGE);
                }
            }
            else if (((_c = node.alternate) === null || _c === void 0 ? void 0 : _c.value) === true) {
                if (typeof ((_d = node.alternate) === null || _d === void 0 ? void 0 : _d.raw) === 'string') {
                    errorMsg = (_e = node.consequent) === null || _e === void 0 ? void 0 : _e.value;
                }
                else {
                    throw new ConversionValidationException(typings_1.ConversionExceptionTypes.MISSING_ERROR_MESSAGE);
                }
            }
            else {
                throw new ConversionValidationException(typings_1.ConversionExceptionTypes.ERROR_MESSAGE_SETUP_INCORRECTLY);
            }
            if (!errorMsg) {
                if (customMessage && typeof customMessage == "string") {
                    errorMsg = customMessage;
                }
                else {
                    throw new ConversionValidationException(typings_1.ConversionExceptionTypes.MISSING_ERROR_MESSAGE);
                }
            }
        }
        else {
            throw new ConversionValidationException(typings_1.ConversionExceptionTypes.VALIDATION_STRING_IS_NOT_CONDITIONAL);
        }
        return {
            leftChunk: leftChunk,
            rightChunk: rightChunk,
            comparison: comparison,
            errorMsg: errorMsg
        };
    }
    function convertJSStringToLogicGroup(node, parentNode, compType, compkey, formDefs, testing, clientId) {
        var conditions = getConditionsFromJSString(node, parentNode, compType, compkey, 0, formDefs, testing, false, clientId);
        var flattenedConditions;
        if (conditions === null || conditions === void 0 ? void 0 : conditions.conditions) {
            flattenedConditions = __assign({}, conditions);
        }
        else {
            flattenedConditions = {
                conditions: [conditions],
                evaluationType: typings_1.EvaluationType.ConditionallyTrue,
                identifier: nonce(),
                useAnd: false
            };
        }
        return flattenedConditions;
    }
    function recursGetColumnsForMathString(node, formDefs, compType, compKey, testing, clientId) {
        var values = [];
        if (node.left.left && node.left.operator === AcornOperator.PLUS) {
            var baseCol = getColumn(node, false, compKey, formDefs, compType, testing, true, clientId);
            values.push.apply(values, __spreadArray(__spreadArray([], recursGetColumnsForMathString(node.left, formDefs, compType, compKey, testing, clientId)), [baseCol]));
        }
        else if (node.operator === AcornOperator.PLUS) {
            var leftCol = getColumn(node, true, compKey, formDefs, compType, testing, true, clientId);
            var rightCol = getColumn(node, false, compKey, formDefs, compType, testing, true, clientId);
            values.push(leftCol, rightCol);
        }
        else {
            // error as we are only handling addition currently
            throw new ConversionValidationException(typings_1.ConversionExceptionTypes.FORMULA_MUST_BE_ADDITIONS);
        }
        return values;
    }
    function getFormulaFromBinaryExpressionNode(node, formDefs, compType, compKey, testing, clientId) {
        var values = recursGetColumnsForMathString(node, formDefs, compType, compKey, testing, clientId);
        // if all values have items in array
        var allValuesHaveData = values.every(function (v) { return v.length > 0; });
        if (allValuesHaveData) {
            var adaptedValues = values.map(function (col) {
                return {
                    value: col.join('.'),
                    type: typings_1.FormulaStepValueType.ParentValue
                };
            });
            return {
                step: {
                    type: 0,
                    values: adaptedValues
                }
            };
        }
        else {
            throw new ConversionValidationException(typings_1.ConversionExceptionTypes.COMPONENT_NOT_ON_FORM);
        }
    }
    function getSetValueFromJSString(node, parentNode, formDefs, compType, compKey, testing, clientId) {
        if (node.type === NodeType.LITERAL) {
            // if type is Literal, this is set value and is static
            // this will end up using conditional value
            return {
                conditions: [],
                evaluationType: typings_1.EvaluationType.AlwaysTrue,
                identifier: nonce(),
                result: node.value,
                resultType: typings_1.ConditionalLogicResultType.STATIC_VALUE,
                useAnd: false
            };
        }
        else if (node.type === NodeType.MEMBER_EXPRESSION) {
            // if type is memberExpression, this is setting to the value of another field like value = data.thing1, this is set value and is based on another form field
            var column = getColumn(parentNode, false, compKey, formDefs, compType, testing, true, clientId);
            return {
                conditions: [],
                evaluationType: typings_1.EvaluationType.AlwaysTrue,
                identifier: nonce(),
                result: column,
                resultType: typings_1.ConditionalLogicResultType.OTHER_COLUMN,
                useAnd: false
            };
        }
        else {
            throw new ConversionValidationException(typings_1.ConversionExceptionTypes.SET_VALUE_NODE_TYPE_NOT_LITERAL_OR_MEMBER_EXP);
        }
    }
    function getResultFromCalculateValueString(node, parentNode, formDefs, compType, compKey, testing, clientId) {
        var result;
        if (node.type === NodeType.BINARY_EXPRESSION) {
            result = getFormulaFromBinaryExpressionNode(node, formDefs, compType, compKey, testing, clientId);
            return {
                result: result,
                resultType: 'formula'
            };
        }
        else {
            result = getSetValueFromJSString(node, parentNode, formDefs, compType, compKey, testing, clientId);
            return {
                result: result,
                resultType: 'setValue'
            };
        }
    }
    function getConditionsFromJSString(node, parentNode, compType, compKey, depth, formDefs, testing, needToCompareTypes, clientId) {
        var conditions;
        var comparison;
        var sourceColumn;
        var relatedColumn;
        var value;
        var useAnd;
        var multipleConditionsCheck = checkForMultipleConditions(node, parentNode);
        if (multipleConditionsCheck.isMultipleConditions) {
            var left = node.left;
            var right = node.right;
            var leftCondition = left ? getConditionsFromJSString(left, node, compType, compKey, depth + 1, formDefs, testing, needToCompareTypes, clientId) : [];
            var rightCondition = right ? getConditionsFromJSString(right, node, compType, compKey, depth + 1, formDefs, testing, needToCompareTypes, clientId) : [];
            conditions = [
                leftCondition,
                rightCondition
            ];
            // something === 'asdf' || somethingElse === 'fdas' || somethingEvenElse === 'fdsaasdf';
            // (something === 'asdf' || somethingElse === 'fdsa') || somethingEvenElse === 'fdasasdf';
            if (node.operator === right.operator) {
                conditions = __spreadArray(__spreadArray([], rightCondition.conditions), [
                    leftCondition
                ]);
            }
            else if (node.operator === left.operator) {
                conditions = __spreadArray(__spreadArray([], leftCondition.conditions), [
                    rightCondition
                ]);
            }
            else {
                conditions = [
                    leftCondition,
                    rightCondition
                ];
            }
        }
        else {
            if (node.type === NodeType.CALL_EXPRESSION) {
                throw new ConversionValidationException(typings_1.ConversionExceptionTypes.NO_COMP_TYPE);
            }
        }
        comparison = getComparison(node);
        sourceColumn = getColumn(node, true, compKey, formDefs, compType, testing, needToCompareTypes, clientId);
        relatedColumn = getColumn(node, false, compKey, formDefs, compType, testing, needToCompareTypes, clientId);
        value = getValue(node);
        useAnd = multipleConditionsCheck.useAnd || false;
        var response = {
            conditions: conditions,
            comparison: comparison,
            sourceColumn: sourceColumn,
            relatedColumn: relatedColumn,
            value: value,
            identifier: nonce(),
            useAnd: useAnd
        };
        // removes properties that are null or undefined
        Object.keys(response)
            .forEach(function (key) {
            var _a;
            if ((response[key] == null || !response[key] || !((_a = response[key]) === null || _a === void 0 ? void 0 : _a.length)) && key !== 'useAnd' && key !== 'value') {
                delete response[key];
            }
        });
        return response;
    }
    function getValue(node) {
        var _a, _b;
        var hasValue = ((_a = node.right) === null || _a === void 0 ? void 0 : _a.type) === NodeType.LITERAL;
        // if node.right,type is Literal, return the value
        if (hasValue) {
            return (_b = node.right.value) !== null && _b !== void 0 ? _b : null;
        }
    }
    function getFormatByTypeOrField(refFieldType, compType) {
        if (refFieldType) {
            switch (refFieldType) {
                default:
                case typings_1.ReferenceFieldTypes.TextArea:
                case typings_1.ReferenceFieldTypes.TextField:
                    return 'text';
                case typings_1.ReferenceFieldTypes.SelectBoxes:
                case typings_1.ReferenceFieldTypes.CustomDataTable:
                case typings_1.ReferenceFieldTypes.Radio:
                    return 'select';
                case typings_1.ReferenceFieldTypes.Checkbox:
                    return 'checkbox';
                case typings_1.ReferenceFieldTypes.Date:
                    return 'date';
                case typings_1.ReferenceFieldTypes.Number:
                    return 'number';
                case typings_1.ReferenceFieldTypes.Currency:
                    return 'currency';
            }
        }
        else if (compType) {
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
        }
        else {
            throw new ConversionValidationException(typings_1.ConversionExceptionTypes.FIELD_MUST_HAVE_FIELD_TYPE_OR_COMP_TYPE);
        }
    }
    function getFormCompFromProp(formDefs, prop, compType, testing, compKey, needToCompareTypes, clientId) {
        var foundComp = undefined;
        formDefs.find(function (formDef) {
            eachComponent(formDef.components, function (comp) {
                var _a;
                if (comp.key == compType) {
                    foundComp = comp;
                    if (foundComp && testing) {
                        return true;
                    }
                    else if (foundComp && clientId) {
                        var checkForEmployeeInfo = ((_a = foundComp === null || foundComp === void 0 ? void 0 : foundComp.type) === null || _a === void 0 ? void 0 : _a.split('-')[0]) === 'employeeInfo';
                        if (checkForEmployeeInfo) {
                            throw new ConversionValidationException(typings_1.ConversionExceptionTypes.EMPLOYY_SSO_FIELDS_NOT_SUPPORTED);
                        }
                        var mapValForFoundComp = Fields_Map_1.FieldsArray.find(function (field) {
                            var clientMatches = +field.clientId === +clientId;
                            var keyMatches = field.key === (foundComp === null || foundComp === void 0 ? void 0 : foundComp.key);
                            return clientMatches && keyMatches;
                        });
                        if (!mapValForFoundComp) {
                            throw new ConversionValidationException(typings_1.ConversionExceptionTypes.UNABLE_TO_FIND_FIELD);
                        }
                        var formatForFoundComp = getFormatByTypeOrField(mapValForFoundComp === null || mapValForFoundComp === void 0 ? void 0 : mapValForFoundComp.type, undefined);
                        var formatForEvaluatedComp = getFormatByTypeOrField(undefined, compType);
                        if (formatForFoundComp == formatForEvaluatedComp || !needToCompareTypes) {
                            return true;
                        }
                        else {
                            throw new ConversionValidationException(typings_1.ConversionExceptionTypes.COMPONENT_NOT_ON_FORM);
                        }
                    }
                    else {
                        throw new ConversionValidationException(typings_1.ConversionExceptionTypes.FIELD_MUST_HAVE_FIELD_TYPE_OR_COMP_TYPE);
                    }
                }
                throw new ConversionValidationException(typings_1.ConversionExceptionTypes.UNABLE_TO_FIND_FIELD);
            });
            return foundComp;
        });
        return foundComp;
    }
    function getColumn(node, evaluateLeft, compKey, formDefs, compType, testing, needToCompareTypes, clientId) {
        var _a, _b, _c, _d, _e;
        // validate that it exists on form
        var logicalGroup = evaluateLeft ? node.left : node.right;
        var obj = (_b = (_a = logicalGroup === null || logicalGroup === void 0 ? void 0 : logicalGroup.object) === null || _a === void 0 ? void 0 : _a.name) !== null && _b !== void 0 ? _b : false;
        var prop = (_e = (((_c = logicalGroup === null || logicalGroup === void 0 ? void 0 : logicalGroup.property) === null || _c === void 0 ? void 0 : _c.name) || ((_d = logicalGroup === null || logicalGroup === void 0 ? void 0 : logicalGroup.property) === null || _d === void 0 ? void 0 : _d.value))) !== null && _e !== void 0 ? _e : false;
        var root;
        if (obj && prop) {
            var compFromForm = getFormCompFromProp(formDefs, compType, prop, testing, compKey, needToCompareTypes, clientId);
            if (compFromForm) {
                if (exports.standardFieldKeys.includes(compFromForm.type)) {
                    root = 'application';
                }
                else {
                    root = 'referenceFields';
                }
                return [root, prop];
            }
            else {
                throw new ConversionValidationException(typings_1.ConversionExceptionTypes.COMPONENT_NOT_ON_FORM);
            }
        }
        else {
            return [];
        }
    }
    /**
     *
     * @param node Acorn node from acorn.parse
     * @returns the GC/NPP/YC logic rule equivalent of a logical operator
     */
    function getComparison(node) {
        // TODO?: includes/contains
        var operator = node.operator;
        switch (operator) {
            case '==':
            case '===':
                return typings_1.FilterModalTypes.equals;
            case '!==':
            case '!=':
                return typings_1.FilterModalTypes.notEqual;
            case '>':
                return typings_1.FilterModalTypes.greaterThan;
            case '<':
                return typings_1.FilterModalTypes.lessThan;
            case '>=':
                return typings_1.FilterModalTypes.greaterThanOrEquals;
            case '<=':
                return typings_1.FilterModalTypes.lessThanOrEquals;
        }
    }
    /**
     *
     * @param node Acorn node from Acorn.parse
     * @returns boolean for whether multiple conditions are present and a boolean for whether the multiple conditions are joined by '&&'
     */
    function checkForMultipleConditions(node, parentNode) {
        var useAnd = parentNode.operator === AcornOperator.AND;
        return {
            isMultipleConditions: node.operator == AcornOperator.OR || node.operator === AcornOperator.AND,
            useAnd: useAnd
        };
    }
    /**
     *
     * @param node Acorn node from Acorn.parse
     * @returns an array of error strings based on possible malformed logic scenarios (e.g. data > 2 or 5 = 3)
     */
    function checkFirstNode(node) {
        var operatorIsEquals = node.operator === AcornOperator.EQUALS;
        var typeIsAssignment = node.type === NodeType.ASSIGNMENT_EXPRESSION;
        if (!operatorIsEquals) {
            throw new ConversionValidationException(typings_1.ConversionExceptionTypes.BASE_OP_NOT_EQUALS);
        }
        if (!typeIsAssignment) {
            throw new ConversionValidationException(typings_1.ConversionExceptionTypes.FIRST_NODE_NOT_ASSIGNMENT);
        }
    }
    /**
     *
     * @param name name returned from acorn parsing as the left side of an identifier
     * @returns the type of logic based on the name used in the logic (e.g. returns 'visibility' if the property being assigned a value is 'show')
     */
    function getTypeOfLogic(name) {
        switch (name) {
            case 'show':
                return 'visibility';
        }
    }
    /**
     *
     * @returns a guid used to identify a condition
     */
    function nonce() {
        var guidHolder = 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxxxxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx';
        var hex = '0123456789abcdef';
        var r = 0;
        var guidResponse = '';
        for (var _i = 0, guidHolder_1 = guidHolder; _i < guidHolder_1.length; _i++) {
            var guidChar = guidHolder_1[_i];
            if (guidChar !== '-' && guidChar !== '4') {
                // each x and y needs to be random
                // eslint-disable-next-line no-bitwise
                r = Math.random() * 16 | 0;
            }
            if (guidChar === 'x') {
                guidResponse += hex[r];
            }
            else if (guidChar === 'y') {
                // clock-seq-and-reserved first hex is filtered and remaining hex values are random
                // eslint-disable-next-line no-bitwise
                r &= 0x3; // bit and with 0011 to set pos 2 to zero ?0??
                // eslint-disable-next-line no-bitwise
                r |= 0x8; // set pos 3 to 1 as 1???
                guidResponse += hex[r];
            }
            else {
                guidResponse += guidChar;
            }
        }
        return guidResponse;
    }
    function convertArrayOfFormDefs(arrayOfFormDef, testing, clientId) {
        if (testing === void 0) { testing = false; }
        // add columns for conversion types
        // validation converted
        // display converted
        // 
        // if no outcomes don't add form def
        var conversionResult = convertFormDefinitions(arrayOfFormDef, testing, clientId);
        var formDefs;
        if (conversionResult.formDefs[0].tabName) {
            formDefs = conversionResult.formDefs;
        }
        else if (conversionResult.formDefs.length === 1) {
            formDefs = conversionResult.formDefs[0];
        }
        else {
            throw new ConversionValidationException(typings_1.ConversionExceptionTypes.FORMULA_MUST_BE_ADDITIONS);
        }
        var stringifyDef = JSON.stringify(formDefs);
        var conversionOutcomeReport = JSON.stringify(conversionResult.conversionOutcomeReport);
        var conversionErrorReport = JSON.stringify(conversionResult.conversionErrorReport);
        var updatedFormResult = {
            definition: stringifyDef,
            conversionOutcomeReport: conversionOutcomeReport,
            conversionErrorReport: conversionErrorReport
        };
        return updatedFormResult;
    }
    function everyResultItemMatchesOutcomeAndType(resultObj, outcome, type) {
        var passes = Object.keys(resultObj).every(function (key) {
            var matchesType = resultObj[key].filter(function (outcomeItem) { return outcomeItem.type == type; });
            var onlyOneMatchesType = matchesType.length == 1;
            var matchesOutcome = matchesType.every(function (outcomeItem) { return outcomeItem.outcome == outcome; });
            return onlyOneMatchesType && matchesOutcome;
        });
        return passes;
    }
    function getValidationChunk(node, evaluateLeft, compType, formDefs, compKey, testing, clientId) {
        var _a, _b;
        var validationChunk = {
            type: 'column',
            columns: [],
            literalVal: null,
            isValue: false
        };
        var evaluationNode = evaluateLeft ? (_a = node.test) === null || _a === void 0 ? void 0 : _a.left : (_b = node.test) === null || _b === void 0 ? void 0 : _b.right;
        if (node && node.test) {
            if ((evaluationNode === null || evaluationNode === void 0 ? void 0 : evaluationNode.type) === NodeType.IDENTIFIER) {
                // this should be value
                if (evaluationNode.name === "value" ||
                    evaluationNode.name === 'input') {
                    validationChunk.type = 'value';
                    validationChunk.isValue = true;
                    validationChunk.columns = compType.split('-');
                    // this is the ref field itself
                }
                else {
                    throw new ConversionValidationException(typings_1.ConversionExceptionTypes.UNKNOWN_VARIABLE_DECLARED);
                }
            }
            else if ((evaluationNode === null || evaluationNode === void 0 ? void 0 : evaluationNode.type) === NodeType.MEMBER_EXPRESSION) {
                // this is columns
                var columns = getColumn(node.test, evaluateLeft, compKey, formDefs, compType, testing, false, clientId);
                if (columns.length) {
                    validationChunk.type = 'column';
                    validationChunk.columns = columns;
                    // this is a form field
                }
                else {
                    throw new ConversionValidationException(typings_1.ConversionExceptionTypes.UNKNOWN_PROPERTY_ON_FORM_DATA);
                }
            }
            else if ((evaluationNode === null || evaluationNode === void 0 ? void 0 : evaluationNode.type) === NodeType.LITERAL) {
                if (evaluationNode.value) {
                    validationChunk.type = 'literal';
                    validationChunk.literalVal = evaluationNode.value;
                    // this is a static value
                }
                else {
                    throw new ConversionValidationException(typings_1.ConversionExceptionTypes.NO_VALUE_FOR_LITERAL_EXPRESSION);
                }
            }
            else {
                throw new ConversionValidationException(typings_1.ConversionExceptionTypes.UNSUPPORTED_EVALUATION_FOR_VALIDATION);
            }
        }
        else {
            throw new ConversionValidationException(typings_1.ConversionExceptionTypes.UNKNOWN_VALIDATION_ERROR);
        }
        return validationChunk;
    }
    function addConversionErrorToReport(conversionErrorReport, fieldName, errorType) {
        if (conversionErrorReport[fieldName]) {
            conversionErrorReport[fieldName].push({
                errorType: errorType
            });
        }
        else {
            conversionErrorReport[fieldName] = [({
                    errorType: errorType
                })];
        }
        return conversionErrorReport;
    }
    function addConversionOutcomeToReport(conversionOutcomeReport, fieldName, outcome, type) {
        if (conversionOutcomeReport[fieldName]) {
            conversionOutcomeReport[fieldName].push({
                outcome: outcome,
                type: type
            });
        }
        else {
            conversionOutcomeReport[fieldName] = [({
                    outcome: outcome,
                    type: type
                })];
        }
        return conversionOutcomeReport;
    }
    function convertFormDefinitions(defs, testing, clientId) {
        var conversionOutcomeReport = {};
        var conversionErrorReport = {};
        var formDefs = defs.map(function (formDef) {
            eachComponent(formDef.components, function (comp) {
                var _a, _b, _c, _d, _e;
                currentComponent = comp;
                try {
                    // Attempt to convert each component
                    if (comp.customConditional || comp.calculateValue || ((_a = comp.validate) === null || _a === void 0 ? void 0 : _a.custom)) {
                        if (comp.customConditional) {
                            var cleanCustomConditional = scrubJSString(comp.customConditional);
                            var conditionalLogic = convertCustomJS(cleanCustomConditional, typings_1.CustomJSLogicType.DISPLAY, comp.type, undefined, comp.key, defs, testing, clientId);
                            if (conditionalLogic && conditionalLogic.result) {
                                comp.conditionalLogic = conditionalLogic.result;
                                delete comp.customConditional;
                                addConversionOutcomeToReport(conversionOutcomeReport, comp.type, typings_1.ConversionOutcome.SUCCESS, typings_1.CustomJSLogicType.DISPLAY);
                            }
                        }
                        if (comp.calculateValue) {
                            var cleanCalculateValue = scrubJSString(comp.calculateValue);
                            var conditionalValue = convertCustomJS(cleanCalculateValue, typings_1.CustomJSLogicType.CALCULATED_VALUE, comp.type, undefined, comp.key, defs, testing, clientId);
                            if (conditionalValue && conditionalValue.result) {
                                switch (conditionalValue.resultType) {
                                    case 'formula':
                                        var refFieldProp = (_b = comp.type) === null || _b === void 0 ? void 0 : _b.split('-').join('.');
                                        var formula = __assign({ property: refFieldProp }, conditionalValue.result);
                                        comp.formula = formula;
                                        delete comp.calculateValue;
                                        break;
                                    case 'setValue':
                                        comp.conditionalValue = [conditionalValue.result];
                                        delete comp.calculateValue;
                                        break;
                                }
                                addConversionOutcomeToReport(conversionOutcomeReport, comp.type, typings_1.ConversionOutcome.SUCCESS, typings_1.CustomJSLogicType.CALCULATED_VALUE);
                            }
                        }
                        if ((_c = comp.validate) === null || _c === void 0 ? void 0 : _c.custom) {
                            var cleanValidationString = scrubJSString(comp.validate.custom);
                            var customValidation = convertCustomJS(cleanValidationString, typings_1.CustomJSLogicType.VALIDITY, comp.type, (_d = comp.validate) === null || _d === void 0 ? void 0 : _d.customMessage, comp.key, defs, testing, clientId);
                            if (customValidation) {
                                // if custom validation chunk is value, map to ref field prop
                                comp.customValidation = customValidation.result;
                                delete comp.validate;
                                addConversionOutcomeToReport(conversionOutcomeReport, comp.type, typings_1.ConversionOutcome.SUCCESS, typings_1.CustomJSLogicType.VALIDITY);
                            }
                        }
                    }
                    else {
                        // skipped
                    }
                }
                catch (e) {
                    var error = e;
                    if ('errorType' in error) {
                        console.log(error);
                        addConversionErrorToReport(conversionErrorReport, comp.type, (_e = error === null || error === void 0 ? void 0 : error.errorType) !== null && _e !== void 0 ? _e : typings_1.ConversionExceptionTypes.UNKNOWN_ERROR);
                    }
                    else {
                        addConversionErrorToReport(conversionErrorReport, comp.type, typings_1.ConversionExceptionTypes.UNKNOWN_ERROR);
                    }
                }
            });
            return formDef;
        });
        var result = {
            formDefs: formDefs,
            conversionOutcomeReport: conversionOutcomeReport,
            conversionErrorReport: conversionErrorReport
        };
        return result;
    }
    var parserOptions, singleCondition, twoConditions, JS, testsPass, componentsWithoutJSResults, componentsWithValidationResults, validationResultsParsed, validationPasses, componentsWithDisplayResults, displayResultsParsed, displayPasses, componentsWithCalculateValueResults, calculateValueResultsParsed, calculateValuePasses, data;
    return __generator(this, function (_a) {
        parserOptions = {
            locations: true,
            ecmaVersion: 2020,
            sourceType: 'script',
        };
        singleCondition = "valid = input <= 10000 ? true : 'Please enter an amount $10000 or less';";
        twoConditions = "show = (data.sumOfAggregateFields === 0.50 && data.sumOfAggregateFields === 1.50);true;";
        JS = singleCondition;
        testsPass = false;
        try {
            componentsWithoutJSResults = convertArrayOfFormDefs(test_components_1.componentsWithoutCustomJS, true);
            // should have no results because no logic
            chai_1.expect(componentsWithoutJSResults.conversionErrorReport).to.equal('{}');
            chai_1.expect(componentsWithoutJSResults.conversionOutcomeReport).to.equal('{}');
            componentsWithValidationResults = convertArrayOfFormDefs(test_components_1.componentsWithValidationJS, true);
            validationResultsParsed = JSON.parse(componentsWithValidationResults.conversionOutcomeReport);
            validationPasses = everyResultItemMatchesOutcomeAndType(validationResultsParsed, typings_1.ConversionOutcome.SUCCESS, typings_1.CustomJSLogicType.VALIDITY);
            // should not have any errors
            chai_1.expect(componentsWithValidationResults.conversionErrorReport).to.equal('{}');
            // all conversions should pass
            chai_1.expect(validationPasses).to.be.true;
            componentsWithDisplayResults = convertArrayOfFormDefs(test_components_1.componentsWithDisplayJS, true);
            displayResultsParsed = JSON.parse(componentsWithDisplayResults.conversionOutcomeReport);
            displayPasses = everyResultItemMatchesOutcomeAndType(displayResultsParsed, typings_1.ConversionOutcome.SUCCESS, typings_1.CustomJSLogicType.DISPLAY);
            // should not have any errors
            chai_1.expect(componentsWithDisplayResults.conversionErrorReport).to.equal('{}');
            // all conversions should pass
            chai_1.expect(displayPasses).to.be.true;
            componentsWithCalculateValueResults = convertArrayOfFormDefs(test_components_1.componentsWithCalculateValue, true);
            calculateValueResultsParsed = JSON.parse(componentsWithCalculateValueResults.conversionOutcomeReport);
            calculateValuePasses = everyResultItemMatchesOutcomeAndType(calculateValueResultsParsed, typings_1.ConversionOutcome.SUCCESS, typings_1.CustomJSLogicType.CALCULATED_VALUE);
            // should not have any errors
            chai_1.expect(componentsWithCalculateValueResults.conversionErrorReport).to.equal('{}');
            // all conversions should pass
            chai_1.expect(calculateValuePasses).to.be.true;
            test_components_1.testSets.forEach(function (testSet, index) {
                var _a, _b;
                // TODO, is needed?
                var convertedTestSet = convertArrayOfFormDefs(testSet[0], true);
                var convertedTestsetParsed = JSON.parse(convertedTestSet.definition) instanceof (Array) ? JSON.parse(convertedTestSet.definition)[0] : JSON.parse(convertedTestSet.definition);
                var convertedTestSetParsed = convertedTestsetParsed.components;
                // maybe add check for each type of logic and then compare?
                if (convertedTestSetParsed[0].formula) {
                    chai_1.expect(convertedTestSetParsed[0].formula).excluding('identifier').to.deep.equal(testSet[1][0].components[0].formula);
                }
                if (convertedTestSetParsed[0].customValidation) {
                    chai_1.expect(convertedTestSetParsed[0].customValidation.conditions).excluding('identifier').to.deep.equal((_a = testSet[1][0].components[0].customValidation) === null || _a === void 0 ? void 0 : _a.conditions);
                }
                if (convertedTestSetParsed[0].conditionalLogic) {
                    chai_1.expect(convertedTestSetParsed[0].conditionalLogic.conditions).excluding('identifier').to.deep.equal((_b = testSet[1][0].components[0].conditionalLogic) === null || _b === void 0 ? void 0 : _b.conditions);
                }
                if (convertedTestSetParsed[0].conditionalValue) {
                    chai_1.expect(convertedTestSetParsed[0].conditionalValue).excluding('identifier').to.deep.equal(testSet[1][0].components[0].conditionalValue);
                }
            });
            testsPass = true;
        }
        catch (e) {
            console.log(e);
            testsPass = false;
        }
        data = [];
        if (testsPass) {
            fs.createReadStream('/Users/drew.wyckoff/Projects/Node scripts/src/conversion_forms_qa.csv')
                .pipe(csv_parser_1.default())
                .on('data', function (chunk) {
                try {
                    var formDef = JSON.parse(chunk.definition);
                    var clientId = JSON.parse(chunk.clientId);
                    var arrayOfFormDef = formDef instanceof Array ? formDef : [formDef];
                    var conversionResult = convertArrayOfFormDefs(arrayOfFormDef, false, clientId);
                    if (conversionResult.conversionErrorReport !== '{}' ||
                        conversionResult.conversionOutcomeReport !== '{}') {
                        var result = __assign(__assign({}, chunk), conversionResult);
                        data.push(result);
                    }
                }
                catch (e) {
                    // unable to parse JSON for row
                    var formId = JSON.parse(chunk.formId);
                    console.log('unable to parse ID:', formId);
                }
            })
                .on('end', function () {
                var csvWriter = createCsvWriter({
                    path: '/Users/drew.wyckoff/Projects/Node scripts/src/conversion_forms_qa_output.csv',
                    header: [
                        { id: 'clientId', title: 'clientId' },
                        { id: 'clientName', title: 'clientName' },
                        { id: 'formName', title: 'formName' },
                        { id: 'formId', title: 'formId' },
                        { id: 'formRevisionId', title: 'formRevisionId' },
                        { id: 'version', title: 'version' },
                        { id: 'definition', title: 'definition' },
                        { id: 'conversionOutcomeReport', title: 'conversionOutcomeReport' },
                        { id: 'conversionErrorReport', title: 'conversionErrorReport' }
                    ]
                });
                csvWriter.writeRecords(data)
                    .then(function () {
                    console.log('done, tada!');
                });
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
            });
        }
        return [2 /*return*/];
    });
}); };
JSParser();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9tYWluLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsMkNBQStCO0FBQy9CLDZCQUE4QjtBQUM5Qiw4REFBdUM7QUFDdkMsMERBQTZCO0FBQzdCLHFDQUF5QjtBQUN6QiwyQ0FBMkM7QUFDM0MscURBQTJKO0FBQzNKLHFDQUFxYTtBQUNyYSxJQUFNLElBQUksR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUE7QUFDNUIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxzQkFBVyxDQUFDLENBQUE7QUFDckIsSUFBSSxnQkFBcUIsQ0FBQztBQUMxQixJQUFNLGVBQWUsR0FBRyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUMscUJBQXFCLENBQUM7QUFDbkU7Ozs7Ozs7OztJQVNJO0FBQ0gsU0FBUyxhQUFhLENBQ3BCLFVBQXFDLEVBQ3JDLEVBQWlGLEVBQ2pGLFVBQTJCO0lBQTNCLDJCQUFBLEVBQUEsa0JBQTJCO0lBRTNCLGVBQWUsQ0FBQyxVQUFVLEVBQUUsRUFBRSxFQUFFLFVBQVUsRUFBRSxFQUFFLEVBQUUsSUFBSSxDQUFDLENBQUM7QUFDeEQsQ0FBQztBQUVELFNBQVMsZUFBZSxDQUN0QixVQUFxQyxFQUNyQyxFQUFpRixFQUNqRixVQUFtQixFQUNuQixJQUFZLEVBQ1osTUFBb0M7SUFFcEMsSUFBSSxHQUFHLElBQUksSUFBSSxFQUFFLENBQUM7SUFDbEIsVUFBVSxDQUFDLE9BQU8sQ0FBQyxVQUFDLFNBQVM7UUFDM0IsSUFBSSxDQUFDLFNBQVMsRUFBRTtZQUNkLE9BQU87U0FDUjtRQUNELElBQU0sVUFBVSxHQUFHLFNBQVMsQ0FBQyxPQUFPLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsT0FBTyxD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