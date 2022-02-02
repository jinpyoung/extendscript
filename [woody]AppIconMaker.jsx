// 현재의 Prefereces 저장 ----------------------------------------------------
var startRulerUnits = app.preferences.rulerUnits;   // Units.PIXELS
var startTypeUnits = app.preferences.typeUnits; // TypeUnits.PIXELS
var startDisplayDialogs = app.preferences.displayDialogs;

// pixels, display no dialogs 사용 설정
app.preferences.rulerUnits = Units.PIXELS;
app.preferences.typeUnits = TypeUnits.PIXELS;
app.preferences.displayDialogs = DialogModes.NO;
// --------------------------------------------------------------------------------------

// 각 OS별 앱아이콘 사이즈 리스트
var aOSIconSize = [512, 432, 324, 216, 192, 162, 108, 144, 96, 81, 72, 48, 36]
var aOSAdaptive_size = [432, 324, 216, 162, 108, 81]
var aOSAdaptive_Sep = ["f", "b"]
var iOSIconSize = [1024, 180, 167, 152, 144, 120, 114, 87, 80, 76, 72, 60, 58, 57, 40, 20]
var aOSName = "aOS"
var iOSName = "iOS"

// 앱아이콘 제작용 파일이 열렸는지 확인
if(app.documents.length == 0) {
    alert("앱아이콘 이미지 파일을 열어주세요.")
} else {    // 히스토리에 'appIconMake'로 등록하고 스크립트 실행
    app.activeDocument.suspendHistory("appIconMake", "main()")
}

function main() {
    
    var targetPath = Folder.selectDialog ('AppIcon 을 생성할 폴더를 선택하세요.')   // 저장 폴더 선택
    var aosPath = Folder(targetPath + "/" + aOSName)
    var iosPath = Folder(targetPath + "/" + iOSName)
    if (aosPath.exists == false) { aosPath.create() }    // aOS 폴더 생성
    if (iosPath.exists == false) { iosPath.create() }    // iOS 폴더 생성

    // 도큐먼트를 복제 후 aOS 아이콘 제작 
    var currentDoc = app.activeDocument.duplicate();
    for(var i = 0; aOSIconSize.length > i ; i++) {
        var aosFileName = "android_"+ aOSIconSize[i] + ".png";
        currentDoc.resizeImage (aOSIconSize[i]);
        saveForWebPNG(aosPath, aosFileName)
    }
    currentDoc.close(SaveOptions.DONOTSAVECHANGES)
    
    // 도큐먼트  복제 후 iOS 아이콘 제작
    var originalDoc = app.activeDocument.duplicate()
    for(var i = 0; iOSIconSize.length > i ; i++) {
        var iosFileName = "ios_"+ iOSIconSize[i] + ".png"
        originalDoc.resizeImage (iOSIconSize[i])
        saveForWebPNG(iosPath, iosFileName)
    }
    originalDoc.close (SaveOptions.DONOTSAVECHANGES)
    alert("완료되었습니다.")
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

