module.exports = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
};

// Starting with Express 5.0 this won't be necessary
// Express will be able to handle async fn error by version 5