const { response } = require('express');
const express= require('express');
const  mysql2= require('mysql2');
const PORT=process.env.PORT || 3000
const app=express()
app.use(express.json())
const  connection=mysql2.createConnection({

    host: 'mysql-71954-0.cloudclusters.net',
    port:"19882 ",
    user:'surya',
    password:'Sr6304403720@',
    database:'surya'
});

connection.connect((err)=>{
    if (err){
        console.log("bad connection",err)
    }
    else{
        console.log("database connected")
    }

})

const initialiseServer=()=>{
    try{
        app.listen(PORT,()=>{
            console.log("server started")
        })
    }
    catch{
        console.log("Server initiation Failed")
    }
}

app.get("/",async(req,res)=>{
    const getShopsQueries="SELECT * FROM shop_details"
    const result=await connection.promise().query(getShopsQueries)
    try {
        response.status(200).send(result)
    }
    catch(err){
        console.log(err,"server error")
    }
    
})
app.post("/addShop",async(req,res)=>{
    const {name,address,contact_number,email_id}=req.body
    const lengthQuery="SELECT * FROM shop_details"
    const result1=await connection.promise().query(lengthQuery)
    const checkBuyerQuery=`SELECT * FROM shop_details WHERE name='${name}'`
    const result2=await connection.promise().query(checkBuyerQuery)
    if (result2){
        res.status(200).send("Shop Already Exists")
    }
    const count=result1.length+1
    const queries=`INSERT INTO shop_details (shop_id,shop_name,shop_address,shop_contact_number,email_id)  VALUES (${count},'${name}','${address}',${contact_number},'${email_id}')`
    const result3=await connection.promise().query(queries)
    try{
        
        res.status(200).send("Successfully added")
    }
    catch(err){
        response.status(400).send("error",err)
    }
})
app.post("/addItems",async(req,res)=>{
    const {buyer_name,buyer_contact_number,date_time_of_transaction,items}=req.body
    
    for (let x of items){
        const {item_name,quantity,price,discount,gst,item_total_amt}=x
        const lengthQuery="select buyer_name from items"
        const result=await connection.promise().query(lengthQuery)
        const buyer_id=result.length+1
        const addItemsQueries=`INSERT INTO items (buyer_id,buyer_name,buyer_contact_number,date_time_of_transaction,item_name,quantity,price,discount,gst,item_total_amt,status) VALUES (${buyer_id},'${buyer_name}',${buyer_contact_number},'${date_time_of_transaction}','${item_name}',${quantity},${price},${discount},${gst},${item_total_amt},"unpaid")`
        console.log(addItemsQueries)
        const result1=await connection.promise().query(addItemsQueries)
        try{
            res.status(200).send("Successfully added Items")
        }
        catch(err){
            res.status(400).send(err,"bad request")
        }
    }
})

app.put("/updateStatus",async(req,res)=>{
    const {buyer_name}=req.body
    const updateStatusQuery=`UPDATE items set status="paid" where buyer_name='${buyer_name}'`
    const result=await connection.promise().query(updateStatusQuery)
    try{
        res.status(200).send("Status updated Successfully")
    }
    catch(err){
        console.log(err,"bad request")
    }
})
initialiseServer()