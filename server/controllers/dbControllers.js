const { dbUsersCollection, dbOrdersCollection } = require('../models/mongooseModel');

const dbController = {};

dbController.addUser = async (req, res) => {
  try {
    const user = await dbUsersCollection.create({
      username: req.body.username,
      table_name: req.body.table_name
    });

    return res.json({
      success: true,
      message: "User successfully added to room"
    });
  } catch (error) {
    console.log("Error while adding user", error);
    return res.json({
      success: false,
      message: "Error while adding user. - dbController"
    })
  }
};

dbController.addItem = async (req, res) => {
  try {
    const item = await dbOrdersCollection.create({
      ordered_by: req.body.ordered_by,
      table_name: req.body.table_name,
      items: req.body.items
    });

    return res.json({
      success: true,
      message: "Item successfully added to table"
    });
  } catch (error) {
    console.log("error while adding item", error);
    return res.json({
      success: false,
      message: "Error while adding item. - dbController"
    });
  }
}


module.exports = dbController;