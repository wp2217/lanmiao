<%@page import="com.lmlc.pojo.UserAdmin"%>
<%@page import="com.lmlc.tools.Page"%>
<%@page import="com.lmlc.dao.UserDaoAdmin"%>
<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<%
	String pageString=request.getParameter("page");
	int currentPage= 0 ;
	try 
	{
		currentPage = Integer.parseInt(pageString);// 当前页码
	} 
	catch(Exception e) {}
	if(currentPage == 0) 
	{
		currentPage = 1;
	}
	
	int pageSize = 6;//每页显示的数据数
	UserDaoAdmin uAdmin = new UserDaoAdmin();
	Page p = new Page(pageSize);
	List<UserAdmin> results = uAdmin.getUserAdmin((currentPage-1)*pageSize, pageSize);

	session.setAttribute("totalPage", p.getPageCount());// 保存总页数
	session.setAttribute("totalCount", p.getItemCount());
	session.setAttribute("currentPage", currentPage);
%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>懒喵后台[发送邮件提醒]</title>
    
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	
	<link href="css/bootstrap.min.css" rel="stylesheet">
	<link href="css/messenger.css" rel="stylesheet">
	<link href="css/messenger-theme-flat.css" rel="stylesheet">

  </head>
  
  <body>
  
  	<h2 align="center">懒喵后台  发送邮件提醒</h2><br>
  
    <div class="container">
              用户过滤:
      <select>
    	  <option value="0">全部用户</option>
    	  <option value="1">大于10天用户</option>
      </select>
    
	  <table class="table table-hover table-condensed">
		<thead>
			<tr class="info">
			    <th>ID</th>
				<th>用户邮箱</th>
				<th>昵称</th>
				<th>是否有五一</th>
				<th>注册日期</th>
				<th>最后一次记账日期</th>
				<th>多久没记账</th>
				<th>选择</th>
			</tr>
		</thead>

		<tbody>
		<%
   	        for(UserAdmin o: results)
         		{
        %>	
            <tr class="success">
			    <td><%=o.getIdUser()%></td>
			    <td id="email"><%=o.getEmail()%></td>
			    <td><%=o.getNeck() %></td>
			    <td><% 
			      if(o.getJin() == 0){
			      	out.print("是");
			      }else{
			        out.print("否");
			      } 
			    %></td>
			    <td><%=o.getZdate() %></td>
			    <td><%=o.getLastJzDate() %></td>
			    <td><%=o.getDays() %>天</td>
			    <td><input type="checkbox" value="1"></td>
			    
		    </tr>
		
		<% } %>
		
		</tbody>
	 </table>
  
	共<%=p.getItemCount()%> 个用户<br>第${currentPage }页， 共 ${totalPage } 页

	<!--分页功能  -->
	<% 
		if(currentPage>1)
		{
			out.print("<a href='adminlmlc/sendTx.jsp?page=" + (currentPage-1)+ "'>[上一页]</a>&nbsp;");
		}
		else
		{
			out.print("[上一页]");
		}
		
		if(currentPage<p.getPageCount())
		{
			out.print("<a href='adminlmlc/sendTx.jsp?page=" + (currentPage+1)+ "'>[下一页]</a>&nbsp;");
		}
		else
		{
			out.print("[下一页]");
		}
	%>
	<br><hr>
	<form action="adminlmlc/sendTx.me" method="post">
  	
  	<div class="row">
  		<div class="col-md-1">发送给:</div>
  		<div class="col-md-11"><input id="sendTo" name="sendTo" type="text" class="form-control"></div>
  	
  	</div>
  	
  	<div class="row">
  		<div class="col-md-1">主题:</div>
  		<div class="col-md-11"><input name="title" type="text" class="form-control"></div>
  	
  	</div>
  	
  	<div class="row">
  		<div class="col-md-11"></div>
  		<div class="col-md-1"><button type="submit">Send</button></div>
  	
  	</div>
  	
  	<div class="row">
  		<div class="col-md-1">邮件内容 :</div>
  		<div class="col-md-11">
  		   <textarea id="editor_id" name="content" style="width:100%;height:280px;">
           </textarea>
        </div>
  	
  	</div><br>
  	</form>
	
  </div>
    <script src="js/jquery-1.11.0.min.js"></script>
	<script src="js/bootstrap.min.js"></script>
    <script src="js/messenger.min.js"></script>
    <script src="js/messenger-theme-flat.js"></script>
    
    <script charset="utf-8" src="adminlmlc/editor/kindeditor.js"></script>
	<script charset="utf-8" src="adminlmlc/editor/lang/zh_CN.js"></script>
	<script src="js/admin/sendTx.js"></script>
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
