var currentLayers = [];

function initCanvas(){
    
    $('#canvasHolder').flowchart({
        multipleLinksOnOutput:true,
        multipleLinksOnInput:true
    });
    
    $('#delbutton').click(function(){
        deleteLink();
    })
    
    
}

//TO-DO, Dry this maybe since the only difference is the in loop operation?
function fetchProperLayer(selectedID){
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
    removeFromLayers(selectedID);
    $('#canvasHolder').flowchart('deleteSelected');
}


   