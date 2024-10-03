/*
Given the following React component that displays a list of grocery items, each with a name, cost, and quantity, complete the following tasks:

Implement the logic for buttons that increase and decrease the quantity of each grocery item.
Display the total cost of all items based on their quantities and costs.
Add an input field for the user to set their budget. When the total cost exceeds the budget, log the amount by which the total cost exceeds the budget.
*/ 


import React, { useEffect, useState, useMemo } from 'react'
import './App.css'

type Grocery = {
  name: string;
  cost: number;
  count: number;
}

const initialGroceries: Grocery[] = [
  {
    name: "Apples",
    cost: 4.50,
      count: 1
  },
  {
    name: "Bananas",
    cost: 3.25,
    count: 1
  },
  {
    name: "Eggs",
    cost: 6.00,
    count: 1
  },
  {
    name: "Bread",
    cost: 4,
    count: 1
  }
]

function App() {
  const [groceries, setGroceries] = useState<Grocery[]>(initialGroceries)
  // const [budget, setBudget] = useState(0);
  // const [totalCost, setTotalCost] = useState(0);


  // let total = 0;
  // for(let i in initialGroceries)
  // {
  //   let currItem = initialGroceries[i];
  //   let currItemCost = currItem.cost * currItem.count;
  //   total += currItemCost;
  // }



  // function handleBudget(e)
  // {
  //   setBudget(e.target.value);

  // }

  // useEffect(()=>
  // {
  //   let diff = total - budget;
  //   console.log(diff);
  // },[budget])

  return (
    <div className='grocery-tile-list'>
        {groceries.map(({name, cost, count}) => (
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
              <button className='remove-button'>-</button>
                {count}
              <button className='add-button' >+</button>
            </div>
          </div>
        ))}
        <div>
          {/* Task 2 */}
          Total cost: {total}
        </div>
        <div>
          {/* Task 3 */}
          <input placeholder='Budget' type='number' className='budget-input' /*onChange={(e)=>{handleBudget(e)}} value={budget}*//>
        </div>
    </div>
  )
}

export default App
