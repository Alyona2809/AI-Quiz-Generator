const removeHttpHeader = (headerName) => {
  return (req, res, next) => {
    res.removeHeader(headerName);
    next();
  };
};

module.exports = removeHttpHeader;
