
const show_categories = () =>{
    fetch("https://e-school-api.onrender.com/teacher/topic/")
    .then((req)=>req.json())
    .then((data)=>{
        data.forEach((item)=>{
            const parent = document.getElementById("category-container")
            const p = document.createElement("p")
            p.innerHTML = `
                <li class="btn fw-bold" onclick="show_courses('${item.id}')">${item.name}</li>
            `
            parent.appendChild(p)
        })
    })
}
show_categories()
const show_courses = (topic_id) => {
    document.getElementById("course-card").innerHTML=``
    fetch(`https://e-school-api.onrender.com/teacher/course/?topic_id=${topic_id ? topic_id : ""}`)
    .then((req) => req.json())
    .then((data) => {
        data.forEach((item) => {
        fetch(`https://e-school-api.onrender.com/user/list/${item.teacher}/`)
        .then((req)=>req.json())
        .then((t_data)=>{
            
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
            const parent = document.getElementById("course-card");
            const li = document.createElement("li");
            li.innerHTML = `
            <div class="card shadow mb-4" style="width: 250px; height: 320px;">
                <div class="">
                    <a href="details.html?CourseId=${item.id}"><img src=${item.image} class="" loading="lazy" alt="..." style="width: 100%; height: 150px"></a>
                </div>
                <div class="p-3">
                    <a href="details.html?CourseId=${item.id}" style="text-decoration: none;"><h3 class="h5 text-dark" style="margin-top: -10px;">${item.title}</h3></a>
                    <p id="teachername">${t_data.first_name} ${t_data.last_name}</p>
                    <p id="course-rating" style="margin-top: -15px;" class="fw-bold">${
                    total == 5 ? "⭐⭐⭐⭐⭐ " + "("+total+")" : 
                    total>=4 && total<5 ? "⭐⭐⭐⭐ " + "("+total+")" :
                    total>=3 && total<4 ? "⭐⭐⭐ " + "("+total+")" :
                    total>=2 && total<3 ? "⭐⭐ " + "("+total+")" :
                    total>=1 && total<2 ? "⭐ " + "("+total+")" : "Not Rated" }</p>
                    <div class="d-flex justify-content-between">
                        <h6 class="fw-bold" style="margin-top: -10px;">${
                            item.price == 0 ? "Free" : item.discount == 0 ? "৳ " + item.price : "৳ " + parseFloat(item.price - ((item.discount * item.price) / 100)).toFixed(2)
                        }</h6>
                        <h6 class="text-decoration-line-through" style="margin-top: -10px;">${
                            item.discount == 0 ? "" : "৳ " + item.price
                        }</h6>
                    </div>
                </div>
            </div>
            `;
            parent.appendChild(li);
            })
        })
        });
    })
};
show_courses();
