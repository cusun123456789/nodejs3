const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { sinhvienService } = require('../services');

const createSinhvien = catchAsync(async (req, res) => {
  const sinhvien = await sinhvienService.createSinhvien(req.body);
  res.status(httpStatus.CREATED).send(sinhvien);
});

const getSinhviens = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'role']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await sinhvienService.querySinhviens(filter, options);
  res.send(result);
});

const getSinhvien = catchAsync(async (req, res) => {
  const sinhvien = await sinhvienService.getSinhvienById(req.params.sinhvienId);
  if (!sinhvien) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Sinhvien not found');
  }
  res.send(sinhvien);
});

const updateSinhvien = catchAsync(async (req, res) => {
  const sinhvien = await sinhvienService.updateSinhvienById(req.params.sinhvienId, req.body);
  res.send(sinhvien);
});

const deleteSinhvien = catchAsync(async (req, res) => {
  await sinhvienService.deleteSinhvienById(req.params.sinhvienId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createSinhvien,
  getSinhviens,
  getSinhvien,
  updateSinhvien,
  deleteSinhvien,
};
