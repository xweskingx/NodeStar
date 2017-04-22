/**
 * Constructor for Layer.  It takes the broken up JSON and turns it into an object representation
 * for each Layer in the schema.
 * name -> the layer's name, unique to each layer type
 * id -> the layer id, unique to each flowchart element
 */
function Layer(name, id){
    this.id = id;
    this.name = name;
    this.input_layer = null;
    this.output_layer = null;
    this.inputs = [];
    this.outputs = [];
    this.in_data = 'string';
    this.out_data = 'string';
    
}
