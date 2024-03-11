const ownedcourses=()=>{
    const user_id = localStorage.getItem('user_id')
    fetch(`https://e-school-api.onrender.com/student/ownedcourses/?user_id=${user_id}`)
    .then((req)=>req.json())
    .then((data)=>{
        const cn = document.getElementById("owned-course-num")
        cn.innerHTML = `<h5>${data.length} courses</h5>`
        data.forEach((item)=>{
            fetch(`https://e-school-api.onrender.com/student/review/?course_id=${item.course}`)
            .then((req)=>req.json())
            .then((r_data)=>{
               fetch(`https://e-school-api.onrender.com/teacher/course/${item.course}/`)
               .then((req)=>req.json())
               .then((c_data)=>{
                    fetch(`https://e-school-api.onrender.com/user/list/${c_data.teacher}/`)
                    .then((req)=>req.json())
                    .then((t_data)=>{
                    var rating = 0
                    var num = 0
                    r_data.forEach((ri)=>{
                        rating += ri.rating
                        num += 1
                    })
                    var total = (rating/num)
                    const parent = document.getElementById("owned-courses")
                    const div = document.createElement("div")
                    div.innerHTML = `
                    <div class="d-flex justify-content-around align-items-center">
                        <img class="profile-courses-image" src="${c_data.image}" alt="">
                        <div>
                            <h4 style="margin-bottom: 2px;">${c_data.title}</h4>
                            <small>Created by ${t_data.first_name} ${t_data.last_name}</small>
                            <div class="mt-2">
                                <p id="" class="fw-bold">
                                    ${c_data.topics.map((topic)=>{
                                        return `<small>${topic}</small>`
                                    })}
                                </p>
                                <p class="fw-bold">${
                                    total == 5 ? "⭐⭐⭐⭐⭐ " +" "+total: 
                                    total>=4 && total<5 ? "⭐⭐⭐⭐ " +" "+total:
                                    total>=3 && total<4 ? "⭐⭐⭐ " +" "+total:
                                    total>=2 && total<3 ? "⭐⭐ " +" "+total:
                                    total>=1 && total<2 ? "⭐ " +" "+total: "Not Rated" }</p>
                            </div>
                        </div>
                        <div>
                            <a class="btn mb-2 text-primary" href="details.html?CourseId=${c_data.id}">See Details</a>
                        </div>
                        <div>
                            <h4 class="fw-bold" style="margin-top: -10px;">${
                                c_data.price == 0 ? "Free" : c_data.discount == 0 ? "৳ " + c_data.price : "৳ " + parseFloat(c_data.price - ((c_data.discount * c_data.price) / 100)).toFixed(2)
                            }</h4>
                            <h4 class="text-decoration-line-through" style="margin-top: -2px;">${
                                c_data.discount == 0 ? "" : "৳ " + c_data.price
                            }</h4>
                        </div>
                    </div>
                    <hr>
                    `
                    parent.appendChild(div)
                    })
               })
            })
        })
    })
}
ownedcourses()

