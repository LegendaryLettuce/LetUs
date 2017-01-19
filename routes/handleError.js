module.exports = (next) => {
  const err = new Error('Internal Server Error');
  err.status = 500;
  next(err);
};
