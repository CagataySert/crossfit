const controlMembershipDate = (req, res, next) => {
  try {
    const { endOfMembership } = req.user;

    const currentDate = new Date();
    const endOfMembershipHumanized = new Date(endOfMembership * 1000);

    //Check user's membership whether is still active or not.
    if (currentDate > endOfMembershipHumanized) {
      return res
        .status(401)
        .send({ status: false, message: 'your membership is over.' });
    }
  } catch (error) {
    console.error(error.message);
    res.status(401).send({ status: false, message: error.message });
  }

  next();
};

module.exports = controlMembershipDate;
