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
            }
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
                // doesnt look like we are using prop to find the correct field for evaluation
                if (prop == comp.key) {
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
                        var mapValForCurrentComp = Fields_Map_1.FieldsArray.find(function (field) {
                            var clientMatches = +field.clientId === +clientId;
                            var keyMatches = field.key === compKey;
                            return clientMatches && keyMatches;
                        });
                        if (!mapValForFoundComp) {
                            throw new ConversionValidationException(typings_1.ConversionExceptionTypes.UNABLE_TO_FIND_FIELD);
                        }
                        var formatForFoundComp = getFormatByTypeOrField(mapValForFoundComp === null || mapValForFoundComp === void 0 ? void 0 : mapValForFoundComp.type, undefined);
                        var adaptedCompType = exports.standardFieldKeys.includes(compType) ? compType : undefined;
                        var formatForEvaluatedComp = getFormatByTypeOrField(mapValForCurrentComp === null || mapValForCurrentComp === void 0 ? void 0 : mapValForCurrentComp.type, adaptedCompType);
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
            });
            if (!foundComp) {
                throw new ConversionValidationException(typings_1.ConversionExceptionTypes.UNABLE_TO_FIND_FIELD);
            }
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
            var compFromForm = getFormCompFromProp(formDefs, prop, compType, testing, compKey, needToCompareTypes, clientId);
            if (compFromForm) {
                // this is for getting the property from the form config; only needed if it isn't a standard field
                var propOverride = '';
                if (exports.standardFieldKeys.includes(compFromForm.type)) {
                    root = 'application';
                }
                else {
                    propOverride = compFromForm.type.split('-')[1];
                    root = 'referenceFields';
                }
                return [root, propOverride !== null && propOverride !== void 0 ? propOverride : prop];
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
    function checkForUnsupportedLogic(logicString) {
        if (logicString.includes('.length') ||
            logicString.includes('.filter') ||
            logicString.includes('.every') ||
            logicString.includes('.some') ||
            logicString.includes('.find') ||
            logicString.includes('.split') ||
            logicString.includes('moment(')) {
            throw new ConversionValidationException(typings_1.ConversionExceptionTypes.LOGIC_STRING_INCLUDES_UNSUPPORTED_METHOD);
        }
    }
    function convertFormDefinitions(defs, testing, clientId) {
        var conversionOutcomeReport = {};
        var conversionErrorReport = {};
        var formDefs = defs.map(function (formDef) {
            eachComponent(formDef.components, function (comp) {
                var _a, _b, _c, _d, _e;
                currentComponent = comp;
                try {
                    // here o here
                    // Attempt to convert each component
                    if (comp.customConditional || comp.calculateValue || ((_a = comp.validate) === null || _a === void 0 ? void 0 : _a.custom)) {
                        if (comp.customConditional) {
                            var cleanCustomConditional = scrubJSString(comp.customConditional);
                            checkForUnsupportedLogic(cleanCustomConditional);
                            var conditionalLogic = convertCustomJS(cleanCustomConditional, typings_1.CustomJSLogicType.DISPLAY, comp.type, undefined, comp.key, defs, testing, clientId);
                            if (conditionalLogic && conditionalLogic.result) {
                                comp.conditionalLogic = conditionalLogic.result;
                                delete comp.customConditional;
                                //
                                addConversionOutcomeToReport(conversionOutcomeReport, comp.label || comp.type, typings_1.ConversionOutcome.SUCCESS, typings_1.CustomJSLogicType.DISPLAY);
                            }
                        }
                        if (comp.calculateValue) {
                            var cleanCalculateValue = scrubJSString(comp.calculateValue);
                            checkForUnsupportedLogic(cleanCalculateValue);
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
                                addConversionOutcomeToReport(conversionOutcomeReport, comp.label || comp.type, typings_1.ConversionOutcome.SUCCESS, typings_1.CustomJSLogicType.CALCULATED_VALUE);
                            }
                        }
                        if ((_c = comp.validate) === null || _c === void 0 ? void 0 : _c.custom) {
                            var cleanValidationString = scrubJSString(comp.validate.custom);
                            checkForUnsupportedLogic(cleanValidationString);
                            var customValidation = convertCustomJS(cleanValidationString, typings_1.CustomJSLogicType.VALIDITY, comp.type, (_d = comp.validate) === null || _d === void 0 ? void 0 : _d.customMessage, comp.key, defs, testing, clientId);
                            if (customValidation) {
                                // if custom validation chunk is value, map to ref field prop
                                comp.customValidation = customValidation.result;
                                delete comp.validate;
                                addConversionOutcomeToReport(conversionOutcomeReport, comp.label || comp.type, typings_1.ConversionOutcome.SUCCESS, typings_1.CustomJSLogicType.VALIDITY);
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
                        addConversionErrorToReport(conversionErrorReport, comp.label || comp.type, (_e = error === null || error === void 0 ? void 0 : error.errorType) !== null && _e !== void 0 ? _e : typings_1.ConversionExceptionTypes.UNKNOWN_ERROR);
                    }
                    else {
                        addConversionErrorToReport(conversionErrorReport, comp.label || comp.type, typings_1.ConversionExceptionTypes.UNKNOWN_ERROR);
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
            // console.log(e)
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