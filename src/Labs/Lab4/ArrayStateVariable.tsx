import React, { useState } from "react";
export default function ArrayStateVariable() {
    const [array, setArray] = useState([1, 2, 3, 4, 5]);
    const addElement = () => {
        setArray([...array, Math.floor(Math.random() * 100)]);
    };
    const deleteElement = (index: number) => {
        setArray(array.filter((item, i) => i !== index));
    };
    return (
        <div id="wd-array-state-variables" className="d-inline-block">
            <h2>Array State Variable</h2>
            <button type="button" className="btn btn-success my-2" onClick={addElement}>Add Element</button>
            <ul className="list-group">
                {array.map((item, index) => (
                    <li className="list-group-item h5 m-0 border"
                        key={index}>
                        <div className="d-flex justify-content-between">
                            <div>
                                {item}
                            </div>
                            <div>
                                <button type="button" className="btn btn-danger"
                                    onClick={() => deleteElement(index)}
                                    id="wd-delete-element-click">
                                    Delete</button>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
            <hr />
        </div>
    );
}
