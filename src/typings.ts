
export enum ConversionExceptionTypes {
  UNKOWN_ERROR = 'Unknown error',
  MIX_BOOLEANS = 'MIX_BOOLEANS',
  BASE_OP_NOT_EQUALS = 'Base operator is not equals',
  FIRST_NODE_NOT_ASSIGNMENT = 'First Node type is not assignment',
  UNKNOWN_VARIABLE_DECLARED = "Unknown variable declared",
  UNKNOWN_PROPERTY_ON_FORM_DATA = "Unknown property on form data",
  UNSUPPORTED_EVALUATION_FOR_VALIDATION = "Unsupported evaluation for validation",
  NO_VALUE_FOR_LITERAL_EXPRESSION = "No value for literal expression",
  UNKNOWN_VALIDATION_ERROR = "Unknown validation error",
  NO_COMP_TYPE = "No comp type",
  CONDITIONAL_EXPRESSION_TOO_COMPLEX = "Conditional expression is too complex",
  CONDITIONAL_EXPRESSION_MALFORMED = "Conditional expression malformed",
  MISSING_ERROR_MESSAGE = "Missing error message",
  ERROR_MESSAGE_SETUP_INCORRECTLY = "Error message setup incorrectly",
  VALIDATION_STRING_IS_NOT_CONDITIONAL = "Validation string is not conditional",
  COMPONENT_NOT_ON_FORM = "Component referenced is not on form",
  UNABLE_TO_GET_FORMULA_VALUES = "Unable to get formula values",
  SET_VALUE_NODE_TYPE_NOT_LITERAL_OR_MEMBER_EXP = "Set value node type is not literal or member expression",
  UNABLE_TO_PARSE_FOR_DEF = "Unable to parse form def",
  UNKNOWN_ERROR_ADAPTING_COMP = "Unknown error adapting component",
  FORMULA_MUST_BE_ADDITIONS = "Formula must be addition",
  UNABLE_TO_INFER_FORM_FORMAT = "Unable to infer form format",
  CALL_EXPRESSIONS_NOT_SUPPORTED = "Call expressions not supported",
  REF_FIELD_TYPES_MUST_MATCH = "Reference field types must match",
  FIELD_MUST_HAVE_FIELD_TYPE_OR_COMP_TYPE = "Field must have field type or comp type",
  FIELDS_MUST_MATCH_TYPE_FOR_THIS_LOGIC = "Fields must match type for this logic",
  EMPLOYY_SSO_FIELDS_NOT_SUPPORTED = 'Employee SSO fields not supported',
  UNABLE_TO_FIND_FIELD = "Unable to find component on form"
}
export interface ConversionErrorReport {
  [x: string]: {
    errorType: 
    ConversionExceptionTypes
  }[]
}
export enum ReferenceFieldTypes {
  TextField = 'TextField',
  TextArea = 'TextArea',
  CustomDataTable = 'CustomDataTable',
  Number = 'Number',
  Checkbox = 'Checkbox',
  Date = 'Date',
  Radio = 'Radio',
  SelectBoxes = 'Selectboxes',
  FileUpload = 'FileUpload',
  ExternalAPI = 'ExternalAPI',
  Aggregate = 'Aggregate',
  Table = 'Table',
  Currency = 'Currency',
  Subset = 'Subset',
  DataPoint = 'DataPoint'
}
export interface OutcomeItem {
  outcome: ConversionOutcome;
  type: CustomJSLogicType;
}

export interface ConversionOutcomeReport {
  [x: string]: OutcomeItem[]
}
export enum ConversionOutcome {
  SUCCESS,
  FAILURE,
  NOT_ATTEMPTED
}
export enum CustomJSLogicType {
  VALIDITY,
  DISPLAY,
  CALCULATED_VALUE
}
export enum ConditionalLogicResultType {
  STATIC_VALUE,
  OTHER_COLUMN,
  VALIDATION_MESSAGE,
  RELATIVE_DATE
}
export enum EvaluationType {
  ConditionallyTrue,
  ConditionallyFalse,
  AlwaysTrue,
  AlwaysFalse
}
export enum FilterModalTypes {
  between = 'bt',
  equals = 'eq',
  notBlank = 'nb',
  isBlank = 'ib',
  blank = 'bl', // replaced with 'isBlank', but may still exist for saved reports in Grants
  notEqual = 'ne',
  containsList = 'or',
  contains = 'cn',
  startsWith = 'sw',
  endsWith = 'ew',
  greaterThan = 'gt',
  lessThan = 'lt',
  greaterThanOrEquals = 'ge',
  lessThanOrEquals = 'le',

  // relative dates
  Yesterday = 'yesterday',
  Today = 'today',
  Tomorrow = 'tomorrow',
  LastWeek = 'lastWeek',
  ThisWeek = 'thisWeek',
  LastMonth = 'lastMonth',
  Last6Months = 'last6Months',
  ThisMonth = 'thisMonth',
  LastYear = 'lastYear',
  ThisYear = 'thisYear',
  Last30Days = 'last30Days',
  Last365Days = 'last365Days',

