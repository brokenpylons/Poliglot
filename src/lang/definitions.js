import './theme.js'
import {light as colors} from './colors'

export {default as blocks} from './blocks.js'

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
    <block type="Line"></block>
    <block type="Input"></block>
    <block type="Concat"></block>
    <block type="Id"></block>
    <block type="Assignment"></block>
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
  </xml>`
/*
export const toolbox = `<xml>
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
    <category name="Variables" colour="${colors.variables}">
      <block type="Id"></block>
      <block type="Assignment"></block>
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
  </xml>`
  */

export const mode = {
  start: [
    {regex: /program\b/, token: "program"},
    {regex: /(?:if|else|while|and|or|not)\b/, token: "control"},
    {regex: /(?:print|input|line)\b/, token: "io"},
    {regex: /"(?:[^\\]|\\.)*?(?:"|$)/, token: "string"},
    {regex: /[{(]/, indent: true},
    {regex: /[})]/, dedent: true},
    {regex: /[a-zA-Z]+/, token: "variables"},
    {regex: /[0-9]+/, token: "numbers"},
  ],
  meta: {
    electricChars: '}'
  }
}
