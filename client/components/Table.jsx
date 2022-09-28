import React, { useState, useEffect } from 'react';

import TableListView from './TableListView';
import IndividualBillView from './IndividualBillView';
import AddItemForm from './AddItemForm';
import FinalView from './FinalView';
import ProgressBar from './ProgressBar';



export default function Table ({user, setUser, socket, tableMembers, userAddItem, userDeleteItem}) {

  const [ready, setReady] = useState(false);
  const [joined, setJoined] = useState(false);

  useEffect(() => {
    if (!joined) {
      socket.emit('joinTable', user);
      setJoined(true);
    }

    if (user.status === 'READY') {
      setReady(true);
    } else if (user.status === 'PROCESSING') {
      setReady(false);
    }
    
    return () => {
      socket.off('joinTable');
    }

  }, [joined]);

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
      <AddItemForm user={user} /* socket={socket} */ userAddItem={userAddItem} />
      <FinalView user={user} setUser={setUser} />
      {statusButton()}
    </section>
  )
}