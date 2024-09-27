const adminMiddleware = (req, res, next) => {
    const apiKey = req.headers['x-api-key'];
    console.log(apiKey);
    if (!apiKey || apiKey !== process.env.ADMIN_API_KEY) {
      console.log("AdminMidleware")
      return res.status(403).json({ error: 'Forbidden' });
    }
  
    next();
  };
  
  export { adminMiddleware };
  