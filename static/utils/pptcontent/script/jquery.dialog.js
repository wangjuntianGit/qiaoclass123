/*!
 * jQuery 对话框
 * author: 阿智
 * QQ: 13994912
 * version: 0.1.3 (06/11/2017)
 * @requires jQuery v1.5 or later
 *
 * 更多例子和文档请登陆 http://www.azhi.net.cn
 * 您可以自由传播和使用，但请保留此版权信息
 * 
 * $.dialog(option);
 * $(obj).dialog(option);
 * 
 * ===========================================
 * 06/11/2017 v0.1.3 加大关闭按钮感应区
 * 10/15/2016 v0.1.2 增加二次加载处理
 * 10/16/2015 v0.1.1 支持title参数为空时，不带标题栏模式
 *
 * 05/13/2015 v0.1.0
 *           
 * ===========================================
 */

$.dialog = function(opt){
	var _this = this;
	var _url = opt.href;
	var _html = opt.innerHTML;
	var _htmlCSS = opt.innerHTMLCSS || {};
	var _animateTime = opt.animateTime || 200;
	var _width = opt.width || 320;
	var _height = opt.height || 180;
	if(_height.toString().indexOf('%') ==_height.length-1)
		_height = parseInt($('body').height() * _height.substr(0, _height.length - 1) / 100);
	var _title = opt.title || '';
	var _borderColor = opt.borderColor || '#666';
	var _borderWidth = opt.borderWidth || 3;
	var _borderRadius = opt.borderRadius || 0;
	var _onConfirm = opt.onConfirm;
	var _onCancel = opt.onCancel;
	var _onClose = opt.onClose;

	var div = $('<div id="dialog"><div class="dialogbox"></div></div>');
	if (_title!=''){
		$(div).find('.dialogbox')
			.append('<div class="dialogtitle"><label>'+_title+'</label><div class="dialogclose"></div>');
	}
	$(div).css({
		'position': 'fixed',
		'left': '0',
		'top': '0',
		'right': '0',
		'bottom': '0',
		'background': 'rgba(0,0,0,0)',
		'z-index': '1000',
		'display': 'flex',
		'align-items': 'center',
		'justify-content': 'center',
	}).find('.dialogbox').css({
		'background': '#fff',
		'border': _borderWidth + ' solid '+_borderColor,
		'border-radius': _borderRadius,
		'width': _width,
		'height': _height,
		'zoom': '.3',
		'opacity': 0,
		'display': 'flex',
		'flex-direction': 'column',
		'justify-content': 'center',
	});


	if (_url)
		$(div).find('.dialogbox').append('<iframe style="border:0; width:100%; height:'+(parseInt(_height)-(_title!=''? 38: 0))+'px" src="'+_url+'"></iframe>');
	else if(_html)
		$(div).find('.dialogbox').append('<div class="dialogbody">'+_html+'</div><div class="dialogfooter"><input type="button" class="cancel" value="取消" /><input type="button" class="default" value="确定" /></div>');
	$('body').append(div);

	$(div).find('.dialogclose').on('click', function(){
		_onCancel && _onCancel();
		_onClose && _onClose();
		_this.close();
	});
	
	$(div).find('.dialogfooter input').on('click', function(){
		$(this).hasClass('default') && _onConfirm && _onConfirm();

		_onClose && _onClose();		
		_this.close();
	})

	$(div).animate({'background-color': 'rgba(0,0,0,.6)'}, _animateTime);
	$(div).find('.dialogbox').animate({'zoom': 1, 'opacity': 1}, _animateTime);

	this.close = function(){
		$(div).animate({'background-color': 'rgba(0,0,0,0)'}, 200, function(){
			$(this).remove();
		});
		$(div).find('.dialogbox').animate({'zoom': .3, 'opacity': 0}, 200);
	}

	return this;
}



$.fn.dialog = function(opt){
	$(this).on('click', function(){
		opt.href = $(this).attr('href') || opt.href;
		$.dialog(opt);
		return false;
	});
}
