const course_type=()=>{
    fetch("https://e-school-api.onrender.com/teacher/topic/")
    .then((req)=>req.json())
    .then((data)=>{
        data.forEach((item)=>{
            console.log(item);
            const type_name = document.getElementById("course-type")
            const option = document.createElement("option")
            option.value = item.name
            option.innerText = item.name
            type_name.appendChild(option)
        })
    })
}
course_type()

const course_upload = (event) =>{
    event.preventDefault()
    const user_id = localStorage.getItem("user_id")
    const course_type = document.getElementById("course-type").value
    const title = document.getElementById("Title").value
    const description = document.getElementById("Description").value
    const image = document.getElementById("Course-image").files[0]
    const price = document.getElementById("Price").value
    const formData = new FormData();
    formData.append('topics', course_type);
    formData.append('title', title);
    formData.append('description', description);
    formData.append('image', image);
    formData.append('price', price);
    formData.append('discount',0);
    formData.append('teacher', user_id);
    console.log(formData);
            
    fetch("https://e-school-api.onrender.com/teacher/course/",{
        method: "POST",
        body: formData,
    })
    .then((req)=>req.json())
    .then((data)=>{
        window.location.href = "teacher_courses.html"
    })
}