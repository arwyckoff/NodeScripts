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
var csv_parser_1 = __importDefault(require("csv-parser"));
var fs = __importStar(require("fs"));
var test_components_1 = require("./test-components");
var typings_1 = require("./typings");
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
    function convertCustomJS(customJS, logicType, compType, customMessage, compKey, formDefs) {
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
            try {
                switch (logicType) {
                    case typings_1.CustomJSLogicType.DISPLAY:
                        var conditionalLogic = convertJSStringToLogicGroup(parsed.right, parsed, compType, compKey, formDefs);
                        return {
                            result: conditionalLogic,
                            resultType: 'display'
                        };
                    case typings_1.CustomJSLogicType.CALCULATED_VALUE:
                        var result = getResultFromCalculateValueString(parsed.right, parsed, formDefs, compType);
                        return result;
                    case typings_1.CustomJSLogicType.VALIDITY:
                        var customValidation = convertJSStringToCustomValidation(parsed.right, compType, customMessage, formDefs);
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
            }
            catch (e) {
                throw new ConversionValidationException(typings_1.ConversionExceptionTypes.UNKNOWN_ERROR_ADAPTING_COMP);
            }
        }
        function getValidationResult(customValidation) {
            var _a, _b, _c, _d, _e, _f;
            var value = ((_a = customValidation.leftChunk) === null || _a === void 0 ? void 0 : _a.type) == 'literal' ? (_b = customValidation.leftChunk) === null || _b === void 0 ? void 0 : _b.literalVal : ((_c = customValidation.rightChunk) === null || _c === void 0 ? void 0 : _c.type) == 'literal' ? (_d = customValidation.rightChunk) === null || _d === void 0 ? void 0 : _d.literalVal : null;
            var validationResult = {
                evaluationType: typings_1.EvaluationType.ConditionallyTrue,
                useAnd: false,
                identifier: nonce(),
                conditions: [{
                        sourceColumn: (_e = customValidation.leftChunk) === null || _e === void 0 ? void 0 : _e.columns,
                        comparison: customValidation.comparison,
                        identifier: nonce(),
                        value: value,
                        relatedColumn: (_f = customValidation.rightChunk) === null || _f === void 0 ? void 0 : _f.columns
                    }],
                resultType: typings_1.ConditionalLogicResultType.VALIDATION_MESSAGE,
                result: customValidation.errorMsg
            };
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
    function convertJSStringToCustomValidation(node, compType, customMessage, formDefs) {
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
                    leftChunk = getValidationChunk(node, true, compType, formDefs);
                    rightChunk = getValidationChunk(node, false, compType, formDefs);
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
    function convertJSStringToLogicGroup(node, parentNode, compType, compkey, formDefs) {
        var conditions = getConditionsFromJSString(node, parentNode, compType, compkey, 0, formDefs);
        return {
            evaluationType: typings_1.EvaluationType.ConditionallyTrue,
            useAnd: false,
            identifier: nonce(),
            conditions: [conditions]
        };
    }
    function recursGetColumnsForMathString(node, formDefs, compType) {
        var values = [];
        if (node.left.left && node.left.operator === AcornOperator.PLUS) {
            var baseCol = getColumn(node, false, undefined, formDefs, compType);
            values.push.apply(values, __spreadArray(__spreadArray([], recursGetColumnsForMathString(node.left, formDefs, compType)), [baseCol]));
        }
        else if (node.operator === AcornOperator.PLUS) {
            var leftCol = getColumn(node, true, undefined, formDefs, compType);
            var rightCol = getColumn(node, false, undefined, formDefs, compType);
            values.push(leftCol, rightCol);
        }
        return values;
    }
    function getFormulaFromBinaryExpressionNode(node, formDefs, compType) {
        var values = recursGetColumnsForMathString(node, formDefs, compType);
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
    function getSetValueFromJSString(node, parentNode, formDefs, compType) {
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
            var column = getColumn(parentNode, false, undefined, formDefs, compType);
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
    function getResultFromCalculateValueString(node, parentNode, formDefs, compType) {
        var result;
        if (node.type === NodeType.BINARY_EXPRESSION) {
            result = getFormulaFromBinaryExpressionNode(node, formDefs, compType);
            return {
                result: result,
                resultType: 'formula'
            };
        }
        else {
            result = getSetValueFromJSString(node, parentNode, formDefs, compType);
            return {
                result: result,
                resultType: 'setValue'
            };
        }
    }
    function getConditionsFromJSString(node, parentNode, compType, compKey, depth, formDefs) {
        var conditions;
        var comparison;
        var sourceColumn;
        var relatedColumn;
        var value;
        var useAnd;
        var multipleConditionsCheck = checkForMultipleConditions(node, parentNode);
        // if (compKey === 'referenceFields-financialcontent' || compKey === 'financialcontent') {
        //   console.log(multipleConditionsCheck.isMultipleConditions)
        // asdf === 'asdf' || (asdf === 'asdf' || asdf === 'asdf')
        // asdf || asdf || asdf
        // }
        if (multipleConditionsCheck.isMultipleConditions) {
            var left = node.left;
            var right = node.right;
            var leftCondition = left ? getConditionsFromJSString(left, node, compType, compKey, depth + 1, formDefs) : [];
            var rightCondition = right ? getConditionsFromJSString(right, node, compType, compKey, depth + 1, formDefs) : [];
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
        }
        comparison = getComparison(node);
        sourceColumn = getColumn(node, true, compKey, formDefs, compType);
        relatedColumn = getColumn(node, false, compKey, formDefs, compType);
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
            if ((response[key] == null || !response[key] || !((_a = response[key]) === null || _a === void 0 ? void 0 : _a.length)) && key !== 'useAnd') {
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
    function getFormCompFromProp(formDefs, prop) {
        var foundComp = undefined;
        formDefs.find(function (formDef) {
            eachComponent(formDef.components, function (comp) {
                if (comp.key == prop) {
                    foundComp = comp;
                    return true;
                }
            });
            return foundComp;
        });
        return foundComp;
    }
    function getColumn(node, evaluateLeft, compKey, formDefs, compType) {
        var _a, _b, _c, _d, _e;
        // validate that it exists on form
        var logicalGroup = evaluateLeft ? node.left : node.right;
        var obj = (_b = (_a = logicalGroup === null || logicalGroup === void 0 ? void 0 : logicalGroup.object) === null || _a === void 0 ? void 0 : _a.name) !== null && _b !== void 0 ? _b : false;
        var prop = (_e = (((_c = logicalGroup === null || logicalGroup === void 0 ? void 0 : logicalGroup.property) === null || _c === void 0 ? void 0 : _c.name) || ((_d = logicalGroup === null || logicalGroup === void 0 ? void 0 : logicalGroup.property) === null || _d === void 0 ? void 0 : _d.value))) !== null && _e !== void 0 ? _e : false;
        var root;
        if (obj && prop) {
            var compFromForm = getFormCompFromProp(formDefs, prop);
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
    function convertArrayOfFormDefs(arrayOfFormDef) {
        var conversionResult = convertFormDefinitions(arrayOfFormDef);
        // add columns for conversion types
        // validation converted
        // display converted
        // 
        // if no outcomes don't add form def
        var stringifyDef = JSON.stringify(conversionResult.formDefs);
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
    function getValidationChunk(node, evaluateLeft, compType, formDefs) {
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
                var columns = getColumn(node.test, evaluateLeft, undefined, formDefs, compType);
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
    function convertFormDefinitions(defs) {
        var conversionOutcomeReport = {};
        var conversionErrorReport = {};
        var formDefs = defs.map(function (formDef) {
            // let adaptedComps: FormDefinitionComponent[] = [];
            try {
                eachComponent(formDef.components, function (comp) {
                    var _a, _b, _c, _d;
                    try {
                        // Attempt to convert each component
                        if (comp.customConditional || comp.calculateValue || ((_a = comp.validate) === null || _a === void 0 ? void 0 : _a.custom)) {
                            if (comp.customConditional) {
                                var cleanCustomConditional = scrubJSString(comp.customConditional);
                                var conditionalLogic = convertCustomJS(cleanCustomConditional, typings_1.CustomJSLogicType.DISPLAY, comp.type, undefined, comp.key, defs);
                                if (conditionalLogic && conditionalLogic.result) {
                                    comp.conditionalLogic = conditionalLogic.result;
                                    delete comp.customConditional;
                                    addConversionOutcomeToReport(conversionOutcomeReport, comp.type, typings_1.ConversionOutcome.SUCCESS, typings_1.CustomJSLogicType.DISPLAY);
                                }
                            }
                            if (comp.calculateValue) {
                                var cleanCalculateValue = scrubJSString(comp.calculateValue);
                                var conditionalValue = convertCustomJS(cleanCalculateValue, typings_1.CustomJSLogicType.CALCULATED_VALUE, comp.type, undefined, comp.key, defs);
                                if (conditionalValue && conditionalValue.result) {
                                    switch (conditionalValue.resultType) {
                                        case 'formula':
                                            var refFieldProp = (_b = comp.type) === null || _b === void 0 ? void 0 : _b.split('-').join('.');
                                            var formula = {
                                                property: refFieldProp,
                                                step: conditionalValue.result
                                            };
                                            comp.formula = formula;
                                            delete comp.calculateValue;
                                            break;
                                        case 'setValue':
                                            comp.conditionalValue = conditionalValue.result;
                                            delete comp.calculateValue;
                                            break;
                                    }
                                    addConversionOutcomeToReport(conversionOutcomeReport, comp.type, typings_1.ConversionOutcome.SUCCESS, typings_1.CustomJSLogicType.CALCULATED_VALUE);
                                }
                            }
                            if ((_c = comp.validate) === null || _c === void 0 ? void 0 : _c.custom) {
                                var cleanValidationString = scrubJSString(comp.validate.custom);
                                var customValidation = convertCustomJS(cleanValidationString, typings_1.CustomJSLogicType.VALIDITY, comp.type, (_d = comp.validate) === null || _d === void 0 ? void 0 : _d.customMessage, comp.key, defs);
                                if (customValidation) {
                                    // if custom validation chunk is value, map to ref field prop
                                    comp.customValidation = customValidation;
                                    delete comp.calculateValue;
                                    addConversionOutcomeToReport(conversionOutcomeReport, comp.type, typings_1.ConversionOutcome.SUCCESS, typings_1.CustomJSLogicType.VALIDITY);
                                }
                            }
                        }
                        else {
                            // skipped
                        }
                    }
                    catch (e) {
                        // console.log(e)
                        var error = e;
                        if ('errorType' in error) {
                            // console.log(error.errorType)
                            addConversionErrorToReport(conversionErrorReport, comp.type, error.errorType);
                        }
                        else {
                            addConversionErrorToReport(conversionErrorReport, comp.type, typings_1.ConversionExceptionTypes.UNKOWN_ERROR);
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
                return formDef;
            }
            catch (e) {
                throw new ConversionValidationException(typings_1.ConversionExceptionTypes.UNKNOWN_ERROR_ADAPTING_COMP);
            }
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
            componentsWithoutJSResults = convertArrayOfFormDefs(test_components_1.componentsWithoutCustomJS);
            // should have no results because no logic
            chai_1.expect(componentsWithoutJSResults.conversionErrorReport).to.equal('{}');
            chai_1.expect(componentsWithoutJSResults.conversionOutcomeReport).to.equal('{}');
            componentsWithValidationResults = convertArrayOfFormDefs(test_components_1.componentsWithValidationJS);
            validationResultsParsed = JSON.parse(componentsWithValidationResults.conversionOutcomeReport);
            validationPasses = everyResultItemMatchesOutcomeAndType(validationResultsParsed, typings_1.ConversionOutcome.SUCCESS, typings_1.CustomJSLogicType.VALIDITY);
            // should not have any errors
            chai_1.expect(componentsWithValidationResults.conversionErrorReport).to.equal('{}');
            // all conversions should pass
            chai_1.expect(validationPasses).to.be.true;
            componentsWithDisplayResults = convertArrayOfFormDefs(test_components_1.componentsWithDisplayJS);
            displayResultsParsed = JSON.parse(componentsWithDisplayResults.conversionOutcomeReport);
            displayPasses = everyResultItemMatchesOutcomeAndType(displayResultsParsed, typings_1.ConversionOutcome.SUCCESS, typings_1.CustomJSLogicType.DISPLAY);
            // should not have any errors
            chai_1.expect(componentsWithDisplayResults.conversionErrorReport).to.equal('{}');
            // all conversions should pass
            chai_1.expect(displayPasses).to.be.true;
            componentsWithCalculateValueResults = convertArrayOfFormDefs(test_components_1.componentsWithCalculateValue);
            calculateValueResultsParsed = JSON.parse(componentsWithCalculateValueResults.conversionOutcomeReport);
            calculateValuePasses = everyResultItemMatchesOutcomeAndType(calculateValueResultsParsed, typings_1.ConversionOutcome.SUCCESS, typings_1.CustomJSLogicType.CALCULATED_VALUE);
            // should not have any errors
            chai_1.expect(componentsWithCalculateValueResults.conversionErrorReport).to.equal('{}');
            // all conversions should pass
            chai_1.expect(calculateValuePasses).to.be.true;
            test_components_1.testSets.forEach(function (testSet) {
                var convertedTestSet = convertArrayOfFormDefs(testSet[0]);
                var convertedTestSetParsed = JSON.parse(convertedTestSet.definition);
                chai_1.expect(convertedTestSetParsed).to.deep.equal(testSet[1]);
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
                    var arrayOfFormDef = formDef instanceof Array ? formDef : [formDef];
                    var conversionResult = convertArrayOfFormDefs(arrayOfFormDef);
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
                    // throw new ConversionValidationException(ConversionExceptionTypes.UNABLE_TO_PARSE_FOR_DEF)
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
//# sourceMappingURL=main.js.map