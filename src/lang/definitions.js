import Blockly from '../blockly.js'
import './theme.js'
import {light as colors} from './colors'
export {default as blocks} from './blocks.js'

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
      <block type="Eq"></block>
      <block type="Neq"></block>
      <block type="Gt"></block>
      <block type="Geq"></block>
      <block type="Lt"></block>
      <block type="Leq"></block>
    </category>
  </xml>`,

  toolboxCategoryCallbacks: {
    variables(workspace) {
      var button = document.createElement('button');
      button.setAttribute('text', 'Create variable...');
      button.setAttribute('callbackKey', 'createVariable');

      const xmls = [];
      for (let variable of workspace.getVariablesOfType('Number')) {
        // WARNING: no white space allowed in XML
        xmls.push(`<xml><block type="Id">${Blockly.Variables.generateVariableFieldXmlString(variable)}</block></xml>`);
        xmls.push(`<xml><block type="Assignment">${Blockly.Variables.generateVariableFieldXmlString(variable)}</block></xml>`);
      }
      return [button, ...xmls.map(x => Blockly.Xml.textToDom(x).firstChild)];
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

export const mode = {
  start: [
    {regex: /program\b/, token: "program"},
    {regex: /(?:if|else|while|and|or|not)\b/, token: "control"},
    {regex: /(?:print|input|line)\b/, token: "io"},
    {regex: /"(?:[^\\]|\\.)*?(?:"|$)/, token: "string"},
    {regex: /[{(]/, indent: true},
    {regex: /[})]/, dedent: true},
    {regex: /[a-zA-Z]+[0-9]*/, token: "variables"},
    {regex: /[0-9]+/, token: "numbers"},
  ],
  meta: {
    electricChars: '}'
  }
}
