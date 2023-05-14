//TO DO
//Enter customer name
//confirm and check out button
//welcome and closing screens

const orderList = [];
const toppingList = [];
let totalCost = 0;


//add the item to the order list
function addToOrder(item, e){
    const size = (item.size.length === 1)? 0 : e.target.size.value;
    //push item to the list

    const order = {};

    
    const orderLi = document.createElement("li");
    orderLi.textContent = (item.size.length === 1)? item.name + ".......$" + item.cost[size]: item.name +" - " + item.size[size] + ".......$" + item.cost[size];
    orderLi.textContent += "            ";

    const del = document.createElement("button");

    del.addEventListener("click", ()=>{
        deleteItem(del, item.cost[size]);
    });
    del.className = "cancelBtn";
    del.textContent = "  X  ";
    del.value = orderList.length;//get the possition in the order array
    orderLi.appendChild(del);
    document.getElementById("order-list").appendChild(orderLi);

    order.name = orderLi.textContent;
    order.node = del;

    if (item.name === "Pizza")//display toppings
    {
        let top = false;
        let topText = ""
        //check if any of the topping boxes have been checked
        for (let i = 0; i < toppingList.length; ++i){
            if(toppingList[i].checked){
                top = true;
                topText += "   -   " + item.toppings[i];
                toppingList[i].checked = false;
            }
        }

        if (top)//there are toppings
        {
            const tList = document.createElement("dd");
            tList.textContent = topText;
            orderLi.appendChild(tList);

            order.name += topText;
        }
    }

    orderList.push(order);

    //add customize and remove buttons
    
    totalCost += item.cost[size];


    document.getElementById("total-cost").innerText = "$"+totalCost.toFixed(2);
}

//remove the item and adjust the price
function deleteItem(del, cost){
    
    totalCost -= cost;
    document.getElementById("total-cost").innerText = "$"+totalCost.toFixed(2);

    //fix up the order list if this is not the last element
    if(del.value != orderList.length-1){
        orderList[del.value] = orderList[orderList.length-1];
        orderList[orderList.length-1].node.value = del.value;
    }

    orderList.pop();
    del.parentNode.remove();
}

//populate the menu display
function addMenuItem(item){
    let it = document.createElement("div");

    let form = document.createElement("form");
    form.id = "form-"+item.name;
    let img = document.createElement("img");
    img.src = item.image;
    img.classList.add("menu-item");

    let h2 = document.createElement("h3");
    h2.textContent = item.name;
    let h3 = document.createElement("dt");
    h3.textContent = item.description;
    let h4 = document.createElement("dd");

    //show size options
    if (item.size.length === 1) //no size options
    {
        h4.textContent = "$"+item.cost[0];
    }
    else{
        for (let size = 0; size < item.size.length; size++){
            let i = document.createElement("input");
            let lab = document.createElement("label");
            lab.for = "rad"+size;
            i.id = "rad"+size;
            i.type = "radio";
            i.name = "size";
            i.value = size;
            lab.textContent = item.size[size] + "   $"+ item.cost[size] + "     ";

            if (size == item.size.length -1)
                i.checked = true;

            form.append(i, lab);
        }
    }

    //show pizza toppings
    if (item.name === "Pizza"){
        let value = 1;
        item.toppings.forEach(topping => {
            let i = document.createElement("input");
            let lab = document.createElement("label");        
            lab.for = "top"+value;
            i.id = "top"+value;
            i.type = "checkbox";
            i.name = "toppings";
            i.value = value;
            lab.textContent = topping;
            
            form.append(i, lab);
            toppingList.push(i);
            value*= 2;
        });
    }


    let button = document.createElement("button");
    button.type = "submit"
    button.id = item.id;
    button.textContent = "Add";

    form.addEventListener("submit", (e) =>{
        e.preventDefault();
        
        addToOrder(item, e);
    });

    form.appendChild(button);

    h2.append(h3,h4);
    it.append(img,h2,form);
    document.getElementById("menu-list").appendChild(it);

}


document.addEventListener("DOMContentLoaded", () => {
    fetch("http://localhost:3000/menu").then(response => response.json())
    .then(items => items.forEach(item=> addMenuItem(item)));

})

const form = document.querySelector("form.check-out");
form.addEventListener("submit", (e)=> {
    e.preventDefault();
//check if there is an order or a name
    if (orderList.length > 0 && e.target.customer.value != "")
        placeOrder(e);
})

function placeOrder(e){
    //post receipt to db
    //message to customer

    alert(`Thank you, ${e.target.customer.value}! We'll get started on your order right away!`)


    //clear the order
    for (let i = orderList.length - 1; i >= 0; --i)
        deleteItem(orderList[i].node,0);

    e.target.customer.value = "";
    totalCost = 0;
    document.getElementById("total-cost").innerText = "$"+totalCost.toFixed(2);
}