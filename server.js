const { response } = require('express');
const moment=require("moment")
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
        res.status(200).send(result[0])
    }
    catch(err){
        console.log(err,"server error")
    }
    
})
app.post("/addShop",async(req,res)=>{
 

    const {name,address,contact_number,email_id}=req.body
    const lengthQuery="SELECT * FROM shop_details"
    const result1=await connection.promise().query(lengthQuery)
    const checkBuyerQuery=`SELECT * FROM shop_details WHERE shop_name='${name}'`
    const result2=await connection.promise().query(checkBuyerQuery)
    if (result2[0].length!==0){
        res.status(200).send("Shop Already Exists")
        return 
    }
    const count=result1.length+1
    const queries=`INSERT INTO shop_details (shop_id,shop_name,shop_address,shop_contact_number,email_id)  VALUES (${count},'${name}','${address}',${contact_number},'${email_id}')`
    
    try{
        const result3=await connection.promise().query(queries) 
        res.status(200).send("Successfully added")
    }
    catch(err){
        response.status(400).send("error",err)
    }
})
app.post("/addItems",async(req,res)=>{
    let buyer_id=0
    let x=new Date()
    const {buyer_name,buyer_contact_number,items}=req.body
    const date_time_of_transaction=moment(x).format('YYYY-MM-DD HH:MM:SS')
const lengthQuery=`select buyer_id from items where buyer_name='${buyer_name}'`
    const result=await connection.promise().query(lengthQuery)
    if (result[0].length!=0){
        buyer_id=result[0][0].buyer_id
    }
    else{
        const getTotalBuyers=`select distinct buyer_id from items`
        const result=await connection.promise().query(getTotalBuyers)
        buyer_id=result[0].length+1
    }
    
    for (let x of items){
        const {item_name,quantity,price,discount,gst,item_total_amt}=x
       
        const addItemsQueries=`INSERT INTO items (buyer_id,buyer_name,buyer_contact_number,date_time_of_transaction,item_name,quantity,price,discount,gst,item_total_amt,status) VALUES (${buyer_id},'${buyer_name}',${buyer_contact_number},'${date_time_of_transaction}','${item_name}',${quantity},${price},${discount},${gst},${item_total_amt},"unpaid")`
        const result1=await connection.promise().query(addItemsQueries)     
    }
    try{
        res.status(200).send("Successfully added Items")
    }
    catch(err){
        console.log(err)
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
        res.status(400).send(`${err}`)
    }
})

app.get("/totalPendingTransactions",async(req,res)=>{
    const pendingPaymentsQuery=`SELECT  buyer_id,buyer_name,SUM(item_total_amt)  AS UnpaidAmount FROM items WHERE  status="unpaid"  GROUP BY buyer_id`
    
    try {
        const result=await connection.promise().query(pendingPaymentsQuery)
        res.status(200).send(result[0])
    }
    catch(err){
res.status(400).send(`${err} error occured`)
    }
})
initialiseServer()