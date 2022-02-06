
/*
    Usage: 입력된 레이어를 모두 선택하고 Visible.
    Input:  Layers Array || 레이어 이름 || 레이어 인덱스
    Return: <none>
*/

function setSelectedLayers(layerIndexOrName) {
    try {
        var len = 1
        // Input : Layers Array인 경우 배열의 크기를 len에 할당
        if (Object.prototype.toString.call(layerIndexOrName) === '[object Array]') {
            len = layerIndexOrName.length
        }
        // 모두 Visible
        for (var i = 0; i < len; i++) {
            var id243 = charIDToTypeID("slct")
            var desc46 = new ActionDescriptor()
            var id244 = charIDToTypeID("null")
            var ref44 = new ActionReference()
            var id245 = charIDToTypeID("Lyr ")
            // Input : 숫자인 경우
            if (typeof layerIndexOrName == "number") {
                ref44.putIndex(id245, layerIndexOrName)
            }
            // Input : 배열인 경우
            else if (Object.prototype.toString.call(layerIndexOrName) === '[object Array]') {
                ref44.putIndex(id245, layerIndexOrName[i])
            }
            // Input : 레이어 이름인 경우
            else {
                ref44.putName(id245, layerIndexOrName)
            }
            desc46.putReference(id244, ref44)
            var id246 = stringIDToTypeID("selectionModifier")
            var id247 = stringIDToTypeID("selectionModifierType")
            var id248 = stringIDToTypeID("addToSelection")
            desc46.putEnumerated(id246, id247, id248)
            var id249 = charIDToTypeID("MkVs")
            desc46.putBoolean(id249, false)
            executeAction(id243, desc46, DialogModes.NO)
        }
    } catch (e) {
        alert(e.message)
    }
}