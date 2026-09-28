import { MdEdit} from 'react-icons/md';

function EditRow({exercise, onEdit}){
    return (
        <div>
            <MdEdit onClick={() => onEdit(exercise)} />
        </div>
        
        
    );
}

export default EditRow