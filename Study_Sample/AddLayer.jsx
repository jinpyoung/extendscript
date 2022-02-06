var doc = app.activeDocument
AddEmptyArtLayer()

// 아트레이어 추가
function AddEmptyArtLayer() {
    var desc = new ActionDescriptor()
    var ref = new ActionReference()
    ref.putClass(characIDToTypeID("Lyr "))
    desc.putReference(characIDToTypeID("null"), ref)
    executeAction(characIDToTypeID("Mk  "), desc, DialogModes.NO)
}