function layer(nodeCount, type, alias, cluster){
    this.nodeCount = nodeCount;
    this.nodes = [];
    fillNodes(this.nodes, nodeCount, type, cluster);
    this.connections = [];
    this.inLinks = [];
    prepareLinks(this.inLinks, this.nodes);
    this.type = type;
    this.title = alias + " layer";
}

/*layer.prototype.generate= function (svg){
    var circles = svg.selectAll("circle").data(this.nodes)
    .enter().append("circle");
    console.log("In circles");
    console.log(circles);
    
    var colorCircles = circles.attr("cx",
    function(d){
        console.log("setting the x");
        return d.xval;
    }).attr("cy",function(d){
        return d.yval;
    }).attr("r",20).style("fill",function(d){
        return d.color;
    });
    
    console.log(colorCircles);
}*/

layer.prototype.generate= function (svg){
    
    console.log(this.inLinks);
    console.log("updates...");
    console.log(this.nodes);
    
    var force = d3.layout.force()
    .size([400, 400])
    .gravity(0.2)
    .nodes(this.nodes)
    .links(this.inLinks)
    .linkDistance(50);
    
    var  links = svg.selectAll('.link')
        .data(this.inLinks)
        .enter().append('line')
        .attr('class', 'link');
   
    
  var node = svg.selectAll('.node').data(this.nodes)
  .enter().append("circle")
  .attr('class','node')
  .attr('r',20)
  .attr('cx', function(d){
      return d.xval;
  })
  .attr('cy',function(d){
      return d.yval;
  })
  .style("fill",function(d){
      return d.color;
  }).call(force.drag);
  
  links.each(function(d){
        if (d.className) {
            d3.select(this).classed(d.className, true)
        }
    });
    
    

    
    
  
   
  
   force.on("tick", function() {

               node.attr("cx", function(d) { return d.x; })
                    .attr("cy", function(d) { return d.y; })
               });
  
  
  force.start();

   //nodes.enter().insert("circle").attr("r",20);
    
    
}