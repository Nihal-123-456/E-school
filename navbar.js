const navview = () =>{
    const token = localStorage.getItem('token');
    const user_id = localStorage.getItem('user_id');
    if(user_id && token)
    {
    fetch(`https://e-school-api.onrender.com/user/userinfo/?user_id=${user_id}`)
    .then((req)=>req.json())
    .then((data)=>{
        fetch(`https://e-school-api.onrender.com/user/list/${user_id}/`)
        .then((req)=>req.json())
        .then((data2)=>{
            fetch("https://e-school-api.onrender.com/teacher/topic/")
            .then((req)=>req.json())
            .then((topic_data)=>{
                if(data[0].role=="student"){
                    const parent = document.getElementById("navbarview")
                    parent.innerHTML = `
                    <nav class="d-lg-flex justify-content-center align-items-center gap-4 pt-3 pb-3 shadow">
                    <a href="index.html"><img class="logo-img" src="image/logo.jpg" alt=""></a>
                    <div class="dropdown">
                        <p class="mt-lg-3" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Categories
                        </p>
                        <ul id="nav-dropdown-menu" class="dropdown-menu">
                        ${topic_data.map((item)=>{
                            return `<li><a class="dropdown-item" href="#">${item.name}</a></li>`
                            
                        }).join('')}
                        </ul>
                    </div>
                    <div><input class="search-bar" type="text" placeholder="Search for anything"></div>
                    <div><a class="nav-links" href="#">Our Business</a></div>
                    <div><a class="nav-links" href="owned_courses.html">My learning</a></div>
                    <div><a class="nav-links" href="cart.html"><i class="fa fa-shopping-cart" 
                    style="font-size: 20px;"></i></a></div>
                    <div><a class="nav-links" href="wishlist.html"><i class="fa fa-heart-o" 
                    style="font-size: 20px;"></i></a></div>
                    <div class="dropdown">
                        <p class="mt-lg-3" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        <img class="prof-img" src="${data[0].image}" alt="">
                        </p>
                        <ul id="profile-menu" class="dropdown-menu">
                            <div class="d-flex gap-3 mx-3 mt-3 mb-3">
                                <img class="prof-img2" src="${data[0].image}" alt="">
                                <div>
                                    <p class="fw-bold mt-3" style="margin-bottom: -5px;">${data2.first_name} ${data2.last_name}</p>
                                    <p><small>${data2.email}</small></p>
                                </div>
                            </div>
                            <hr>
                            <a class="nav-links" href="owned_courses.html"><p class="mx-3">My Learning</p></a>
                            <a class="nav-links" href="cart.html"><p class="mx-3">My Cart</p></a>
                            <a class="nav-links" href="wishlist.html"><p class="mx-3">Wishlist</p></a>
                            <hr>
                            <a class="nav-links" href=""><p class="mx-3">Edit Profile</p></a>
                            <a><p class="btn btn-outline-light mx-3 text-dark" onclick="LogoutHandler('')">Logout</p></a>
                        </ul>
                    </div>
                    </nav>
                    `
                    }
                    else{
                    const parent = document.getElementById("navbarview")
                    parent.innerHTML = `
                    <nav class="d-lg-flex justify-content-center align-items-center gap-4 pt-3 pb-3 shadow">
                    <a href="index.html"><img class="logo-img" src="image/logo.jpg" alt=""></a>
                    <div class="dropdown">
                        <p class="mt-lg-3" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Categories
                        </p>
                        <ul class="dropdown-menu">
                        ${topic_data.map((item)=>{
                            return `<li><a class="dropdown-item" href="#">${item.name}</a></li>`
                            
                        }).join('')}
                        </ul>
                    </div>
                    <div><input class="search-bar" type="text" placeholder="Search for anything"></div>
                    <div><a class="nav-links" href="#">Our Business</a></div>
                    <div><a class="nav-links" href="teacher_courses.html">My courses</a></div>
                    <div><a href="add_course.html" class="nav-links" href="">Upload course</a></div>
                    <div class="dropdown">
                        <p class="mt-lg-3" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        <img class="prof-img" src="${data[0].image}" alt="">
                        </p>
                        <ul id="profile-menu" class="dropdown-menu">
                            <div class="d-flex gap-3 mx-3 mt-3 mb-3">
                                <img class="prof-img2" src="${data[0].image}" alt="">
                                <div>
                                    <p class="fw-bold mt-3" style="margin-bottom: -5px;">${data2.first_name} ${data2.last_name}</p>
                                    <p><small>${data2.email}</small></p>
                                </div>
                            </div>
                            <hr>
                            <a class="nav-links" href="teacher_courses.html"><p class="mx-3">My Courses</p></a>
                            <a href="add_course.html" class="nav-links" href=""><p class="mx-3">Upload Course</p></a>
                            <a class="nav-links" href=""><p class="mx-3">Edit Profile</p></a>
                            <hr>
                            <a class="nav-links" href="owned_courses.html"><p class="mx-3">My learning</p></a>
                            <a class="nav-links" href="cart.html"><p class="mx-3">My Cart</p></a>
                            <a class="nav-links" href="wishlist.html"><p class="mx-3">My wishlist</p></a>
                            <hr>
                            <a><p class="btn btn-outline-light mx-3 text-dark" onclick="LogoutHandler('')">Logout</p></a>
                        </ul>
                    </div>
                    </nav>
                    `
                }
            })
        })
    }) 
    }
    else{
        fetch("https://e-school-api.onrender.com/teacher/topic/")
        .then((req)=>req.json())
        .then((data)=>{
            const parent = document.getElementById("navbarview")
            parent.innerHTML = `
            <nav class="d-lg-flex justify-content-center align-items-center gap-4 pt-3 pb-3 shadow">
            <a href="index.html"><img class="logo-img" src="image/logo.jpg" alt=""></a>
            <div class="dropdown">
                <p class="mt-lg-3" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Categories
                </p>
                <ul id="dropdown-menu" class="dropdown-menu">
                ${data.map((item)=>{
                    return `<li><a class="dropdown-item" href="#">${item.name}</a></li>`
                    
                }).join('')}
                </ul>
            </div>
            <div><input class="search-bar" type="text" placeholder="Search for anything"></div>
            <div><a class="nav-links" href="#">Our Business</a></div>
            <div><a class="nav-links" href="signup.html">Be a Teacher</a></div>
            <div><a class="nav-links" href="#"><i class="fa fa-shopping-cart" 
            style="font-size: 20px;"></i></a></div>
            <div><a class="nav-links btn border-black fw-bold" href="login.html"><small>Log in</small></a></div>
            <div><a class="nav-links btn btn-dark fw-bold" href="signup.html"><small>Sign up</small></a></div>
            </nav>
            `
        })
    }    
    }
navview()
const LogoutHandler=()=>{
    const token = localStorage.getItem("token");
    fetch("https://e-school-api.onrender.com/user/logout/",{
        method: "POST",
        headers: {
            Authorization: `Token ${token}`,
            "content-type": "application/json"
        },  
    })
    .then((req)=>req.json())
    .then((data)=>{
        localStorage.removeItem("token");
        localStorage.removeItem("user_id");
        window.location.href="index.html";
    })
}

