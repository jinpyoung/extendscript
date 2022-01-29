var doc = app.activeDocument

try {
    var pngSaveName = doc.fullName.toString().replace(".psd","")    // png 저장 파일명
    dialog()
} catch(e) {
    alert("psd 파일로 저장한 후 다시 시도해주세요.")
}

// 파일 저장 옵션
function purposeSave(fileObj, extention) {
    
    purposeSave["jpg"] = [];
    purposeSave["psd"] = [];
    purposeSave["png8"] = [];
    purposeSave["png24"] = [];

    //jpg 로 저장
    purposeSave["jpg"] = function export_jpg(jpgQuary) {
        fileObj = new File(fileObj+".jpg");
        var exp = new ExportOptionsSaveForWeb();
        exp.format = SaveDocumentType.JPEG;
        exp.interlaced　= false;
        exp.optimized= true;
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
        fileObj = new File(fileObj+".png");
        // 포토샵의 png8 저장 옵션 설정
        var pngOpt  = new ExportOptionsSaveForWeb();
        pngOpt.format = SaveDocumentType.PNG;
        pngOpt.PNG8 = true;
        pngOpt.interlaced = false;
        pngOpt.compression = 9;     //圧縮率の設定
        activeDocument.exportDocument(fileObj,ExportType.SAVEFORWEB, pngOpt);
    }
        
    if(extention == "psd"){purposeSave["psd"]();}
    if(extention == "png8"){purposeSave["png8"]();}
    if(extention == "png24"){purposeSave["png24"]();}
    if(extention == "jpg"){purposeSave["jpg"](80);}//jpgのクオリティ設定
}

function dialog() 
{
	var dlg = new Window('dialog', "Export");

	dlg.btnGroup = dlg.add('group');
	dlg.btnGroup.jpgBtn = dlg.btnGroup.add('button', undefined, "JPG");
    dlg.btnGroup.pngBtn = dlg.btnGroup.add('button', undefined, "PNG");
	dlg.btnGroup.cancelBtn = dlg.btnGroup.add('button', undefined, "Cancel");
	
	dlg.btnGroup.jpgBtn.onClick = function() {
        purposeSave(pngSaveName, "jpg")
        dlg.close()
	}

    dlg.btnGroup.pngBtn.onClick = function() {
        purposeSave(pngSaveName + ".", "png24")
        dlg.close()
	}
	dlg.show();
}
