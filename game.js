class Road
{
	constructor(image, y)
	{
		this.x = 0;
		this.y = y;
		this.loaded = false;

		this.image = new Image();
		
		var obj = this;

		this.image.addEventListener("load", function () { obj.loaded = true; });

		this.image.src = image;
	}

	Update(road)
	{
		this.y += speed;

		if(this.y > window.innerHeight)
		{
			this.y = road.y - this.image.height + speed;
		}
	}
}

class Car
{
	constructor(image, x, y)
	{
		this.x = x;
		this.y = y;
		this.loaded = false;

		this.image = new Image();

		var obj = this;

		this.image.addEventListener("load", function () { obj.loaded = true; });

		this.image.src = image;
	}
}


var canvas = document.getElementById("canvas"); //Получение холста из DOM
var ctx = canvas.getContext("2d"); //Получение контекста — через него можно работать с холстом

Resize(); // При загрузке страницы задаётся размер холста

window.addEventListener("resize", Resize); //При изменении размеров окна будут менять размеры холста

//Запрет на вызов контекстного меню
//Он нужен для того, чтобы при долгом нажатии на хост с мобильных устройств, не вылезало меню и не мешало играть
canvas.addEventListener("contextmenu", function (e) { e.preventDefault(); return false; }); 

window.addEventListener("keydown", function (e) { KeyDown(e); }); //Получение нажатий с клавиатуры

var objects = []; //Массив игровых объектов
var roads = 
[
	new Road("images/road.jpg", 0),
	new Road("images/road.jpg", 626)
]; //Массив с фонами

var player = null; //объект, которым управляет игрок


var speed = 5;


function Start()
{
	timer = setInterval(Update, 1000 / 60); //Состояние игры будет обновляться 60 раз в секунду — при такой частоте обновление происходящее будет казаться очень плавным

}

function Stop()
{
	clearInterval(timer); //Остановка обновления
}

function Update() //Обновление игры
{
	roads[0].Update(roads[1]);
	roads[1].Update(roads[0]);

	Draw();
}

function Draw() //Работа с графикой
{
	ctx.clearRect(0, 0, canvas.width, canvas.height); //Очиста холста от предыдущего кадра

	for(var i = 0; i < roads.length; i++)
	{
		ctx.drawImage
		(
			roads[i].image,
			0,
			0,
			roads[i].image.width,
			roads[i].image.height,
			roads[i].x,
			roads[i].y,
			canvas.width,
			canvas.width
		);
	}
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

		case 27: //Вниз
			break;
	}
}

function Resize()
{
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
}

Start();