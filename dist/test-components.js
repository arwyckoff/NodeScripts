"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testSets = exports.componentsWithCalculateValueResult = exports.componentsWithCalculateValue = exports.componentsWithDisplayJS = exports.componentsWithValidationJS = exports.componentsWithoutCustomJS = void 0;
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
                    property: 'referenceFields.fieldOne', step: {
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
            }
        ]
    }
];
exports.testSets = [
    // input
    [
        exports.componentsWithCalculateValue,
        exports.componentsWithCalculateValueResult
    ]
    // expected
];
//# sourceMappingURL=test-components.js.map