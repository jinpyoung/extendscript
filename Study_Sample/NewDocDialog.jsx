NewDocDialog()
// New document 다이얼로그 띄우기
function NewDocDialog() {
    try {
        var desc = new ActionDescriptor();
        desc.putClass(stringIDToTypeID("new"), stringIDToTypeID("document"))
        executeAction(stringIDToTypeID("make"), desc, DialogModes.ALL)
    } catch (e) { alert(e) }
}