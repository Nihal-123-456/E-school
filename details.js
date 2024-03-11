const coursedetails=()=>{
    const param = new URLSearchParams(window.location.search).get("CourseId")
    const user_id = localStorage.getItem("user_id")
    const token = localStorage.getItem("token");
    fetch(`https://e-school-api.onrender.com/teacher/course/${param}/`)
    .then((req)=>req.json())
    .then((data)=>{
        fetch(`https://e-school-api.onrender.com/user/list/${data.teacher}/`)
        .then((req)=>req.json())
        .then((t_data)=>{
            fetch(`https://e-school-api.onrender.com/student/review/?course_id=${data.id}`)
            .then((req)=>req.json())
            .then((r_data)=> {
                var rating = 0
                var num = 0
                r_data.forEach((ri)=>{
                    rating += ri.rating
                    num += 1
                })
                var total = (rating/num)
                const parent = document.getElementById("course-details")
                if(token && user_id){
                    fetch(`https://e-school-api.onrender.com/student/ownedcourses/?user_id=${user_id}`)
                    .then((req)=>req.json())
                    .then((oc_data)=>{
                        fetch(`https://e-school-api.onrender.com/user/userinfo/?user_id=${user_id}`)
                        .then((req)=>req.json())
                        .then((userinfo)=>{
                            if(userinfo[0].role=="student"){
                            const inOwnedCourses = oc_data.some((record) => record.course == param)
                            if(!inOwnedCourses){
                            parent.innerHTML = `
                            <div class="d-flex justify-content-between mb-5 mt-5">
                            <img class="detail-img" src="${data.image}" alt="">
                            <div class="m-auto">
                                <h1 class="mb-3">${data.title}</h1>
                                <h4 class="mb-4">Check out the course</h4>
                                <div class="d-flex gap-3 mb-2 align-items-center">
                                    <p id="course-details-topic" class="btn btn-outline-danger">${
                                        data.topics.map((topic_name)=>{
                                            return `${topic_name}`
                                        })
                                    }</p>
                                    <p class="fw-bold">${
                                        total == 5 ? "⭐⭐⭐⭐⭐ " +" "+total: 
                                        total>=4 && total<5 ? "⭐⭐⭐⭐ " +" "+total:
                                        total>=3 && total<4 ? "⭐⭐⭐ " +" "+total:
                                        total>=2 && total<3 ? "⭐⭐ " +" "+total:
                                        total>=1 && total<2 ? "⭐ " +" "+total: "Not Rated" }</p>
                                </div>
                                <p class="mb-4">Created by ${t_data.first_name} ${t_data.last_name}</p>
                                <div class="mb-5">
                                    <h4 class="fw-bold" style="margin-top: -10px;">${
                                        data.price == 0 ? "Free" : data.discount == 0 ? "৳ " + data.price : "৳ " + parseFloat(data.price - ((data.discount * data.price) / 100)).toFixed(2)
                                    }</h4>
                                    <h4 class="text-decoration-line-through" style="margin-top: -2px;">${
                                        data.discount == 0 ? "" : "৳ " + data.price
                                    }</h4>
                                </div>
                                <button onclick="addtowishlist('${data.id}')" class="btn btn-outline-dark w-100 fw-bold mb-3">Add to Wishlist</button>
                                <button onclick="addtocart('${data.id}')" class="btn btn-dark w-100 fw-bold mb-3">Enroll now</button>
                                
                            </div>
                        </div>
                        <h4 class="fw-bold">Description</h4>
                        <hr>
                        <p>${data.description}</p>
                        ` 
                        }
                        else{
                            parent.innerHTML = `
                            <div class="d-flex justify-content-between mb-5 mt-5">
                            <img class="detail-img" src="${data.image}" alt="">
                            <div class="m-auto">
                                <h1 class="mb-3">${data.title}</h1>
                                <h4 class="mb-4">Check out the course</h4>
                                <div class="d-flex gap-3 mb-2 align-items-center">
                                    <p id="course-details-topic" class="btn btn-outline-danger">${
                                        data.topics.map((topic_name)=>{
                                            return `${topic_name}`
                                        })
                                    }</p>
                                    <p class="fw-bold">${
                                        total == 5 ? "⭐⭐⭐⭐⭐ " +" "+total: 
                                        total>=4 && total<5 ? "⭐⭐⭐⭐ " +" "+total:
                                        total>=3 && total<4 ? "⭐⭐⭐ " +" "+total:
                                        total>=2 && total<3 ? "⭐⭐ " +" "+total:
                                        total>=1 && total<2 ? "⭐ " +" "+total: "Not Rated" }</p>
                                </div>
                                <p class="mb-4">Created by ${t_data.first_name} ${t_data.last_name}</p>
                                <div class="mb-5">
                                    <h4 class="fw-bold" style="margin-top: -10px;">${
                                        data.price == 0 ? "Free" : data.discount == 0 ? "৳ " + data.price : "৳ " + parseFloat(data.price - ((data.discount * data.price) / 100)).toFixed(2)
                                    }</h4>
                                    <h4 class="text-decoration-line-through" style="margin-top: -2px;">${
                                        data.discount == 0 ? "" : "৳ " + data.price
                                    }</h4>
                                </div>
                                <h5><i class="fa fa-exclamation-circle"></i> You already own this course</h5>
                            </div>
                        </div>
                        <h4 class="fw-bold">Description</h4>
                        <hr>
                        <p>${data.description}</p>
                        ` 
                        }
                            }
                            else{
                            fetch(`https://e-school-api.onrender.com/teacher/course/?user_id=${user_id}`)
                            .then((req)=>req.json())
                            .then((cc_data)=>{
                                const inOwnedCourses = oc_data.some((record) => record.course == param)
                                const inCreatedCourses = cc_data.some((record) => record.id == param)
                                if(inOwnedCourses){
                                    parent.innerHTML = `
                                    <div class="d-flex justify-content-between mb-5 mt-5">
                                    <img class="detail-img" src="${data.image}" alt="">
                                    <div class="m-auto">
                                        <h1 class="mb-3">${data.title}</h1>
                                        <h4 class="mb-4">Check out the course</h4>
                                        <div class="d-flex gap-3 mb-2 align-items-center">
                                            <p id="course-details-topic" class="btn btn-outline-danger">${
                                                data.topics.map((topic_name)=>{
                                                    return `${topic_name}`
                                                })
                                            }</p>
                                            <p class="fw-bold">${
                                                total == 5 ? "⭐⭐⭐⭐⭐ " +" "+total: 
                                                total>=4 && total<5 ? "⭐⭐⭐⭐ " +" "+total:
                                                total>=3 && total<4 ? "⭐⭐⭐ " +" "+total:
                                                total>=2 && total<3 ? "⭐⭐ " +" "+total:
                                                total>=1 && total<2 ? "⭐ " +" "+total: "Not Rated" }</p>
                                        </div>
                                        <p class="mb-4">Created by ${t_data.first_name} ${t_data.last_name}</p>
                                        <div class="mb-5">
                                            <h4 class="fw-bold" style="margin-top: -10px;">${
                                                data.price == 0 ? "Free" : data.discount == 0 ? "৳ " + data.price : "৳ " + parseFloat(data.price - ((data.discount * data.price) / 100)).toFixed(2)
                                            }</h4>
                                            <h4 class="text-decoration-line-through" style="margin-top: -2px;">${
                                                data.discount == 0 ? "" : "৳ " + data.price
                                            }</h4>
                                        </div>
                                        <h5><i class="fa fa-exclamation-circle"></i> You already own this course</h5>
                                    </div>
                                </div>
                                <h4 class="fw-bold">Description</h4>
                                <hr>
                                <p>${data.description}</p>
                                ` 
                                }
                            else if(inCreatedCourses){
                                parent.innerHTML = `
                                    <div class="d-flex justify-content-between mb-5 mt-5">
                                    <img class="detail-img" src="${data.image}" alt="">
                                    <div class="m-auto">
                                        <h1 class="mb-3">${data.title}</h1>
                                        <h4 class="mb-4">Check out the course</h4>
                                        <div class="d-flex gap-3 mb-2 align-items-center">
                                            <p id="course-details-topic" class="btn btn-outline-danger">${
                                                data.topics.map((topic_name)=>{
                                                    return `${topic_name}`
                                                })
                                            }</p>
                                            <p class="fw-bold">${
                                                total == 5 ? "⭐⭐⭐⭐⭐ " +" "+total: 
                                                total>=4 && total<5 ? "⭐⭐⭐⭐ " +" "+total:
                                                total>=3 && total<4 ? "⭐⭐⭐ " +" "+total:
                                                total>=2 && total<3 ? "⭐⭐ " +" "+total:
                                                total>=1 && total<2 ? "⭐ " +" "+total: "Not Rated" }</p>
                                        </div>
                                        <p class="mb-4">Created by ${t_data.first_name} ${t_data.last_name}</p>
                                        <div class="mb-5">
                                            <h4 class="fw-bold" style="margin-top: -10px;">${
                                                data.price == 0 ? "Free" : data.discount == 0 ? "৳ " + data.price : "৳ " + parseFloat(data.price - ((data.discount * data.price) / 100)).toFixed(2)
                                            }</h4>
                                            <h4 class="text-decoration-line-through" style="margin-top: -2px;">${
                                                data.discount == 0 ? "" : "৳ " + data.price
                                            }</h4>
                                        </div>
                                        <h5><i class="fa fa-exclamation-circle"></i> You published this course</h5>
                                    </div>
                                </div>
                                <h4 class="fw-bold">Description</h4>
                                <hr>
                                <p>${data.description}</p>
                                ` 
                            }
                            else{
                                parent.innerHTML = `
                                    <div class="d-flex justify-content-between mb-5 mt-5">
                                    <img class="detail-img" src="${data.image}" alt="">
                                    <div class="m-auto">
                                        <h1 class="mb-3">${data.title}</h1>
                                        <h4 class="mb-4">Check out the course</h4>
                                        <div class="d-flex gap-3 mb-2 align-items-center">
                                            <p id="course-details-topic" class="btn btn-outline-danger">${
                                                data.topics.map((topic_name)=>{
                                                    return `${topic_name}`
                                                })
                                            }</p>
                                            <p class="fw-bold">${
                                                total == 5 ? "⭐⭐⭐⭐⭐ " +" "+total: 
                                                total>=4 && total<5 ? "⭐⭐⭐⭐ " +" "+total:
                                                total>=3 && total<4 ? "⭐⭐⭐ " +" "+total:
                                                total>=2 && total<3 ? "⭐⭐ " +" "+total:
                                                total>=1 && total<2 ? "⭐ " +" "+total: "Not Rated" }</p>
                                        </div>
                                        <p class="mb-4">Created by ${t_data.first_name} ${t_data.last_name}</p>
                                        <div class="mb-5">
                                            <h4 class="fw-bold" style="margin-top: -10px;">${
                                                data.price == 0 ? "Free" : data.discount == 0 ? "৳ " + data.price : "৳ " + parseFloat(data.price - ((data.discount * data.price) / 100)).toFixed(2)
                                            }</h4>
                                            <h4 class="text-decoration-line-through" style="margin-top: -2px;">${
                                                data.discount == 0 ? "" : "৳ " + data.price
                                            }</h4>
                                        </div>
                                        <button onclick="addtowishlist('${data.id}')" class="btn btn-outline-dark w-100 fw-bold mb-3">Add to Wishlist</button>
                                        <button onclick="addtocart('${data.id}')" class="btn btn-dark w-100 fw-bold mb-3">Enroll now</button>
                                    </div>
                                </div>
                                <h4 class="fw-bold">Description</h4>
                                <hr>
                                <p>${data.description}</p>
                                ` 
                            }
                            })
                            }
                        })
                    })
                }
                else{
                    parent.innerHTML = `
                    <div class="d-flex justify-content-between mb-5 mt-5">
                    <img class="detail-img" src="${data.image}" alt="">
                    <div class="m-auto">
                        <h1 class="mb-3">${data.title}</h1>
                        <h4 class="mb-4">Check out the course</h4>
                        <div class="d-flex gap-3 mb-2 align-items-center">
                            <p id="course-details-topic" class="btn btn-outline-danger">${
                                data.topics.map((topic_name)=>{
                                    return `${topic_name}`
                                })
                            }</p>
                            <p class="fw-bold">${
                                total == 5 ? "⭐⭐⭐⭐⭐ " +" "+total: 
                                total>=4 && total<5 ? "⭐⭐⭐⭐ " +" "+total:
                                total>=3 && total<4 ? "⭐⭐⭐ " +" "+total:
                                total>=2 && total<3 ? "⭐⭐ " +" "+total:
                                total>=1 && total<2 ? "⭐ " +" "+total: "Not Rated" }</p>
                        </div>
                        <p class="mb-4">Created by ${t_data.first_name} ${t_data.last_name}</p>
                        <div class="mb-5">
                            <h4 class="fw-bold" style="margin-top: -10px;">${
                                data.price == 0 ? "Free" : data.discount == 0 ? "৳ " + data.price : "৳ " + parseFloat(data.price - ((data.discount * data.price) / 100)).toFixed(2)
                            }</h4>
                            <h4 class="text-decoration-line-through" style="margin-top: -2px;">${
                                data.discount == 0 ? "" : "৳ " + data.price
                            }</h4>
                        </div>
                        <h5><i class="fa fa-exclamation-circle"></i> Please Sign in to purchase our courses</h5>
                        
                    </div>
                </div>
                <h4 class="fw-bold">Description</h4>
                <hr>
                <p>${data.description}</p>
                ` 
                }
            })
        })
    })
}
coursedetails()
const addtowishlist=(courseid)=>{
    user_id=localStorage.getItem('user_id')
    fetch(`https://e-school-api.onrender.com/student/wishlist/?user_id=${user_id}`)
    .then((req)=>req.json())
    .then((data)=>{
        const inWishlist = data.some((record) => record.course == courseid);
        if (!inWishlist) {
            const info = {
                "student": user_id,
                "course": courseid
            }
            fetch("https://e-school-api.onrender.com/student/wishlist/",{
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(info)
            })
            .then((req)=>req.json())
            .then((data2)=>{
                window.location.href = "wishlist.html"
            })
        }
        else{
            window.location.href = "wishlist.html"
        }
    })
}
const addtocart=(courseid)=>{
    user_id=localStorage.getItem('user_id')
    fetch(`https://e-school-api.onrender.com/student/cart/?user_id=${user_id}`)
    .then((req)=>req.json())
    .then((data)=>{
        const inCart = data.some((record) => record.course == courseid);
        if (!inCart) {
            const info = {
                "student": user_id,
                "course": courseid
            }
            fetch("https://e-school-api.onrender.com/student/cart/",{
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(info)
            })
            .then((req)=>req.json())
            .then((data2)=>{
                window.location.href = "cart.html"
            })
        }
        else{
            window.location.href = "cart.html"
        }
    })
}

