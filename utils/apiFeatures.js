class APIFeature {
  constructor(query, queryString) {
    (this.query = query), (this.queryString = queryString);
  }
  filter() {
    const queryObj = { ...this.queryString };
    const excludedFields = ["page", "sort", "limit", "fields"];
    excludedFields.forEach((el) => delete queryObj[el]);

    //1B)Advance filtering for less than and greter than
    let querystr = JSON.stringify(queryObj);
    querystr = querystr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    // console.log(JSON.parse(querystr));

    this.query = this.query.find(JSON.parse(querystr));
    // let query = Tour.find(JSON.parse(querystr));

    return this;
  }
  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(",").join(" ");
      this.query = this.query.sort(sortBy);
    } else {
      // default mode
      this.query = this.query.sort("-cratedAt");
    }
    return this;
  }
  limitFields() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(",").join(" ");
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select("-__v"); //This will remove (__v) field only and show other field
    }
    return this;
  }
  paginate() {
    const page = this.queryString.page * 1 || 1; //here we are converting values to number
    const limit = this.queryString.limit * 1 || 1000;
    const skip = (page - 1) * limit;

    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}

module.exports = APIFeature;
