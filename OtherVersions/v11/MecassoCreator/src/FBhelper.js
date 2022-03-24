
export function initFacebookSdk() {
    return new Promise(resolve => {
        // wait for facebook sdk to initialize before starting the react app
        
        window.fbAsyncInit = function () {
            window.FB.init({
                appId: '1528784487462702',
                cookie: true,
                xfbml: true,
                version: 'v8.0'
            });
            console.log("FACEBOOK FACEBOOK FACEBOOK 1", window.FB);
            // auto authenticate with the api if already logged in with facebook
            window.FB.getLoginStatus(({ authResponse }) => {
                if (authResponse) {
                    console.log("FACEBOOK FACEBOOK FACEBOOK");
                    console.log(authResponse);
                }
            });
        };

        // load facebook sdk script
        (function (d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) { return; }
            js = d.createElement(s); js.id = id;
            js.src = "https://connect.facebook.net/en_US/sdk.js";
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));    
    });
}