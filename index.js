const express = require("express");
const fs = require("fs");
const app = express();

app.use(express.json());

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/Dev-data/tour-simple.json`)
);
// console.log(tours);

//We are getting total number of tours details
app.get("/api/v1/tours", (req, res) => {
  res.status(200).json({
    status: "success",
    resultCount: tours.length,
    data: { tours },
  });
});

app.get("/api/v1/tours/:id", (req, res) => {
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
});

//creating tour apis
app.post("/api/v1/tours", (req, res) => {
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
});

//updating data
app.patch("/api/v1/tours/:id", (req, res) => {
  if (req.params.id * 1 >= tours.length) {
    res.status(404).json({ status: "fail", message: "Invalid ID" });
  } else {
    res.status(200).json({ status: "success", message: "Updated" });
  }
});

//deleting the data
app.delete("/api/v1/tours/:id", (req, res) => {
  if (req.params.id * 1 >= tours.length) {
    res.status(404).json({ status: "fail", message: "Invalid ID" });
  } else {
    res.status(200).json({ status: "Delete success", data: null });
  }
});

app.listen(3000, () => {
  console.log("Server Started");
});
