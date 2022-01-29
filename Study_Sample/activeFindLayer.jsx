function activeFindLayer(name) {

    var groups = []
    var foundLayer = null

    // 레이어중 그룹들을 찾아서 groups 에 추가한다.
    for(var z=0; z < myDoc.layers.length; z++){
        if(myDoc.layers.layerSets) {
            groups.push(myDoc.layers)
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

    // 모든 그룹들에서 레이어명 탐색.
    for(var z in groups) {
        try {
            foundLayer = groups.layers.getByName(name)
            break
        } catch(e) {}
    }

    // 레이어를 찾으면 해당 레이어를 활성화
    if(foundLayer != null) { myDoc.activeLayer = foundLayer } 
    else { alert("The layer could not be found!") }
}