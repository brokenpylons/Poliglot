import '../../lang/colors.js'

export const mode = {
  start: [
    {regex: /:/, token: "program"},
    {regex: /[0-9]+/, token: "numbers"}
  ]
}
