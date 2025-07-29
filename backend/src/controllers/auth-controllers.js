
export const googleAuth = (req, res, next) => {
    // Handled by passport middleware
    next();
  };
  
  export const googleCallback = (req, res) => {
    res.redirect("http://localhost:5173/all-transactions"); // your frontend URL
  };
  
  export const getCurrentUser = (req, res) => {
    if (req.user) {
      res.json({
        _id: req.user._id,
        googleId: req.user.googleId,
        name: req.user.name,
        email: req.user.email,
        photo: req.user.photo,
      });
    } else {
      res.status(401).json({
        message: "User not authenticated",
      });
    }
  };
  
  export const logoutUser = (req, res) => {
    req.logout(() => {
      res.redirect("/");
    });
  };
  