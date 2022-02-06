var doc = app.activeDocument
// SelectLayerByName("Test")
SelectLayerIdxOrName(3)



// name으로 레이어 선택(레이어만 선택됨)
function SelectLayerByName(name) {
    var desc = new ActionDescriptor()
    var ref = new ActionReference()
    ref.putName(charIDToTypeID("Lyr "), name)
    desc.putReference(charIDToTypeID("null"), ref)
    executeAction(charIDToTypeID('slct'), desc, DialogModes.NO)
}

// 인덱스 또는 이름으로 레이어 활성화
function SelectLayerIdxOrName(layerIndexOrName) {
    try {
        var id239 = charIDToTypeID("slct")
        var desc45 = new ActionDescriptor()
        var id240 = charIDToTypeID("null")
        var ref43 = new ActionReference()
        var id241 = charIDToTypeID("Lyr ")
        if (typeof layerIndexOrName == "number") {
            ref43.putIndex(id241, layerIndexOrName)
        } else {
            ref43.putName(id241, layerIndexOrName)
        }
        desc45.putReference(id240, ref43)
        var id242 = charIDToTypeID("MkVs")
        desc45.putBoolean(id242, false)
        executeAction(id239, desc45, DialogModes.NO)
    } catch (e) {
        alert(e.message)
    }
}