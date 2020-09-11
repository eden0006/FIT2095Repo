const mongoose = require("mongoose");

const bookSchema = mongoose.Schema({
  
    title: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Author"
    },
    isbn: {
        type: String,
        validate: {
            validator: function(isbnValue) {
            
              return isbnValue.length == 13;
            },
            message: "isbn must be exactly 13 characters long."
          }
    },
    dop: {type: Date,
        default: Date.now
    },
    summary: {type: String}
});

const BookModel = mongoose.model("Book", bookSchema);
module.exports = BookModel;