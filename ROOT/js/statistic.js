$(document).ready(function() {

	var date = new Date();
	var mon = date.getMonth();
	var year = date.getFullYear();
	var year_tmp = year;
	mon = mon + 1;
	var mon_tmp = mon;
	var txt_btn;
	var txt1;
	var txt2;
	
	var popupMod = '';
	
    Messenger.options = {
		parentLocations : [ 'body' ],
		extraClasses : 'messenger-fixed  messenger-on-bottom',
		theme : 'flat'
	};

	var msg = Messenger().post("inital");
	var width = $(window).width();
	msg.hide();
	if (width < 768) {
		msg.update({
			message : "提示：用电脑或Pad查看[月结统计]，拥有懒喵完美体验",
			type : "success"
		});
	}
	
	refresh_data(year, mon);
	
	$("#popUpForm").on("blur", 'input', function(event) {    //input 数字验证
		
		if(this.value.trim().length === 0){
			msg.update({
				message : "不能为空，如果为零请输入0",
				type : "error"
			});
			this.focus();
		}
	    else if (isNaN(this.value.trim()) && this.value.trim().length != 0) {
			msg.update({
				message : "请输入数字",
				type : "error"
			});
			this.focus();
		}else if(this.value.trim() < 0){
			msg.update({
				message : "请输入大于零的数字",
				type : "error"
			});
			this.focus();
		} else {
			msg.hide();
		}
		
		event.stopPropagation();
	});

	
	$("a").on("click", function() {
		$(this).parent("li").siblings().removeClass("active");
		$(this).parent("li").addClass("active");
		
		
		switch($(this).parent("li").attr("id")){
		
		case 'mon1':
            refresh_data(year, 1);
			break;
		case 'mon2':
			refresh_data(year, 2);
			break;
		case 'mon3':
			refresh_data(year, 3);
			break;
		case 'mon4':
			refresh_data(year, 4);
			break;
		case 'mon5':
            refresh_data(year, 5);
			break;
		case 'mon6':
			refresh_data(year, 6);
			break;
		case 'mon7':
			refresh_data(year, 7);
			break;
		case 'mon8':
			refresh_data(year, 8);
			break;	
		case 'mon9':
            refresh_data(year, 9);
			break;
		case 'mon10':
			refresh_data(year, 10);
			break;
		case 'mon11':
			refresh_data(year, 11);
			break;
		case 'mon12':
			refresh_data(year, 12);
			break;
			
		case 'year_pre':
			year = year - 1;
			
			if (year === year_tmp) {
				refresh_data(year, mon_tmp);
			} else {
				refresh_data(year, 12);
			}
			break;    
			
		case 'year_nex':
			year = year + 1;
			
			if (year === year_tmp) {
				refresh_data(year, mon_tmp);
			} else {
				refresh_data(year, 1);
			}
			break;    
		}			
			
		
		
	});
	

   function refresh_data(i_year, i_mon){
	   
	    year = i_year;
	    mon  = i_mon;
	   
		switch (i_mon){
		case 1:
			$("#mon1").addClass("active");
			break;
		case 2:
			$("#mon2").addClass("active");
			break;
		case 3:
			$("#mon3").addClass("active");
			break;
		case 4:
			$("#mon4").addClass("active");
			break;	
		case 5:
			$("#mon5").addClass("active");
			break;
		case 6:
			$("#mon6").addClass("active");
			break;
		case 7:
			$("#mon7").addClass("active");
			break;
		case 8:
			$("#mon8").addClass("active");
			break;	
		case 9:
			$("#mon9").addClass("active");
			break;
		case 10:
			$("#mon10").addClass("active");
			break;
		case 11:
			$("#mon11").addClass("active");
			break;
		case 12:
			$("#mon12").addClass("active");
			break;			
		}
		
		   txt_btn = '调整' + i_year + '年' + i_mon + '月半固定消费';
		   $("#modify_half").text(txt_btn);
		   $("#popupTitle").text('懒喵记账[' + txt_btn + ']');
		   
		   
		   $.ajax({
				url : "statistic.me",
				cache : false,
				data : {
					year: i_year,
					month: i_mon
				},

				type : "GET",
				dataType : "JSON",
				
				success : function(json) {

					if (json[0].length > 2) {
						var dataRc =  '[' + $.parseJSON(json[0]) + ']';//日常消费数据
						var dataGd = '[' + $.parseJSON(json[3]) + ']';//固定半固定消费数据		
						var dates  = '[' + $.parseJSON(json[4]) + ']';//日常消费日期					
						var dataCm = '[' + $.parseJSON(json[5]) + ']';//消费类别数据
						var dataSum = $.parseJSON(json[6]);
						var dataMod = $.parseJSON(json[7]);
						var data8 = '[' + $.parseJSON(json[8]) + ']';
						var salary = Math.round(dataSum.salaryT*1000 + dataSum.sumInco*1000 - dataSum.sumRc*1000 - dataSum.sumGb*1000)/1000;	
						
						txt1 = i_year + '年' + i_mon + '月<strong>日常消费</strong>统计[总' + dataSum.sumRc + '元]';
						txt2 = '<strong>固定及半固定消费</strong>统计[总' + dataSum.sumGb + '元]';
						txt3 = "<span class='label label-primary'>本月净收入[" + salary + 
						      "元]</span> = <span class='label label-info'>税后薪资[" + dataSum.salaryT + 
	      	                  "元]</span> + <span class='label label-info'>补助[" + dataSum.sumInco + 
	      	                  "元]</span> - <span class='label label-info'>日常消费[" + dataSum.sumRc +
	      	                  "元]</span> - <span class='label label-info'>固定半固定消费[" + dataSum.sumGb + "元]</span>"; 
						
						$("#monthSum").html(txt3);
						
						$('#pie1').highcharts({
							 chart: {
				                    type: 'pie'
				                },
				                title: {
				                    text: txt1
				                },
				                subtitle: {
				                    text: '点击消费类别，显示子类别'
				                },
				                plotOptions : {
									pie : {
										allowPointSelect : true,
										cursor : 'pointer',
										dataLabels : {
											enabled : true,
											color : '#000000',
											connectorColor : '#000000',
											format : '<b>{point.name}</b>: {point.percentage:.1f} %'
										}
									}
								},

								tooltip : {
									pointFormat : '{series.name}: <b>{point.percentage:.1f}%</b>'
								},

				                series: [{
				                    name: '该类占比',
				                    colorByPoint: true,
				                    data: eval(dataRc)
				                }],
				                
				                drilldown: {
				                    series: eval(data8)
				                }
						});	
						

						$('#pie2').highcharts({
							chart : {
								plotBackgroundColor : null,
								plotBorderWidth : null,
								plotShadow : false
							},
							title : {
								text : txt2
							},
							tooltip : {
								pointFormat : '{series.name}: <b>{point.percentage:.1f}%</b>'
							},
							plotOptions : {
								pie : {
									allowPointSelect : true,
									cursor : 'pointer',
									dataLabels : {
										enabled : true,
										color : '#000000',
										connectorColor : '#000000',
										format : '<b>{point.name}</b>: {point.percentage:.1f} %'
									}
								}
							},
							series : [ {
								type : 'pie',
								name : '固定/半固定消费比例',
								data : eval(dataGd)
							} ]
						});
						$("#modify_half").show();
						
						
						 $('#column1').highcharts({
					            chart: {
					                type: 'column'
					            },
					            title: {
					                text: "日常消费柱状图"
					            },
					            xAxis: {
					                categories: eval(dates)
					            },
					            yAxis: {
					                min: 0,
					                title: {
					                    text: '金额区间  (点击消费类别,过滤该类别)'
					                },
					                stackLabels: {
					                    enabled: true,
					                    style: {
					                        fontWeight: 'bold',
					                        color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
					                    }
					                }
					            },
					            legend: {
					                align: 'right',
					                x: -70,
					                verticalAlign: 'top',
					                y: 20,
					                floating: true,
					                backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColorSolid) || 'white',
					                borderColor: '#CCC',
					                borderWidth: 1,
					                shadow: false
					            },
					            tooltip: {
					                formatter: function() {
					                    return '<b>'+ this.x +'</b><br/>'+
					                        this.series.name +': '+ this.y +'<br/>'+
					                        '该天合计: '+ this.point.stackTotal;
					                }
					            },
					            plotOptions: {
					                column: {
					                    stacking: 'normal',
					                    dataLabels: {
					                        enabled: true,
					                        color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white',
					                        style: {
					                            textShadow: '0 0 3px black, 0 0 3px black'
					                        }
					                    }
					                }
					            },
					            series: eval(dataCm)
					        });
						    
						    popupMod = dataMod;
						    $("#popUpForm").html('');
							$.each(dataMod, function (i, e) {
								  var obj = $.parseJSON(e);
								  var hide = '';
								  if (obj.type === 0) {
									hide = "hidden='true'";
								  }else{
									  hide = "";
								  }
								  
								  var $fg = 
								"<div class='form-group' "+ hide +"><label for='mod' class='col-sm-offset-2 col-sm-2 control-label'>" +
									  obj.text + "</label><div class='col-sm-4'><input id='modField" + i +
									  		"' class='form-control' placeholder='"+ obj.text +
									  		"' value='"+ obj.value +"'></div></div>"; 
							      
								  $("#popUpForm").append($fg);
							});
						 
						 
					}else{
						$('#pie1').html("<h2 align='center'><b>"  + i_year + "年" + i_mon + "月无消费记录</b></h2>");
						$("#pie2").html("");
						$("#modify_half").hide();
						$('#column1').html("");
						$("#monthSum").html("");
					}
					
		
				},
				
				error : function(xhr, status) {
					
					Messenger.options = {
							parentLocations : [ 'body' ],
							extraClasses : 'messenger-fixed  messenger-on-bottom messenger-on-right',
							theme : 'flat'
						};

					 Messenger().post("请刷新重试，或者反馈<a href='http://lanmiao.me/help.jsp#title4' target = '_blank'> @懒喵</a>");
				},
			});	

   }
   
   $("#popUpSave").on("click", function(event){
	   
	   var check_flag = 0;
	   
       $("input").each(function(index, element){
    	   
   		if(this.value.trim().length === 0){
			msg.update({
				message : "不能为空，如果为零请输入0",
				type : "error"
			});
			check_flag = 1;
			this.focus();
       		return false; //退出循环
       		
		}
	    else if (isNaN(this.value.trim()) && this.value.trim().length != 0) {
			msg.update({
				message : "请输入数字",
				type : "error"
			});
			check_flag = 1;
			this.focus();
       		return false;
       		
		}else if(this.value.trim() < 0){
			msg.update({
				message : "请输入大于零的数字",
				type : "error"
			});
			check_flag = 1;
			this.focus();
			return false;
       		
		} else {
			check_flag = 0;
			msg.hide();
			
		}
    	   
       });
       
       if (check_flag === 0) { //Check通过了才执行
    	   
    	   var change_flg = 0;
    	   var jsonStr = '';
    	  
    	   $.each(popupMod, function (i, e) {
    		   var str = "#modField";
    		   str = str + i;
    		   var obj = $.parseJSON(e);
    		   obj.year = year;
    		   obj.month = mon;

    		   if(obj.value != $(str).val()){
    			   
    			   change_flg = 1;
    			   obj.value = $(str).val();
    		   }
    		   
    		   jsonStr = jsonStr + json2str(obj);
    		   
    	   });
    	   
    	   
    	   if (change_flg === 0) {
    		   alert_msg(msg, "success","没有修改半固定消费");
    		   $('#myModal').modal('hide');
    	   }else{
    		   
    		 $.ajax({
    			url : "modifyBgd",

    			data : {json: jsonStr},
    			
    			type : "POST",
    			dataType : "JSON",
    			
    			success : function(json) {
    				if (json === 1) {
    					alert_msg(msg, "error", "半固定消费更新失败，请重试");
    					
    				}else{
    					$('#myModal').modal('hide');
    					refresh_data(year, mon);
    					alert_msg(msg, "success", "半固定消费更新成功");
    				}
    			},
    			
    			error : function(xhr, status) {
    				alert_msg(msg, "error","请刷新重试，或者反馈<a href='http://lanmiao.me/help.jsp#title4' target = '_blank'> @懒喵</a>");
    			},
    		});	
    		   
    	   }
		
	   }
	   
   });
	
	function alert_msg(i_msg, i_type, i_text) {
		i_msg.update({
			message : i_text,
			type : i_type
		});
	};
   
   function json2str(o) { 
	   var arr = []; 
	   var fmt = function(s) { 
	   if (typeof s == 'object' && s != null) return json2str(s); 
	   return /^(string|number)$/.test(typeof s) ? "'" + s + "'" : s; 
	   };
	   for (var i in o) arr.push("'" + i + "':" + fmt(o[i])); 
	   return '{' + arr.join(',') + '}'; 
	   } 
   
   
});