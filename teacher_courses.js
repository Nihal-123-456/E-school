const teachercourses=()=>{
    const user_id = localStorage.getItem('user_id')
    fetch(`https://e-school-api.onrender.com/teacher/course/?user_id=${user_id}`)
    .then((req)=>req.json())
    .then((data)=>{
        const cn = document.getElementById("course-num")
        cn.innerHTML = `<h5>${data.length} courses</h5>`
        data.forEach((item)=>{
            fetch(`https://e-school-api.onrender.com/student/review/?course_id=${item.id}`)
            .then((req)=>req.json())
            .then((r_data)=>{
                var rating = 0
                var num = 0
                r_data.forEach((ri)=>{
                    rating += ri.rating
                    num += 1
                })
                var total = (rating/num)
                const parent = document.getElementById("profile-courses")
                const div = document.createElement("div")
                div.innerHTML = `
                <div class="d-flex justify-content-around align-items-center">
                    <img class="profile-courses-image" src="${item.image}" alt="">
                    <div>
                        <h4>${item.title}</h4>
                        <div>
                            <p id="" class="">
                                ${item.topics.map((topic)=>{
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
                        <button onclick="teachercoursedelete('${item.id}')" class="btn mb-2 text-primary">Remove</button> <br>
                        <button class="btn mb-2 text-primary">Edit</button> <br>
                        <a class="btn mb-2 text-primary" href="details.html?CourseId=${item.id}">Student View</a>
                    </div>
                    <div>
                        <h4 class="fw-bold" style="margin-top: -10px;">${
                            item.price == 0 ? "Free" : item.discount == 0 ? "৳ " + item.price : "৳ " + parseFloat(item.price - ((item.discount * item.price) / 100)).toFixed(2)
                        }</h4>
                        <h4 class="text-decoration-line-through" style="margin-top: -2px;">${
                            item.discount == 0 ? "" : "৳ " + item.price
                        }</h4>
                    </div>
                </div>
                <hr>
                `
                parent.appendChild(div)
            })
        })
    })
}
teachercourses()
const teachercoursedelete=(courseid)=>{
    fetch(`https://e-school-api.onrender.com/teacher/course/${courseid}?_=${new Date().getTime()}` , {
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