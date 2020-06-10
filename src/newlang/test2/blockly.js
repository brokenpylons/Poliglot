import Blockly, {BlocklyUtils} from '../../blockly.js'
import {light as colors} from '../../lang/colors.js'

export const blocks = [
  {
    "type": "Test2Block",
    "message0": "block %1 %2",
    "args0": [
      {
        "type": "input_dummy"
      },
      {
        "type": "input_statement",
        "name": "NAME"
      }
    ],
    "colour": colors.program,
    "tooltip": "",
    "helpUrl": ""
  },
  {
    "type": "Test2Line",
    "message0": "line %1",
    "args0": [
      {
        "type": "field_input",
        "name": "NAME",
        "text": "default"
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": colors.variables,
    "tooltip": "",
    "helpUrl": ""
  }]

export const toolbox = {
  xml: `<xml>
    <category name="Test">
      <block type="Test2Block"></block>
      <block type="Test2Line"></block>
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

