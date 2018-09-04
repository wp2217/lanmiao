$(document).ready(function() {
	
	$("#showDialog").on("click", function(){
		$.ajax({
			url : "dialog.me",
			type : "POST",
			dataType : "JSON",
			
			success : function(json) {
				
				if (json == "false") {
					Messenger().post("请刷新重试，或者反馈<a href='http://lanmiao.me/help.jsp#title4' target = '_blank'> @懒喵</a>");
					json[1] = '--';
					json[2] = '--';
				}else{
				
					var level = json[0];
					var leaf = '';
					var needDays;
					
					switch (level) {
					case '0':
						Messenger().post("请刷新重试，或者反馈<a href='http://lanmiao.me/help.jsp#title4' target = '_blank'> @懒喵</a>");
						json[1] = '--';
						json[2] = '--';
						break;
					
					case '1':
						needDays = 21 - json[1];
						$("#dialogImg").attr("src", "images/1.png");
						$("#dialogLevel").html("在记账幼稚园阶段(能听音乐<a href='music.html' target='_blank'><span class='glyphicon glyphicon-headphones'></span></a>)");
						$("#dialogLevelNext").html("再记账<span style='color: green'>" + needDays + "</span>天升级为记账小学生(可玩2048游戏)");
						break;
						
					case '2':
						needDays = 126 - json[1];
						$("#dialogImg").attr("src", "images/2.png");
						$("#dialogLevel").html("你在记账小学生阶段(权限<a href='music.html' target='_blank'><span class='glyphicon glyphicon-headphones'></span></a>|" +
								"<a href='http://gabrielecirulli.github.io/2048/' target='_blank'>2048</a>)");
						$("#dialogLevelNext").html("再记账<span style='color: green'>" + needDays + "</span>天升级为记账初中生(可玩中国象棋游戏)");
						break;
						
					case '3':
						needDays = 189 - json[1];
						$("#dialogImg").attr("src", "images/3.png");
						$("#dialogLevel").html("你在记账初中生阶段(权限<a href='music.html' target='_blank'><span class='glyphicon glyphicon-headphones'></span></a>|" +
								"<a href='http://gabrielecirulli.github.io/2048/' target='_blank'>2048</a>|<a href='music.html' target='_blank'>中国象棋</a>)");
						$("#dialogLevelNext").html("再记账<span style='color: green'>" + needDays + "</span>天升级为记账高中生");
						break;
						
					case '4':
						needDays = 252 - json[1];
						$("#dialogImg").attr("src", "images/4.png");
						$("#dialogLevel").html("你在记账高中生阶段(权限<a href='music.html' target='_blank'><span class='glyphicon glyphicon-headphones'></span></a>|" +
								"<a href='http://gabrielecirulli.github.io/2048/' target='_blank'>2048</a>|<a href='music.html' target='_blank'>中国象棋</a>)");
						$("#dialogLevelNext").html("再记账<span style='color: green'>" + needDays + "</span>天升级为记账大学生");
						break;
						
					case '5':
						needDays = 336 - json[1];
						$("#dialogImg").attr("src", "images/5.png");
						$("#dialogLevel").html("你在记账大学生阶段(权限<a href='music.html' target='_blank'><span class='glyphicon glyphicon-headphones'></span></a>|" +
								"<a href='http://gabrielecirulli.github.io/2048/' target='_blank'>2048</a>|<a href='music.html' target='_blank'>中国象棋</a>)");
						$("#dialogLevelNext").html("再记账<span style='color: green'>" + needDays + "</span>天，你的记账大学生活就结业了");
						break;
						
						
					case '6':
						needDays = 365 - json[1];
						$("#dialogImg").attr("src", "images/6.png");
						$("#dialogLevel").html("你在技能巩固阶段(权限<a href='music.html' target='_blank'><span class='glyphicon glyphicon-headphones'></span></a>|" +
								"<a href='http://gabrielecirulli.github.io/2048/' target='_blank'>2048</a>|<a href='music.html' target='_blank'>中国象棋</a>)");
						$("#dialogLevelNext").html("再记账<span style='color: green'>" + needDays + "</span>天，我们为你庆祝一下..");
						break;
						
	
					default:
						break;
					}
				
				}
				if (!isNaN(json[1])) {
					var color = "green";
					for ( var i = 1; i <= json[1]/21 + 1 ; i++) {
						if (i > 1 && i <= 6 ) {
							color = "#DAA520";
						}else if(i > 6 && i <= 9 ){
							color = "red";
						}else if(i > 9 && i <= 12 ){
							color = "#00FFFF";
						}else if(i > 12 && i <= 16 ){
							color = "red";
						}else{
							color = "green";
						}
						
						if (i > 17) {
						  break;
						}
						
						leaf = leaf + "<span class='glyphicon glyphicon-leaf' style='color: " + color + "'></span>";
					}
					
					$("#dialogLeaf").html(leaf);
				}
				

				
				$("#dialogDays").html(json[1]);
				$("#dialogTimes").html(json[2]);
			},
			
			error : function(xhr, status) {
				Messenger().post("请刷新重试，或者反馈<a href='http://lanmiao.me/help.jsp#title4' target = '_blank'> @懒喵</a>");
			},
		});	
		
		
		
	});

});