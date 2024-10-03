/*
Given the following React component that displays a list of grocery items, each with a name, cost, and quantity, complete the following tasks:

Implement the logic for buttons that increase and decrease the quantity of each grocery item.
Display the total cost of all items based on their quantities and costs.
Add an input field for the user to set their budget. When the total cost exceeds the budget, log the amount by which the total cost exceeds the budget.
*/ 


import { useEffect, useState, useMemo, useSyncExternalStore } from 'react'
import '../App.css'


const initialGroceries = [
    {name: "Apples",cost: 4.50,count: 1},
    {name: "Bananas",cost: 3.25,count: 1},
    {name: "Eggs",cost: 6.00,count: 1},
    {name: "Bread",cost: 4,count: 1}
]

function Cart() 
{
    const [groceries, setGroceries] = useState(initialGroceries)
    const [total, setTotal] = useState(0);
    const [budget, setBudget] = useState(0);
    let diff = 0;
    function handleDecrement(index)
    {
        let dupGroceries = [...initialGroceries];
        if(dupGroceries[index].count > 0)
            dupGroceries[index].count -= 1;
        setGroceries(dupGroceries);
        setTotal(getTotal());
    }

    function handleIncrement(index)
    {
        let dupGroceries = [...initialGroceries];
        dupGroceries[index].count += 1;
        setGroceries(dupGroceries);
        setTotal(getTotal());
    }


    function getTotal()
    {
        let totalCost = 0;
        for(let i in initialGroceries)
        {
            let itemTotal = initialGroceries[i].count * initialGroceries[i].cost;
            totalCost += itemTotal;
        }
        return totalCost;
    }

    function handleBudget(e)
    {
        setBudget(e.target.value);
        diff = total - e.target.value;
        console.log(diff);
    }

    useEffect(()=>
    {
        setTotal(getTotal());
    },[total])

    return (
        <div className='grocery-tile-list'>
            {groceries.map(({name, cost, count}, idx) => (
            <div key={name} className='grocery-tile'>
                <div className='grocery-tile-left'>
                <span className='grocery-tile-name'>
                    {name}
                </span>
                <span className='grocery-tile-cost'>
                    ${cost}
                </span>
                </div>
                <div className='grocery-tile-right'>
                {/* Task 1 */}
                <button className='remove-button' onClick={()=>handleDecrement(idx)}>-</button>
                    {count}
                <button className='add-button' onClick={()=>handleIncrement(idx)}>+</button>
                </div>
            </div>
            ))}
            <div>
            {/* Task 2 */}
            Total cost: {total}
            </div>
            <div>
            {/* Task 3 */}
            <input placeholder='Budget' type='number' className='budget-input' onChange={(e)=>{handleBudget(e)}} value={budget}/>
            </div>
        </div>
    )
}

export default Cart
