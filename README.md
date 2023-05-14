# phase-1-project

## Introduction
This is a simple menu kiosk project. In it, a customer sees a menu list for a pizza restaurant.
There are five items on the menu with some of them having different size options. The customer 
can add multiple items to their order and see their total cost calculated before checking out.


## Displaying the menu

At the start of the program, the database of items is read and the menu is constructed. Some of 
the items include size options which can be changed with radio buttons. The Pizza also includes 
options to add different toppings through check boxes. The topping list is also in the data base.
There is an 'ADD' button that takes a submit event so it can read the information from the radio 
and checkbox inputs.

## Adding an iem to your order

When you click the 'add' button on an item, the item is displayed as a list item on the check out 
screen. A button is also included next to the listed item to remove it from the order. The item 
details and the delete node are stored in an array to keep track of them and to handle item deletion.

## Deleting an item

Clicking the 'X' button on an item in the checkout list will remove the item. This removes the item 
from the order array and adjusts the total cost. 

## Checking out

After you've placed your order, there is an input box to enter the customer name. Clicking the 
submit button will send a thank you message to the customer and clear out the check out screen 
so the next order can be started.