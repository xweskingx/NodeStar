function initCanvas(){
    
    $('#canvasHolder').flowchart({
        multipleLinksOnOutput:true,
        multipleLinksOnInput:true
    });
    
    $('#delbutton').click(function(){
        deleteLink();
    })
    
    
}

function deleteLink(){
    $('#canvasHolder').flowchart('deleteSelected');
}


   