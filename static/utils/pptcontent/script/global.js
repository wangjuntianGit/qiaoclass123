var debug = false;
var edited = false;

var datepicker_locale, datetimepicker_locale = [];
datepicker_locale = {
	"format": 'YYYY-MM-DD',
	"separator": " 至 ",
	"applyLabel": "确定",
	"cancelLabel": "取消",
	'clearLabel': "清空", 	
	"fromLabel": "起始时间",
	"toLabel": "结束时间'",
	"customRangeLabel": "自定义",
	"weekLabel": "周",
	"daysOfWeek": ["日", "一", "二", "三", "四", "五", "六"],
	"monthNames": ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
	"firstDay": 1
};

Object.assign(datetimepicker_locale, datepicker_locale);
datetimepicker_locale.format = 'YYYY-MM-DD HH:mm';


if(typeof(moment) == 'function'){
	var datepicker_ranges = {
		'今天': [moment().startOf('days'), moment().endOf('days')],
		'昨天': [moment().subtract(1, 'days').startOf('days'), moment().subtract(1, 'days').endOf('days')],
		'明天': [moment().add(1, 'days').startOf('days'), moment().add(1, 'days').endOf('days')],	
		'本周': [moment().startOf('week').startOf('days'), moment().endOf('week').endOf('days')],		
		'上周': [moment().subtract(1, 'week').startOf('week').startOf('days'), moment().subtract(1, 'week').endOf('week').endOf('days')],			
		'下周': [moment().add(1, 'week').startOf('week').startOf('days'), moment().add(1, 'week').endOf('week').endOf('days')],		
		'本月': [moment().startOf('month').startOf('days'), moment().endOf('month').endOf('days')],
		'上月': [moment().subtract(1, 'month').startOf('month').startOf('days'), moment().subtract(1, 'month').endOf('month').endOf('days')],
		'下月': [moment().add(1, 'month').startOf('month').startOf('days'), moment().add(1, 'month').endOf('month').endOf('days')],	
		'今年': [moment().startOf('year').startOf('days'), moment().endOf('year').endOf('days')],
		'去年': [moment().subtract(1, 'year').startOf('year').startOf('days'), moment().subtract(1, 'year').endOf('year').endOf('days')],
		'明年': [moment().add(1, 'year').startOf('year').startOf('days'), moment().add(1, 'year').endOf('year').endOf('days')],				
	};    
} 
        
myAjax = function(action, param, method, func){
	var func = func || function(){};

	$.ajax({
		type: method,
		url : 'ajax.php?a='+action,
		data: param,
		dataType: 'json',
		success: function(json){
			switch(json.result){
				case -1:
					parent.location.href = '/';
					break;
				
				default:
					func(json);
			}
		}
	});
}

$.ajaxSetup({
	dataType: 'json',
	beforeSend:function(){
		loading && loading.show();
	},
	complete:function(){
		loading && loading.hide();	
	},
	error: function(XMLHttpRequest, textStatus, errorThrown) {
		if(!debug){
			new Toast({'message':'系统错误，请刷新后再次尝试<br />若此问题一直存在，请与系统提供商联系'}).show();
			return;
		}

		alert('status:' + XMLHttpRequest.status + '\n' +
			  'readyState:' + XMLHttpRequest.readyState + '\n' +
			  'textStatus:' + textStatus);
	}
});

