function fillNodes(nodes, nodeCount, type){
    var color = "";
    if(type == "test"){
        color = "#7e58dd";
    }
    var x = 50;
    var y = 50;
    for(var i = 0; i < nodeCount; i++){
        nodes.push(new neuralNode(color, x, y));
        x+=30;
        y+=30;
    }
    
}

function prepareLinks(links, nodes){
    var n = 0;
  /*  for(node in nodes){
           links.push(JSON.stringify(new inLink(n, node)));
       }*/
       
      links.push(new inLink(0,1));
      links.push(new inLink(1,2));
      links.push(new inLink(2,3));
      links.push(new inLink(3,0));
    
}

