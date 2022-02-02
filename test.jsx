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
var aos_size = [512, 432, 324, 216, 192, 162, 108, 144, 96, 81, 72, 48, 36]
var aos_adaptive_size = [432, 324, 216, 162, 108, 81]
var ios_size = [1024, 180, 167, 152, 144, 120, 114, 87, 80, 76, 72, 60, 58, 57, 40, 20]
var aos_name = "aOS"
var ios_name = "iOS"
var aos_name_adaptive = "aOS(Adaptive)"

// 앱아이콘 제작용 파일이 열렸는지 확인
if(app.documents.length == 0) {
    alert("앱아이콘 이미지 파일을 열어주세요.")
} else {    // 히스토리에 'appIconMake'로 등록하고 스크립트 실행
    app.activeDocument.suspendHistory("appIconMake", "main()")
}

function main() {

    var root = Folder.selectDialog ('AppIcon 을 생성할 폴더를 선택하세요.')   // 저장 폴더 선택
    var aos_dir = Folder(root + "/" + aos_name)
    var ios_dir = Folder(root + "/" + ios_name)
    var aos_dir_adaptive = Folder(root + "/" + aos_name_adaptive)
    if (aos_dir.exists == false) { aos_dir.create() }    // aOS 폴더 생성
    if (ios_dir.exists == false) { ios_dir.create() }    // iOS 폴더 생성
    if (aos_dir_adaptive.exists == false) { aos_dir_adaptive.create() }    // aOS(Adaptive) 폴더 생성

    resourceOutput("android_", aos_size,aos_dir,  aos_name) // aOS 아이콘 제작 
    resourceOutput("ios_", ios_size, ios_dir, ios_name) // iOS 아이콘 제작
    adaptiveAppIconMake("f", aos_adaptive_size, aos_dir_adaptive, aos_name_adaptive)    // aOS(Adaptive) forground 제작
    adaptiveAppIconMake("b", aos_adaptive_size, aos_dir_adaptive, aos_name_adaptive)    // aOS(Adaptive) background 제작

    alert("완료되었습니다.")
}

// 반응형 앱아이콘 제작 : visible_str 은 "f" , "b" 두개만 사용 가능
function adaptiveAppIconMake(visible_str, osAdaptive_size, aos_dir_adaptive, osAdaptiveFileName) {
    var curDoc = app.activeDocument.duplicate();
    var curlays = curDoc.layers
    layVisible(curlays, visible_str)    // f 활성화

    for(var i = 0; osAdaptive_size.length > i ; i++) {
        var aosAdaptiveFileName = "android_"+ osAdaptive_size[i] + "_" + visible_str + ".png"
        curDoc.resizeImage (osAdaptive_size[i])
        saveForWebPNG(aos_dir_adaptive, aosAdaptiveFileName)
    }
    curDoc.close(SaveOptions.DONOTSAVECHANGES)
}

// 도큐먼트를 복제 후 OS별 아이콘 제작(캔버스 리사이즈 크기, os명, os 사이즈 변수) 
// osName : "android_" or "ios_" 만 적용가능
function resourceOutput(osName, osIconSize, osPath, osFileName) {
        
    var docRef = app.activeDocument.duplicate();
    docRef.resizeCanvas(1332, 1332)
    for(var i = 0; osIconSize.length > i ; i++) {
        var osFileName = osName + osIconSize[i] + ".png";
        docRef.resizeImage (osIconSize[i]);
        saveForWebPNG(osPath, osFileName)
    }
    docRef.close(SaveOptions.DONOTSAVECHANGES)
}

// visible_str 이름을 가진 레이어만 활성화
function layVisible(lays, visibleLayerName) {
    for (var i = 0; lays.length > i; i++) {
        if (lays[i].name == visibleLayerName) { lays[i].visible = true } 
        else { lays[i].visible = false }
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
