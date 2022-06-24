"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.componentsWithCalculateValue = exports.componentsWithDisplayJS = exports.componentsWithValidationJS = exports.componentsWithoutCustomJS = void 0;
// COMPONENTS WITHOUT LOGIC
exports.componentsWithoutCustomJS = [
    {
        "components": [
            {
                "autofocus": false,
                "input": true,
                "tableView": true,
                "inputType": "text",
                "inputMask": "",
                "label": "Date of Incident",
                "key": "fieldOne",
                "placeholder": "",
                "prefix": "",
                "suffix": "",
                "multiple": false,
                "defaultValue": "",
                "protected": false,
                "unique": false,
                "persistent": true,
                "hidden": false,
                "clearOnHide": true,
                "spellcheck": true,
                "validate": {
                    "required": false,
                    "minLength": "",
                    "maxLength": "",
                    "pattern": "",
                    "custom": "",
                    "customPrivate": false
                },
                "conditional": {
                    "show": "",
                    "when": null,
                    "eq": ""
                },
                "type": "referenceFields-fieldOne",
                "labelPosition": "top",
                "tags": [],
                "properties": {},
                "defaultVal": ""
            },
            {
                "autofocus": true,
                "input": true,
                "tableView": true,
                "label": "What is the reason for your request for assistance?  Provide us as many details as possible.",
                "key": "undefinedWhatisthereasonforyourrequestforassistanceProvideusasmanydetailsaspossible",
                "placeholder": "",
                "prefix": "",
                "suffix": "",
                "rows": 3,
                "multiple": false,
                "defaultValue": "",
                "protected": false,
                "persistent": true,
                "hidden": false,
                "wysiwyg": false,
                "clearOnHide": true,
                "spellcheck": true,
                "validate": {
                    "required": false,
                    "minLength": "",
                    "maxLength": "",
                    "pattern": "",
                    "custom": ""
                },
                "type": "referenceFields-undefinedWhatisthereasonforyourrequestforassistanceProvideusasmanydetailsaspossible1",
                "labelPosition": "top",
                "tags": [],
                "conditional": {
                    "show": "",
                    "when": null,
                    "eq": ""
                },
                "properties": {},
                "defaultVal": ""
            },
            {
                "autofocus": true,
                "input": true,
                "tableView": true,
                "label": "Explain in detail how you will use the grant funds.",
                "key": "undefinedExplainindetailhowyouwillusethegrantfunds",
                "placeholder": "",
                "prefix": "",
                "suffix": "",
                "rows": 3,
                "multiple": false,
                "defaultValue": "",
                "protected": false,
                "persistent": true,
                "hidden": false,
                "wysiwyg": false,
                "clearOnHide": true,
                "spellcheck": true,
                "validate": {
                    "required": false,
                    "minLength": "",
                    "maxLength": "",
                    "pattern": "",
                    "custom": ""
                },
                "type": "referenceFields-undefinedExplainindetailhowyouwillusethegrantfunds1",
                "labelPosition": "top",
                "tags": [],
                "conditional": {
                    "show": "",
                    "when": null,
                    "eq": ""
                },
                "properties": {},
                "defaultVal": ""
            },
            {
                "input": true,
                "tableView": true,
                "label": "Upload supporting documentation",
                "key": "undefinedUploadsupportingdocumentation",
                "placeholder": "",
                "multiple": false,
                "defaultValue": "",
                "protected": false,
                "persistent": true,
                "hidden": false,
                "clearOnHide": true,
                "validate": {
                    "required": true
                },
                "type": "referenceFields-undefinedUploadsupportingdocumentation1",
                "tags": [],
                "conditional": {
                    "show": "",
                    "when": null,
                    "eq": ""
                },
                "properties": {},
                "defaultVal": ""
            },
            {
                "autofocus": false,
                "input": true,
                "label": "Submit",
                "tableView": false,
                "key": "submit",
                "size": "md",
                "leftIcon": "",
                "rightIcon": "",
                "block": false,
                "action": "submit",
                "disableOnInvalid": false,
                "theme": "primary",
                "type": "button"
            }
        ],
        "display": "form",
        "page": 0
    }
];
// COMPONENTS WITH LOGIC
// VALIDATION
exports.componentsWithValidationJS = [
    {
        "components": [
            {
                "autofocus": false,
                "input": true,
                "tableView": true,
                "inputType": "text",
                "inputMask": "",
                "label": "Date of Incident",
                "key": "fieldOne",
                "placeholder": "",
                "prefix": "",
                "suffix": "",
                "multiple": false,
                "defaultValue": "",
                "protected": false,
                "unique": false,
                "persistent": true,
                "hidden": false,
                "clearOnHide": true,
                "spellcheck": true,
                "validate": {
                    "required": false,
                    "minLength": "",
                    "maxLength": "",
                    "pattern": "",
                    "custom": "valid = data.fieldOne >= 5 ? true : 'Please enter an amount 5 or more';",
                    "customPrivate": false
                },
                "conditional": {
                    "show": "",
                    "when": null,
                    "eq": ""
                },
                "type": "referenceFields-fieldOne",
                "labelPosition": "top",
                "tags": [],
                "properties": {},
                "defaultVal": ""
            }
        ],
        "display": "form",
        "page": 0
    }
];
// DISPLAY
exports.componentsWithDisplayJS = [
    {
        "components": [
            {
                "autofocus": false,
                "customConditional": "show = (data.fieldOne == 'illnessCovid' || data.fieldOne == 'illnessInjury'); true;",
                "input": true,
                "tableView": true,
                "inputType": "text",
                "inputMask": "",
                "label": "Date of Incident",
                "key": "fieldOne",
                "placeholder": "",
                "prefix": "",
                "suffix": "",
                "multiple": false,
                "defaultValue": "",
                "protected": false,
                "unique": false,
                "persistent": true,
                "hidden": false,
                "clearOnHide": true,
                "spellcheck": true,
                "validate": {
                    "required": false,
                    "minLength": "",
                    "maxLength": "",
                    "pattern": "",
                    "custom": "",
                    "customPrivate": false
                },
                "conditional": {
                    "show": "",
                    "when": null,
                    "eq": ""
                },
                "type": "referenceFields-fieldOne",
                "labelPosition": "top",
                "tags": [],
                "properties": {},
                "defaultVal": ""
            }
        ],
        "display": "form",
        "page": 0
    }
];
// DISPLAY
exports.componentsWithCalculateValue = [
    {
        "components": [
            {
                "autofocus": false,
                "calculateValue": "value = (+data.fieldOne || 0) +(+data.fieldOne || 0) +(+data.fieldOne || 0) +(+data.fieldOne || 0) +(+data.fieldOne || 0) +(+data.fieldOne|| 0);",
                "input": true,
                "tableView": true,
                "inputType": "text",
                "inputMask": "",
                "label": "Date of Incident",
                "key": "fieldOne",
                "placeholder": "",
                "prefix": "",
                "suffix": "",
                "multiple": false,
                "defaultValue": "",
                "protected": false,
                "unique": false,
                "persistent": true,
                "hidden": false,
                "clearOnHide": true,
                "spellcheck": true,
                "validate": {
                    "required": false,
                    "minLength": "",
                    "maxLength": "",
                    "pattern": "",
                    "custom": "",
                    "customPrivate": false
                },
                "conditional": {
                    "show": "",
                    "when": null,
                    "eq": ""
                },
                "type": "referenceFields-fieldOne",
                "labelPosition": "top",
                "tags": [],
                "properties": {},
                "defaultVal": ""
            }
        ],
        "display": "form",
        "page": 0
    }
];
//# sourceMappingURL=test-components.js.map