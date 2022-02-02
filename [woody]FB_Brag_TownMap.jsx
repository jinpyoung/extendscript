// 마스터 파일 내용 추출하기
var root = "C:/FacebookBragMaker/" // 작업 파일 루트 경로
var masterPath = root + "master_TownMap.CSV" // 데이터 시트
var psdPath = root + "TownMap.psd" // 원본 psd 파일
var imageDir = root + "Src_TownMap/" // 타운맵 아이콘 경로
var saveDir = root + "Final_TownMap/" // 최종 파일 저장 경로
var logPath = root + "log.txt"
var dataArr = []

// log 텍스트 정보 지우고 새로 시작
writeLog(logPath, "타운 자랑하기 양산을 시작합니다.\n", "w")

// master.CSV에서 데이터 추출하기
arrayExtractionFromTxtFile(masterPath)
main()

function main() {
    for (i = 0; dataArr.length > i; i++) {
        if (dataArr[i][0] == "ImageResKey") {
            continue
        } else {
            openBaseFile(psdPath)

            var doc = app.activeDocument
            var imagelay = doc.layers.getByName("Image")
            var imagePath = imageDir + dataArr[i][0] + ".psd"
            var imgFile = new File(imagePath);
            if (imgFile.exists === true) {
                // 타운맵 아이콘 이미지 교체
                selectLayerByName(imagelay.name)
                RelinkToFile(imagePath)

                // 최종 PNG 파일 저장하고 닫기
                var saveFilePath = saveDir + dataArr[i][1]
                purposeSave(saveFilePath, "jpg")
                app.activeDocument.close(SaveOptions.DONOTSAVECHANGES)
            } else {
                var txt = "Src_TownMap 폴더내에\n" + dataArr[i][0] + ".psd 파일이 존재하지 않습니다.\n----------------------------------------------------------"
                writeLog(logPath, txt, "e")
            }
        }
    }
    alert("타운맵 자랑하기 이미지 제작이 완료되었습니다.")
}

function writeLog(txtFile, valueTxt, mode) {
    try {
        var logfile = new File(txtFile)
        logfile.open(mode)
        logfile.seek(0, 2);
        logfile.writeln(valueTxt)
        logfile.close()
    } catch (e) {
        alert(e)
    }
}

// 카드 이미지 대체
function RelinkToFile(fileObj) {
    var idplacedLayerRelinkToFile = stringIDToTypeID("placedLayerRelinkToFile");
    var desc4 = new ActionDescriptor();
    var idnull = charIDToTypeID("null");
    desc4.putPath(idnull, new File(fileObj));
    var idPgNm = charIDToTypeID("PgNm");
    desc4.putInteger(idPgNm, 1);
    executeAction(idplacedLayerRelinkToFile, desc4, DialogModes.NO);
}

// 카드 이미지 대체
function ReplaceContents(fileObj) {
    var idplacedLayerReplaceContents = stringIDToTypeID("placedLayerReplaceContents");
    var desc3 = new ActionDescriptor();
    var idnull = charIDToTypeID("null");
    desc3.putPath(idnull, new File(fileObj));
    var idPgNm = charIDToTypeID("PgNm");
    desc3.putInteger(idPgNm, 1);
    executeAction(idplacedLayerReplaceContents, desc3, DialogModes.NO);
    return app.activeDocument.activeLayer
}

// 작업용 PSD 파일 오픈
function openBaseFile(fileObj) {
    try {
        var flag = app.open(File(fileObj));
    } catch (e) {
        alert(e)
    }
    if (flag) return true;
}

// name으로 레이어 선택
function selectLayerByName(name) {
    var desc = new ActionDescriptor();
    var ref = new ActionReference();
    ref.putName(charIDToTypeID("Lyr "), name);
    desc.putReference(charIDToTypeID("null"), ref);
    executeAction(charIDToTypeID('slct'), desc, DialogModes.NO);
}
// 마스터 파일 추출하기
function arrayExtractionFromTxtFile(masterfile) {

    var row = [],
        col = []

    try {
        var file = new File(masterfile)
        file.open("r")
        var txt = file.read()
        row = txt.toString().split("\n")

        for (var i = 0; row.length > i; i++) {
            col = row[i].toString().split(",")
            dataArr.push(col)
        }
        return dataArr

    } catch (e) {
        alert("마스터 파일을 찾지 못했습니다.")
    }
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
        pngOpt.compression = 9;
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