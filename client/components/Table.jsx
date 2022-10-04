import React, { useState, useEffect } from 'react';
import { useNavigate} from 'react-router-dom';

import TableListView from './TableListView';
import IndividualBillView from './IndividualBillView';
import AddItemForm from './AddItemForm';
import FinalView from './FinalView';
import ProgressBar from './ProgressBar';



export default function Table ({user, setUser, socket, tableMembers, userAddItem, userDeleteItem}) {

  const navigate = useNavigate();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (user.tableID === 0) {
      alert('You have been disconnected. Please return to the home page to rejoin your table.');
      navigate(`/`);
    }

    if (user.status === 'READY') {
      setReady(true);
    }

    socket.on('disconnect', () => {
      alert('You have been disconnected from the server. Please return to the home page to rejoin your table.');
      navigate(`/`);
    });

    return () => {
      console.log('unmounting and setting status to NOT_READY');
      setReady(false);
      socket.off('disconnect');
    }

  }, []);


  const handleClick = (e) => {
    e.preventDefault();
    if (ready) {
      setReady(false);
      socket.emit('userUpdateStatus', {...user, status: 'PROCESSING'});
    }
    else {
      e.preventDefault();
      setReady(true);
      socket.emit('userUpdateStatus', {...user, status: 'READY'});
    }
  }

  const statusButton = () => {
    if (ready) {
      return (
        <button
        type="button"
        className="w-full py-4 mb-2 bg-yellow-600 rounded-lg text-yellow-100"
        onClick={(e) => {handleClick(e)}}
        > MAKE A CHANGE
        </button>
        )
    } else {
      return (
        <button
          type="button"
          className="w-full py-4 mb-2 bg-green-600 rounded-lg text-green-100"
          onClick={(e) => {handleClick(e)}}
          > I'M READY!
        </button>
      )
    }

  }



  

  return (
    <section>
      <ProgressBar tableMembers={tableMembers}/>
      <TableListView tableMembers={tableMembers} user={user} />
      <IndividualBillView user={user} userDeleteItem={userDeleteItem} ready={ready}/>
      <AddItemForm user={user} userAddItem={userAddItem} />
      <FinalView user={user} setUser={setUser} />
      {statusButton()}
    </section>
  )
}