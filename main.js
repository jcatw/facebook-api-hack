window.fbAsyncInit = function() {
    FB.init({
        appId      : '450584821744469',
        xfbml      : true,
        version    : 'v2.0'
    });
		FB.login(function(resp) {
				FB.api('/me', {fields: 'last_name'}, function(response) {
						console.log(response);
				});
    });
};
(function(d, s, id){
		var js, fjs = d.getElementsByTagName(s)[0];
		if (d.getElementById(id)) {return;}
		js = d.createElement(s); js.id = id;
		js.src = "//connect.facebook.net/en_US/sdk.js";
		fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));
