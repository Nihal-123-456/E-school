const cartcourses=()=>{
    const user_id = localStorage.getItem('user_id')
    fetch(`https://e-school-api.onrender.com/student/cart/?user_id=${user_id}`)
    .then((req)=>req.json())
    .then((data)=>{
        const cn = document.getElementById("cart-course-num")
        cn.innerHTML = `<h5>${data.length} courses</h5>`
        if(data.length==0){
            document.getElementById("checkout-btn").innerHTML = ``
        }
        var total_price = 0.00
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
                    var course_price = parseFloat(c_data.price - ((c_data.discount * c_data.price) / 100)).toFixed(2)
                    
                    total_price += parseFloat(course_price)
                    document.getElementById("total-price").innerHTML = `
                        <p class="fw-bold">Total:</p>
                        <h2 class="fw-bold">৳ ${total_price}</h2>
                    `
                    
                    var rating = 0
                    var num = 0
                    r_data.forEach((ri)=>{
                        rating += ri.rating
                        num += 1
                    })
                    var total = (rating/num)
                    const parent = document.getElementById("cart-courses")
                    const div = document.createElement("div")
                    div.innerHTML = `
                    <div class="d-flex justify-content-centre align-items-center gap-5">
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
                            <a onclick="cartdelete('${item.id}')" class="btn mb-2 text-primary">Remove</a> <br>
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
cartcourses()
const cartdelete=(cartid)=>{
    fetch(`https://e-school-api.onrender.com/student/cart/${cartid}?_=${new Date().getTime()}` , {
          method: 'DELETE',
          })
          .then((res)=>{
            if (!res.ok) {
                throw new Error('Network response was not ok');
            }
            if (res.status === 204) {
                window.location.reload();
            }
            return res.json(); 
          })
          .then((data)=>{
          })
    
}
const checkout=()=>{
    const user_id = localStorage.getItem('user_id')
    fetch(`https://e-school-api.onrender.com/student/cart/?user_id=${user_id}`)
    .then((req)=>req.json())
    .then((data)=>{
        data.forEach((item)=>{
            const info = {
                "student": item.student,
                "course": item.course
            }
            fetch("https://e-school-api.onrender.com/student/ownedcourses/",{
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(info)
            })
            .then((req)=>req.json())
            .then((data2)=>{
                fetch(`https://e-school-api.onrender.com/student/cart/${item.id}?_=${new Date().getTime()}` , {
                method: 'DELETE',})
                .then((req)=>{
                    if (!req.ok) {
                        throw new Error('Network response was not ok');
                    }
                    if (req.status === 204) {
                        window.location.href="owned_courses.html"
                    }
                    return req.json(); 
                })
                .then((data3)=>{

                })
              })
            })
        })
    }