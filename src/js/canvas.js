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
        return true;
      }
    });
     $('#delbutton').click(function(){
        deleteLink();
    })
    
    
}

function initStartEnd(){
     

     $('#canvasHolder').flowchart('createOperator',"startOP", makeData("start", 0, 1, 0,100)["operators"]["operator1"]);
     $('#canvasHolder').flowchart('createOperator',"endOP", makeData("end", 1, 0, 200, 100)["operators"]["operator1"]);
     
     var start = new Layer("start", "startOP");
     var end = new Layer("end", "endOP");
     theLayerList = new LayerList(start,end);
    
  
}



//TO-DO, Dry this maybe since the only difference is the in loop operation?
function fetchProperLayer(selectedID){
    if(selectedID == "startOP"){
        return null; //TODO return a start item
    }
    else if(selectedID == "endOP"){
        return null; //TODO return an end item
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
     removeFromLayers(selectedID);
     $('#canvasHolder').flowchart('deleteSelected');
    }
}


   