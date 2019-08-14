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
		this.y += speed; //При обновлении изображение смещается вниз

		if(this.y > window.innerHeight) //Если изображение ушло за край игры, то меняем положение
		{
			this.y = road.y - this.image.height + speed; //Новое положение указывается с учётом второго фона
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

	Update()
	{
		this.y += speed;
	}

	Move(v, d) 
	{
		if(v == "x") //Перемещение по оси X
		{
			this.x += d; //Смещение

			//Если при смещении объект выходит за края холста, то изменения откатываются
			if(this.x + this.image.width * scale > canvas.width)
			{
				this.x -= d; 
			}
	
			if(this.x < 0)
			{
				this.x = 0;
			}
		}
		else //Перемещение по оси Y
		{
			this.y += d;

			if(this.y + this.image.height * scale > canvas.height)
			{
				this.y -= d;
			}

			if(this.y < 0)
			{
				this.y = 0;
			}
		}
		
	}
}


var canvas = document.getElementById("canvas"); //Получение холста из DOM
var ctx = canvas.getContext("2d"); //Получение контекста — через него можно работать с холстом

var scale = 0.1; //Масштаб машин

Resize(); // При загрузке страницы задаётся размер холста

window.addEventListener("resize", Resize); //При изменении размеров окна будут менять размеры холста

//Запрет на вызов контекстного меню
//Он нужен для того, чтобы при долгом нажатии на хост с мобильных устройств, не вылезало меню и не мешало играть
canvas.addEventListener("contextmenu", function (e) { e.preventDefault(); return false; }); 

window.addEventListener("keydown", function (e) { KeyDown(e); }); //Получение нажатий с клавиатуры

var objects = 
[
	new Car("images/car.png", 15, 10)
]; //Массив игровых объектов
var roads = 
[
	new Road("images/road.jpg", 0),
	new Road("images/road.jpg", 626)
]; //Массив с фонами

var player = 0; //объект, которым управляет игрок


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
			roads[i].image, //Изображение для отрисовки
			0, //Начальное положение по оси X на изображении
			0, //Начальное положение по оси Y на изображении
			roads[i].image.width, //Ширина изображения
			roads[i].image.height, //Высота изображение
			roads[i].x, //Положение по оси X на холсте
			roads[i].y, //Положение по оси Y на холсте
			canvas.width, //Ширина изображения на холсте
			canvas.width //Так как ширина и высота фона одинаковые, в качестве высоты указывается ширина
		);
	}

	for(var i = 0; i < objects.length; i++)
	{
		ctx.drawImage
		(
			objects[i].image, //Изображение для отрисовки
			0, //Начальное положение по оси X на изображении
			0, //Начальное положение по оси Y на изображении
			objects[i].image.width, //Ширина изображения
			objects[i].image.height, //Высота изображение
			objects[i].x, //Положение по оси X на холсте
			objects[i].y, //Положение по оси Y на холсте
			objects[i].image.width * scale, //Ширина изображения на холсте
			objects[i].image.height * scale //Так как ширина и высота фона одинаковые, в качестве высоты указывается ширина
		);
	}
}

function KeyDown(e)
{
	switch(e.keyCode)
	{
		case 37: //Лево
			objects[player].Move("x", -speed);
			break;

		case 39: //Право
			objects[player].Move("x", speed);
			break;

		case 38: //Вверх
			objects[player].Move("y", -speed);
			break;

		case 40: //Вниз
			objects[player].Move("y", speed);
			break;

		case 27: //Esc
			if(timer == null)
			{
				Start();
			}
			else
			{
				Stop();
			}
			break;
	}
}

function Resize()
{
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
}

Start();