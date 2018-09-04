<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
String email = request.getParameter("email");
String sid = request.getParameter("sid");

if(email == null || "".equals(email) || sid == null || "".equals(sid)){
	response.sendRedirect("login.html");
}
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>懒喵[找回密码]</title>
    
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta http-equiv="keywords" content="懒喵,记账,理财">
    <meta http-equiv="description" content="懒喵理财登录页">
    <meta http-equiv="content-type" content="text/html; charset=UTF-8">
    
    <link href="css/bootstrap.min.css" rel="stylesheet">
    <link href="css/messenger.css" rel="stylesheet">
    <link href="css/messenger-theme-flat.css" rel="stylesheet">
    <link rel="shortcut icon" href="images/favicon.ico">

  </head>
  
  <body>
      	<div class="container">
      <h2 class="form-signin-heading" align="center"><strong>懒喵[找回密码]</strong></h2>
 		<div class="panel panel-primary col-xs-offset-0 col-xs-12 col-sm-offset-0 col-sm-12 col-lg-offset-2 col-lg-8">
		  <div class="panel-heading">
		    <h3 class="panel-title">新密码</h3>
		  </div>
		  <div class="panel-body">
		   	
      <form class="form-horizontal" role="form" method="post" id="register1">
		  <div class="form-group">
		    <label for="email" class="col-xs-offset-0 col-sm-offset-1 col-xs-12 col-sm-2 control-label">邮箱</label>
		    <div class="col-xs-11 col-sm-6">
		       <input id="email" name="email" class="form-control input-lg" value="<%=email %>" disabled="disabled">
		    </div>
		   
		   <input type="hidden" id="sid" name="sid" value="<%=sid %>" disabled="disabled">
		   
		  </div>
		  <div class="form-group">
		    <label for="password1" class="col-xs-offset-0 col-sm-offset-1 col-xs-12 col-sm-2 control-label">新密码</label>
		    <div class="col-xs-11 col-sm-6">
		      <input id="password1" name="password1" type="password" class="form-control input-lg" placeholder="密码" required>
		    </div>
		    <span class="glyphicon glyphicon-asterisk" style="padding-top: 15px;color: red;"></span>
		  </div>
		  <div class="form-group">
		    <label for="password2" class="col-xs-offset-0 col-sm-offset-1 col-xs-12 col-sm-2 control-label">确认密码</label>
		    <div class="col-xs-11 col-sm-6">
		      <input id="password2" name="password2" type="password" class="form-control input-lg" placeholder="确认密码" required>
		    </div>
		    <span class="glyphicon glyphicon-asterisk" style="padding-top: 15px;color: red;"></span>
		  </div>
		  
		  <div class="form-group">
		    <div class="col-xs-offset-0 col-xs-11 col-sm-offset-3 col-sm-6" id="findDiv">
		      <button class="btn btn-lg btn-primary btn-block" id="find" type="button">找回</button>
		    </div>
		  </div>
		</form>  
  	
  	</div>
  </div>
  </div>
    
    <script src="js/jquery-1.11.0.min.js"></script>
    <script src="js/bootstrap.min.js"></script>
    <script src="js/messenger.min.js"></script>
    <script src="js/messenger-theme-flat.js"></script>
    
    <script>
    $(document).ready(function() {
    
    Messenger.options = {
		parentLocations : [ '.panel-heading' ],
		extraClasses : 'messenger-fixed  messenger-on-top',
		theme : 'flat'
	};

	var msg = Messenger().post("initial msg");
	msg.hide();
	
    $("#password1").on("change", function() {
        
			if (this.value.trim().length < 6 || this.value.trim().length > 20) {
				alert_msg(msg, "error", "请输入6-20位的密码");
				this.focus();
			}else{
				msg.hide();
				$("#password2").focus();	
			}

	});

	$("#password2").on("change",  function() {
			if (this.value.trim() === $("#password1").val().trim()){
				msg.hide();	
			}else{
				alert_msg(msg, "error", "密码和确认密码要一致");
			}
	});
	
	
	$("#find").on("click", function(){
		if ($("#password1").val().trim().length < 6 || $("#password1").val().trim().length > 20
	    	|| $("#password2").val().trim().length < 6 || $("#password2").val().trim().length > 20) {
	    	alert_msg(msg, "error", "请输入6-20位的密码");
			return;
				
		}else{
			msg.hide();
		}
		
		if ($("#password1").val().trim() != $("#password2").val().trim()) {
			alert_msg(msg, "error", "新密码和确认密码要一致");
			return;
		}else{
			msg.hide();
		}
		
		$.ajax({
					url : "findpwd.me",

					data : {
						email : $("#email").val(),
						pwd : $("#password1").val().trim(),
						sid :  $("#sid").val()
					},

					type : "POST",
					dataType : "JSON",
					
					success : function(json) {
					
						if (json === -1) {
							alert_msg(msg, "error", "此邮箱不是你的，不能找回密码");
						}else if(json === 0){
							$("#password1, #password2").attr("disabled", "disabled");
							$("#findDiv").html("<a href='login.html'>返回登录</a>");
                            alert_msg(msg, "success", "密码已修改，找回成功，请用新密码登录");
						}else{
							alert_msg(msg, "error", "密码找回失败，请重试或联系管理员");
						}
					},
					
					error : function(xhr, status) {
						alert_msg(msg, "error","Sorry, there was a problem!");;
					},
				});	
		
	
	});
	
	function alert_msg(i_msg, i_type, i_text) {
		i_msg.update({
			message : i_text,
			type : i_type
		});
	};
	
	});
    </script>
  </body>
</html>
