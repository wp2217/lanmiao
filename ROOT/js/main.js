
$(document).ready(function() {
	var date = new Date();
	var time = date.getTime(); // 返回毫秒数
	var time_t = time;
	var week_now = date.getDay();
	
	var date_sel = 0;  //用户选择的日期
	var type_sel = ''; //用户选择的类型
	var flag_io = 0;   //收入 or 支出
	var jin = 0; //是否医疗保险报销
	
	Messenger.options = {
		parentLocations : [ 'body' ],
		extraClasses : 'messenger-fixed  messenger-on-bottom',
		theme : 'flat'
	};

	var msg = Messenger().post("initial msg");
	msg.hide();
	//$("#desc").focus();
	
	$("#desc").on("blur", function(){
		var val = $("#desc").val().trim();
		if(val.length != 0){
			type_sel = '';
			var re_yi = new RegExp("衣+|袜+|鞋+|帽+|裤+|衬衫+","g");
			var re_shi = new RegExp("餐+|饭+|吃+|食+|鸡+|鸭+|鱼+|肉+|菜+|米+|馒头+|奶茶+","g");
			var re_zhu = new RegExp("住+|旅社+|旅馆+|酒店+","g");
			var re_xing = new RegExp("车+|打的+|机票+|船+","g");
			var re_sg = new RegExp("瓜+|香蕉+|菠萝+|桃+|梨+|苹果+|草莓+|橙+|葡萄+|荔枝+|水果+","g");
			var re_wl = new RegExp("游+|山+|门票+|电影+|欢乐谷+|迪斯尼+","g");
			var re_dz = new RegExp("贴膜+|手机+|pad+|电脑+|电子+","g");
			var re_yy = new RegExp("病+|药+|医+","g");
			var re_cw = new RegExp("猫+|狗+|鼠+|鸟+","g");
			
			$(".thumbnail").removeClass("box_select");
			
			switch (true) {
			case re_yi.test(val):
				$("#yi").addClass("box_select");
		        type_sel = "衣";
				break;
			
			case re_shi.test(val):
				$("#shi").addClass("box_select");
			    type_sel = "食";
				break;
				
			case re_zhu.test(val):
				$("#zhu").addClass("box_select");
		        type_sel = "住";
				break;
			
			case re_xing.test(val):
				$("#xing").addClass("box_select");
			    type_sel = "行";
				break;
				
			case re_sg.test(val):
				$("#sg").addClass("box_select");
		        type_sel = "水果";
				break;
			
			case re_wl.test(val):
				$("#wl").addClass("box_select");
			    type_sel = "玩乐";
				break;
				
			case re_dz.test(val):
				$("#dz").addClass("box_select");
		        type_sel = "电子";
				break;
			
			case re_yy.test(val):
				$("#yy").addClass("box_select");
			    type_sel = "医药";
			    $('#myModal').modal('show');
				break;
				
			case re_cw.test(val):
				$("#cw").addClass("box_select");
			    type_sel = "宠物";
				break;

			default:
				type_sel = "";
				break;
			}
			
			
		}
		
	});
	
	date_sel = setLeftMenue(time, week_now, time_t);
	//只能输入数字
	$(function () {
		$.fn.numeral = function () {
		        $(this).css("ime-mode", "disabled");
		        this.bind("keypress", function (e) {
		        	msg.hide();
		            var code = (e.keyCode ? e.keyCode : e.which);  //兼容火狐 IE   
		           		        
		            if($.hasOwnProperty("browser")){
		            	if (!$.browser.msie && (e.keyCode == 0x8))  //火狐下 不能使用退格键  
			            {
			                return;
			            }
		            }
		            
		            return code >= 48 && code <= 57 || code == 46;
		        });
		        this.bind("blur", function () {
		            if (this.value.lastIndexOf(".") == (this.value.length - 1)) {
		                this.value = this.value.substr(0, this.value.length - 1);
		            } else if (isNaN(this.value)) {
		                this.value = " ";
		            } 
		        });
		        this.bind("paste", function () {
		            var s = clipboardData.getData('text');
		            if (!/\D/.test(s));
		            value = s.replace(/^0*/, '');
		            return false;
		        });
		        this.bind("dragenter", function () {
		            return false;
		        });
		        this.bind("keyup", function () {
		            this.value = this.value.replace(/[^\d.]/g, "");
		            //必须保证第一个为数字而不是.
		            this.value = this.value.replace(/^\./g, "");
		            //保证只有出现一个.而没有多个.
		            this.value = this.value.replace(/\.{2,}/g, ".");
		            //保证.只出现一次，而不能出现两次以上
		            this.value = this.value.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
		        });
		    };
		    $("#mount").numeral();
		});
	
	//获取选择的种类
	$("#outcome").on("click","a", {type_sel: type_sel, flag_io:flag_io}, function(event){
		
		type_sel = $(this).html().trim();
		flag_io = 0;
		
	});
	
	$("#income").on("click","a", {type_sel: type_sel, flag_io:flag_io}, function(event){
		type_sel = $(this).html().trim();
		flag_io = 1;
	});
	
	$("a").on("click", function(event) {

		msg.hide();
		$(this).parent("li").siblings().removeClass("active");
		$(this).parent("li").addClass("active");

		$(".thumbnail").removeClass("box_select");
		$(this).filter(".thumbnail").addClass("box_select");
		

		//获取选择的日期
		if($(this).attr("id") === "week1"){
			  date_sel = 0;
			  date_sel = getSelectDate($(this).text());
			  type_sel = ''; //用户选择的类型
			  
			  return;
			
		}
		//获取选择的日期
		if($(this).attr("id") === "week2"){
			  date_sel = 0;
			  date_sel = getSelectDate($(this).text());
			  type_sel = ''; //用户选择的类型
			  
			  return;
			
		}	
		//获取选择的日期
		if($(this).attr("id") === "week3"){
			  date_sel = 0;
			  date_sel = getSelectDate($(this).text());
			  type_sel = ''; //用户选择的类型
			  
			  return;
			
		}
		//获取选择的日期
		if($(this).attr("id") === "week4"){
			  date_sel = 0;
			  date_sel = getSelectDate($(this).text());
			  type_sel = ''; //用户选择的类型
			  
			  return;
			
		}
		//获取选择的日期
		if($(this).attr("id") === "week5"){
			  date_sel = 0;
			  date_sel = getSelectDate($(this).text());
			  type_sel = ''; //用户选择的类型
			  
			  return;
			
		}	
		//获取选择的日期
		if($(this).attr("id") === "week6"){
			  date_sel = 0;
			  date_sel = getSelectDate($(this).text());
			  type_sel = ''; //用户选择的类型
			  
			  return;
			
		}
		//获取选择的日期
		if($(this).attr("id") === "week7"){
			  date_sel = 0;
			  date_sel = getSelectDate($(this).text());
			  type_sel = ''; //用户选择的类型
			  
			  return;
			
		}
		
		if($(this).attr("id") === "pre_week"){
			time = time - 7 * 86400000;
			date_sel = setLeftMenue(time, week_now, time_t);
			type_sel = ''; //用户选择的类型
			return;
		}
		
		if($(this).attr("id") === "nex_week"){
			time = time + 7 * 86400000;
			date_sel = setLeftMenue(time, week_now, time_t);
			type_sel = ''; //用户选择的类型
			return;
		}	
		
	});
	
	$("#modal_yes").on("click", function(){
		jin = 1;
		$('#myModal').modal('hide');
	});
	
	$("#modal_no").on("click", function(){
		jin = 0;
	});	
	
	$(document).keydown(function(event){ 
		   if (event.keyCode === 13) {
			   addOneRecord();
			   return false; //必须加return false才能显示message 不知为啥
		   }
		   
	});
	
	//ajax 提交
	$("#addone").on("click", function(){
		addOneRecord();
	});
	
	function addOneRecord(){
		
		var mount = $("#mount").val();
		
		if(isNaN(date_sel)){
			alert_msg(msg, "error", "请选择记账日期");
			return;
		};
		
		if(mount.length === 0){
			alert_msg(msg, "error", "请输入支出或收入金额");
			$("#mount").focus();
			return;
		};
		
		if(mount <= 0){
			alert_msg(msg, "error", "请输入大于零的金额");
			$("#mount").focus();
			return;
		};
		
		if(type_sel.length === 0){
			alert_msg(msg, "error", "请选择支出或收入类别");
			return;
		};
		
		$("#addone").attr("disabled", "disabled");
		
		$.ajax({
			url : "JiZhang.me",

			data : {
				mount: mount,
				type: type_sel,
				date: date_sel,
				io: flag_io,
				jin: jin,
				desc: $("#desc").val()
			},

			type : "POST",
			dataType : "JSON",
			
			success : function(json) {
				
				if (json === 1) {
					alert_msg(msg, "error", "记账失败，请刷新重试，或者反馈<a href='http://lanmiao.me/help.jsp#title4' target = '_blank'> @懒喵</a>");
				}else{
					alert_msg(msg, "success", "OK， 已记账");
					$("#desc").val('');
					$("#mount").val('');
					type_sel = '';
					jin = 0;
					refresh_table(date_sel);
					
				}
			},
			
			error : function(xhr, status) {
				alert_msg(msg, "error","请刷新重试，或者反馈<a href='http://lanmiao.me/help.jsp#title4' target = '_blank'> @懒喵</a>");
			},
			
			complete: function( xhr, status ) {
				$("#addone").removeAttr("disabled");
		    }
		});	
		
	};

});

