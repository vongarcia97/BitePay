import React, { useState } from "react";
import ItemIcon from "../assets/fast-food.png"


export default function AddItemForm({user, /* socket */ userAddItem}) {
    const [itemName, setItemName] = useState('');
    const [itemPrice, setItemPrice] = useState(0);
    const [itemQuantity, setItemQuantity] = useState(0);

    const handleClick = (e)=> {
        e.preventDefault();
        if (itemName != "" && itemPrice > 0 && itemQuantity > 0) {
            const itemID = Math.ceil(Math.random()*1000000000);
            const payload = {itemID, itemName, itemPrice, itemQuantity};
            userAddItem(user, payload);
            setItemName('');
            setItemPrice(0);
            setItemQuantity(0);
        } else {
            alert("Please fill out all fields");
        }
    }

    return (
        <section className="container mx-auto p-4 font-mono">
        <div className="w-full flex items-center justify-evenly mb-.5 overflow-hidden rounded-lg shadow-lg bg-gray-100 uppercase border-b border-gray-100">
            <div id="inputContainer">
                <div id="item-name-container" className="flex relative pt-4">
                <span className="rounded-l-md inline-flex  items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
                    <img src={ItemIcon} alt="item icon" className="w-7 h-7"/>
                </span>
                <input type="text" id="item-name" className=" rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" name="item-name" placeholder="Item name" value={itemName} onChange={(e) => {setItemName(e.target.value)}}/>
                </div>

                <div id="price+quantity-container" className="my-4">
                <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 sm:text-sm">
                        $
                    </span>
                    </div>
                    <input type="number" name="price" id="price" className="focus:ring-indigo-500 border-l border-b border-t border-gray-300 py-2 px-4 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm rounded-md" value={itemPrice} onChange={(e) => {setItemPrice(e.target.value)}}/>
                    <div className="absolute inset-y-0 right-0 flex items-center">
                        <label htmlFor="quantity" className="sr-only">
                        Quantity
                        </label>
                        <select id="Currency" name="quantity" className="focus:ring-indigo-500 py-2 px-4 border-t border-r border-gray-300 border-b bo focus:border-indigo-500 h-full pl-2 pr-7 border-transparent bg-transparent text-gray-500 sm:text-sm rounded-r-md" value={itemQuantity} onChange={(e) => {setItemQuantity(e.target.value)}}>
                            <option disabled={true} value={0}>QTY</option>
                            <option value={1}>
                                1
                            </option>
                            <option value={2}>
                                2
                            </option>
                            <option value={3}>
                                3
                            </option>
                            <option value={4}>
                                4
                            </option>
                            <option value={5}>
                                5
                            </option>
                        </select>
                    </div>
                </div> 
                </div>
            </div>
            <div id="add-button-container" className="inline-block" >
                {user.status === 'READY' ? 
                    <button
                    type="button"
                    className="h-24 w-12 bg-gray-600 rounded-lg text-gray-100"
                    disabled={true}
                    onClick={(e) => handleClick(e)}> ADD! 
                    </button>
                    :
                    <button
                    type="button"
                    className="h-24 w-12 bg-green-600 rounded-lg text-green-100"
                    onClick={(e) => handleClick(e)}> ADD! 
                    </button>
                }
            </div>
          </div>
        </section>
    );
};
