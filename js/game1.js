//TODO 
//想法:上传图片替换鸟和其他东西...
//煽动的翅膀

//参数设置(默认值)
movespeed = 1; //移动速度(1)
fps = 60; //帧率(60)
bgspeed0 = 0.2; //上方背景移动速度
bgspeed1 = 0.5; //下方背景移动速度
a = 0.15; //重力加速度(0.12)
v = 0; //初始速度(0)
flypower = 4.5; //小鸟的力量(4)
pipespeed = 1.25; //水管速度(1)
pipetimer = 2000; //出水管时间间隔(没用)
pipegap = 130; //水管水平间隔(120)
pipeindex = 110; //水管垂直间隔(110)
//alive_src = "img/p3_a.png";
alive_src = "img/test1.png";
die_src = "img/sile1.png";
bgimg1_0 = "img/bg1_a.png";
bgimg1_1 = "img/bg1_b.png";
bgimg2_0 = "img/bg1_a.png";
bgimg2_1 = "img/bg1_b.png";
c_goldspeed = 100; //获得金币的间隔(帧)
arrowspeed = 1; //子弹移动速度
hittime = 20; //打击残留时间(ms)


arrow = 1;
gold = 0;
//开关
all = false;
fly = false;
flyable = true;
move_up_flag = false;
move_down_flag = false;
move_left_flag = false;
move_right_flag = false;
start = false;
canshowpipe = true;
gameover = false;
//计数器
c_gold = 0;
c_time = 0;
totalgold = 0;


//object.style.behavior = "url('#default#userData')"
window.onload = function() {

	initImg();

	setInterval(move, parseFloat(1000 / fps));

	document.onkeydown = function t(e) {
		//TODO 添加转身特效
		switch (e.which) {
			case 87:
				move_up_flag = true;
				break;
			case 83:
				move_down_flag = true;
				break;
			case 65:
				move_left_flag = true;
				break;
			case 68:
				move_right_flag = true;
				break;
			case 37:
				move_left_flag = true;
				break;
			case 38:
				move_up_flag = true;
				break;
			case 39:
				move_right_flag = true;
				break;
			case 40:
				move_down_flag = true;
				break;
			case 32:
				move_fly_flag = true;
				break;
		}
	}
	document.onkeyup = function t(e) {
		switch (e.which) {
			case 87:
				move_up_flag = false;
				break;
			case 83:
				move_down_flag = false;
				break;
			case 65:
				move_left_flag = false;
				break;
			case 68:
				move_right_flag = false;
				break;
			case 37:
				move_left_flag = false;
				break;
			case 38:
				move_up_flag = false;
				break;
			case 39:
				move_right_flag = false;
				break;
			case 40:
				move_down_flag = false;
				break;
		}
	}
	//var t = false;
	document.onclick = function(e) {
		if (start && flyable) {
			fly = true;
			//if (t) {
				//if (arrow) {
				//	shot(e);
				//}
			//}else{
				t = true;
			//}
		}
	};

	document.getElementById('btn_personal').onmousemove = function() {
		document.getElementById('btn_personal').style.backgroundColor = 'lightskyblue';
	};
	document.getElementById('btn_setting').onmousemove = function() {
		document.getElementById('btn_setting').style.backgroundColor = 'lightskyblue';
	};
	document.getElementById('btn_start').onmousemove = function() {
		document.getElementById('btn_start').style.backgroundColor = 'lightskyblue';
	};
	document.getElementById('btn_restart').onmousemove = function() {
		document.getElementById('btn_restart').style.backgroundColor = 'lightskyblue';
	};
	document.getElementById('btn_personal').onmouseout = function() {
		document.getElementById('btn_personal').style.backgroundColor = 'cornflowerblue';
	};
	document.getElementById('btn_setting').onmouseout = function() {
		document.getElementById('btn_setting').style.backgroundColor = 'cornflowerblue';
	};
	document.getElementById('btn_start').onmouseout = function() {
		document.getElementById('btn_start').style.backgroundColor = 'cornflowerblue';
	};
	document.getElementById('btn_restart').onmouseout = function() {
		document.getElementById('btn_restart').style.backgroundColor = 'cornflowerblue';
	};
	document.getElementById('btn_start').onclick = startgame;
	document.getElementById('btn_restart').onclick = resetgame;
}

