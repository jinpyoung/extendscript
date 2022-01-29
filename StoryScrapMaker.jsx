var cnt = 0

var doc = app.activeDocument
var pngSaveName = doc.fullName.toString().replace(".psd","")    // png 저장 파일명

// 대체할 이미지 파일명 리스트 등록 --> 원본 PSD의 파일명을 가공해서 만듦
var cardNames = []
cardNames.push(doc.fullName.toString().replace("Image_L.psd", "Card1.png"))
cardNames.push(doc.fullName.toString().replace("Image_L.psd", "Card2.png"))
cardNames.push(doc.fullName.toString().replace("Image_L.psd", "Card3.png"))
cardNames.push(doc.fullName.toString().replace("Image_L.psd", "Card5.png"))
cardNames.push(doc.fullName.toString().replace("Image_L.psd", "Card4.png"))
cardNames.push(doc.fullName.toString().replace("Image_L.psd", "Card6.png"))

var layers = doc.layers
var subGroups = layers[0].layerSets

for (k = 0; subGroups.length > k; k++) {
    var sublayers = subGroups[k].layers
    for (i = 0; sublayers.length > i; i++) {
        doc.activeLayer = sublayers[i]
        var ref = new ActionReference()
        ref.putEnumerated(charIDToTypeID("Lyr "), charIDToTypeID("Ordn"), charIDToTypeID("Trgt"))
        var desc = executeActionGet(ref)

        if (desc.hasKey(charIDToTypeID('Grup')) && desc.getBoolean(charIDToTypeID('Grup'))) {
            RelinkToFile(cardNames[cnt])
            cnt++
        }
    }
}

purposeSave(pngSaveName + ".", "png24")
alert("모든 이미지가 교체되었습니다.")

// 이미지파일 링크 대체
function RelinkToFile (fileObj) {
   var idplacedLayerRelinkToFile = stringIDToTypeID( "placedLayerRelinkToFile" );
   var desc4 = new ActionDescriptor();
   var idnull = charIDToTypeID( "null" );
   desc4.putPath( idnull, new File( fileObj));
   var idPgNm = charIDToTypeID( "PgNm" );
   desc4.putInteger( idPgNm, 1 );
   executeAction( idplacedLayerRelinkToFile, desc4, DialogModes.NO );
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