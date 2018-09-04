$(document).ready(function() {

	    Messenger.options = {
			parentLocations : [ 'body' ],
			extraClasses : 'messenger-fixed  messenger-on-top',
			theme : 'flat'
		};
	
		var msg = Messenger().post("initial msg");
		msg.hide();
		
		$("#content").hide();
		$("#content").slideDown(2000);
		
		$.ajax({
				url : "jin.me",
				type : "GET",
				dataType : "JSON",

				success : function(json) {
					
					if (json != 'false') {
						var pro1 =  $.parseJSON(json[0]);
						var fangDai = pro1.salary;
						var yiLiao = pro1.cMoney;
						
						if (fangDai <= 0) {
							fangDai = '房贷扣除[无]';
						}else{
							fangDai = '房贷扣除' + fangDai;
						}
						
						if (yiLiao <= 0) {
							yiLiao = '看病扣除[无]';
						}else{
							yiLiao = '看病扣除' + yiLiao;
						}
		
						var str_jin1  = pro1.jin1 + '%(￥' + pro1.jin1 * pro1.gjjjs / 100 + ')';
						var str_gJin1  = pro1.gJin1 + '%(￥' + pro1.gJin1 * pro1.gjjjs / 100 + ')';
						var str_jin2  = pro1.jin2 + '%(￥' + pro1.jin2 * pro1.sbjs / 100 + ')';
						var str_gJin2  = pro1.gJin2 + '%(￥' + pro1.gJin2 * pro1.sbjs / 100 + ')';
						var str_jin3 = pro1.jin3 + '%(￥' + pro1.jin3 * pro1.sbjs / 100 + ')';
						var str_gJin3  = pro1.gJin3 + '%(￥' + pro1.gJin3 * pro1.sbjs / 100 + ')';
						var str_jin4  = pro1.jin4 + '%(￥' + pro1.jin4 * pro1.sbjs / 100 + ')';
						var str_gJin4  = pro1.gJin4 + '%(￥' + pro1.gJin4 * pro1.sbjs / 100 + ')';
						var str_jin5  = pro1.jin5 + '%(￥' + pro1.jin5 * pro1.sbjs / 100 + ')';
						var str_gJin5  = pro1.gJin5 + '%(￥' + pro1.gJin5 * pro1.sbjs / 100 + ')';
						var str_jin6  = pro1.jin6 + '%(￥' + pro1.jin6 * pro1.sbjs / 100 + ')';
						var str_gJin6  = pro1.gJin6 + '%(￥' + pro1.gJin6 * pro1.sbjs / 100 + ')';
						
						
						$("#header_h3").text('五险一金(' + pro1.cityDesc + ')');
						
						$("#rjin1").children("td").first().next().text(str_jin1);
						$("#rjin1").children("td").first().next().next().text(str_gJin1);
						$("#rjin1").children("td").last().text('￥' + json[1]);
						$("#rjin1").children("td").last().prev().text(fangDai);
						$("#rjin2").children("td").first().next().text(str_jin2);
						$("#rjin2").children("td").first().next().next().text(str_gJin2);
						$("#rjin2").children("td").last().text('￥' + json[2]);
						$("#rjin2").children("td").last().prev().text('无');
						$("#rjin3").children("td").first().next().text(str_jin3);
						$("#rjin3").children("td").first().next().next().text(str_gJin3);
						$("#rjin3").children("td").last().text('￥' + json[3]);
						$("#rjin3").children("td").last().prev().text(yiLiao);
						$("#rjin4").children("td").first().next().text(str_jin4);
						$("#rjin4").children("td").first().next().next().text(str_gJin4);
						$("#rjin4").children("td").last().text('￥' + json[4]);
						$("#rjin4").children("td").last().prev().text('无');
						$("#rjin5").children("td").first().next().text(str_jin5);
						$("#rjin5").children("td").first().next().next().text(str_gJin5);
						$("#rjin5").children("td").last().text('￥' + json[5]);
						$("#rjin5").children("td").last().prev().text('无');
						$("#rjin6").children("td").first().next().text(str_jin6);
						$("#rjin6").children("td").first().next().next().text(str_gJin6);
						$("#rjin6").children("td").last().text('￥' + json[6]);
						$("#rjin6").children("td").last().prev().text('无');
						
						if(pro1.gjjno != null && pro1.gjjno.length != 0){
							$("#gjjno").text('公积金账号:' + pro1.gjjno);
						}else{
							$("#gjjno").text('公积金账号:未填写');
						}
						
						if(pro1.sbno != null && pro1.sbno.length != 0){
							$("#sbno").text('社保账号:' + pro1.sbno);
						}else{
							$("#sbno").text('社保账号:未填写');
						}
						
						var sburl = null;
						var gjjurl = null;
						
						switch (pro1.city) {
						case 1:
							sburl = "http://www.bjld.gov.cn/csibiz/indinfo/login.jsp";
							gjjurl = "http://www.bjgjj.gov.cn/wsyw/wscx/gjjcx-login.jsp";
							break;
							
						case 2:
							sburl = "http://www.12333sh.gov.cn/grxx/grxx.jsp";
							gjjurl = "https://persons.shgjj.com/SsoLogin?url=https://persons.shgjj.com/MainServlet?ID=1";
							break;
							
						case 3:
							sburl = "http://www.gzlss.gov.cn/gzlss_hall/index.html";
							gjjurl = "http://www.gzgjj.gov.cn/web/dynamic/wsbs/index.html";
							break;
							
						case 4:
							sburl = "https://e.szsi.gov.cn/siservice/";
							gjjurl = "http://www.szzfgjj.com/zhcx/index.htm";
							break;
							
						case 5:
							sburl = "http://www.tj.lss.gov.cn/ecdomain/framework/tj/index.jsp";
							gjjurl = "http://cx.zfgjj.cn/grcx/Sticking.html";
							break;
							
						case 6:
							sburl = "http://www.baidu.com/s?wd=" + pro1.cityDesc + "社保查询";
							gjjurl = "http://www.baidu.com/s?wd=" + pro1.cityDesc + "公积金查询";
							break;

						default:
							break;
						}
						
						$("#sburl").attr("href", sburl);
						$("#gjjurl").attr("href", gjjurl);
						
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