/**
 * Constructor for Layer.  It takes the broken up JSON and turns it into an object representation
 * for each Layer in the schema.
 * id -> layer id, unique to the layer in the schema
 * name -> layer name, unique to layer type
 * data_type -> the data type the layer uses
 * input_dims -> the input dimensions, i.e. number of connections into the Layer (from the left)
 * output_dims -> the output dimensions, i.e. the number of connections out of the layer (to the right)
 * inputs -> an array of identifiers for the layers (ids) connecting to the layer
 * outputs -> an array of identifiers for the layers (ids) the layer is connecting to
 * coords -> the last x,y coordinates of the layer in the schema
 */
function Layer(id, name, data_type, input_dims, output_dims, inputs, outputs, coords){
    this.id = id;
    this.name = name;
    this.data_type = data_type;
    this.input_dims = input_dims;
    this.output_dims = output_dims;
    this.inputs = inputs;
    this.outputs = outputs;
    this.coords = coords;
}

Layer.prototype.generateLayer = function(graph){
    
}