addform = document.querySelector(".add");
tasks = document.querySelector(".tasks");
message= document.querySelector(".message");
search = document.querySelector(".search");

addform.addEventListener("submit",event=>{
    event.preventDefault();
    const value = addform.task.value.trim()
    if(value.length){
        tasks.innerHTML += `<li>
        <span>${value}</span> 
        <i class="bi bi-trash3-fill delete"></i>
        </li>`;
        addform.reset();
        up_mess();
    }

})

tasks.addEventListener("click",event=>{
    //event.target.innerHTML === "I"
    if (event.target.classList.contains("delete")){
        event.target.parentElement.remove("I");
        up_mess();
    }

})

// message.addEventListener("click",event=>{
//     if(event.target.classList.contains("clear")){
//         tasks.innerHTML = ""
//     }
// })

message.addEventListener("click",event=>{
    if(event.target.classList.contains("clear")){
        t = tasks.querySelectorAll("li");
        t.forEach(task => {
            task.remove();
        });
    }
    up_mess();
})
function up_mess(){
    // tasks.children.length
    n = tasks.querySelectorAll("li").length
    message.querySelector("span").innerHTML = `You have ${n} pending task`;
}
up_mess()

function filtertask(term){
    Array.from(tasks.children).filter(task => {
        return !task.textContent.includes(term);
    }).forEach(l=>{
        l.classList.add("hide");
    });
    Array.from(tasks.children).filter(task => {
        return task.textContent.includes(term);
    }).forEach(l=>{
        l.classList.remove("hide");
    });
    
}

search.addEventListener("keyup",event =>{
    let term = search.task.value.trim();
    filtertask(term);
})
search.addEventListener("click",event =>{
    if(event.target.classList.contains("reset")){
        search.reset();
        let term = search.task.value.trim();
        filtertask(term);
    }
    
})
