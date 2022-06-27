import { FilterModalTypes, FormDefinition } from './typings'

// COMPONENTS WITHOUT LOGIC
export const componentsWithoutCustomJS: FormDefinition[] = [
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
]
// COMPONENTS WITH LOGIC

// VALIDATION
export const componentsWithValidationJS: FormDefinition[] = [
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
]
// DISPLAY
export const componentsWithDisplayJS: FormDefinition[] = [
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
]
// DISPLAY
export const componentsWithCalculateValue: FormDefinition[] = [
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
]

export const componentsWithCalculateValueResult: FormDefinition[] = [
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
  }]
  export const componentsWithCustomValidation: FormDefinition[] = [
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
  ]
  export const componentsWithCustomValidationConverted: FormDefinition[] = [
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
                "comparison": "gt" as FilterModalTypes.greaterThan,
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
  ]
  export const componentsWithCustomConditional: FormDefinition[] = [
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
  ]
  export const componentsWithCustomConditionalConverted: FormDefinition[] = [
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
                "comparison": "eq" as FilterModalTypes.equals,
                "useAnd": false,
                "identifier": "9fd22b0d8cbf4af48862fffe2b4da878bb24a4a67f6f4e29a28b007cd4fe1752",
                "value": "financialSupportFunding"
              },
              {
                "sourceColumn": [
                  "referenceFields", "fieldOne"
                ],
                "comparison": "eq" as FilterModalTypes.equals,
                "useAnd": false,
                "identifier": "50d2a5065fd844558c0b5ac0cd5115b6488b0ec7d8934bd0bbfe30105309874a",
                "value": "eventSponsorship"
              },
              {
                "sourceColumn": [
                  "referenceFields", "fieldOne"
                ],
                "comparison": "eq" as FilterModalTypes.equals,
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
  ]
export const testSets: [FormDefinition[], FormDefinition[]][] = [
  // input,
  // expected

  [
    componentsWithCalculateValue,
    componentsWithCalculateValueResult
  ],
  [
    componentsWithCustomValidation,
    componentsWithCustomValidationConverted
  ],
  [
    componentsWithCustomConditional,
    componentsWithCustomConditionalConverted
  ]
]



