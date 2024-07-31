import React from 'react';
import { useContext } from 'react';
import { NoteContext } from '../context/NoteContex';
import { db } from '../appwrite/databases';

const Color = ({color}) => {
    const {selectedNote, notes, setNotes} = useContext(NoteContext);

    const changeColor = () => {
        try {
            // finds specific note
            const currNoteIndex = notes.findIndex(
                (note) => note.$id === selectedNote.$id
            );

            // updates color of note
            const updatedNote = {
                ...notes[currNoteIndex],
                colors: JSON.stringify(color),
            };

            const newNotes = [...notes];
            newNotes[currNoteIndex] = updatedNote;
            setNotes(newNotes);

            // saves updated colors
            db.notes.update(selectedNote.$id, {colors: JSON.stringify(color)});

        } catch(error) {
            alert("You must select a note before changing colors");
        };
    };

    return (
        <div 
            className='color'
            onClick={changeColor}
            style = {{backgroundColor:color.colorHeader}}
        ></div>
    ); 
};

export default Color;
