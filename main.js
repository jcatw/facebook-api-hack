// model
var highlight_regexp = /([A-Z]\w*)/g;

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
		// post submission event
		$("#submitter").on("click", function() {
				console.log("submit clicked");
				FB.login(function(){
						FB.api('/me/feed',
									 'post',
									 {message: $("#postArea").val()},
									 function(response) {
											 console.log(response);
									 });
				}, {scope:'publish_actions'});
		});
		// text entry event
		$("#postArea").on("keyup", function() {
				var s = $( this ).val();
				var count = 0;

				// count
				var splt = s.split(/\W/);
				for (var i = 0; i < splt.length; i++) {
						if (splt[i].match(highlight_regexp)) {
								count = count + 1;
						}
				}
				$("#count").text(count);

				// highlight
				s = s.replace( highlight_regexp, '<span class="highlight">$1</span>');
				otherPostArea.innerHTML = s.replace(/\r\n|\r|\n/gi, '<br/>');
		});
});





