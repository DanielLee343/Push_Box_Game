//人类
function Person(x, y){
	this.color = 'pink';
	this.size = 20;
	this.x = x;
	this.y = y;
	//判断这个人是否在目标点上
	this.isOnTarget = false;
}
//箱子类
function Box(x, y){
	this.color = 'yellow';
	this.size = 40;
	this.x = x;
	this.y = y;
	//判断某个箱子是否在目标点上
	this.isOnTarget = false;
}
//目标点类
function Target(x, y){
	this.size = 12;
	this.x = x;
	this.y = y;
	this.color = 'lime';
}
//地砖类
function Brick(x, y){
	this.x = x;
	this.y = y;
	this.size = 40;
}
//围墙类
function Wall(x, y){
	this.x = x;
	this.y = y;
	this.size = 40;
}
