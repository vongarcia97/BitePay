import React from "react";

export default function IndividualBillView({ user, socket }) {

    const handleDelete = (user, payload) => {
        console.log('sending delete request to server for item: ', payload);
        socket.emit('userDeleteItem', { user, payload });
    }

/* 
<tr>
                                    <td className="p-2 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="w-10 h-10 flex-shrink-0 mr-2 sm:mr-3"><img className="rounded-full" src="https://raw.githubusercontent.com/cruip/vuejs-admin-dashboard-template/main/src/images/user-36-05.jpg" width="40" height="40" alt="Alex Shatov"></div>
                                            <div className="font-medium text-gray-800">Alex Shatov</div>
                                        </div>
                                    </td>
                                    <td className="p-2 whitespace-nowrap">
                                        <div className="text-left">alexshatov@gmail.com</div>
                                    </td>
                                    <td className="p-2 whitespace-nowrap">
                                        <div className="text-left font-medium text-green-500">$2,890.66</div>
                                    </td>
                                    <td className="p-2 whitespace-nowrap">
                                        <div className="text-lg text-center">??</div>
                                    </td>
                                </tr>
*/

  return (
    <section className="container mx-auto p-4 font-mono">
        <div className="w-full mb-8 overflow-hidden rounded-lg shadow-lg bg-gray-100 uppercase border-b border-gray-100">
            <header className="px-5 py-4 border-b border-gray-100">
                <h2 className="font-semibold text-gray-800">
                    MY RECEIPT
                    </h2>
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
                            })}
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