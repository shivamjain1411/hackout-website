import React, { useState } from 'react'
import "../../src/App.css";

const PatientsForm = () => {
    const [title, setTitle] = useState('');
    const [load, setLoad] = useState();
    const [reps, setReps] = useState('');
    const [error, setError] = useState(null);
    const [emptyFields, setEmptyFields] = useState([]);
    const handleSubmit = async (e) => {
        e.preventDefault()
        const workout = { title, load, reps }
        const response = await fetch('/api/workouts', {
            method: 'POST',
            body: JSON.stringify(workout),
            headers: {
                'Content-type': 'application/json'
            }
            //headers is very important for some reason 
        })
        const json = await response.json();
        if (!response.ok) {
            setError(json.error);
            setEmptyFields(json.emptyFields);
            setTimeout(() => setError(null), 2000);
            // to show empty fields and error 
        }
        if (response.ok) {
            // to reset the values to default 
            setError(null);
            setTitle('');
            setReps('');
            setLoad(0);
            console.log('new workout added', json);
        }
         
    }

    return (
        <>
            <div className="container">
                <h2>Patients Form</h2>
                <form onSubmit={handleSubmit} className="my-form">
                    <div className="form-group row">
                        <label htmlFor="exercise" className="col-sm-3 col-form-label">
                            Name of the Patient*
                        </label>
                        <div className="col-sm-9">
                            <input
                                type="text"
                                // className="form-control custom-input"
                                className={emptyFields.includes('title') ? 'error form-control custom-input' : 'form-control custom-input'}
                                id="exercise"
                                placeholder="Patient"
                                onChange={(e) => setTitle(e.target.value)}
                                value={title}
                            />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="loads" className="col-sm-3 col-form-label">
                            Age (in yrs)
                        </label>
                        <div className="col-sm-9">
                            <input
                                type="number"
                                className="form-control custom-input"
                                id="loads"
                                placeholder="Age"
                                onChange={(e) => setLoad(e.target.value)}
                                value={load}
                            />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="reps" className="col-sm-3 col-form-label">
                            Disease*
                        </label>
                        <div className="col-sm-9 mt-2">
                            <input
                                type="text"
                                // className="form-control custom-input"
                                className={emptyFields.includes('reps') ? 'error form-control custom-input' : 'form-control custom-input'}
                                id="reps"
                                placeholder="Disease"
                                onChange={(e) => setReps(e.target.value)}
                                value={reps}
                            />
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary">
                        Submit
                    </button>
                </form>
                {error && <div className="error-message">{error}</div>
}
            </div>
        </>
    );
}

export default PatientsForm