const Blockly = window.Blockly;

export const BlocklyUtils = {
  createBlockWithVariable(type, variable_name, variable) {
    let block = Blockly.utils.xml.createElement('block');
    block.setAttribute('type', type);
    block.appendChild(Blockly.Xml.textToDom(`<field name="${variable_name}" id="${variable.getId()}" variabletype="${variable.type}">${variable.name}</field>`));
    return block;
  }
}

export default Blockly;
