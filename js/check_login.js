export var isLoggedIn

export var loginAuth = JSON.parse(sessionStorage.getItem("user_info"))
isLoggedIn = false
if (loginAuth == null){
    if (window.location.pathname != "/index.html" && window.location.pathname != "/") window.location.replace("/");
    isLoggedIn = false
}
else{
    isLoggedIn = true
}

export var username
if (loginAuth) {
    username = loginAuth.username
} else {
    username = null
}
