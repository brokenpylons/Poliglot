import jss from '../jss'
import {light as colors} from './colors'

const style = {
  '@global': {
    '.cm-s-custom span.cm-program': { 
      color: colors.program,
      fontWeight: 'bold'
    },
    '.cm-s-custom span.cm-control': {
      color: colors.control,
      fontWeight: 'bold'
    },
    '.cm-s-custom span.cm-io': {
      color: colors.io
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
