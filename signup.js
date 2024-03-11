
const signuphandler = (event) =>{
    event.preventDefault()
    const role = document.getElementById("user-role").value
    const username = document.getElementById("username").value
    const email = document.getElementById("email").value
    const image = document.getElementById("image").files[0]
    const first_name = document.getElementById("first_name").value
    const last_name = document.getElementById("last_name").value
    const password = document.getElementById("password").value
    const confirm_password = document.getElementById("confirm_password").value
    const formData = new FormData();
    formData.append('role', role);
    formData.append('username', username);
    formData.append('email', email);
    formData.append('image', image);
    formData.append('first_name', first_name);
    formData.append('last_name', last_name);
    formData.append('password', password);
    formData.append('confirm_password', confirm_password);
    console.log(formData);
    if(password===confirm_password){
        document.getElementById("pass-error").innerText=""
        if(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(password)){
            
            fetch("https://e-school-api.onrender.com/user/register/",{
                method: "POST",
                body: formData,
            })
            .then((req)=>req.json())
            .then((data)=>{
                console.log(data);
                const parent = document.getElementById("notification")
                const div = document.createElement("div")
                div.innerHTML = `
                <p class="text-center mt-4 bg-success w-25 m-auto p-2 text-light" style="border-radius: 10rem;font-weight: 500;"><i class="fa fa-exclamation-circle"></i> Check Your mail for confirmation</p>
                `
                parent.appendChild(div)
            
            })
        }
        else{
            alert("Password is not strong enough")
            document.getElementById("pass-error").innerText="Password must contain minimum 8 letters with at least a symbol, upper and lower case letters and a number"
        }
    }
    else{
        alert("Passwords do not match")
        document.getElementById("pass-error").innerText="Passwords do not match"
    }
}