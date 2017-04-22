function LayerList(startLayer, endLayer){
    this.start = startLayer;
    this.end = endLayer;
    this.count = 2;
}

LayerList.prototype.matchLayerByID = function(id){
    var found = false;
    var counter = 1;
    var current = this.start;
    while(found == false && counter < this.count){
        if(current.id == id){
            return current;
        }else if (current.output_layer == null){
            return null;
        }else{
            current = current.output_layer;
        }
    }
}

LayerList.prototype.addConnection = function(id, nextLayer){
    var layer = fetchProperLayer(id);
    if(layer == null){
        if(id == "startOP"){
            layer = this.start;
        }else if(id == "endOP"){
            layer = this.end;
        }
    }
    if(layer != null){
        if(nextLayer == "endOP"){
            layer.output_layer = this.end;
            this.end.input_layer = layer;
        }else{
            var fetched = fetchProperLayer(nextLayer);
            layer.output_layer = fetched;
            fetched.input_layer = layer;
            this.count++;
        }
    }
}

LayerList.prototype.purgeLayer = function(id){
    var layer = this.matchLayerByID(id);
    var pre = layer.input_layer;
    var post = layer.output_layer;
    if(pre != null){
        pre.output_layer = null;
        pre.outputs = [];
    }
    if(post != null){
        post.input_layer = null;
        post.inputs = [];
    }
    
    this.count--;
}

LayerList.prototype.JSONorDIE = function(){
    var current = this.start;
    var network = [];
    if(this.start.output_layer == null || this.end.input_layer == null){
        return "startEndFail";
    }
    else{
        while(true){
        network.push(current.name);
        if(current.output_layer == null){
             if(current == this.end){ return network;}
             return "connectFail";
        }else{
            current = current.output_layer;
        }
    }
    }
}