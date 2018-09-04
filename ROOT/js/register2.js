$(document).ready(function() {

	var index = 1; //用于用户自定义控件name属性
	Messenger.options = {
		parentLocations : [ '#msg_area' ],
		extraClasses : 'messenger-fixed  messenger-on-top',
		theme : 'flat'
	};

	var msg = Messenger().post("initial msg");
	msg.hide();

	$("div").on("blur", 'input', function(event) {    //input 数字验证
		if($(this).attr("id") != "desc"){
		checkNumber(msg, this.value.trim(), this);
		event.stopPropagation();
		};
		
		if($(this).attr("id") === "desc"){
			if(this.value.trim().length === 0){
				msg.update({
					message : "请输入自定义消费描述，比如[车保养费]",
					type : "error"
				});
				//this.focus();
				event.stopPropagation();
			}
		};
	});

	var $userDef = $("#userDef").detach();

	$("#userAdd").on("click", function() {         //用户自定义消费添加
		var $element = $userDef.clone();
		$element.find("#desc").attr("name", "desc" + index);
		$element.find("#mount").attr("name", "mount" + index);
		$element.find("#radio").attr("name", "radio_user" + index);
		index = index + 1;
		if (index > 6) {
			msg.update({
				message : "最多只能添加5个自定义消费",
				type : "error"
			});
			return;
		} else {
			$("#addBeforeHere").before($element);
		}

	});

	$("div").on("click", "button", function(event) {      //用户自定义消费删除
		if ($(this).attr("id") === "userRemove") {
			$(this).parents(".form-group").remove();
			index = index - 1;
		}
		event.stopPropagation();
	});
	
	$("#next").on("click", function(event){
		
        $("input").each(function(index, element){
        	if (isNaN(this.value.trim()) && $(this).attr("id") != "desc") {
        		msg.update({
    				message : "请输入数字",
    				type : "error"
    			});
        		//this.focus();
        		event.preventDefault();
        		return false;
			}
        	
        	if (this.value.trim().length ===0 && $(this).attr("id") === "desc") {
        		msg.update({
    				message : "请输入自定义描述，如[车保养费]",
    				type : "error"
    			});
        		//this.focus();
        		event.preventDefault();
        		return false;
			}
        	
        });

		
	});

	function checkNumber(i_msg, i_value, i_this) {        //数字验证

		if (isNaN(i_value) && i_value.length != 0) {
			i_msg.update({
				message : "请输入数字",
				type : "error"
			});
			//i_this.focus();
		}else if(i_value < 0){
			i_msg.update({
				message : "请输入大于零的数字",
				type : "error"
			});
			//i_this.focus();
		}else if(i_this.type != 'radio' && i_value === '0'){
			i_msg.update({
				message : "无该项不用填写0，请留空",
				type : "error"
			});
			//i_this.focus();
		}else{
			i_msg.hide();
		}
	}
});