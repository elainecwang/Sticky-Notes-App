import {useState, useEffect} from 'react';
import NoteCard from '../components/NoteCard.jsx';
import { useContext } from 'react';
import { NoteContext } from '../context/NoteContex.jsx';
import Controls from '../components/Controls.jsx';

const NotesPages = () => {

    const {notes} = useContext(NoteContext);

    return <div>
        {notes.map(note => (
            <NoteCard key = {note.$id} note = {note} />
        ))}

        <Controls />
    </div>;
};

export default NotesPages;