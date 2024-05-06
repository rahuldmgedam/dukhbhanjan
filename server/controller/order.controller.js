var nodemailer = require("nodemailer");
const { OrderModel } = require("../model/order.model");
const { UserModel } = require("../model/user.model");

const handleCreateOrder = async (req, res) => {
  // logic goes here
  const data = req.body;
  const newData = data.map((item) => {
    delete item._id;
    item.orderDateTime = Date.now();
    return item;
  });
  try {
    const orders = await OrderModel.insertMany(newData);
    res
      .status(200)
      .json({ msg: "Order is added in my order success", state: true });
  } catch (error) {
    console.log(error.message);
    res
      .status(500)
      .json({
        msg: "Something Went Wrong",
        error: error.message,
        state: false,
      });
  }
};
const handleGetOrder = async (req, res) => {
  let UserId = req.body.UserId;
  try {
    const order = await OrderModel.find({ UserId: UserId });
    if (order.length > 0) {
      res.status(200).json({ msg: "order data", order: order, state: true });
    } else {
      res.status(200).json({ msg: "No Order Present", state: false });
    }
  } catch (error) {
    console.log(error.message);
    res.status(400).send({ msg: error.message });
  }
};

const handleGetAllOrders = async (req, res) => {
  try {
    const Orders = await OrderModel.find();
    res.status(200).send(Orders);
  } catch (error) {
    res.status(500).json({ msg: "Something Went Wrong", error: error.message });
  }
};
const handleCancelOrder = async (req, res) => {
  //  console.log("call");
  const userIdinUserDoc = req.body.UserId;
  const { id } = req.params;
  req.body.cancel = "canceled";
  req.body.cancelDate = new Date(); // Set the cancel date to the current date

  // console.log(req.body);
  // console.log(id)
  try {
    const order = await OrderModel.findOne({ _id: id });
    //  console.log(order);
    const userIDinOrderDoc = order.UserId;

    if (userIdinUserDoc === userIDinOrderDoc) {
      await OrderModel.findByIdAndUpdate({ _id: id }, req.body);
      res.status(200).json({
        msg: `Your Order Cancelled Successfully`,
        state: true,
      });
    } else {
      res.status(201).json({
        msg: "You are not Authorized to cancel this order",
        state: false,
      });
    }
  } catch (error) {
    console.log(error.message);
    res.status(400).json({
      msg: "Something went wrong while updating the order",
      state: false,
    });
  }
};

