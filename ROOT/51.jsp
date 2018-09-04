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
<meta http-equiv="Content-Type" content="text/html" charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta http-equiv="keywords" content="懒喵五险一金">
<meta http-equiv="description" content="懒喵记账五险一金页面">
<title>懒喵[五险一金]</title>

<!-- Bootstrap -->

<link href="css/bootstrap.min.css" rel="stylesheet">
<link href="css/messenger.css" rel="stylesheet">
<link href="css/messenger-theme-flat.css" rel="stylesheet">
<link href="css/common.css" rel="stylesheet">
<link href="css/common_bg.css" rel="stylesheet">
<link href="css/51.css" rel="stylesheet">
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
			<li class="active"><a href="51.jsp">五金</a></li>
			<li><a href="budget.jsp">预算</a></li>
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
    
    <% 
    	if(user.getJin().equals(0)){
    	
    		out.println("<h2>您注册时未填写五险一金信息</h2>");
    	}else{
    	
    	
    
     %>
    
    	<div id="content">
    		<h3 align="center" class="text_style" id="header_h3">当月五险一金</h3>
    		
    		<table class="table table-hover" title="当前工作五险一金(上海)">
    			<thead>
    				<tr class="active"><th></th><th>个人缴纳</th><th>公司缴纳</th><th>当月扣除</th><th>已累计</th></tr>
    			</thead>

	    		<tr class="active" id="rjin1"><td>住房公积金</td><td class="greenNumber"></td><td class="greenNumber"></td><td class="greenNumber"></td><td class="greenNumber"></td></tr>
				<tr class="success" id="rjin2"><td>养老保险</td><td class="greenNumber"></td><td class="greenNumber"></td><td class="greenNumber"></td><td class="greenNumber"></td></tr>
				<tr class="warning" id="rjin3"><td>医疗保险</td><td class="greenNumber"></td><td class="greenNumber"></td><td class="greenNumber"></td><td class="greenNumber"></td></tr>
				<tr class="danger" id="rjin4"><td>失业保险</td><td class="greenNumber"></td><td class="greenNumber"></td><td class="greenNumber"></td><td class="greenNumber"></td></tr>
				<tr class="info" id="rjin5"><td>工伤保险</td><td class="greenNumber"></td><td class="greenNumber"></td><td class="greenNumber"></td><td class="greenNumber"></td></tr>
				<tr class="active" id="rjin6"><td>生育保险</td><td class="greenNumber"></td><td class="greenNumber"></td><td class="greenNumber"></td><td class="greenNumber"></td></tr>
    		    <tr class="warning" ><td></td><td colspan="2" id="sbno" class="greenNumber"></td><td colspan="2" class="greenNumber">官网查询：<a href="#" id="sburl" target="_blank"><span class="glyphicon glyphicon-share-alt"></span></a></td></tr>
    		    <tr class="info" ><td></td><td id="gjjno" colspan="2" class="greenNumber"> </td><td colspan="2" class="greenNumber">官网查询：<a href="#" id="gjjurl" target="_blank"><span class="glyphicon glyphicon-share-alt"></span></a></td></tr>
    		</table>
    		
    		
    		
    	</div>
    	
    	<%
    		}
    	 %>
   
     
      
      <!-- Site footer -->
      <div class="footer">
        <hr/>
         <p class="copyright">&copy; <a href="http://lanmiao.me" target="_blank">Lanmiao.me</a> 2014 沪ICP备14015278号</p>
      </div>
    </div>
    
    <%@include file="dialog.jsp"  %> 
  
	<script src="js/jquery-1.11.0.min.js"></script>
	<script src="js/bootstrap.min.js"></script>
    <script src="js/messenger.min.js"></script>
    <script src="js/messenger-theme-flat.js"></script>	
    <script src="js/sessionTimeout.js"></script>
	<script src="js/dialog.js"></script>
	<script src="js/wuyi.js"></script>
  </body>
</html>
