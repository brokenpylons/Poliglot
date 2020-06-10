import Blockly from './blockly'
import {meta} from '@brokenpylons/metalanguage';

function* getAllItems(block) {
  for (let input of block.inputList) {
    for (let field of input.fieldRow) {
      yield field;
    }
    yield input;
  }
}

function* nextBlockIterator(start) {
  for (let b = start; b != null; b = b.getNextBlock()) {
    yield b;
  }
}

function getBlockArguments(block) {
  return [...getAllItems(block)].filter(item => item.name);
}

function moveTo(block, x, y) {
  const current = block.getRelativeToSurfaceXY();
  block.moveBy(x - current.x , y - current.y);
}

function* zip(...args) {
  const iterators = args.map(x => x[Symbol.iterator]());
  while (true) {
    const current = iterators.map(x => x.next());
    if (current.some(x => x.done)) {
      break;
    }
    yield current.map(x => x.value);
  }
}

function isValue(ast) {
  return typeof ast === 'string';
}

function isCommand(ast) {
  return Array.isArray(ast) && typeof ast[0] === 'string';
}

function isList(ast) {
  return Array.isArray(ast) && typeof ast[0] !== 'string';
}

function load(workspace, ast) {
/*  function generate(ast) {
    let [c, ...astArgs] = ast;

    const block = workspace.newBlock(c);
    const blockArgs = getBlockArguments(block);
    block.initSvg();
    block.render();

    for (let [blockArg, astArg] of zip(blockArgs, astArgs)) {
      if (isValue(astArg)) {
        if (blockArg instanceof Blockly.FieldVariable) {
          const variable = workspace.createVariable(astArg, 'Number');
          blockArg.setValue(variable.getId());
        } else {
          blockArg.setValue(astArg);
        }
      } else if (isCommand(astArg)) {
        const child = generate(astArg);
        blockArg.connection.connect(child.outputConnection);
      } else if (isList(astArg)) {
        let connection = blockArg.connection;
        for (let item of astArg) {
          const child = generate(item);
          connection.connect(child.previousConnection);
          connection = child.nextConnection;
        }
      }
    }
    return block;
  }

  if (ast == null) {
    return null;
  }

  workspace.setResizesEnabled(false);
  const blocks = ast.map(generate);
  workspace.setResizesEnabled(true);
  return blocks;*/
  return undefined;
}

function save(blocks) {
  function generate(block) {
    if (block == null) {
      throw Error("XXX");
    }

    let astArgs = getBlockArguments(block).map(blockArg => {
      switch (blockArg.constructor) {
        case Blockly.FieldLabel:
          return;
        case Blockly.FieldTextInput:
        case Blockly.FieldNumber:
        case Blockly.FieldVariable:
          return meta.tree.leaf(blockArg.getText());
        case Blockly.Input:
          return generate(blockArg.connection.targetBlock());
        default:
          throw new Error('Unexpected block argument type');
      }
    });

    const nextBlock = block.getNextBlock();
    if (nextBlock != null) {
      astArgs.push(generate(nextBlock));
    }
    return meta.tree.node(block.type, astArgs);
  }

  blocks.map(b => console.log(generate(b).toString()));
  return blocks.map(generate);
}

function formatBlocks(blocks, padding = 2) {
  let position = 0;
  for (let block of blocks) {
    moveTo(block, 0, position);
    position += block.height + padding;
  }

  return position - padding;
}

export {save, load, formatBlocks};
