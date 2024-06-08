const tokenValidate = (req, res, next) => {
    if (req.session.token) {
        // console.log("token: 1",req.session.token);
        next();
    } else {
        res.status(200).render('signUP');
    }
};

module.exports = tokenValidate;
