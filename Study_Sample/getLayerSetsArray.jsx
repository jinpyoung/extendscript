// 모든 그룹을 찾아서 배열로 반환 return type : Array
function getLayerSetsArray() {

    var doc = app.activeDocument
    var groups = []

    // 레이어중 그룹들을 찾아서 groups 에 추가한다.
    for(var z=0; z < doc.layers.length; z++){
        if(doc.layers.layerSets) {
            groups.push(doc.layers)
        }
    }

    // 모든 서브 그룹을 찾아서 groups 에 추가한다.
    for(var z=0; z<groups.length; z++) { // groups 내부를 탐색
        for(var e=0; e<groups.layers.length; e++) {
            if(groups.layers.layerSets) {
                groups.push(groups.layers)
            }
        }
    }

    return groups
}