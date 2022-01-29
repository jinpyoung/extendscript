var root = "/Users/woody/Desktop/StoryScrapMaker/"
var csvFile = root + "master_StoryScrap.csv"    // 데이터 시트
var saveDir = root + "Final/"
var srcDir = root + "Src/"
var origin_L = root + "origin_StoryImage_L.psd"
var origin_S = root + "origin_StoryImage_S.psd"
var cnt = 0
var srcPath = ""
var dataArr = []

main()

function main() {

    getDataFromMaster( csvFile )  // 마스터데이터 추출
    openFile(origin_L)  // 스크랩 이미지용 PSD 열기

    var doc = app.activeDocument,
        layersRef = doc.layers

    for (var x = 0; x < layersRef.length; x++) {

        doc.activeLayer = doc.layers[x]
        var ref = new ActionReference()
            ref.putEnumerated(charIDToTypeID("Lyr "),
            charIDToTypeID("Ordn"),
            charIDToTypeID("Trgt"))
        var desc = executeActionGet(ref)
        if (desc.hasKey(charIDToTypeID('Grup')) && desc.getBoolean(charIDToTypeID('Grup'))) {

            if (cnt == 0) {
                srcPath = root + dataArr[1][0] + ".png"
                RelinkToFile(srcPath)
                cnt++
            } else if (cnt == 1) {
                srcPath = root + dataArr[2][0] + ".png"
                RelinkToFile(srcPath)
                cnt++
            } else if (cnt == 2) {
                srcPath = root + dataArr[3][0] + ".png"
                RelinkToFile(srcPath)
                cnt++
            } else if (cnt == 4) {
                srcPath = root + dataArr[4][0] + ".png"
                RelinkToFile(srcPath)
                cnt++
            } else if (cnt == 3) {
                srcPath = root + dataArr[5][0] + ".png"
                RelinkToFile(srcPath)
                cnt++
            } else if (cnt == 5) {
                srcPath = root + dataArr[6][0] + ".png"
                RelinkToFile(srcPath)
                cnt++
            }
        }
    }
    alert("스토리 카드 제작이 완료되었습니다.")
}

// 모든 그룹을 찾아서 배열로 반환
// return type : Array
function getLayerSetsArray() {

    var doc = app.activeDocument
    var groups = []

    // 레이어중 그룹들을 찾아서 groups 에 추가한다.
    for(var z=0; z < doc.layers.length; z++){
        if(doc.layers.layerSets) {
            groups.push(doc.layers)
        }
    }

    // 모든 서브 그룹을 찾아서 groups 에 추가한다.
    for(var z=0; z<groups.length; z++) { // groups 내부를 탐색
        for(var e=0; e<groups.layers.length; e++) {
            if(groups.layers.layerSets) {
                groups.push(groups.layers)
            }
        }
    }

    return groups
}

// 작업용 PSD 파일 오픈
function openFile(fileObj) {
    try{ var flag = app.open(File(fileObj)) } 
    catch(e) { alert(e) }

    if(flag) return true
}

// name으로 레이어 선택(레이어만 선택됨)
function selectLayerByName(name) {
    var desc = new ActionDescriptor();
    var ref = new ActionReference();
    ref.putName( charIDToTypeID( "Lyr " ), name );
    desc.putReference( charIDToTypeID( "null" ), ref );
    executeAction( charIDToTypeID( 'slct' ), desc, DialogModes.NO );
}

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

// 마스터 데이터 추출하기
function getDataFromMaster( masterfile ) {
    
    var row = [], col = []
    
    try {
        var file = new File( masterfile )
        file.open("r")
        var txt = file.read()
        row = txt.toString().split("\n")
        
        for(var i = 0; row.length > i; i++) {
            col = row[i].toString().split(",")
            dataArr.push(col)
        }
        return dataArr
        
    } catch(e) { alert("마스터 파일을 찾지 못했습니다.") }
}