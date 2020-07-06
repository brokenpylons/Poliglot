import Blockly, {BlocklyUtils} from '../../blockly.js'
import {light as colors} from '../../lang/colors'

export const blocks = [
  {
    "type": "Program",
    "message0": "program",
    "message1": "%1",
    "args1": [
      {
        "type": "input_statement",
        "name": "0",
        "check": "Any"
      }
    ],
    "colour": colors.program
  },
  {
    "type": "If",
    "message0": "if %1",
    "args0": [
      {
        "type": "input_value",
        "name": "0",
        "check": "Number"
      }
    ],
    "message1": "%1",
    "args1": [
      {
        "type": "input_statement",
        "name": "1",
        "check": "Any"
      }
    ],
    "previousStatement": "Any",
    "nextStatement": ["If", "Any"],
    "colour": colors.control
  },
  {
    "type": "Elseif",
    "message0": "else if %1",
    "args0": [
      {
        "type": "input_value",
        "name": "0",
        "check": "Number"
      }
    ],
    "message1": "%1",
    "args1": [
      {
        "type": "input_statement",
        "name": "1",
        "check": "Any"
      }
    ],
    "previousStatement": "If",
    "nextStatement": ["If", "Any"],
    "colour": colors.control
  },
  {
    "type": "Else",
    "message0": "else",
    "message1": "%1",
    "args1": [
      {
        "type": "input_statement",
        "name": "0",
        "check": "Any"
      }
    ],
    "previousStatement": "If",
    "nextStatement": "Any",
    "colour": colors.control
  },
  {
    "type": "While",
    "message0": "while %1",
    "args0": [
      {
        "type": "input_value",
        "name": "0",
        "check": "Number"
      }
    ],
    "message1": "%1",
    "args1": [
      {
        "type": "input_statement",
        "name": "1",
        "check": "Any"
      }
    ],
    "previousStatement": "Any",
    "nextStatement": "Any",
    "colour": colors.control
  },
  {
    "type": "Assignment",
    "message0": "%1 %2",
    "args0": [
      {
        "type": "field_variable",
        "name": "variable",
        "variable": "variable"
      },
      {
        "type": "input_value",
        "name": "1",
        "check": "Number"
      }
    ],
    "previousStatement": "Any",
    "nextStatement": "Any",
    "colour": colors.variables
  },
  {
    "type": "Id",
    "message0": "%1",
    "args0": [
      {
        "type": "field_variable",
        "name": "variable",
        "variable": "variable"
      }
    ],
    "output": "Number",
    "colour": colors.variables
  },
  {
    "type": "Print",
    "message0": "print %1",
    "args0": [
      {
        "type": "input_value",
        "name": "0",
        "check": ["String", "Number"]
      }
    ],
    "previousStatement": "Any",
    "nextStatement": "Any",
    "colour": colors.io
  },
  {
    "type": "String",
    "message0": "%1",
    "args0": [
      {
        "type": "field_input",
        "text": "",
        "name": "0"
      }
    ],
    "output": "String",
    "colour": colors.io
  },
  {
    "type": "Concat",
    "message0": "%1 %2",
    "args0": [
      {
        "type": "input_value",
        "check": ["String", "Number"],
        "name": "0"
      },
      {
        "type": "input_value",
        "check": ["String", "Number"],
        "name": "1"
      }
    ],
    "inputsInline": true,
    "output": "String",
    "colour": colors.io
  },
  {
    "type": "Input",
    "message0": "input",
    "output": "Number",
    "colour": colors.io
  },
  {
    "type": "Line",
    "message0": "line",
    "output": "Number",
    "colour": colors.io
  },
  {
    "type": "Number",
    "message0": "%1",
    "args0": [
      {
        "type": "field_number",
        "name": "0"
      }
    ],
    "output": "Number",
    "colour": colors.numbers
  },
  {
    "type": "Plus",
    "message0": "%1 + %2",
    "args0": [
      {
        "type": "input_value",
        "name": "0",
        "check": "Number"
      },
      {
        "type": "input_value",
        "name": "1",
        "check": "Number"
      }
    ],
    "inputsInline": true,
    "output": "Number",
    "colour": colors.numbers
  },
  {
    "type": "Minus",
    "message0": "%1 - %2",
    "args0": [
      {
        "type": "input_value",
        "name": "0",
        "check": "Number"
      },
      {
        "type": "input_value",
        "name": "1",
        "check": "Number"
      }
    ],
    "inputsInline": true,
    "output": "Number",
    "colour": colors.numbers
  },
  {
    "type": "Times",
    "message0": "%1 * %2",
    "args0": [
      {
        "type": "input_value",
        "name": "0",
        "check": "Number"
      },
      {
        "type": "input_value",
        "name": "1",
        "check": "Number"
      }
    ],
    "inputsInline": true,
    "output": "Number",
    "colour": colors.numbers
  },
  {
    "type": "Divides",
    "message0": "%1 / %2",
    "args0": [
      {
        "type": "input_value",
        "name": "0",
        "check": "Number"
      },
      {
        "type": "input_value",
        "name": "1",
        "check": "Number"
      }
    ],
    "inputsInline": true,
    "output": "Number",
    "colour": colors.numbers
  },
  {
    "type": "DividesInt",
    "message0": "%1 // %2",
    "args0": [
      {
        "type": "input_value",
        "name": "0",
        "check": "Number"
      },
      {
        "type": "input_value",
        "name": "1",
        "check": "Number"
      }
    ],
    "inputsInline": true,
    "output": "Number",
    "colour": colors.numbers
  },
  {
    "type": "Eq",
    "message0": "%1 = %2",
    "args0": [
      {
        "type": "input_value",
        "name": "0",
        "check": "Number"
      },
      {
        "type": "input_value",
        "name": "1",
        "check": "Number"
      }
    ],
    "inputsInline": true,
    "output": "Number",
    "colour": colors.numbers
  },
  {
    "type": "Gt",
    "message0": "%1 < %2",
    "args0": [
      {
        "type": "input_value",
        "name": "0",
        "check": "Number"
      },
      {
        "type": "input_value",
        "name": "1",
        "check": "Number"
      }
    ],
    "inputsInline": true,
    "output": "Number",
    "colour": colors.numbers
  },
  {
    "type": "Lt",
    "message0": "%1 > %2",
    "args0": [
      {
        "type": "input_value",
        "name": "0",
        "check": "Number"
      },
      {
        "type": "input_value",
        "name": "1",
        "check": "Number"
      }
    ],
    "inputsInline": true,
    "output": "Number",
    "colour": colors.numbers
  },
  {
    "type": "Leq",
    "message0": "%1 \u2265 %2",
    "args0": [
      {
        "type": "input_value",
        "name": "0",
        "check": "Number"
      },
      {
        "type": "input_value",
        "name": "1",
        "check": "Number"
      }
    ],
    "inputsInline": true,
    "output": "Number",
    "colour": colors.numbers
  },
  {
    "type": "Geq",
    "message0": "%1 \u2264 %2",
    "args0": [
      {
        "type": "input_value",
        "name": "0",
        "check": "Number"
      },
      {
        "type": "input_value",
        "name": "1",
        "check": "Number"
      }
    ],
    "inputsInline": true,
    "output": "Number",
    "colour": colors.numbers
  },
  {
    "type": "Neq",
    "message0": "%1 \u2260 %2",
    "args0": [
      {
        "type": "input_value",
        "name": "0",
        "check": "Number"
      },
      {
        "type": "input_value",
        "name": "1",
        "check": "Number"
      }
    ],
    "inputsInline": true,
    "output": "Number",
    "colour": colors.numbers
  },
  {
    "type": "And",
    "message0": "%1 and %2",
    "args0": [
      {
        "type": "input_value",
        "name": "0",
        "check": "Number"
      },
      {
        "type": "input_value",
        "name": "1",
        "check": "Number"
      }
    ],
    "inputsInline": true,
    "output": "Number",
    "colour": colors.control
  },
  {
    "type": "Or",
    "message0": "%1 or %2",
    "args0": [
      {
        "type": "input_value",
        "name": "0",
        "check": "Number"
      },
      {
        "type": "input_value",
        "name": "1",
        "check": "Number"
      }
    ],
    "inputsInline": true,
    "output": "Number",
    "colour": colors.control
  },
  {
    "type": "Not",
    "message0": "not %1",
    "args0": [
      {
        "type": "input_value",
        "name": "0",
        "check": "Number"
      }
    ],
    "inputsInline": true,
    "output": "Number",
    "colour": colors.control
  },
  {
    "type": "EmptyStatement",
    "colour": colors.comment,
    "previousStatement": null,
    "nextStatement": null
  },
  {
    "type": "EmptyExpression",
    "output": null,
    "colour": colors.comment
  },
  {
    "type": "CommentCodeStatement",
    "message0": "%1",
    "colour": colors.comment,
    "args0": [
      {
        "type": "input_statement",
        "name": "0",
        "check": null
      }
    ],
    "previousStatement": null,
    "nextStatement": null
  },
  {
    "type": "CommentStatement",
    "colour": colors.comment,
    "message0": "%1",
    "args0": [
      {
        "type": "field_input",
        "text": "",
        "name": "0"
      }
    ],
    "previousStatement": null,
    "nextStatement": null
  },
  {
    "type": "CommentCodeExpression",
    "colour": colors.comment,
    "message0": "%1",
    "args0": [
      {
        "type": "input_value",
        "name": "0",
        "check": null
      }
    ],
    "inputsInline": true,
    "output": null
  },
  {
    "type": "CommentExpressionLeft",
    "colour": colors.comment,
    "message0": "%1 %2",
    "args0": [
      {
        "type": "field_input",
        "text": "",
        "name": "0"
      },
      {
        "type": "input_value",
        "name": "1",
        "check": null
      }
    ],
    "inputsInline": true,
    "output": null
  },
  {
    "type": "CommentExpressionRight",
    "colour": colors.comment,
    "message0": "%1 %2",
    "args0": [
      {
        "type": "input_value",
        "name": "0",
        "check": null
      },
      {
        "type": "field_input",
        "text": "",
        "name": "1"
      }
    ],
    "inputsInline": true,
    "output": null
  }
];

