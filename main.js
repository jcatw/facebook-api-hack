// features
function featureFactory(regexp, description) {
		return {'regexp': regexp, 'description': description};
}
		
var features = [featureFactory(/([A-Z]\w*)/g, "Capitalized"),
								featureFactory(/(spaz)/g, "spaz"),
								featureFactory(/(Apple|Orange)/g, "Specific Fruit")];
								

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
		//var word = "";
		$("#postArea").on("keyup", function(event) {
				//var wordbound = /\W/;
				//var character = String.fromCharCode(event.which);
				//console.log(character);
				//$("#postMirror").html($("#postMirror").html().concat(character));
				//word += character;
				var s = $( this ).val();
				//if(wordbound.test(character)) {
				var count = 0;
						
				// count
				var splt = s.split(/\W/);
				for (var i = 0; i < splt.length; i++) {
						for(var j = 0; j < features.length; j++) {
								if (splt[i].match(features[j].regexp)) {
										count = count + 1;
								}
						}
				}
				$("#count").text(count);
				
				// highlight
				
				for(var j = 0; j < features.length; j++) {
						var highlighter = '<span class="text-warning toggle" data-toggle="tooltip" data-placement="top" title="' + features[j].description + '">$1</span>';
						s = s.replace( features[j].regexp , highlighter );
						$("#postMirror").html(s.replace(/\r\n|\r|\n/gi, '<br/>'));
				}
				$(".toggle").tooltip();
				//word = word.replace( highlight_regexp, '<span class="text-primary">$1</span>');
				//$("#postMirror").html($("#postMirror").html().concat(word));
				//word = "";
				//else

		});
});





