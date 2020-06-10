import '../../lang/colors.js'

export const mode = {
  start: [
    {regex: /(?:token|skip)\b/, token: "control"},
    {regex: /(?:text|nest|line|space)\b/, token: "io"},
    {regex: /"(?:[^\\]|\\.)*?(?:"|$)/, token: "string"},
    {regex: /[a-zA-Z]+(?=\.)/, token: "labels"},
    {regex: /[a-zA-Z]+[0-9]*/, token: "variables"},
    {regex: /-?[0-9]+(\.[0-9]+)?/, token: "string"},
    {regex: /empty\b/, token: "control"},
    //{regex: /\||\*/, token: "control"},
  ]
}
