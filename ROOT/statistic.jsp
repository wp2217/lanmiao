<%@page import="com.lmlc.dao.JiZhangDao"%>
<%@page import="com.lmlc.pojo.*"%>
<%@page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
 User user = (User)session.getAttribute("user");
%>
<html lang="zh-cn">
<head>
<title>懒喵[月结统计]</title>
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1.0 user-scalable=yes" /> 
<meta http-equiv="keywords" content="懒喵,记账,懒喵统计">
<meta http-equiv="description" content="懒喵统计页面">
<meta http-equiv="content-type" content="text/html; charset=UTF-8">

<link href="css/bootstrap.min.css" rel="stylesheet">
<link href="css/messenger.css" rel="stylesheet">
<link href="css/messenger-theme-flat.css" rel="stylesheet">
<link href="css/statistic.css" rel="stylesheet">
<link href="css/common.css" rel="stylesheet">
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
			<li class="active"><a href="statistic.jsp" >统计</a></li>
			<li><a href="51.jsp">五金</a></li>
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
    <div class="navbar navbar-default" role="navigation">
      <div class="container small_font">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#menu2">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a class="navbar-brand ">统计月份</a>
        </div>
        <div class="navbar-collapse collapse" id="menu2">
          <ul class="nav navbar-nav">
          <li id="year_pre"><a href="#">前一年</a></li>
          <li id="mon1"><a href="#">1月</a></li>
          <li id="mon2"><a href="#">2月</a></li>
          <li id="mon3"><a href="#">3月</a></li>
          <li id="mon4"><a href="#">4月</a></li>
          <li id="mon5"><a href="#">5月</a></li>
          <li id="mon6"><a href="#">6月</a></li>
          <li id="mon7"><a href="#">7月</a></li>
          <li id="mon8"><a href="#">8月</a></li>
          <li id="mon9"><a href="#">9月</a></li>
          <li id="mon10"><a href="#">10月</a></li>
          <li id="mon11"><a href="#">11月</a></li>
          <li id="mon12"><a href="#">12月</a></li>
          <li id="year_nex"><a href="#">下一年</a></li>
          </ul>
        </div><!--/.nav-collapse -->
      </div>
    </div>
      
      <div class="row" id="pie">
      	<div class="col-xs-12 col-md-6" id="pie1">
      	
      	</div>
      	
      	<div class="col-xs-12 col-md-6">
      		<div class="row" id="pie2">
      			
      		</div>
            
            <button id="modify_half" class="col-xs-offset-3 btn btn-primary" data-toggle="modal" data-target="#myModal">调整半固定消费</button>
      	</div>       
      </div>
      
      
      <hr/> 
      	<div class="row" id="column1">
      	
      	</div>  
      <br/>
      
      <div class="row">
      	<h5 align="center" id="monthSum" class="fontSizeAuto">
      	  
       </h5>
      	  
      </div>

<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
        <h4 class="modal-title" id="myModalLabel" align="center"><span class="label label-primary" id="popupTitle">懒喵记账[调整半固定消费]</span></h4>
      </div>
      <div class="modal-body">
        <form class="form-horizontal" role="form" id="popUpForm"> 
		</form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
        <button type="button" class="btn btn-primary" id="popUpSave">保存</button>
      </div>
    </div>
  </div>
</div>
<%@include file="dialog.jsp"  %> 
</div> <!-- container -->

      <!-- Site footer -->
      <div class="container">
      <div class="footer">
        <hr/>
         <p class="copyright">&copy; <a href="http://lanmiao.me" target="_blank">Lanmiao.me</a> 2014 沪ICP备14015278号</p>
      </div>
      </div>
     
      
	<script src="js/jquery-1.11.0.min.js"></script>
	<script src="js/bootstrap.min.js"></script>
	<script src="js/messenger.min.js"></script>
    <script src="js/messenger-theme-flat.js"></script>	
	<script src="js/highcharts.js"></script>
    <script src="js/exporting.js"></script>
    <script src="js/data.js"></script>
    <script src="js/drilldown.js"></script>
    <script src="js/sessionTimeout.js"></script>
    <script src="js/statistic.js"></script>
    <script src="js/dialog.js"></script>
</body>
</html>
