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