const mongoose = require("mongoose");

var today = new Date();
var currentDate = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

const authorSchema = mongoose.Schema({
    name: {
        fname: {
            type: String,
            required: true
        },
        lname: {type: String}
    },

  dob: {type: Date,
    validate: {
        validator: function (dateValue) {
            return dateValue <= Date.now();
        },
        message: 'Date of Birth must not be in the future'
    }
},

  address: {
      state: {
          type: String,
          validate: {
            validator: function (stateValue) {
                return stateValue.length >= 2 && stateValue.length <= 3;
            },
            message: 'State should have a character length of 2 or 3'
        }},
    suburb: {type: String},
    street: {type: String},
    unit: {type: String}
},

numBooks: {
    type: Number,
    validate: {
        validator: function (bookValue) {
            return bookValue >= 1 && bookValue <= 150;
        },
        message: 'Number of books should be a number between 1 and 150'
    }
}
});

const AuthorModel = mongoose.model("Author", authorSchema);
module.exports = AuthorModel;