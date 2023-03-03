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
    data: tours,
  });
});

app.get("/api/v1/tours/:id", (req, res) => {
  console.log(req.params);

  //converting to string nunmbers to Int(number)
  const id = req.params.id * 1;
  const tour = tours.find((element) => element.id === id);

  //   if we use curly brackets then we have to write return keyword
  //   const tour = tours.find((element) => {
  //     return element.id === id;
  //   });

  res.status(200).json({
    status: "success",
    data: {
      tour,
    },
  });
});

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

app.listen(3000, () => {
  console.log("Server Started");
});
