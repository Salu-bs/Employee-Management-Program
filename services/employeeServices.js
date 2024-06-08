// const newemployee = require("../models/employeeModels");

// const getAllUsers = async (page, limit, search, sortOrder) => {
//   const matchStage = {
//     $match: {
//       $or: [
//         { firstName: { $regex: search, $options: 'i' } },
//         { email: { $regex: search, $options: 'i' } },
//         { country: { $regex: search, $options: 'i' } },
//       ]
//     }
//   };

//   const aggregationPipeline = [
//     matchStage,
//     { $sort: { _id: sortOrder } },
//     {
//       $facet: {
//         metadata: [{ $count: 'total' }],
//         data: [
//           { $skip: (page - 1) * limit },
//           { $limit: limit }
//         ]
//       }
//     }
//   ];

//   const results = await newemployee.aggregate(aggregationPipeline);
//   const metadata = results[0].metadata;
//   const data = results[0].data;
//   const count = metadata.length > 0 ? metadata[0].total : 0;
//   const totalPages = Math.ceil(count / limit);

//   return {
//     data,
//     page,
//     nextPage: page < totalPages ? page + 1 : null,
//     count,
//     search,
//     totalPages
//   };
// };

const newemployee = require("../models/employeeModels");
const getAllUsers = async (page, limit, search, sortOrder) => {
  const matchStage = {
    $match: {
      $or: [
        { firstName: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { country: { $regex: search, $options: 'i' } },
      ]
    }
  };

  const sortStage = { $sort: { _id: sortOrder } }; // Sort in descending order by _id

  const aggregationPipeline = [
    matchStage,
    sortStage,
    {
      $facet: {
        metadata: [{ $count: 'total' }],
        data: [
          { $skip: (page - 1) * limit },
          { $limit: limit }
        ]
      }
    }
  ];

  const results = await newemployee.aggregate(aggregationPipeline);
  const metadata = results[0].metadata;
  const data = results[0].data;
  const count = metadata.length > 0 ? metadata[0].total : 0;
  const totalPages = Math.ceil(count / limit);

  return {
    data,
    page,
    nextPage: page < totalPages ? page + 1 : null,
    count,
    search,
    totalPages,
    revdata: sortOrder // Include sortOrder in the response
  };
};

const createUser = async (newEmployee) => {
  const employee = new newemployee(newEmployee);
  return await employee.save();
};

const updateAvatar = async (id, filename) => {
  return await newemployee.updateOne({ _id: id }, { avatar: filename });
};

const updateUser = async (id, updatedData) => {
  return await newemployee.findByIdAndUpdate(id, updatedData, { new: true });
};

const getUser = async (id) => {
  return await newemployee.findById(id);
};

const deleteUser = async (id) => {
  return await newemployee.findByIdAndDelete(id);
};

module.exports = {
  getAllUsers,
  createUser,
  updateAvatar,
  updateUser,
  getUser,
  deleteUser
};
