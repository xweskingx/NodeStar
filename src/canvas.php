<!DOCTYPE html>
<html>
<head>
<title>NodeStar</title>
<meta charset="utf-8">
<script src="//d3js.org/d3.v3.min.js"></script>


</head>

<body>

<svg width="800" height="800">
</svg>
    <script src="js/util.js"></script>
    <script src="js/inLink.js"></script>
    <script src="js/neuralNode.js"></script>
    <script src="js/layer.js"></script>
    <script>var l = new layer(4,"test","Test");
        l.generate(d3.select("svg"));</script>
</body>

</html>