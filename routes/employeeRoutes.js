const express = require("express");
const router = express.Router();
// const validateToken=require('../middleware/validateToken');
const upload = require("../config/multer");

const {
    getAllUsers ,
    createUser,
    Avatar,
    logOut,
    renderLog,
    getUser,
    updateUser,
    deleteUser} = require("../controllers/employeeControllers");
 
// router.route("/").get(getAllUsers);
router.route("/").get(getAllUsers) ;
router.route("/logout").post(logOut);


    router.route("/add").post(createUser);

    // router.route("/api/employees").post(validateToken,createUser);
    router.route("/:id/avatar").post(upload, Avatar);

    router.route("/:id").put(updateUser);

    router.route("/:id").delete(deleteUser);

    router.route("/:id").get(getUser);
    // router.route("/:id").get(renderview);
    // router.get('/:id', renderview);
    router.route('/').get(renderLog);


router.get("/view",(req,res)=>{
    res.render("view")
})

  
    
    module.exports= router;