  // multiple values
  multiValueIncludes = 'in',
  multiValueNotIncludes = 'din',
  multiValueEquals = 'meq',
  multiValueNotEquals = 'mne'
}
export interface BaseLogicCondition<
  T, K extends LogicColumn<T>
> {
  /* tuple(array) for property being evaluated [property(K1), subProperty(K2)?, subSubProperty(K3)?] */
  sourceColumn: K;
  /* require this result to be true for the next result */
  useAnd: boolean;
  comparison: FilterModalTypes;
  identifier: string;
}
export type PropColumn<T, K extends keyof T = keyof T> = [K];
export type NestedPropColumn<T, K1 extends keyof T = keyof T, K2 extends keyof T[K1] = keyof T[K1]> = [K1, K2];
export type NestedNestedPropColumn<T, K1 extends keyof T = keyof T, K2 extends keyof T[K1] = keyof T[K1], K3 extends keyof T[K1][K2] = keyof T[K1][K2]> = [K1, K2, K3];
export type LogicColumn<T> = PropColumn<T>|NestedPropColumn<T>|NestedNestedPropColumn<T>;
export type LogicColumnValue<T, C extends LogicColumn<T>> = C extends NestedNestedPropColumn<T, infer K1, infer K2, infer K3> ? T[K1][K2][K3] :
    C extends NestedPropColumn<T, infer K1, infer K2> ? T[K1][K2] :
    T extends PropColumn<T, infer K1> ? T[K1] :
    unknown;
    type Comparison<T> = T extends boolean ?
  FilterModalTypes.equals|FilterModalTypes.notEqual :
  FilterModalTypes;
export interface BaseValueLogicCondition<
  T, K extends LogicColumn<T>
> extends BaseLogicCondition<T, K> {
  /* standard operator for two value conditions e.g. equals, greater than, etc. */
  comparison: Exclude<Comparison<LogicColumnValue<T, K>>, FilterModalTypes.isBlank|FilterModalTypes.notBlank|FilterModalTypes.contains|FilterModalTypes.multiValueIncludes>;
}

export interface ValueLogicCondition<
  T, K extends LogicColumn<T>
> extends BaseValueLogicCondition<T, K> {
  /* value (must match type of column) */
  value: LogicColumnValue<T, K>;
}
export interface RelatedLogicCondition<
  T, K extends LogicColumn<T>, R extends LogicColumn<T>
> extends BaseValueLogicCondition<T, K> {
  /* tuple(array) for related property being evaluated [property(K1), subProperty(K2)?, subSubProperty(K3)?] (must match type of sourceColumn) */
  relatedColumn: R;
}

export interface RelatedLogicValueCondition<
  T, K extends LogicColumn<T>, R extends LogicColumn<T>
> extends RelatedLogicCondition<T, K, R> {
  value: LogicColumnValue<T, K>;
}

export interface OneOfLogicCondition<T, K extends LogicColumn<T>> extends BaseLogicCondition<T, K> {
  comparison: FilterModalTypes.multiValueIncludes;
  /* for 'one of' conditions, must be an array of values */
  value: LogicColumnValue<T, K>[];
}

export interface ContainsLogicCondition<T, K extends LogicColumn<T>> extends BaseLogicCondition<T, K> {
  comparison: FilterModalTypes.contains;
  /* 'contains' only applies to string columns */
  value: LogicColumnValue<T, K> extends string ? string : unknown;
}

export interface NonValueLogicCondition<T, K extends LogicColumn<T>> extends BaseLogicCondition<T, K> {
  /* 'blank' and 'not blank' do not need a value */
  comparison: FilterModalTypes.isBlank|FilterModalTypes.notBlank;
}
export type LogicCondition<T, K extends LogicColumn<T>> =
  ValueLogicCondition<T, K>|
  RelatedLogicCondition<T, K, LogicColumn<T>>|
  RelatedLogicValueCondition<T, K, LogicColumn<T>>|
  OneOfLogicCondition<T, K>|
  NonValueLogicCondition<T, K>|
  ContainsLogicCondition<T, K>;

export interface GlobalLogicGroup<T> extends LogicGroup<T> {
  // show versus hide
  // become valid versus become invalid
  evaluationType: EvaluationType;
  // TODO: not really applicable for non-boolean results, need to figure out more dynamic way of achieving this
}
export interface GlobalValueLogicGroup<T, V> extends GlobalLogicGroup<T> {
  result: V; // For set value logic, this is the value to set if the conditions pass
  resultType: ConditionalLogicResultType;
  resultConfig?: {
    operator: 'plus'|'minus';
    constant: number;
    constantUnits: 'days'|'weeks'|'years';
  };
}
export type LogicGroupType<T, V> = LogicGroup<T>|GlobalLogicGroup<T>|GlobalValueLogicGroup<T, V>;
export interface LogicGroup<T> {
  /* array of groups or conditions to be evaluated */
  conditions: (LogicCondition<T, LogicColumn<T>>|LogicGroup<T>)[];
  /* require this result to be true for the next result */
  useAnd: boolean;
  identifier: string;
}
export interface BaseApplicationForLogic {
  tabs: null[];
  layoutComponents: Record<string, null>;
  referenceFields: Record<string, any>;
  application: any; // can't be exported from GC
  reportFieldResponse: any; // can't be exported from GC
}

