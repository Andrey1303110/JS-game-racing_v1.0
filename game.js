var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

function Resize()
{
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
}

Resize();