const Campground = require('../models/campground');


module.exports.index = async (req, res) => {
    const campgrounds = await Campground.find({});
    res.render('campgrounds/index', { campgrounds })
};

module.exports.newCampForm = (req, res) => {
    res.render('campgrounds/new');
};

module.exports.createCamp = async (req, res, next) => {
    const campground = new Campground(req.body.campground);
    campground.images = req.files.map( f => ({url: f.path, filename: f.filename}))
    campground.author = req.user.id;
    await campground.save();
    console.log(campground)
    req.flash('success', 'Successfully made a new Campground');
    res.redirect(`/campgrounds/${campground._id}`);
};

module.exports.showCamp = async (req, res) => {
    const campground = await Campground.findById(req.params.id).populate({
        path: 'reviews',
        populate: {
            path: 'author'
        }
    }).populate('author');
    if (!campground) {
        req.flash('error', 'Campground Lost');
        return res.redirect('/campgrounds');
    }
    res.render('campgrounds/show', { campground });
};

module.exports.editCampForm = async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findById(id);
    if (!campground) {
        req.flash('error', 'Campground Lost');
        return res.redirect('/campgrounds');
    }
    res.render('campgrounds/edit', { campground });
};

module.exports.updateCamp = async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findByIdAndUpdate(id, { ...req.body.campground });
    req.flash('success', 'Successfully updated campground');
    res.redirect(`/campgrounds/${campground._id}`);
};

module.exports.deleteCamp = async (req, res) => {
    const { id } = req.params;
    await Campground.findByIdAndDelete(id);
    req.flash('success', 'Deleted Campground Successfully');
    res.redirect('/campgrounds');
}