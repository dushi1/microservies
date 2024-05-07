const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const amqplib = require("amqplib");
// const axios = require("axios");

const {
  APP_SECRET,
  CLOUDAMQP_URL,
  CUSTOMER_BINDING_KEY,
  SHOPPING_BINDING_KEY,
  EXCHANGE_NAME,
} = require("../config");

//Utility functions
module.exports.GenerateSalt = async () => {
  return await bcrypt.genSalt();
};

module.exports.GeneratePassword = async (password, salt) => {
  return await bcrypt.hash(password, salt);
};

module.exports.ValidatePassword = async (
  enteredPassword,
  savedPassword,
  salt
) => {
  return (await this.GeneratePassword(enteredPassword, salt)) === savedPassword;
};

module.exports.GenerateSignature = async (payload) => {
  try {
    return await jwt.sign(payload, APP_SECRET, { expiresIn: "30d" });
  } catch (error) {
    console.log(error);
    return error;
  }
};

module.exports.ValidateSignature = async (req) => {
  try {
    const signature = req.get("Authorization");
    console.log(signature);
    const payload = await jwt.verify(signature.split(" ")[1], APP_SECRET);
    req.user = payload;
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

module.exports.FormateData = (data) => {
  if (data) {
    return { data };
  } else {
    throw new Error("Data Not found!");
  }
};

// module.exports.publishCustomerEvents = async (payload) => {
//   axios.post("http://localhost:8000/customer/app-events", { payload });
// };

// module.exports.publishShoppingEvents = (payload) => {
//   axios.post("http://localhost:8000/shopping/app-events", { payload });
// };

//message broker

//create channel
module.exports.CreateChannel = async () => {
  try {
    const connection = await amqplib.connect(CLOUDAMQP_URL);
    const channel = await connection.createChannel();
    await channel.assertQueue(EXCHANGE_NAME, "direct", { durable: true });
    return channel;
  } catch (err) {
    console.log("RabbitMQ connection error:", err);
    throw err;
  }
};
//publish msg
module.exports.PublishMessage = (channel, service, msg) => {
  channel.publish(EXCHANGE_NAME, service, Buffer.from(msg));
  console.log("Sent: ", msg);
};
//subscribe msg
module.exports.SubscribeMessage = async (channel, service) => {};
