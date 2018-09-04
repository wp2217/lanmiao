$(document).ready(function() {

    var songName = "0";
    showLrc(songName);
    
    jQuery("#amazingaudioplayer-1").bind("amazingaudioplayer.switched", function(event, data){
    	 $('#gc').html(""); 
	    songName = data.current;
	    showLrc(songName);
    });
    
    function showLrc(songName){
    
    	var lrc = [];
		var lrcBack = [];
	    var lrctxt = "";
	    var current = 0;
    
      $.ajax({
		url : "../getLrc.me",

		data : {
			songName : songName
		},

		type : "GET",
		dataType : "JSON",
		
		success : function(json) {
			
			//console.log(json);
			
			lrctxt = json;
            lrc = parseLyric(json);
            //lrcBack = lrc.concat();
            
            console.log(lrc.length);
            
            $("#amazingaudioplayer-1").bind("amazingaudioplayer.playprogress", function(event, data){
/*            	if (current > data.current && current < data.duration){
            		console.log(current);
            		 console.log(data.current);
            		lrc.length = 0;
            		lrc = lrcBack.concat();
            		current = 0;
            	}
            	
            	if(current = data.duration){
            		
            		current = 0;
            	}*/

            	
            	console.log(lrc.length);
            	
	            if(data.current >= lrc[0][0] && data.current < data.duration) {
	            	//console.log(lrc[0][1]); 
			        lrc.shift();
			    }
			    current =  data.current;
			  });
            
		},
		
		error : function(xhr, status) {
			//alert_msg(msg, "error","对不起，懒喵睡着了，请重试!");
		},
	});	
    
    
    }
    
    
    

function parseLyric(text) {
	var lyric = text.split('\r\n'); //先按行分割
	var _l = lyric.length; //获取歌词行数
	var lrct = new Array(); //新建一个数组存放最后结果
	
	for(var i=0; i<_l; i++) {
	    var d = lyric[i].match(/\[\d{2}:\d{2}((\.|\:)\d{2})\]/g);  //正则匹配播放
	    var t = lyric[i].split(d); //以时间为分割点分割每行歌词，数组最后一个为
	    if(d != null) { //过滤掉空行等非歌词正文部分
	        //换算时间，保留两位小数
	        var dt = String(d).split(':'); //不知道为什么一定要转换时间为字符串
		  var sm = String(dt[1]).split('.'); 
	        var _t = Math.round(parseInt(dt[0].split('[')[1])*60000000 + 
	parseFloat(sm[0]*1000000 + sm[1].split(']')[0]*1000))/1000; //这一步我自己都觉得甚是坑爹啊！
	        lrct.push([_t, t[1]]);
	    		}
		}
	return lrct;
	}

});