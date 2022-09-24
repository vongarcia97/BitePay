import React from 'react';

export default function FinalBill({tableMembers}) {

  return (

    <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase dark:text-gray-400">
                <tr>
                    <th scope="col" className="py-3 px-6 bg-gray-50 dark:bg-gray-800">
                        TABLE MEMBER
                    </th>
                    <th scope="col" className="py-3 px-6">
                        ORDER
                    </th>
                    <th scope="col" className="py-3 px-6 bg-gray-50 dark:bg-gray-800">
                        TIP
                    </th>
                    <th scope="col" className="py-3 px-6">
                        MEMBER TOTAL
                    </th>
                </tr>
            </thead>
            <tbody>
                {tableMembers.map((member) => {
                  return (
                    /* 
                    <tr className="border-b border-gray-200 dark:border-gray-700">
                      <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                          Apple MacBook Pro 17"
                      </th>
                      <td className="py-4 px-6">
                          Sliver
                      </td>
                      <td className="py-4 px-6 bg-gray-50 dark:bg-gray-800">
                          Laptop
                      </td>
                      <td className="py-4 px-6">
                          $2999
                      </td>
                    </tr> */
                    <tr key={member.id} className="border-b border-gray-200 dark:border-gray-700">
                      <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                          {member.username}
                      </th>
                      <td className="py-4">
                          {member.myItems.map((item) => {
                            return (
                              <div key={item.itemID} className="inline-block text-center pb-1 px-1">
                                <div className="inline-block">
                                  <span>{`ITEM:  ${item.itemName}\n`}  </span>
                                </div>
                                <div className="inline-block">
                                  <span>{`QTY:  ${item.itemQuantity}\n `} </span>
                                </div>
                                <div className="inline-block">
                                  <span>{`PRICE:  $${item.itemPrice} \n`}</span>
                                </div>
                                <div className="inline-block">
                                  <span>{`TOTAL:  $${parseInt(item.itemPrice) * parseInt(item.itemQuantity)} \n`}</span>
                                </div>
                              </div>
                            )
                          })}
                      </td>
                      <td className="py-4 px-6 bg-gray-50 dark:bg-gray-800">
                          {member.tip}%
                      </td>
                      <td className="py-4 px-6">
                          <span className="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-sm">$  {Math.round(100 * (((1+(member.tip / 100)) * member.total) + (member.total * .08875))) / 100}
                                        </span>
                      </td>
                    </tr>
                  )
                })}
            </tbody>
        </table>
    </div>

  )
}