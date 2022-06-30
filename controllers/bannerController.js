const Banner = require('../models/Banner');

const getBanner = async (req, res) => {
    const banner = await Banner.find();
    if (!banner) return res.status(204).json({ message: 'No banner found' });
    res.json(banner);
};

const addBanner = async (req, res) => {
    const newBanner = new Banner(req.body);
    try {
        const savedBanner = await newBanner.save();
        res.status(200).json(savedBanner);
    } catch (err) {
        res.status(500).json(err);
    }
};

module.exports = {
    getBanner,
    addBanner
};