// need to update code here
const handleUpdateOrderStatus = async(req, res) => {
  const { OrderId } = req.params;
 
  const order = await OrderModel.findOne({ _id:OrderId})
  const {UserId} = order
  const arrayObj = [order]
  const user = await UserModel.findOne({ _id:UserId})
 
  

  try {
  
// maile all code start
if(req.body.status === "dispatch"){
  let pushDataDispatch = req.body;
  pushDataDispatch.dispatchDate = new Date();
  await OrderModel.findByIdAndUpdate({ _id: OrderId }, pushDataDispatch)
  let cartItemsTable = "<table style='width: 100%;'>";
  cartItemsTable += `
      <tr>
          <th>image</th>
          <th>Product</th>
          <th>Quality</th>
          <th>Quantity</th>
          <th>Price</th>
      </tr>
  `;
 
  arrayObj.forEach((item) => {
      if(item.quality){
          cartItemsTable += `
              <tr>
                  <td style="text-align:center;"> <img src="${item.image}" alt="${item.title}" style="width: 50px; height: 50px;"/></td>
                  <td style="text-align:center;">${item.title}</td>
                  <td style="text-align:center;">${item.quality}</td>
                  <td style="text-align:center;">${ item.quantity}</td>
                  <td style="text-align:center;">${item.price} INR</td>
              </tr>
          `;
      }else{
          cartItemsTable += `
              <tr>
                  <td style="text-align:center;"> <img src="${item.image}" alt="${item.title}" style="width: 50px; height: 50px;"/></td>
                  <td style="text-align:center;">${item.title}</td>
                  <td style="text-align:center;">NA</td>
                  <td style="text-align:center;">${ item.quantity}</td>
                  <td style="text-align:center;">${item.price} INR</td>
              </tr>
          `;
      }
  });
 
  cartItemsTable += "</table>";

  var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
          user: 'dhukhbhanjan2023@gmail.com',
          pass: 'lrmocpbvmbkjvspa'
      }
  });

  let mailOptions = {
      from: 'dhukhbhanjan2023@gmail.com',
      to: user.email,
      subject: `Order Dispatch from Dhukh Bhanjan`,
      html: `
          <div style="width: 100%;">
              <div>
                  <p style="text-align:right;">Date: ${new Date().toLocaleDateString()}</p>
              </div>

              <div style="text-align: center; width: 95%; padding: 10px; background-color:#001a36;">
                  <h1 style="color: white;">YOUR ORDER HAS SHIPPED</h1>
              </div>

              <p style="text-align: center;">Hello, Mr ${user.firstName} ${user.lastName}, we are glad to inform you that your order has been shipped and will reach you shortly.</p>

              <div style="text-align:center; width:100%;">
                  <h3 style="text-align:left;">Product Dispatch:</h3>
                  <hr/>
                  ${cartItemsTable}
                  <hr/>
                  <table border="1" style="width:100%">
                      <tr>
                          <td>Tracking No</td>
                          <td>45465574</td>
                      </tr>
                      <tr>
                          <td>Shipping Agency</td>
                          <td>DTDC COUIER</td>
                      </tr>
                      <tr>
                          <td>Date of Shipping</td>
                          <td>${new Date().toLocaleDateString()}</td>
                      </tr>
                  </table>
              </div>

              <div style="text-align:left;">
                  <p style="color: red;">For any further queries and assistance, please reach us </p>
                  <div> 
                      <p style="color: red;">Email Id: support@dhukhbhanjan.com</p>
                      <span style="color: red;">Contact details:-</span>
                      <span>+91 7276301985 , +91 7276901955</span>
                      <span style="text-decoration: underline; color: red;">(Timing 10 am to 7 pm)</span>
                  </div>
                  <div style="text-align:center; width:100%;">
                      <h3 style="color: blue;">Copyright & Disclaimer | Privacy Policy </h3>
                      <span>Please do not reply to this mail as this is an automated mail service</span>
                  </div>
              </div>
          </div>
      `
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
        console.log(error);
    } else {
        console.log('Email sent: ' + info.response);
    }
});
}else{
  let pushDataDelivered = req.body;
  pushDataDelivered.deliveredDate = new Date();
  await OrderModel.findByIdAndUpdate({ _id: OrderId }, pushDataDelivered)
  let cartItemsTable = "<table style='width: 100%;'>";
  cartItemsTable += `
      <tr>
          <th>image</th>
          <th>Product</th>
          <th>Quality</th>
          <th>Quantity</th>
          <th>Price</th>
      </tr>
  `;
 
  arrayObj.forEach((item) => {
      if(item.quality){
          cartItemsTable += `
              <tr>
                  <td style="text-align:center;"> <img src="${item.image}" alt="${item.title}" style="width: 50px; height: 50px;"/></td>
                  <td style="text-align:center;">${item.title}</td>
                  <td style="text-align:center;">${item.quality}</td>
                  <td style="text-align:center;">${ item.quantity}</td>
                  <td style="text-align:center;">${item.price} INR</td>
              </tr>
          `;
      }else{
          cartItemsTable += `
              <tr>
                  <td style="text-align:center;"> <img src="${item.image}" alt="${item.title}" style="width: 50px; height: 50px;"/></td>
                  <td style="text-align:center;">${item.title}</td>
                  <td style="text-align:center;">NA</td>
                  <td style="text-align:center;">${ item.quantity}</td>
                  <td style="text-align:center;">${item.price} INR</td>
              </tr>
          `;
      }
  });
 
  cartItemsTable += "</table>";

  var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
          user: 'dhukhbhanjan2023@gmail.com',
          pass: 'lrmocpbvmbkjvspa'
      }
  });

  let mailOptions = {
      from: 'dhukhbhanjan2023@gmail.com',
      to: user.email,
      subject: `Order Delivered from Dhukh Bhanjan`,
      html: `
          <div style="width: 100%;">
              <div>
                  <p style="text-align:right;">Date: ${new Date().toLocaleDateString()}</p>
              </div>

              <div style="text-align: center; width: 95%; padding: 10px; background-color:#001a36;">
                  <h1 style="color: white;">YOUR ORDER HAS DELIVERED </h1>
              </div>

              <p style="text-align: center;">Hello, Mr ${user.firstName} ${user.lastName}, we are glad to inform you that your order has been delivered Successfully</p>

              <div style="text-align:center; width:100%;">
                  <h3 style="text-align:left;">Product Delivered:</h3>
                  <hr/>
                  ${cartItemsTable}
                  <hr/>
                
              </div>

              <div style="text-align:left;">
                  <p style="color: red;">For any further queries and assistance, please reach us </p>
                  <div> 
                      <p style="color: red;">Email Id: support@dhukhbhanjan.com</p>
                      <span style="color: red;">Contact details:-</span>
                      <span>+91 7276301985 , +91 7276901955</span>
                      <span style="text-decoration: underline; color: red;">(Timing 10 am to 7 pm)</span>
                  </div>
                  <div style="text-align:center; width:100%;">
                      <h3 style="color: blue;">Copyright & Disclaimer | Privacy Policy </h3>
                      <span>Please do not reply to this mail as this is an automated mail service</span>
                  </div>
              </div>
          </div>
      `
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
        console.log(error);
    } else {
        console.log('Email sent: ' + info.response);
    }
});
} 
// maile all code end  

      res.status(200).json({msg:"Order Status Updated Successfully", state:true})
  } catch (error) {
      console.log(error);
      res.status(400).json({msg:"something wrong while update order", state:false})
  }
};


module.exports = {
  handleCreateOrder,
  handleGetOrder,
  handleGetAllOrders,
  handleCancelOrder,
  handleUpdateOrderStatus,
};
