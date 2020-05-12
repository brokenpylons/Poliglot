import './theme.js'

export const mode = {
  start: [
    {regex: /program\b/, token: "program"},
    {regex: /(?:if|else|while|and|or|not)\b/, token: "control"},
    {regex: /(?:print|input|line)\b/, token: "io"},
    {regex: /"(?:[^\\]|\\.)*?(?:"|$)/, token: "string"},
    {regex: /[{(]/, indent: true},
    {regex: /[})]/, dedent: true},
    {regex: /[a-zA-Z]+[0-9]*/, token: "variables"},
    {regex: /-?[0-9]+(\.[0-9]+)?/, token: "numbers"},
  ],
  meta: {
    electricChars: '}'
  }
}
