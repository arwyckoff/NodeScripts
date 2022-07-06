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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdC1jb21wb25lbnRzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL3Rlc3QtY29tcG9uZW50cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFFQSwyQkFBMkI7QUFDZCxRQUFBLHlCQUF5QixHQUFxQjtJQUN6RDtRQUNFLE9BQU8sRUFBRSxJQUFJO1FBQ2IsT0FBTyxFQUFFLENBQUM7UUFDVixZQUFZLEVBQUU7WUFDWjtnQkFDRSxPQUFPLEVBQUUsSUFBSTtnQkFDYixXQUFXLEVBQUUsRUFBRTtnQkFDZixPQUFPLEVBQUUsa0JBQWtCO2dCQUMzQixLQUFLLEVBQUUsVUFBVTtnQkFDakIsYUFBYSxFQUFFLEVBQUU7Z0JBQ2pCLFFBQVEsRUFBRSxFQUFFO2dCQUNaLFFBQVEsRUFBRSxFQUFFO2dCQUNaLGNBQWMsRUFBRSxFQUFFO2dCQUNsQixRQUFRLEVBQUUsS0FBSztnQkFDZixhQUFhLEVBQUUsSUFBSTtnQkFDbkIsVUFBVSxFQUFFO29CQUNWLFVBQVUsRUFBRSxLQUFLO29CQUNqQixXQUFXLEVBQUUsQ0FBQztvQkFDZCxXQUFXLEVBQUUsQ0FBQztvQkFDZCxTQUFTLEVBQUUsRUFBRTtvQkFDYixRQUFRLEVBQUUsRUFBRTtpQkFDYjtnQkFDRCxhQUFhLEVBQUU7b0JBQ2IsTUFBTSxFQUFFLEVBQUU7b0JBQ1YsTUFBTSxFQUFFLEVBQUU7b0JBQ1YsSUFBSSxFQUFFLEVBQUU7aUJBQ1Q7Z0JBQ0QsTUFBTSxFQUFFLDBCQUEwQjtnQkFDbEMsWUFBWSxFQUFFLEVBQUU7YUFDakI7U0FDRjtLQUNGO0NBQ0YsQ0FBQTtBQUNELHdCQUF3QjtBQUV4QixhQUFhO0FBQ0EsUUFBQSwwQkFBMEIsR0FBcUI7SUFDMUQ7UUFDRSxPQUFPLEVBQUUsSUFBSTtRQUNiLE9BQU8sRUFBRSxDQUFDO1FBQ1YsWUFBWSxFQUFFO1lBQ1o7Z0JBQ0UsVUFBVSxFQUFFO29CQUNWLFVBQVUsRUFBRSxLQUFLO29CQUNqQixXQUFXLEVBQUUsQ0FBQztvQkFD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