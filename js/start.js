window.onload = function() {
	window.resizeTo(300,300);
	window.moveTo(50,50);
	gamewindow = window.open("game.html", "飞翔的王庆v1.0", "location=no,status=no,scrollbars=no,width=500,height=600");
	gamewindow.moveTo(0, 0);
	window.close();
}