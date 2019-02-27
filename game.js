//state是此时脚下猜的是不是目标点，0：不是	1：是
var person = new Person(0,0);
var countStep = 0;
function run(){
	var oCan = document.getElementById('can1');
	var ctx = oCan.getContext('2d');
	
	getMap(ctx, person);
	var boxes = findBox();
}

function judgeWin(boxes){
	var count = 0;
	for(var p = 0;p<boxes.length;p++){
		if(boxes[p].isOnTarget)
			count++;
	}if(count == boxes.length){
		var Audio3 = document.getElementById('win');
		Audio3.src = '鼓掌.mp3';
		alert('You Win! 一共走了'+countStep+'步');
	}
}

function getBoxIndex(boxes, i,j){
	var index = 0;
	for(var k = 0;k<boxes.length;k++){
		if(boxes[k].x == i && boxes[k].y == j){
			//找到了这个箱子的下标
			index = k;
		}
	}
	return index;
}

//玩家操作
document.onkeydown = function(ev){
	var oCan = document.getElementById('can1');
	var ctx = oCan.getContext('2d');
	var oEvent = ev || event;
	var Audio1 = document.getElementById('walk');
	var Audio2 = document.getElementById('push');
	
	//接收person的坐标
	var position = findPerson();
	//i是person的横坐标
	
	var i = position.personX;
	//j是person的纵坐标
	var j = position.personY;
	//使对象的属性和人在二维数组的坐标关联
	person.x = i;
	person.y = j;
	if(oEvent.keyCode == 37){
		if(person.isOnTarget){
			if(arr1[i][j-1] == 'brick'){
				arr1[i][j-1] = 'person';
				arr1[i][j] = 'target';
				person.isOnTarget = false;
				Audio1.src = '走路emm.wav';
			}else if(arr1[i][j-1] == 'box' && arr1[i][j-2] != 'wall' && arr1[i][j-2] != 'box'){
				var index = getBoxIndex(boxes, i,j-1);
				if(!boxes[index].isOnTarget){
					if(arr1[i][j-2] == 'brick'){
						arr1[i][j-2] = 'box';
						arr1[i][j-1] = 'person';
						arr1[i][j] = 'target';
						person.isOnTarget = false;
					}else if(arr1[i][j-2] == 'target'){
						arr1[i][j-2] = 'box';
						arr1[i][j-1] = 'person';
						arr1[i][j] = 'target';
						person.isOnTarget = false;					
						boxes[index].isOnTarget = true;
					}
				}else if(boxes[index].isOnTarget){
					if(arr1[i][j-2] == 'brick'){
						arr1[i][j-2] = 'box';
						arr1[i][j-1] = 'person';
						arr1[i][j] = 'target';
						boxes[index].isOnTarget = false;
					}else if(arr1[i][j-2] == 'target'){
						arr1[i][j-2] = 'box';
						arr1[i][j-1] = 'person';
						arr1[i][j] = 'target';		
					}
				}
				boxes[index].y--;
				Audio2.src = '推箱子.wav';
			}else if(arr1[i][j-1] == 'target'){
				arr1[i][j-1] = 'person';
				arr1[i][j] = 'target';
				Audio1.src = '走路emm.wav';
			}
		}else if(!person.isOnTarget){
			if(arr1[i][j-1] == 'brick'){
				arr1[i][j-1] = 'person';
				arr1[i][j] = 'brick';
				Audio1.src = '走路emm.wav';
			}else if(arr1[i][j-1] == 'box' && arr1[i][j-2] != 'wall' && arr1[i][j-2] != 'box'){
				var index = getBoxIndex(boxes, i,j-1);
				//箱子踩的不是目标点
				if(!boxes[index].isOnTarget){
					//箱子左边是地面
					if(arr1[i][j-2] == 'brick'){
						arr1[i][j-2] = 'box';
						arr1[i][j-1] = 'person';
						arr1[i][j] = 'brick';					
					}//箱子左边是目标点
					else if(arr1[i][j-2] == 'target'){
						arr1[i][j-2] = 'box';
						arr1[i][j-1] = 'person';
						arr1[i][j] = 'brick';
						boxes[index].isOnTarget = true;
					}
				}else if(boxes[index].isOnTarget){
					if(arr1[i][j-2] == 'brick'){
						arr1[i][j-2] = 'box';
						arr1[i][j-1] = 'person';
						arr1[i][j] = 'brick';
						boxes[index].isOnTarget = false;
						person.isOnTarget = true;
					}else if(arr1[i][j-2] == 'target'){
						arr1[i][j-2] = 'box';
						arr1[i][j-1] = 'person';
						arr1[i][j] = 'brick';
						person.isOnTarget = true;
					}
				}
				boxes[index].y--;
				Audio2.src = '推箱子.wav';
			}else if(arr1[i][j-1] == 'target'){
				arr1[i][j-1] = 'person';
				arr1[i][j] = 'brick';
				person.isOnTarget = true;
				Audio1.src = '走路emm.wav';
			}
		}
		//按上方向键
	}else if(oEvent.keyCode == 38){
		
		if(person.isOnTarget){
			if(arr1[i-1][j] == 'brick'){
				arr1[i-1][j] = 'person';
				arr1[i][j] = 'target';
				person.isOnTarget = false;
				Audio1.src = '走路emm.wav';
			}else if(arr1[i-1][j] == 'box' && arr1[i-2][j] != 'wall' && arr1[i-2][j] != 'box'){
				var index = getBoxIndex(boxes, i-1,j);
				if(!boxes[index].isOnTarget){
					if(arr1[i-2][j] == 'brick'){
						arr1[i-2][j] = 'box';
						arr1[i-1][j] = 'person';
						arr1[i][j] = 'target';
						person.isOnTarget = false;
					}else if(arr1[i-2][j] == 'target'){
						arr1[i-2][j] = 'box';
						arr1[i-1][j] = 'person';
						arr1[i][j] = 'target';
						person.isOnTarget = false;					
						boxes[index].isOnTarget = true;
					}
				}else if(boxes[index].isOnTarget){
					if(arr1[i-2][j] == 'brick'){
						arr1[i-2][j] = 'box';
						arr1[i-1][j] = 'person';
						arr1[i][j] = 'target';
						boxes[index].isOnTarget = false;
					}else if(arr1[i-2][j] == 'target'){
						arr1[i-2][j] = 'box';
						arr1[i-1][j] = 'person';
						arr1[i][j] = 'target';		
					}
				}
				boxes[index].x--;
				Audio2.src = '推箱子.wav';
			}else if(arr1[i-1][j] == 'target'){
				arr1[i-1][j] = 'person';
				arr1[i][j] = 'target';
				Audio1.src = '走路emm.wav';
			}
		}else if(!person.isOnTarget){
			if(arr1[i-1][j] == 'brick'){
				arr1[i-1][j] = 'person';
				arr1[i][j] = 'brick';
				Audio1.src = '走路emm.wav';
			}else if(arr1[i-1][j] == 'box' && arr1[i-2][j] != 'wall' && arr1[i-2][j] != 'box'){
				var index = getBoxIndex(boxes, i-1,j);
				//箱子踩的不是目标点
				if(!boxes[index].isOnTarget){
					//箱子左边是地面
					if(arr1[i-2][j] == 'brick'){
						arr1[i-2][j] = 'box';
						arr1[i-1][j] = 'person';
						arr1[i][j] = 'brick';					
					}//箱子左边是目标点
					else if(arr1[i-2][j] == 'target'){
						arr1[i-2][j] = 'box';
						arr1[i-1][j] = 'person';
						arr1[i][j] = 'brick';
						boxes[index].isOnTarget = true;
					}
				}else if(boxes[index].isOnTarget){
					if(arr1[i-2][j] == 'brick'){
						arr1[i-2][j] = 'box';
						arr1[i-1][j] = 'person';
						arr1[i][j] = 'brick';
						boxes[index].isOnTarget = false;
						person.isOnTarget = true;
					}else if(arr1[i-2][j] == 'target'){
						arr1[i-2][j] = 'box';
						arr1[i-1][j] = 'person';
						arr1[i][j] = 'brick';
						person.isOnTarget = true;
					}
				}
				boxes[index].x--;
				Audio2.src = '推箱子.wav';
			}else if(arr1[i-1][j] == 'target'){
				arr1[i-1][j] = 'person';
				arr1[i][j] = 'brick';
				person.isOnTarget = true;
				Audio1.src = '走路emm.wav';
			}
		}
	}else if(oEvent.keyCode == 39){
		
		if(person.isOnTarget){
			if(arr1[i][j+1] == 'brick'){
				arr1[i][j+1] = 'person';
				arr1[i][j] = 'target';
				person.isOnTarget = false;
				Audio1.src = '走路emm.wav';
			}else if(arr1[i][j+1] == 'box' && arr1[i][j+2] != 'wall' && arr1[i][j+2] != 'box'){
				var index = getBoxIndex(boxes, i,j+1);
				if(!boxes[index].isOnTarget){
					if(arr1[i][j+2] == 'brick'){
						arr1[i][j+2] = 'box';
						arr1[i][j+1] = 'person';
						arr1[i][j] = 'target';
						person.isOnTarget = false;
					}else if(arr1[i][j+2] == 'target'){
						arr1[i][j+2] = 'box';
						arr1[i][j+1] = 'person';
						arr1[i][j] = 'target';
						person.isOnTarget = false;					
						boxes[index].isOnTarget = true;
					}
				}else if(boxes[index].isOnTarget){
					if(arr1[i][j+2] == 'brick'){
						arr1[i][j+2] = 'box';
						arr1[i][j+1] = 'person';
						arr1[i][j] = 'target';
						boxes[index].isOnTarget = false;
					}else if(arr1[i][j+2] == 'target'){
						arr1[i][j+2] = 'box';
						arr1[i][j+1] = 'person';
						arr1[i][j] = 'target';		
					}
				}
				boxes[index].y++;
				Audio2.src = '推箱子.wav';
			}else if(arr1[i][j+1] == 'target'){
				arr1[i][j+1] = 'person';
				arr1[i][j] = 'target';
				Audio1.src = '走路emm.wav';
			}
		}else if(!person.isOnTarget){
			if(arr1[i][j+1] == 'brick'){
				arr1[i][j+1] = 'person';
				arr1[i][j] = 'brick';
				Audio1.src = '走路emm.wav';
			}else if(arr1[i][j+1] == 'box' && arr1[i][j+2] != 'wall' && arr1[i][j+2] != 'box'){
				var index = getBoxIndex(boxes, i,j+1);
				//箱子踩的不是目标点
				if(!boxes[index].isOnTarget){
					//箱子左边是地面
					if(arr1[i][j+2] == 'brick'){
						arr1[i][j+2] = 'box';
						arr1[i][j+1] = 'person';
						arr1[i][j] = 'brick';					
					}//箱子左边是目标点
					else if(arr1[i][j+2] == 'target'){
						arr1[i][j+2] = 'box';
						arr1[i][j+1] = 'person';
						arr1[i][j] = 'brick';
						boxes[index].isOnTarget = true;
					}
				}else if(boxes[index].isOnTarget){
					if(arr1[i][j+2] == 'brick'){
						arr1[i][j+2] = 'box';
						arr1[i][j+1] = 'person';
						arr1[i][j] = 'brick';
						boxes[index].isOnTarget = false;
						person.isOnTarget = true;
					}else if(arr1[i][j+2] == 'target'){
						arr1[i][j+2] = 'box';
						arr1[i][j+1] = 'person';
						arr1[i][j] = 'brick';
						person.isOnTarget = true;
					}
				}
				boxes[index].y++;
				Audio2.src = '推箱子.wav';
			}else if(arr1[i][j+1] == 'target'){
				arr1[i][j+1] = 'person';
				arr1[i][j] = 'brick';
				person.isOnTarget = true;
				Audio1.src = '走路emm.wav';
			}
		}
	}else if(oEvent.keyCode == 40){
		
		if(person.isOnTarget){
			if(arr1[i+1][j] == 'brick'){
				arr1[i+1][j] = 'person';
				arr1[i][j] = 'target';
				person.isOnTarget = false;
				Audio1.src = '走路emm.wav';
			}else if(arr1[i+1][j] == 'box' && arr1[i+2][j] != 'wall' && arr1[i+2][j] != 'box'){
				var index = getBoxIndex(boxes, i+1,j);
				if(!boxes[index].isOnTarget){
					if(arr1[i+2][j] == 'brick'){
						arr1[i+2][j] = 'box';
						arr1[i+1][j] = 'person';
						arr1[i][j] = 'target';
						person.isOnTarget = false;
					}else if(arr1[i+2][j] == 'target'){
						arr1[i+2][j] = 'box';
						arr1[i+1][j] = 'person';
						arr1[i][j] = 'target';
						person.isOnTarget = false;					
						boxes[index].isOnTarget = true;
					}
				}else if(boxes[index].isOnTarget){
					if(arr1[i+2][j] == 'brick'){
						arr1[i+2][j] = 'box';
						arr1[i+1][j] = 'person';
						arr1[i][j] = 'target';
						boxes[index].isOnTarget = false;
					}else if(arr1[i+2][j] == 'target'){
						arr1[i+2][j] = 'box';
						arr1[i+1][j] = 'person';
						arr1[i][j] = 'target';		
					}
				}
				boxes[index].x++;
				Audio2.src = '推箱子.wav';
			}else if(arr1[i+1][j] == 'target'){
				arr1[i+1][j] = 'person';
				arr1[i][j] = 'target';
				Audio1.src = '走路emm.wav';
			}
		}else if(!person.isOnTarget){
			if(arr1[i+1][j] == 'brick'){
				arr1[i+1][j] = 'person';
				arr1[i][j] = 'brick';
				Audio1.src = '走路emm.wav';
			}else if(arr1[i+1][j] == 'box' && arr1[i+2][j] != 'wall' && arr1[i+2][j] != 'box'){
				var index = getBoxIndex(boxes, i+1,j);
				//箱子踩的不是目标点
				if(!boxes[index].isOnTarget){
					//箱子左边是地面
					if(arr1[i+2][j] == 'brick'){
						arr1[i+2][j] = 'box';
						arr1[i+1][j] = 'person';
						arr1[i][j] = 'brick';					
					}//箱子左边是目标点
					else if(arr1[i+2][j] == 'target'){
						arr1[i+2][j] = 'box';
						arr1[i+1][j] = 'person';
						arr1[i][j] = 'brick';
						boxes[index].isOnTarget = true;
					}
				}else if(boxes[index].isOnTarget){
					if(arr1[i+2][j] == 'brick'){
						arr1[i+2][j] = 'box';
						arr1[i+1][j] = 'person';
						arr1[i][j] = 'brick';
						boxes[index].isOnTarget = false;
						person.isOnTarget = true;
					}else if(arr1[i+2][j] == 'target'){
						arr1[i+2][j] = 'box';
						arr1[i+1][j] = 'person';
						arr1[i][j] = 'brick';
						person.isOnTarget = true;
					}
				}
				boxes[index].x++;
				Audio2.src = '推箱子.wav';
			}else if(arr1[i+1][j] == 'target'){
				arr1[i+1][j] = 'person';
				arr1[i][j] = 'brick';
				person.isOnTarget = true;
				Audio1.src = '走路emm.wav';
			}
		}
	}
	getMap(ctx, person);
	judgeWin(boxes);
	countStep++;
}