function alert_msg(i_msg, i_type, i_text) {
	i_msg.update({
		message : i_text,
		type : i_type
	});
};

function calDate(i_time, i_count, i_flag) {
	var date;
	var r_date;

	if (i_flag === 0) {
		date = i_time - i_count * 86400000;
	} else {
		date = i_time + i_count * 86400000;
	}
	;

	date = new Date(date);

	var year_now = date.getFullYear();
	var mon_now = date.getMonth() + 1;
	var day_now = date.getDate();
	
	if (mon_now < 10) {  //补零处理
		mon_now = '' + '0' + mon_now;
	}
	if (day_now < 10) {  //补零处理
		day_now = '' + '0' + day_now;
	}

	r_date = year_now + "-" + mon_now  + "-" + day_now;

	return r_date;
}

function getSelectDate(i_text){
	var index_s = i_text.search('2');
	var index_e = i_text.search(']');
	var date = i_text.substring(index_s, index_e);
	    date = date.replace('-','');
	    date = date.replace('-','');
	refresh_table(date);
    return date;
	
}


function setLeftMenue(i_time, i_week_now, i_time_t){
	
	switch (i_week_now) {
	case 1:
		$("#week1").text("周一[" + calDate(i_time, 0, 0) + "]");
		$("#week2").text("周二[" + calDate(i_time, 1, 1) + "]");
		$("#week3").text("周三[" + calDate(i_time, 2, 1) + "]");
		$("#week4").text("周四[" + calDate(i_time, 3, 1) + "]");
		$("#week5").text("周五[" + calDate(i_time, 4, 1) + "]");
		$("#week6").text("周六[" + calDate(i_time, 5, 1) + "]");
		$("#week7").text("周日[" + calDate(i_time, 6, 1) + "]");
		if(i_time===i_time_t){
			$("#week1").parent("li").addClass("active"); 
			return getSelectDate($("#week1").text());
		}
		break;

	case 2:
		$("#week1").text("周一[" + calDate(i_time, 1, 0) + "]");
		$("#week2").text("周二[" + calDate(i_time, 0, 0) + "]");
		$("#week3").text("周三[" + calDate(i_time, 1, 1) + "]");
		$("#week4").text("周四[" + calDate(i_time, 2, 1) + "]");
		$("#week5").text("周五[" + calDate(i_time, 3, 1) + "]");
		$("#week6").text("周六[" + calDate(i_time, 4, 1) + "]");
		$("#week7").text("周日[" + calDate(i_time, 5, 1) + "]");
		if(i_time===i_time_t){
			$("#week2").parent("li").addClass("active"); 
			return getSelectDate($("#week2").text());
		}
		break;

	case 3:
		$("#week1").text("周一[" + calDate(i_time, 2, 0) + "]");
		$("#week2").text("周二[" + calDate(i_time, 1, 0) + "]");
		$("#week3").text("周三[" + calDate(i_time, 0, 0) + "]");
		$("#week4").text("周四[" + calDate(i_time, 1, 1) + "]");
		$("#week5").text("周五[" + calDate(i_time, 2, 1) + "]");
		$("#week6").text("周六[" + calDate(i_time, 3, 1) + "]");
		$("#week7").text("周日[" + calDate(i_time, 4, 1) + "]");
		if(i_time===i_time_t){
			$("#week3").parent("li").addClass("active"); 
			return getSelectDate($("#week3").text());
		}
		break;
	case 4:

		$("#week1").text("周一[" + calDate(i_time, 3, 0) + "]");
		$("#week2").text("周二[" + calDate(i_time, 2, 0) + "]");
		$("#week3").text("周三[" + calDate(i_time, 1, 0) + "]");
		$("#week4").text("周四[" + calDate(i_time, 0, 0) + "]");
		$("#week5").text("周五[" + calDate(i_time, 1, 1) + "]");
		$("#week6").text("周六[" + calDate(i_time, 2, 1) + "]");
		$("#week7").text("周日[" + calDate(i_time, 3, 1) + "]");
		if(i_time===i_time_t){
			$("#week4").parent("li").addClass("active"); 			
		    return getSelectDate($("#week4").text());
		}
		break;		

	case 5:
		$("#week1").text("周一[" + calDate(i_time, 4, 0) + "]");
		$("#week2").text("周二[" + calDate(i_time, 3, 0) + "]");
		$("#week3").text("周三[" + calDate(i_time, 2, 0) + "]");
		$("#week4").text("周四[" + calDate(i_time, 1, 0) + "]");
		$("#week5").text("周五[" + calDate(i_time, 0, 0) + "]");
		$("#week6").text("周六[" + calDate(i_time, 1, 1) + "]");
		$("#week7").text("周日[" + calDate(i_time, 2, 1) + "]");
		if(i_time===i_time_t){
			$("#week5").parent("li").addClass("active"); 
			return getSelectDate($("#week5").text());
		}
		break;
		
	case 6:
		$("#week1").text("周一[" + calDate(i_time, 5, 0) + "]");
		$("#week2").text("周二[" + calDate(i_time, 4, 0) + "]");
		$("#week3").text("周三[" + calDate(i_time, 3, 0) + "]");
		$("#week4").text("周四[" + calDate(i_time, 2, 0) + "]");
		$("#week5").text("周五[" + calDate(i_time, 1, 0) + "]");
		$("#week6").text("周六[" + calDate(i_time, 0, 0) + "]");
		$("#week7").text("周日[" + calDate(i_time, 1, 1) + "]");
		if(i_time===i_time_t){
			$("#week6").parent("li").addClass("active"); 
			return getSelectDate($("#week6").text());
		}
		break;
		
	case 0:
		$("#week1").text("周一[" + calDate(i_time, 6, 0) + "]");
		$("#week2").text("周二[" + calDate(i_time, 5, 0) + "]");
		$("#week3").text("周三[" + calDate(i_time, 4, 0) + "]");
		$("#week4").text("周四[" + calDate(i_time, 3, 0) + "]");
		$("#week5").text("周五[" + calDate(i_time, 2, 0) + "]");
		$("#week6").text("周六[" + calDate(i_time, 1, 0) + "]");
		$("#week7").text("周日[" + calDate(i_time, 0, 0) + "]");
		if(i_time===i_time_t){
			$("#week7").parent("li").addClass("active"); 
			return getSelectDate($("#week7").text());
		}
		break;		

	}
}

