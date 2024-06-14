const sharedDataMiddleware = (req, res, next) => {
    if (!req.app.locals.sharedData) {
      req.app.locals.sharedData = {};
    }
    next();
};

export default sharedDataMiddleware;