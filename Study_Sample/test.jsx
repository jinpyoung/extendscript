var doc = doc.activeDocument
var layersRef = doc.layers;

for (var x = 0; x < doc.layers; x++)
{
    doc.activeLayer = doc.layers[x];
    var ref = new ActionReference();
    ref.putEnumerated(charIDToTypeID("Lyr "), charIDToTypeID("Ordn"), charIDToTypeID("Trgt"));
    var desc = executeActionGet(ref);
    if (desc.hasKey(charIDToTypeID('Grup')) && desc.getBoolean(charIDToTypeID('Grup')))
    {
        alert("this is Clipping Mask Layer: " + doc.activeLayer.name);
    }
}