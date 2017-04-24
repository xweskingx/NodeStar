var currentLayers = [];
var theLayerList;

function initCanvas(){
    
    $('#canvasHolder').flowchart({
        multipleLinksOnOutput:true,
        multipleLinksOnInput:true,
        onLinkCreate: function(linkId, linkData) {
            theLayerList.addConnection(linkData['fromOperator'], linkData['toOperator']);
            return true;
      },
      onOperatorDelete: function(operatorId) {
        theLayerList.purgeLayer(operatorId);
        return true;
      },
      onLinkDelete: function(linkId, forced) {
        var linkData = $('#canvasHolder').flowchart('getData')['links'][linkId];
        theLayerList.disconnect(linkData['fromOperator'], linkData['toOperator']);
        return true;
      }
    });
     $('#delbutton').click(function(){
        deleteLink();
    });
    
    $('#editButton').click(function(){
        editLayer();
    });
    
    
}

function initStartEnd(){
     

     $('#canvasHolder').flowchart('createOperator',"startOP", makeData("start", 0, 1, 0,100)["operators"]["operator1"]);
     $('#canvasHolder').flowchart('createOperator',"endOP", makeData("end", 1, 0, 200, 100)["operators"]["operator1"]);
     
     var start = new Layer("start", "startOP", 0, 1, null, null);
     var end = new Layer("end", "endOP", 1, 0, null, null);
     theLayerList = new LayerList(start,end);
    
  
}



function fetchProperLayer(selectedID){
    if(selectedID == "startOP"){
        return theLayerList.start; //TODO return a start item
    }
    else if(selectedID == "endOP"){
        return theLayerList.end; //TODO return an end item
    }
    for(var i = 0; i < currentLayers.length; i++){
        if(currentLayers[i].id == selectedID){
            return currentLayers[i];   
        }
    }
}

function removeFromLayers(selectedID){
    for(var i = 0; i < currentLayers.length; i++){
        if(currentLayers[i].id == selectedID){
            currentLayers.splice(i,1);
            break;
        }
    }
}
function deleteLink(){
    var selectedID = $('#canvasHolder').flowchart('getSelectedOperatorId');
    if(selectedID != "startOP" && selectedID != "endOP"){
   
     $('#canvasHolder').flowchart('deleteSelected');
    }
}

function editLayer(){
     var selectedID = $('#canvasHolder').flowchart('getSelectedOperatorId');
     var layer = fetchProperLayer(selectedID);
    if(selectedID != "startOP" && selectedID != "endOP" && selectedID != null){
        
   
        var layerMessage = layerMessageMaker(layer.input_dimensions, layer.output_dimensions, 
        layer.in_data, layer.out_data);
        
        var dialog = bootbox.dialog({
            title: 'Edit layer ' + selectedID,
            message: layerMessage
        });
        
        $('#confirmLayer').click(function(){
              var result = updateLayer(layer);
              if(result != null){
                dialog.modal('hide');
              }
        });
         $('#cancelLayer').click(function(){
              dialog.modal('hide');
        });
     
    }
}

function updateLayer(layer){
    var newin = $('#lmm_idim').val();
    var newout = $('#lmm_odim').val();
    var newid = $('#lmm_idt').val();
    var newod = $('#lmm_odt').val();
    if(newin == "" || newout == "" || newin == '0' || newout == '0'){
        makeInfoNoty("Please ensure the dimensions are not 0");
        return null;
    }
    if(newid == "" || newod == ""){
        makeInfoNoty("Please ensure the data types are not blank");
        return null;
    }
    
    layer.input_dimensions = newin;
    layer.output_dimensions = newout;
    layer.in_data = newid;
    layer.out_data = newod;
    
    var olddata = $('#canvasHolder').flowchart('getOperatorData',layer.id);
    

    var newdata = makeData(layer.layer_type, layer.input_dimensions, layer.output_dimensions, 
    olddata['left'], olddata['top'])['operators']['operator1'];
    newdata['properties']['title'] = layer.name; 
    
    $('#canvasHolder').flowchart('setOperatorData', layer.id, newdata);
    
    currentLayers.push(layer);
    layer.updateNeighbors();
    
    return 'success';
}

function layerMessageMaker(ins, outs, in_data, out_data){
    var message = "Input dimensions: ";
    message += "<input id='lmm_idim' value='" + ins + "' />";
    message += " Output dimensions: ";
    message += "<input id='lmm_odim' value='" + outs + "' />";
    message += "<br/>";
    message += "<br/>";
    message += "Input data type: &nbsp &nbsp";
    message += "<input id='lmm_idt' value='" + in_data + "' />";
    message += " Output data type: &nbsp &nbsp";
    message += "<input id='lmm_odt' value='" + out_data + "' />";
    message+= "<br/>";
    message+= "<br/>";
    message += "<button id='confirmLayer'>Confirm</button>";
    message += "&nbsp &nbsp";
    message += "<button id='cancelLayer'>Cancel</button>"
    return message;
}

function findAttachedLinks(links, inID, outID){
    var count = 0;
    if(links == {}){
        return 0;
    }
  var keys = Object.keys(links);
    for(var i = 0; i < keys.length; i++){
        var link = links[keys[i]];
        if(link['fromOperator'] == inID && link['toOperator'] == outID){
            count++;
        }
    }
    
    return count;
}

   