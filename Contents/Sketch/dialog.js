var Dialog = function() {};

Dialog.prototype = {
  setup: function() {

    var dialog = this.new();
    if (dialog.button == 1000) {
      var i = dialog.selection;
      message = projects[i].name;
    }
  },
  new: function() {
    var alertBox = COSAlertWindow.new();
    var selectBox = NSPopUpButton.alloc().initWithFrame(NSMakeRect(0, 0, 200, 25));
    var artboardBox = NSButton.alloc().initWithFrame(NSMakeRect(0,0,250,14));
    selectBox.addItemsWithTitles(items);

    alertBox.setMessageText("Export Components");
    alertBox.setInformativeText("Please select project: ");
    alertBox.addAccessoryView(selectBox);

    alertBox.addButtonWithTitle('Export');
    alertBox.addButtonWithTitle('Cancel');

    return {
      button: alertBox.runModal(),
      selection: selectBox.indexOfSelectedItem(),
      artboard: artboardBox.state(),
    }
  }
}
