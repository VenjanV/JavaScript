let form = document.querySelector(".quiz-form");
const correctAns =["C","C","D","A","B"];
let sc = document.querySelector(".result");
const que = document.querySelectorAll(".question");

form.addEventListener("submit",(event)=> {
    event.preventDefault();
    let score = 0;
    const userAnswers = [form.q1.value,form.q2.value,form.q3.value,form.q4.value,form.q5.value];
    console.log(userAnswers);
    
    userAnswers.forEach((ans,index) => {
        if (ans === correctAns[index]){
            score++;
            que[index].classList.add("correct")
            // que[index].setAttribute("class","correct");
        }
        else{
            que[index].classList.add("wrong");
        }      
    });
    scrollTo(0,0);
    sc.classList.remove("hide");
    sc.querySelector("p").innerText = `You scored ${score}/5`;  
    console.log(score);
});