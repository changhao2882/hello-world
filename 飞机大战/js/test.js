//让背景动起来
var jsBg1=document.getElementById("bg1");
var jsBg2=document.getElementById("bg2");
var timerBg=setInterval(function(){
	jsBg1.style.top=jsBg1.offsetTop+1+"px";
	jsBg2.style.top=jsBg2.offsetTop+1+"px";
	if(jsBg1.offsetTop>=700){
		jsBg1.style.top=-700+"px";
	}
	if(jsBg2.offsetTop>=700){
		jsBg2.style.top=-700+"px";
	}
},10);
/*飞机拖拽*/
var jsDiv=document.getElementById("airplane");
var jsMainScreen=document.getElementById("mainScreen");
//点到的点
var baseX=0;
var baseY=0;
//移动的距离
var moveX=0;
var moveY=0;
jsDiv.addEventListener("mousedown",function(e){
	this.style.cursor = "pointer";
	var ev=e || window.event;
	baseX=ev.pageX;
	baseY=ev.pageY;
	
	jsMainScreen.onmousemove=function(e){
			var ee=e || window.event;
			moveX=ee.pageX-baseX;
			baseX=ee.pageX;
			
			moveY=ee.pageY-baseY;
			baseY=ee.pageY;
			
			jsDiv.style.left=jsDiv.offsetLeft+moveX+"px";
			jsDiv.style.top=jsDiv.offsetTop+moveY+"px";
		};
},false);
jsDiv.addEventListener("mouseup",function(e){
	//清除事件
	jsMainScreen.onmousemove=null;
},false);

//发射子弹
var timerBullent=setInterval(function(){
	//创建子弹
	var bullent=document.createElement("div");
	bullent.className="bullent";
	bullent.style.left=jsDiv.offsetLeft+16+"px";
	bullent.style.top=jsDiv.offsetTop+30+"px";
	jsMainScreen.appendChild(bullent);
	//子弹飞
	var timeBullentFly=setInterval(function(){
		bullent.style.top=bullent.offsetTop-5+"px";
		if(bullent.offsetTop<=-20){
			clearInterval(timeBullentFly);
			jsMainScreen.removeChild(bullent);
		}
	},100);
	bullent.timer=timeBullentFly;
},1000);

//敌机
var timerTank=setInterval(function(){
	//创建敌机
	var tank=document.createElement("div");
	tank.className="tank";
	tank.style.left=Math.random()*430+"px";
	tank.style.top="0px";
	jsMainScreen.appendChild(tank);
	//敌机瞎飞
	var timeTankFly=setInterval(function(){
		tank.style.top=tank.offsetTop+5+"px";
		if(tank.offsetTop>=743){
			clearInterval(timeTankFly);
			jsMainScreen.removeChild(tank);
		}
	},100);
	tank.timer=timeTankFly;
},2000);

var timerPZJC=setInterval(function(){
	var allTanks=document.getElementsByClassName("tank");
	var allBullents=document.getElementsByClassName("bullent");
	for(var i=0;i<allBullents.length;i++){
		for(var j=0;j<allTanks.length;j++){
			var b=allBullents[i];
			var t=allTanks[j]
			if (pzjcFunc(b,t)){
				console.log("111")
				clearInterval(b.timer);
				clearInterval(t.timer);
				jsMainScreen.removeChild(b);
				jsMainScreen.removeChild(t);
				break;
			}
		}
	}
},50);

//碰撞检测
function pzjcFunc(obj1,obj2){
	var obj1Left=obj1.offsetLeft;
	var obj1Width=obj1Left+obj1.offsetWidth;
	var obj1Top=obj1.offsetTop;
	var obj1Height=obj1Top+obj1.offsetHeight;
	
	var obj2Left=obj2.offsetLeft;
	var obj2Width=obj2Left+obj2.offsetWidth;
	var obj2Top=obj2.offsetTop;
	var obj2Height=obj2Top+obj2.offsetHeight;
	
	if(!(obj1Left>obj2Width||obj1Width<obj2Left||obj1Top>obj2Height||obj1Height<obj2Top)){
		return true;
	}else{
		return false;
	}
}

//死亡检测
var timerDie=setInterval(function(){
	var allTanks=document.getElementsByClassName("tank");
	for(var i=0;i<allTanks.length;i++){
		if (pzjcFunc(allTanks[i],jsDiv)){
			for(var j=0;j<100;j++){
				clearInterval(j);
			}
		}
	}
},50);