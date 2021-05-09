const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
    CategoryName: String,
    contents:[
        {
        type:mongoose.Schema.Types.ObjectId,
        ref: "Content",
        required:"Content is required"
        }
     ],
});

module.exports = mongoose.model("Category", categorySchema);