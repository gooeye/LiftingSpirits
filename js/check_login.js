export var isLoggedIn

export var loginAuth = JSON.parse(sessionStorage.getItem("user_info"))
    isLoggedIn = false
    if (loginAuth == null){
        if (window.location.pathname != "/index.html") window.location.replace("/index.html");
        isLoggedIn = false
    }
    else{
        isLoggedIn = true
}