//table数据的显示
function refresh_table(i_date){
	var msg = Messenger().post("initial msg");
	msg.hide();
   
	$("tbody tr:not(:first)").remove();
	
	$.ajax({
		url : "JiZhang.me",
		cache : false,
		data : {
			date: i_date
		},

		type : "GET",
		dataType : "JSON",
		
		success : function(json) {
			
			var flag_img = null;
			
			$.each(json, function (i, e) {
			  var obj = $.parseJSON(e);
			  if (obj.type.lastIndexOf('1') != '-1') {
				obj.type = obj.type.replace('1', '[医保报销]');
			  }
			  
			  if (obj.flag === '0') {
				  flag_img = "<span class='glyphicon glyphicon-export' style='color: red;font-size: 10px'></span>";
			   }else{
				  flag_img = "<span class='glyphicon glyphicon-import' style='color: blue;font-size: 10px'></span>";
			  }
			  
			  var newRow = "<tr class='success'><td>" + flag_img + "</td><td>" + obj.type + "</td><td>" + obj.value + "</td><td>" + obj.text + "</td>" +
			  		"<td>&nbsp;&nbsp;" +
			  		"<a onclick='deleteMe(" + obj.id + "," + obj.flag + "," + i_date +")'><span class='glyphicon glyphicon-trash'></span></a></td></tr>";
			  
			  $("tbody tr:last").after(newRow);
			  
			});
		},
		
		error : function(xhr, status) {
			alert_msg(msg, "error","请刷新重试，或者反馈<a href='http://lanmiao.me/help.jsp#title4' target = '_blank'> @懒喵</a>");
		},
	});	
}

function deleteMe(i_id, i_flag, i_date){
	var msg = Messenger().post("initial msg");
	msg.hide();
	
	$.ajax({
		url : "delete.me",

		data : {
			id: i_id,
			io: i_flag
		},

		type : "POST",
		dataType : "JSON",
		
		success : function(json) {
			if (json === 1) {
				alert_msg(msg, "error", "删除失败，请刷新重试，或者反馈<a href='http://lanmiao.me/help.jsp#title4' target = '_blank'> @懒喵</a>");
				
			}else{
				alert_msg(msg, "success", "OK， 已删除");
				refresh_table(i_date);
				
			};
		},
		
		error : function(xhr, status) {
			alert_msg(msg, "error","请刷新重试，或者反馈<a href='http://lanmiao.me/help.jsp#title4' target = '_blank'> @懒喵</a>");
		}
	});	
	
};