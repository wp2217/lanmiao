<%@page import="com.lmlc.pojo.*"%>
<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
Profile2 pro2 = new Profile2();

 User user = (User)session.getAttribute("user");
 Profile1 pro1 = (Profile1)session.getAttribute("pro1");
 List<Profile2> pro2List = (ArrayList)session.getAttribute("pro2List");
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html lang="zh-cn">
<head>
	<base href="<%=basePath%>">
	<title>懒喵[注册信息汇总]</title>
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<meta http-equiv="keywords" content="懒喵,记账,理财">
	<meta http-equiv="description" content="懒喵理财登录页">
	<meta http-equiv="content-type" content="text/html; charset=UTF-8">
	
	<link href="css/bootstrap.min.css" rel="stylesheet">
	<link href="css/messenger.css" rel="stylesheet">
	<link href="css/messenger-theme-flat.css" rel="stylesheet">
	<link href="css/common_bg.css" rel="stylesheet">
	<link href="css/common.css" rel="stylesheet">
	<link rel="shortcut icon" href="images/favicon.ico">

<style type="text/css">
p {
	font-size: 14px;
}

</style>

</head>

<body>
	<div class="container">
		<h2 align="center" id="mgs_area">
			<strong>注册信息预览</strong>
		</h2>

		<hr>
		<div class="row">
			<div class="col-xs-offset-0 col-xs-6 col-sm-offset-2 col-sm-5">
				<h4>
					<span class="label label-info">个人信息</span>
				</h4>
				<p>
					Email:
					<%=user.getEmail()%></p>
				<p>
					密码:
					<%=user.getPassword()%></p>
				<p>
					昵称:
					<%=user.getNeck()%></p>
			</div>

			<div class="col-xs-offset-0 col-xs-6  col-sm-5">
				<h4>
					<span class="label label-info">工资信息</span>
				</h4>
				<p>
					税前薪资:
					<small class="greenNumber"><%=pro1.getSalary()%>元</small></p>
					
				<p>
					税后薪资:
					<small class="greenNumber"><%=pro1.getFinalsalary()%>元</small></p>
				<p>
					应付税款:<small class="greenNumber">
					<% if(pro1.getcMoney()==null){
						out.println("无");
					}else{
					    out.println(pro1.getcMoney() +  "元");
					} %></small>
				</p>
				
			</div>

		</div>

		<hr>
		<div class="row">
			<div class="col-xs-offset-0 col-xs-6 col-sm-offset-2 col-sm-5">
				<h4>
					<span class="label label-info">固定消费</span>
				</h4>

				<%
					Iterator<Profile2> itr = pro2List.iterator();
				     	   while(itr.hasNext()){
				     	   	pro2 = itr.next();
				     	   	
				     	   	if(0 == pro2.getType() || "房贷".equals(pro2.getText())){
				%>
				<p><%=pro2.getText()%>:<small class="greenNumber">
					<%=pro2.getValue()%>元  <%
					 	if(pro2.getType() == 1){
					            	out.print("公积金还房贷");
					            	}
			 %></small>
				</p>
				<%
					}
				     	   }
				%>
			</div>
			<div class="col-xs-offset-0 col-xs-6  col-sm-5">
				<h4>
					<span class="label label-info">半固定消费</span>
				</h4>
				<%
					Iterator<Profile2> itr1 = pro2List.iterator();
				     	   while(itr1.hasNext()){
				     	   	pro2 = itr1.next();
				     	   	
				     	   	if(1 == pro2.getType() && !"房贷".equals(pro2.getText()) ){
				%>
				<p><%=pro2.getText()%>:<small class="greenNumber">
					<%=pro2.getValue()%>元</small>
				</p>
				<%
					}
      }
				%>

			</div>

		</div>

		<hr>

		<h4 align="center">
			<span class="label label-info">五险一金(<%=pro1.getCityDesc() %>)</span>
		</h4>

		<div class="row">
			<%
				if(0 == user.getJin()){
			        	
			        	out.println("<h4 align='center'><span class='label label-info'>未输入五险一金相关信息</span></h4>");
			        	
			        	}else{
			%>
			
			<div class="col-xs-offset-0 col-xs-6 col-sm-offset-2 col-sm-5">
			
				<h4>
					<span class="label label-info">个人缴纳</span>
				</h4>

				<p>
					住房公积金:
					<%=pro1.getJin1()%>%<small class="greenNumber">[￥<%=pro1.getJin1() * pro1.getGjjjs() / 100%>]</small>
				</p>
				<p>
					养老保险:
					<%=pro1.getJin2()%>%<small class="greenNumber">[￥<%=pro1.getJin2() * pro1.getSbjs() / 100%>]</small>
				</p>
				<p>
					医疗保险:
					<%=pro1.getJin3()%>%<small class="greenNumber">[￥<%=pro1.getJin3() * pro1.getSbjs() / 100%>]</small>
				</p>
				<p>
					失业保险:
					<%=pro1.getJin4()%>%<small class="greenNumber">[￥<%=pro1.getJin4() * pro1.getSbjs() / 100%>]</small>
				</p>
				<p>
					工伤保险:
					<%=pro1.getJin5()%>%<small class="greenNumber">[￥<%=pro1.getJin5() * pro1.getSbjs() / 100%>]</small>
				</p>
				<p>
					生育保险:
					<%=pro1.getJin6()%>%<small class="greenNumber">[￥<%=pro1.getJin6() * pro1.getSbjs() / 100%>]</small>
				</p>
			</div>

			<div class="col-xs-offset-0 col-xs-6 col-sm-5">
				<h4>
					<span class="label label-info">公司缴纳</span>
				</h4>

				<p>
					住房公积金:
					<%=pro1.getgJin1()%>%<small class="greenNumber">[￥<%=pro1.getgJin1() * pro1.getGjjjs() / 100%>]</small>
				</p>
				<p>
					养老保险:
					<%=pro1.getgJin2()%>%<small class="greenNumber">[￥<%=pro1.getgJin2() * pro1.getSbjs() / 100%>]</small>
				</p>
				<p>
					医疗保险:
					<%=pro1.getgJin3()%>%<small class="greenNumber">[￥<%=pro1.getgJin3() * pro1.getSbjs() / 100%>]</small>
				</p>
				<p>
					失业保险:
					<%=pro1.getgJin4()%>%<small class="greenNumber">[￥<%=pro1.getgJin4() * pro1.getSbjs() / 100%>]</small>
				</p>
				<p>
					工伤保险:
					<%=pro1.getgJin5()%>%<small class="greenNumber">[￥<%=pro1.getgJin5() * pro1.getSbjs() / 100%>]</small>
				</p>
				<p>
					生育保险:
					<%=pro1.getgJin6()%>%<small class="greenNumber">[￥<%=pro1.getgJin6() * pro1.getSbjs() / 100%>]</small>
				</p>
			</div>
			
			<%
				}
			%>

		</div>

		<hr>
		<div class="row">
		
			<div class="col-xs-6 col-sm-offset-3 col-sm-2">
				<button class="btn btn-primary btn-block" type="button"
					id="register">确认注册</button>
				
			</div>
		
			<div class="col-xs-6 col-sm-offset-2 col-sm-2">
				
			   <a class="btn  btn-danger btn-block" href="register1.html">重新注册</a>
				
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
				parentLocations : [ 'body' ],
				extraClasses : 'messenger-fixed  messenger-on-top',
				theme : 'flat'
			};
		
			var msg = Messenger().post("initial msg");
			msg.hide();

		
			$("#register").on("click", function() {

				$.ajax({
					url : "Register",

					data : {
						register : 1
					},

					type : "POST",
					dataType : "JSON",

					success : function(flag) {
						if (flag === 1) {
							alert_msg(msg, "error", "注册失败,请重新注册");
							
						}else if(flag === -1){
							alert_msg(msg, "error", "注册失败,该邮件已经注册，请重新注册");
						
						} else {
							alert_msg(msg, "success", "恭喜您，注册成功，为您自动导航到懒喵记账主页");
							
							window.setTimeout(function(){
							  window.location.href = "main.jsp";
							
							
							}, 3500);
							
						}
					},

					error : function(xhr, status) {
						alert_msg(msg, "error", "注册失败,请重新注册, 或联系wp217@126.com");
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

		});
	</script>


</body>
</html>
