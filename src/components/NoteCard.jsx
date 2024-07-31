import {useRef, useEffect, useState} from 'react';
import { db } from '../appwrite/databases';
import DeleteButton from './DeleteButton';
import { jsx } from 'react/jsx-runtime';
import { setNewOffset, autoGrow, setZIndex, bodyParser } from '../utils';
import Spinner from '../icons/Spinner';
import { useContext } from 'react';
import { NoteContext } from '../context/NoteContex';

const NoteCard = ({note}) => {
    const [saving, setSaving] = useState(false);
    const keyUpTimer = useRef(null);
    const body = bodyParser(note.body); 
    const [position, setPosition] = useState(JSON.parse(note.position));
    const colors = JSON.parse(note.colors);
    const textAreaRef = useRef(null);
    const {setSelectedNote} = useContext(NoteContext);

    let mouseStartPos = { x: 0, y: 0 };
    const cardRef = useRef(null);

    useEffect(() => {
        autoGrow(textAreaRef);

        // brings new created note to front 
        setZIndex(cardRef.current);
    }, []); 

    // captures starting x and y position of the mouse and listens for mousemove events
    const mouseDown = (e) => {
        if (e.target.className === "card-header") {
            mouseStartPos.x = e.clientX ;
            mouseStartPos.y = e.clientY;

            document.addEventListener("mousemove", mouseMove);
            document.addEventListener("mouseup", mouseUp);

            // bring card forward when click on it
            setZIndex(cardRef.current);

            // sets the selected note to note clicked
            setSelectedNote(note);
        }
    };

    const mouseMove = (e) => {
        // calculate move direction
        let mouseMoveDir = {
            x: mouseStartPos.x - e.clientX,
            y: mouseStartPos.y - e.clientY, 
        };

        // update start position for next move
        mouseStartPos.x = e.clientX;
        mouseStartPos.y = e.clientY;
        const newPosition = setNewOffset(cardRef.current, mouseMoveDir);
        
        // update card top and left positions to move card
        setPosition(newPosition);
    };

    const mouseUp = () => {
        document.removeEventListener("mousemove", mouseMove);
        document.removeEventListener("mouseup", mouseUp);

        // saves position so its kept when website refreshed
        const newPosition = setNewOffset(cardRef.current);
        saveData('position', newPosition);
    };

    // function to save data of notes for when refreshed
    const saveData = async (key, value) => {
        const payload = {[key]: JSON.stringify(value)};

        try {
            await db.notes.update(note.$id, payload);
        } catch(error) {
            console.error(error);
        }

        setSaving(false);
    };

    // saves data 2 seconds after last letter typed
    const handleKeyUp = () => {
        // initiates saving state
        setSaving(true);

        // if have timer ID, clear so can add another 2 seconds
        if (keyUpTimer.current) {
            clearTimeout(keyUpTimer.current);
        }

        // sets timer to  sav in 2 seconds
        keyUpTimer.current = setTimeout(() => {
            saveData("body", textAreaRef.current.value);
        }, 2000);
    };

    return (
        <div 
            ref={cardRef}
            className = "card" 
            style = {{
                backgroundColor: colors.colorBody,
                left: `${position.x}px`,
                top: `${position.y}px`,
            }}
        >

        {/** card header */}
        <div 
            onMouseDown={mouseDown}
            className="card-header" 
            style={{backgroundColor: colors.colorHeader}}
        >
            {/** Trash Icon */}
            <DeleteButton noteId={note.$id} />

            {/** Saving + Spinner Icon */}
            {saving && (
                <div className="card-saving">
                    <Spinner color = {colors.colorText} />
                    <span style={{ color: colors.colorText }}>
                        Saving...
                    </span>
                </div>
            )}
        </div> 

        {/** card body */}
        <div className = "card-body">
            <textarea
                ref={textAreaRef}
                style={{ color: colors.colorText }}
                defaultValue={body}
                onInput={() => {autoGrow(textAreaRef)}}     // gets rid of scroll bar by auto-growing note
                onKeyUp={handleKeyUp}

            // when click on body of card, bring card fwd and set selected note
                onFocus={() => {
                    setZIndex(cardRef.current);
                    setSelectedNote(note);
                }}
            ></textarea>
        </div>
    </div> 
    );

};

export default NoteCard;