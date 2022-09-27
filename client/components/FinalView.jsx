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
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </section>
  )
}