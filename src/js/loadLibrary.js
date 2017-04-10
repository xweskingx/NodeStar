var layerTypes = [];



var idc = 0;

function loadLibrary(libraryID){
    $.getJSON("libjson/library_data.json", function(json) {
    var c = 1;
    for(var key in json){
        var lt = new LayerType(json[key]);
        layerTypes.push(lt);
        lt.appendToLibary(libraryID, "lt" + c, c-1);
        c++;
    }
    
      initAdditions();
    
});
}

function initAdditions(){
    
    document.querySelectorAll('.libButton').forEach(function(button){
        var index = button.id.match(/\d+/)[0];
        var layer = layerTypes[index];
        var operatorID = layer.layer_type + "" + idc;
        idc++;
        
        button.onclick = function(){
          
           var data = layer.toFlowchartData();
      
            $('#canvasHolder').flowchart('createOperator',operatorID, data["operators"]["operator1"]);
        };
     
    });
    
    
    
}