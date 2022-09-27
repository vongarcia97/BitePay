import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';

export default function ProgressBar ({tableMembers}) {

  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const completed = tableMembers.filter((member) => member.status === 'READY');
    const progress = Math.round(100 * ((completed.length / tableMembers.length) * 100)) / 100;
    setProgress(progress);
  }, [tableMembers])

          /* <div className="m-4 w-full h-6 bg-gray-200 rounded-full dark:bg-gray-700">
            <div className="h-6 px-1 bg-green-600 text-right text-sm rounded-full dark:bg-green-500" style={{width: `${progress}%`}}>{progress}% COMPLETE! </div>
          </div>  */

  const progressBar = (progress) => {
    if (progress === 100) {
      return (

          <div className="w-full bg-gray-200 rounded-full dark:bg-gray-700">
            <div className="bg-green-600 text-xs font-medium text-green-100 text-center p-0.5 leading-none rounded-full" style={{width: `${progress}%`}}> {progress}% COMPLETE! </div>
          </div>
      )
    } else {
      return (
        <div className="w-full bg-gray-200 rounded-full dark:bg-gray-700">
            <div className="bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full" style={{width: `${progress < 15 ? 15 : progress}%`}}> {progress}% READY... </div>
          </div>
      )
    }
  }

  const handleClick = () => {
    navigate('/FinalBill');
  }

  const finalBillButton = (progress) => {
    if (progress === 100) {
      return (
        <button className="bg-blue-500 hover:bg-blue-700 text-sm text-white font-bold py-2 px-4 rounded" onClick={() => handleClick()}>FINAL BILL</button> 
      )
    } else {
      return (
        <button className="bg-red-500 hover:bg-red-700 text-sm text-white font-bold p-2 px-4 rounded" disabled={true}>PENDING</button> 
      )
    }
  }

  return (
    <section className="container mx-auto p-4 font-mono">
      <div className="w-full flex items-center justify-between mb-.5 overflow-hidden rounded-lg shadow-lg bg-gray-100 uppercase border-b border-gray-100">
          {progressBar(progress)}
        <div id="final-bill-button" className='p-2'>
          {finalBillButton(progress)}
        </div>
      </div>
    </section>
  )
}