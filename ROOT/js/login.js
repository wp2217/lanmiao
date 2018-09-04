$(document).ready(function() {
	
	       var flag_email = '';
			Messenger.options = {
				parentLocations : [ 'body' ],
				extraClasses : 'messenger-fixed  messenger-on-top',
				theme : 'flat'
			};
		
			var msg = Messenger().post("initial msg");
			msg.hide();
			//$("#email").focus();
			
			if(request("flag") === '1'){
				alert_msg(msg, "error", "<h5>你好久没进行操作，会话已过期，请重新登录。</h5><h6>提示:想一直在线，请选择[两周内不用重复登录]</h6>");
			};
			
			$("#email").autoEmail(
					["qq.com", "gmail.com", "yahoo.com", "126.com", "163.com", "sina.com", "hotmail.com"], // an array of domains to autocomplete
					false // enables the user to enter multiple emails in the field
					);
		

			$("#email").on("blur", flag_email, function() {  //Email 验证

				if (this.value.length === 0) {
					alert_msg(msg, "error", "请输入你注册的邮箱");
					flag_email = '';
					//this.focus();
				} else {
					var res = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
					var re = new RegExp(res);
					if (this.value.match(re) === null) {
						alert_msg(msg, "error", "请输入正确的邮箱格式");
						//this.focus();
					} else {
						$.ajax({
							url : "CheckEmail",

							data : {
								email : this.value
							},

							type : "POST",
							dataType : "JSON",
							
							success : function(json) {
								if (json != 1) {
									alert_msg(msg, "error", "该邮箱未注册，请注册或选择其它邮箱");
									flag_email = '';
									//$("#email").focus();
								}else{
									msg.hide();
									//$("#password1").focus();
									flag_email = 'x';
								}
							},
							
							error : function(xhr, status) {
								alert_msg(msg, "error","请刷新重试，或者反馈<a href='http://lanmiao.me/help.jsp#title4' target = '_blank'> @懒喵</a>");
							},
						});	
						
					}
				}
			});
			
			$("#findpwd").on("click", function(){
				
				if (flag_email === 'x') {
					$(".modal-body").html("<h3 align='center'>为该邮箱找回密码[" + $("#email").val().trim() + "]?</h3>");
					$('#myModal').modal('show');
					return;
				}else if($("#email").val().trim().length === 0) {
					alert_msg(msg, "error", "请输入你注册的邮箱");
					flag_email = '';
					//$("#email").focus();
					return;
				}else{
					var res = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
					var re = new RegExp(res);
					if ($("#email").val().trim().match(re) === null) {
						alert_msg(msg, "error", "请输入正确的邮箱格式");
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
								if (json != 1) {
									alert_msg(msg, "error", "该邮箱未注册，请注册或选择其它邮箱");
									flag_email = '';
									//$("#email").focus();
								}else{
									msg.hide();
									$(".modal-body").html("<h3 align='center'>为该邮箱找回密码[" + $("#email").val().trim() + "]?</h3>");
									$('#myModal').modal('show');
									return;
								}
							},
							
							error : function(xhr, status) {
								alert_msg(msg, "error","请刷新重试，或者反馈<a href='http://lanmiao.me/help.jsp#title4' target = '_blank'> @懒喵</a>");;
							},
						});	
						
					}
				}
			});
			
			$("#modal_yes").on("click", function(){
				$.ajax({
					url : "findpwd.me",

					data : {
						email : $("#email").val().trim()
					},

					type : "POST",
					dataType : "JSON",
					
					success : function(json) {
						
						switch (json) {
						case 0:
							$('#myModal').modal('hide');
							alert_msg(msg, "success", "已向你注册的邮箱发送邮件请查收");
							break;
						case 1:
							alert_msg(msg, "error", "找回密码失败，请重试");
							break;
						default:
							alert_msg(msg, "error", "该邮箱没有注册，不能找回密码");
							break;
						}
						
					},
					
					error : function(xhr, status) {
						alert_msg(msg, "error","请刷新重试，或者反馈<a href='http://lanmiao.me/help.jsp#title4' target = '_blank'> @懒喵</a>");;
					},
				});	

			});
			
			$(document).keydown(function(event){ 
			   if (event.keyCode === 13) {
				   
				   if ($("#email").val().length === 0 || $("#password").val().length === 0) {
						alert_msg(msg, "error", "请检查邮箱和密码输入");
						return;
						
					}
					

					$.ajax({
						url : "Login",

						data : $("#loginForm").serialize(),

						type : "POST",
						dataType : "JSON",

						success : function(flag) {
							if (flag === 1) {
								alert_msg(msg, "error", "邮箱或密码错误，请确认");
								
							} else {
								window.location.href = "main.jsp";
							}
						},

						error : function(xhr, status) {
							alert_msg(msg, "error", "请刷新重试，或者反馈<a href='http://lanmiao.me/help.jsp#title4' target = '_blank'> @懒喵</a>");
							;
						},
					});
			   }
			}); 
			

			$("#login").on("click", function() {
				if ($("#email").val().length === 0 || $("#password").val().length === 0) {
					alert_msg(msg, "error", "请检查邮箱和密码输入");
					return;
					
				}
				

				$.ajax({
					url : "Login",

					data : $("#loginForm").serialize(),

					type : "POST",
					dataType : "JSON",

					success : function(flag) {
						if (flag === 1) {
							alert_msg(msg, "error", "邮箱或密码错误，请确认");
						} else {
							window.location.href = "main.jsp";
						}
					},

					error : function(xhr, status) {
						alert_msg(msg, "error", "请刷新重试，或者反馈<a href='http://lanmiao.me/help.jsp#title4' target = '_blank'> @懒喵</a>");
						;
					},
				});

			});
			
	function alert_msg(i_msg, i_type, i_text) {
		i_msg.update({
			message : i_text,
			type : i_type
		});
	};
	
	function request(paras)
    { 
        var url = location.href; 
        var paraString = url.substring(url.indexOf("?")+1,url.length).split("&"); 
        var paraObj = {};
        for (var i=0; j=paraString[i]; i++){ 
        paraObj[j.substring(0,j.indexOf("=")).toLowerCase()] = j.substring(j.indexOf("=")+1,j.length); 
        } 
        var returnValue = paraObj[paras.toLowerCase()]; 
        if(typeof(returnValue)=="undefined"){ 
        return ""; 
        }else{ 
        return returnValue; 
        } 
    }

		});