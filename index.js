const express = require("express");
const fs = require("fs");
const morgan = require("morgan");
const app = express();

// 1) MIDDLEWARES
//We are using express.json() method to parse incoming request with JSON Payload.
app.use(express.json());

//Here we are creating our own middleware
app.use((req, res, next) => {
  console.log("Hello From Middleware");
  next();
});

//Here we are creating middleware to get the time when request is initiated.
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

//This is third party miidleware to log.
app.use(morgan("dev"));

// 2) ROUTE HANDLER
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/Dev-data/tour-simple.json`)
);
// console.log(tours);

const getAllTours = (req, res) => {
  res.status(200).json({
    status: "success",
    requestedAt: req.requestTime,
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

const getAllUsers = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "Route is not defined yet",
  });
};
const CreateUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "Route is not defined yet",
  });
};
const getUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "Route is not defined yet",
  });
};
const updateUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "Route is not defined yet",
  });
};
const deleteUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "Route is not defined yet",
  });
};

// 3) ROUTES

//Tour Routes
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

//User Routes
app.get("/api/v1/users", getAllUsers);
app.post("/api/v1/users", CreateUser);

app.get("/api/v1/users/:id", getUser);
app.patch("/api/v1/users/:id", updateUser);
app.delete("/api/v1/users/:id", deleteUser);

// 4) SERVER
app.listen(3000, () => {
  console.log("Server Started");
});
