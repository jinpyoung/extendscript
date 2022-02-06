var str = "The Layer Below"
var doc = app.activeDocument
var newLay = doc.artLayers.add()
var indexArr = getSelectedLayersIdx()

// 현재 선택된 레이어 아래에 신규 레이어를 생성한다.
function createLayerBelowCurrent(idx) {
	var layRef = app.activeDocument.layers[idx]
	var newLayRef = app.activeDocument.artLayers.add()
	newLayRef.move(layRef, ElementPlacement.PLACEAFTER)
}

// 선택된 레이어의 인덱스를 리턴 : Array
function getSelectedLayersIdx(){
	
	var selectedLayers = new Array
	var ref = new ActionReference()
	    ref.putEnumerated(charIDToTypeID("Dcmn"), charIDToTypeID("Ordn"), charIDToTypeID("Trgt"))
	var desc = executeActionGet(ref)
	
	if(desc.hasKey(stringIDToTypeID('targetLayers'))) {
		desc = desc.getList(stringIDToTypeID('targetLayers'))
		 var c = desc.count 
		 var selectedLayers = new Array()
		 for(var i = 0; i < c; i++) {
			try { 
				activeDocument.backgroundLayer
				selectedLayers.push(desc.getReference(i).getIndex())
			} catch(e) {
				selectedLayers.push( desc.getReference(i).getIndex() + 1)
			}
		 }
	 } else {
		var ref = new ActionReference() 
		ref.putProperty(charIDToTypeID("Prpr") , charIDToTypeID("ItmI")) 
		ref.putEnumerated(charIDToTypeID("Lyr "), charIDToTypeID("Ordn"), charIDToTypeID("Trgt"))
		try{ 
			activeDocument.backgroundLayer
			selectedLayers.push(executeActionGet(ref).getInteger(charIDToTypeID( "ItmI" ))-1)
		}catch(e){
			selectedLayers.push(executeActionGet(ref).getInteger(charIDToTypeID( "ItmI" )))
		}
	}
    return selectedLayers
}