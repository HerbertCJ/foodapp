import {RiDeleteBin6Line} from "react-icons/ri"

import { useState } from 'react'
import './Food.css'


export default function Food() {
    const [sections, setSections] = useState([])
    const [sectionName, setSectionName] = useState('')
    const [food, setFood] = useState('')    

    function addSection(e) {
        e.preventDefault();
        if (sectionName === '') return;
        const newSection = {
            id: new Date().getTime(),
            name: sectionName,
            foodList: [],
        }
        setSections([...sections, newSection])
    }

    function handleChange(e) {
        setSectionName(e.target.value)
    }

    function addFood(id) {
        if (food.length === 0) return;

        const updatedSection = [...sections].map((sec) => {
            if (sec.id === id) {
                const flag = sec.foodList.indexOf(food)
                if (flag === -1) {
                    sec = {
                        id: id,
                        name: sec.name,
                        foodList: [...sec.foodList, food],
                    }
                }
            }
            return sec;
        })
        setSections(updatedSection)
        setFood('')
    }

    function removeItem(idSec, index) {
        const removeItems = [...sections].map((sec) => {
            if (sec.id === idSec) {
                sec.foodList.splice(index, 1)
            }
            return sec;
        })
        setSections(removeItems)
    }


    return (
        <div>
            <div className="addSection">                
                <h1>Add here a section to start</h1>
                <form action="#" onSubmit={addSection}>
                    <select onChange={handleChange} value={sectionName}>
                        <option value="">Choose your options</option>
                        <option value="Breakfast">Breakfast</option>
                        <option value="Morning Snack">Morning Snack</option>
                        <option value="Lunch">Lunch</option>
                        <option value="Afternoon Snack">Afternoon Snack</option>
                        <option value="Dinner">Dinner</option>
                        <option value="Night Snack">Night Snack</option>
                        <option value="Snack">Snack</option>
                    </select>
                    <button>Add</button>
                </form>
            </div>
            <div className="app">
                {sections.map((section) => (
                    <div className="section" key={section.id}>
                        {section.name}                        
                        <button className="addFood" onClick={() => addFood(section.id)}>Add Food</button>                                             
                        <input type="text" className="addFood" onChange={(e) => setFood(e.target.value)} />
                        {section.foodList.map((item, index) => (
                            <div key={item} className="items">
                                {item}
                                <RiDeleteBin6Line onClick={() => removeItem(section.id, index)} className="deleteBtn" />
                            </div>

                        ))}
                    </div>
                ))}
            </div>

        </div>
    )
}