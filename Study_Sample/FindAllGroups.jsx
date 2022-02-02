var groups_all = []

var doc = app.activeDocument
var lays = doc.layers

groups_all = getLayerSetsArray(lays)

// 도큐먼트에서 모든 그룹을 찾아서 배열을 리턴한다.
function getLayerSetsArray(laysRef) {
    var flag = true
    var groups = []
    var foundLayer = null
    // 레이어중 그룹들을 찾아서 groups 에 추가한다.
    if (flag == true) {
        for (var i = 0; i < laysRef.length; i++) {
            if (laysRef[i].layerSets == "[LayerSets]") {
                groups.push(laysRef[i])
                getLayerSetsArray(laysRef[i].layers)
            } else {
                continue
            }
        }
        flag = false
    }
    return groups
}