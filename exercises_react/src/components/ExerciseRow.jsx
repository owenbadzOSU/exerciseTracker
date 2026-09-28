import DeleteRow from "./deleteRow";
import EditRow from "./EditRow";

function ExerciseRow({exercise, onDelete, onEdit}){
    return (
        
        <tr>
            <td>{exercise.name}</td>
            <td>{exercise.reps}</td>
            <td>{exercise.weight}</td>
            <td>{exercise.unit}</td>
            <td>{exercise.date}</td>
            <td><DeleteRow exercise= {exercise} onDelete= {onDelete} ></DeleteRow></td>
            <td><EditRow exercise= {exercise} onEdit= {onEdit}></EditRow></td>
        </tr>
    
    );
}

export default ExerciseRow