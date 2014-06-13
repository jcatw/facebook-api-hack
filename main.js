// model
var highlight_regexp = /([A-Z]\w*)/g;

function input_hack() {
		var s = myTextarea.value;
		s = s.replace( highlight_regexp, '<span class="highlight">$1</span>');
		myOtherTextarea.innerHTML = s.replace(/\r\n|\r|\n/gi, '<br/>');
}

// page setup
$(document).ready(function() {
		console.log("doc ready");
		// load facebook sdk
		$.ajaxSetup({ cache: true });
		$.getScript('//connect.facebook.net/en_UK/all.js', function(){
				FB.init({
						appId: '450584821744469',
				});
		});
		// set up post submission event
		$("#submitter").on("click", function() {
				console.log("submit clicked");
				console.log($("#postarea").val());
				FB.login(function(){
						FB.api('/me/feed',
									 'post',
									 {message: $("#postarea").val()},
									 function(response) {
											 console.log(response);
									 });
				}, {scope:'publish_actions'});
		});
});





