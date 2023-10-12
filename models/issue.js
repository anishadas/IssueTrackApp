const mongoose = require('mongoose');

const issueSchema = new mongoose.Schema({
    title: {
        type: String,
        required:true,
    },
    author: {
        type: String,
        required:true,
    },
    issueDescription: {
        type: String,
        require: true,
    },
    labels: [
        {
            type: String,
        }
    ],
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Project'
    }
}, {
    timestamps: true
});

const Issues = mongoose.model("Issues", issueSchema);

module.exports = Issues;