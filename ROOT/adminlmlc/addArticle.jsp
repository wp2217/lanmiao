<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>懒喵后台[添加文章]</title>
    
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
    <link href="css/bootstrap.min.css" rel="stylesheet">

  </head>
  
  <body>
  <div class="container"> 
  	<h2 align="center"><strong>懒喵理财 添加文章</strong></h2>
  	
  	<form action="adminlmlc/addArticle" method="post">
  	
  	<div class="row">
  		<div class="col-sm-1">文章标题:</div>
  		<div class="col-sm-11"><input name="title" type="text"></div>
  	
  	</div><br>
  	
  	<div class="row">
  		<div class="col-sm-1">内容 :</div>
  		<div class="col-sm-11">
  		   <textarea id="editor_id" name="content" style="width:100%;height:50px;">
           </textarea>
        </div>
  	
  	</div><br>
  	
  	<div class="row">
  		<div class="col-sm-1">释义:</div>
  		<div class="col-sm-11">
  		   <textarea id="editor_id" name="conexplain" style="width:100%;height:150px;">
           </textarea>
        </div>
  	
  	</div><br>
  
  	<div class="row">
  		<div class="col-sm-1">新解:</div>
  		<div class="col-sm-11">
  		   <textarea id="editor_id" name="conexpnew" style="width:100%;height:200px;">
           </textarea>
        </div>
  	
  	</div> 
  	<div class="row">
  		<div class="col-sm-offset-4 col-sm-2">
  		    <button class="btn btn-primary btn-block" id="next" type="submit">添加</button>
  		</div>
  		<div class="col-sm-2">
  	  	    <button class="btn btn-primary btn-block"  type="reset">取消</button>
  	  	</div>
  	</div>
  	</form>
  	
  </div>
       
  <script charset="utf-8" src="adminlmlc/editor/kindeditor.js"></script>
  <script charset="utf-8" src="adminlmlc/editor/lang/zh_CN.js"></script>
  <script>
		var editor;
		KindEditor.ready(function(K) {
			editor = K.create('textarea[id="editor_id, editor_id"]', {
				resizeType : 1,
				allowPreviewEmoticons : true,
				allowImageUpload : true,
				
				uploadJson : 'adminlmlc/editor/jsp/upload_json.jsp',
                fileManagerJson : 'adminlmlc/editor/jsp/file_manager_json.jsp',
                allowFileManager : true,
				
				items : [
					'fontname', 'fontsize', '|', 'forecolor', 'hilitecolor', 'bold', 'italic', 'underline',
					'removeformat', '|', 'justifyleft', 'justifycenter', 'justifyright', 'insertorderedlist',
					'insertunorderedlist', '|', 'emoticons', 'image', 'link']
			});
		});
	</script>
  </body>
</html>
