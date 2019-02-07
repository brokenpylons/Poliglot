import {light as colors} from './colors'

export default [
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
    "message0": "set %1 %2",
    "args0": [
      {
        "type": "field_variable",
        "name": "0"
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
        "name": "0"
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
  }
];
