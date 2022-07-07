const Order = require('../models/Order');

const getOrders = async (req, res) => {
    const orders = await Order.find();
    if (!orders) return res.status(204).json({ message: 'No orders found' });
    res.json(orders);
};

const addOrder = async (req, res) => {
    const newOrder = new Order(req.body);
    try {
        const savedOrder = await newOrder.save();
        res.status(200).json(savedOrder);
    } catch (err) {
        res.status(500).json(err);
    }
};

const deleteOrder = async (req, res) => {
   
    if (!req?.body?.id) return res.status(400).json({ 'message': 'Order ID required.' });

    const order = await Order.findOne({ _id: req.body.id }).exec();
    if (!order) {
        return res.status(204).json({ "message": `No order matches ID ${req.body.id}.` });
    }
    const result = await order.deleteOne(); //{ _id: req.body.id }
    res.status(200).json(result);
    console.log('delete successfully')
}

const updateOrder = async (req, res) => {
    
    if (!req?.params?.id) {
       
        return res.status(400).json({ 'message': 'ID parameter is required.' });
    }
   
    const order = await Order.findOne({ _id: req.params.id }).exec();
    if (!order) {
        return res.status(204).json({ "message": `No order matches ID ${req.params.id}.` });
    }

   
    try {
        order.status = req.body.status;
        order.deliveryAddress = req.body.deliveryAddress;
        const result = await order.save();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json(error);
    }
}

module.exports = {
    getOrders,
    addOrder,
    deleteOrder,
    updateOrder
};
