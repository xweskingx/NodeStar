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
            currentLayers.push(new Layer(layer.layer_type, operatorID, layer.default_in, layer.default_out, layer.data_type, layer.data_type));
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
    var network = theLayerList.JSONorDIE();
    if(network == "startEndFail"){
        makeInfoNoty("Please ensure start and end are linked to your network");
        return null;
    }else if(network == "connectFail"){
        makeInfoNoty("No path found from start to end - check for layer breakage");
        return null;
    }
   var layer_json = {};
   layer_json.network = network;
  /* 
    var operators = data['operators'];
    var ids = Object.keys(operators);
    var network = [];
    for(var i = 0; i < ids.length; i++){
        var layer = fetchProperLayer(ids[i]);
        if(layer != null)
            network.push(layer.name);
        
    }
    var layer_json = {};
    layer_json.network = network;*/
    console.log(layer_json);
    return layer_json;
}
function get_schema() {
   var layer_json = generateMiddlewareJSON();
   
   if(layer_json == null){
       return null;
   }
else{
  var schemaName = getSchemaName();
  if(schemaName != null){
    $.ajax({
        type: 'post',
        url:'NodeStar/Middleware.php',
        data: layer_json,
        complete: function (response) {
            var blob = new Blob([response.responseText], {type: "text/plain;charset=utf-8"});
            saveAs(blob, schemaName);
        },
        error: function () {
            $('#output').html('Bummer: there was an error!');
        }
    });
  }
    return false;
}
}

function getSchemaName(){
    var name = $('#schemaNameBox').val().trim();
    if(name == ""){
        makeInfoNoty('Please name your schema before downloading');
        return null;   
    }
    return name + ".py";
    
}

function makeData(layer_type,ind,outd,left, top){
     var data = new Object();
    data.operators = new Object();
    data.operators.operator1 = new Object();
    data.operators.operator1.top = top;
    data.operators.operator1.left = left;
    data.operators.operator1.properties = new Object();
    var props = data.operators.operator1.properties;
    props.title = layer_type;
    var inputs = new Object();
    var outputs = new Object();
    for(var i = 0; i < ind; i++){
        var label = "input_"+(i+1);
        inputs[label]={'label':'Input ' + i};
    }
    for(var k = 0; k < outd; k++){
        var label = "output_"+(k+1);
        outputs[label]={'label':'Output ' + k};
    }
    props.inputs = inputs;
    props.outputs = outputs;
    this.layerData = data;
    return data;
}

$('#adButton').click(function(){
    console.log("Wes, add the account linking here");
});

$('#logButton').click(function(){
    console.log("Wes, logout here");
});

function makeInfoNoty(msg){
    new Noty({
         text: msg,
         layout: 'topCenter',
         type: 'information',
         theme:'mint'
        }).show();
}
