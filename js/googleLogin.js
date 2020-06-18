function onSignIn(googleUser) {
    // Useful data for your client-side scripts:
    var profile = googleUser.getBasicProfile();

    // The ID token you need to pass to your backend:
    var id_token = googleUser.getAuthResponse().id_token;

    //profile
    var element = document.querySelector('#element');
    element.innerText = "Tere " + profile.getGivenName() + "!";

    //signin button disapear
    var signOut = document.querySelector('#signOut');
    signOut.innerText = " Logi välja ";
    $('#signIn').hide();
}

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () { 
        $('#element').empty();   
        $('#signOut').empty();
        $("#signIn").show();
    });
}