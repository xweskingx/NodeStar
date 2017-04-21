function LayerType(libData){
    this.layer_type = libData["layer_type"];
    this.default_in = libData["default_in"];
    this.default_out = libData["default_out"];
    this.data_type = libData["data_type"];
    this.layerData = "";
}

LayerType.prototype.toFlowchartData = function(){

    return makeData(this.layer_type, this.default_in, this.default_out, 0,0);
    
}

LayerType.prototype.appendToLibary = function(lib, id, idn){
    var lib = $('#'+lib);
  var location = lib.append('<li class="list-group-item liblist"><div class="libflow" id='+id+'></div>'+
  '<button class="libButton" id="al'+idn+'">Add Layer</button></li>');

  var layerData = this.toFlowchartData();


  //This code sets up a default flowchart operator to represent the
  //layer
  //TO-DO Abstract out flowchart settings maybe?
  $('#'+id).flowchart({
  canUserEditLinks: false,
  canUserMoveOperators: false,
  data: layerData,
  distanceFromArrow: 3,
  defaultOperatorClass: 'flowchart-default-operator',
  defaultLinkColor: '#3366ff',
  defaultSelectedLinkColor: 'black',
  linkWidth: 10,
  grid: 20,
  multipleLinksOnOutput: false,
  multipleLinksOnInput: false,
  linkVerticalDecal: 0,
  onOperatorSelect: function (operatorId) {
      return true;
  },
  onOperatorUnselect: function () {
      return true;
  },
  onOperatorMouseOver: function (operatorId) {
      return true;
  },
  onOperatorMouseOut: function (operatorId) {
      return true;
  },
  onLinkSelect: function (linkId) {
      return true;
  },
  onLinkUnselect: function () {
      return true;
  },
  onOperatorCreate: function (operatorId, operatorData, fullElement) {
      return true;
  },
  onLinkCreate: function (linkId, linkData) {
      return true;
  },
  onOperatorDelete: function (operatorId) {
      return true;
  },
  onLinkDelete: function (linkId, forced) {
      return true;
  },
  onOperatorMoved: function (operatorId, position) {

  },
  onAfterChange: function (changeType) {

  }

});



}
