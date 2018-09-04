$(document).ready(function() {

(function() {
		var oldajaxfuc = jQuery.ajax;
		jQuery.extend({
			ajax: function( url, options ){
				// If url is an object, simulate pre-1.5 signature
				if ( typeof url === "object" ) {
					options = url;
					url = undefined;
				}
				
				var oldSuccessFunc = options.success;
				options.success = function(ret) {
					if(ret.sessionTimeout) {
						Messenger.options = {
								parentLocations : [ 'body' ],
								extraClasses : 'messenger-fixed  messenger-on-top',
								theme : 'flat'
						};

						Messenger().post("您好久没进行操作，会话已过期，请重新登录");
						window.setTimeout(function(){
							  window.location.href = "login.html";	
							}, 3300);
						return;
					} else {
						oldSuccessFunc.apply(this, arguments);
					}
				};
				
				oldajaxfuc(url, options);
			}
		});
	})();

});