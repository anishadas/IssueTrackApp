const Project = require('../models/project');
const Issues = require('../models/issue');
module.exports.create = async (req, res) => {
    try {
        const project = await Project.create({
            name: req.body.projectName,
            author: req.body.author,
            description: req.body.description,
        });
        console.log(req.xhr)
        if (req.xhr) {
            return res.status(200).json({
                data: {
                    project: project
                },
                msg: 'New Project created!'
            });
        }

    } catch (err) {
        return res.json({
            msg: "Error in creating Project"
        });
    }
}


module.exports.openProject = async (req, res) => {
    // console.log("local");
    const project = await Project.findById(req.params.id);

    const issues = await Issues.find({project:req.params.id})

    if (project) {
        return res.render('singleProject', {
            title: "single project",
            project: project,
            issues: issues,
        });
    }
}

module.exports.delete = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        await Issues.deleteMany({ project: project._id });
        await project.deleteOne(project);
    
        if (req.xhr) {
            console.log("del",req.params.id)
            return res.status(200).json({
                data: {
                    project_id: req.params.id
                },
                msg: "Project and its Issues are deleted successfully"
            })
        }

    } catch (err) {
        return res.json({
            msg: "Error in deleting the project"
        });
    }
}