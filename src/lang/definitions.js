export {default as blocks} from './blocks.js'
export {default} from './theme.js'

export const toolbox = `<xml>
    <block type="Program"></block>
    <block type="If"></block>
    <block type="Elseif"></block>
    <block type="Else"></block>
    <block type="While"></block>
    <block type="And"></block>
    <block type="Or"></block>
    <block type="Not"></block>
    <block type="String"></block>
    <block type="Print"></block>
    <block type="Input"></block>
    <block type="Id"></block>
    <block type="Assignment"></block>
    <block type="Number"></block>
    <block type="Plus"></block>
    <block type="Minus"></block>
    <block type="Times"></block>
    <block type="Divides"></block>
    <block type="Eq"></block>
    <block type="Gt"></block>
    <block type="Lt"></block>
  </xml>`

export const mode = {
  start: [
    {regex: /program\b/, token: "program"},
    {regex: /(?:if|while)\b/, token: "control"},
    {regex: /(?:print|input)\b/, token: "io"},
    {regex: /"(?:[^\\]|\\.)*?(?:"|$)/, token: "io"},
    {regex: /[{(]/, indent: true},
    {regex: /[})]/, dedent: true},
    {regex: /[a-zA-Z]+/, token: "variables"},
    {regex: /[0-9]+/, token: "numbers"},
  ],
  meta: {
    electricChars: '}'
  }
}
