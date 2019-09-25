$(function(){
	$('body').popTitle();		
})

$.fn.popTitle = function(){
	$('[title]', this).each(function(n, o){
		var title = $(o).attr('title');
		if(!title || title=='') return;

		$(o).attr('title', null).on({
			'mouseover':function(){
				$('#poptitle').remove();
				var poptitle = $('<div id="poptitle"></div>');
				poptitle.html(title).css({
					'position': 'absolute',
					'left': $(o).offset().left,
					'top': $(o).offset().top + $(o).outerHeight(true) + 5,
					'font-size': '12px',
					//'border': '1px #ddd solid',
					'padding': '3px 5px',
					'color': '#333',
					'background': '#fff',
					'box-shadow': '0 3px 2px #ccc'
				}).show();
				$('body').append(poptitle);
			},
			'mouseout':function(){
				$('#poptitle').remove();
			},
		})
	})
}