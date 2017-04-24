/**
 * Constructor for Layer.  It takes the broken up JSON and turns it into an object representation
 * for each Layer in the schema.
 * name -> the layer's name, unique to each layer type
 * id -> the layer id, unique to each flowchart element
 * inpd -> input dimensions
 * outd -> output dimensions
 * in_data and out_data -> the input and output data types
 */
function Layer(name, id, inpd, outd, in_data, out_data){
    this.id = id;
    this.name = name;
    this.input_layer = null;
    this.output_layer = null;
    this.input_dimensions = inpd;
    this.output_dimensions = outd;
    this.input_count = 0;
    this.output_count = 0;
    this.in_data = in_data;
    this.out_data = out_data;
    
}


Layer.prototype.toSchemaData = function(){
    var data = {};
    data[this.name]={"input_dims": this.input_dimensions, "output_dims":this.output_dimensions,
        "input_type":this.in_data, "output_type":this.out_data
    };
    return data;
}


Layer.prototype.updateNeighbors = function(){
    var pre = this.input_layer;
    var post = this.output_layer;
    var data = $('#canvasHolder').flowchart('getData');
    var links = data['links'];
    var inLinks = findAttachedLinks(links, pre.id,this.id);
    var outLinks = findAttachedLinks(links, this.id,post.id);
    
    if(inLinks == 0){
        pre.output_count = 0;
        pre.output_layer = null;
        this.input_count = 0;
        this.input_layer = null;
    }else{
        pre.output_count = inLinks;
        pre.output_layer = this;
    }
    if(outLinks == 0){
        this.output_count = 0;
        this.output_layer = null;
        post.input_count = 0;
        post.input_layer = null;
    }else{
        post.input_count = outLinks;
        post.input_layer = this;
    }
   
}
