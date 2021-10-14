const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const { toJSON, paginate } = require('./plugins');
const { roles } = require('../config/roles');

const sinhvienSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    }, 
    address: {
      type: String,
      required: true,
      trim: true,
    },
    class: {
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
sinhvienSchema.plugin(toJSON);
sinhvienSchema.plugin(paginate);


/**
 * @typedef Sinhvien
 */
const Sinhvien = mongoose.model('Sinhvien', sinhvienSchema);

module.exports = Sinhvien;
