const Project = require('../models/project');

module.exports.home = async (req, res) => {
    try {
        const projects = await Project.find({}).sort('-createdAt');
        return res.render('home', {
            title: "Home page",
            projects:projects,
        })
        
    } catch (err) {
        console.log("Error in rendering home page");
        return;
    }
}

