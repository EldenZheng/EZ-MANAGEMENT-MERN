const mongoose = require('mongoose')

const ProjectSchema = new mongoose.Schema({
    projectName: String,
    employeeID: String,
    dueDate: Date,
    completionDate: Date,
    employeeRating: Number,
    projectStatus: Number
})

const ProjectModel = mongoose.model("project",ProjectSchema)
module.exports = ProjectModel