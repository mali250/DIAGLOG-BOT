import express from "express";
import fetch from 'node-fetch';

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 5000;

app.post('/', async (req, res)  => {
    var orderid=req.body.queryResult.parameters.OrderId
    console.log(orderid)
    
    var response =
        {
            "fulfillmentMessages": [
              {
                "text": {}
              }
            ]
          }
          if (orderid =="") {
            response.fulfillmentMessages[0].text = {text:["CAN I GET YOUR ORDER ID"]};
          }
          else{
            

    const url = "https://orderstatusapi-dot-organization-project-311520.uc.r.appspot.com/api/getOrderStatus";
    const data = {
        "orderId": orderid
    };

    await fetch(url,{
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    }) 
      .then((response) => response.json())
      .then((data) => {
        
        var shipmentdate=data.shipmentDate
        console.log(shipmentdate)
        response.fulfillmentMessages[0].text = {text:[`Your Order ${orderid}  Will be ${shipmentdate}`]};
        

      })
        .catch(err => console.log(err));
        

          }
    
    res.json( response);
    
   
});


app.listen(PORT, () => {
    console.log("Server started at port 5000");
});