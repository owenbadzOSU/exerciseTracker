import {useNavigate} from 'react-router-dom';
import { Link } from 'react-router-dom';
import ExerciseTable from '../components/ExerciseTable';
import { useState, useEffect} from 'react';


function HomePage({setExerciseToEdit}){
    const [exercises, setExercises] = useState([]);
    const navigate = useNavigate();

    const loadExercises = async () => {
        const response = await fetch('/exercises');
        const exercises = await response.json();
        setExercises(exercises);
    }

    useEffect(() => {
        loadExercises(); 
    }, []);


    const onDelete = async _id => {
        const response = await fetch(`/exercises/${_id}`, { method: 'DELETE' });
        if (response.status === 204) {
            const getResponse = await fetch('/exercises');
            const exercises = await getResponse.json();
            setExercises(exercises);
        } else {
            alert(`Failed to delete exercise with id = ${_id}, status code = ${response.status}`)
        }
    }

    const onEdit = async exerciseToEdit => {
        setExerciseToEdit(exerciseToEdit);
        navigate("/edit"); 
    }

    return (
        <>
            <h2>Exercise Chart</h2>
            <ExerciseTable exercises={exercises} onDelete={onDelete} onEdit={onEdit} ></ExerciseTable>
            
        </>
    );
}

export default HomePage