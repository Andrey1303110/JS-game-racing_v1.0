var canvas = document.getElementById("canvas"); //Получение холста из DOM
var ctx = canvas.getContext("2d"); //Получение контекста — через него можно работать с холстом

Resize(); // При загрузке страницы задаётся размер холста

window.addEventListener("resize", Resize); //При изменении размеров окна будут менять размеры холста

//Запрет на вызов контекстного меню
//Он нужен для того, чтобы при долгом нажатии на хост с мобильных устройств, не вылезало меню и не мешало играть
canvas.addEventListener("contextmenu", function (e) { e.preventDefault(); return false; }); 

window.addEventListener("keydown", function (e) { KeyDown(e); }); //Получение нажатий с клавиатуры

var objects = []; //Массив игровых объектов

var player = null; //объект, которым управляет игрок

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
	Draw();
}

function Draw() //Работа с графикой
{
	ctx.clearRect(0, 0, canvas.width, canvas.height); //Очиста холста от предыдущего кадра
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
		//logic
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