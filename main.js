$(document).ready(function() {
		console.log("doc ready");
		$.ajaxSetup({ cache: true });
		$.getScript('//connect.facebook.net/en_UK/all.js', function(){
				FB.init({
						appId: '450584821744469',
				});
		});
		$("#submitter").on("click", function() {
				console.log("submit clicked");
				FB.login(function(){
						FB.api('/me/feed',
									 'post',
									 {message: $("#postarea").value},
									 function(response) {
											 console.log(response);
									 });
				}, {scope:'publish_actions'});
		});
});

