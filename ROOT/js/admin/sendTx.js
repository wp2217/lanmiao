$(document).ready(function() {
	
	var emails = $("#sendTo").val();
	var email = "";
	var index;
	var index1;
	
	$("input[type='checkbox']").on("click", function(){
	 
		if ($(this).is(':checked')) {
			
			email = $(this).parent().prevAll().last().next().text() + "; " ;
			index = emails.indexOf(email);
			
			if (index < 0) {
				emails = emails + email;
				$("#sendTo").val(emails);
			}
			
		}else{
			email = $(this).parent().prevAll().last().next().text() + "; " ;
			
			index = emails.indexOf(email);
			index1 = index + email.length;
			emails = emails.substr(0, index) + emails.substr(index1);
			
			$("#sendTo").val(emails);
		}
		
	});
});