Date.prototype.format = function (fmt) { //author: meizz 
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": ~~((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

String.prototype.isMoney = function(){
	return /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/.test(this);
}

getPath = function(){
	var js = window.location.pathname;
	js = js.substring(0,js.lastIndexOf("/")+1);
	return js;
}

tabSwitchTo = function(n){
	$('.tabhost li').removeClass('h').eq(n).addClass('h');
	$('.tabpanl > li').hide().eq(n).show();

	$('.page-console input').hide();
	$('.page-console input.tabhost_'+n).show();
}

upload = function(opt){
	var files = opt.files;
	var onError = opt.onError;
	var onSuccess = opt.onSuccess;
	var onProgress = opt.onProgress;
	var onStart = opt.onStart;
	var fileType = opt.fileType;
	var url = opt.url;

	if(files.length>1){
		onError && onError('只能上传一个文件');
		return;
	}

	var file = files[0];
	var err = true;

	if(!(file.type in fileType)){
		onError && onError('文件类型必须为jpg或png格式');
		return;
	}

	var fileReader = new FileReader();
	var formData = new FormData();
	formData.append("file", file);
	var xhr = new XMLHttpRequest();
	//上传文件进度条
	xhr.upload.addEventListener("progress", function(e){
		onProgress && onProgress(e)
	}, false); 

	xhr.open('post', url, true);
	xhr.onload = function(e) {
		if(e.target.readyState!=4){
			onError && onError('上传失败，请重试');
			return;
		}
		var json = JSON.parse(e.target.response);
		onSuccess && onSuccess(json);
	}
	onStart && onStart();
	xhr.send(formData);
}

var key = {};
$(function(){
	try{
		$('input.date').daterangepicker({
			singleDatePicker: true, 
			autoUpdateInput: false, 
			autoApply: false,
			showDropdowns: true,
			minDate: moment(),
			maxDate: moment().add(100, 'year'),
			alwaysShowCalendars: true,
			locale: datepicker_locale
		}, function(start, end, label) { 
			console.log('New date range selected: ' + start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD') + ' (predefined range: ' + label + ')');
		}).prop('readOnly', true);   
	}catch(e){}

	try{
		$('input.range-date').daterangepicker({
			autoUpdateInput: false, 
			autoApply: false,
			showDropdowns: true,
			alwaysShowCalendars: true,
			locale: datepicker_locale,
			ranges: datepicker_ranges
		}, function(start, end, label) { 
			console.log('New date range selected: ' + start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD') + ' (predefined range: ' + label + ')');
		}).prop('readOnly', true);   
	}catch(e){}

	try{
		$('input.range-datetime').daterangepicker({
			autoUpdateInput: false, 
			autoApply: false,
			showDropdowns: true,
			timePicker: true, //显示时间
			timePicker24Hour: true, //时间制
			alwaysShowCalendars: true,
			locale: datetimepicker_locale,
			ranges: datepicker_ranges
		}, function(start, end, label) { 
			console.log('New date range selected: ' + start.format('YYYY-MM-DD HH:mm') + ' to ' + end.format('YYYY-MM-DD HH:mm') + ' (predefined range: ' + label + ')');
		}).prop('readOnly', true);   
	}catch(e){}

	$('#search').on('submit', function(){
		var key = $(this).find('[name=k]');

		if(key.val().trim().length==0){
			new Toast(key.attr('placeholder')).show();
			key.focus();
			return false;
		}

		table.search(key.val().trim()).loadData();
		$(this).find('.btn-close').show();
		$('.btn-advsearch-show').hide();
		return false;
	}).find('.btn-close').on('click', function(){
		table.search('').loadData();
		$('.btn-advsearch-show').show();
		$(this).siblings('[name=k]').val('');
		$(this).hide();
	}).siblings('[type=text]').on('focus', function(){
		$(this).select();
	})

	$('#advsearch').on('submit', function(){
		var obj = $(this).find('input, select');
		var key = {};
		obj.each(function(n, o){
			if($(o).is('input') && $(o).attr('type')=='text'){
				if($(o).val()!='')
					key[$(o).attr('name')] = $(o).val();
			}else if($(o).is('select') && $(o).val()!='')
				key[$(o).attr('name')] = $(o).val();
		
		})

		if($.isEmptyObject(key)){
			new Toast('请至少填写或选择一个搜索项').show();
			return false;
		}
		table.advSearch(JSON.stringify(key)).loadData();
		return false;
	}).find('.btn-icon-close').on('click', function(){
		//table.search('').loadData();
	}).parents('form').find('[type=text]').on('focus', function(){
		$(this).select();
	})

	if(!$.isEmptyObject(key)) $('.btn-advsearch-show').click();

	$('.btn-advsearch-show, .btn-advsearch-hide').on('click', function(){
		if($('.advsearch').is(':visible') && table.getSearchState())
			table.advSearch('').loadData();

		$('.btn-advsearch-show').css('display', !$('.advsearch').is(':visible') ?'none':'block');
		$('#search').css('display', !$('.advsearch').is(':visible')?'none':'flex');

		$('.advsearch').slideToggle(200);
	})

	$('.page-title .dialogclose').on('click', function(){
		if(edited){
			parent.parent.$.dialog({
				title:'提示', 
				innerHTML:'当前页面内容已修改，关闭后本次修改内容将丢失，是否继续？', 
				onConfirm:function(){
					parent.dialog.close();
				}
			});
			return;
		}

		parent.dialog.close();
	});

	$('input, select').on('change', function(){ edited = true })

	$('#advsearch > div.form > div > label').on('click', function(){
		$(this).next().focus();
	})
})

