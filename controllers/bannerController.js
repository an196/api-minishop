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

const updateBanner = async (req, res) => {
    console.log(req.body)
    if (!req?.body?._id) {
        return res.status(400).json({ message: 'ID parameter is required.' });
    }

    const banner = await Banner.findOne({ _id: req.body._id }).exec();
    if (!banner) {
        return res.status(204).json({ message: `No banner matches ID ${req.body._id}.` });
    }

    try {
        banner._id = req?.body?._id;
        banner.image = req?.body?.image;
        banner.buttonText = req?.body?.buttonText;
        banner.desc = req?.body?.desc;
        banner.smallText = req?.body?.smallText;
        banner.middleText = req?.body?.middleText;
        banner.largeText1 = req?.body?.largeText1;
        banner.largeText2 = req?.body?.largeText2;
        banner.discount = req?.body?.discount;
        banner.saleTime = req?.body?.saleTime;

        const result = await banner.save();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json(error);
    }
};

module.exports = {
    getBanner,
    addBanner,
    updateBanner,
};
