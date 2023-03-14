const Tour = require("../Model/tourModel");

exports.aliasTopTours = async (req, res, next) => {
  (req.query.limit = "5"),
    (req.query.sort = "-ratingAverage,price"),
    (req.query.fields = "name,price,ratingAverage,summary,difficulty");
  next();
};

exports.getAllTours = async (req, res) => {
  try {
    //Build query
    // 1A) Filtering
    const queryObj = { ...req.query };
    const excludedFields = ["page", "sort", "limit", "fields"];
    excludedFields.forEach((el) => delete queryObj[el]);

    //1B)Advance filtering for less than and greter than
    let querystr = JSON.stringify(queryObj);
    querystr = querystr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    // console.log(JSON.parse(querystr));
    let query = Tour.find(JSON.parse(querystr));

    // 2)Sorting
    //remaining to do from 97. at 6 min
    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      query = query.sort(sortBy);
    } else {
      // default mode
      query = query.sort("-cratedAt");
    }

    // 3)Field limiting  //by this user will select which field want to show in response
    if (req.query.fields) {
      const fields = req.query.fields.split(",").join(" ");
      query = query.select(fields);
    } else {
      query = query.select("-__v"); //This will remove (__v) field only and show other field
    }

    //Pagination
    const page = req.query.page * 1 || 1; //here we are converting values to number
    const limit = req.query.limit * 1 || 1000;
    const skip = (page - 1) * limit;

    query = query.skip(skip).limit(limit);
    if (req.query.page) {
      const numTours = await Tour.countDocuments();
      if (skip > numTours) throw new Error("This page not exist");
    }

    //Execute query
    const tours = await query;
    res.status(200).json({
      status: "success",
      requestedAt: req.requestTime,
      resultCount: tours.length,
      data: { tours },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

exports.getToursById = async (req, res) => {
  console.log(req.params);

  try {
    const tour = await Tour.findById(req.params.id);
    res.status(200).json({
      status: "success",
      requestedAt: req.requestTime,
      data: { tour },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

exports.CreateNewTour = async (req, res) => {
  try {
    const newTour = await Tour.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        tour: newTour,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      // message: "Invalid data sent",
      message: err,
    });
  }
};

exports.updateTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(201).json({
      status: "success",
      data: {
        tour: tour,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: "Invalid data sent",
    });
  }
};

exports.deletTourById = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndDelete(req.params.id);
    res.status(201).json({
      status: "success",
      data: {
        tour: tour,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: "Invalid data sent",
    });
  }
};
