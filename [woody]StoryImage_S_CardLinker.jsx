var doc = app.activeDocument
var save_name = doc.fullName.toString().replace(".psd", "") // png 저장 파일명
var imageRef = doc.fullName.toString().replace("Icon", "Card6")
var layersRef = doc.layers
doc.activeLayer = layersRef[0]
RelinkToFile(imageRef)
purposeSave(save_name, "png24")
doc.save()
doc.close()

// 이미지파일 링크 대체
function RelinkToFile(fileObj) {
    var idplacedLayerRelinkToFile = stringIDToTypeID("placedLayerRelinkToFile");
    var desc4 = new ActionDescriptor();
    var idnull = charIDToTypeID("null");
    desc4.putPath(idnull, new File(fileObj));
    var idPgNm = charIDToTypeID("PgNm");
    desc4.putInteger(idPgNm, 1);
    executeAction(idplacedLayerRelinkToFile, desc4, DialogModes.NO);
}

// 파일 저장 옵션
function purposeSave(fileObj, extention) {

    purposeSave["jpg"] = [];
    purposeSave["psd"] = [];
    purposeSave["png8"] = [];
    purposeSave["png24"] = [];

    //jpg 로 저장
    purposeSave["jpg"] = function export_jpg(jpgQuary) {
        fileObj = new File(fileObj + ".jpg");
        var exp = new ExportOptionsSaveForWeb();
        exp.format = SaveDocumentType.JPEG;
        exp.interlaced = false;
        exp.optimized = true;
        exp.quality = jpgQuary;
        activeDocument.exportDocument(fileObj, ExportType.SAVEFORWEB, exp);
    }

    // psd 로 저장
    purposeSave["psd"] = function export_psd() {
        fileObj = new File(fileObj);
        psdOpt = new PhotoshopSaveOptions();
        psdOpt.alphaChannels = true;
        psdOpt.annotations = true;
        psdOpt.embedColorProfile = false;
        psdOpt.layers = true;
        psdOpt.spotColors = false;
        activeDocument.saveAs(fileObj, psdOpt, true, Extension.LOWERCASE);
    }

    // png24 로 저장
    purposeSave["png24"] = function export_png24() {
        fileObj = new File(fileObj);
        pngOpt = new PNGSaveOptions();
        pngOpt.PNG8 = false;
        pngOpt.interlaced = false;
        activeDocument.saveAs(fileObj, pngOpt, true, Extension.LOWERCASE);
    }

    // png 8로 저장
    purposeSave["png8"] = function export_png8() {
        fileObj = new File(fileObj + ".png");
        // 포토샵의 png8 저장 옵션 설정
        var pngOpt = new ExportOptionsSaveForWeb();
        pngOpt.format = SaveDocumentType.PNG;
        pngOpt.PNG8 = true;
        pngOpt.interlaced = false;
        pngOpt.compression = 9; //圧縮率の設定
        activeDocument.exportDocument(fileObj, ExportType.SAVEFORWEB, pngOpt);
    }

    if (extention == "psd") {
        purposeSave["psd"]();
    }
    if (extention == "png8") {
        purposeSave["png8"]();
    }
    if (extention == "png24") {
        purposeSave["png24"]();
    }
    if (extention == "jpg") {
        purposeSave["jpg"](80);
    } //jpgのクオリティ設定
}