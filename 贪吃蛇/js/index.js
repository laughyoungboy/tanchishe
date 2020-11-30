var startBtn = document.querySelector(".startBtn")
var startPage = document.querySelector(".page.startGame")
var gamingPage = document.querySelector(".gaming")
var endGamePage = document.querySelector(".endGame")
var mainGame = document.querySelector(".mainGame")
var numDom = document.querySelector(".score .left .num")
var endGameScore = document.querySelector(".endGame .num")
var reStartBtn = document.querySelector('.reStartBtn');


var snake = [{x:0,y:1},{x:1,y:1},{x:2,y:1}];
var snakeFood = {
	x:10,y:10
}
//初识化得分
var score = 0;
var interId;

//定义蛇运动的方向
//从右向左{x:-1,y:0}
//从左向右{x:1,y:0}
//从上到下{x:0,y:1}
//从下到上{x:0,y:-1}
var direction = {x:-1,y:0}


startBtn.onclick = function(){
	startPage.style.display = "none"
	gamingPage.style.display = "block"
	gameIng()
}


function renderGezi(){
	for(var i=0;i<20;i++){
		for(var j=0;j<15;j++){
			var gezi = document.createElement("div");
			gezi.className = "gezi";
			gezi.id = 'x'+j+'y'+i;
			mainGame.appendChild(gezi)
		}
	}
}


renderGezi()
//随机创建蛇，
function createSnake(){
	var randomX =  parseInt(Math.random()*13)
	var randomY = parseInt(Math.random()*20)
	snake = [];
	for(var i= 0;i<3;i++){
		snake.push({x:randomX+i,y:randomY})
	}
	
}


function renderSnake(){
	snake.forEach(function(item,i){
		var snakeBody = document.querySelector("#x"+item.x+"y"+item.y);
		snakeBody.className = "gezi snake";
	})
}

//渲染食物
function renderFood(){
	var randomX =  parseInt(Math.random()*15)
	var randomY = parseInt(Math.random()*20)
	
	var foodDiv = document.querySelector("#x"+randomX+"y"+randomY)
	if(foodDiv.className == "gezi snake"){
		renderFood()
	}else{
		foodDiv.className = "gezi food"
	}
	
}


createSnake()

renderFood()
renderSnake()

function gameIng(){
	interId = setInterval(function(){
		var headerX = snake[0].x + direction.x;
		var headerY = snake[0].y + direction.y;
		if(headerX<0){
			headerX = 14;
		}
		if(headerX>14){
			headerX = 0;
		}
		if(headerY<0){
			headerY = 19;
		}
		if(headerY>19){
			headerY = 0;
		}
		
		var snakeHeader = {x:headerX,y:headerY};
		isSnake(snakeHeader) 
		if(!isFood(snakeHeader)) {
			//将删除的蛇，找到相对应的dom，将其class类名修改成正常的gezi
			var snakeFooter = snake.pop()
			var snakeFooterDiv = document.querySelector("#x"+snakeFooter.x+"y"+snakeFooter.y);
			snakeFooterDiv.className = "gezi";
		}
		snake.unshift(snakeHeader)
		
		
		
		renderSnake()
	},100)
}


function isSnake(snakeHeader){
	var newHeader = document.querySelector("#x"+snakeHeader.x+"y"+snakeHeader.y)
	if(newHeader.className == "gezi snake"){
		clearInterval(interId);
		gamingPage.style.display = "none"
		endGamePage.style.display = "flex"
		endGameScore.innerHTML = score;
		
		return true;
	}else{
		return false;
	}
}


function isFood(snakeHeader){
	var newHeader = document.querySelector("#x"+snakeHeader.x+"y"+snakeHeader.y)
	if(newHeader.className == "gezi food"){
		score ++;
		numDom.innerHTML = score;
		renderFood()
		return true;
	}else{
		return false;
	}
}

var body = document.body

body.addEventListener("keydown",function(e){
	console.log(e)
	if(e.key == "ArrowUp"&&direction.y!=1){
		direction = {x:0,y:-1}
	}
	if(e.key=="ArrowRight"&&direction.x!=-1){
		direction = {x:1,y:0}
	}
	if(e.key == "ArrowDown"&&direction.y!=-1){
		direction = {x:0,y:1}
	}
	if(e.key=="ArrowLeft"&&direction.x!=1){
		direction = {x:-1,y:0}
	}
})

xqEvent.init(body);
body.addEvent("swiperLeft",function(){
	if(direction.x!=1){
		direction = {x:-1,y:0}
	}
})

body.addEvent("swiperRight",function(){
	if(direction.x!=-1){
		direction = {x:1,y:0}
	}
})

body.addEvent("swiperTop",function(){
	if(direction.y!=1){
		direction = {x:0,y:-1}
	}
})

body.addEvent("swiperBottom",function(){
	if(direction.y!=-1){
		direction = {x:0,y:1}
	}
})

reStartBtn.onclick = function(){
	location.reload();
}