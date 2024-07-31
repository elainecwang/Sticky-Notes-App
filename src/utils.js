// sets new offset for top and left based on boundaries
export const setNewOffset = (card, mouseMoveDir = {x: 0, y: 0}) => {
    const offsetLeft = card.offsetLeft - mouseMoveDir.x;
    const offsetTop = card.offsetTop - mouseMoveDir.y;
    
    // if out of bounds, return 0, else return original value
    return {
        x: offsetLeft < 0 ? 0 : offsetLeft,
        y: offsetTop < 0 ? 0 : offsetTop,
    };
};

// auto-grows height of card to space needed
export function autoGrow(textAreaRef) {
    const { current } = textAreaRef;
    current.style.height = "auto";      // reset height
    current.style.height = current.scrollHeight + "px";   // set new height
};

// brings card you click on forward
export const setZIndex = (selectedCard) => {
    selectedCard.style.zIndex = 999;
    
    // pushes other cards back when click on card
    Array.from(document.getElementsByClassName("card")).forEach((card) => {
        if (card !== selectedCard) {
            card.style.zIndex = selectedCard.style.zIndex - 1;
        }
    });
};

// if data JSON, then parse, otherwise return string value itself
export const bodyParser = (value) => {  
    try {
        return JSON.parse(value);
    } catch(error) {
        return value;
    }
}