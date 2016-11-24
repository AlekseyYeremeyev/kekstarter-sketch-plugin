@import 'helpers.js';
@import 'request.js';

function onRun(context) {
  var document = context.document;

  var page = findPageByName('_components');
  var artboards = page.artboards();
  var result = {};

  artboards.forEach(function(artboard) {
    var artboardName = artboard.name();
    var artboardNameJson= artboardName.toLowerCase();
    result[artboardNameJson] = {};
    
    var groups = findByType(artboard, 'MSLayerGroup');

    groups.forEach(function(group) {
      var groupName = group.name();
      var groupNameJson = group.name().toLowerCase();
      result[artboardNameJson][groupNameJson] = {};

      var symbols = findByType(group, 'MSSymbolInstance');

      log(groupName);

      symbols.forEach(function(symbol) {
        var symbolName = symbol.name();
        var symbolNameJson = symbol.name().toLowerCase();
        var symbolLayers = symbol.symbolMaster();

        var shape = findByType(symbolLayers, 'MSShapeGroup').firstObject();
        var text = findByType(symbolLayers, 'MSTextLayer').firstObject();
        var shapeStyles = processCssStyles(shape.CSSAttributes());
        var textStyles = processCssStyles(text.CSSAttributes());

        var hPadding = (shape.absoluteRect().width() - text.absoluteRect().width()) / 2;
        var vPadding = (shape.absoluteRect().height() - text.absoluteRect().height()) / 2;

        var resultStyles = Object.assign({}, shapeStyles, textStyles, {
          padding: vPadding + 'px ' + hPadding + 'px'
        });

        if (symbolNameJson == 'default') {
          result[artboardNameJson][groupNameJson] = resultStyles;
        } else {
          result[artboardNameJson][groupNameJson]['&:' + symbolNameJson] = resultStyles;
        }
      });
      
    });
  });

  var json = JSON.stringify(result);

  post('http://localhost:3000', json);

  // === === //

  function processCssStyles(styles) {
    var cleanedStyles = styles.splice(0, 1);
    var result = {};

    styles.forEach(function(style) {
      var cssString = style.replace(';', '').split(': ');
      var property = cssString[0];
      var value = cssString[1];
      result[property] = value;
    });

    return result;
  }

  function findByType(container, type) {
    var predicate = NSPredicate.predicateWithFormat('className == %@', type);
    return findLayersMatchingPredicate_inContainer_filterByType(document, predicate, container);
  }

  function findPageByName(pageName) {
    var predicate = NSPredicate.predicateWithFormat("name == %@", pageName)
    return findFirstLayerMatchingPredicate_inContainer_filterByType(document, predicate, nil, MSPage);
  }

}
