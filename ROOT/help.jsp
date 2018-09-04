<%@page import="com.lmlc.pojo.User"%>
<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
 User user = (User)session.getAttribute("user");
%>
<html lang="zh-cn">
  <head>
    <meta http-equiv="Content-Type" content="text/html" charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">
    <link rel="shortcut icon" href="images/favicon.ico">

    <title>懒喵[帮助文档]</title>

    <link href="css/bootstrap.min.css" rel="stylesheet">
    <link href="css/blog.css" rel="stylesheet">
    <link href="css/messenger.css" rel="stylesheet">
    <link href="css/messenger-theme-flat.css" rel="stylesheet">

  </head>

  <body>

    <div class="blog-masthead">
      <div class="container">
        <nav class="blog-nav">
          <a class="blog-nav-item active" href="#title1">消费分类</a>
          <a class="blog-nav-item" href="#title2">好习惯</a>
          <a class="blog-nav-item" href="#title3">其它</a>
          <a class="blog-nav-item" href="#title4">@懒喵</a>
        </nav>
      </div>
    </div>

    <div class="container">

      <div class="blog-header">
        <h1 class="blog-title">懒喵帮助文档</h1>
        <p class="lead blog-description">2014.05 version 02.</p>
      </div>

      <div class="row">

        <div class="col-sm-8 blog-main">

          <div class="blog-post">
            <h2 class="blog-post-title" id="title1">消费分类</h2>
            <hr>
            <blockquote>
            <p><strong>固定消费</strong>: 包括房租、网费、有线电视费等你认为每月固定的支出，月结时不能调整。</p>
            <p><strong>半固定消费</strong>: 包括水费、电费、煤气费、话费、公交车费等每月你认为的大概支出，月结时可以调整。</p>
            <p><strong>日常消费</strong>: 每天的衣食住行等零散消费。</p>
            </blockquote>
            <br>
            <h2 class="blog-post-title" id="title2">好习惯</h2>
            <hr>
            <p>记账21天，种下一种习惯，收获一种性格。</p>
            <br>
            
            <h2 class="blog-post-title" id="title3">其它</h2>
            <hr>
            <p>懒喵具体使用技巧<a href="http://user.qzone.qq.com/2584200515/blog/1398954271">请看博文</a>。</p>
            <p><font color="blue">友情提示：想有懒喵的完美体验，请手机[记账]，电脑[月结统计]。</font></p>
            <p>懒喵所有文章和音乐无版权，如有侵权，请及时联系懒喵。</p>
            <p>Where is the money，懒喵知道....</p>
            <br>
            
            <h2 class="blog-post-title" id="title4">@懒喵</h2>
            <hr>
            <p>用户反馈和建议: <a href="#" data-toggle="modal" data-target="#myModal">@懒喵</a></p>
            <p>懒喵QQ群: 209776192</p>
            <p>懒喵官方Email: wp217@126.com</p>
            <p>懒喵官方微信(lanmiao_me): </p>
            <p><img src="images/weixin.jpg" alt="懒喵官方微信" /></p>
            
          </div>
       </div><!-- /.row -->
       
       
<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
        <h4 class="modal-title" id="myModalLabel" align="center"><span class="label label-primary" id="popupTitle">懒喵记账[用户反馈和建议]</span></h4>
      </div>
      <div class="modal-body">
        <form class="form-horizontal" role="form" id="popUpForm"> 
        
        <div class="form-group">
		    <label for="subject" class="col-xs-offset-0 col-sm-offset-1 col-xs-12 col-sm-2 control-label">主题</label>
		    <div class="col-xs-11 col-sm-8">
		      <input id="subject" name="subject" type="text" class="form-control input" placeholder="主题" required>
		    </div>
	    </div>
	    
	    <div class="form-group">
		    <label for="content" class="col-xs-offset-0 col-sm-offset-1 col-xs-12 col-sm-2 control-label">反馈内容</label>
		    <div class="col-xs-11 col-sm-8">
		      <textarea id="content" name="content" class="form-control input" placeholder="反馈内容" rows="10"></textarea>
		    </div>
		</div>
	    
        
        <div class="form-group">
		    <label for="email" class="col-xs-offset-0 col-sm-offset-1 col-xs-12 col-sm-2 control-label">您的邮箱</label>
		    <div class="col-xs-11 col-sm-8">
		       <input id="email" name="email" type="email" class="form-control input" placeholder="邮箱" value=<%
		       if(user != null){
		       out.print(user.getEmail());
		       }
		       %>>
		    </div>
		  </div>
        
		</form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
        <button type="button" class="btn btn-primary" id="confirm">确定</button>
      </div>
    </div>
  </div>
</div>

    </div><!-- /.container -->

      <hr class="featurette-divider">
      <!-- /END THE FEATURETTES -->


      <!-- FOOTER -->
      <footer>
        <p class="pull-right"><a href="#">返回顶部</a></p>
         <p class="copyright">&copy; <a href="http://lanmiao.me" target="_blank">Lanmiao.me</a> 2014 沪ICP备14015278号</p>
      </footer>

    </div><!-- /.container -->

    <script src="js/jquery-1.11.0.min.js"></script>
    <script src="js/bootstrap.min.js"></script>
    <script src="js/messenger.min.js"></script>
    <script src="js/messenger-theme-flat.js"></script>
    <script src="js/help.js"></script>
  </body>
</html>
