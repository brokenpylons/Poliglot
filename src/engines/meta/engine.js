import {meta} from '@brokenpylons/metalanguage';

export class MetaEngine {
    constructor(start, grammar, lexer) {
      this.start = start;
      this.tables = meta.generate(grammar, lexer);
      this.grammar = grammar;
      this.lexer = lexer;
    }

    print(tree) {
      console.log("PRINT");
      try {
        console.log(tree);
        console.log(tree.layout(this.start, this.grammar));
        return tree.layout(this.start, this.grammar);
      } catch (e) {
        console.log(e);
      }
    }

    parse(text) {
      try {
        console.log(meta.parse(text.replace(/\s*/g,"") + "#", this.tables).toString());
        return meta.parse(text.replace(/\s*/g,"") + "#", this.tables);
      } catch (e) {
        console.log(e);
      }
    }
};

