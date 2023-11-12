const validateRegistration = (req, res, next) => {
    const { name, email, password } = req.body;
    const errors = [];
  
    // Validate name
    if (!name || name.length < 5) {
      errors.push("Username must be at least 5 characters long");
    }
  
    // Validate email with a simple regex (for more robust validation, consider a package like validator)
    const emailRegex = /\S+@\S+\.\S+/;
    if (!email || !emailRegex.test(email)) {
      errors.push("Must be a valid email address");
    }
  
    // Validate password
    if (!password || password.length < 8) {
      errors.push("Password must be at least 8 characters long");
    }
  
    // If there are errors, send a 400 response with the errors, otherwise proceed to the next middleware
    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }
  
    next();
  };
  
  module.exports = validateRegistration;
  