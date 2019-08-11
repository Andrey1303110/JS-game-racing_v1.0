var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

Resize();

window.addEventListener("resize", Resize);
canvas.addEventListener("contextmenu", function (e) { e.preventDefault(); return false; });

window.addEventListener("keydown", function (e) { KeyDown(e); });

var objects = [];

function Update()
{


	Draw();
}

function Draw()
{
	ctx.clearRect(0, 0, canvas.width, canvas.height);


}

function Control()
{

}

function KeyDown(e)
{
	switch(e.keyCode)
	{
		case 37: //Лево
			break;

		case 39: //Право
			break;

		case 38: //Вверх
			break;

		case 40: //Вниз
			break;
	}
}

function Resize()
{
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
}