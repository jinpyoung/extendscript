var doc = app.activeDocument
SelectLayerByName("Test")

// name으로 레이어 선택(레이어만 선택됨)
function SelectLayerByName(name) {
    var desc = new ActionDescriptor();
    var ref = new ActionReference();
    ref.putName( charIDToTypeID( "Lyr " ), name );
    desc.putReference( charIDToTypeID( "null" ), ref );
    executeAction( charIDToTypeID( 'slct' ), desc, DialogModes.NO );
}