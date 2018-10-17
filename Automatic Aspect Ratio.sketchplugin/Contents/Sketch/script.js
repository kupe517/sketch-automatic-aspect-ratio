var sketch = require('sketch/dom');
var Settings = require('sketch/settings');
var UI = require('sketch/ui');
var document = sketch.Document.getSelectedDocument();
var selection = document.selectedLayers;

var autoRatio = function(context) {

	if(selection.length === 0){
		return;
	}

	selection.layers.forEach(layer => {
		if(layer.type !== 'ShapePath' || layer === undefined || layer.type === 'Shape'){
			return;
		}
		var layerName = layer.name;
		if(layerName.includes("*")){
			var aspectRatio = layerName.replace(/ /g,'').split('*');
			aspectRatio = aspectRatio[1].split(':');
			var aspectValue = aspectRatio[0] / aspectRatio[1];

			var width = layer.frame.width;
			var ratioHeight = layer.frame.width / aspectValue;
			var newFrame = new sketch.Rectangle(layer.frame);
			newFrame.height = ratioHeight;
			layer.frame = newFrame;
		}else{
			return;
		}

	});

};

var logAction = function(context){
	log('Action: ' + context.action);
}

var ratio1_1 = function(context){
	renameLayers('1:1');
}

var ratio3_1 = function(context){
	renameLayers('3:1');
}

var ratio3_2 = function(context){
	renameLayers('3:2');
}

var ratio4_3 = function(context){
	renameLayers('4:3');
}

var ratio16_9 = function(context){
	renameLayers('16:9');
}

var ratio16_10 = function(context){
	renameLayers('16:10');
}


var renameLayers = function(name){
	selection.layers.forEach(layer => {
		if(layer.type === 'ShapePath' || layer.type === 'Shape'){
			var layerName = layer.name;
			if(layerName.includes("*")){
				var cleanName = layerName.split('*');
				cleanName = cleanName[0];
				layer.name = cleanName + '* ' + name;
			}else{
				layer.name = layerName + ' * ' + name;
			}
			autoRatio();
		}
	});
}