//点击鼠标，创建子弹对象就行了，之后里面自定义属性，保存目的地坐标。
//子弹的移动使用循环判断就行了。和管子一样
function shot(arg) {
	//获得鼠标坐标（为了计算目的地坐标）
	var mousePos = getMousePos(arg); //获得相对的top和left
	console.log(mousePos.x + ',' + mousePos.y)
	createarrow(mousePos);
}

function createarrow(mousePos) {
	var tmparrow = document.createElement("img");
	var player = document.getElementById("player");
	tmparrow.className = "arrow";
	tmparrow.name = "arrow";
	//TODO test
	tmparrow.speedx = 1;
	tmparrow.speedy = -1;
	tmparrow.aimx = mousePos.x;
	tmparrow.aimy = mousePos.y;
	tmparrow.src = "img/fire_shut_0.png";
	tmparrow.style.left = getStyle(player, "left");
	tmparrow.style.top = getStyle(player, "top");
	document.getElementById("frame").appendChild(tmparrow);
}

//移动每个子弹
function movearrows() {
	var arrows = document.getElementsByName("arrow");
	for (var i = 0; i < arrows.length; i++) {
		var al = parseFloat(getStyle(arrows[i], "left"));
		var at = parseFloat(getStyle(arrows[i], "top"));
		if (al > arrows[i].aimx && (at > arrows[i].aimy || at < arrows[i].aimy)) {
			showhit(al, at);
			document.getElementById("frame").removeChild(arrows[i]);
			continue;
		}
		arrows[i].style.left = al + arrows[i].speedx + "px";
		arrows[i].style.left = at + arrows[i].speedy + "px";
	}
	var hits = document.getElementsByName("hit");
	for (var i = 0; i < arrows.length; i++) {
		hits[i].left = parseFloat(getStyle(hits[i], "left")) - pipespeed + 'px';
		hits[i].htime = hits[i].htime - 1;
		if (hits[i].htime == 0) {
			document.getElementById("frame").removeChild(arrows[i]);
		}
	}
}

function showhit(x, y) {
	var hit = document.createElement("img");
	hit.name = "hit";
	hit.className = "hit";
	hit.src = "img/fire_hit.png";
	hit.htime = hittime;
	hit.style.left = x + "px";
	hit.style.top = y + "px";
	document.getElementById("frame").appendChild(hit);
};

/*
 * x,y 水平和垂直方向的位移量, ms移动的时间(没用)
 */
function ani(obj, x, y, ms) { //平移
	top = getStyle(obj, "top");
	left = getStyle(obj, "left");
	//	(x - top) / ms //每ms需要移动的距离
	//		(y - left) / ms //每ms需要移动的距离
}

function getMousePos(event) {
	var e = event || window.event;
	var scrollX = document.documentElement.scrollLeft || document.body.scrollLeft;
	var scrollY = document.documentElement.scrollTop || document.body.scrollTop;
	var x = e.pageX || e.clientX + scrollX;
	var y = e.pageY || e.clientY + scrollY;
	var l = parseFloat(getStyle(document.getElementById("frame"), "margin-left"));
	x = x - l;
	//	alert('x: ' + x + '\ny: ' + y);
	//		var posobj = getMousePos(e);
	//		var hit = document.createElement("img");
	//		hit.src = "img/fire_hit.png";
	//		hit.className = "hit";
	//		document.getElementById("frame").appendChild(hit);
	//		var l = getStyle(document.getElementById("frame"),"margin-left");
	//		console.log(parseFloat(l));
	//		hit.style.top = parseFloat(posobj.y) + "px";
	//		hit.style.left = parseFloat(posobj.x) - parseFloat(l) + "px";
	return {
		'x': x,
		'y': y
	};
}


function initImg() {
	document.getElementById('bg1_0').src = bgimg1_0;
	document.getElementById('bg1_1').src = bgimg1_1;
	document.getElementById('bg2_0').src = bgimg2_0;
	document.getElementById('bg2_1').src = bgimg2_1;
	document.getElementById("gold").style.display = "none";
	document.getElementById('player').src = alive_src;
	totalgold = 0;
	//	if (localStorage.getItem("totalgold") == null) {
	//		totalgold = 0;
	//	} else {
	//		totalgold = parseInt(localStorage.getItem("totalgold"));
	//	}
}

