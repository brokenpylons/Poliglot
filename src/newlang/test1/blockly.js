import Blockly, {BlocklyUtils} from '../../blockly.js'
import {light as colors} from '../../lang/colors.js'

export const blocks = [
  {
    "type": "Test1Stat",
    "message0": ": %1",
    "args0": [
      {
        "type": "input_value",
        "name": "NAME"
      }
    ],
    "colour": colors.program,
    "tooltip": "",
    "helpUrl": ""
  },
  {
    "type": "Test1Add",
    "message0": "%1 + %2",
    "args0": [
      {
        "type": "input_value",
        "name": "NAME"
      },
      {
        "type": "input_value",
        "name": "NAME"
      }
    ],
    "inputsInline": true,
    "output": null,
    "colour": colors.numbers,
    "tooltip": "",
    "helpUrl": ""
  },
  /*{
    "type": "mul",
    "message0": "%1 × %2",
    "args0": [
      {
        "type": "input_value",
        "name": "NAME"
      },
      {
        "type": "input_value",
        "name": "NAME"
      }
    ],
    "inputsInline": true,
    "output": null,
    "colour": color.numbers,
    "tooltip": "",
    "helpUrl": ""
  },*/
  {
    "type": "Test1Num",
    "message0": "%1",
    "args0": [
      {
        "type": "field_number",
        "name": "NAME",
        "value": 0
      }
    ],
    "output": null,
    "colour": colors.numbers,
    "tooltip": "",
    "helpUrl": ""
  }
]

export const toolbox = {
  xml: `<xml>
    <category name="Test">
      <block type="Test1Stat"></block>
      <block type="Test1Add"></block>
      <block type="Test1Num"></block>
    </category>
  </xml>`,

  toolboxCategoryCallbacks: {
    variables(workspace) {}
  },

  buttonCallbacks: {
    createVariable(button) {},
    center(button) {}
  }
}

