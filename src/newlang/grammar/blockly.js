import Blockly, {BlocklyUtils} from '../../blockly.js'
import {light as colors} from '../../lang/colors.js'

export const blocks = [
  {
    "type": "GrammarRule",
    "message0": "rule %1. %2 %3",
    "args0": [
      {
        "type": "field_input",
        "name": "label",
        "text": ""
      },
      {
        "type": "field_variable",
        "name": "symbol"
      },
      {
        "type": "input_value",
        "name": "input"
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": colors.variables,
    "tooltip": null,
    "helpUrl": null
  },
  {
    "type": "GrammarRuleNoLabel",
    "message0": "rule %1 %2",
    "args0": [
      {
        "type": "field_variable",
        "name": "symbol"
      },
      {
        "type": "input_value",
        "name": "input"
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": colors.variables,
    "tooltip": null,
    "helpUrl": null
  },
  {
    "type": "GrammarOr",
    "message0": "%1 | %2",
    "args0": [
      {
        "type": "input_value",
        "name": "e1"
      },
      {
        "type": "input_value",
        "name": "e2"
      }
    ],
    "inputsInline": true,
    "output": null,
    "colour": colors.control,
    "tooltip": null,
    "helpUrl": null
  },
  {
    "type": "GrammarAnd",
    "message0": "%1 * %2",
    "args0": [
      {
        "type": "input_value",
        "name": "e1"
      },
      {
        "type": "input_value",
        "name": "e2"
      }
    ],
    "inputsInline": true,
    "output": null,
    "colour": colors.control,
    "tooltip": null,
    "helpUrl": null
  },
  {
    "type": "GrammarEmpty",
    "message0": "empty",
    "output": null,
    "colour": colors.control,
    "tooltip": null,
    "helpUrl": null
  },
  {
    "type": "GrammarGrammar",
    "message0": "grammar %1 %2",
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
    "tooltip": null,
    "helpUrl": null
  },
  {
    "type": "GrammarSymbol",
    "message0": "%1",
    "args0": [
      {
        "type": "field_variable",
        "name": "symbol",
        "variable": "symbol"
      }
    ],
    "output": null,
    "colour": colors.variables,
    "tooltip": null,
    "helpUrl": null
  },
  {
    "type": "GrammarText",
    "message0": "text %1",
    "args0": [
      {
        "type": "field_input",
        "name": "text",
        "text": ""
      }
    ],
    "output": null,
    "colour": colors.io,
    "tooltip": null,
    "helpUrl": null
  },
  {
    "type": "GrammarLine",
    "message0": "line",
    "output": null,
    "colour": colors.io,
    "tooltip": null,
    "helpUrl": null
  },
  {
    "type": "GrammarSpace",
    "message0": "space",
    "output": null,
    "colour": colors.io,
    "tooltip": null,
    "helpUrl": null
  },
  {
    "type": "GrammarNest",
    "message0": "nest %1 %2",
    "args0": [
      {
        "type": "field_number",
        "name": "indent",
        "value": "0",
        "min": "0",
        "precision": "1"
      },
      {
        "type": "input_value",
        "name": "input"
      }
    ],
    "output": null,
    "colour": colors.io,
    "tooltip": null,
    "helpUrl": null
  },
]

export const toolbox = {
  xml: `<xml>
    <category name="Grammar" colour="${colors.program}">
      <block type="GrammarGrammar"></block>
    </category>
    <category name="Rules" custom="variables" colour="${colors.variables}">
    </category>
    <category name="Text" colour="${colors.io}">
      <block type="GrammarText"></block>
      <block type="GrammarNest"></block>
      <block type="GrammarLine"></block>
      <block type="GrammarSpace"></block>
    </category>
    <category name="Operators" colour="${colors.control}">
      <block type="GrammarAnd"></block>
      <block type="GrammarOr"></block>
      <block type="GrammarEmpty"></block>
    </category>
  </xml>`,

  toolboxCategoryCallbacks: {
    variables(workspace) {
      var button = document.createElement('button');
      button.setAttribute('text', 'Create symbol...');
      button.setAttribute('callbackKey', 'createVariable');

      const xmls = [];
      for (let variable of workspace.getVariablesOfType('')) {
        xmls.push(BlocklyUtils.createBlockWithVariable("GrammarRule", "symbol", variable));
        xmls.push(BlocklyUtils.createBlockWithVariable("GrammarRuleNoLabel", "symbol", variable));
        xmls.push(BlocklyUtils.createBlockWithVariable("GrammarSymbol", "symbol", variable));
      }
      return [button, ...xmls];
    }
  },

  buttonCallbacks: {
    createVariable(button) {
      Blockly.Variables.createVariable(button.getTargetWorkspace(), null, '');
    },
    center(button) {

    }
  }
}

