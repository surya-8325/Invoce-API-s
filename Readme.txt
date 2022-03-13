A store owner wants to shift from maintaining record of transactions on pen & paper to
cloud storage. I have created  the backend using Node.js & MySQL
database to allow his/her to store the transactions. 
Below are the following functionalities which the owner wants to be addressed by the API

1.To Accept and Store the Shop Details,use the API 
https://grocery-shop-details.herokuapp.com/addShop  and make a POST request for adding the details of a new Shop.
The format required for sending the details of shop through Post request is of the followiing
{
    "name":"", #name of the shop to be added
    "address":"",#address of the shop
    "contact_number":,#contact number of the shop consisting of 10 digit phone number
    "email_id":""# a valid email id

}
You will get a response message as "Successfully Added" if the request was made correct.Otherwise an error would be produced mentioning the error in your request.



2.To Accept and Store the Invoice Details,use the API 
https://grocery-shop-details.herokuapp.com/addItems  and make a POST request with the body 
The format required for sending the details of invoice details is as follows
{
    "buyer_name":" ", #name of the buyer
    "buyer_contact_number":,#contact number of the buyer
    "items":[], #An array of items where each element of array is an object of the format mentioned below,
    "total_amt":1200

}
Format of element in items array
{ 
    "item_name":"",
        "quantity":10, #quantity of the item taken
        "price":10,#price of the item
        "discount":12,#number in the range of 0 to 100
        "gst":,#number in the range of 0 to 100
        "item_total_amt":500 #total amount due to purchase of the item
}

All the above properties are required for a successful request to take place.

3.To update the invoice as paid/unpaid,use the API 
https://grocery-shop-details.herokuapp.com/updateStatus and make a PUT request
In the request body you have to send the buyer_name inorder to update the status of the invoice
{
    "buyer_name":" "#name of the buyer to update the status
}
For a successful put request a message "Successfully added Items" would be displayed.

4.To get the details of the  exisiting shops of the store owner,
use the API https://grocery-shop-details.herokuapp.com/ and make a GET request.

5.To get the unpaid amounts of each buyer use the API
https://grocery-shop-details.herokuapp.com/totalPendingTransactions and make a GET request

