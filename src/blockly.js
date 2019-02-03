const Blockly = window.Blockly;

Blockly.WorkspaceDragger.prototype.updateScroll_ = function(x, y) {
  this.workspace_.scrollbar.set(y);
};

Blockly.createMainWorkspace_ = function(svg, options, blockDragSurface,
    workspaceDragSurface) {
  options.parentWorkspace = null;
  var mainWorkspace =
      new Blockly.WorkspaceSvg(options, blockDragSurface, workspaceDragSurface);
  mainWorkspace.scale = options.zoomOptions.startScale;
  svg.appendChild(mainWorkspace.createDom('blocklyMainBackground'));

  if (!options.hasCategories && options.languageTree) {
    // Add flyout as an <svg> that is a sibling of the workspace svg.
    var flyout = mainWorkspace.addFlyout_('svg');
    Blockly.utils.insertAfter(flyout, svg);
  }

  // A null translation will also apply the correct initial scale.
  mainWorkspace.translate(0, 0);
  Blockly.mainWorkspace = mainWorkspace;

  if (!options.readOnly && !options.hasScrollbars) {
    var workspaceChanged = function(e) {
      if (!mainWorkspace.isDragging()) {
        var metrics = mainWorkspace.getMetrics();
        var edgeLeft = metrics.viewLeft + metrics.absoluteLeft;
        var edgeTop = metrics.viewTop + metrics.absoluteTop;
        if (metrics.contentTop < edgeTop ||
            metrics.contentTop + metrics.contentHeight >
            metrics.viewHeight + edgeTop ||
            metrics.contentLeft <
                (options.RTL ? metrics.viewLeft : edgeLeft) ||
            metrics.contentLeft + metrics.contentWidth > (options.RTL ?
                metrics.viewWidth : metrics.viewWidth + edgeLeft)) {
          // One or more blocks may be out of bounds.  Bump them back in.
          var MARGIN = 25;
          var blocks = mainWorkspace.getTopBlocks(false);
          var oldGroup = null;
          if (e) {
            oldGroup = Blockly.Events.getGroup();
            Blockly.Events.setGroup(e.group);
          }
          var movedBlocks = false;
          for (var b = 0, block; block = blocks[b]; b++) {
            var blockXY = block.getRelativeToSurfaceXY();
            var blockHW = block.getHeightWidth();
            // Bump any block that's off the left back inside.
            var overflowLeft = MARGIN + edgeLeft -
                blockXY.x - (options.RTL ? 0 : blockHW.width);
            if (overflowLeft > 0) {
              block.moveBy(overflowLeft, 0);
              movedBlocks = true;
            }
            // Bump any block that's off the right back inside.
            var overflowRight = edgeLeft + metrics.viewWidth - MARGIN -
                blockXY.x + (options.RTL ? blockHW.width : 0);
            if (overflowRight < 0) {
              block.moveBy(overflowRight, 0);
              movedBlocks = true;
            }
          }
          if (e) {
            if (!e.group && movedBlocks) {
              console.log('WARNING: Moved blocks in bounds but there was no event group.'
                        + ' This may break undo.');
            }
            Blockly.Events.setGroup(oldGroup);
          }
        }
      }
    };
    mainWorkspace.addChangeListener(workspaceChanged);
  }
  // The SVG is now fully assembled.
  Blockly.svgResize(mainWorkspace);
  Blockly.WidgetDiv.createDom();
  Blockly.Tooltip.createDom();
  return mainWorkspace;
};



export default Blockly;
