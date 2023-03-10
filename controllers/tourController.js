const fs = require("fs");

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../Dev-data/tour-simple.json`)
);
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
  if (req.params.id * 1 >= tours.length) {
    res.status(404).json({ status: "fail", message: "Invalid ID" });
  } else {
    res.status(200).json({ status: "success", message: "Updated" });
  }
};

exports.deletTourById = (req, res) => {
  if (req.params.id * 1 >= tours.length) {
    res.status(404).json({ status: "fail", message: "Invalid ID" });
  } else {
    res.status(200).json({ status: "Delete success", data: null });
  }
};
