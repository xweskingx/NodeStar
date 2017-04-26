var layerTypes = [];
var layerTypeStyles = {};

var idc = 0;


function getStyleData(name){
    return layerTypeStyles[name];
}

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
        stylize();

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
            console.log( $('#canvasHolder').flowchart('getOperatorData',operatorID));

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
  var schemaName = getSchemaName(".py");
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

function save_schema_db() {
    var layer_json = generateMiddlewareJSON();
    console.log(layer_json);

    if(!layer_json) return null;

    var name           = getSchemaName("");
    layer_json['name'] = name;

    if(name) {
        $.ajax({
            type     : 'post',
            url      : 'NodeStar/SaveSchema.php',
            data     : layer_json,
            complete : function(res) {
                $('#output').html('Schema saved to database!');
            },
            error : function() {
                $('output').html('Error saving schema!');
            }
        })
    }

    return false;
}

function getSchemaName(extension){
    var name = $('#schemaNameBox').val().trim();
    if(name == ""){
        makeInfoNoty('Please name your schema before downloading');
        return null;
    }
    return name + extension;

}

function makeData(layer_type,ind,outd,left,top){
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
window.location.href = 'http://' + window.location.hostname + '/logout.php';
});

function makeInfoNoty(msg){
    new Noty({
         text: msg,
         layout: 'topCenter',
         type: 'information',
         theme:'mint'
        }).show();
}

function saveNSJSTo(destination){


        var nsjs = generateNodeStarJSON();
        var name = nsjs['name'];
        if(name != null){
            name += ".json";
            if(destination == 'file'){
                console.log(nsjs);
                var blob = new Blob([CircularJSON.stringify(nsjs)], {type: "text/plain;charset=utf-8"});
                saveAs(blob, name);
            }

        }
}

function loadNSJSFrom(destination){
    if(destination == 'file'){
        var file = $('#lsff')['0']['files'][0];
        var reader = new FileReader();
        reader.onload = function(e){
            var result = e.target.result;
            var nsjs = CircularJSON.parse(result);
            console.log(nsjs);
            //Set the values
            currentLayers = [];
            reloadLayerData(nsjs['layers']);
            theLayerList.loadOldData(nsjs['layerList']);
            $('#canvasHolder').flowchart('setData',nsjs['flowchart']);
            $('#schemaNameBox').val(nsjs['name']);
        };
        reader.readAsText(file);

    }
}

function reloadLayerData(oldLayers){

    for(var i = 0; i < oldLayers.length; i++){
        var layer = new Layer(oldLayers[i].name, oldLayers[i].id, oldLayers[i].input_dimensions,
        oldLayers[i].output_dimensions,oldLayers[i].in_data, oldLayers[i].out_data);
        layer.input_count = oldLayers[i].input_count;
        layer.output_count = oldLayers[i].output_count;
        if(oldLayers[i].input_layer != null){
            layer.input_layer = oldLayers[i].input_layer.id;
        }
        if(oldLayers[i].output_layer != null){
            layer.output_layer = oldLayers[i].output_layer.id;
        }
        currentLayers.push(layer);
    }
    console.log(currentLayers);
    for(var j = 0; j < currentLayers.length; j++){
        var cur = currentLayers[j];
        var pre = fetchProperLayer(cur.input_layer);
        var post = fetchProperLayer(cur.output_layer);
        cur.input_layer = pre;
        cur.output_layer = post;
    }
}


function generateNodeStarJSON(){
    var nsjs = {};
    nsjs["layers"] = currentLayers;
    nsjs["layerList"] = theLayerList;
    nsjs["flowchart"] = $('#canvasHolder').flowchart("getData");
    nsjs["name"] = getSchemaName("");
    return nsjs;
}

function getLinkColor(id){
    id = id+"";
    var name = id.replace(/[0-9]/g, '');
    var style = getStyleData(name);
    if(style != null){
        return style['link_color'];
    }
    else{
        return 'blue';
    }
}
