import React, {useEffect, useState} from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { io } from 'socket.io-client';

import Home from './components/Home.jsx';
import Table from './components/Table.jsx';
import FinalBill from './components/FinalBill.jsx';


const socket = io('http://bitepaynyc-env.eba-jjnppubt.us-east-1.elasticbeanstalk.com/', { transports: ['websocket'] });

export default function App() {

  const [user, setUser] = useState({
    id: '',
    username: '',
    tableID: 0,
    myItems: [],
    tip: 15,
    total: 0,
    status: 'PROCESSING',
  });

  const [tableMembers, setTableMembers] = useState([]);

  useEffect(() => {

    socket.on('connect', () => {
      console.log('connected to server');
    })

    socket.on('setId', (data) => {
      setUser({...user, id: data});
    })

    socket.on('tableMembers', (data) => {
      setTableMembers([...data.slice()]);
    })

    socket.on('tableMemberUpdate', (data) => {
      if (data.id === user.id) {
        setUser({...user, myItems: data.myItems, tip: data.tip, total: data.total, status: data.status});
      }


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

    socket.on('userLeft', (data) => {
      setTableMembers((prevTableMembers) => {
        return prevTableMembers.filter((member) => {
          return member.id !== data.id;
        })
      });
    })

    socket.on('disconnect', () => {
      alert('you have been disconnected from server. Please re-join table via the home page');
    });

    return () => {
      socket.off('connect');
      socket.off('setId');
      socket.off('tableMembers');
      socket.off('tableMemberUpdate');
      socket.off('userLeft');
      socket.off('disconnect');
    };


  }, [/* tableMembers */ user]); 

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
        exact path="/Table"
        element={<Table
        user={user}
        setUser={setUser}
        socket={socket}
        tableMembers={tableMembers}
        setTableMembers={setTableMembers}
        userAddItem={userAddItem}
        userDeleteItem={userDeleteItem}
        />
        }>
        </Route>
        <Route
        exact path="/FinalBill"
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