var doc = app.activeDocument

try {
    //현재 파일의 경로를 추출
    var filePath = decodeURI(doc.fullName.toString().replace(".psd", "").replace(".psb", "").replace(".jpg", "").replace(".png", ""))
    var arr = filePath.split('/')   // '/'로 텍스트를 분리
    var filename = arr[arr.length-1]   // 현재 파일의 이름
    var savePath_CommonAtlas = "/Users/woody/Desktop/Treenod/PokoPoko G Team/Project_LightMeta/LM_Design/UI/Atlas_Common/" + filename
    var savePath_LobbyAtlas = "/Users/woody/Desktop/Treenod/PokoPoko G Team/Project_LightMeta/LM_Design/UI/Atlas_Lobby/" + filename
    var savePath_Texture = "/Users/woody/Desktop/Treenod/PokoPoko G Team/Project_LightMeta/LM_Design/UI/RSC_Texture/" + filename
    dialog()
} catch (e) {
    alert("psd 파일로 저장한 후 다시 시도해주세요.")
}

// 다이얼로그 띄우기 (Background, Character, Object 저장하기 버튼)
function dialog() {
    var dlg = new Window('dialog', "Export");

    dlg.btnGroup = dlg.add('group');
    dlg.btnGroup.commonAtlasBtn = dlg.btnGroup.add('button', undefined, "CommonAtlas");
    dlg.btnGroup.lobbyAtlasBtn = dlg.btnGroup.add('button', undefined, "LobbyAtlas");
    dlg.btnGroup.TextureBtn = dlg.btnGroup.add('button', undefined, "Texture");
    dlg.btnGroup.cancelBtn = dlg.btnGroup.add('button', undefined, "Cancel");

    dlg.btnGroup.commonAtlasBtn.onClick = function() {
        purposeSave(savePath_BG, "psd")
        saveForWebPNG(savePath_BG + ".png")
        dlg.close()
    }

    dlg.btnGroup.lobbyAtlasBtn.onClick = function() {
        purposeSave(savePath_Cha, "psd")
        saveForWebPNG(savePath_Cha + ".png")
        dlg.close()
    }

    dlg.btnGroup.TextureBtn.onClick = function() {
        purposeSave(savePath_Obj, "psd")
        saveForWebPNG(savePath_Obj + ".png")
        dlg.close()
    }

    dlg.show();
}

// PNG 저장
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

// 저장 옵션들
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
    }
}

