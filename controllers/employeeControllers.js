
const asyncHandler = require('express-async-handler');
// const employeeServices = require("../services/employeeServices");
const employeeServices = require("../services/employeeServices");


const logOut = (req, res) => {
  res.clearCookie("token");
  req = {
    type: "success",
    info: "You are successfully logged out",
  };
  return res.redirect("/");
};

const renderLog = (req, res) => {
  res.status(200).render('signUP');
};

const getAllUsers = asyncHandler(async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    // const limit = 100;
    const limit = parseInt(req.query.limit) 
    const search = req.query.search || '';
    const sortOrder = req.query.sortOrder === 'asc' ? 1 : -1;

    const result = await employeeServices.getAllUsers(page, limit, search, sortOrder);

    return res.status(200).json({
      success: true,
      msg: 'Employee data',
      data: result.data,
      page: result.page,
      nextPage: result.nextPage,
      count: result.count,
      search: result.search,
      totalPages: result.totalPages,
      revdata: result.revdata // Pass sortOrder to the frontend
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      msg: error.message
    });
  }
})

const createUser = asyncHandler(async (req, res) => {
  try {
    const newEmployee = { ...req.body };

    let result = await employeeServices.createUser(newEmployee);

    if (result) {
      res.status(201).json({
        status: "success",
        data: result,
        id: result._id,
        message: "Employee creation successful",
      });
    }
  } catch (err) {
    console.error(err);
    res.status(400).json({
      status: "failed",
      message: "Employee creation failed",
    });
  }
});

const Avatar = asyncHandler(async (req, res) => {
  try {
    const id = req.params.id;
    const filename = req.file.filename;
    const filePath = `uploads/${filename}`;
    console.log(filePath);

    await employeeServices.updateAvatar(id, filename);

    res.status(200).json({ message: "Avatar updated successfully", filePath });
  } catch (err) {
    res.status(400).json({ message: "Failed to update avatar", error: err.message });
  }
});

const updateUser = asyncHandler(async (req, res) => {
  try {
    const updatedEmployee = await employeeServices.updateUser(req.params.id, req.body);

    if (!updatedEmployee) {
      res.status(404);
      throw new Error("Employee not found");
    }

    res.status(200).json({ 
      id: updatedEmployee._id,
      employee: updatedEmployee
    });
  } catch (err) {
    res.status(400).json({ message: "Failed to update employee", error: err.message });
  }
});

const getUser = asyncHandler(async (req, res) => {
  try {
    const employee = await employeeServices.getUser(req.params.id);

    if (!employee) {
      res.status(404);
      throw new Error("Employee not found");
    }

    res.status(200).json(employee);
  } catch (err) {
    res.status(400).json({ message: "Failed to get employee", error: err.message });
  }
});

const deleteUser = asyncHandler(async (req, res) => {
  try {
    const deletedEmployee = await employeeServices.deleteUser(req.params.id);

    if (!deletedEmployee) {
      res.status(404);
      throw new Error("Employee not found");
    }

    // Return the deleted employee ID along with the success message
    res.status(200).json({ message: "Employee deleted successfully", deletedEmployeeId: req.params.id });
  } catch (err) {
    res.status(400).json({ message: "Failed to delete employee", error: err.message });
  }
});

module.exports = {
  getAllUsers,
  Avatar,
  createUser,
  getUser,
  updateUser,
  deleteUser,
  logOut,
  renderLog
};
