const rejectUnauthenticated = async (req, res, next) => {
  //console.log(req);
  if (req.isAuthenticated()) {
    // They were authenticated! User may do the next thing
    // Note! They may not be Authorized to do all things
    //console.log("success");
    next();
  } else {
    // failure best handled on the server. do redirect here.
    res.status(403).send("user not authenticated");
    //console.log("failure");
    return;
  }
};

module.exports = rejectUnauthenticated;