export const toolbox = {
  xml: `<xml>
    <category name="Program" colour="${colors.program}">
      <block type="Program"></block>
    </category>
    <category name="Logic" colour="${colors.control}">
      <block type="If"></block>
      <block type="Elseif"></block>
      <block type="Else"></block>
      <block type="While"></block>
      <block type="And"></block>
      <block type="Or"></block>
      <block type="Not"></block>
    </category>
    <category name="Console" colour="${colors.io}">
      <block type="String"></block>
      <block type="Print"></block>
      <block type="Line"></block>
      <block type="Input"></block>
      <block type="Concat"></block>
    </category>
    <category name="Variables" custom="variables" colour="${colors.variables}">
    </category>
    <category name="Numbers" colour="${colors.numbers}">
      <block type="Number"></block>
      <block type="Plus"></block>
      <block type="Minus"></block>
      <block type="Times"></block>
      <block type="Divides"></block>
      <block type="DividesInt"></block>
      <block type="Eq"></block>
      <block type="Neq"></block>
      <block type="Gt"></block>
      <block type="Geq"></block>
      <block type="Lt"></block>
      <block type="Leq"></block>
    </category>
    <category name="Meta" colour="${colors.comment}">
      <block type="EmptyStatement"></block>
    </category>
  </xml>`,

  toolboxCategoryCallbacks: {
    variables(workspace) {
      var button = document.createElement('button');
      button.setAttribute('text', 'Create variable...');
      button.setAttribute('callbackKey', 'createVariable');

      const xmls = [];
      for (let variable of workspace.getVariablesOfType('Number')) {
        xmls.push(BlocklyUtils.createBlockWithVariable("Id", "variable", variable));
        xmls.push(BlocklyUtils.createBlockWithVariable("Assignment", "variable", variable));
      }
      return [button, ...xmls];
    }
  },

  buttonCallbacks: {
    createVariable(button) {
      Blockly.Variables.createVariable(button.getTargetWorkspace(), null, 'Number');
    },
    center(button) {
    }
  }
}
