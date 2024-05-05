const CustomerService = require("../services/customer-service");

module.exports = (app) => {
  const service = new CustomerService();
  app.post("/app-events", async (req, res, next) => {
    const { payload } = req.body;
    await service.SubscribeEvents(payload);
    return res.status(200).json(payload);
  });
};
