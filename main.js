// features
function featureFactory(regexp, description) {
		return {'regexp': regexp, 'description': description, 'count': 0};
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
				
						
				// count
				var splt = s.split(/\W/);
				for (var j = 0; j < features.length; j++)
						features[j].count = 0;
				
				for (var i = 0; i < splt.length; i++) {
						var countext="";
						for(var j = 0; j < features.length; j++) {
								
								if (splt[i].match(features[j].regexp)) {
										features[j].count += 1;
								}
								countext = countext.concat(features[j].count).concat(" ");
						}
				}
				$("#count").text(countext);
				
				
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
		var countext = "";
		for (var j = 0; j < features.length; j++)
				countext = countext.concat(features[j].count).concat(" ");
		$("#count").text(countext);
});