function move() {
	backgroundMove0();
	backgroundMove1();
	var pleft = parseFloat(getStyle(document.getElementById('player'), "left"));
	var ptop = parseFloat(getStyle(document.getElementById('player'), "top"));
	if (move_up_flag) {
		document.getElementById('player').style.top = ptop - parseFloat(movespeed) + 'px';
	}
	if (move_down_flag) {
		document.getElementById('player').style.top = ptop + parseFloat(movespeed) + 'px';
	}
	if (move_left_flag) {
		document.getElementById('player').style.left = pleft - parseFloat(movespeed) + 'px';
	}
	if (move_right_flag) {
		document.getElementById('player').style.left = pleft + parseFloat(movespeed) + 'px';
	}
	limit();
	if (start) {
		sumgold();
		drop();
		showPipe();
		movearrows();
		if (parseFloat(getStyle(document.getElementById('player'), "top")) >= 470) { //到达地面
			endgame();
		}
	}
}

function sumgold() {
	c_gold += 1;
	if (c_gold >= c_goldspeed) {
		c_gold = 0;
		gold++;
		document.getElementById("gold").innerHTML = "获得金币:" + gold;
	}
}

function limit() {
	var pleft = parseFloat(getStyle(document.getElementById('player'), "left"));
	var ptop = parseFloat(getStyle(document.getElementById('player'), "top"));
	if (pleft <= -1) {
		document.getElementById('player').style.left = 0 + 'px';
	}
	if (pleft >= 371) {
		document.getElementById('player').style.left = 370 + 'px';
	}
	if (ptop >= 470) { //到达地面
		document.getElementById('player').style.top = 470 + 'px';
	}
	if (ptop <= -20) { //超过高度
		flyable = false;
	} else {
		flyable = true;
	}
	if (!start) {
		if (ptop <= -1) {
			document.getElementById('player').style.top = 0 + 'px';
		}
	}
}

function backgroundMove0() {
	var left1 = parseFloat(getStyle(document.getElementById('bg1_0'), "left"));
	var left2 = parseFloat(getStyle(document.getElementById('bg2_0'), "left"));
	if (left1 >= -400) {
		document.getElementById('bg1_0').style.left = left1 - parseFloat(bgspeed0) + 'px';
	} else {
		document.getElementById('bg1_0').style.left = 400 + 'px';
	}
	if (left2 >= -400) {
		document.getElementById('bg2_0').style.left = left2 - parseFloat(bgspeed0) + 'px';
	} else {
		document.getElementById('bg2_0').style.left = 400 + 'px';
	}
}

function backgroundMove1() {
	var left1 = parseFloat(getStyle(document.getElementById('bg1_1'), "left"));
	var left2 = parseFloat(getStyle(document.getElementById('bg2_1'), "left"));
	if (left1 >= -400) {
		document.getElementById('bg1_1').style.left = left1 - parseFloat(bgspeed1) + 'px';
	} else {
		document.getElementById('bg1_1').style.left = 400 + 'px';
	}
	if (left2 >= -400) {
		document.getElementById('bg2_1').style.left = left2 - parseFloat(bgspeed1) + 'px';
	} else {
		document.getElementById('bg2_1').style.left = 400 + 'px';
	}
}

var startgame = function() {
	document.getElementById('menu').style.display = 'none';
	document.getElementById("gold").innerHTML = "获得金币:" + 0;
	document.getElementById("gold").style.display = "block";
	start = true;
}
var resetgame = function() {
	start = false;
	flyable = false;
	all = false;
	fly = false;
	canshowpipe = true;
	document.getElementById("gameover").style.display = "none";
	document.getElementById("frame").removeChild(document.getElementById("player"));
	var nodes = document.getElementsByClassName("pipe1");
	while (nodes.length > 0) {
		document.getElementById("frame").removeChild(nodes[0]);
	}
	var player = document.createElement("img");
	document.getElementById("frame").appendChild(player);
	player.id = "player";
	player.className = "player";
	player.name = "player";
	player.src = alive_src
	document.getElementById('menu').style.display = 'block';
	gold = 0;
	//	localStorage.setItem("totalgold", totalgold);
	gameover = false;
}

