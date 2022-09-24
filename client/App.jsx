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
    status: 'PENDING',
  });

  const [tableMembers, setTableMembers] = useState([]);

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

    socket.on('tableMembers', (data) => {
      setTableMembers([...data.slice()]);
      console.log('updated tableMembers: ', tableMembers);
    })

    socket.on('tableMemberUpdate', (data) => {
      console.log('data from tableMemberUpdate: ', data);

      // check if data coming back is the current user's data
      if (data.id === user.id) {
        // if so, update the user's data
        setUser({...user, myItems: data.myItems, tip: data.tip, total: data.total, status: data.status});
      }

      // update tableMembers using map()
      const updatedData = tableMembers.map((member) => {
        // if the member's id matches the data's id, update the member's data else keep the member's data the same
        if (member.id === data.id) {
          return data;
        } else {
          return member;
        }
      });
      console.log('after tableMembers.map():   updatedData=', updatedData);
      // update tableMembers with hook
      setTableMembers([...updatedData]);
    });

    return () => {
      socket.off('connect');
      socket.off('setId');
      socket.off('tableMembers');
      socket.off('tableMemberUpdate');
    };


  }, [tableMembers]); // set tableMembers as dependency to re-render useEffect when there is a socket event updating the data

  return (
    <Router>
      <Routes>
        <Route
        exact path='/'
        element={<Home
        user={user}
        setUser={setUser}
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
        />
        }>
        </Route>
        <Route
        exact path={`/FinalBill`}
        element={<FinalBill
        socket={socket}
        tableMembers={tableMembers}
        />
        }>
        </Route>
      </Routes>
    </Router>
  )
}