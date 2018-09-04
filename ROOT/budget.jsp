<%@page import="com.lmlc.dao.JiZhangDao"%>
<%@page import="com.lmlc.pojo.*"%>
<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
 User user = (User)session.getAttribute("user");
%>
<html lang="zh-cn">
<head>
<title>懒喵[预算]</title>
<meta http-equiv="Content-Type" content="text/html" charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta http-equiv="keywords" content="懒喵,记账,理财">


<link href="css/bootstrap.min.css" rel="stylesheet">
<link href="css/common.css" rel="stylesheet">
<link href="css/common_bg.css" rel="stylesheet">
<link rel="shortcut icon" href="images/favicon.ico">
</head>
<body>
<!-- Fixed navbar -->
    <div class="navbar navbar-inverse navbar-fixed-top" role="navigation">
      <div class="container">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <span class="navbar-brand"><a id="showDialog" style="color: #ffffff; font-weight: bold;" href="#dialog" data-toggle="modal">Lanmiao.me</a></span>
        </div>
        <div class="navbar-collapse collapse">
          <ul class="nav navbar-nav">
			<li><a href="main.jsp">每日记账</a></li>
			<li><a href="statistic.jsp" >统计</a></li>
			<li><a href="51.jsp">五金</a></li>
			<li class="active"><a href="budget.jsp">预算</a></li>
          </ul>
          <ul class="nav navbar-nav navbar-right">
            <li><a href="help.jsp" target="_blank">帮助</a></li>
            <li><a href="read.html" target="_blank">读书</a></li>
					<li><a  style="text-decoration: underline;" href="userServer.jsp">
					<%
					if(!"".equals(user.getNeck())){
						out.print(user.getNeck());
					}else{
						out.print(user.getEmail());
					}
					
					%></a></li>
					<li><a href="Logout">退出</a></li>
          </ul>
        </div><!--/.nav-collapse -->
      </div>
    </div>

    <div class="row">
        <br/>
    	<hr/>
    </div>
    
	<div class="container">
		<div class="row">
			<div class="col-sm-offset-3 col-sm-6 col-md-offset-3 col-md-6">
			<img class="featurette-image img-responsive" alt="建设中" src="images/building.jpg"/>
		    </div>
		</div>
		
      <div class="footer">
        <hr/>
         <p class="copyright">&copy; <a href="http://lanmiao.me" target="_blank">Lanmiao.me</a> 2014 沪ICP备14015278号</p>
      </div>
	</div>
	
	<%@include file="dialog.jsp" %>
	<script src="js/jquery-1.11.0.min.js"></script>
	<script src="js/bootstrap.min.js"></script>
	<script src="js/dialog.js"></script>
</body>
</html>