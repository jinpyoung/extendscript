// 현재의 Prefereces 저장 ----------------------------------------------------
var startRulerUnits = app.preferences.rulerUnits;   // Units.PIXELS
var startTypeUnits = app.preferences.typeUnits; // TypeUnits.PIXELS
var startDisplayDialogs = app.preferences.displayDialogs;

// pixels, display no dialogs 사용 설정
app.preferences.rulerUnits = Units.PIXELS;
app.preferences.typeUnits = TypeUnits.PIXELS;
app.preferences.displayDialogs = DialogModes.NO;
// --------------------------------------------------------------------------------------

// aOS별 반응형 아이콘 사이즈 리스트
var aOSName_adaptive = "aOS(Adaptive)"
var aOSAdaptive_size = [432, 324, 216, 162, 108, 81]

// 앱아이콘 제작용 파일이 열렸는지 확인
if(app.documents.length == 0) {
    alert("반응형 앱아이콘 이미지 파일을 열어주세요.")
} else {    // 히스토리에 'Adaptive AppIconMake'로 등록하고 스크립트 실행
    app.activeDocument.suspendHistory("Adaptive AppIconMake", "main()")
}

function main() {
    
    var targetPath = Folder.selectDialog ('AppIcon 을 생성할 폴더를 선택하세요.')   // 저장 폴더 선택
    var aosPath_adaptive = Folder(targetPath + "/" + aOSName_adaptive)
    if (aosPath_adaptive.exists == false) { 
        aosPath_adaptive.create() }    // aOS(Adaptive) 폴더 생성

    // forground 제작 //////////////////////////////////////
    var currentDoc = app.activeDocument.duplicate();
    var curlays = currentDoc.layers
    layVisible(curlays, "f", "b")    // f 그룹 활성화, b 그룹 비활성화

    for(var i = 0; aOSAdaptive_size.length > i ; i++) {
        var aosAdaptiveFileName = "android_"+ aOSAdaptive_size[i] + "_f.png"
        currentDoc.resizeImage (aOSAdaptive_size[i])
        saveForWebPNG(aosPath_adaptive, aosAdaptiveFileName)
    }
    currentDoc.close(SaveOptions.DONOTSAVECHANGES)
    
    // background 제작 ////////////////////////////////////
    currentDoc = app.activeDocument.duplicate()
    curlays = currentDoc.layers
    layVisible(curlays, "b", "f")    // b 그룹 활성화, f 그룹 비활성화
    for(var i = 0; aOSAdaptive_size.length > i ; i++) {
        aosAdaptiveFileName = "android_"+ aOSAdaptive_size[i] + "_b.png"
        currentDoc.resizeImage (aOSAdaptive_size[i])
        saveForWebPNG(aosPath_adaptive, aosAdaptiveFileName)
    }
    currentDoc.close (SaveOptions.DONOTSAVECHANGES)
    alert("완료되었습니다.")
}

// visible_str 이름을 가진 레이어만 활성화
function layVisible(lays, visible_str, invisible_str) {
    for (var i = 0; lays.length > i; i++) {
        if (lays[i].name == visible_str) {
            lays[i].visible = true
        } else if (lays[i].name == invisible_str) {
            lays[i].visible = false
        } else {
            lays[i].visible = false
        }
    }
}

// PNG 저장옵션
function saveForWebPNG(osPath, filename) {
	fileObj = new File(osPath + "/"+ filename);
	// 포토샵의 png24 저장 옵션 설정
	var pngOpts = new ExportOptionsSaveForWeb;
    pngOpts.format = SaveDocumentType.PNG
    pngOpts.PNG8 = false; 
    pngOpts.transparency = true; 
    pngOpts.interlaced = true; 
    pngOpts.quality = 100;
	activeDocument.exportDocument(fileObj,ExportType.SAVEFORWEB,pngOpts); 
}

// Preferences 리셋 -------------------------------------------------
app.preferences.rulerUnits = startRulerUnits;
app.preferences.typeUnits = startTypeUnits;
app.preferences.displayDialos = startDisplayDialogs
// --------------------------------------------------------------------------------------