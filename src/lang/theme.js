import jss from '../jss'
import {light as colors} from './colors'

const style = {
  '@global': {
    '.CodeMirror': {
      fontFamily: 'Source Code Pro, monospace',
      fontSize: '13px',
    },
    '.cm-s-custom span.cm-program': { 
      color: colors.program,
      fontWeight: 700
    },
    '.cm-s-custom span.cm-control': {
      color: colors.control,
      fontWeight: 600
    },
    '.cm-s-custom span.cm-io': {
      color: colors.io,
      fontWeight: 600
    },
    '.cm-s-custom span.cm-string': {
      color: colors.io,
    },
    '.cm-s-custom span.cm-variables': {
      color: colors.variables
    },
    '.cm-s-custom span.cm-numbers': {
      color: colors.numbers
    },
  }
};

jss.createStyleSheet(style).attach();
