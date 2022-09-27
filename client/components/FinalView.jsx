import React, { useEffect, useState } from 'react';

export default function FinalView({user, setUser}) {

  const handleTipChange = (e) => {
    setUser({...user, tip: parseInt(e.target.value)});
  }

  return (
    <section className="container mx-auto p-4 font-mono">
        <div className="w-full mb-.5 overflow-hidden rounded-lg shadow-lg bg-gray-100 uppercase border-b border-gray-100">
            <header className="px-5 py-4 border-b border-gray-100">
                <h2 className="font-semibold text-gray-800">
                    {user.username}'S FINAL BILL
                    </h2>
            </header>
            <div className="p-3">
                <div className="overflow-x-auto">
                    <table className="table-auto w-full">
                        <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
                            <tr>
                                <th className="p-2 whitespace-nowrap">
                                    <div className="font-semibold text-left"></div>
                                </th>
                                <th className="p-2 whitespace-nowrap">
                                    <div className="font-semibold text-left"></div>
                                </th>
                                <th className="p-2 whitespace-nowrap">
                                    <div className="font-semibold text-left"></div>
                                </th>
                            </tr>
                        </thead>
                        <tbody className="text-sm divide-y divide-gray-100">
                            <tr>
                                <td className="p-2 whitespace-nowrap">
                                    <div className="text-left text-sm text-green-500">TIP:</div>
                                </td>
                                {user.status === 'READY' ? 
                                    <td className="p-2 whitespace-nowrap">
                                        <input id="tip-scale" type="range" min={15} max={30} step={.5} value={user.tip} disabled={true} onChange={(e) => handleTipChange(e)} />
                                    </td>
                                 : 
                                    <td className="p-2 whitespace-nowrap">
                                        <input id="tip-scale" type="range" min={15} max={30} step={.5} value={user.tip} onChange={(e) => handleTipChange(e)} />
                                    </td>
                                }
                                {/* <td className="p-2 whitespace-nowrap">
                                    <input id="tip-scale" type="range" min={15} max={30} step={.5} value={user.tip} onChange={(e) => handleTipChange(e)} />
                                </td> */}
                                <td className="p-2 whitespace-nowrap">
                                    <div className="text-sm text-center  text-green-500">{user.tip} %</div>
                                </td>
                            </tr>
                            <tr>
                                <td className="p-2 whitespace-nowrap">
                                    <div className="text-left text-sm text-green-500">NY TAX:</div>
                                </td>
                                <td className="p-2 whitespace-nowrap">
                                    <div className="text-left">----------------</div>
                                </td>
                                <td className="p-2 whitespace-nowrap">
                                    <div className="text-sm text-center  text-green-500">8.875%</div>
                                </td>
                            </tr>
                            <tr>
                                <td className="p-2 whitespace-nowrap">
                                    <div className="text-left text-sm text-green-500">FINAL TOTAL</div>
                                </td>
                                <td className="p-2 whitespace-nowrap">
                                    <div className="text-left">----------------</div>
                                </td>
                                <td className="p-2 whitespace-nowrap">
                                    <div className="text-sm text-center  text-green-500">$ {
                                    Math.round(100 * ((((1+(user.tip / 100))) * user.total) + (user.total * .08875))) / 100
                                    }</div>
                                </td>
                            </tr>
                            {/*
                            <tr>
                                <td className="p-2 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <div className="w-10 h-10 flex-shrink-0 mr-2 sm:mr-3"><img className="rounded-full" src="https://raw.githubusercontent.com/cruip/vuejs-admin-dashboard-template/main/src/images/user-36-09.jpg" width="40" height="40" alt="Burak Long"></div>
                                        <div className="font-medium text-gray-800">Burak Long</div>
                                    </div>
                                </td>
                                <td className="p-2 whitespace-nowrap">
                                    <div className="text-left">longburak@gmail.com</div>
                                </td>
                                <td className="p-2 whitespace-nowrap">
                                    <div className="text-left font-medium text-green-500">$1,890.66</div>
                                </td>
                                <td className="p-2 whitespace-nowrap">
                                    <div className="text-lg text-center">??</div>
                                </td>
                            </tr>
                                */}
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    </section>
  )
}