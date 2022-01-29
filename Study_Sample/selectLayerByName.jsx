// name으로 레이어 선택(레이어만 선택됨)
function selectLayerByName(name) {
    var desc = new ActionDescriptor();
    var ref = new ActionReference();
    ref.putName( charIDToTypeID( "Lyr " ), name );
    desc.putReference( charIDToTypeID( "null" ), ref );
    executeAction( charIDToTypeID( 'slct' ), desc, DialogModes.NO );
}