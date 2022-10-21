const Banner = require('../models/Banner');

const getBanner = async (req, res) => {
    const banner = await Banner.find();
    if (!banner) return res.status(204).json({ message: 'No banner found' });
    res.status(200).json(banner);
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
        if(req?.body?._id) banner._id = req?.body?._id;
        if(req?.body?.image) banner.image = req?.body?.image;
        if(req?.body?.buttonText) banner.buttonText = req?.body?.buttonText;
        if(req?.body?.desc) banner.desc = req?.body?.desc;
        if(req?.body?.smallText) banner.smallText = req?.body?.smallText;
        if(req?.body?.middleText) banner.middleText = req?.body?.middleText;
        if(req?.body?.largeText1) banner.largeText1 = req?.body?.largeText1;
        if(req?.body?.largeText2) banner.largeText2 = req?.body?.largeText2;
        if(req?.body?.discount) banner.discount = req?.body?.discount;
        if(req?.body?.saleTime) banner.saleTime = req?.body?.saleTime;
        if(req?.body?.item) banner.item = req?.body?.item;

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
