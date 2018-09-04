<%@page import="com.lmlc.pojo.User"%>
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
<meta http-equiv="keywords" content="懒喵记账主页">
<meta http-equiv="description" content="懒喵记账主页面">
<title>懒喵[每日记账]</title>

<!-- Bootstrap -->

<link href="css/bootstrap.min.css" rel="stylesheet">
<link href="css/messenger.css" rel="stylesheet">
<link href="css/messenger-theme-flat.css" rel="stylesheet">
<link href="css/main.css" rel="stylesheet">
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
			<li class="active"><a href="main.jsp">每日记账</a></li>
			<li><a href="statistic.jsp" >统计</a></li>
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
          <a class="navbar-brand">记账日期</a>
        </div>
        <div class="navbar-collapse collapse" id="menu2">
          <ul class="nav navbar-nav">
            <li><a  id="pre_week"><span
					class="glyphicon glyphicon-chevron-up"></span> </a>
			<li><a  id="week1"></a></li>
			<li><a  id="week2"></a></li>
			<li><a  id="week3"></a></li>
			<li><a  id="week4"></a></li>
			<li><a  id="week5"></a></li>
			<li><a  id="week6"></a></li>
			<li><a  id="week7"></a></li>
			<li><a  id="nex_week"><span
					class="glyphicon glyphicon-chevron-down"></span> </a>
          </ul>
        </div><!--/.nav-collapse -->
      </div>
    </div>
    
		<div class="well col-md-offset-1 col-md-10">
				<div class="row">
				    <div class="row">
						<div class="col-xs-offset-0 col-xs-7 col-sm-offset-1 col-sm-8 col-md-offset-2 col-md-8 ">
	               			<div class="input-group">
								<span class="input-group-addon alert-info">描述</span> <input id="desc"
									type="text" class="form-control" placeholder="填写描述可精细化统计">
							</div>
					    </div>
					    
					    <div class=" col-md-1 col-xs-1">
							<button type="button" id="addone" class="btn btn-info">
								记一笔&nbsp;<span class="glyphicon glyphicon-ok"></span>
							</button>
						</div>
				    </div>
				    <br>
				
					<div class="row">
						<div class="col-xs-offset-0 col-xs-10 col-sm-offset-1 col-sm-8 col-md-offset-2 col-md-8 ">
							<div class="input-group">
								<span class="input-group-addon alert-info">￥</span> <input id="mount"
									type="number" class="form-control" placeholder="金额[数字]">
								<span class="input-group-addon alert-info">元</span>
							</div>
						</div>
						
					</div>
				    
                   <br>

					<div class="panel panel-info col-md-12">
						<div class="panel-heading">
							<h3 class="panel-title" align="center">支出类别</h3>
						</div>

						<div class="panel-body" id="outcome">
						    <div class="row">
								<div class="col-xs-3 col-sm-offset-1 col-sm-2 col-md-offset-2 col-md-2 box">
									<a  class="thumbnail piaoliang1" id="yi"> 衣 </a>
								</div>
								<div class="col-xs-3 col-md-2 box">
									<a  class="thumbnail  piaoliang2" id="shi"> 食 </a>
								</div>
								<div class="col-xs-3  col-md-2 box">
									<a  class="thumbnail  piaoliang3" id="zhu"> 住 </a>
								</div>
								<div class="col-xs-3 col-md-2  box">
									<a  class="thumbnail  piaoliang4" id="xing"> 行 </a>
								</div>
                            </div>
                            
                            <div class="row">
                            	<div class="col-xs-3 box col-sm-offset-1 col-sm-2 col-md-offset-2 col-md-2">
									<a  class="thumbnail piaoliang3"> 日用品 </a>
								</div>
								
								<div class="col-xs-3 col-md-2  box">
									<a  class="thumbnail piaoliang4" id="sg"> 水果</a>
								</div>

								<div class="col-xs-3 box col-md-2">
									<a  class="thumbnail piaoliang5"> 化妆 </a>
								</div>
								
								<div class="col-xs-3 box col-md-2">
									<a  class="thumbnail piaoliang7" id="wl"> 玩乐</a>
								</div>		
							</div>
							<div class="row">
								<div class="col-xs-3 col-sm-offset-1 col-sm-2 col-md-offset-2 col-md-2 box">
									<a  class="thumbnail piaoliang2" id="dz"> 电子 </a>
								</div>

								<div class="col-xs-3 col-md-2 box">
									<a  class="thumbnail piaoliang3" href="#myModal" data-toggle="modal" id="yy"> 医药</a>
								</div>
								<div class="col-xs-3 col-md-2 box">
									<a  class="thumbnail piaoliang6" id="cw"> 宠物</a>
								</div>

								<div class="col-xs-3 col-md-2 box">
									<a  class="thumbnail piaoliang5"> 其他 </a>
								</div>
							</div>

						</div>
					</div>

					<div class="panel panel-info col-md-12">
						<div class="panel-heading">
							<h3 class="panel-title" align="center">收入类别[补助 报销]</h3>
						</div>

						<div class="panel-body" id="income">
							<div class="row">
								<div class="col-xs-4 col-sm-offset-1 col-sm-2 col-md-offset-2 col-md-2 box">
									<a  class="thumbnail piaoliang2"> 食 </a>
								</div>
								<div class="col-xs-4 col-md-2 box">
									<a  class="thumbnail piaoliang3"> 住 </a>
								</div>

								<div class=" col-xs-4 col-md-2 box">
									<a  class="thumbnail piaoliang4"> 行 </a>
								</div>
							</div>
                            <div class="row">
								<div class="col-xs-4 col-sm-offset-1 col-sm-2 col-md-offset-2 col-md-2 box">
									<a  class="thumbnail piaoliang6"> 话费 </a>
								</div>

								<div class=" col-xs-4 col-md-4 box">
									<a  class="thumbnail piaoliang7"> 玩乐 </a>
								</div>

								<div class=" col-xs-4 col-md-4 box">
									<a class="thumbnail piaoliang5"> 其他 </a>
								</div>
							</div>

						</div>
					</div>

				</div>
				<div class="row">
					<div class="col-md-12">
						<hr>

						<table class="table table-hover table-condensed">
							<thead>
								<tr class="info">
									<th>收<span class="glyphicon glyphicon-import" style="color: blue;font-size: 10px"></span>
									   支<span class="glyphicon glyphicon-export" style="color: red;font-size: 10px"></span></th>
									<th>类型</th>
									<th>金额</th>
									<th>描述</th>
									<th>操作</th>
								</tr>
							</thead>

							<tbody>
							<tr></tr>
							</tbody>
						</table>

					</div>
				</div>

			</div><!-- well -->

<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
        <h3 class="modal-title" id="myModalLabel" align="center"><span class="label label-primary" id="popupTitle">懒喵记账</span></h3>
      </div>
      <div class="modal-body">
		<h4 align="center">是否用医疗保险报销医药消费？</h4>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" id="modal_no" data-dismiss="modal">否</button>
        <button type="button" class="btn btn-primary" id="modal_yes">是</button>
      </div>
    </div>
  </div>
</div>

<%@include file="dialog.jsp"  %>

</div><!-- container -->

      <!-- Site footer -->
      <div class="container">
      <div class="col-md-offset-1 footer">
        <hr/>
        <p class="copyright">&copy; <a href="http://lanmiao.me" target="_blank">Lanmiao.me</a> 2014 沪ICP备14015278号</p>
      </div>
      </div>

	

	<script src="js/jquery-1.11.0.min.js"></script>
	<script src="js/bootstrap.min.js"></script>
    <script src="js/messenger.min.js"></script>
    <script src="js/messenger-theme-flat.js"></script>	
    <script src="js/sessionTimeout.js"></script>
	<script src="js/main.js"></script>
    <script src="js/dialog.js"></script>
	

</body>
</html>