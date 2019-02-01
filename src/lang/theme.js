import {StyleSheet} from "aphrodite";
import {light as colors} from './colors'

const extension = {
  selectorHandler: (selector, baseSelector, generateSubtreeStyles) => {
    if (baseSelector.includes('global')) {
      return generateSubtreeStyles(selector);
    }
    return null;
  }
};

const extended = StyleSheet.extend([extension]);

const styles = extended.StyleSheet.create({
  global: {
    '.cm-s-custom span.cm-program': { 
      color: colors.program
    },
    '.cm-s-custom span.cm-control': {
      color: colors.control
    },
    '.cm-s-custom span.cm-io': {
      color: colors.io
    },
    '.cm-s-custom span.cm-variables': {
      color: colors.variables
    },
    '.cm-s-custom span.cm-numbers': {
      color: colors.numbers
    }
  }
});

export default extended.css(styles.global);
