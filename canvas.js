var flowers = [{
    color:'#fd97ad',
    radius:80,
    variable:600,
    amount:12
},{
    color:'#e165a8',
    radius:60,
    variable:720,
    amount:18
},{
    color:'#efc2ab',
    radius:40,
    variable:800,
    amount:9
}];
var bgCanvas = document.getElementById('backgroundCanvas');
var bgContext = bgCanvas.getContext('2d');
  

function drawRandomFlowers($flowerarray){
    let startx = 160;
    let starty = 160;
    bgCanvas.setAttribute("width", document.body.offsetWidth > 0 ? window.innerWidth : 1000);
    bgCanvas.setAttribute("height", document.body.offsetHeight > 0 ? window.innerHeight : 800);

    $flowerarray.forEach((flower)=>{
        this.randomFlowers(bgContext, flower.variable, flower.amount, flower.color, flower.radius, startx, starty);
    });
}

function randomFlowers($ctx, $variableamt, $amount, $color, $radius, $x, $y){
    let variableamt = $variableamt || 120;
    let amount = $amount || 10;

    let xdist = (window.innerWidth*1.1)/amount;
    let ydist = (window.innerHeight*2.5)/amount;

    for (var y=0; y<amount; y++){
        let inc = Math.sin(y/amount);

        let curY = (inc*y)*ydist;
        let curX = ((inc)*y)*xdist;

        let xpos = curX + getRandomNum(variableamt);
        let ypos = curY + getRandomNum(variableamt);

        let rad = $radius+getRandomNum(20);
        this.watercolorFlower($ctx, xpos, ypos, rad, $color);
    }
}

function watercolorFlower($ctx, $startx, $starty, $radius, $color){
    //arcTo(x1, y1, x2, y2, radius)
    //arc(x, y, radius, startAngle, endAngle, anticlockwise)
    let thickness=1.4;
    let amt = 30;
    let ringamt = 4.5;
    let angleincrement = 360 / ringamt;
    let opacity = 10;
    let radius = $radius;
    let radiusincrement = radius/amt;
    $ctx.fillStyle = $color;        
    for(var i=0;i<amt;i++){
        let newangle = i*angleincrement;
        let startAngle = newangle;
        let midAngle = startAngle+90;
        let endAngle = startAngle+180;
        $ctx.beginPath();
        let originPoints = findPointOnCircle($startx, $starty, radius, midAngle);
        this.arcPetal($ctx, originPoints.x, originPoints.y, radius, startAngle, endAngle, thickness);
        $ctx.filter = `opacity(${opacity}%)`;
        $ctx.fill();  
        $ctx.closePath();
        radius -= radiusincrement;
        opacity += 5;
    }
    opacity = 20;
    let decrement = $radius/4;
    let layerradius = $radius;
    for(var l=0;l<4;l++){
        $ctx.beginPath();
        $ctx.arc($startx, $starty, layerradius, 0, Math.PI * 2);
        $ctx.filter = `opacity(${opacity}%)`;
        $ctx.fill();  
        $ctx.closePath();
        opacity += 10;   
        layerradius -= decrement;    
    }
}

function arcPetal($ctx, $xOrigin, $yOrigin, $radius, $startAngle, $endAngle, $petalWidth){
    let petalradius = $radius;
    let startPoints = findPointOnCircle($xOrigin,$yOrigin,petalradius,$startAngle);
    let endPoints = findPointOnCircle($xOrigin,$yOrigin,petalradius,$endAngle);

    let cp1Points = findPointOnCircle($xOrigin,$yOrigin,petalradius,$startAngle+35);
    let cp2Points = findPointOnCircle($xOrigin,$yOrigin,petalradius,$endAngle-35);

    let cpb1Points = findPointOnCircle($xOrigin,$yOrigin,petalradius*$petalWidth,$startAngle+50);
    let cpb2Points = findPointOnCircle($xOrigin,$yOrigin,petalradius*$petalWidth,$endAngle-50);
    $ctx.moveTo(startPoints.x, startPoints.y);
    $ctx.bezierCurveTo(cp1Points.x, cp1Points.y, cp2Points.x, cp2Points.y, endPoints.x, endPoints.y);
    $ctx.bezierCurveTo(cpb2Points.x, cpb2Points.y, cpb1Points.x, cpb1Points.y, startPoints.x, startPoints.y);
}

function getRandomNum($variable){
    return Math.round((Math.random() * $variable) - (Math.random() * $variable));
}

function radians($degrees){
    return ($degrees * Math.PI)/ 180;
}
// Given the origin point of the circle, its radius and the angle in Radians (degrees * Math.PI / 180)
// it returns the a point object showing the x,y coordinates of the point on a circle.

function findPointOnCircle(originX, originY , radius, degrees) {
    let angleRadians =  radians(degrees);
    var newX = radius * Math.cos(angleRadians) + originX
    var newY = radius * Math.sin(angleRadians) + originY

    return {"x" : newX, "y" : newY}
}
drawRandomFlowers(flowers);