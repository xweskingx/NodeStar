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
    if(layer != null){
        if(nextLayer == "endOP"){
            if(layer.output_layer == null){
                layer.output_layer = this.end;
                
            }
            this.end.input_layer = layer;
            this.end.input_layer.input_count++;
            layer.output_count++;
        }else{
            var fetched = fetchProperLayer(nextLayer);
            if(layer.output_layer == null){
                layer.output_layer = fetched;
                fetched.input_layer = layer;
                 this.count++;
            }
            fetched.input_count++;
            layer.output_count++;
           
        }
    }
}

LayerList.prototype.disconnect = function(from, to){
    fl = fetchProperLayer(from);
    tl = fetchProperLayer(to);
    
    if(from == 'startOP'){
        fl = this.start;
    }
    if(to == 'endOP'){
        tl = this.end;
    }
    if(fl == null || tl == null){
        return;
    }
    if(fl.output_count == 1){
        var temp = fl.output_layer;
        fl.output_layer = null;
        tl.input_layer = null;
    }
    if(fl.output_count != 0){
        fl.output_count--;
        tl.input_layer--;
    }
}

LayerList.prototype.purgeLayer = function(id){
    var layer = fetchProperLayer(id);
    var pre = layer.input_layer;
    var post = layer.output_layer;
    if(pre != null){
        pre.output_layer = null;
        pre.output_count = 0;
        pre.outputs = [];
    }
    if(post != null){
        post.input_layer = null;
        post.input_count = 0;
        post.inputs = [];
    }
    removeFromLayers(id);
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
            var schemadata = current.toSchemaData();
        network.push(schemadata);
        if(current.output_layer == null){
             if(current == this.end){ return network;}
             return "connectFail";
        }else{
            current = current.output_layer;
        }
    }
    }
}

LayerList.prototype.loadOldData = function(oldData){
    this.start = fetchProperLayer(oldData['start'].id);
    this.end = fetchProperLayer(oldData['end'].id);
    this.current = oldData['current'];
}