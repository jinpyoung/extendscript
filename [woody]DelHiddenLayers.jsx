app.bringToFront();  
var docRef = app.activeDocument;
docRef.isBackgroundLayer = false;
var lays = docRef.layers;	
var laySets = docRef.layerSets;
var artLays = docRef.artLayers;
	
	
docRef.suspendHistory("Delete All Hidden Layers", "main()");

function main() {
	SelectBottomLayer(lays);	
	DelHiddenLayers(lays);
	DelEmptyLayers(laySets);
	NestedHiddenLayers(laySets);
	DelEmptyLayers(laySets);
}


// name 요소 선택
function selectLayersByName(name) {
    var idslct = charIDToTypeID( "slct" );
        var desc35 = new ActionDescriptor();
        var idnull = charIDToTypeID( "null" );
            var ref21 = new ActionReference();
            var idLyr = charIDToTypeID( "Lyr " );
            ref21.putName( idLyr, name );
        desc35.putReference( idnull, ref21 );
        var idMkVs = charIDToTypeID( "MkVs" );
        desc35.putBoolean( idMkVs, false );
        var idLyrI = charIDToTypeID( "LyrI" );
            var list12 = new ActionList();
            list12.putInteger( 5 );
        desc35.putList( idLyrI, list12 );
    executeAction( idslct, desc35, DialogModes.NO );
}

function SelectBottomLayer(Obj) {
	var getBottomLayName = Obj[Obj.length-1].name;
	selectLayersByName(getBottomLayName);
	}

// Delete layers of nested laySets
function NestedHiddenLayers(Obj) {
	
	for(var i = Obj.length - 1; i >= 0; i--) {
		
		var getLays = Obj[i].layers;
		SelectBottomLayer(Obj);
		DelHiddenLayers(getLays);		
				
		var getLaySets = Obj[i].layerSets;
		DelEmptyLayers(getLaySets)
		
		if(getLaySets.length > 0) NestedHiddenLayers(getLaySets);
		DelEmptyLayers(getLaySets);
	}
}

// Delete hidden layers
function DelHiddenLayers(Obj) {
	
	for(var i = Obj.length - 1; i >= 0; i--) {		
		if(!Obj[i].visible == true) Obj[i].remove();
	}
}

// Delete empty layers
function DelEmptyLayers(Obj) {
	
	for(var i = Obj.length - 1; i >= 0; i--) {
		var getLayers = Obj[i].layers;
		if(!getLayers.length > 0) Obj[i].remove();
	}
}

main();