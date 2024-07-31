import NotesPages from "./pages/NotesPage"
import NoteProvider from "./context/NoteContex"

function App() {
  return (
    <div id="app">
      <NoteProvider>
        <NotesPages />
      </NoteProvider>
    </div>
  );
}

export default App
