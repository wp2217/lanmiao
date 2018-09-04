<%@page import="com.lmlc.pojo.User"%>
<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>

<div class="modal fade" id="dialog" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
    <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
      </div>
      <div class="modal-body">
		<h2 align="center" style="color: green; font-weight: bold;">
		<%
			if(!"".equals(user.getNeck())){
				out.print(user.getNeck());
			}else{
				out.print(user.getEmail());
			}		
		%>
		欢迎归来</h2>
	
		<h3 style="color: #800000;font-family: Georgia, Times New Roman, Times, serif;">你已记账<span id="dialogDays" style="color: green">0</span>天</h3>
		<h3 style="color: #800000;font-family: Georgia, Times New Roman, Times, serif;">累计记账<span id="dialogTimes" style="color: green">0</span>次</h3>
		
		<div id="dialogLeaf"></div>
		
		<h4 id="dialogLevel" style="color: #800000;font-family: Georgia, Times New Roman, Times, serif;"></h4>
		<img id="dialogImg" alt="img" class="featurette-image img-responsive" src="images/1.png"/><br/><br/>
		
		<div class="progress progress-striped active">
		  <div class="progress-bar progress-bar-success" style="width: 13%">
		    幼稚园(21天)
		  </div>
		  <div class="progress-bar progress-bar-warning" style="width: 22%">
		    小学生(105天)
		  </div>
		  <div class="progress-bar progress-bar-danger" style="width: 16%">
		     初中生(63天)
		  </div>
 		  <div class="progress-bar progress-bar-info" style="width: 16%">
		    高中生(63天)
		  </div>
		  
		  <div class="progress-bar progress-bar-danger" style="width: 18%">
		    大学生(84天)
		  </div>
		  
		 <div class="progress-bar progress-bar-success" style="width: 15%">
		   技能巩固(29天)
		  </div>
		  
		</div>
		
		<h4 id="dialogLevelNext" style="color: #4B0082;font-family: Georgia, Times New Roman, Times, serif;"></h4>
		
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary" id="modal_no" data-dismiss="modal" title="关闭">
        	<span class="glyphicon glyphicon-off"></span>
        </button>
      </div>
    </div>
  </div>
</div>