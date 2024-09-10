const express = require("express");
const csv = require("csvtojson");
const mongoose = require("mongoose");
const Car = require("./Car")

const createCar = async () => {
  try {
    let newData = await csv().fromFile("../data.csv");
    newData = newData.map((car) => ({
      make: car.Make,
      model: car.Model,
      transmission_type: car["Transmission Type"],
      size: car["Vehicle Size"],
      style: car["Vehicle Style"],
      release_date: car.Year,
      price: car.MSRP,
    }));
    await Car.insertMany(newData);
    console.log("Data inserted successfully!");
  } catch (error) {
    console.error("Error inserting data:", error);
  }
};

createCar();
