import {meta} from '@brokenpylons/metalanguage';

export class MetaEngine {
    constructor(start, grammar) {
      this.start = start;
      this.grammar = grammar;
    }

    print(tree) {
      console.log(tree);
      console.log(this.grammar);
      console.log(tree[0].layout(this.start, this.grammar));
      try {
        return tree[0].layout(this.start, this.grammar);
      } catch (e) {
        console.log(e);
      }
    }

    parse(text) {
        throw Error("Not implemented");
    }
};

