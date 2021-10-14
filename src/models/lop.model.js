const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const { toJSON, paginate } = require('./plugins');
const { roles } = require('../config/roles');

const loprSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    numberStudent: {
      type: String,
      required: true,
      trim: true,
    },
    
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
loprSchema.plugin(toJSON);
loprSchema.plugin(paginate);



/**
 * @typedef Lop
 */
const Lop = mongoose.model('Lop', loprSchema);

module.exports = Lop;