// // this one has all three custom JS types
// const QA_FORM: FormDefinition[] = [
//   {
//     "tabName": "Page One",
//     "components": [
//       {
//         "key": "number3",
//         "label": "Amount Requested - In Progress",
//         "type": "referenceFields-amountRequestedInProgress",
//         "placeholder": "",
//         "validate": {
//           "required": false,
//           "customMessage": ""
//         },
//         "tooltip": "",
//         "title": "",
//         "legend": "",
//         "description": "",
//         "prefix": "",
//         "suffix": "",
//         "displayType": 1,
//         "value": 0,
//         "customValidation": {
//           "evaluationType": 2,
//           "useAnd": false,
//           "identifier": "a18abf4be2b5412d986556dc1d3602995d29dafa018e400d93f564d2e2a56751",
//           "conditions": [],
//           "result": "",
//           "resultType": 0
//         },
//         "conditionalLogic": {
//           "evaluationType": 2,
//           "useAnd": false,
//           "identifier": "37616f087c064785b95e8e24b6e99067a8ecda6bbc6a49b7b6eec5950437ce7e",
//           "conditions": []
//         },
//         "conditionalValue": [],
//         "errorLabel": "",
//         "formula": {
//           "property": "referenceFields.amountRequestedInProgress",
//           "step": {
//             "type": 0,
//             "values": [
//               {
//                 "value": "referenceFields.amountAwardedYearToDate",
//                 "type": 2
//               },
//               {
//                 "value": "referenceFields.amountAwardedYearToDate",
//                 "type": 2
//               }
//             ]
//           }
//         },
//         "isHidden": false,
//         "hiddenFromParent": false,
//         "useCustomCurrency": 1
//       },
//       {
//         "key": "number2",
//         "label": "Amount Awarded - Year to date",
//         "type": "referenceFields-amountAwardedYearToDate",
//         "placeholder": "",
//         "validate": {
//           "required": false,
//           "customMessage": ""
//         },
//         "tooltip": "",
//         "title": "",
//         "legend": "",
//         "description": "",
//         "prefix": "",
//         "suffix": "",
//         "displayType": 1,
//         "value": null,
//         "customValidation": {
//           "evaluationType": 2,
//           "useAnd": false,
//           "identifier": "52a8817e70054c7f949620795be8ac3a10501e6580c642a99df0c73420ab4b9f",
//           "conditions": [],
//           "result": "",
//           "resultType": 0
//         },
//         "conditionalLogic": {
//           "evaluationType": 2,
//           "useAnd": false,
//           "identifier": "aa6a4a403f104bdb94c2555a0db02f8059ef69f598634fe6b4777a5f7baeaa93",
//           "conditions": []
//         },
//         "conditionalValue": [
//           {
//             "evaluationType": 2,
//             "useAnd": false,
//             "identifier": "6a0012fa2f9d4e178024d7443c067457838f5b9ac7a94b0e8cda0e9c72e4a942",
//             "conditions": [],
//             "result": 2,
//             "resultType": 0,
//             "delete": false
//           }
//         ],
//         "errorLabel": "",
//         "isHidden": false,
//         "hiddenFromParent": false,
//         "useCustomCurrency": 1
//       },
//       {
//         "key": "customDataTable",
//         "label": "Color picker",
//         "type": "referenceFields-colorPicker",
//         "placeholder": "",
//         "validate": {
//           "required": false,
//           "customMessage": ""
//         },
//         "tooltip": "",
//         "title": "",
//         "legend": "",
//         "description": "",
//         "prefix": "",
//         "suffix": "",
//         "displayType": 1,
//         "value": "",
//         "customConditional": "show = data.sumOfAggregateFields >= 6;",
//         "customValidation": {
//           "evaluationType": 0,
//           "useAnd": false,
//           "identifier": "9d2513226c534ccbbb22ed23e66c6ab0e29efd23a4a24b339558534217cf9f70",
//           "conditions": [
//             {
//               "sourceColumn": [
//                 "application",
//                 "amountRequested"
//               ],
//               "comparison": "eq",
//               "useAnd": false,
//               "identifier": "946cf197fea642ea9ddf79b32d2823650ba9c950385f4ad6bcac206565476abe",
//               "value": "12",
//               "relatedColumn": null
//             }
//           ],
//           "resultType": 2,
//           "result": "this is not right"
//         },
//         "conditionalLogic": {
//           "evaluationType": 2,
//           "useAnd": false,
//           "identifier": "8a1403f35b29473c804893a151d6eda0952355347ea54b8bb55a92ecffd6b3e4",
//           "conditions": []
//         },
//         "conditionalValue": [],
//         "errorLabel": "",
//         "isHidden": true,
//         "hiddenFromParent": false,
//         "useCustomCurrency": 1
//       },
//       {
//         "key": "number",
//         "label": "Sum of fields",
//         "type": "referenceFields-sumOfAggregateFields",
//         "placeholder": "",
//         "validate": {
//           "required": false,
//           "custom": "valid = value > 5 ? true : 'value must be greater than 5'",
//           "customPrivate": false,
//           "customMessage": "",
//           "validationResult": null
//         },
//         "tooltip": "",
//         "title": "",
//         "legend": "",
//         "description": "",
//         "prefix": "",
//         "suffix": "",
//         "displayType": 1,
//         "value": 6,
//         "calculateValue": "value = 6;",
//         "customValidation": {
//           "evaluationType": 2,
//           "useAnd": false,
//           "identifier": "7be9e8c99d9f46d7b4dbda08387cc570a9544cbe47ef4bd5841f5ab7905c3121",
//           "conditions": [],
//           "result": "",
//           "resultType": 0
//         },
//         "conditionalLogic": {
//           "evaluationType": 2,
//           "useAnd": false,
//           "identifier": "0621ee219ce249d2959403fa10d609b4baa6124ac7074e9b95a9b9b6e0195014",
//           "conditions": []
//         },
//         "conditionalValue": [],
//         "errorLabel": "",
//         "isHidden": false,
//         "hiddenFromParent": false,
//         "useCustomCurrency": 1
//       }
//     ],
//     "uniqueId": "053b30c7-1b22-4a95-936f-f26a2db1a234",
//     "index": 0,
//     "logic": null
//   }
// ]

