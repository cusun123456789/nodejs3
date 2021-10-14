const express = require('express');
const sinhvienController = require('../../controllers/sinhvien.controller');

const router = express.Router();

router
  .route('/')
  .post( sinhvienController.createSinhvien)
  .get( sinhvienController.getSinhviens);

router
  .route('/:sinhvienId')
  .get(sinhvienController.getSinhvien)
  .patch(sinhvienController.updateSinhvien)
  .delete(sinhvienController.deleteSinhvien);

module.exports = router;

