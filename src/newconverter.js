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
    if (current.every(x => x.done)) {
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
  function generate(ast) {
    const block = workspace.newBlock(ast.label);
    const blockArgs = getBlockArguments(block);
    if (ast.attributes[0]) {
      block.setCommentText(ast.attributes[0].value);
      console.log(block)
    }

    for (let [blockArg, child] of zip(blockArgs, ast.children)) {
      if (child.label === "Empty") {
        continue;
      }
      if (blockArg === undefined) {
        const child2 = generate(child);
        block.nextConnection.connect(child2.previousConnection);
        continue;
      }

      if (child.type === "leaf") {
        if (blockArg instanceof Blockly.FieldVariable) {
          const variable = workspace.createVariable(child.lexeme, 'Number');
          blockArg.setValue(variable.getId());
        } else {
          blockArg.setValue(child);
        }
      } else if (child.type === "node") {
        const child2 = generate(child);
        switch (blockArg.type) {
          case Blockly.INPUT_VALUE:
            blockArg.connection.connect(child2.outputConnection);
            break;
          case Blockly.NEXT_STATEMENT:
            blockArg.connection.connect(child2.previousConnection);
            break;
        }
      }
    }
    block.initSvg();
    block.render();
    return block;
  }

  if (ast == null) {
    return null;
  }

  try {
    workspace.setResizesEnabled(false);
    const blocks = generate(ast);
    workspace.setResizesEnabled(true);
    return blocks;
  } catch (e) {
    console.log(e);
  }
}

function save(blocks) {
  console.log(blocks);
  function generate(block) {
    if (block === null) {
      throw new Error("Missing block");
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
    return meta.tree.node(block.type, [], astArgs);
  }

  //blocks.map(b => console.log(generate(b).toString()));
  console.log(generate(blocks[0]).toString());
  return generate(blocks[0]);
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