export interface FormDefinition {
  tabName?: string;
  components: FormDefinitionComponent[];
  uniqueId?: string;
  logic: any;
  index: number;
}

export interface FormDefinitionComponent {
  hideLabel?: boolean;
  decimalLimit?: number;
  requireDecimal?: boolean;
  label?: string;
  isHidden?: boolean;
  hiddenFromParent?: boolean;
  key: string;
  hidden?: boolean;
  value?: any;
  currencyDataKey?: string;
  placeholder?: string;
  description?: string;
  autoAdjust?: boolean;
  collapsible?: boolean;
  collapsed?: boolean;
  rowsPerPage?: number;
  width?: number;
  offset?: number;
  push?: number;
  pull?: number;
  defaultValue?: string;
  clearOnHide?: boolean;
  inputMask?: any;
  allowCalculateOverride?: boolean;
  validate?: {
    required: boolean;
    customMessage?: string;
    custom?: string;
    min?: number;
    max?: number;
    minLength?: number;
    maxLength?: number;
    minWords?: number;
    maxWords?: number;
    pattern?: string;
    validationResult?: string;
  };
  errorLabel?: string;
  tooltipText?: string;
  tooltip?: string;
  title?: string;
  legend?: string;
  components?: FormDefinitionComponent[]; // Panels, Wells, Fieldsets
  rows?: FormDefinitionComponent[][];
  columns?: FormDefinitionComponent[]; // Columns
  type: string;
  conditional?: {
    show: string|boolean;
    when: string;
    json?: string;
    eq: string;
  };
  // stores the old conditional logic in case we need to access it
  oldConditonal?: {
    show: string|boolean;
    when: string;
    json?: string;
    eq: string;
  };
  disabled?: boolean;
  selectedCustomDataTable?: string;
  specialHandlingInstructions?: string;
  customCurrency?: string;
  useCustomCurrency?: any;
  html?: string;
  content?: string;
  referenceFieldId?: number;
  referenceFieldType?: any;
  formAudience?: any;
  validationErrorMessage?: string;
  apiConfig?: any;
  reportFieldDataOptions?: any;
  relatedComponent?: string;
  dataUpdates?: number;
  truthyValue?: string;
  falsyValue?: string;
  recuseValue?: string;
  calculateValue?: string;
  items?: string[];
  allowMultiple?: boolean;
  inKindItemsForPdf?: {
    label: string;
    value: any;
  }[];
  customConditional?: string;
  conditionalLogic?: GlobalLogicGroup<BaseApplicationForLogic>;
  customValidation?: GlobalValueLogicGroup<BaseApplicationForLogic, string>;
  formula?: any;
  visibleToApplicants?: boolean;
  visibleToManagers?: boolean;
  required?: boolean;
  validationTotal?: number;
  allOptionsMustHaveResponse?: boolean;
  itemsShownBeforeScroll?: number;
  inline?: boolean;
  input?: boolean;
  dataSrc?: string;
  defaultVal?: string;
  appliedDefaultVal?: boolean;
  prefix?: string;
  suffix?: string;
  showWordCount?: boolean;
  showCharCount?: boolean;
  tabIndex?: number;
  hideWithoutParentVal?: boolean;
  allowRecused?: boolean;
  requireFileUpload?: boolean;
  requireReason?: boolean;
  displayInKindValues?: boolean;
  maxItems?: number;
  validationType?: any;
  willBeValid?: any;
  validationAmount?: number;
  validationItem?: string;
  showCategory?: boolean;
  displayType?: any;
  conditionalValue?: GlobalValueLogicGroup<BaseApplicationForLogic, any>[];
}
export enum FormulaEvaluationType {
  Add = 0,
  Subtract = 1,
  Divide = 2,
  Multiply = 3,
  Average = 4
}

export enum FormulaStepValueType {
  Fixed = 0,
  NestedStep = 1,
  ParentValue = 2
}

export interface ValidationLogicChunk { 
  type: "column" | "value" | "literal",
  columns: string[],
  literalVal: any,
  isValue: boolean 
}

export interface CustomValidationFromConversion { leftChunk: ValidationLogicChunk | undefined; rightChunk: ValidationLogicChunk | undefined; comparison: string | undefined; errorMsg: string | undefined; }

export const formDefinitionsForTest = [{
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
}] as FormDefinition[]