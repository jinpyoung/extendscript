var doc = app.activeDocument
var strArr = ["es", "cn", "tw", "jp", "en", "kr"]

for(var i = 0; i < 6; i++){
    var selLay = SelectLayerByName(strArr[i])
    doc.activeLayer.visible = false
}

for(var i = 0; i < 6; i++){
    var selLay = SelectLayerByName(strArr[i])
    var saveName = doc.fullName.toString().replace(".psd", "") // png 저장 파일명
    doc.activeLayer.visible = true
    saveForWebPNG(saveName + "_" + strArr[i] + ".png")
    doc.activeLayer.visible = false
}

// name으로 레이어 선택
function SelectLayerByName(name) {
    var desc = new ActionDescriptor();
    var ref = new ActionReference();
    ref.putName( charIDToTypeID( "Lyr " ), name );
    desc.putReference( charIDToTypeID( "null" ), ref );
    executeAction( charIDToTypeID( 'slct' ), desc, DialogModes.NO );
}

function saveForWebPNG(outputFolderStr)
{
    var opts, file;
    opts = new ExportOptionsSaveForWeb();
    opts.format = SaveDocumentType.PNG;
    opts.PNG8 = false;
    opts.quality = 100;
    file = new File(outputFolderStr);
    activeDocument.exportDocument(file, ExportType.SAVEFORWEB, opts);
}