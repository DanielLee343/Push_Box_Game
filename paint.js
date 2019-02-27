//首先还是清屏
function clearScreen(ctx){
	ctx.clearRect(0,0,1536,750);
}
//画人
function paintPerson(ctx, x, y, size,color){
	ctx.beginPath();
	ctx.fillStyle = color;
	//我们在内部就写好该往哪里画
	ctx.arc(530+x*size*2+20, 180+y*size*2+20, size, 0, 2*Math.PI);
	ctx.fill();
}
//画箱子
function paintBox(ctx, x, y, size,color){
	ctx.beginPath();
	ctx.fillStyle = color;	
	ctx.fillRect(530+x*size, 180+y*size, size, size);
	ctx.strokeStyle = 'black';
	ctx.lineWidth = 2;
	ctx.moveTo(530+x*size, 180+y*size);
	ctx.lineTo(530+x*size+size, 180+y*size+size);
	ctx.stroke();
	ctx.beginPath();
	ctx.moveTo(530+x*size+size, 180+y*size);
	ctx.lineTo(530+x*size, 180+y*size+size);
	ctx.stroke();
	ctx.strokeRect(530+x*size, 180+y*size, size, size);
}
//画目标点
function paintTarget(ctx, x, y, size,color){
	ctx.beginPath();
	ctx.fillStyle = color;
	ctx.arc(530+x*size*4+20, 180+y*size*4+20, size, 0, 2*Math.PI);
	ctx.fill();
}
//画地砖
function paintBrick(ctx, x, y, size){
	ctx.beginPath();
	ctx.fillStyle = 'blue';
	ctx.fillRect(530+x*size, 180+y*size, size, size);
	ctx.strokeStyle = 'lightblue';
	for(var i = 0; i <= 3; i++){
		ctx.beginPath();
		ctx.moveTo(530+x*size, 180+y*size+0.25*(i+1)*size);
		ctx.lineTo(530+x*size+size, 180+y*size+0.25*(i+1)*size);
		ctx.stroke();
	}
	for(var i = 0; i < 4; i++){
		ctx.beginPath();
		if(i%2 == 0){
			ctx.moveTo(530+x*size+0.5*size, 180+y*size+0.25*i*size);
			ctx.lineTo(530+x*size+0.5*size, 180+y*size+0.25*(i+1)*size);
			ctx.stroke();
		}else{
			ctx.moveTo(530+x*size+0.25*size, 180+y*size+0.25*i*size);
			ctx.lineTo(530+x*size+0.25*size, 180+y*size+0.25*(i+1)*size);
			ctx.stroke();
			ctx.beginPath();
			ctx.moveTo(530+x*size+0.75*size, 180+y*size+0.25*i*size);
			ctx.lineTo(530+x*size+0.75*size, 180+y*size+0.25*(i+1)*size);
			ctx.stroke();
		}
	}
}
//画围墙
function paintWall(ctx, x, y, size){
	ctx.beginPath();
	ctx.fillStyle = 'gray';
	ctx.fillRect(530+x*size, 180+y*size, size, size);
	ctx.strokeStyle = 'white';
	ctx.beginPath();
	ctx.moveTo(530+x*size+0.5*size, 180+y*size);
	ctx.lineTo(530+x*size+0.5*size, 180+y*size+size);
	ctx.stroke();
	ctx.beginPath();
	ctx.moveTo(530+x*size, 180+y*size+0.5*size);
	ctx.lineTo(530+x*size+size, 180+y*size+0.5*size);
	ctx.stroke();
}