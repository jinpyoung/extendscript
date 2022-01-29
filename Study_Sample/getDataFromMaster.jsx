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