function endgame() {
	start = false;
	flyable = false;
	document.getElementById("gameover").style.display = "block";
	document.getElementById("player").src = die_src;
	document.getElementById("gold").style.display = "none";
	document.getElementById("re_gold").innerHTML = "这次收集了" + gold + "个金币";
	totalgold += gold;
	document.getElementById("total_gold").innerHTML = "总共收集了" + totalgold + "个金币";
}

//重力
function drop() {
	if (fly) {
		v = -flypower;
		fly = false;
	}
	var ptop = parseFloat(getStyle(document.getElementById('player'), "top"));
	document.getElementById('player').style.top = ptop + parseFloat(v) + 'px';
	v += parseFloat(a);
	limit();
}

//TODO 应该有更好的方法,暂时这样写
function showPipe() {
	if (canshowpipe) {
		createPipe();
	}
	movePipe();
}

function createPipe() {
	var obj1 = document.createElement("img");
	var obj2 = document.createElement("img");
	obj1.className = obj2.className = "pipe1";
	obj1.src = obj2.src = "img/pipe.png";
	//	obj1.name = obj2.name = "pipe";
	document.getElementById("frame").appendChild(obj1);
	document.getElementById("frame").appendChild(obj2);
	//	var num = Math.random() * (450 - (50 + pipeindex)); //Math.random() -> 0.0~1.0
	var num = Math.random() * (400 - pipeindex);
	//	console.log(num)
	//-450 ~ 450-pipeindex px
	//	obj1.style.top = num + 50 + pipeindex - 500 - pipeindex + 'px';
	//	obj2.style.top = num + 50 + pipeindex + 'px';
	obj1.style.top = num + pipeindex - 450 - pipeindex + 'px';
	obj2.style.top = num + 50 + pipeindex + 'px';
	canshowpipe = false;
}

function movePipe() {
	//获得小鸟位置
	var player = document.getElementById("player");
	var t0 = parseFloat(getStyle(player, 'top'));
	var l0 = parseFloat(getStyle(player, 'left'));
	var y0 = t0 + 15;
	var x0 = l0 + 15;
	var minx = 9999;
	var miny = 9999;
	var target = null;

	//标记
	//	document.getElementById("p1").style.top = y0 + "px";
	//	document.getElementById("p1").style.left = x0 + "px";

	//-----
	var nodes = document.getElementById("frame").getElementsByClassName("pipe1");
	for (var i = 0; i < nodes.length; i++) {
		//move
		var left = parseFloat(getStyle(nodes[i], "left"));
		nodes[i].style.left = left - pipespeed + 　'px';
		//remove
		if (left <= -50) {
			document.getElementById("frame").removeChild(nodes[i]);
		}
		//impact
		var top = parseFloat(getStyle(nodes[i], "top"));
		var y1;
		var x1 = left + 25;
		if (top < 0) {
			y1 = top + 500;
		} else {
			y1 = top;
		}
		var x = Math.abs(x1 - x0);
		var y = Math.abs(y1 - y0);
		if (x <= minx || Math.abs(x - minx) < 2) {
			if (Math.abs(x - minx) > 1) {
				miny = 9999;
			}
			minx = x;
			if (y < miny) {
				miny = y;
				target = nodes[i];
			}
		}
	}
	//标记
	//	document.getElementById("p2").style.left = target.style.left;
	//	if (parseFloat(target.style.top) < 0) {
	//		document.getElementById("p2").style.top = parseFloat(target.style.top) + 500 + "px";
	//	} else {
	//		document.getElementById("p2").style.top = target.style.top;
	//	}
	var re = impact(x0, y0, parseFloat(getStyle(target, "left")), parseFloat(getStyle(target, "top")));
	if (re) {
		endgame();
	} else {
		document.getElementById("gameover").style.display = "none";
	}
	//	console.log(nodes[nodes.length - 1].style.left)
	if (parseFloat(nodes[nodes.length - 1].style.left) <= -pipegap + 350) {
		canshowpipe = true;
	}
}

