var doc = app.activeDocument
var inputVal = [1, "Layer 4", 5]

// inputVal 배열값의 레이어를 모두 활성화한후
for (var i = 0; i < inputVal.length; i++) {
    SelectLayerIdxOrName(inputVal[i])
    doc.activeLayer.visible = true
}
// inputVal 배열값의 레이어를 모두 선택
AddSelectLayerIdxOrNameOrArr(inputVal)

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

// 이름 또는 인덱스 또는 배열로 레이어를 선택한다.
function AddSelectLayerIdxOrNameOrArr(layerIdxOrName) {
    try {
        var desc = new ActionDescriptor()
        var ref = new ActionReference()
        var id_select = charIDToTypeID("slct")
        var id_null = charIDToTypeID("null")
        var id_layer = charIDToTypeID("Lyr ")

        if (Object.prototype.toString.call(layerIdxOrName) === '[object Array]') {
            for (var i = 0; i < layerIdxOrName.length; i++) {
                if (typeof layerIdxOrName[i] == 'number') {
                    ref.putIndex(id_layer, layerIdxOrName[i])
                } else {
                    ref.putName(id_layer, layerIdxOrName[i])
                }
            }
        } else { 
            if (typeof layerIdxOrName[i] == 'number') {
                ref.putIndex(id_layer, layerIdxOrName[i])
            } else {
                ref.putName(id_layer, layerIdxOrName[i])
            }
        }
        desc.putReference(id_null, ref)
        var id_selModifier = stringIDToTypeID("selectionModifier")
        var id_selModifierType = stringIDToTypeID("selectionModifierType")
        var id_addToSelection = stringIDToTypeID("addToSelection")
        desc.putEnumerated(id_selModifier, id_selModifierType, id_addToSelection)
        var id_MKVs = charIDToTypeID("MkVs")
        desc.putBoolean(id_MKVs, false)
        executeAction(id_select, desc, DialogModes.NO)

    } catch (e) {
        alert(e.message)
    }
}