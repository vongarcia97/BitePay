import React, {useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

export default function FinalBill({tableMembers, user}) {

  const navigate = useNavigate();
  useEffect(() => {
    if (user.tableID === 0) {
      alert('You have been disconnected. Please return to the home page to rejoin your table.');
      navigate(`/`);
    }
  }, []);

  const calculateTotal = (tableMembers) => {
    let total = 0;
    tableMembers.forEach((member) => {
      total += (Math.round(100 * (((1+(member.tip / 100)) * member.total) + (member.total * .08875))) / 100);
    })
    return total;
  }

  const calculateTip = (tableMembers) => {
    let total = 0;
    tableMembers.forEach((member) => {
      total += ((member.tip / 100) * member.total);
    })
    return (Math.round(100 * total) / 100);
  }

  const calculateTableTip = (tableMembers) => {
    let total = 0;
    tableMembers.forEach((member) => {
      total += member.tip;
    })
    return total / tableMembers.length;
  }

  const calculateTax = (tableMembers) => {
    let total = 0;
    tableMembers.forEach((member) => {
      total += (member.total * .08875);
    })
    return Math.round(100 * total) / 100;
  }

  const calculateBeforeTax = (tableMembers) => {
    let total = 0;
    tableMembers.forEach((member) => {
      total += member.total;
    })
    return Math.round(100 * total) / 100;
  }

  return (

    <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase dark:text-gray-400">
                <tr>
                    <th scope="col" className="py-3 px-5 text-center bg-gray-50 dark:bg-gray-800">
                        TABLE MEMBER
                    </th>
                    <th scope="col" className="py-3 px-5">
                        ORDER
                    </th>
                    <th scope="col" className="py-3 px-5 bg-gray-50 dark:bg-gray-800">
                        MEMBER TOTAL
                    </th>
                </tr>
            </thead>
            <tbody>
              <tr key={user.id} className="border-b border-gray-200 dark:border-gray-700">
                <th scope="row" className="py-4 px-5 font-medium text-gray-900 whitespace-nowrap text-left bg-gray-50 dark:text-white dark:bg-gray-800">
                    {user.username} (ME)
                </th>
                <td className="py-4">
                    {user.myItems.map((item) => {
                      return (
                        <div key={item.itemID} className="block text-left sm:text-xs text-sm pb-1 px-1">
                          <span className="block">{`ITEM: ${item.itemName}`}  </span>
                          <span className="block">{`QTY: ${Math.round(100 * item.itemQuantity) / 100}`} </span>
                          <span className="block">{`PRICE: $${Math.round(100 * item.itemPrice) / 100}`}</span>
                        </div>
                      )
                    })}
                  <span className="block pt-3">{`TOTAL:  $${Math.round(100* user.total) / 100}`}</span>
                  <span className="block">{`TIP: ${user.tip}% | $${Math.round(100 * ((user.tip / 100) * user.total)) / 100}`}</span>
                  <span className="block">{`TAX: 8.875%  | $${Math.round(100 *  (.08875 * user.total)) / 100}`}</span>
                </td>
                <td className="py-4 px-2">
                    <span className="px-2 py-1 inline-block font-semibold leading-tight text-green-700 bg-green-100 rounded-sm">$  {Math.round(100 * (((1+(user.tip / 100)) * user.total) + (user.total * .08875))) / 100}
                                  </span>
                </td>
              </tr>
            {tableMembers.map((member) => {
              if (member.id !== user.id) {
                return (
                  <tr key={member.id} className="border-b border-gray-200 dark:border-gray-700">
                    <th scope="row" className="py-4 px-5 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                        {member.username}
                    </th>
                    <td className="py-4">
                        {member.myItems.map((item) => {
                          return (
                            <div key={item.itemID} className="block text-left sm:text-xs text-sm pb-1 px-1">
                              <span className="block">{`ITEM:  ${item.itemName}\n`}  </span>
                              <span className="block">{`QTY:  ${Math.round(100 * item.itemQuantity) / 100}\n `} </span>
                              <span className="block">{`PRICE:  $${item.itemPrice} \n`}</span>
                            </div>
                          )
                        })}
                        <span className="block pt-3">{`TOTAL:  $${Math.round(100* member.total) / 100}`}</span>
                        <span className="block">{`TIP: ${member.tip}% | $${Math.round(100 * ((member.tip / 100) * member.total)) / 100}`}</span>
                        <span className="block">{`TAX: 8.875%  | $${Math.round(100 *  (.08875 * member.total)) / 100}`}</span>
                      </td>
                      <td className="py-4 px-2">
                          <span className="px-2 py-1 inline-block text-left font-semibold leading-tight text-green-700 bg-green-100 rounded-sm">$  {Math.round(100 * (((1+(member.tip / 100)) * member.total) + (member.total * .08875))) / 100}
                                        </span>
                      </td>
                    </tr>
                )}
              }
            )}
                <tr>
                    <td className="p-2 whitespace-nowrap">
                        <div className="text-left text-md text-gray-500">BEFORE TAX: </div>
                    </td>
                    <td className="p-2 whitespace-nowrap">
                        <div className="text-center">----------------</div>
                    </td>
                    <td className="p-2 whitespace-nowrap">
                        <div className="text-lg text-center  text-gray-500">$ {calculateBeforeTax(tableMembers)}</div>
                    </td>
                </tr>
                <tr>
                    <td className="p-2 whitespace-nowrap">
                        <div className="text-left text-md text-blue-300">NYS TAX: </div>
                    </td>
                    <td className="p-2 whitespace-nowrap">
                        <div className="text-center">---8.875%---</div>
                    </td>
                    <td className="p-2 whitespace-nowrap">
                        <div className="text-lg text-center  text-gray-500">$ {calculateTax(tableMembers)}</div>
                    </td>
                </tr>
                <tr>
                    <td className="p-2 whitespace-nowrap">
                        <div className="text-left text-md text-blue-300">TIP: </div>
                    </td>
                    <td className="p-2 whitespace-nowrap">
                        <div className="text-center">-NET RATE: {Math.round(10000 *(calculateTip(tableMembers) / calculateBeforeTax(tableMembers))) / 100}%-</div>
                        <div className="text-center">-TABLE AVG: {calculateTableTip(tableMembers)}%-</div>
                    </td>
                    <td className="p-2 whitespace-nowrap">
                        <div className="text-lg text-center  text-gray-500">$ {calculateTip(tableMembers)}</div>
                    </td>
                </tr>
                <tr>
                    <td className="p-2 whitespace-nowrap">
                        <div className="text-left text-lg text-green-500">TOTAL: </div>
                    </td>
                    <td className="p-2 whitespace-nowrap">
                        <div className="text-center">----------------</div>
                    </td>
                    <td className="p-2 whitespace-nowrap">
                        <div className="text-lg text-bold text-center  text-green-800">$ {calculateTotal(tableMembers)}</div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>

  )
}