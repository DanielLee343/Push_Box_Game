//var boxLevel1Count = 3;
//var boxes = new Array(boxLevel1Count);
//for(var i = 0;i<boxLevel1Count;i++){
//	boxes[i] = new Box(0,0);
//}


var arr1 = [
	['', '', 'wall', 'wall','wall','','',''],
	['','','wall','target','wall','','',''],
	['','','wall','brick','wall','wall','wall','wall'],
	['wall','wall','wall','box','brick','box','target','wall'],
	['wall','target','brick','box','person','wall','wall','wall'],
	['wall','wall','wall','wall','box','wall','',''],
	['','','','wall','target','wall','',''],
	['','','','wall','wall','wall','','']
];



var arr1 = [
	['wall','wall','wall','wall','wall','wall','wall','wall','wall','wall'],
	['wall','brick','brick','target','target','target','brick','brick','brick','wall'],
	['wall','brick','target','brick','brick','brick','brick','brick','brick','wall'],
	['wall','brick','brick','brick','brick','brick','box','brick','brick','wall'],
	['wall','brick','box','brick','brick','person','brick','brick','brick','wall'],
	['wall','brick','brick','brick','brick','brick','brick','brick','brick','wall'],
	['wall','brick','box','brick','brick','brick','box','brick','brick','wall'],
	['wall','brick','brick','box','brick','brick','brick','brick','brick','wall'],
	['wall','brick','brick','brick','brick','brick','target','brick','brick','wall'],
	['wall','wall','wall','wall','wall','wall','wall','wall','wall','wall']
];
var arr1 = [
	['wall','wall','wall','wall','wall','wall','wall','wall','wall','wall'],
	['wall','brick','brick','brick','brick','brick','brick','brick','brick','wall'],
	['wall','brick','brick','brick','brick','brick','box','brick','brick','wall'],
	['wall','brick','brick','target','target','target','brick','box','brick','wall'],
	['wall','brick','brick','target','target','brick','box','brick','brick','wall'],
	['wall','brick','brick','brick','brick','box','brick','person','brick','wall'],
	['wall','brick','brick','brick','box','brick','brick','brick','brick','wall'],
	['wall','brick','brick','brick','brick','brick','brick','brick','brick','wall'],
	['wall','brick','brick','brick','brick','brick','brick','brick','brick','wall'],
	['wall','wall','wall','wall','wall','wall','wall','wall','wall','wall']
];

var arr1 = [
	['','wall','wall','wall','wall','wall','',''],
	['','wall','brick','person','wall','wall','wall',''],
	['','wall','brick','box','brick','brick','wall',''],
	['wall','wall','wall','brick','wall','brick','wall','wall'],
	['wall','target','wall','brick','wall','brick','brick','wall'],
	['wall','target','box','brick','brick','wall','brick','wall'],
	['wall','target','brick','brick','brick','box','brick','wall'],
	['wall','wall','wall','wall','wall','wall','wall','wall']
];
function getMap(ctx, person){
	clearScreen(ctx);
	
	for(var i = 0; i<arr1.length; i++){
		for(var j = 0; j<arr1[0].length; j++){
			
			//画初始图
			if(arr1[i][j] == 'wall'){
				//这样我们就把坐标作为参数，引入到那些paint方法里，经过计算，在网页中正确显示了
				paintWall(ctx,j,i,40);
			}else if(arr1[i][j] == 'brick'){
				paintBrick(ctx, j, i,40);
			}else if(arr1[i][j] == 'target'){
				paintBrick(ctx, j, i,40);
				paintTarget(ctx, j, i,10,'lime');
			}else if(arr1[i][j] == 'box'){
				paintBrick(ctx, j, i,40);
				var index = getBoxIndex(boxes,i,j);
				if(boxes[index].isOnTarget){
					paintBox(ctx, j, i,40,'red');
				}else{
					paintBox(ctx, j, i,40,'yellow');
				}
			}else if(arr1[i][j] == 'person'){
				paintBrick(ctx, j, i,40);
				paintPerson(ctx, j, i,20,'pink');
			}
			
		}
	}
	
}

//找到人的坐标
function findPerson(){
	for (var i = 0; i < arr1.length; i++) {
        var tmp = arr1[i];
        for (var j = 0; j < tmp.length; j++) {
            if (arr1[i][j] == 'person') {
				//使用json传变量
                return {personX:i,personY:j};
            }
        }
    }
}

//找箱子的坐标，并把他们放到数组里
function findBox(){
	var count = 0;
	for (var i = 0; i < arr1.length; i++) {
        var tmp = arr1[i];
        for (var j = 0; j < tmp.length; j++) {
            if (arr1[i][j] == 'box') {
				boxes[count].x = i;
				boxes[count].y = j;
				count++;
            }
        }
    }
	return boxes;
}

//返回箱子个数
function boxCount(){
	var count = 0;
	for (var i = 0; i < arr1.length; i++) {
        var tmp = arr1[i];
        for (var j = 0; j < tmp.length; j++) {
            if (arr1[i][j] == 'box') {
				count++;
            }
        }
    }
	return count;
}
var boxes = new Array(boxCount());
for(var i = 0;i<boxCount();i++){
	boxes[i] = new Box(0,0);
}