const express = require("express");
const fs = require("fs");
const app = express();

app.use(express.json());

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/Dev-data/tour-simple.json`)
);
// console.log(tours);

const getAllTours = (req, res) => {
  res.status(200).json({
    status: "success",
    resultCount: tours.length,
    data: { tours },
  });
};

const getToursById = (req, res) => {
  console.log(req.params);

  //converting to string nunmbers to Int(number)
  const id = req.params.id * 1;
  const tour = tours.find((element) => element.id === id);

  //if (id > tours.length) {
  if (!tour) {
    res.status(404).json({ status: "fail", message: "Invalid ID" });
  } else {
    res.status(200).json({
      status: "success",
      data: {
        tour,
      },
    });
  }
};

const CreateNewTour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/Dev-data/tour-simple.json`,
    JSON.stringify(tours),
    (val) => {
      res.status(201).json({
        status: "success",
        data: {
          tour: newTour,
        },
      });
    }
  );
};

const updateTour = (req, res) => {
  if (req.params.id * 1 >= tours.length) {
    res.status(404).json({ status: "fail", message: "Invalid ID" });
  } else {
    res.status(200).json({ status: "success", message: "Updated" });
  }
};

const deletTourById = (req, res) => {
  if (req.params.id * 1 >= tours.length) {
    res.status(404).json({ status: "fail", message: "Invalid ID" });
  } else {
    res.status(200).json({ status: "Delete success", data: null });
  }
};

//We are getting total number of tours details
app.get("/api/v1/tours", getAllTours);

//Getting tour by id
app.get("/api/v1/tours/:id", getToursById);

//creating tour apis
app.post("/api/v1/tours", CreateNewTour);

//updating data
app.patch("/api/v1/tours/:id", updateTour);

//deleting the data
app.delete("/api/v1/tours/:id", deletTourById);

app.listen(3000, () => {
  console.log("Server Started");
});
