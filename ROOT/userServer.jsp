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
<title>懒喵[个人及理财信息]</title>


<link href="css/bootstrap.min.css" rel="stylesheet">
<link href="css/ymcalendar.css" rel="stylesheet">
<link href="css/messenger.css" rel="stylesheet">
<link href="css/messenger-theme-flat.css" rel="stylesheet">
<link href="css/common.css" rel="stylesheet">
<link href="css/userServer.css" rel="stylesheet">
<link rel="shortcut icon" href="images/favicon.ico">
</head>

<body>
	<br><br><!-- Fixed navbar -->
	<div class="navbar navbar-inverse navbar-fixed-top" role="navigation">
		<div class="container">
			<div class="navbar-header">
				<button type="button" class="navbar-toggle" data-toggle="collapse"
					data-target="#navbar1">
					<span class="sr-only">Toggle navigation</span> <span
						class="icon-bar"></span> <span class="icon-bar"></span> <span
						class="icon-bar"></span>
				</button>
				<span class="navbar-brand"><a id="showDialog"
					style="color: #ffffff; font-weight: bold;" href="#dialog"
					data-toggle="modal">Lanmiao.me</a>
				</span>
			</div>
			<div class="navbar-collapse collapse" id="navbar1">
				<ul class="nav navbar-nav">
					<li><a href="main.jsp">每日记账</a>
					</li>
					<li><a href="statistic.jsp">统计</a>
					</li>
	                <li><a href="51.jsp">五金</a></li>
					<li><a href="budget.jsp">预算</a>
					</li>
				</ul>
				<ul class="nav navbar-nav navbar-right">
					<li><a href="help.jsp" target="_blank">帮助</a>
					</li>
					<li><a href="read.html" target="_blank">读书</a>
					</li>
					<li class="active"><a style="text-decoration: underline;"
						href="userServer.jsp"> <%
					if(!"".equals(user.getNeck())){
						out.print(user.getNeck());
					}else{
						out.print(user.getEmail());
					}
					
					%>
					</a>
					</li>
					<li><a href="Logout">退出</a>
					</li>
				</ul>
			</div>
			<!--/.nav-collapse -->
		</div>
	</div>

	<div class="row">
		<br />
		<hr />
	</div>

	<div class="container" id="msgarea">
		<div class="panel-group" id="accordion">
			<!-- 个人信息 start -->
			<div class="panel panel-info col-sm-offset-0 col-sm-12">
				<div class="panel-heading">
					<h3 class="panel-title">
						<a data-toggle="collapse" data-parent="#accordion"
							href="#collapseOne">个人信息</a>
					</h3>
				</div>
				<div id="collapseOne" class="panel-collapse collapse">
					<div class="panel-body">
						<form class="form-horizontal" role="form" action="">
							<div class="form-group">
								<label for="email1"
									class="col-sm-offset-2 col-sm-2 control-label">邮箱</label>
								<div class="col-sm-4">
									<input id="email" name="email" type="email"
										class="form-control" placeholder="邮箱" required autofocus>
								</div>
							</div>

							<div class="form-group">
								<label for="neck" class="col-sm-offset-2 col-sm-2 control-label">昵称</label>
								<div class="col-sm-4">
									<input id="neck" type="text" name="neck" class="form-control"
										placeholder="昵称" required>
								</div>

							</div>

							<div class="form-group">
								<label for="" class="col-sm-offset-2 col-sm-2 control-label"></label>
								<div class="col-sm-4">
									<a href="#myModal" data-toggle="modal"
										style="text-decoration: underline;">修改密码</a>
								</div>

							</div>

							<div class="row">
								<div
									class="col-xs-12 col-sm-offset-9 col-sm-3 col-md-offset-9 col-md-3"
									id="panel1">
									<button class="btn btn-primary" role="button" id="mod">修改</button>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
			<!-- 个人信息  end-->

			<!-- 固定半固定 start -->
			<div class="panel panel-info col-sm-offset-0 col-sm-12">
				<div class="panel-heading">
					<h3 class="panel-title">
						<a data-toggle="collapse" data-parent="#accordion"
							href="#collapseThree">固定、半固定消费 </a>
					</h3>
				</div>
				<div id="collapseThree" class="panel-collapse collapse">
					<div id="panelGuDing" class="panel-body">
						<form class="form-horizontal" role="form" action="">
							<div class="form-group">
								<label for="rent"
									class="col-xs-offset-0 col-xs-12 col-sm-offset-0  col-sm-3 col-md-offset-2  col-md-2 control-label">房租</label>
								<div class="col-xs-11 col-sm-4">
									<div class="input-group">
										<input id="rent" name="rent" class="form-control" value="未填写"
											placeholder="房租"> <span class="input-group-addon">元</span>
									</div>
								</div>
								<div class="col-sm-5 col-md-4">
									<div class="radio radio-inline">
										<label> <input id="radio_rent1" type="radio"
											name="radio_rent" value="0" checked="checked">固定消费 </label>
									</div>
									<div class="radio radio-inline">
										<label> <input id="radio_rent2" type="radio"
											name="radio_rent" value="1">半固定消费 </label>
									</div>
								</div>
							</div>

							<div class="form-group">
								<label for="loan"
									class="col-xs-offset-0 col-xs-12 col-sm-offset-0  col-sm-3 col-md-offset-2  col-md-2 control-label">房贷</label>
								<div class="col-xs-11 col-sm-4">
									<div class="input-group">
										<input id="loan" name="loan" class="form-control" value="未填写"
											placeholder="房贷"> <span class="input-group-addon">元</span>
									</div>
								</div>
								<div class="col-sm-5 col-md-4">
									<div class="checkbox checkbox-inline">
										<label> <input type="checkbox" id="check_solid"
											name="check_solid" value="1" checked="checked">固定消费 </label>
									</div>
									<div class="checkbox checkbox-inline">
										<label> <input type="checkbox" id="check_jin"
											name="check_jin" value="1" checked="checked">公积金还房贷 </label>
									</div>
								</div>
							</div>

							<div class="form-group">
								<label for="net"
									class="col-xs-offset-0 col-xs-12 col-sm-offset-0  col-sm-3 col-md-offset-2  col-md-2 control-label">网费</label>
								<div class="col-xs-11 col-sm-4">
									<div class="input-group">
										<input id="net" name="net" class="form-control" value="未填写"
											placeholder="网费"> <span class="input-group-addon">元</span>
									</div>
								</div>
								<div class="col-sm-5 col-md-4">
									<div class="radio radio-inline">
										<label> <input id="radio_net1" type="radio"
											name="radio_net" value="0" checked="checked">固定消费 </label>
									</div>
									<div class="radio radio-inline">
										<label> <input id="radio_net2" type="radio"
											name="radio_net" value="1">半固定消费 </label>
									</div>
								</div>
							</div>
							<div class="form-group">
								<label for="tv"
									class="col-xs-offset-0 col-xs-12 col-sm-offset-0  col-sm-3 col-md-offset-2  col-md-2 control-label">有线电视费</label>
								<div class="col-xs-11 col-sm-4">
									<div class="input-group">
										<input id="tv" name="tv" class="form-control" value="未填写"
											placeholder="有线电视费"> <span class="input-group-addon">元</span>
									</div>
								</div>
								<div class="col-sm-5 col-md-4">
									<div class="radio radio-inline">
										<label> <input id="radio_tv1" type="radio"
											name="radio_tv" value="0" checked="checked">固定消费 </label>
									</div>
									<div class="radio radio-inline">
										<label> <input id="radio_tv2" type="radio"
											name="radio_tv" value="1">半固定消费 </label>
									</div>
								</div>
							</div>

							<div class="form-group">
								<label for="water"
									class="col-xs-offset-0 col-xs-12 col-sm-offset-0  col-sm-3 col-md-offset-2  col-md-2 control-label">水费</label>
								<div class="col-xs-11 col-sm-4">
									<div class="input-group">
										<input id="water" name="water" class="form-control"
											value="未填写" placeholder="水费"> <span
											class="input-group-addon">元</span>
									</div>
								</div>
								<div class="col-sm-5 col-md-4">
									<div class="radio radio-inline">
										<label> <input id="radio_water1" type="radio"
											name="radio_water" value="0" checked="checked">固定消费 </label>
									</div>
									<div class="radio radio-inline">
										<label> <input id="radio_water2" type="radio"
											name="radio_water" value="1">半固定消费 </label>
									</div>
								</div>
							</div>
							<br>
							<div class="form-group">
								<label for="electric"
									class="col-xs-offset-0 col-xs-12 col-sm-offset-0  col-sm-3 col-md-offset-2  col-md-2 control-label">电费</label>
								<div class="col-xs-11 col-sm-4">
									<div class="input-group">
										<input id="electric" name="electric" class="form-control"
											value="未填写" placeholder="电费"> <span
											class="input-group-addon">元</span>
									</div>
								</div>
								<div class="col-sm-5 col-md-4">
									<div class="radio radio-inline">
										<label> <input id="radio_elec1" type="radio"
											name="radio_electric" value="0">固定消费 </label>
									</div>
									<div class="radio radio-inline">
										<label> <input id="radio_elec2" type="radio"
											name="radio_electric" value="1" checked="checked">半固定消费
										</label>
									</div>
								</div>
							</div>

							<div class="form-group">
								<label for="gas"
									class="col-xs-offset-0 col-xs-12 col-sm-offset-0  col-sm-3 col-md-offset-2  col-md-2 control-label">煤气/天然气费</label>
								<div class="col-xs-11 col-sm-4">
									<div class="input-group">
										<input id="gas" name="gas" class="form-control" value="未填写"
											placeholder="煤气/天然气费"> <span
											class="input-group-addon">元</span>
									</div>
								</div>
								<div class="col-sm-5 col-md-4">
									<div class="radio radio-inline">
										<label> <input id="radio_gas1" type="radio"
											name="radio_gas" value="0">固定消费 </label>
									</div>
									<div class="radio radio-inline">
										<label> <input id="radio_gas2" type="radio"
											name="radio_gas" value="1" checked="checked">半固定消费 </label>
									</div>
								</div>
							</div>
							<div class="form-group">
								<label for="tel"
									class="col-xs-offset-0 col-xs-12 col-sm-offset-0  col-sm-3 col-md-offset-2  col-md-2 control-label">话费</label>
								<div class="col-xs-11 col-sm-4">
									<div class="input-group">
										<input id="tel" name="tel" class="form-control" value="未填写"
											placeholder="话费"> <span class="input-group-addon">元</span>
									</div>
								</div>
								<div class="col-sm-5 col-md-4">
									<div class="radio radio-inline">
										<label> <input id="radio_tel1" type="radio"
											name="radio_tel" value="0">固定消费 </label>
									</div>
									<div class="radio radio-inline">
										<label> <input id="radio_tel2" type="radio"
											name="radio_tel" value="1" checked="checked">半固定消费 </label>
									</div>
								</div>
							</div>

							<div class="form-group">
								<label for="bus"
									class="col-xs-offset-0 col-xs-12 col-sm-offset-0  col-sm-3 col-md-offset-2  col-md-2 control-label">公交车费</label>
								<div class="col-xs-11 col-sm-4">
									<div class="input-group">
										<input id="bus" name="bus" class="form-control" value="未填写"
											placeholder="公交车费"> <span class="input-group-addon">元</span>
									</div>
								</div>
								<div class="col-sm-5 col-md-4">
									<div class="radio radio-inline">
										<label> <input id="radio_bus1" type="radio"
											name="radio_bus" value="0">固定消费 </label>
									</div>
									<div class="radio radio-inline">
										<label> <input id="radio_bus2" type="radio"
											name="radio_bus" value="1" checked="checked">半固定消费 </label>
									</div>
								</div>
							</div>

							<div class="form-group" id="userDef">

								<hr />
								<label for="userDef1"
									class="col-xs-offset-0 col-xs-12 col-sm-offset-0  col-sm-3 col-md-offset-2  col-md-2 control-label">自定义消费</label>
								<div class="col-sm-8 col-md-6">

									<div class="input-group">
										<span class="input-group-addon">描述</span> <input id="desc"
											type="text" class="form-control" placeholder="描述"> <span
											class="input-group-addon">金额</span> <input id="mount"
											class="form-control" placeholder="金额">
									</div>

									<div class="row">
										<div class="col-xs-10 col-md-7 col-sm-7">
											<div class="radio radio-inline">
												<label> <input id="radio_user1" type="radio"
													value="0">固定消费 </label>
											</div>
											<div class="radio radio-inline">
												<label> <input id="radio_user2" type="radio"
													value="1">半固定消费 </label>
											</div>
										</div>

										<div class="col-xs-2 col-sm-2">
											<button id="userRemove"
												class="btn btn-sm btn-primary btn-block" type="button">
												<span class="glyphicon glyphicon-minus"></span>
											</button>
										</div>
									</div>
								</div>
							</div>

							<div class="form-group" id="addBeforeHere">
								<div
									class="col-xs-offset-0 col-xs-3 col-sm-offset-3 col-sm-2 col-md-offset-4 col-md-1">

									<button id="userAdd" class="btn btn-sm btn-primary btn-block"
										type="button">
										<span class="glyphicon glyphicon-plus"></span>
									</button>
								</div>
								<h5>添加自定义固定/半固定消费</h5>
							</div>
							<div class="row">
								<div
									class="col-xs-12 col-sm-offset-9 col-sm-3 col-md-offset-9 col-md-3"
									id="panel2">
									<button class="btn btn-primary" role="button" id="mod">修改</button>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
			<!-- 固定半固定 end -->

			<!-- 薪资及五险一金 start -->

			<div class="panel panel-info col-sm-offset-0 col-sm-12">
				<div class="panel-heading">
					<h3 class="panel-title">
						<a data-toggle="collapse" data-parent="#accordion"
							href="#collapseFour">薪资及五险一金</a>
					</h3>
				</div>
				<div id="collapseFour" class="panel-collapse collapse">

					<div class="panel-body">

						<form class="form-horizontal" role="form" action="">
							<div class="form-group">
				<label for="salary" class="col-xs-offset-0 col-xs-12 col-sm-offset-0 col-sm-3 col-md-offset-2 col-md-2 control-label">税前薪资</label>
				<div class="col-xs-11 col-sm-6 col-md-4">
				  <div class="input-group">
					<input id="salary" name="salary" class="form-control"
						placeholder="税前薪资" required="required">
					<span class="input-group-addon">元</span>	
				  </div>
				</div>
				<span class="glyphicon glyphicon-asterisk" style="padding-top: 10px;color: red;"></span>
			</div>
			
	        <div class="form-group">
				<label for="city" class="col-xs-offset-0 col-xs-12 col-sm-offset-0 col-sm-3 col-md-offset-2 col-md-2 control-label">缴纳城市</label>
				<div class="col-xs-11 col-sm-6 col-md-4">
				  <div class="input-group">
				    <select id="city" name="city" class="form-control">
				    	<option value="1">北京</option>
				    	<option value="2">上海</option>
				    	<option value="3">广州</option>
				    	<option value="4">深圳</option>
				    	<option value="5">天津</option>
				    	<option value="6">其它城市</option>
				    	<option value="0" selected="selected">请选择五险一金缴纳城市</option>
				    </select>	
				  </div>
				</div>
			    <div id="citydescDiv" class="col-xs-offset-0 col-xs-11  col-sm-offset-0 col-sm-2 col-md-offset-0 col-md-2" hidden="hidden">
				    <input id="citydesc" name="citydesc" class="form-control"
						   placeholder="城市名">
				</div>
				
				<span class="glyphicon glyphicon-asterisk" style="padding-top: 10px;color: red;"></span>

			</div>
			
  		    <div class="form-group">
				<label for="zdate" class="col-xs-offset-0 col-xs-12 col-sm-offset-0 col-sm-3 col-md-offset-2 col-md-2 control-label">缴纳起始年月</label>
				<div class="col-xs-11 col-sm-6 col-md-4">
					<input id="zdate" name="zdate" class="form-control ymcalendar"
						placeholder="当前工作五一缴纳起始年月" required="required">
				</div>
				<span class="glyphicon glyphicon-asterisk" style="padding-top: 10px;color: red;"></span>
			</div>
			
			
          <div class="form-group">
		    <div class="col-xs-offset-0 col-xs-6 col-sm-offset-2 col-sm-4 col-md-offset-2 col-md-4">
		      <button id="auto_js" class="btn btn-info btn-block" type="button">自动计算</button>
		    </div>
		    
		    <div class="col-xs-6 col-sm-4">
				<button id="no_wuyi" class="btn btn-info btn-block" type="button">无五险一金</button>
			</div>
		  </div>	
		  
		 <hr> 
		<div class="form-group" id="jnjs">
			<label for="jin1" class="col-xs-12 col-sm-offset-0 col-sm-2 col-md-offset-0 col-md-2 control-label">缴纳基数</label>
		    <div class="col-xs-6 col-sm-4 col-md-4">
		        <div class="input-group">
		           <div class="input-group-addon">社保</div>
				   <input id="sbjs" name="sbjs"  class="form-control" placeholder="默认全额">
				   
				</div>
			</div>

			<div class="col-xs-offset-0 col-xs-6 col-md-offset-1 col-sm-4 col-md-4">
				<div class="input-group">
		           <div class="input-group-addon">公积金</div>
				   <input id="gjjjs" name="gjjjs"  class="form-control" placeholder="默认全额">
				   
				</div>
			</div>
		</div>	
					
		<hr>			
					
  		<div class="form-group">
		     <div class="col-xs-offset-0 col-xs-6 col-sm-offset-2 col-sm-4 col-md-offset-2 col-md-4  alert alert-info">
			    <strong>单位缴纳[%/元]</strong>
			</div>
			
  			<div class="col-xs-offset-0 col-xs-6 col-md-offset-1 col-sm-4 col-md-4 alert alert-info">
  			   <strong>个人缴纳[%/元]</strong>
  			</div>
  		</div>
  		
  		<div id="wuyi"> <!-- 为了设置方便 -->
  		
  		<div class="form-group">
			<label for="jin1" class="col-xs-12 col-sm-offset-0 col-sm-2 col-md-offset-0 col-md-2 control-label">住房公积金</label>
		    <div class="col-xs-6 col-sm-4 col-md-4">
		        <div class="input-group">
				   <input id="gjin1" name="gjin1"  class="form-control" placeholder="公司缴纳">
				   <div class="input-group-addon">%</div>
				</div>
			</div>

			<div class="col-xs-offset-0 col-xs-6 col-md-offset-1 col-sm-4 col-md-4">
				<div class="input-group">
				  <input id="jin1" name="jin1"  type="text" class="form-control" placeholder="个人缴纳">
				  <div class="input-group-addon">%</div>
				</div>
			</div>

		</div>
  		
  		<div class="form-group">
			<label for="jin2" class="col-xs-12 col-sm-offset-0 col-sm-2 col-md-offset-0 col-md-2 control-label">养老保险</label>
		    <div class="col-xs-6 col-sm-4 col-md-4">
		       <div class="input-group">
			      <input id="gjin2" name="gjin2"  class="form-control" placeholder="公司缴纳">
			      <div class="input-group-addon">%</div>
			   </div>  
			</div>
			
			<div class="col-xs-offset-0 col-xs-6 col-md-offset-1 col-sm-4 col-md-4">
				<div class="input-group">
				  <input id="jin2" name="jin2"  type="text" class="form-control" placeholder="个人缴纳">
				  <div class="input-group-addon">%</div>
				</div>
			</div>
			

		</div>
		
  		<div class="form-group">
			<label for="jin3" class="col-xs-12 col-sm-offset-0 col-sm-2 col-md-offset-0 col-md-2 control-label">医疗保险</label>
		    <div class="col-xs-6 col-sm-4 col-md-4">
		    	<div class="input-group">
			   		<input id="gjin3" name="gjin3"  class="form-control" placeholder="公司缴纳">
			   		<div class="input-group-addon">%</div>
			   	</div>
			</div>
			<div class="col-xs-offset-0 col-xs-6 col-md-offset-1 col-sm-4 col-md-4">
				<div class="input-group">
				  <input id="jin3" name="jin3"  type="text" class="form-control" placeholder="个人缴纳">
				  <div class="input-group-addon">%</div>
				</div>
			</div>

		</div>
		
  		<div class="form-group">
			<label for="jin4" class="col-xs-12 col-sm-offset-0 col-sm-2 col-md-offset-0 col-md-2 control-label">失业保险</label>
		    <div class="col-xs-6 col-sm-4 col-md-4">
		    	<div class="input-group">
			   		<input id="gjin4" name="gjin4"  class="form-control" placeholder="公司缴纳">
			   		<div class="input-group-addon">%</div>
			   	</div>
			</div>
			<div class="col-xs-offset-0 col-xs-6 col-md-offset-1 col-sm-4 col-md-4">
				<div class="input-group">
				  <input id="jin4" name="jin4"   type="text" class="form-control" placeholder="个人缴纳">
				  <div class="input-group-addon">%</div>
				</div>
			</div>			

		</div>	
  	
  		<div class="form-group">
			<label for="jin5" class="col-xs-12 col-sm-offset-0 col-sm-2 col-md-offset-0 col-md-2 control-label">工伤保险</label>
		    <div class="col-xs-6 col-sm-4 col-md-4">
		    	<div class="input-group">
			   		<input id="gjin5" name="gjin5"  class="form-control" placeholder="公司缴纳">
			   		<div class="input-group-addon">%</div>
			    </div>
			</div>
			<div class="col-xs-offset-0 col-xs-6 col-md-offset-1 col-sm-4 col-md-4">
				<div class="input-group">
				  <input id="jin5" name="jin5"  type="text" class="form-control" placeholder="个人缴纳">
				  <div class="input-group-addon">%</div>
				</div>
				
			</div>

		</div>  	
		
         <div class="form-group">
			<label for="jin6" class="col-xs-12 col-sm-offset-0 col-sm-2 col-md-offset-0 col-md-2 control-label">生育保险</label>
		    <div class="col-xs-6 col-sm-4 col-md-4">
		    	<div class="input-group">
				   <input id="gjin6" name="gjin6"  class="form-control" placeholder="公司缴纳">
				   <div class="input-group-addon">%</div>
				</div>
			</div>
			<div class="col-xs-offset-0 col-xs-6 col-md-offset-1 col-sm-4 col-md-4">
				<div class="input-group">
				  <input id="jin6" name="jin6"  type="text" class="form-control" placeholder="个人缴纳">
				  <div class="input-group-addon">%</div>
				</div>  
			</div>

		</div> 
	 </div>	
		
		<div class="form-group">
			<label for="jin1" class="col-xs-12 col-sm-offset-0 col-sm-2 col-md-offset-0 col-md-2 control-label">合计</label>
		    <div class="col-xs-6 col-sm-4 col-md-4">
		        <div class="input-group">
		           <div class="input-group-addon">单位</div>
				   <input id="sum_dw" name="sum_dw"  class="form-control" placeholder="单位共缴纳" disabled="disabled">
				   
				</div>
			</div>

			<div class="col-xs-offset-0 col-xs-6 col-md-offset-1 col-sm-4 col-md-4">
				<div class="input-group">
		           <div class="input-group-addon">个人</div>
				   <input id="sum_gr" name="sum_gr"  class="form-control" placeholder="个人共缴纳" disabled="disabled">
				   
				</div>
			</div>
		</div>	
		
		<hr>
		
		<div class="form-group">
		    <label for="fsalary"
				class="col-xs-12 col-sm-offset-0 col-sm-2 col-md-offset-0 col-md-2 control-label">税后薪资
			</label>
			<div class="col-xs-11 col-sm-4 col-md-4">
			   <div class="input-group">
				<input id="finalsalary" name="finalsalary" class="form-control"
					placeholder="税后薪资">
				<span class="input-group-addon">元</span>	
			   </div>
			</div>
			
		
			<label for="cmoney"
				class="col-xs-12 col-sm-offset-0 col-sm-2 col-md-offset-0 col-md-2 control-label"><abbr
				title="要交的税">应付税款</abbr>
			</label>
			<div class="col-xs-11 col-sm-3 col-md-3">
			   <div class="input-group">
				<input id="cmoney" name="cmoney" class="form-control"
					placeholder="应付税款">
				<span class="input-group-addon">元</span>	
			   </div>
			</div>
			
		</div> 		
							
                   <div class="form-group">
								<label for=""
									class="col-sm-offset-0 col-sm-2 control-label"></label>
								<div class="col-sm-4">
									<a id="numInfoA" href="#addNumInfo" data-toggle="modal" style="text-decoration: underline;">账号信息</a><br>
								</div>
								
							</div>

							<div class="row">
								<div
									class="col-xs-12 col-sm-offset-9 col-sm-3 col-md-offset-9 col-md-3"
									id="panel3">
									<button class="btn btn-primary" role="button" id="mod">修改</button>
								</div>
							</div>

						</form>
					</div>
				</div>
			</div>
			<!-- 薪资及五险一金 start -->


		</div>
		<!-- end panel-group -->

		<div class="modal fade" id="myModal" tabindex="-1" role="dialog"
			aria-labelledby="myModalLabel" aria-hidden="true">
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal"
							aria-hidden="true">&times;</button>
						<h4 class="modal-title" id="myModalLabel" align="center">
							<span class="label label-primary" id="popupTitle">懒喵记账[修改密码]</span>
						</h4>
					</div>
					<div class="modal-body">
						<form class="form-horizontal" role="form" id="popUpForm" action="">
							<div class="form-group">
								<label for="password1"
									class="col-sm-offset-2 col-sm-2 control-label">原始密码</label>
								<div class="col-sm-4">
									<input id="password" type="password"
										class="form-control moinput" placeholder="原始密码" required>
								</div>
							</div>
							<div class="form-group">
								<label for="password1"
									class="col-sm-offset-2 col-sm-2 control-label">新密码</label>
								<div class="col-sm-4">
									<input id="password1" type="password"
										class="form-control moinput" placeholder="新密码" required>
								</div>
							</div>
							<div class="form-group">
								<label for="password2"
									class="col-sm-offset-2 col-sm-2 control-label">确认密码</label>
								<div class="col-sm-4">
									<input id="password2" type="password"
										class="form-control moinput" placeholder="确认密码" required>
								</div>
							</div>
						</form>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-default" data-dismiss="modal"
							id="popUpCancel">取消</button>
						<button type="button" class="btn btn-primary" id="popUpSave">修改</button>
					</div>
				</div>
			</div>
		</div>
		
		
        <div class="modal fade" id="addNumInfo" tabindex="-1" role="dialog"
			aria-labelledby="myModalLabel" aria-hidden="true">
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal"
							aria-hidden="true">&times;</button>
						<h4 class="modal-title" id="myModalLabel" align="center">
							<span class="label label-primary" id="popupTitle">懒喵记账[账号信息]</span>
						</h4>
					</div>
					<form class="form-horizontal" role="form" action="">
					<div class="modal-body">
						
							<div class="form-group">
								<label for="sbno"
									class="col-sm-offset-2 col-sm-3 control-label">社保账号</label>
								<div class="col-sm-4">
									<input id="sbno" type="text"
										class="form-control moinput" placeholder="社保账号" >
								</div>
							</div>
							<div class="form-group">
								<label for="gjjno"
									class="col-sm-offset-2 col-sm-3 control-label">公积金账号</label>
								<div class="col-sm-4">
									<input id="gjjno" type="text"
										class="form-control moinput" placeholder="公积金账号" >
								</div>
							</div>
						
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-default" data-dismiss="modal"
							id="">取消</button>
						<button type="button" class="btn btn-primary" id="addNumInfoBtn">保存</button>
					</div>
					
					</form>
				</div>
			</div>
		</div>
		
	</div>
	<!-- container -->

	<!-- Site footer -->
	<div class="container">
		<div class="footer">
			<hr />
			<p class="copyright">
				&copy; <a href="http://lanmiao.me" target="_blank">Lanmiao.me</a>
				2014 沪ICP备14015278号
			</p>
		</div>
	</div>
	<%@include file="dialog.jsp"%>

	<script src="js/jquery-1.11.0.min.js" type="text/javascript"></script>
	<script src="js/jquery.ymcalendar.js" type="text/javascript"></script>
	<script src="js/bootstrap.min.js" type="text/javascript"></script>
	<script src="js/messenger.min.js" type="text/javascript"></script>
	<script src="js/messenger-theme-flat.js" type="text/javascript"></script>
	<script src="js/sessionTimeout.js" type="text/javascript"></script>
	<script src="js/userServer.js" type="text/javascript"></script>
	<script src="js/dialog.js" type="text/javascript"></script>
</body>
</html>
