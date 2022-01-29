// 파일 컨텐츠 교체
function ReplaceContents (fileObj){
	var idplacedLayerReplaceContents = stringIDToTypeID( "placedLayerReplaceContents" );
	var desc3 = new ActionDescriptor();
	var idnull = charIDToTypeID( "null" );
	desc3.putPath( idnull, new File( fileObj ) );
	var idPgNm = charIDToTypeID( "PgNm" );
	desc3.putInteger( idPgNm, 1 );
	executeAction( idplacedLayerReplaceContents, desc3, DialogModes.NO );
}