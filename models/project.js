const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    issue: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:'Issues'
        }
    ]
}, {
    timestamps: true
});

const Project = mongoose.model("Project", projectSchema);
module.exports = Project;