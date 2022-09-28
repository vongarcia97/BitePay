// install all of the modules we will need

const express = require("express");
const cors = require("cors");
const path = require("path");
const {createServer} = require("http");
const { Server } = require("socket.io");
require('dotenv').config();
// IMPORT all of the modules and libraries we will need
const app = express();
const PORT = process.env.PORT || 3000;

// IMPORT socket utilities
const {
  createUser,
  getCurrentUser,
  getTableMembers,
  userUpdate,
  userUpdateStatus,
  userDeleteItem,
  userLeft,
} = require("./utils/users");


app.use(express.json());
app.use(express.urlencoded( {extended: true }));
app.use(cors());

app.use(express.static(path.resolve(__dirname, '../dist')));


const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "https://bitepay.herokuapp.com/",
  }
});
app.get('/', (req, res) => {
  return res.status(200).sendFile(path.join(__dirname, '../index.html'));
});

io.on("connection", (socket) => {
  console.log('connected to ws server', socket.id);
  socket.emit('setId', socket.id);
  
  socket.on('joinTable', async (data) => {
    if (data.id && data.tableID && data.username) {
      const checkUser = getCurrentUser(data.id, data.tableID);
      if (!checkUser) {
        const user = await createUser(data.id , data.username, data.tableID, data.myItems, data.tip, data.total, data.status);
        socket.join(user.tableID);
        console.log('joined table', user.tableID, user);
        io.to(user.tableID).emit('tableMembers', getTableMembers(user.tableID));
      } else {
        console.log('user already exists:  ,', checkUser, 'no need to create');
      }
    } else {
      console.log('server error: missing data from event joinTable');
    }
  });

  socket.on('userUpdate', (data) => {
    console.log('server received userUpdate event with data: ', data);
    const {user, payload} = data;
    const updateAction = userUpdate(user, payload);
    console.log('return from updateAction: ', updateAction);

    io.to(user.tableID).emit('tableMemberUpdate', updateAction);
  });

  socket.on('userUpdateStatus', (user) => {
    console.log('server received userUpdateStatus event with data: ', user);
    const updateAction = userUpdateStatus(user)
    console.log('return from userUpdateStatus updateAction: ', updateAction);

    io.to(user.tableID).emit('tableMemberUpdate', updateAction);
  });

  socket.on('userDeleteItem', (data) => {
    console.log('server received userDeleteItem event with data: ', data);
    const {user, payload} = data;
    const updateAction = userDeleteItem(user, payload);
    console.log('return from updateAction: ', updateAction);

    io.to(user.tableID).emit('tableMemberUpdate', updateAction);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
    const user = userLeft(socket.id);
    if (user) {
      io.to(user.tableID).emit('tableMembers', getTableMembers(user.tableID));
    }
  });
});


// catch-all route handler for any requests to an unknown route
app.use((req, res) => res.status(404).send('This is not the page you\'re looking for...'));

app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});


/**
 * start server
 */
server.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}...`);
});
module.exports = app