// 현재의 preferences를 저장
var startRulerUnits = app.preferences.rulerUnits
var startTypeUnits = app.preferences.typeUnits
var startDisplayDialogs = app.displayDialogs
// 새로운 preferences로 설정
app.preferences.rulerUnits = Units.PIXELS
app.preferences.typeUnits = TypeUnits.PIXELS
app.displayDialogs = DialogModes.NO

// 열려있는 모든 도큐먼트 닫기
while(app.documents.length){
    app.activeDocument.close()
}

var docSize = 800
var cells = 8
var cellSize = docSize / cells

// 신규 도큐먼트 생성
var checkersDoc = app.documents.add(docSize, docSize, 72, "Checkers")
var shiftIt = true  // 체커 이동을 위한 변수

// 첫번째 행에 vertical 체커를 반복
for(var v = 0; v < docSize; v += cellSize){
    shiftIt = !shiftIt
    for(var h = 0; h < docSize; h += (cellSize * 2)){
        if(shiftIt && h == 0){
            h += cellSize
        }
        // 사각 선택 영역
        selRegion = Array( Array(h, v),
                           Array(h + cellSize, v),
                           Array(h + cellSize, v + cellSize),
                           Array(h, v + cellSize),
                           Array(h, v) )
        if(h == 0 && v == 0){
            checkersDoc.selection.select(selRegion)
        } else {
            checkersDoc.selection.select(selRegion, SelectionType.EXTEND)
        }
        WaitForReDraw()
    }   
}

checkersDoc.selection.fill(app.foregroundColor)
checkersDoc.selection.invert()
checkersDoc.selection.fill(app.backgroundColor)
checkersDoc.selection.deselect()

// 원래의 prefereces로 복원
app.preferences.rulerUnits = startRulerUnits
app.preferences.typeUnits = startTypeUnits
app.displayDialogs = startDisplayDialogs

function WaitForReDraw() {
    var eventWait = charIDToTypeID("Wait")
    var enumRedrawComplete = charIDToTypeID("RdCm")
    var typeState = charIDToTypeID("Stte")
    var keyState = charIDToTypeID("Stte")
    var desc = new ActionDescriptor()
    desc.putEnumerated(keyState, typeState, enumRedrawComplete)
    excuteAction(eventWait, desc, DialogModes.NO)
}