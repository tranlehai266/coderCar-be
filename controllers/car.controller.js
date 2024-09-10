const mongoose = require("mongoose");
const Car = require("../models/Car");
const { sendResponse, AppError } = require("../helpers/utils.js");

const carController = {};

carController.createCar = async (req, res, next) => {
  try {
    const info = req.body;
    if (!info) throw new AppError(400, "Bad Request", "Created Car Error");

    const created = await Car.create(info);
    sendResponse(res, 200, true, { data: created }, null, "Create Car Success");
  } catch (err) {
    next(err);
  }
};

carController.getCars = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const skip = (page - 1) * limit;

    const totalCars = await Car.countDocuments();
    const cars = await Car.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
    sendResponse(
      res,
      200,
      true,
      { cars, total: totalCars },
      null,
      "Get Cars Success"
    );
  } catch (err) {
    next(err);
  }
};

carController.editCar = async (req, res, next) => {
  try {
    const targetId = req.params.id;
    const updateInfo = req.body;
    const updated = await Car.findByIdAndUpdate(targetId, updateInfo, {
      new: true,
    });
    sendResponse(res, 200, true, { data: updated }, null, "Update successful");
  } catch (err) {
    next(err);
  }
};

carController.deleteCar = async (req, res, next) => {
  try {
    const targetId = req.params.id
    const deleted = await Car.findByIdAndDelete(targetId, { new : true})
    sendResponse(res,200,true , { data : deleted} , null , "Delete Success")
  } catch (err) {
    next(err)
  }
};

module.exports = carController;
