import { MdDeleteForever} from 'react-icons/md';

function DeleteRow({exercise, onDelete}){
    return (
        <div>
            <MdDeleteForever onClick={() => onDelete(exercise._id)} />
        </div>
        
        
    );
}

export default DeleteRow