$(document).ready(function() {
	var olddata = null;
	var index = 1; //用于用户自定义控件name属性
	var $userDef = $("#userDef").detach();
	var flagArray = new Array();
	var wuyi_flg = true;//
	var auto_jisuan = false;//标记是否进行了[自动计算] 
	
	var cityDesc = null;
	var flg_oldcity = null;//记录老的城市名,并且城市是“其它”情况下
	
	Messenger.options = {
			parentLocations : ['#msgarea'],
			extraClasses : 'messenger-fixed  messenger-on-bottom',
			theme : 'flat'
		};

	var msg = Messenger().post("initial msg");
	msg.hide();
	
	$("input").not(".moinput").attr("disabled", "disabled");//密码修改输入框保持输入
	$("#userAdd").attr("disabled", "disabled");	    
	$("#auto_js").attr("disabled", "disabled");
	$("#no_wuyi").attr("disabled", "disabled");
	$("#city").attr("disabled", "disabled");
	
	$("div").on("blur","input", function(event){
		
		event.stopPropagation();
		
		if($(this).attr("id") != "neck" && $(this).attr("id") != "desc" && $(this).attr("id") != "citydesc" && 
		   $(this).attr("id") != "password" && $(this).attr("id") != "password1" && $(this).attr("id") != "password2" &&
		   $(this).attr("id") != "sbno" && $(this).attr("id") != "gjjno"		
		){
			
		    checkNumber(msg, this.value.trim(), this);	   
		 
		}
		
		if($(this).attr("id") == "desc"){
			if(this.value.trim().length == 0){
				msg.update({
					message : "请输入自定义消费描述，比如[车保养费]",
					type : "error"
				});
				//this.focus();
			}else{
				msg.hide();
			}
		};

	});
	
    $.ajax({
			url : "user.me",
			type : "get",
			dataType : "JSON",
			
			success : function(json) {
				
				olddata = json;
				
				var user = $.parseJSON(json[0]);
				var pro1 = $.parseJSON(json[1]);
				var pro2List = $.parseJSON(json[2]);
				
				$("#email").val(user.email);
				$("#neck").val(user.neck);

				//固定半固定消费赋值
				$.each(pro2List, function(i, e){
					var obj = $.parseJSON(e);
					switch (obj.text) {
					case '房租':
						$("#rent").val(obj.value);
						if (obj.type == 0) {
							$("#radio_rent1").attr("checked", "checked");
						}else{
							$("#radio_rent2").attr("checked", "checked");
						}
						break;
					case '房贷':
						$("#loan").val(obj.value);
						if (obj.type == 1) {
							$("#check_jin").attr("checked", "checked");
						}else{
							$("#check_jin").removeAttr("checked");
						}
						break;
						
					case '网费':
						$("#net").val(obj.value);
						if (obj.type == 0) {
							$("#radio_net1").attr("checked", "checked");
						}else{
							$("#radio_net2").attr("checked", "checked");
						}
						break;
					case '有线电视费':
						$("#tv").val(obj.value);
						if (obj.type == 0) {
							$("#radio_tv1").attr("checked", "checked");
						}else{
							$("#radio_tv2").attr("checked", "checked");
						}
						break;
					case '水费':
						$("#water").val(obj.value);
						if (obj.type == 0) {
							$("#radio_water1").attr("checked", "checked");
						}else{
							$("#radio_water2").attr("checked", "checked");
						}
						break;
					case '电费':
						$("#electric").val(obj.value);
						if (obj.type == 0) {
							$("#radio_elec1").attr("checked", "checked");
						}else{
							$("#radio_elec2").attr("checked", "checked");
						}
						break;
					case '煤气/天然气费':
						$("#gas").val(obj.value);
						if (obj.type == 0) {
							$("#radio_gas1").attr("checked", "checked");
						}else{
							$("#radio_gas2").attr("checked", "checked");
						}
						break;
					case '话费':
						$("#tel").val(obj.value);
						if (obj.type == 0) {
							$("#radio_tel1").attr("checked", "checked");
						}else{
							$("#radio_tel2").attr("checked", "checked");
						}
						break;
					case '公交车费':
						$("#bus").val(obj.value);
						if (obj.type == 0) {
							$("#radio_bus1").attr("checked", "checked");
						}else{
							$("#radio_bus2").attr("checked", "checked");
						}
						break;
					default:
						var $element = $userDef.clone();
						$element.find("#desc").attr("name", "desc" + index);
						$element.find("#mount").attr("name", "mount" + index);
						$element.find("#radio_user1").attr("name", "radio_user" + index);
						$element.find("#radio_user2").attr("name", "radio_user" + index);
						$element.find("#radio_user1").attr("id", "radio_user_a" + index);
						$element.find("#radio_user2").attr("id", "radio_user_b" + index);
						$element.find("#mount").val(obj.value);
						$element.find("#desc").val(obj.text);
						if (obj.type == 0) {
							$element.find("#radio_user_a" + index).attr("checked", "checked");
						}else{
							$element.find("#radio_user_b" + index).attr("checked", "checked");
						}
						$element.find("input").attr("disabled", "disabled");
						index = index + 1;
						$element.find("#userRemove").attr("disabled", "disabled");
						$("#addBeforeHere").before($element);
						 
						break;
					}
					
				});
				
			    $("#collapseThree input").each(function(i, e){//未填写项目备份
			    	if (this.value == '未填写') {
						flagArray.push($(this).attr("id"));
					}
			    });
				
				//五险一金赋值
				$("#salary").val(pro1.salary);
				$("#cmoney").val(pro1.cMoney);
				$("#finalsalary").val(pro1.finalsalary);
				$("#city").val(pro1.city);
				
				if (pro1.city == '6') {
					$("#citydescDiv").removeAttr("hidden");
					flg_oldcity = pro1.cityDesc;
				}
				$("#citydesc").val(pro1.cityDesc);
				cityDesc = pro1.cityDesc;
				
				if (user.jin == 0) {
					wuyi_flg = false;
					$("#jin1, #jin2, #jin3, #jin4, #jin5, #jin6, #gjin1, #gjin2, #gjin3, #gjin4, #gjin5, #gjin6,#sbjs,#gjjjs,#zdate").val('未填写');
					$("#no_wuyi").text("有五险一金");
					$("#numInfoA").attr("hidden", "hidden");
				}else{
					wuyi_flg = true;
					$("#no_wuyi").text("无五险一金");
					$("#numInfoA").removeAttr("hidden");
					$("#zdate").val(pro1.zdate);
					$("#jin1").val(pro1.jin1);
					$("#jin2").val(pro1.jin2);
					$("#jin3").val(pro1.jin3);
					$("#jin4").val(pro1.jin4);
					$("#jin5").val(pro1.jin5);
					$("#jin6").val(pro1.jin6);
					$("#gjin1").val(pro1.gJin1);
					$("#gjin2").val(pro1.gJin2);
					$("#gjin3").val(pro1.gJin3);
					$("#gjin4").val(pro1.gJin4);
					$("#gjin5").val(pro1.gJin5);
					$("#gjin6").val(pro1.gJin6);	
					$("#sbjs").val(pro1.sbjs);
					$("#gjjjs").val(pro1.gjjjs);
					$("#sbno").val(pro1.sbno);
					$("#gjjno").val(pro1.gjjno);
					
					
				    var jin1 = pro1.jin1 * pro1.gjjjs / 100;
			        var jin2 = pro1.jin2 * pro1.sbjs  / 100;
			        var jin3 = pro1.jin3 * pro1.sbjs  / 100;
			        var jin4 = pro1.jin4 * pro1.sbjs  / 100;
			        var jin5 = pro1.jin5 * pro1.sbjs  / 100;
			        var jin6 = pro1.jin6 * pro1.sbjs  / 100;
			        var gjin1 = pro1.gJin1 * pro1.gjjjs / 100;
			        var gjin2 = pro1.gJin2 * pro1.sbjs / 100;
			        var gjin3 = pro1.gJin3 * pro1.sbjs / 100;
			        var gjin4 = pro1.gJin4 * pro1.sbjs / 100;
			        var gjin5 = pro1.gJin5 * pro1.sbjs / 100;
			        var gjin6 = pro1.gJin6 * pro1.sbjs / 100;
			        var sum_gr = jin1 + jin2 + jin3 + jin4 + jin5 + jin6;
			        var sum_dw = gjin1 + gjin2 + gjin3 + gjin4 + gjin5 + gjin6;  
			        
			        $("#jin1").next().text('%  ￥' + jin1);
			        $("#jin2").next().text('%  ￥' + jin2);
			        $("#jin3").next().text('%  ￥' + jin3);
			        $("#jin4").next().text('%  ￥' + jin4);
			        $("#jin5").next().text('%  ￥' + jin5);
			        $("#jin6").next().text('%  ￥' + jin6);
			        $("#gjin1").next().text('%  ￥' + gjin1);
			        $("#gjin2").next().text('%  ￥' + gjin2);
			        $("#gjin3").next().text('%  ￥' + gjin3);
			        $("#gjin4").next().text('%  ￥' + gjin4);
			        $("#gjin5").next().text('%  ￥' + gjin5);
			        $("#gjin6").next().text('%  ￥' + gjin6);
			        
			        $("#sum_dw").val(sum_dw);
			        $("#sum_gr").val(sum_gr);
					
				}
				
			},
			
			error : function(xhr, status) {
				alert_msg(msg, "error","请刷新重试，或者反馈<a href='http://lanmiao.me/help.jsp#title4' target = '_blank'> @懒喵</a>");
			},
		});	    
	
	$("#panelGuDing").find("input").on("blur", function(event){
		if (this.type != "radio" && this.value == '0') {
			msg.update({
				message : "无该项消费请留空，不用填写0",
				type : "error"
			});
			//this.focus();
		}else{
			msg.hide();
		}
	});
	
	$("#userAdd").on("click", function() {         //用户自定义消费添加
		
		var $element = $userDef.clone();
		$element.find("#desc").attr("name", "desc" + index);
		$element.find("#mount").attr("name", "mount" + index);
		$element.find("#radio_user1").attr("name", "radio_user" + index);
		$element.find("#radio_user2").attr("name", "radio_user" + index);
		$element.find("#radio_user1").attr("id", "radio_user_a" + index);
		$element.find("#radio_user2").attr("id", "radio_user_b" + index);
		$element.find("#radio_user_b" + index).attr("checked", "checked");
		index = index + 1;
		if (index > 6) {
			index = index - 1;
			msg.update({
				message : "最多只能添加5个自定义消费",
				type : "error"
			});
			return;
		} else {
			$("#addBeforeHere").before($element);
		}
	});
	
	$("div").on("click", "button", function(event) {      //用户自定义消费删除
		
		if ($(this).attr("id") != "save" && $(this).attr("id") != "popUpSave" && $(this).attr("id") != "userAdd") {
			msg.hide();
		}
		
		if ($(this).attr("id") == "userRemove") {
			
			$(this).parents(".form-group").remove();
			index = index - 1;
		}
		
		//event.stopPropagation();
	});
	
	
	
	//修改密码相关 ------------------------>> start
	$("#password1, #password").on("change", function() {
			if (this.value.trim().length < 6 || this.value.trim().length > 20) {
				alert_msg(msg, "error", "请输入6-20位的密码");
			}else{
				msg.hide();
			}

	});

	$("#password2").on("change", function() {
			if (this.value.trim() == $("#password1").val().trim()){
				msg.hide();	
			}else{
				alert_msg(msg, "error", "[新密码]和[确认密码]要一致");
			}
	});
	
	$("#popUpCancel").on("click", function(){
		$("#password, #password1, #password2").val('');
	});
	
	
	$("#popUpSave").on("click", function(){
		var pwd = $("#password").val().trim();
		var pwd1 = $("#password1").val().trim();
		var pwd2 = $("#password2").val().trim();
		
		
		if(pwd.length == 0 || pwd1.length == 0 || pwd2.length == 0){
			alert_msg(msg, "error", "请输入[原始密码]和[新密码]及[确认密码]");
			return;
		}
		
		if(pwd.length < 6 || pwd1.length < 6 ||
		   pwd2.length < 6 || pwd.length > 20 ||
		   pwd1.length > 20 || pwd2.length > 20){
			alert_msg(msg, "error", "请输入6-20位的密码");
			return;
		}else{
			msg.hide();
		}
		
		
		if (pwd1 == pwd2){
			msg.hide();	
		}else{
			alert_msg(msg, "error", "[新密码]和[确认密码]要一致");
			return;
		}
		
		$.ajax({
			url : "user.me",
			type : "POST",
			dataType : "JSON",
			data:{ 
				pwd: pwd,
				pwdNew: pwd1,
				flag: 0
			},
			
			success : function(json) {
			
				if (json == 1) {
					alert_msg(msg, "error","系统出错，请重试或联系我们");
				}else if (json == 2){
					alert_msg(msg, "error","[原始密码]输入不正确，忘记密码？请在登录页面找回密码");
				}else{
					alert_msg(msg, "success","密码修改成功，下次请用新密码登录");
					 $('#myModal').modal('hide');
				}
				
			},
			
			error : function(xhr, status) {
				alert_msg(msg, "error","请刷新重试，或者反馈<a href='http://lanmiao.me/help.jsp#title4' target = '_blank'> @懒喵</a>");
			},
		});	
		
	});
	
	//修改密码相关 ------------------------<< end
	
	//添加账号信息相关 ------------------------>> start
	
	$("#addNumInfoBtn").on("click", function(){
		var sbno = $("#sbno").val().trim();
		var gjjno = $("#gjjno").val().trim();
		
		$.ajax({
			url : "numInfoModify.me",
			type : "POST",
			dataType : "JSON",
			data:{ 
				sbno: sbno,
				gjjno: gjjno
			},
			
			success : function(json) {
			
				if (json == true) {
					alert_msg(msg, "success","账号信息已保存");
					 $('#addNumInfo').modal('hide');
				}else{
					alert_msg(msg, "error","账号信息保存失败");
					
				}
				
			},
			
			error : function(xhr, status) {
				alert_msg(msg, "error","请刷新重试，或者反馈<a href='http://lanmiao.me/help.jsp#title4' target = '_blank'> @懒喵</a>");
			},
		});	
		
	});
	
	
	//添加账号信息相关 ------------------------<< end
	
	//五险一金处理相关---------------------->>start
	$("#city").on("change", function(event){
		switch (this.value) {
		case '1': //北京
			cityDesc = "北京";
			$("#citydesc").val(cityDesc);
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
			cityDesc = "上海";
			$("#citydesc").val(cityDesc);
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
			cityDesc = "广州";
			$("#citydesc").val(cityDesc);
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
			cityDesc = "深圳";
			$("#citydesc").val(cityDesc);
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
			cityDesc = "天津";
			$("#citydesc").val(cityDesc);
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
			if (flg_oldcity == null) {//当原来记录不是其他城市是才清空，否则显示原来的
				$("#citydesc").val("");
			}else{
				$("#citydesc").val(cityDesc);
			}
			$("#citydescDiv").removeAttr("hidden");
			$("#citydesc").removeAttr("disabled");
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
			cityDesc = "无";
			$("#citydesc").val(cityDesc);
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
		auto_jisuan = true;
		
		if (salary.length == 0) {
			event.preventDefault();
			msg.update({
				message : "请输入税前薪资",
				type : "error",
				
			});
			//$("#salary").focus();
			return;
		}
		
		if (city == '0') {
			event.preventDefault();
			msg.update({
				message : "请选择五险一金缴纳城市",
				type : "error",
				
			});	
			return;
		}
		
		if(citydesc.length == 0){
			msg.update({
				message : "请输入五险一金缴纳城市",
				type : "error",
				
			});
			
			//$("#citydesc").focus();
			return;
		}
		
		if (zdate.length == '0') {
			event.preventDefault();
			msg.update({
				message : "请选择当前工作五险一金缴纳起始年月",
				type : "error",
				
			});	
			return;
		}
		
		if ($("#sbjs").val().trim().length == 0 || $("#gjjjs").val().trim().length == 0) {
			msg.update({
				message : "请输入社保及公积金缴纳基数",
				type : "error",
				
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
        
        $("#jin1").next().text('%  ￥' + jin1);
        $("#jin2").next().text('%  ￥' + jin2);
        $("#jin3").next().text('%  ￥' + jin3);
        $("#jin4").next().text('%  ￥' + jin4);
        $("#jin5").next().text('%  ￥' + jin5);
        $("#jin6").next().text('%  ￥' + jin6);
        $("#gjin1").next().text('%  ￥' + gjin1);
        $("#gjin2").next().text('%  ￥' + gjin2);
        $("#gjin3").next().text('%  ￥' + gjin3);
        $("#gjin4").next().text('%  ￥' + gjin4);
        $("#gjin5").next().text('%  ￥' + gjin5);
        $("#gjin6").next().text('%  ￥' + gjin6);
        
        $("#sum_dw").val(sum_dw);
        $("#sum_gr").val(sum_gr);
        $("#cmoney").val(cmoney);
        $("#finalsalary").val(salary - sum_gr - cmoney);
	});
	
	
/*	$("input").on("blur", function(event){
		event.stopPropagation();
		checkNumber1(msg, this.value.trim(), this);

	});*/
	
	$("#no_wuyi").on("click", function(event){
		
		msg.hide();
        var salary = $("#salary").val().trim();
        
		if (salary.length == 0) {
			event.preventDefault();
			msg.update({
				message : "请输入税前薪资",
				type : "error",
				
			});
			//$("#salary").focus();
			return;
		}
		
        cityDesc = "无";
		$("#citydescDiv").attr("hidden", "hidden");
		
		if (wuyi_flg) {//原先有五一
			
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
			$("#zdate").val(null);
			$("#no_wuyi").text("有五险一金");
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
		}else{//原先无五一
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
			wuyi_flg = true ;
		}
		

	});
	
	//五险一金处理相关----------------------<<end
	
		//保存、取消、修改按钮事件
		$(".col-xs-12").on("click", "button", function(event){
			
			var user = $.parseJSON(olddata[0]);
			var pro1 = $.parseJSON(olddata[1]);
			var pro2List = $.parseJSON(olddata[2]);
			
			var $mod = "<button class='btn btn-primary' role='button' id='mod'>修改</button>";
			var $sub = "<button class='btn btn-primary' role='button' id='save'>保存</button> <button class='btn btn-primary' role='button' id='back'>取消</button>";
			var $inputs = $(this).parents(".panel-body").find("input");
			var $parent = $(this).parent();

			if($(this).attr("id") == "mod"){
				$inputs.each(function(index, element){
					
					if(this.value.trim() == '未填写'){
						this.value = '';
					}
					
				});
				
			  if ($(this).parent("div").attr("id") != "panel3") {	
				  $inputs.not("#email").removeAttr("disabled");
			  }else{ 
				  if(user.jin == 1){//有五一
					  $inputs.not("#sum_dw, #sum_gr").removeAttr("disabled");
					  $("#auto_js, #no_wuyi, #city").removeAttr("disabled");
				  }else{//无五一
					  $("#salary, #no_wuyi, #finalsalary,#cmoney").removeAttr("disabled");
					  
				  }

			  }
			  
			  if ($(this).parent("div").attr("id") == "panel2") {
				  $("#userAdd").removeAttr("disabled");
				  $("[id='userRemove']").each(function(i, e){
						$(this).removeAttr("disabled");
					});
			  }
			  
			  $parent.html($sub);
			  event.stopPropagation();
			};
		
			
			
			if($(this).attr("id") == "back"){
				
				switch ($(this).parent("div").attr("id")) {
				case "panel1":
					$("#neck").val(user.neck);
					break;
					
				case "panel2":
					//固定半固定消费赋值
				    do {
				    	 $("div").find("#userDef").remove();
					} while ($("div").find("#userDef").length != 0);
				    
				    index = 1;
					$.each(pro2List, function(i, e){
						var obj = $.parseJSON(e);
						switch (obj.text) {
						case '房租':
							$("#rent").val(obj.value);
							if (obj.type == 0) {
								$("#radio_rent1").attr("checked", "checked");
							}else{
								$("#radio_rent2").attr("checked", "checked");
							}
							break;
						case '房贷':
							$("#loan").val(obj.value);
							if (obj.type == 1) {
								$("#check_jin").attr("checked", "checked");
							}else{
								$("#check_jin").removeAttr("checked");
							}
							break;
							
						case '网费':
							$("#net").val(obj.value);
							if (obj.type == 0) {
								$("#radio_net1").attr("checked", "checked");
							}else{
								$("#radio_net2").attr("checked", "checked");
							}
							break;
						case '有线电视费':
							$("#tv").val(obj.value);
							if (obj.type == 0) {
								$("#radio_tv1").attr("checked", "checked");
							}else{
								$("#radio_tv2").attr("checked", "checked");
							}
							break;
						case '水费':
							$("#water").val(obj.value);
							if (obj.type == 0) {
								$("#radio_water1").attr("checked", "checked");
							}else{
								$("#radio_water2").attr("checked", "checked");
							}
							break;
						case '电费':
							$("#electric").val(obj.value);
							if (obj.type == 0) {
								$("#radio_elec1").attr("checked", "checked");
							}else{
								$("#radio_elec2").attr("checked", "checked");
							}
							break;
						case '煤气/天然气费':
							$("#gas").val(obj.value);
							if (obj.type == 0) {
								$("#radio_gas1").attr("checked", "checked");
							}else{
								$("#radio_gas2").attr("checked", "checked");
							}
							break;
						case '话费':
							$("#tel").val(obj.value);
							if (obj.type == 0) {
								$("#radio_tel1").attr("checked", "checked");
							}else{
								$("#radio_tel2").attr("checked", "checked");
							}
							break;
						case '公交车费':
							$("#bus").val(obj.value);
							if (obj.type == 0) {
								$("#radio_bus1").attr("checked", "checked");
							}else{
								$("#radio_bus2").attr("checked", "checked");
							}
							break;
						default:
							
							var $element = $userDef.clone();
							$element.find("#desc").attr("name", "desc" + index);
							$element.find("#mount").attr("name", "mount" + index);
							$element.find("#radio_user1").attr("name", "radio_user" + index);
							$element.find("#radio_user2").attr("name", "radio_user" + index);
							$element.find("#radio_user1").attr("id", "radio_user_a" + index);
							$element.find("#radio_user2").attr("id", "radio_user_b" + index);
							$element.find("#mount").val(obj.value);
							$element.find("#desc").val(obj.text);
							if (obj.type == 0) {
								$element.find("#radio_user_a" + index).attr("checked", "checked");
							}else{
								$element.find("#radio_user_b" + index).attr("checked", "checked");
							}
							$element.find("input").attr("disabled", "disabled");
							index = index + 1;
							$element.find("#userRemove").attr("disabled", "disabled");
							$("#addBeforeHere").before($element);
							
							break;
						}
					});
					
					 $.each(flagArray, function(i, e){
						var str = '#' + e;
						$(str).val("未填写");
					 });
					 
					 $("[id='userRemove']").each(function(i, e){
							$(this).attr("disabled", "disabled");
						});
					 $("#userAdd").attr("disabled", "disabled");
					break;
				case "panel3":
					auto_jisuan = false;
					$("#salary").val(pro1.salary);
					$("#cmoney").val(pro1.cMoney);
					$("#finalsalary").val(pro1.finalsalary);
					$("#city").val(pro1.city);
					$("#citydesc").val(pro1.cityDesc);
					cityDesc = pro1.cityDesc;
					if(pro1.city == 6){//是其它城市时要显示其它城市
						$("#citydescDiv").removeAttr("hidden");
					}else{
						$("#citydescDiv").attr("hidden", "hidden");
					}
					
					$("#auto_js, #no_wuyi, #city").attr("disabled", "disabled");
					
					if (user.jin == 0) {
						$("#no_wuyi").text("有五险一金");
						wuyi_flg = false;
						$("#jin1, #jin2, #jin3, #jin4, #jin5, #jin6, #gjin1, #gjin2, #gjin3, #gjin4, #gjin5, #gjin6,#sbjs,#gjjjs,#city").val('未填写');
						
					}else{
						$("#no_wuyi").text("无五险一金");
						wuyi_flg = true;
						$("#jin1").val(pro1.jin1);
						$("#jin2").val(pro1.jin2);
						$("#jin3").val(pro1.jin3);
						$("#jin4").val(pro1.jin4);
						$("#jin5").val(pro1.jin5);
						$("#jin6").val(pro1.jin6);
						$("#gjin1").val(pro1.gJin1);
						$("#gjin2").val(pro1.gJin2);
						$("#gjin3").val(pro1.gJin3);
						$("#gjin4").val(pro1.gJin4);
						$("#gjin5").val(pro1.gJin5);
						$("#gjin6").val(pro1.gJin6);
						$("#sbjs").val(pro1.sbjs);
						$("#gjjjs").val(pro1.gjjjs);
						$("#zdate").val(pro1.zdate);
						
					    var jin1 = pro1.jin1 * pro1.gjjjs / 100;
				        var jin2 = pro1.jin2 * pro1.sbjs  / 100;
				        var jin3 = pro1.jin3 * pro1.sbjs  / 100;
				        var jin4 = pro1.jin4 * pro1.sbjs  / 100;
				        var jin5 = pro1.jin5 * pro1.sbjs  / 100;
				        var jin6 = pro1.jin6 * pro1.sbjs  / 100;
				        var gjin1 = pro1.gJin1 * pro1.gjjjs / 100;
				        var gjin2 = pro1.gJin2 * pro1.sbjs / 100;
				        var gjin3 = pro1.gJin3 * pro1.sbjs / 100;
				        var gjin4 = pro1.gJin4 * pro1.sbjs / 100;
				        var gjin5 = pro1.gJin5 * pro1.sbjs / 100;
				        var gjin6 = pro1.gJin6 * pro1.sbjs / 100;
				        var sum_gr = jin1 + jin2 + jin3 + jin4 + jin5 + jin6;
				        var sum_dw = gjin1 + gjin2 + gjin3 + gjin4 + gjin5 + gjin6;  
				        
				        $("#jin1").next().text('%  ￥' + jin1);
				        $("#jin2").next().text('%  ￥' + jin2);
				        $("#jin3").next().text('%  ￥' + jin3);
				        $("#jin4").next().text('%  ￥' + jin4);
				        $("#jin5").next().text('%  ￥' + jin5);
				        $("#jin6").next().text('%  ￥' + jin6);
				        $("#gjin1").next().text('%  ￥' + gjin1);
				        $("#gjin2").next().text('%  ￥' + gjin2);
				        $("#gjin3").next().text('%  ￥' + gjin3);
				        $("#gjin4").next().text('%  ￥' + gjin4);
				        $("#gjin5").next().text('%  ￥' + gjin5);
				        $("#gjin6").next().text('%  ￥' + gjin6);
				        
				        $("#sum_dw").val(sum_dw);
				        $("#sum_gr").val(sum_gr);
						
						
					}
					break;

				default:
					break;
				}

				$inputs.attr("disabled", "disabled");
				$parent.html($mod);
				event.stopPropagation();
			}
			
			//保存安妮按下时
			if($(this).attr("id") == "save"){
				event.stopPropagation();
			    event.preventDefault();
			    
			    var str = null;
			    var flag_btn = 0; //panel3的savebutton flag
			    
			    switch ($(this).parent("div").attr("id")) {
				case "panel1":
					
					if($("#neck").val().trim() == user.neck) {
						alert_msg(msg, "success","您未修改信息");
						$inputs.attr("disabled", "disabled");
						$parent.html($mod);
						return;
					}
					
					str = $(this).parents("form").serialize() + '&flag=1';
					break;
					
					
				case "panel2":
					var flag = true;
					flag_btn = 1;
					
					$("#collapseThree input").each(function(){//画面check
						
						if($(this).attr("id") != "desc"){
							
							flag = checkNumber(msg, this.value.trim(), $(this));
							if (!flag) {
								flag = false;
								return false;
							}
							
							if (this.type != "radio" && this.value == '0') {
								msg.update({
									message : "无改项消费请留空，不用填写0",
									type : "error"
								});
								flag = false;
								//this.focus();
								return false;
							}else{
								msg.hide();
							}
							
						}else{
							if(this.value.trim().length == 0){
								msg.update({
									message : "请输入自定义消费描述，比如[车保养费]",
									type : "error"
								});
								flag = false;
								//this.focus();
								return false;
							}else{
								msg.hide();
							}
						};
					});
					
					if (!flag){
						return;
					}

					str = $(this).parents("form").serialize() + '&flag=2';
					break;
					
					
				case "panel3":
					
					var flag = 1;//标记是否输入的都是数字
					if($("#city").val() == 6){
						cityDesc = $("#citydesc").val().trim();
					}
					
					if((wuyi_flg) && $("#sum_dw").val().length == 0){//含有五一却没自动计算，报错
						event.preventDefault();
						msg.update({
							message : "请[自动计算]五险一金数值",
							type : "error",
							
						});
						return;
					}
					
					$("#collapseFour input").each(function(){//画面check
						event.stopPropagation();
						flag = checkNumber(msg, this.value.trim(), this);
						if(!flag){
							return false;
						};
					});	
					
					if($("#finalsalary").val().trim().length == 0){//必须要有税后薪资
						event.preventDefault();
						msg.update({
							message : "请自动计算或手动填写税后薪资",
							type : "error",
							
						});
						return;
					}
					
					if (!flag){
						return;
					}
					
					if (user.jin == 0) {//无五险一金
						
						if ($("#salary").val().trim() == (pro1.salary+'') && 
								$("#cmoney").val().trim() == (pro1.cMoney+'') && $("#finalsalary").val().trim() == (pro1.finalsalary+'')
						    ) {
							
							alert_msg(msg, "success","您未修改信息");
							$("#auto_js, #no_wuyi, #city").attr("disabled", "disabled");
							$inputs.attr("disabled", "disabled");
							$parent.html($mod);
							return;
						}
						
					}else{//有五险一金
						
						if ($("#jin1").val().trim() == (pro1.jin1+'') && $("#gjin1").val().trim() == (pro1.gJin1+'') && 
								$("#jin2").val().trim() == (pro1.jin2+'') && $("#gjin2").val().trim() == (pro1.gJin2+'') &&
								$("#jin3").val().trim() == (pro1.jin3+'') && $("#gjin3").val().trim() == (pro1.gJin3+'') && 
								$("#jin4").val().trim() == (pro1.jin4+'') && $("#gjin4").val().trim() == (pro1.gJin4+'') &&
								$("#jin5").val().trim() == (pro1.jin5+'') && $("#gjin5").val().trim() == (pro1.gJin5+'') && 
								$("#jin6").val().trim() == (pro1.jin6+'') && $("#gjin6").val().trim() == (pro1.gJin6+'') &&
								$("#city").val().trim() == (pro1.city+'') && cityDesc == (pro1.cityDesc+'') && $("#salary").val().trim() == (pro1.salary+'') && 
								$("#cmoney").val().trim() == (pro1.cMoney+'') && $("#finalsalary").val().trim() == (pro1.finalsalary+'') && 
								$("#gjjjs").val().trim() == (pro1.gjjjs+'') && $("#sbjs").val().trim() == (pro1.sbjs+'') && $("#zdate").val() == pro1.zdate
						    ) {
							
							$("#auto_js, #no_wuyi, #city, #zdate").attr("disabled", "disabled");
							alert_msg(msg, "success","您未修改信息");
							$inputs.attr("disabled", "disabled");
							$parent.html($mod);
							return;
							
						}
					}
					
					if ((wuyi_flg)&&(!auto_jisuan)) {//没有进行自动计算，报错
						if ($("#jin1").val().trim() != (pro1.jin1+'') || $("#gjin1").val().trim() != (pro1.gJin1+'') || 
								$("#jin2").val().trim() != (pro1.jin2+'') || $("#gjin2").val().trim() != (pro1.gJin2+'') || 
								$("#jin3").val().trim() != (pro1.jin3+'') || $("#gjin3").val().trim() != (pro1.gJin3+'') || 
								$("#jin4").val().trim() != (pro1.jin4+'') || $("#gjin4").val().trim() != (pro1.gJin4+'') || 
								$("#jin5").val().trim() != (pro1.jin5+'') || $("#gjin5").val().trim() != (pro1.gJin5+'') || 
								$("#jin6").val().trim() != (pro1.jin6+'') || $("#gjin6").val().trim() != (pro1.gJin6+'') || 
								$("#city").val().trim() != (pro1.city+'') || $("#salary").val().trim() != (pro1.salary+'') || 
								$("#gjjjs").val().trim() != (pro1.gjjjs+'') || $("#sbjs").val().trim() != (pro1.sbjs+'')) {
							
						alert_msg(msg, "error","请先[自动计算]税后薪资");
						return;
						
						}
					}
					
					str = $(this).parents("form").serialize() + '&cityDesc=' + cityDesc +'&flag=3';
					
					if(wuyi_flg){
						str = str + '&haswuyi=1';
					}else{
						str = str + '&haswuyi=0';
					}
					
					break;
				default:
					break;
				}
			    
			 
			   
					$.ajax({
						url : "user.me",
						data : str,
						type : "POST",
						dataType : "JSON",
						
						success : function(json) {
							if (json == 0) {
								alert_msg(msg, "success","信息修改成功");
								$inputs.attr("disabled", "disabled");
								if(flag_btn == 1){//panel2
									$("#userAdd").attr("disabled", "disabled");
									$("[id='userRemove']").each(function(i, e){
										$(this).attr("disabled", "disabled");
									});
									
								}else{//20140826改 可能要修改
									$("#auto_js, #no_wuyi, #city").attr("disabled", "disabled");
									
								}
								$parent.html($mod);
							}else if(json == -1){
								alert_msg(msg, "error","修改失败，请重试或联系管理员");
							}else{
								alert_msg(msg, "success","你没修改任何信息");
								$inputs.attr("disabled", "disabled");
								if(flag_btn == 1){
									$("[id='userRemove']").each(function(i, e){
										$(this).attr("disabled", "disabled");
									});
									$("#userAdd").attr("disabled", "disabled");
								}
								$parent.html($mod);
							}
						},
						
						error : function(xhr, status) {
							alert_msg(msg, "error","请刷新重试，或者反馈<a href='http://lanmiao.me/help.jsp#title4' target = '_blank'> @懒喵</a>");
						},
					});	
			}
		
		});
		
		function alert_msg(i_msg, i_type, i_text) {
			i_msg.update({
				message : i_text,
				type : i_type
			});
		};
		
		function checkNumber(i_msg, i_value, i_this) {        //数字验证

			if(i_this.id == "citydesc"){
				if(i_value.length == 0){
					i_msg.update({
						message : "请输入城市",
						type : "error"
						
					});
					//i_this.focus();
					return false;
				}
			}else{
			
				if (isNaN(i_value) && i_value.length != 0) {
					i_msg.update({
						message : "请输入数字",
						type : "error"
						
					});
					//i_this.focus();
					return false;
				}else if(i_value < 0){
					i_msg.update({
						message : "请输入大于零的数字",
						type : "error"
						
					});
					//i_this.focus();
					return false;
				} 
			}
			
			i_msg.hide();
		    return true;

		};
});