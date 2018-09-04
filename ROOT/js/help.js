$(document).ready(function() {
	Messenger.options = {
			parentLocations : [ 'body' ],
			extraClasses : 'messenger-fixed  messenger-on-top',
			theme : 'flat'
		};

		var msg = Messenger().post("initial msg");
		msg.hide();
		
		$("#confirm").on("click", function(event){
			if($("#subject").val().trim() <= 0){
				msg.update({
					message : "请输入主题",
					type : "error"
				});
				event.preventDefault();
				return;
			}
			
			
			if($("#content").val().trim() <= 6){
				msg.update({
					message : "请输入反馈内容，至少6个字符",
					type : "error"
				});
				event.preventDefault();
				return;
			}
			
			
			$.ajax({
				url : "feedback.me",
				data : $("#popUpForm").serialize(),
				
				type : "POST",
				dataType : "JSON",
				
				success : function(json) {
					if (json === 0) {
						$('#myModal').modal('hide');
						msg.update({
							message : "谢谢您的反馈，懒喵在7个工作日内处理您的反馈",
							type : "success"
						});
					}else{
						msg.update({
							message : "请刷新重试，或者反馈<a href='http://lanmiao.me/help.jsp#title4' target = '_blank'> @懒喵</a>",
							type : "error"
						});
						
					}
				},
				
				error : function(xhr, status) {
					msg.update({
						message : "请刷新重试，或者反馈<a href='http://lanmiao.me/help.jsp#title4' target = '_blank'> @懒喵</a>",
						type : "error"
					});
				},
			});	
			
			
		});
		
		
		
	
	
});
