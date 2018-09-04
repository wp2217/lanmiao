$(document).ready(function() {

	var flag_email = '';
	var flag_pwd1 = '';
	var flag_pwd2 = '';
	Messenger.options = {
		parentLocations : [ '.panel-heading' ],
		extraClasses : 'messenger-fixed  messenger-on-top',
		theme : 'flat'
	};

	var msg = Messenger().post("initial msg");
	msg.hide();
	//$("#email").focus();
	
	$("#email").autoEmail(
			["qq.com", "gmail.com", "yahoo.com", "126.com", "163.com", "sina.com", "hotmail.com"], // an array of domains to autocomplete
			false // enables the user to enter multiple emails in the field
			);

	$("#email").on("blur", flag_email, function() {  //Email 验证

		if (this.value.trim().length === 0) {
			alert_msg(msg, "error", "请输入邮箱做为用户名");
			//this.focus();
		} else {
			var res = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
			var re = new RegExp(res);
			if (this.value.trim().match(re) === null) {
				alert_msg(msg, "error", "请输入正确的邮箱格式xx@xx.xx");
				//this.focus();
			} else {
				$.ajax({
					url : "CheckEmail",

					data : {
						email : this.value.trim()
					},

					type : "POST",
					dataType : "JSON",
					
					success : function(json) {
						if (json === 1) {
							alert_msg(msg, "error", "该邮箱已经注册，请选择其它邮箱");
							//$("#email").focus();
						}else{
							msg.hide();
							//$("#password1").focus();
							flag_email = 'x';
						}
					},
					
					error : function(xhr, status) {
						alert_msg(msg, "error", "请刷新重试，或者反馈<a href='http://lanmiao.me/help.jsp#title4' target = '_blank'> @懒喵</a>");
					},
				});	
				
			}
		}
	});

	$("#password1").on("change",{flag_email:flag_email, flag_pwd1:flag_pwd1}, function() {
        
		if (flag_email === 'x') {
			if (this.value.trim().length < 6 || this.value.trim().length > 20) {
				alert_msg(msg, "error", "请输入6-20位的密码");
				//this.focus();
			}else{
				msg.hide();
				//$("#password2").focus();
				flag_pwd1 = 'x';	
			}
		}

	});

	$("#password2").on("change", {flag_pwd1:flag_pwd1, flag_pwd2:flag_pwd2}, function() {
		if (flag_pwd1 === 'x') {
			if (this.value.trim() === $("#password1").val().trim()){
				msg.hide();
				flag_pwd2 = 'x';	
			}else{
				alert_msg(msg, "error", "密码和确认密码要一致");
			}
		}
	});

	
	$("#next").on("click", function(event){
				
		if ($("#email").val().trim().length === 0) {
			event.preventDefault();
			alert_msg(msg, "error", "请输入Email");
			//$("#email").focus();
			return;
		}else{
			if (flag_email != 'x') {
				var res = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
				var re = new RegExp(res);
				if ($("#email").val().trim().trim().match(re) === null) {
					alert_msg(msg, "error", "请输入正确的邮箱格式xx@xx.xx");
					//$("#email").focus();
				} else {
					$.ajax({
						url : "CheckEmail",
						data : {
							email : $("#email").val().trim()
						},

						type : "POST",
						dataType : "JSON",
						
						success : function(json) {
							if (json === 1) {
								event.preventDefault();
								alert_msg(msg, "error", "该邮箱已经注册，请选择其它邮箱");
								//$("#email").focus();
								return;
							}
						},
						
						error : function(xhr, status) {
							alert_msg(msg, "error", "请刷新重试，或者反馈<a href='http://lanmiao.me/help.jsp#title4' target = '_blank'> @懒喵</a>");
						}
					});	
			   }
			}

		}
		
		
    	if ($("#password1").val().trim().length < 6 || $("#password1").val().trim().length > 20 ||
    		$("#password2").val().trim().length < 6 || $("#password2").val().trim().length > 20) {
    		event.preventDefault();
			alert_msg(msg, "error", "请输入6-20位的密码");
			return;
		}else{
			
			if ($("#password1").val().trim() != $("#password2").val().trim()) {
				event.preventDefault();
				alert_msg(msg, "error", "密码和确认密码要一致");
				return;
			}	
		}	
    	
    	msg.hide();
    	
		  
	    
	});
	
	
	function alert_msg(i_msg, i_type, i_text) {
		i_msg.update({
			message : i_text,
			type : i_type
		});
	}
	
	});