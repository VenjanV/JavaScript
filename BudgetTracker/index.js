add = document.querySelector(".add");
record = document.querySelector(".records")
balance = document.getElementById("balance")
income = document.getElementById("income")
expense = document.getElementById("expense")
let transactions =localStorage.getItem("transactions")!==null ? JSON.parse(localStorage.getItem("transactions")):[];
add.addEventListener("submit",event=>{
    event.preventDefault();
    if(Number(add.amount.value) === "" || add.source.value ===""){
        alert("Can't be empty")
    }
    else{
        add_transaction(add.source.value.trim(),Number(add.amount.value));
    }
    add.reset();
})
function add_transaction(s,a){
    const time = new Date();
    const transaction ={
            id: Math.floor(Math.random()*10000),
            source: `${s}`,
            amount: `${a}`,
            time: `${time.toLocaleTimeString()} ${time.toLocaleDateString()}`
    };
    transactions.push(transaction)
    localStorage.setItem("transactions",JSON.stringify(transactions))
    addTransactionDOM(transaction.id,transaction.source,transaction.amount,transaction.time);
    updateStat();
}

function generateTemplate(id,s,a,t){
    return `<li data-id="${id}">
                                    <p>
                                        <span>${s}</span>
                                        <span id="time">${t}</span>
                                    </p>
                                    <span class="d">$${Math.abs(a)}</span>
                                    <i class="bi bi-trash3 delete"></i>
                                </li>
        `
}
function addTransactionDOM(id,s,a,t){
    if(a>0){
        record.querySelector(".income-list").innerHTML += generateTemplate(id,s,a,t);
    }
    else{
        record.querySelector(".expense-list").innerHTML += generateTemplate(id,s,a,t);
    }
}
function getTransaction(){
    transactions.forEach(t => {
        addTransactionDOM(t.id,t.source,t.amount,t.time);
    });
}
getTransaction();

function deleteTransaction(id){
    transactions = transactions.filter(transaction =>{
        return transaction.id !== id;
    });
    localStorage.setItem("transactions",JSON.stringify(transactions));
}

record.addEventListener("click",event=>{
    if(event.target.classList.contains("delete")){
        event.target.parentElement.remove();
        deleteTransaction(Number(event.target.parentElement.dataset.id));
        updateStat();
    }
})

function updateStat(){
    let inc = transactions
    .filter(t =>t.amount > 0)
    .reduce((total,t)=>total += Number(t.amount),0);

    let exp =transactions
    .filter(t => t.amount <0)
    .reduce((total,t)=> total += Math.abs(t.amount),0);
    let bal= inc - exp;

    income.textContent = Number(inc);
    expense.textContent = exp;
    balance.textContent = bal;
}
updateStat();