const orderList = [];
let totalCost = 0;


//add the item to the order list
function addToOrder(item){
    //push item to the list

    orderList.push(item.name);
    let h5 = document.createElement("h5");
    h5.textContent = item.name;
    document.getElementById("order-list").appendChild(h5);
    //add customize and remove buttons
    totalCost += item.cost;


    document.getElementById("total-cost").innerText = "$"+totalCost.toFixed(2);
}

//populate the menu display
function addMenuItem(item){
    let it = document.createElement("div");


    let h2 = document.createElement("h2");
    h2.textContent = item.name;
    let h3 = document.createElement("h3");
    h3.textContent = item.description;
    let h4 = document.createElement("h4");
    h4.textContent = "$"+item.cost;

    let button = document.createElement("button");
    button.classList.add("add-btn");
    button.id = item.id;
    button.textContent = "Add";

    button.addEventListener("click", () =>{
        addToOrder(item);
    });

    it.append(h2,h3,h4,button);
    document.getElementById("menu-list").appendChild(it);

}


document.addEventListener("DOMContentLoaded", () => {
    fetch("http://localhost:3000/array").then(response => response.json())
    .then(items => items.forEach(item=> addMenuItem(item)));
})