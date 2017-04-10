<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>NodeStar</title>
    <link rel="stylesheet" href="css/bootstrap.min.css">
    <link rel="stylesheet" href="css/Navigation-Clean1.css">
    <link rel="stylesheet" href="css/mainstyles.css">
    <link href="jquery_flowchart/jquery.flowchart.css" rel="stylesheet">
</head>

<body>
    <div style="background-color:rgba(109,49,49,0);">
        <nav class="navbar navbar-default navbar-fixed-top navigation-clean" style="background-color:rgb(33,29,59);">
            <div class="container">
                <div class="navbar-header">
                    <a class="navbar-brand navbar-link" href="#" style="background-color:rgba(244,244,244,0);background-size:auto;height:100px;"> <img src="img/NS.png">Nodestar</a>
                    <button class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navcol-1"><span class="sr-only">Toggle navigation</span><span class="icon-bar"></span><span class="icon-bar"></span><span class="icon-bar"></span></button>
                </div>
                <div class="collapse navbar-collapse" id="navcol-1">
                    <ul class="nav navbar-nav navbar-right" style="margin-top:30px;">
                        <li class="dropdown" style="height:50px;"><a class="dropdown-toggle" data-toggle="dropdown" aria-expanded="false" href="#">Schema<span class="caret"></span></a>
                            <ul class="dropdown-menu" role="menu">
                                <li role="presentation"><a href="#">Download Schema</a></li>
                                <li class="divider" role="presentation"></li>
                                <li role="presentation"><a href="#">Save Schema</a></li>
                                <li role="presentation"><a href="#">Load Schema</a></li>
                            </ul>
                        </li>
                        <li class="dropdown"><a class="dropdown-toggle" data-toggle="dropdown" aria-expanded="false" href="#">Account <span class="caret"></span></a>
                            <ul class="dropdown-menu" role="menu">
                                <li role="presentation"><a href="#">Account Details</a></li>
                                <li role="presentation"><a href="#">Logout </a></li>
                            </ul>
                        </li>
                    </ul>
                    <p class="navbar-text"></p>
                </div>
            </div>
        </nav>
    </div>
    <div style="margin-top:125px;">
        <div class="library panel panel-default">
            <div class="panel-heading">
                <h3 class="panel-title">Layer Library</h3></div>
            <div class="tab-pane">
            <ul class="list-group" id="libraryList">
              
            </ul>
            </div>
        </div>
           <button class="canvasDel" id="delbutton">Delete Selection</button>
          <div class="canvas well" id="canvasHolder">
           
          </div>
       
    </div>
    <script src="js/jquery.min.js"></script>
    <script src="js/jquery-ui.min.js"></script>
    <script src="jquery_flowchart/jquery.flowchart.min.js"></script>
    <script src="js/bootstrap.min.js"></script>
    <script src="js/layerType.js"></script>
    <script src="js/layer.js"></script>
    <script src="js/loadLibrary.js"></script>
    <script src="js/canvas.js"></script>
    
    <script>
        $(document).ready(function(){loadLibrary("libraryList");
            initCanvas();
          
        });
    </script>
</body>

</html>