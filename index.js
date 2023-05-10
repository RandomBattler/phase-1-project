//TO DO
//change click to a form submit for adding order
//fix order list to take more than just the name
//set radio buttons for sizes
//edit order
//Enter customer name
//confirm and check out button
//welcome and closing screens

const orderList = [];
let totalCost = 0;


//add the item to the order list
function addToOrder(item){
    //push item to the list

//    orderList.push(item.name);
    //let h5 = document.createElement("h5");
    const orderLi = document.createElement("li");
    orderLi.textContent = item.name + "    $" + item.cost;
    const del = document.createElement("button");

    del.addEventListener("click", ()=>{
        deleteItem(del, item);
    });
    del.value = "X";
    orderLi.appendChild(del);
    document.getElementById("order-list").appendChild(orderLi);
    //add customize and remove buttons
    
    totalCost += item.cost;


    document.getElementById("total-cost").innerText = "$"+totalCost.toFixed(2);
}
function deleteItem(del, item){
    totalCost -= item.cost;
    document.getElementById("total-cost").innerText = "$"+totalCost.toFixed(2);
    del.parentNode.remove();
    
}

//populate the menu display
function addMenuItem(item){
    let it = document.createElement("div");


    let h2 = document.createElement("h3");
    h2.textContent = item.name;
    let h3 = document.createElement("dt");
    h3.textContent = item.description;
    let h4 = document.createElement("dd");
    h4.textContent = "$"+item.cost;

    let form = document.createElement("form");
    form.id = "form-"+item.name;

    let button = document.createElement("button");
    button.type = "submit"
    button.id = item.id;
    button.textContent = "Add";

    form.addEventListener("submit", (e) =>{
        e.preventDefault();
        addToOrder(item);
     //   console.log(e);
    });

    form.appendChild(button);

    h2.append(h3,h4);
    it.append(h2,form);
    document.getElementById("menu-list").appendChild(it);

}


document.addEventListener("DOMContentLoaded", () => {
    fetch("http://localhost:3000/menu").then(response => response.json())
    .then(items => items.forEach(item=> addMenuItem(item)));
})