//碰撞(圆形和方形,还可以使用SAT理论作为基础...)
function impact(x0, y0, x1, y1) {
	var up = false;
	if (y1 < 0) {
		y1 = y1 + 500;
		up = true;
	}
	var dx = x1 - x0;
	var dy = y1 - y0;
	//		var dx2= x1 + 　50 - x0;
	//		console.log(dx, dy, dx2);
	if (up) {
		if (dx < 14 && dx > 0 && dy > 3 /*-1*/ ) {
			return true;
		} else if (dx < 0 && dx > -50 && dy > -10 /*(-14)*/ ) {
			return true;
		} else if (dx < -50 && dx > -64 && dy > 3) {
			return true;
		} else if (Math.sqrt(dx * dx + dy * dy) < 10 /*(14)*/ || Math.sqrt((dx + 50) * (dx + 50) + dy * dy) < 10 /*(14)*/ ) {
			return true;
		} else {
			return false;
		}
	} else {
		if (dx < 14 && dx > 0 && dy < 3) {
			return true;
		} else if (dx < 0 && dx > -50 && dy < 10 /*(14)*/ ) {
			return true;
		} else if (dx < -50 && dx > -64 && dy < 3) {
			return true;
		} else if (Math.sqrt(dx * dx + dy * dy) < 10 /*(14)*/ || Math.sqrt((dx + 50) * (dx + 50) + dy * dy) < 10 /*(14)*/ ) {
			return true;
		} else {
			return false;
		}
	}
}

//获取样式
function getStyle(obj, attr) {
	if (obj == null) {
		return;
	}
	if (obj.getCurrentStyle) {
		return obj.getCurrentStyle[attr];
	} else {
		return getComputedStyle(obj, true)[attr];
	}
}


/**
 * 面向对象方法。。。待研究
 */
//构造水管
function Pipe(top, left) {
	this.top = top;
	this.left = left;
	this.obj1 = document.createElement("img");
	this.obj2 = document.createElement("img");
}

Pipe.prototype.init = function() {
	this.obj1.className = "pipe1";
	this.obj2.className = "pipe2";
	this.obj1.src = this.obj2.src = "img/pipe.png";
	document.getElementById("frame").appendChild(this.obj1);
	document.getElementById("frame").appendChild(this.obj2);
	this.obj1.style.top = this.top + 'px';
	this.obj2.style.top = this.top + pipeindex + 500 + 'px';
}

Pipe.prototype.move = function() {
	this.obj1.style.left = parseFloat(getStyle(this.obj1, "left")) - pipespeed + 　'px';
	this.obj2.style.left = parseFloat(getStyle(this.obj2, "left")) - pipespeed + 　'px';
	//	console.log(parseFloat(this.obj1.style.left));
	return parseFloat(this.obj1.style.left);
}

Pipe.prototype.destory = function() {
	document.getElementById("frame").removeChild(this.obj1);
	document.getElementById("frame").removeChild(this.obj2);
}

pipe1 = null;
pipe2 = null;
pipe3 = null;
pipe4 = null;
//出水管
function testshowpipe() {
	if (canshowpipe) {

	} else {

	}
	if (pipe1 != null) {
		//already have pipe
		var left = pipe1.move();
		if (left <= -pipegap) {
			canshowpipe = true;
		}
		if (left <= -50) {
			pipe1.destory();
			pipe1 = null;
		}
	} else {
		//no pipe
		if (canshowpipe) {
			//TODO random number
			pipe1 = new Pipe(-250.5, 0);
			pipe1.init();
			canshowpipe = false;
			return;
		} else {
			//can not have pipe now
			return;
		}
	}
}

//function testp(arg0) {
//	if (arg0 != null) {
//		//already have pipe
//		var left = arg0.move();
//		if (left <= -pipegap) {
//			canshowpipe = true;
//		}
//		if (left <= 450) {
//			arg0.destory();
//			arg0 = null;
//		}
//	} else {
//		//no pipe
//		if (canshowpipe) {
//			//TODO random number
//			pipe1 = new Pipe(-250.5, 0);
//			pipe1.init();
//			canshowpipe = false;
//			return;
//		} else {
//			//can not have pipe now
//			return;
//		}
//	}
//}