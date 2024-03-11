const loginhandler=(event)=>{
    event.preventDefault();
    const username = document.getElementById("login-username").value
    const password = document.getElementById("login-password").value
    if((username,password)){
        fetch("https://e-school-api.onrender.com/user/login/",{
                method: "POST",
                headers: {"content-type":"application/json"},
                body: JSON.stringify({username,password}),
            })
            .then((req)=>req.json())
            .then((data)=>{
                if(data.token && data.user_id){
                    localStorage.setItem("token",data.token);
                    localStorage.setItem("user_id",data.user_id);
                    window.location.href="index.html";
                }
            })
    }
}