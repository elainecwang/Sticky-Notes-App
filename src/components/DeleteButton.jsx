import React from 'react';
import Trash from '../icons/Trash';
import { db } from '../appwrite/databases';
import { useContext } from 'react';
import { NoteContext } from '../context/NoteContex';

const DeleteButton = ({noteId}) => {

    const {setNotes} = useContext(NoteContext);

    const handleDelete = async () => {
        // deletes note from database
        db.notes.delete(noteId);
        
        // checks note id, deletes if current note id = note id
        setNotes((prevState) =>
            prevState.filter((note) => note.$id !== noteId)
        );
    };

    return (
        <div onClick={handleDelete}>
            <Trash />
        </div>
    );
};

export default DeleteButton;
