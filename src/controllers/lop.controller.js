const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { lopService } = require('../services');

const createLop = catchAsync(async (req, res) => {
  const lop = await lopService.createLop(req.body);
  res.status(httpStatus.CREATED).send(lop);
});

const getLops = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'role']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await lopService.queryLops(filter, options);
  res.send(result);
});

const getLop = catchAsync(async (req, res) => {
  const lop = await lopService.getLopById(req.params.lopId);
  if (!lop) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Lop not found');
  }
  res.send(lop);
});

const updateLop = catchAsync(async (req, res) => {
  const lop = await lopService.updateLopById(req.params.lopId, req.body);
  res.send(lop);
});

const deleteLop = catchAsync(async (req, res) => {
  await lopService.deleteLopById(req.params.lopId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createLop,
  getLops,
  getLop,
  updateLop,
  deleteLop,
};
