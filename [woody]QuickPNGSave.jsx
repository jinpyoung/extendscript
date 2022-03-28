var doc = app.activeDocument

try {
    var pngSaveName = doc.fullName.toString().replace(".psd", ".png") // png 저장 파일명
    saveForWebPNG(pngSaveName)
} catch (e) {
    alert("psd 파일로 저장한 후 다시 시도해주세요.")
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