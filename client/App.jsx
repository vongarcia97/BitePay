import React, {useEffect, useState} from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { io } from 'socket.io-client';

import Home from './components/Home.jsx';
import Table from './components/Table.jsx';
import FinalBill from './components/FinalBill.jsx';


const socket = io.connect('http://localhost:3000');


export default function App() {

  console.log('rerendered global app');

  const [user, setUser] = useState({
    id: '',
    username: '',
    tableID: '',
    myItems: [],
    tip: 15,
    total: 0,
    status: 'PROCESSING',
  });

  const [tableMembers, setTableMembers] = useState([]);
  const [joinedTable, setJoinedTable] = useState(false);

  useEffect(() => {
    console.log(`rerendered within useEffect in App.jsx with user: ${{user}} and tableMembers: ${{tableMembers}}`);

    socket.on('connect', () => {
      console.log('connected to server');
    })

    // server-side will automatically emit 'setId' event once connection is established. Listed for event and set user's ID 
    socket.on('setId', (data) => {
      console.log('data from setId: ', data);
      setUser({...user, id: data});
    })

    // server-side automatically sends 'tableMembers' event once connection is established with data containing all table members.
    socket.on('tableMembers', (data) => {
      // update the tableMembers array
      /* setTableMembers((prevTableMembers) => {
        return prevTableMembers.map((member) => {
          if (member.id === data.id) {
            return data;
          } else {
            return member;
          }
        })
      }); */
      setTableMembers([...data.slice()]);
      console.log('updated tableMembers: ', tableMembers);
      setJoinedTable(true);
    })

    socket.on('tableMemberUpdate', (data) => {
      console.log('data from tableMemberUpdate: ', data);

      // check if data coming back is the current user's data
      if (data.id === user.id) {
        console.log('THIS user data updated', user, data);
        // if so, update the user's data
        setUser({...user, myItems: data.myItems, tip: data.tip, total: data.total, status: data.status});
      }

      // update the tableMembers array
      setTableMembers((prevTableMembers) => {
        return prevTableMembers.map((member) => {
          if (member.id === data.id) {
            return data;
          } else {
            return member;
          }
        })
      });
    });

    // update the tableMembers array when a user leaves the table
    socket.on('userLeft', (data) => {
      console.log('this user has left the table:  ', data);
      setTableMembers((prevTableMembers) => {
        return prevTableMembers.filter((member) => {
          return member.id !== data.id;
        })
      });
    })

    return () => {
      socket.off('connect');
      socket.off('setId');
      socket.off('tableMembers');
      socket.off('tableMemberUpdate');
      socket.off('userLeft');
    };


  }, [tableMembers]); // set tableMembers as dependency to re-render useEffect when there is a socket event updating the data

  const joinTable = (user) => {
    socket.emit('joinTable', user);
  }

  const userAddItem = (user, payload) => {
    socket.emit('userUpdate', {user, payload});
  }

  const userDeleteItem = (user, payload) => {
    socket.emit('userDeleteItem', {user, payload});
  };

  return (
    <Router>
      <Routes>
        <Route
        exact path='/'
        element={<Home
        user={user}
        setUser={setUser}
        joinTable={joinTable}
        />
        }>
        </Route>
        <Route
        exact path={`/Table`}
        element={<Table
        user={user}
        setUser={setUser}
        socket={socket}
        tableMembers={tableMembers}
        setTableMembers={setTableMembers}
        joinTable={joinTable}
        userAddItem={userAddItem}
        userDeleteItem={userDeleteItem}
        />
        }>
        </Route>
        <Route
        exact path={`/FinalBill`}
        element={<FinalBill
        tableMembers={tableMembers}
        user={user}
        />
        }>
        </Route>
      </Routes>
    </Router>
  )
}