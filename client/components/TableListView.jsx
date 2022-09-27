import React from "react";

export default function TableListView({tableMembers, user}) {

    return (
        <section className="container mx-auto p-4 font-mono">
        <div className="w-full mb-.5 overflow-hidden rounded-lg shadow-lg">
            <div className="w-full overflow-x-auto">
            <table className="w-full">
                <thead>
                <tr className="text-md font-semibold tracking-wide text-center text-gray-900 bg-gray-100 uppercase border-b border-gray-600">
                    <th className="px-4 py-3 max-w-max">Name</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3">Total</th>
                </tr>
                </thead>
                <tbody className="bg-white">
                    <tr className="text-gray-700" key={user.id}>
                                <td className="px-4 py-3 text-center border">
                                    <div className="flex items-center text-sm">
                                        <div>
                                        <p className="font-semibold text-black">{user.username} (ME)</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-4 py-3 text-xs text-center border">
                                {user.status === "READY" ? 
                                (
                                    <span className="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-sm"> {user.status} </span>
                                ) : (
                                    <span className="px-2 py-1 font-semibold leading-tight text-red-700 bg-red-100 rounded-sm"> {user.status} </span>
                                )}
                                </td>
                                <td className="px-4 py-3 text-sm text-center border">
                                    <span className="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-sm">$  {Math.round(100 * (((1+(user.tip / 100)) * user.total) + (user.total * .08875))) / 100}
                                    </span>
                                </td>
                            </tr>
                    {tableMembers.map((member) => {
                        if (member.id !== user.id) {
                            return (
                                <tr className="text-gray-700" key={member.id}>
                                    <td className="px-4 py-3 text-center border">
                                        <div className="flex items-center text-sm">
                                            <div>
                                            <p className="font-semibold text-black">{member.username}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-4 py-3 text-xs text-center border">
                                    {member.status === "READY" ? 
                                    (
                                        <span className="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-sm"> {member.status} </span>
                                    ) : (
                                        <span className="px-2 py-1 font-semibold leading-tight text-red-700 bg-red-100 rounded-sm"> {member.status} </span>
                                    )}
                                    </td>
                                    <td className="px-4 py-3 text-sm text-center border">
                                        <span className="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-sm">$  {Math.round(100 * (((1+(member.tip / 100)) * member.total) + (member.total * .08875))) / 100}
                                        </span>
                                    </td>
                                </tr>
                            )
                        }
                    })}
                </tbody>
            </table>
            </div>
        </div>
        </section>
    );
}