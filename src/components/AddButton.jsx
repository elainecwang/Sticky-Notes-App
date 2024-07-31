import Plus from '../icons/Plus';
import colors from '../assets/colors.json';
import { useRef } from 'react';
import { db } from '../appwrite/databases';
import { useContext } from 'react';
import { NoteContext } from '../context/NoteContex';

const AddButton = () => {
    const {setNotes} = useContext(NoteContext);
    const startingPos = useRef(10);

    const addNote = async () => {
        // create initial state for note
        const payload = {
            position: JSON.stringify({
                x: startingPos.current,
                y: startingPos.current
            }),
            colors: JSON.stringify(colors[0]),
        };

        // moves card to side so no overlap
        startingPos.current += 10;

        const response = await db.notes.create(payload);
        setNotes((prevState) => [response, ...prevState]);
    };

    return (
        <div id="add-btn" onClick={addNote}>
            <Plus />
        </div>
    );
};

export default AddButton;
