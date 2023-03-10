const fs = require("fs");

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../Dev-data/tour-simple.json`)
);

//This is middleware that created to check whether requested tour id is valid or not..
exports.checkID = (req, res, next, val) => {
  console.log(`Tour id is ${val}`);
  if (req.params.id * 1 >= tours.length) {
    return res.status(404).json({ status: "fail", message: "Invalid ID" });
  }
  next();
};

exports.checkBody = (req, res, next) => {
  // console.log(`body is ${val}`);
  console.log(req.body.name, req.body.price);
  if (!req.body.name || !req.body.price) {
    return res
      .status(404)
      .json({ status: "fail", message: "Please enter correct name and price" });
  }
  next();
};

exports.getAllTours = (req, res) => {
  res.status(200).json({
    status: "success",
    requestedAt: req.requestTime,
    resultCount: tours.length,
    data: { tours },
  });
};

exports.getToursById = (req, res) => {
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

exports.CreateNewTour = (req, res) => {
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

exports.updateTour = (req, res) => {
  res.status(200).json({ status: "success", message: "Updated" });
};

exports.deletTourById = (req, res) => {
  res.status(200).json({ status: "Delete success", data: null });
};
