var layerTypes = [];

function loadLibrary(libraryID){
    $.getJSON("libjson/library_data.json", function(json) {
    var c = 1;
    for(var key in json){
        var lt = new LayerType(json[key]);
        layerTypes.push(lt);
        lt.appendToLibary(libraryID, "lt" + c);
        c++;
    }
    
});
}