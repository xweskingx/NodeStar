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

function getIDC(){
    var temp = idc;
    idc++;
    return temp;
}
function initAdditions(){

    document.querySelectorAll('.libButton').forEach(function(button){
        var index = button.id.match(/\d+/)[0];
        var layer = layerTypes[index];
        button.onclick = function(){
            var operatorID = layer.layer_type + "" + getIDC();
            var data = layer.toFlowchartData();
            currentLayers.push(new Layer(layer.layer_type, operatorID));
            $('#canvasHolder').flowchart('createOperator',operatorID, data["operators"]["operator1"]);
        };

    });



}


function generateMiddlewareJSON(){
     var oldlayer_json = {
        network : [
            // The mnist layer isn't an actual layer just loads data
            "mnist",
            "dense",
            "softmax",
            "output"
        ]
    };  //This was left for a template 
    
    var data = $('#canvasHolder').flowchart('getData');
    var operators = data['operators'];
    console.log(operators);
    var ids = Object.keys(operators);
    var network = [];
    for(var i = 0; i < ids.length; i++){
        var layer = fetchProperLayer(ids[i]);
        network.push(layer.name);
    }
    console.log(ids);
    var layer_json = {};
    layer_json.network = network;
    return layer_json;
}
function get_schema() {
   var layer_json = generateMiddlewareJSON();

    $.ajax({
        type: 'post',
        url:'NodeStar/Middleware.php',
        data: layer_json,
        complete: function (response) {
            $('#output').html(response.responseText);
            console.log(response);
        },
        error: function () {
            $('#output').html('Bummer: there was an error!');
        }
    });
    return false;
}
