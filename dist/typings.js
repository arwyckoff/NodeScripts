"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formDefinitionsForTest = exports.FormulaStepValueType = exports.FormulaEvaluationType = exports.FilterModalTypes = exports.EvaluationType = exports.ConditionalLogicResultType = exports.CustomJSLogicType = exports.ConversionOutcome = exports.ReferenceFieldTypes = exports.ConversionExceptionTypes = void 0;
var ConversionExceptionTypes;
(function (ConversionExceptionTypes) {
    ConversionExceptionTypes["UNKNOWN_ERROR"] = "Unknown error";
    ConversionExceptionTypes["MIX_BOOLEANS"] = "MIX_BOOLEANS";
    ConversionExceptionTypes["BASE_OP_NOT_EQUALS"] = "Base operator is not equals";
    ConversionExceptionTypes["FIRST_NODE_NOT_ASSIGNMENT"] = "First Node type is not assignment";
    ConversionExceptionTypes["UNKNOWN_VARIABLE_DECLARED"] = "Unknown variable declared";
    ConversionExceptionTypes["UNKNOWN_PROPERTY_ON_FORM_DATA"] = "Unknown property on form data";
    ConversionExceptionTypes["UNSUPPORTED_EVALUATION_FOR_VALIDATION"] = "Unsupported evaluation for validation";
    ConversionExceptionTypes["NO_VALUE_FOR_LITERAL_EXPRESSION"] = "No value for literal expression";
    ConversionExceptionTypes["UNKNOWN_VALIDATION_ERROR"] = "Unknown validation error";
    ConversionExceptionTypes["NO_COMP_TYPE"] = "No comp type";
    ConversionExceptionTypes["CONDITIONAL_EXPRESSION_TOO_COMPLEX"] = "Conditional expression is too complex";
    ConversionExceptionTypes["CONDITIONAL_EXPRESSION_MALFORMED"] = "Conditional expression malformed";
    ConversionExceptionTypes["MISSING_ERROR_MESSAGE"] = "Missing error message";
    ConversionExceptionTypes["ERROR_MESSAGE_SETUP_INCORRECTLY"] = "Error message setup incorrectly";
    ConversionExceptionTypes["VALIDATION_STRING_IS_NOT_CONDITIONAL"] = "Validation string is not conditional";
    ConversionExceptionTypes["COMPONENT_NOT_ON_FORM"] = "Component referenced is not on form";
    ConversionExceptionTypes["UNABLE_TO_GET_FORMULA_VALUES"] = "Unable to get formula values";
    ConversionExceptionTypes["SET_VALUE_NODE_TYPE_NOT_LITERAL_OR_MEMBER_EXP"] = "Set value node type is not literal or member expression";
    ConversionExceptionTypes["UNABLE_TO_PARSE_FOR_DEF"] = "Unable to parse form def";
    ConversionExceptionTypes["UNKNOWN_ERROR_ADAPTING_COMP"] = "Unknown error adapting component";
    ConversionExceptionTypes["FORMULA_MUST_BE_ADDITIONS"] = "Formula must be addition";
    ConversionExceptionTypes["UNABLE_TO_INFER_FORM_FORMAT"] = "Unable to infer form format";
    ConversionExceptionTypes["CALL_EXPRESSIONS_NOT_SUPPORTED"] = "Call expressions not supported";
    ConversionExceptionTypes["REF_FIELD_TYPES_MUST_MATCH"] = "Reference field types must match";
    ConversionExceptionTypes["FIELD_MUST_HAVE_FIELD_TYPE_OR_COMP_TYPE"] = "Field must have field type or comp type";
    ConversionExceptionTypes["FIELDS_MUST_MATCH_TYPE_FOR_THIS_LOGIC"] = "Fields must match type for this logic";
    ConversionExceptionTypes["EMPLOYY_SSO_FIELDS_NOT_SUPPORTED"] = "Employee SSO fields not supported";
    ConversionExceptionTypes["UNABLE_TO_FIND_FIELD"] = "Unable to find component on form";
    ConversionExceptionTypes["LOGIC_STRING_INCLUDES_UNSUPPORTED_METHOD"] = "Logic string includes unsupported method";
})(ConversionExceptionTypes = exports.ConversionExceptionTypes || (exports.ConversionExceptionTypes = {}));
var ReferenceFieldTypes;
(function (ReferenceFieldTypes) {
    ReferenceFieldTypes["TextField"] = "TextField";
    ReferenceFieldTypes["TextArea"] = "TextArea";
    ReferenceFieldTypes["CustomDataTable"] = "CustomDataTable";
    ReferenceFieldTypes["Number"] = "Number";
    ReferenceFieldTypes["Checkbox"] = "Checkbox";
    ReferenceFieldTypes["Date"] = "Date";
    ReferenceFieldTypes["Radio"] = "Radio";
    ReferenceFieldTypes["SelectBoxes"] = "Selectboxes";
    ReferenceFieldTypes["FileUpload"] = "FileUpload";
    ReferenceFieldTypes["ExternalAPI"] = "ExternalAPI";
    ReferenceFieldTypes["Aggregate"] = "Aggregate";
    ReferenceFieldTypes["Table"] = "Table";
    ReferenceFieldTypes["Currency"] = "Currency";
    ReferenceFieldTypes["Subset"] = "Subset";
    ReferenceFieldTypes["DataPoint"] = "DataPoint";
})(ReferenceFieldTypes = exports.ReferenceFieldTypes || (exports.ReferenceFieldTypes = {}));
var ConversionOutcome;
(function (ConversionOutcome) {
    ConversionOutcome["SUCCESS"] = "Success";
    ConversionOutcome["FAILURE"] = "Failure";
    ConversionOutcome["NOT_ATTEMPTED"] = "Not attempted";
})(ConversionOutcome = exports.ConversionOutcome || (exports.ConversionOutcome = {}));
var CustomJSLogicType;
(function (CustomJSLogicType) {
    CustomJSLogicType["VALIDITY"] = "Validity";
    CustomJSLogicType["DISPLAY"] = "Display";
    CustomJSLogicType["CALCULATED_VALUE"] = "Calculated Value";
})(CustomJSLogicType = exports.CustomJSLogicType || (exports.CustomJSLogicType = {}));
var ConditionalLogicResultType;
(function (ConditionalLogicResultType) {
    ConditionalLogicResultType[ConditionalLogicResultType["STATIC_VALUE"] = 0] = "STATIC_VALUE";
    ConditionalLogicResultType[ConditionalLogicResultType["OTHER_COLUMN"] = 1] = "OTHER_COLUMN";
    ConditionalLogicResultType[ConditionalLogicResultType["VALIDATION_MESSAGE"] = 2] = "VALIDATION_MESSAGE";
    ConditionalLogicResultType[ConditionalLogicResultType["RELATIVE_DATE"] = 3] = "RELATIVE_DATE";
})(ConditionalLogicResultType = exports.ConditionalLogicResultType || (exports.ConditionalLogicResultType = {}));
var EvaluationType;
(function (EvaluationType) {
    EvaluationType[EvaluationType["ConditionallyTrue"] = 0] = "ConditionallyTrue";
    EvaluationType[EvaluationType["ConditionallyFalse"] = 1] = "ConditionallyFalse";
    EvaluationType[EvaluationType["AlwaysTrue"] = 2] = "AlwaysTrue";
    EvaluationType[EvaluationType["AlwaysFalse"] = 3] = "AlwaysFalse";
})(EvaluationType = exports.EvaluationType || (exports.EvaluationType = {}));
var FilterModalTypes;
(function (FilterModalTypes) {
    FilterModalTypes["between"] = "bt";
    FilterModalTypes["equals"] = "eq";
    FilterModalTypes["notBlank"] = "nb";
    FilterModalTypes["isBlank"] = "ib";
    FilterModalTypes["blank"] = "bl";
    FilterModalTypes["notEqual"] = "ne";
    FilterModalTypes["containsList"] = "or";
    FilterModalTypes["contains"] = "cn";
    FilterModalTypes["startsWith"] = "sw";
    FilterModalTypes["endsWith"] = "ew";
    FilterModalTypes["greaterThan"] = "gt";
    FilterModalTypes["lessThan"] = "lt";
    FilterModalTypes["greaterThanOrEquals"] = "ge";
    FilterModalTypes["lessThanOrEquals"] = "le";
    // relative dates
    FilterModalTypes["Yesterday"] = "yesterday";
    FilterModalTypes["Today"] = "today";
    FilterModalTypes["Tomorrow"] = "tomorrow";
    FilterModalTypes["LastWeek"] = "lastWeek";
    FilterModalTypes["ThisWeek"] = "thisWeek";
    FilterModalTypes["LastMonth"] = "lastMonth";
    FilterModalTypes["Last6Months"] = "last6Months";
    FilterModalTypes["ThisMonth"] = "thisMonth";
    FilterModalTypes["LastYear"] = "lastYear";
    FilterModalTypes["ThisYear"] = "thisYear";
    FilterModalTypes["Last30Days"] = "last30Days";
    FilterModalTypes["Last365Days"] = "last365Days";
    // multiple values
    FilterModalTypes["multiValueIncludes"] = "in";
    FilterModalTypes["multiValueNotIncludes"] = "din";
    FilterModalTypes["multiValueEquals"] = "meq";
    FilterModalTypes["multiValueNotEquals"] = "mne";
})(FilterModalTypes = exports.FilterModalTypes || (exports.FilterModalTypes = {}));
var FormulaEvaluationType;
(function (FormulaEvaluationType) {
    FormulaEvaluationType[FormulaEvaluationType["Add"] = 0] = "Add";
    FormulaEvaluationType[FormulaEvaluationType["Subtract"] = 1] = "Subtract";
    FormulaEvaluationType[FormulaEvaluationType["Divide"] = 2] = "Divide";
    FormulaEvaluationType[FormulaEvaluationType["Multiply"] = 3] = "Multiply";
    FormulaEvaluationType[FormulaEvaluationType["Average"] = 4] = "Average";
})(FormulaEvaluationType = exports.FormulaEvaluationType || (exports.FormulaEvaluationType = {}));
var FormulaStepValueType;
(function (FormulaStepValueType) {
    FormulaStepValueType[FormulaStepValueType["Fixed"] = 0] = "Fixed";
    FormulaStepValueType[FormulaStepValueType["NestedStep"] = 1] = "NestedStep";
    FormulaStepValueType[FormulaStepValueType["ParentValue"] = 2] = "ParentValue";
})(FormulaStepValueType = exports.FormulaStepValueType || (exports.FormulaStepValueType = {}));
exports.formDefinitionsForTest = [{
        "tabName": "Page One",
        "components": [
            {
                "key": "customDataTable",
                "label": "Color picker",
                "type": "referenceFields-colorPicker",
                "placeholder": "",
                "validate": {
                    "required": false,
                    "customMessage": ""
                },
                "tooltip": "",
                "title": "",
                "legend": "",
                "description": "",
                "prefix": "",
                "suffix": "",
                "displayType": 1,
                "value": "",
                "customConditional": "show = data.sumOfAggregateFields >= 6;",
                "customValidation": {
                    "evaluationType": 0,
                    "useAnd": false,
                    "identifier": "9d2513226c534ccbbb22ed23e66c6ab0e29efd23a4a24b339558534217cf9f70",
                    "conditions": [
                        {
                            "sourceColumn": [
                                "application",
                                "amountRequested"
                            ],
                            "comparison": "eq",
                            "useAnd": false,
                            "identifier": "946cf197fea642ea9ddf79b32d2823650ba9c950385f4ad6bcac206565476abe",
                            "value": "12",
                            "relatedColumn": null
                        }
                    ],
                    "resultType": 2,
                    "result": "this is not right"
                },
                "conditionalLogic": {
                    "evaluationType": 2,
                    "useAnd": false,
                    "identifier": "8a1403f35b29473c804893a151d6eda0952355347ea54b8bb55a92ecffd6b3e4",
                    "conditions": []
                },
                "conditionalValue": [],
                "errorLabel": "",
                "isHidden": false,
                "hiddenFromParent": false,
                "useCustomCurrency": 1
            },
            {
                "key": "number",
                "label": "Sum of fields",
                "type": "referenceFields-sumOfAggregateFields",
                "placeholder": "",
                "validate": {
                    "required": false,
                    "custom": "valid = (+data.lowIncome || 0) > 7 ? true : 'noooooo'"
                },
                "tooltip": "",
                "title": "",
                "legend": "",
                "description": "",
                "prefix": "",
                "suffix": "",
                "displayType": 1,
                "value": null,
                "calculateValue": "value = data.things1 + data.thing2 + data.thing3",
                "customValidation": {
                    "evaluationType": 2,
                    "useAnd": false,
                    "identifier": "7be9e8c99d9f46d7b4dbda08387cc570a9544cbe47ef4bd5841f5ab7905c3121",
                    "conditions": [],
                    "result": "",
                    "resultType": 0
                },
                // "conditionalLogic": {
                //   "evaluationType": 2,
                //   "useAnd": false,
                //   "identifier": "0621ee219ce249d2959403fa10d609b4baa6124ac7074e9b95a9b9b6e0195014",
                //   "conditions": []
                // },
                "conditionalValue": [],
                "errorLabel": "",
                "isHidden": false,
                "hiddenFromParent": false,
                "useCustomCurrency": 1
            }
        ],
        "uniqueId": "8fb753b9-012b-47b5-931e-5695d5fe14dc",
        "index": 0,
        "logic": null
    }];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHlwaW5ncy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy90eXBpbmdzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLElBQVksd0JBOEJYO0FBOUJELFdBQVksd0JBQXdCO0lBQ2xDLDJEQUErQixDQUFBO0lBQy9CLHlEQUE2QixDQUFBO0lBQzdCLDhFQUFrRCxDQUFBO0lBQ2xELDJGQUErRCxDQUFBO0lBQy9ELG1GQUF1RCxDQUFBO0lBQ3ZELDJGQUErRCxDQUFBO0lBQy9ELDJHQUErRSxDQUFBO0lBQy9FLCtGQUFtRSxDQUFBO0lBQ25FLGlGQUFxRCxDQUFBO0lBQ3JELHlEQUE2QixDQUFBO0lBQzdCLHdHQUE0RSxDQUFBO0lBQzVFLGlHQUFxRSxDQUFBO0lBQ3JFLDJFQUErQyxDQUFBO0lBQy9DLCtGQUFtRSxDQUFBO0lBQ25FLHlHQUE2RSxDQUFBO0lBQzdFLHlGQUE2RCxDQUFBO0lBQzdELHlGQUE2RCxDQUFBO0lBQzdELHFJQUF5RyxDQUFBO0lBQ3pHLGdGQUFvRCxDQUFBO0lBQ3BELDRGQUFnRSxDQUFBO0lBQ2hFLGtGQUFzRCxDQUFBO0lBQ3RELHVGQUEyRCxDQUFBO0lBQzNELDZGQUFpRSxDQUFBO0lBQ2pFLDJGQUErRCxDQUFBO0lBQy9ELCtHQUFtRixDQUFBO0lBQ25GLDJHQUErRSxDQUFBO0lBQy9FLGtHQUFzRSxDQUFBO0lBQ3RFLHFGQUF5RCxDQUFBO0lBQ3pELGlIQUFxRixDQUFBO0FBQ3ZGLENBQUMsRUE5Qlcsd0JBQXdCLEdBQXhCLGdDQUF3QixLQUF4QixnQ0FBd0IsUUE4Qm5DO0FBTUQsSUFBWSxtQkFnQlg7QUFoQkQsV0FBWSxtQkFBbUI7SUFDN0IsOENBQXVCLENBQUE7SUFDdkIsNENBQXFCLENBQUE7SUFDckIsMERBQW1DLENBQUE7SUFDbkMsd0NBQWlCLENBQUE7SUFDakIsNENBQXFCLENBQUE7SUFDckIsb0NBQWEsQ0FBQTtJQUNiLHNDQUFlLENBQUE7SUFDZixrREFBMkIsQ0FBQTtJQUMz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