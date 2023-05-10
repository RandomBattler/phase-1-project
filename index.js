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
function addToOrder(item, size){
    //push item to the list

//    orderList.push(item.name);
    //let h5 = document.createElement("h5");
    const orderLi = document.createElement("li");
    orderLi.textContent = (item.size.length === 1)? item.name + ".......$" + item.cost[size]: item.name +" - " + item.size[size] + ".......$" + item.cost[size];
    const del = document.createElement("button");

    del.addEventListener("click", ()=>{
        deleteItem(del, item.cost[size]);
    });
    del.value = "X";
    orderLi.appendChild(del);
    document.getElementById("order-list").appendChild(orderLi);
    //add customize and remove buttons
    
    totalCost += item.cost[size];


    document.getElementById("total-cost").innerText = "$"+totalCost.toFixed(2);
}
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

    let h2 = document.createElement("h3");
    h2.textContent = item.name;
    let h3 = document.createElement("dt");
    h3.textContent = item.description;
    let h4 = document.createElement("dd");
 //   h4.textContent = "$"+item.cost;

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


    let button = document.createElement("button");
    button.type = "submit"
    button.id = item.id;
    button.textContent = "Add";

    form.addEventListener("submit", (e) =>{
        e.preventDefault();
        const size = (item.size.length === 1)? 0 : e.target.size.value;
        addToOrder(item, size);
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