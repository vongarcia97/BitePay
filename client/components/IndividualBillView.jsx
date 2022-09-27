import React, {useState, useEffect} from "react";

export default function IndividualBillView({ user, userDeleteItem, ready }) {

    const handleDelete = (user, payload) => {
        userDeleteItem(user, payload);
    }


  return (
    <section className="container mx-auto p-4 font-mono">
        <div className="w-full mb-.5 overflow-hidden rounded-lg shadow-lg bg-gray-100 uppercase border-b border-gray-100">
            <header className="px-5 py-4 border-b justify-between text-center border-gray-100 flex">
                <h2 className="inline-block font-semibold text-gray-800">
                    MY RECEIPT
                </h2>
                <button
                type="button"
                className="inline-block w-auto py-4 px-2 bg-blue-600 rounded-lg text-sm text-white-100"
                onClick={() => {navigator.clipboard.writeText(user.tableID)}}
                > COPY TABLE ID: {user.tableID}
                </button>
            </header>
            <div className="p-3">
                <div className="overflow-x-auto">
                    <table className="table-auto w-full">
                        <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
                            <tr>
                                <th className="p-2 whitespace-nowrap">
                                    <div className="font-semibold text-left">Item</div>
                                </th>
                                <th className="p-2 whitespace-nowrap">
                                    <div className="font-semibold text-left">Price</div>
                                </th>
                                <th className="p-2 whitespace-nowrap">
                                    <div className="font-semibold text-left">Quantity</div>
                                </th>
                                <th className="p-2 whitespace-nowrap">
                                    <div className="font-semibold text-left"></div>
                                </th>
                            </tr>
                        </thead>
                        <tbody className="text-sm divide-y divide-gray-100">
                            {user.myItems.map((item) => {
                                if (!ready) {
                                    return (
                                        <tr key={`${item.itemID}`}>
                                        <td className="p-2 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="font-medium text-gray-500">{item.itemName}</div>
                                            </div>
                                        </td>
                                        <td className="p-2 whitespace-nowrap">
                                            <div className="text-left font-medium text-green-500">{item.itemPrice}</div>
                                        </td>
                                        <td className="p-2 whitespace-nowrap">
                                            <div className="text-left">{item.itemQuantity}</div>
                                        </td>
                                        <td className="p-2 whitespace-nowrap">
                                            <button
                                            type="button"
                                            className="w-auto p-2 bg-red-600 rounded-lg text-white-100"
                                            onClick={() => handleDelete(user, item)}
                                            > DEL 
                                            </button>
                                        </td>
                                    </tr>
                                    )
                                } else {
                                    return (
                                            <tr key={`${item.itemID}`}>
                                            <td className="p-2 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="font-medium text-gray-500">{item.itemName}</div>
                                                </div>
                                            </td>
                                            <td className="p-2 whitespace-nowrap">
                                                <div className="text-left font-medium text-green-500">{item.itemPrice}</div>
                                            </td>
                                            <td className="p-2 whitespace-nowrap">
                                                <div className="text-left">{item.itemQuantity}</div>
                                            </td>
                                            </tr>
                                        )

                            }})}
                            <tr>
                                <td className="p-2 whitespace-nowrap">
                                    <div className="text-left text-lg text-green-500">TOTAL: </div>
                                </td>
                                <td className="p-2 whitespace-nowrap">
                                    <div className="text-left">----------------</div>
                                </td>
                                <td className="p-2 whitespace-nowrap">
                                    <div className="text-lg text-center  text-green-500">{user.total}</div>
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