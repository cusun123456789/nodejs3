const httpStatus = require('http-status');
const { Sinhvien } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a sinhvien
 * @param {Object} sinhvienBody
 * @returns {Promise<Sinhvien>}
 */
const createSinhvien = async (sinhvienBody) => {
  return Sinhvien.create(sinhvienBody);
};

/**
 * Query for sinhviens
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const querySinhviens = async (filter, options) => {
  const sinhviens = await Sinhvien.paginate(filter, options);
  return sinhviens;
};

/**
 * Get sinhvien by id
 * @param {ObjectId} id
 * @returns {Promise<Sinhvien>}
 */
const getSinhvienById = async (id) => {
  return Sinhvien.findById(id);
};

/**
 * Get sinhvien by email
 * @param {string} email
 * @returns {Promise<Sinhvien>}
 */
const getSinhvienByEmail = async (email) => {
  return Sinhvien.findOne({ email });
};

/**
 * Update sinhvien by id
 * @param {ObjectId} sinhvienId
 * @param {Object} updateBody
 * @returns {Promise<Sinhvien>}
 */
const updateSinhvienById = async (sinhvienId, updateBody) => {
  const sinhvien = await getSinhvienById(sinhvienId);
  if (!sinhvien) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Sinhvien not found');
  }
  if (updateBody.email && (await Sinhvien.isEmailTaken(updateBody.email, sinhvienId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  Object.assign(sinhvien, updateBody);
  await sinhvien.save();
  return sinhvien;
};

/**
 * Delete sinhvien by id
 * @param {ObjectId} sinhvienId
 * @returns {Promise<Sinhvien>}
 */
const deleteSinhvienById = async (sinhvienId) => {
  const sinhvien = await getSinhvienById(sinhvienId);
  if (!sinhvien) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Sinhvien not found');
  }
  await sinhvien.remove();
  return sinhvien;
};

module.exports = {
  createSinhvien,
  querySinhviens,
  getSinhvienById,
  getSinhvienByEmail,
  updateSinhvienById,
  deleteSinhvienById,
};
