var doc = app.activeDocument
var lays = doc.layers

FindToLayerName(lays, "Test")

// 특정 이름을 가진 레이어를 찾기
function FindToLayerName(laysRef, layname) {

    var flag = true
    if (flag) {
        for (var i = 0; i < laysRef.length; i++) {
            if (laysRef[i].layerSets == "[LayerSets]") {
                FindToLayerName(laysRef[i].layers, layname)
            } else {
                if (laysRef[i].name == layname) {
                    alert("레이어 이름은 " + layname + " 입니다.")
                    laysRef[i].visible = true
                } else {
                    laysRef[i].visible = false
                }
            }
        }
        flag = false
    }
}