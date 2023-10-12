const Issues = require('../models/issue');
const Project = require('../models/project');

module.exports.create = async (req, res) => {
    try {
        const project = await Project.findById(req.body.id);
        if (project) {
            const issues = await Issues.create({
                title: req.body.title,
                author: req.body.author,
                issueDescription: req.body.description,
                labels: req.body.issue,
                project: req.body.id
            })
            await issues.populate('project', { name: 1, author: 1 });
            if (issues) {
                project.issue.push(issues);
                project.save();
            }
            if (req.xhr) {
                return res.status(200).json({
                    data: {
                        issues: issues
                    },
                    msg: "Issues created successfully"
                })
            }
            return res.redirect('back');
        }
    } catch (err) {
        return res.json({
            msg: "Error in creating issue"
        });
    }
}

module.exports.delete = async (req, res) => {
    console.log("del", req.params.id)
    try {
        const issue = await Issues.findById(req.params.id);
        let projectId = issue.project;
        //The $pull operator removes from an existing array all instances of a value or values that match a specified condition.
        const update_project = await Project.findByIdAndUpdate(projectId, { $pull: { issue: req.params.id } });
        await issue.deleteOne(issue);
        if (update_project) {
            if (req.xhr) {
                return res.status(200).json({
                    data: {
                        issue_id: req.params.id
                    },
                    msg: "Issue deleted successfully"
                })
            }
        }
        return res.redirect('back');

    } catch (err) {
        return res.json({
            msg: "Error in deleting the issue"
        });
    }
}