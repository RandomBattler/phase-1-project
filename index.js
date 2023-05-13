//TO DO
            //change click to a form submit for adding order
//fix order list to take more than just the name
            //set radio buttons for sizes
//check boxes for pizza toppings
//edit order
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

//    orderList.push(item.name);
    const orderLi = document.createElement("li");
    orderLi.textContent = (item.size.length === 1)? item.name + ".......$" + item.cost[size]: item.name +" - " + item.size[size] + ".......$" + item.cost[size];
    if (item.name === "Pizza")//display toppings
    {
        let top = false;
        let topText = ""
        //check if any of the topping boxes have been checked
        for (let i = 0; i < toppingList.length; ++i){
            if(toppingList[i].checked){
                top = true;
                topText += "   ---   " + item.toppings[i];
                toppingList[i].checked = false;
            }
        }

        if (top)//there are toppings
        {
            const tList = document.createElement("dd");
            tList.textContent = topText;
            orderLi.appendChild(tList);
        }
    }

    const del = document.createElement("button");

    del.addEventListener("click", ()=>{
        deleteItem(del, item.cost[size]);
    });
    del.value = "  X  ";
    orderLi.appendChild(del);
    document.getElementById("order-list").appendChild(orderLi);
    //add customize and remove buttons
    
    totalCost += item.cost[size];


    document.getElementById("total-cost").innerText = "$"+totalCost.toFixed(2);
}

//remove the item and adjust the price
function deleteItem(del, cost){
    totalCost -= cost;
    document.getElementById("total-cost").innerText = "$"+totalCost.toFixed(2);
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
form.addEventListener("submit", (event)=> {
    event.preventDefault();
    const formData = Object.fromEntries(new FormData(event.target));
//check if there is an order or a name
    placeOrder(formData);
})

function placeOrder(form){
    //post receipt to db
    //message to customer
    //clear the order
}