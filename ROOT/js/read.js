$(document).ready(function() {
	
	var index = 0;
	
	Messenger.options = {
		parentLocations : [ '.container' ],
		extraClasses : 'messenger-fixed  messenger-on-top',
		theme : 'flat'
	};

	var msg = Messenger().post("initial msg");
	msg.hide();
	
	getArticleAndSetHtml(index);
	
	$("#pre").on("click", function(){

		if (index <= 0) {
			alert_msg(msg, "success", "亲，无更多文章了");
		}else{
			index = index - 1;
			getArticleAndSetHtml(index);
		}
		
	});
	
	$("#next").on("click", function(){

		index = index + 1;
		getArticleAndSetHtml(index);
		
	});
	
	function getArticleAndSetHtml(index){
		$.ajax({
			url : "getArticle",

			data : {
				index: index
			},

			type : "GET",
			dataType : "JSON",
			
			success : function(json) {
				if (json === 1) {
					index = index - 1;
					alert_msg(msg, "success", "亲，无更多文章了");
				}else{
					msg.hide();
					$("#zdate").html("Add time--" + json.zdate);
					$("#title").html(json.title);
					$("#content").html(json.content);
					$("#conexplain").html(json.conExplain);
					$("#conexpnew").html(json.conExpNew);
				}
			},
			
			error : function(xhr, status) {
				alert_msg(msg, "error", "请刷新重试，或者反馈<a href='http://lanmiao.me/help.jsp#title4' target = '_blank'> @懒喵</a>");
			},
		});	

	}
			
			
	function alert_msg(i_msg, i_type, i_text) {
		i_msg.update({
			message : i_text,
			type : i_type
		});
	};		
			
			
			
			
});