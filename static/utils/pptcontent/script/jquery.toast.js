/**
 * 模仿android里面的Toast效果，主要是用于在不打断程序正常执行的情况下显示提示数据
 * @param config
 * @return
 */
var Toast = function(config){
	this.context = config.context || $('body');//上下文
	this.message = (typeof(config)=='string'? config : config.message);//显示内容
	this.time = config.time==null?2000:config.time;//持续时间
	this.left = config.left;//距容器左边的距离
	this.top = config.top;//距容器上方的距离
	this.width = config.width;//距容器上方的距离
	this.init();
}

var msgEntity;
var timer;
Toast.prototype = {
	//初始化显示的位置内容等
	init : function(){
		$("#toastMessage").remove();
		//设置消息体
		var msgDIV = new Array();
		msgDIV.push('<div id="toastMessage">');
		msgDIV.push('<span>'+this.message+'</span>');
		msgDIV.push('</div>');
		msgEntity = $(msgDIV.join('')).appendTo(this.context);
		//设置消息样式
		msgEntity.css({
			'display':'none',
			'text-align':'center',
			'border-radius':'10px',
			'bottom':'100px',
			'max-width':'90%',
			'position':'fixed',
			'z-index':'99',
			'background-color':'rgba(0,0,0,.7)',
		    'color':'white',
			'font-size':'18px',
			'left': left,
			'padding':'20px 40px'
			});
		var left = this.context.width()/2-$(msgEntity).outerWidth()/2;
		msgEntity.css('left', left);
	},

	//显示动画
	show :function(){
		clearTimeout(timer);
		msgEntity.fadeIn(200);
		timer = setTimeout(function(){ msgEntity.fadeOut(200) }, this.time);
	}
		
}