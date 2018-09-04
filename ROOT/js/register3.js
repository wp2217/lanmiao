$(document).ready(function() {

	Messenger.options = {
		parentLocations : ['.form-signin-heading'],
		extraClasses : 'messenger-fixed  messenger-on-top',
		theme : 'flat'
	};

	var wuyi_flg = true; //初始化无五一
	var msg = Messenger().post("initial msg");
    msg.hide();
	
	$("#city").on("change", function(event){
		switch (this.value) {
		case '1': //北京
			$("#citydesc").val("北京");
			$("#citydescDiv").attr("hidden", "hidden");
			$("#gjin1").val(12);
			$("#jin1").val(12);
			$("#gjin2").val(20);
			$("#jin2").val(8);
			$("#gjin3").val(10);
			$("#jin3").val(2);
			$("#gjin4").val(1);
			$("#jin4").val(0.2);
			$("#gjin5").val(0.5);
			$("#jin5").val(0);
			$("#gjin6").val(0.8);
			$("#jin6").val(0);
			break;
		case '2'://上海
			$("#citydesc").val("上海");
			$("#citydescDiv").attr("hidden", "hidden");
			$("#gjin1").val(7);
			$("#jin1").val(7);
			$("#gjin2").val(21);
			$("#jin2").val(8);
			$("#gjin3").val(11);
			$("#jin3").val(2);
			$("#gjin4").val(1.5);
			$("#jin4").val(0.5);
			$("#gjin5").val(0.5);
			$("#jin5").val(0);
			$("#gjin6").val(1);
			$("#jin6").val(0);
			break;
		case '3'://广州
			$("#citydesc").val("广州");
			$("#citydescDiv").attr("hidden", "hidden");
			$("#gjin1").val(8);
			$("#jin1").val(8);
			$("#gjin2").val(12);
			$("#jin2").val(8);
			$("#gjin3").val(8);
			$("#jin3").val(2);
			$("#gjin4").val(1.5);
			$("#jin4").val(0.5);
			$("#gjin5").val(0.5);
			$("#jin5").val(0);
			$("#gjin6").val(0.85);
			$("#jin6").val(0);
			break;
		case '4'://深圳
			$("#citydesc").val("深圳");
			$("#citydescDiv").attr("hidden", "hidden");
			$("#gjin1").val(13);
			$("#jin1").val(13);
			$("#gjin2").val(11);
			$("#jin2").val(8);
			$("#gjin3").val(4.5);
			$("#jin3").val(2);
			$("#gjin4").val(2);
			$("#jin4").val(1);
			$("#gjin5").val(0.8);
			$("#jin5").val(0);
			$("#gjin6").val(0.5);
			$("#jin6").val(0);
			break;
		case '5'://天津
			$("#citydesc").val("天津");
			$("#citydescDiv").attr("hidden", "hidden");
			$("#gjin1").val(11);
			$("#jin1").val(11);
			$("#gjin2").val(20);
			$("#jin2").val(8);
			$("#gjin3").val(10);
			$("#jin3").val(2);
			$("#gjin4").val(2);
			$("#jin4").val(1);
			$("#gjin5").val(0.5);
			$("#jin5").val(0);
			$("#gjin6").val(0.8);
			$("#jin6").val(0);
			break;
		case '6'://其它
			$("#citydesc").val("");
			$("#citydescDiv").removeAttr("hidden");
			$("#gjin1").val(8);
			$("#jin1").val(8);
			$("#gjin2").val(20);
			$("#jin2").val(8);
			$("#gjin3").val(10);
			$("#jin3").val(2);
			$("#gjin4").val(1);
			$("#jin4").val(1);
			$("#gjin5").val(0.5);
			$("#jin5").val(0);
			$("#gjin6").val(0.5);
			$("#jin6").val(0);
			break;
		case '0'://默认
			$("#citydesc").val("无");
			$("#citydescDiv").attr("hidden", "hidden");
			$("#jin1").val(null);
			$("#gjin1").val(null);
			$("#jin2").val(null);
			$("#gjin2").val(null);
			$("#jin3").val(null);
			$("#gjin3").val(null);
			$("#jin4").val(null);
			$("#gjin4").val(null);
			$("#jin5").val(null);
			$("#gjin5").val(null);
			$("#jin6").val(null);
			$("#gjin6").val(null);
			break;
		default:
			break;
		}
		
		$("#jin1").next().text('%');
		$("#gjin1").next().text('%');
		$("#jin2").next().text('%');
		$("#gjin2").next().text('%');
		$("#jin3").next().text('%');
		$("#gjin3").next().text('%');
		$("#jin4").next().text('%');
		$("#gjin4").next().text('%');
		$("#jin5").next().text('%');
		$("#gjin5").next().text('%');
		$("#jin6").next().text('%');
		$("#gjin6").next().text('%');
		$("#sum_dw").val(null);
	    $("#sum_gr").val(null);
	    $("#cmoney").val(null);
	    $("#finalsalary").val(null);
	});
	
	$("#salary").on("input", function(event){
		$("#sbjs").val(this.value.trim());
		$("#gjjjs").val(this.value.trim());
		
	});
	
	
	$("#auto_js").on("click", function(event){
		msg.hide();
		var salary = $("#salary").val().trim();
		var zdate = $("#zdate").val().trim();
		var sbjs = $("#sbjs").val().trim(); //社保基数
		var gjjjs = $("#gjjjs").val().trim();//公积金基数
		var city = $("#city").val();
		var citydesc = $("#citydesc").val().trim();
		
		wuyi_flg = true;//表示有五一
		
		if (salary.length === 0) {
			event.preventDefault();
			msg.update({
				message : "请输入税前薪资",
				type : "error",
				actions: null
			});
			//$("#salary").focus();
			return;
		}
		
		if (city === '0') {
			event.preventDefault();
			msg.update({
				message : "请选择五险一金缴纳城市",
				type : "error",
				actions: null
			});	
			return;
		}
		
		if(citydesc.length === 0){
			msg.update({
				message : "请输入[城市名]",
				type : "error",
				actions: null
			});
			
			//$("#citydesc").focus();
			return;
		}
		
		if (zdate.length == '0') {
			event.preventDefault();
			msg.update({
				message : "请选择当前工作五险一金缴纳起始年月",
				type : "error",
				actions: null
			});	
			return;
		}
		
		if ($("#sbjs").val().trim().length == 0 || $("#gjjjs").val().trim().length == 0) {
			msg.update({
				message : "请输入社保及公积金缴纳基数",
				type : "error",
				actions: null
			});
			
			return;
		}
		
		if(!checkNumber(msg, sbjs, $("#sbjs"))){
			return;
		};
		if(!checkNumber(msg, gjjjs, $("#gjjjs"))){
			return;
		};
        
        var jin1 = parseInt($("#jin1").val().trim() / 100 * gjjjs);
        var jin2 = parseInt($("#jin2").val().trim() / 100 * sbjs);
        var jin3 = parseInt($("#jin3").val().trim() / 100 * sbjs);
        var jin4 = parseInt($("#jin4").val().trim() / 100 * sbjs);
        var jin5 = parseInt($("#jin5").val().trim() / 100 * sbjs);
        var jin6 = parseInt($("#jin6").val().trim() / 100 * sbjs);
        var gjin1 = parseInt($("#gjin1").val().trim() / 100 * gjjjs);
        var gjin2 = parseInt($("#gjin2").val().trim() / 100 * sbjs);
        var gjin3 = parseInt($("#gjin3").val().trim() / 100 * sbjs);
        var gjin4 = parseInt($("#gjin4").val().trim() / 100 * sbjs);
        var gjin5 = parseInt($("#gjin5").val().trim() / 100 * sbjs);
        var gjin6 = parseInt($("#gjin6").val().trim() / 100 * sbjs);
        var sum_gr = jin1 + jin2 + jin3 + jin4 + jin5 + jin6;
        var sum_dw = gjin1 + gjin2 + gjin3 + gjin4 + gjin5 + gjin6;            
        var sde = salary - sum_gr - 3500; //应纳税所得额
        var cmoney = null; //税负
        
        if (sde <= 1500 && sde > 0) {//税后薪资计算逻辑
			cmoney = sde * 0.03;
		}else if(sde <= 4500 && sde > 1500 ){
			cmoney = sde * 0.1 - 105;
		}else if(sde <= 9000 && sde > 4500 ){
			cmoney = sde * 0.2 - 555;
		}else if(sde <= 35000 && sde > 9000 ){
			cmoney = sde * 0.25 - 1005;
		}else if(sde <= 55000 && sde > 35000 ){
			cmoney = sde * 0.3 - 2775;
		}else if(sde <= 80000 && sde > 55000 ){
			cmoney = sde * 0.35 - 5505;
		}else if(sde > 80000 ){
			cmoney = sde * 0.45 - 13505;
		}
        
        cmoney = parseInt(cmoney * 10000) / 10000;
        
        $("#jin1").next().text('% ￥' + jin1);
        $("#jin2").next().text('% ￥' + jin2);
        $("#jin3").next().text('% ￥' + jin3);
        $("#jin4").next().text('% ￥' + jin4);
        $("#jin5").next().text('% ￥' + jin5);
        $("#jin6").next().text('% ￥' + jin6);
        $("#gjin1").next().text('% ￥' + gjin1);
        $("#gjin2").next().text('% ￥' + gjin2);
        $("#gjin3").next().text('% ￥' + gjin3);
        $("#gjin4").next().text('% ￥' + gjin4);
        $("#gjin5").next().text('% ￥' + gjin5);
        $("#gjin6").next().text('% ￥' + gjin6);
        
        $("#sum_dw").val('￥' + sum_dw);
        $("#sum_gr").val('￥' + sum_gr);
        $("#cmoney").val(cmoney);
        $("#finalsalary").val(salary - sum_gr - cmoney);
	});
	
	
	$("input").on("blur", function(event){
		event.stopPropagation();
		checkNumber(msg, this.value.trim(), this);

	});
	
	$("#no_wuyi").on("click", function(event){
		
		msg.hide();
        var salary = $("#salary").val().trim();
		
		if (salary.length === 0) {
			event.preventDefault();
			msg.update({
				message : "请输入税前薪资",
				type : "error",
				actions: null
			});
			//$("#salary").focus();
			return;
		}
		
        $("#citydesc").val("无");
		$("#citydescDiv").attr("hidden", "hidden");
		
		if (wuyi_flg) {
			
			var sde = salary - 3500;
			var cmoney = 0;
			
			if (sde <= 1500 && sde > 0) {//税后薪资计算逻辑
				cmoney = sde * 0.03;
			}else if(sde <= 4500 && sde > 1500 ){
				cmoney = sde * 0.1 - 105;
			}else if(sde <= 9000 && sde > 4500 ){
				cmoney = sde * 0.2 - 555;
			}else if(sde <= 35000 && sde > 9000 ){
				cmoney = sde * 0.25 - 1005;
			}else if(sde <= 55000 && sde > 35000 ){
				cmoney = sde * 0.3 - 2775;
			}else if(sde <= 80000 && sde > 55000 ){
				cmoney = sde * 0.35 - 5505;
			}else if(sde > 80000 ){
				cmoney = sde * 0.45 - 13505;
			}
		        
		    cmoney = parseInt(cmoney * 10000) / 10000;
		    $("#finalsalary").val(salary - cmoney);
		    $("#cmoney").val(cmoney);
			$("#jin").val(0);
			$("#no_wuyi").text("有五险一金");
			$("#zdate").val(null);
			$("#jin1").val(null);
			$("#gjin1").val(null);
			$("#jin2").val(null);
			$("#gjin2").val(null);
			$("#jin3").val(null);
			$("#gjin3").val(null);
			$("#jin4").val(null);
			$("#gjin4").val(null);
			$("#jin5").val(null);
			$("#gjin5").val(null);
			$("#jin6").val(null);
			$("#gjin6").val(null);
			$("#sbjs").val(null);
			$("#gjjjs").val(null);
			$("#jin1").next().text('%');
			$("#gjin1").next().text('%');
			$("#jin2").next().text('%');
			$("#gjin2").next().text('%');
			$("#jin3").next().text('%');
			$("#gjin3").next().text('%');
			$("#jin4").next().text('%');
			$("#gjin4").next().text('%');
			$("#jin5").next().text('%');
			$("#gjin5").next().text('%');
			$("#jin6").next().text('%');
			$("#gjin6").next().text('%');
			$("#sum_dw").val(null);
		    $("#sum_gr").val(null);
	    	$("#city").val(0);
	    	$("#city").attr("disabled", "disabled");
	    	$("#zdate").attr("disabled", "disabled");
	    	$("#auto_js").attr("disabled", "disabled");
			$("#jnjs").find("input").attr("disabled", "disabled");
			$("#wuyi").find("input").attr("disabled", "disabled");
			wuyi_flg = false;
		}else{
			$("#jin").val(1);
			$("#no_wuyi").text("无五险一金");
			$("#sbjs").val(salary);
			$("#gjjjs").val(salary);
		    $("#cmoney").val(null);
		    $("#finalsalary").val(null);
			$("#city").removeAttr("disabled");
			$("#zdate").removeAttr("disabled");
			$("#auto_js").removeAttr("disabled");
			$("#jnjs").find("input").removeAttr("disabled");
			$("#wuyi").find("input").removeAttr("disabled");
			wuyi_flg = true;
		}
		

	});
		
	
	$("#next").on("click", function(event){
		
		var wuyi_flg1 = $("#jin").val();//这个是真正的五一flag 
		
		if (wuyi_flg1 === '0') {//无五险一金，把city设置为零
			
			$("#city").val(0);
		}
		
		
		if(wuyi_flg1 === '1' && $("#sum_dw").val().length === 0){
			event.preventDefault();
			msg.update({
				message : "请[自动计算]五险一金数值",
				type : "error",
				actions: null
			});
			return;
		}
		
		if($("#finalsalary").val().trim().length === 0){
			event.preventDefault();
			msg.update({
				message : "请自动计算或手动填写税后薪资",
				type : "error",
				actions: null
			});
			return;
		}
		
	});
	
	
	
	function checkNumber(i_msg, i_value, i_this) {        //数字验证
		
		if(i_this.id === "citydesc"){
			if(i_value.length === 0){
				i_msg.update({
					message : "请输入城市",
					type : "error",
					actions: null
				});
				//i_this.focus();
				return false;
			}
			
		}else{
		
			if (isNaN(i_value) && i_value.length != 0) {
				i_msg.update({
					message : "请输入数字",
					type : "error",
					actions: null
				});
				//i_this.focus();
				return false;
			}else if(i_value < 0){
				i_msg.update({
					message : "请输入大于零的数字",
					type : "error",
					actions: null
				});
				//i_this.focus();
				return false;
			} else{
				i_msg.hide();
				return true;
			}
		
		}

	};
	
});