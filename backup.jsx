try {
    var doc = app.activeDocument
    var layRefs = doc.layers
    var layerLists = []

    // 전체 레이어의 이름을 가져온다.
    for (i = 0; layRefs.length > i; i++) {
        layerLists.push(layRefs[i].name)
    }
    layerLists.sort()

    for (i = 0; layRefs.length > i; i++) {
        var targetLayer = getLayerByName(layerLists[i])
        moveLayers(targetLayer, i)
    }
} catch (e) {
    "psd 파일을 열어주세요."
}

// 선택된 레이어를 원하는 인덱스로 이동
function moveLayers(layerIDs, targetLayerIndex) {
    // MOVE LAYERS
    var desc32 = new ActionDescriptor();
    var ref13 = new ActionReference();
    ref13.putEnumerated(charIDToTypeID('Lyr '), charIDToTypeID('Ordn'), charIDToTypeID('Trgt'));
    desc32.putReference(charIDToTypeID('null'), ref13);
    var ref14 = new ActionReference();
    // ref14.putIdentifier( charIDToTypeID( "Lyr " ), activeID );
    ref14.putIndex(charIDToTypeID('Lyr '), targetLayerIndex);
    desc32.putReference(charIDToTypeID('T   '), ref14);
    desc32.putBoolean(charIDToTypeID('Adjs'), false);
    desc32.putInteger(charIDToTypeID('Vrsn'), 5);
    var list5 = new ActionList();
    for (var i = 0; i < layerIDs.length; i++) {
        list5.putInteger(layerIDs[i]);
    }
    desc32.putList(charIDToTypeID('LyrI'), list5);
    try {
        executeAction(charIDToTypeID('move'), desc32, DialogModes.NO);
    } catch (e) {}
}

// 이름으로 레이어 찾기
function getLayerByName(layerName) {
    try {
        var select = charIDToTypeID("slct");
        var actionDescriptor = new ActionDescriptor();
        var idnull = charIDToTypeID("null");
        var actionReference = new ActionReference();
        var layer = charIDToTypeID("Lyr ");
        actionReference.putName(layer, layerName);
        actionDescriptor.putReference(idnull, actionReference);
        var makeVisibleID = charIDToTypeID("MkVs");
        actionDescriptor.putBoolean(makeVisibleID, false);
        var layerId = charIDToTypeID("LyrI");
        var actionList = new ActionList();
        actionList.putInteger(1);
        actionDescriptor.putList(layerId, actionList);
        executeAction(select, actionDescriptor, DialogModes.NO);

        return app.activeDocument.activeLayer;

    } catch (e) {
        return false;
    }
}