// const QA_FORM_Converted: FormDefinition[] = [
//         {
//           "tabName": "Page One",
//           "components": [
//             {
//               "key": "number3",
//               "label": "Amount Requested - In Progress",
//               "type": "referenceFields-amountRequestedInProgress",
//               "placeholder": "",
//               "validate": {
//                 "required": false,
//                 "customMessage": ""
//               },
//               "tooltip": "",
//               "title": "",
//               "legend": "",
//               "description": "",
//               "prefix": "",
//               "suffix": "",
//               "displayType": 1,
//               "value": 0,
//               "customValidation": {
//                 "evaluationType": 2,
//                 "useAnd": false,
//                 "identifier": "a18abf4be2b5412d986556dc1d3602995d29dafa018e400d93f564d2e2a56751",
//                 "conditions": [],
//                 "result": "",
//                 "resultType": 0
//               },
//               "conditionalLogic": {
//                 "evaluationType": 2,
//                 "useAnd": false,
//                 "identifier": "37616f087c064785b95e8e24b6e99067a8ecda6bbc6a49b7b6eec5950437ce7e",
//                 "conditions": []
//               },
//               "conditionalValue": [],
//               "errorLabel": "",
//               "formula": {
//                 "property": "referenceFields.amountRequestedInProgress",
//                 "step": {
//                   "type": 0,
//                   "values": [
//                     {
//                       "value": "referenceFields.amountAwardedYearToDate",
//                       "type": 2
//                     },
//                     {
//                       "value": "referenceFields.amountAwardedYearToDate",
//                       "type": 2
//                     }
//                   ]
//                 }
//               },
//               "isHidden": false,
//               "hiddenFromParent": false,
//               "useCustomCurrency": 1
//             },
//             {
//               "key": "number2",
//               "label": "Amount Awarded - Year to date",
//               "type": "referenceFields-amountAwardedYearToDate",
//               "placeholder": "",
//               "validate": {
//                 "required": false,
//                 "customMessage": ""
//               },
//               "tooltip": "",
//               "title": "",
//               "legend": "",
//               "description": "",
//               "prefix": "",
//               "suffix": "",
//               "displayType": 1,
//               "value": "",
//               "customValidation": {
//                 "evaluationType": 2,
//                 "useAnd": false,
//                 "identifier": "52a8817e70054c7f949620795be8ac3a10501e6580c642a99df0c73420ab4b9f",
//                 "conditions": [],
//                 "result": "",
//                 "resultType": 0
//               },
//               "conditionalLogic": {
//                 "evaluationType": 2,
//                 "useAnd": false,
//                 "identifier": "aa6a4a403f104bdb94c2555a0db02f8059ef69f598634fe6b4777a5f7baeaa93",
//                 "conditions": []
//               },
//               "conditionalValue": [
//                 {
//                   "evaluationType": 2,
//                   "useAnd": false,
//                   "identifier": "6a0012fa2f9d4e178024d7443c067457838f5b9ac7a94b0e8cda0e9c72e4a942",
//                   "conditions": [],
//                   "result": [
//                     "application",
//                     "amountRequested"
//                   ],
//                   "resultType": 1,
//                   "delete": false
//                 }
//               ],
//               "errorLabel": "",
//               "isHidden": false,
//               "hiddenFromParent": false,
//               "useCustomCurrency": 1
//             },
//             {
//               "key": "customDataTable",
//               "label": "Color picker",
//               "type": "referenceFields-colorPicker",
//               "placeholder": "",
//               "validate": {
//                 "required": false,
//                 "customMessage": ""
//               },
//               "tooltip": "",
//               "title": "",
//               "legend": "",
//               "description": "",
//               "prefix": "",
//               "suffix": "",
//               "displayType": 1,
//               "value": "",
//               "customConditional": "",
//               "customValidation": {
//                 "evaluationType": 0,
//                 "useAnd": false,
//                 "identifier": "9d2513226c534ccbbb22ed23e66c6ab0e29efd23a4a24b339558534217cf9f70",
//                 "conditions": [
//                   {
//                     "sourceColumn": [
//                       "application",
//                       "amountRequested"
//                     ],
//                     "comparison": "eq",
//                     "useAnd": false,
//                     "identifier": "946cf197fea642ea9ddf79b32d2823650ba9c950385f4ad6bcac206565476abe",
//                     "value": "12",
//                     "relatedColumn": null
//                   }
//                 ],
//                 "resultType": 2,
//                 "result": "this is not right"
//               },
//               "conditionalLogic": {
//                 "evaluationType": 0,
//                 "useAnd": false,
//                 "identifier": "8a1403f35b29473c804893a151d6eda0952355347ea54b8bb55a92ecffd6b3e4",
//                 "conditions": [
//                   {
//                     "sourceColumn": [
//                       "referenceFields",
//                       "sumOfAggregateFields"
//                     ],
//                     "comparison": "eq",
//                     "useAnd": false,
//                     "identifier": "a85ad996aa814fe883ce6813d720945579f99b2f22f14d72ac938220e3e3778b",
//                     "value": "2",
//                     "relatedColumn": null
//                   },
//                   {
//                     "sourceColumn": [
//                       "referenceFields",
//                       "sumOfAggregateFields"
//                     ],
//                     "comparison": "eq",
//                     "useAnd": false,
//                     "identifier": "493cc0e72d4e4b2a8eeb75f7fb21f2e6a31e45f8a72d48f5ae5bedca127e3df6",
//                     "value": "3",
//                     "relatedColumn": null
//                   },
//                   {
//                     "sourceColumn": [
//                       "referenceFields",
//                       "sumOfAggregateFields"
//                     ],
//                     "comparison": "eq",
//                     "useAnd": false,
//                     "identifier": "8df757b6068c463eb2b2f5e65c8804817729a18e07a74734bd8a5a3eefad3ab6",
//                     "value": "4",
//                     "relatedColumn": null
//                   }
//                 ]
//               },
//               "conditionalValue": [],
//               "errorLabel": "",
//               "isHidden": true,
//               "hiddenFromParent": false,
//               "useCustomCurrency": 1
//             },
//             {
//               "key": "number",
//               "label": "Sum of fields",
//               "type": "referenceFields-sumOfAggregateFields",
//               "placeholder": "",
//               "validate": {
//                 "required": false,
//                 "custom": "valid = value > 5 ? true : 'value must be greater than 5'",
//                 "customPrivate": false,
//                 "customMessage": "",
//                 "validationResult": null
//               },
//               "tooltip": "",
//               "title": "",
//               "legend": "",
//               "description": "",
//               "prefix": "",
//               "suffix": "",
//               "displayType": 1,
//               "value": 6,
//               "calculateValue": "value = 6;",
//               "customValidation": {
//                 "evaluationType": 2,
//                 "useAnd": false,
//                 "identifier": "7be9e8c99d9f46d7b4dbda08387cc570a9544cbe47ef4bd5841f5ab7905c3121",
//                 "conditions": [],
//                 "result": "",
//                 "resultType": 0
//               },
//               "conditionalLogic": {
//                 "evaluationType": 2,
//                 "useAnd": false,
//                 "identifier": "0621ee219ce249d2959403fa10d609b4baa6124ac7074e9b95a9b9b6e0195014",
//                 "conditions": []
//               },
//               "conditionalValue": [],
//               "errorLabel": "",
//               "isHidden": false,
//               "hiddenFromParent": false,
//               "useCustomCurrency": 1
//             }
//           ],
//           "uniqueId": "053b30c7-1b22-4a95-936f-f26a2db1a234",
//           "index": 0,
//           "logic": null
//         }
//       ]