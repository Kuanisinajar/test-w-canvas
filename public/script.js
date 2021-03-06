// socket shit
var socket = io();
socket.on('new user', function(msg){
	var obj = JSON.parse(msg);
	for (i=0; i < obj.length; i++){
		var circle = new stampIt(obj[i].mouseX * canvas.width, obj[i].mouseY * canvas.height, obj[i].which);
		circle.draw();
	}
});
socket.on('new circle', function(msg){
	var obj = JSON.parse(msg);
	var circle = new stampIt(obj.mouseX * canvas.width, obj.mouseY * canvas.height, obj.which);
	circle.draw();
})
window.addEventListener('orientationchange', function(){
	location.reload();
});
window.addEventListener('resize', function(){
	location.reload();
});
//canvas shit
var canvas = document.querySelector('canvas');
canvas.width = window.innerHeight * 1.9;
canvas.height = window.innerHeight;
var c = canvas.getContext('2d');
var pastCircle = [];
document.getElementById('canvas-wrapper').addEventListener('click', function(event){
	var proportionX = event.pageX / canvas.width;
	var proportionY = event.pageY / canvas.height;
	var circle = new stampIt(proportionX * canvas.width, proportionY * canvas.height, whichStamp);
	circle.draw();
	var record = {
		"mouseX": proportionX,
		"mouseY": proportionY,
		"which": whichStamp
	}
	pastCircle.push(record);
	socket.emit('new circle', JSON.stringify(record));
})
/* when radius=30, css=60px=8vh */
var radius = canvas.height/100*4;
var padding = radius/4;
var stampIt = function(x, y, z){
	this.x = x;
	this.y = y;
	this.draw = function(){
		if (z){
			c.beginPath();
			c.arc(x, y, radius, 0, Math.PI*2, false)
			c.strokeStyle = 'black';
			c.stroke();
			c.fillStyle = 'rgba(255, 255, 255, 0.7)';
			c.fill();
			c.fillStyle = 'black';
			c.textBaseline = 'middle';
			c.textAlign = 'center';
			c.font = 0.4*radius + "px helvetica";
			c.fillText('so', x, y-padding);
			c.fillText('true', x, y+padding);
		} else {
			c.beginPath();
			c.arc(x, y, radius, 0, Math.PI*2, false)
			c.strokeStyle = 'black';
			c.stroke();
			c.fillStyle = 'rgba(255, 255, 255, 0.7)';
			c.fill();
			c.fillStyle = 'black';
			c.textBaseline = 'middle';
			c.textAlign = 'center';
			c.font = 0.4*radius + "px helvetica";
			c.fillText('nah', x, y);
		}
	}
}


// for admin

var clear = function(int){
	socket.emit('clear json', int);
};