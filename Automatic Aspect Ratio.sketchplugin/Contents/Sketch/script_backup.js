var sketch, document, selection;

var onRun = function(context) {
	sketch = require('sketch/dom');
	document = sketch.Document.getSelectedDocument();
	selection = document.selectedLayers;

	for (var i = 0; i < selection.layers.length; ++i) {
		var layer = selection.layers[i];
		resizeImage(layer);
		//log(layer.name)
	}
};

var resizeImage = function(layer){
	//log(layer.layers);
	for (var i = 0; i < layer.layers.length; ++i) {
		var child = layer.layers[i];
		log(child.name)
		if(child.name == 'Image'){
			var width = child.frame.width;
			var ratioHeight = child.frame.width / 1.5;
			log(width);
			log(ratioHeight);
			var newFrame = new sketch.Rectangle(child.frame);
			newFrame.height = ratioHeight;
			child.frame = newFrame;
		}
	}
}

var setAspectRatio = function(context){
	//log('Action: ' + context.action);
	sketch = require('sketch/dom');
	document = sketch.Document.getSelectedDocument();
	selection = document.selectedLayers;
	for (var i = 0; i < selection.layers.length; ++i) {
		var layer = selection.layers[i];
		if(layer.name == "Image"){
			var width = layer.frame.width;
			var ratioHeight = layer.frame.width / 1.5;
			var newFrame = new sketch.Rectangle(layer.frame);
			newFrame.height = ratioHeight;
			layer.frame = newFrame;
		}
	}
}

var setVariables = function(context){

}

var logAction = function(context){
	log('Action: ' + context.action);
}
