"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testSets = exports.componentsWithCalculateValueLikeSetValueResult = exports.componentsWithCalculateValueLikeSetValue = exports.componentsWithCustomConditionalConverted = exports.componentsWithCustomConditional = exports.componentsWithCustomValidationConverted = exports.componentsWithCustomValidation = exports.componentsWithCalculateValueSingleConverted = exports.componentsWithCalculateValueSingle = exports.componentsWithCalculateValueResult = exports.componentsWithCalculateValue = exports.componentsWithDisplayJS = exports.componentsWithValidationJS = exports.componentsWithoutCustomJS = void 0;
// COMPONENTS WITHOUT LOGIC
exports.componentsWithoutCustomJS = [
    {
        "logic": null,
        "index": 0,
        "components": [
            {
                "input": true,
                "inputMask": "",
                "label": "Date of Incident",
                "key": "fieldOne",
                "placeholder": "",
                "prefix": "",
                "suffix": "",
                "defaultValue": "",
                "hidden": false,
                "clearOnHide": true,
                "validate": {
                    "required": false,
                    "minLength": 1,
                    "maxLength": 2,
                    "pattern": "",
                    "custom": ""
                },
                "conditional": {
                    "show": "",
                    "when": "",
                    "eq": ""
                },
                "type": "referenceFields-fieldOne",
                "defaultVal": ""
            }
        ]
    }
];
// COMPONENTS WITH LOGIC
// VALIDATION
exports.componentsWithValidationJS = [
    {
        "logic": null,
        "index": 0,
        "components": [
            {
                "validate": {
                    "required": false,
                    "minLength": 1,
                    "maxLength": 1,
                    "pattern": "",
                    "custom": "valid = data.fieldOne >= 5 ? true : 'Please enter an amount 5 or more';"
                },
                "input": true,
                "inputMask": "",
                "label": "Date of Incident",
                "key": "fieldOne",
                "placeholder": "",
                "prefix": "",
                "suffix": "",
                "defaultValue": "",
                "hidden": false,
                "clearOnHide": true,
                "conditional": {
                    "show": "",
                    "when": "",
                    "eq": ""
                },
                "type": "referenceFields-fieldOne",
                "defaultVal": ""
            }
        ]
    }
];
// DISPLAY
exports.componentsWithDisplayJS = [
    {
        "logic": null,
        "index": 0,
        "components": [
            {
                "customConditional": "show = (data.fieldOne == 'Disaster - Earthquake'  || data.fieldOne == 'Disaster - Fire' || data.fieldOne == 'Disaster - Flood' || data.fieldOne == 'Disaster - Hurricane' || data.fieldOne == 'Disaster - Ice Storm' || data.fieldOne == 'Disaster - Non-Natural' || data.fieldOne == 'Disaster - Other Disaster' || data.fieldOne == 'Disaster - Tornado'); true;",
                "input": true,
                "inputMask": "",
                "label": "Date of Incident",
                "key": "fieldOne",
                "placeholder": "",
                "prefix": "",
                "suffix": "",
                "defaultValue": "",
                "hidden": false,
                "clearOnHide": true,
                "validate": {
                    "required": false,
                    "minLength": 1,
                    "maxLength": 2,
                    "pattern": "",
                    "custom": ""
                },
                "conditional": {
                    "show": "",
                    "when": "",
                    "eq": ""
                },
                "type": "referenceFields-fieldOne",
                "defaultVal": ""
            }
        ]
    }
];
// DISPLAY
exports.componentsWithCalculateValue = [
    {
        "logic": null,
        "index": 0,
        "components": [
            {
                "calculateValue": "value = (+data.fieldOne || 0) +(+data.fieldOne || 0) +(+data.fieldOne || 0) +(+data.fieldOne || 0) +(+data.fieldOne || 0) +(+data.fieldOne|| 0);",
                "input": true,
                "inputMask": "",
                "label": "Date of Incident",
                "key": "fieldOne",
                "placeholder": "",
                "prefix": "",
                "suffix": "",
                "defaultValue": "",
                "hidden": false,
                "clearOnHide": true,
                "validate": {
                    "required": false,
                    "minLength": 1,
                    "maxLength": 2,
                    "pattern": "",
                    "custom": ""
                },
                "conditional": {
                    "show": "",
                    "when": "",
                    "eq": ""
                },
                "type": "referenceFields-fieldOne",
                "defaultVal": ""
            }
        ]
    }
];
exports.componentsWithCalculateValueResult = [
    {
        "logic": null,
        "index": 0,
        "components": [
            {
                input: true,
                inputMask: '',
                label: 'Date of Incident',
                key: 'fieldOne',
                placeholder: '',
                prefix: '',
                suffix: '',
                defaultValue: '',
                hidden: false,
                clearOnHide: true,
                validate: {
                    required: false,
                    minLength: 1,
                    maxLength: 2,
                    pattern: '',
                    custom: ''
                },
                conditional: { show: '', when: '', eq: '' },
                type: 'referenceFields-fieldOne',
                defaultVal: '',
                formula: {
                    property: 'referenceFields.fieldOne',
                    step: {
                        type: 0, values: [{ value: 'referenceFields.fieldOne', type: 2 },
                            { value: 'referenceFields.fieldOne', type: 2 },
                            { value: 'referenceFields.fieldOne', type: 2 },
                            { value: 'referenceFields.fieldOne', type: 2 },
                            { value: 'referenceFields.fieldOne', type: 2 },
                            { value: 'referenceFields.fieldOne', type: 2 }]
                    }
                }
            }
        ]
    }
];
exports.componentsWithCalculateValueSingle = [
    {
        "logic": null,
        "index": 0,
        "components": [
            {
                "input": true,
                "customConditional": "show = data.fieldOne == ''",
                "inputMask": "",
                "label": "Date of Incident",
                "key": "fieldOne",
                "placeholder": "",
                "prefix": "",
                "suffix": "",
                "defaultValue": "",
                "hidden": false,
                "clearOnHide": true,
                "validate": {
                    "required": false,
                    "minLength": 1,
                    "maxLength": 2,
                    "pattern": "",
                    "custom": ""
                },
                "conditional": {
                    "show": "",
                    "when": "",
                    "eq": ""
                },
                "type": "referenceFields-fieldOne",
                "defaultVal": ""
            }
        ]
    }
];
exports.componentsWithCalculateValueSingleConverted = [
    {
        "logic": null,
        "index": 0,
        "components": [
            {
                "input": true,
                "inputMask": "",
                "label": "Date of Incident",
                "key": "fieldOne",
                "placeholder": "",
                "prefix": "",
                "suffix": "",
                "defaultValue": "",
                "hidden": false,
                "clearOnHide": true,
                "conditionalLogic": {
                    "evaluationType": 0,
                    "useAnd": false,
                    "identifier": "c93bd02965e948d4b2577143a401094ad8f7dd37404a4306bf2019d782730c3e",
                    "conditions": [
                        {
                            "sourceColumn": [
                                "referenceFields",
                                "fieldOne"
                            ],
                            "comparison": "eq",
                            "useAnd": false,
                            "identifier": "563aab06ff054d74a52e8858e19aab24c8d2f98db0dd448295cb47941d5abf95",
                            "value": ""
                        }
                    ]
                },
                "validate": {
                    "required": false,
                    "minLength": 1,
                    "maxLength": 2,
                    "pattern": "",
                    "custom": ""
                },
                "conditional": {
                    "show": "",
                    "when": "",
                    "eq": ""
                },
                "type": "referenceFields-fieldOne",
                "defaultVal": ""
            }
        ]
    }
];
exports.componentsWithCustomValidation = [
    {
        "logic": null,
        "index": 0,
        "components": [
            {
                "input": true,
                "inputMask": "",
                "label": "Date of Incident",
                "key": "fieldOne",
                "placeholder": "",
                "prefix": "",
                "suffix": "",
                "defaultValue": "",
                "hidden": false,
                "clearOnHide": true,
                "validate": {
                    "required": false,
                    "custom": "valid = value > 5 ? true : 'value must be greater than 5'",
                    "customMessage": "",
                },
                "conditional": {
                    "show": "",
                    "when": "",
                    "eq": ""
                },
                "type": "referenceFields-fieldOne",
                "defaultVal": ""
            }
        ]
    }
];
exports.componentsWithCustomValidationConverted = [
    {
        "logic": null,
        "index": 0,
        "components": [
            {
                "input": true,
                "inputMask": "",
                "label": "Date of Incident",
                "key": "fieldOne",
                "placeholder": "",
                "prefix": "",
                "suffix": "",
                "defaultValue": "",
                "hidden": false,
                "clearOnHide": true,
                "validate": {
                    "required": false,
                    "minLength": 1,
                    "maxLength": 2,
                    "pattern": "",
                    "custom": ""
                },
                "customValidation": {
                    "evaluationType": 0,
                    "useAnd": false,
                    "identifier": "7be9e8c99d9f46d7b4dbda08387cc570a9544cbe47ef4bd5841f5ab7905c3121",
                    "conditions": [
                        {
                            "sourceColumn": [
                                "referenceFields",
                                "fieldOne"
                            ],
                            "comparison": "gt",
                            "useAnd": false,
                            "identifier": "2ab8f20a2b1c42d5a2153d366bf2066fff885229cd9c4cc692f7a77ca93515c1",
                            "value": "5"
                        }
                    ],
                    "resultType": 2,
                    "result": "value must be greater than 5"
                },
                "conditional": {
                    "show": "",
                    "when": "",
                    "eq": ""
                },
                "type": "referenceFields-fieldOne",
                "defaultVal": ""
            }
        ]
    }
];
exports.componentsWithCustomConditional = [
    {
        "logic": null,
        "index": 0,
        "components": [
            {
                "input": true,
                "inputMask": "",
                "label": "Date of Incident",
                "key": "fieldOne",
                "placeholder": "",
                "prefix": "",
                "suffix": "",
                "defaultValue": "",
                "hidden": false,
                "clearOnHide": true,
                "customConditional": "show = ((data.fieldOne == 'financialSupportFunding' || data.fieldOne == 'eventSponsorship' || data.fieldOne == 'teamSponsorship'));",
                "conditional": {
                    "show": "",
                    "when": "",
                    "eq": ""
                },
                "type": "referenceFields-fieldOne",
                "defaultVal": ""
            }
        ]
    }
];
exports.componentsWithCustomConditionalConverted = [
    {
        "logic": null,
        "index": 0,
        "components": [
            {
                "input": true,
                "inputMask": "",
                "label": "Date of Incident",
                "key": "fieldOne",
                "placeholder": "",
                "prefix": "",
                "suffix": "",
                "defaultValue": "",
                "hidden": false,
                "clearOnHide": true,
                "conditionalLogic": {
                    "evaluationType": 0,
                    "useAnd": false,
                    "identifier": "aafd7fbd69204defbe0aab436f0dc26b97b8f1c076da47efbc618861b90e8275",
                    "conditions": [
                        {
                            "sourceColumn": [
                                "referenceFields", "fieldOne"
                            ],
                            "comparison": "eq",
                            "useAnd": false,
                            "identifier": "9fd22b0d8cbf4af48862fffe2b4da878bb24a4a67f6f4e29a28b007cd4fe1752",
                            "value": "financialSupportFunding"
                        },
                        {
                            "sourceColumn": [
                                "referenceFields", "fieldOne"
                            ],
                            "comparison": "eq",
                            "useAnd": false,
                            "identifier": "50d2a5065fd844558c0b5ac0cd5115b6488b0ec7d8934bd0bbfe30105309874a",
                            "value": "eventSponsorship"
                        },
                        {
                            "sourceColumn": [
                                "referenceFields", "fieldOne"
                            ],
                            "comparison": "eq",
                            "useAnd": false,
                            "identifier": "50d2a5065fd844558c0b5ac0cd5115b6488b0ec7d8934bd0bbfe30105309874a",
                            "value": "teamSponsorship"
                        }
                    ]
                },
                "conditional": {
                    "show": "",
                    "when": "",
                    "eq": ""
                },
                "type": "referenceFields-fieldOne",
                "defaultVal": ""
            }
        ]
    }
];
exports.componentsWithCalculateValueLikeSetValue = [
    {
        "logic": null,
        "index": 0,
        "components": [
            {
                "input": true,
                "inputMask": "",
                "calculateValue": "value = data.fieldOne",
                "label": "Date of Incident",
                "key": "fieldOne",
                "placeholder": "",
                "prefix": "",
                "suffix": "",
                "defaultValue": "",
                "hidden": false,
                "clearOnHide": true,
                "conditional": {
                    "show": "",
                    "when": "",
                    "eq": ""
                },
                "type": "referenceFields-fieldOne",
                "defaultVal": ""
            }
        ]
    }
];
exports.componentsWithCalculateValueLikeSetValueResult = [
    {
        "logic": null,
        "index": 0,
        "components": [
            {
                "input": true,
                "inputMask": "",
                "conditionalValue": [
                    {
                        "conditions": [],
                        "evaluationType": 2,
                        "identifier": "5366e03085fd467c986b0e91189cf86b7109d29a8bc9427baaf64c8aa4a2af7c",
                        "result": [
                            "referenceFields",
                            "fieldOne"
                        ],
                        "resultType": 1,
                        "useAnd": false
                    }
                ],
                "label": "Date of Incident",
                "key": "fieldOne",
                "placeholder": "",
                "prefix": "",
                "suffix": "",
                "defaultValue": "",
                "hidden": false,
                "clearOnHide": true,
                "conditional": {
                    "show": "",
                    "when": "",
                    "eq": ""
                },
                "type": "referenceFields-fieldOne",
                "defaultVal": ""
            }
        ]
    }
];
exports.testSets = [
    // [
    // input,
    // expected
    // ]
    [
        exports.componentsWithCalculateValue,
        exports.componentsWithCalculateValueResult
    ],
    [
        exports.componentsWithCustomValidation,
        exports.componentsWithCustomValidationConverted
    ],
    [
        exports.componentsWithCustomConditional,
        exports.componentsWithCustomConditionalConverted
    ],
    [
        exports.componentsWithCalculateValueLikeSetValue,
        exports.componentsWithCalculateValueLikeSetValueResult
    ],
    [
        exports.componentsWithCalculateValueSingle,
        exports.componentsWithCalculateValueSingleConverted
    ]
];
//# sourceMappingURL=test-components.js.map