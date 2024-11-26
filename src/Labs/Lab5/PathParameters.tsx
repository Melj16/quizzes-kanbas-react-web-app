import React, { useState } from "react";
const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
export default function PathParameters() {
    const [a, setA] = useState("34");
    const [b, setB] = useState("23");
    return (
        <div>
            <h3>Path Parameters</h3>
            <input className="form-control mb-2" id="wd-path-parameter-a" type="number" defaultValue={a}
                onChange={(e) => setA(e.target.value)} />
            <input className="form-control mb-2" id="wd-path-parameter-b" type="number" defaultValue={b}
                onChange={(e) => setB(e.target.value)} />
            <a className="btn btn-primary me-2" id="wd-path-parameter-add"
                href={`${REMOTE_SERVER}/lab5/add/${a}/${b}`}>
                Add {a} + {b}
            </a>
            <a className="btn btn-danger me-2" id="wd-path-parameter-subtract"
                href={`${REMOTE_SERVER}/lab5/subtract/${a}/${b}`}>
                Substract {a} - {b}
            </a>
            <a className="btn btn-warning me-2" id="wd-path-parameter-multiply"
                href={`${REMOTE_SERVER}/lab5/multiply/${a}/${b}`}>
                Multiply {a} * {b}
            </a>
            <a className="btn btn-info me-2" id="wd-path-parameter-divide"
                href={`${REMOTE_SERVER}/lab5/divide/${a}/${b}`}>
                Divide {a} / {b}
            </a>
            <hr />
        </div>
    );
}
