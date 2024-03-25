import { useDispatch, useSelector } from "react-redux";
import { APPEND_NOTE, EDIT_NOTE, DELETE_NOTE } from "../redux/actions";
import { useState } from "react";
import './Notes.css'

const Notes = () => {
  const dispatch = useDispatch();
  const { notesList } = useSelector((state) => state.notes);

  const [noteText, setNoteText] = useState('');
  const [notePrice, setNotePrice] = useState('');
  const [editId, setEditId] = useState('');
  const [filterText, setFilterText] = useState('');

  const handleNotePriceChange = (e) => {
    const value = e.target.value;
    if (Number(value) >= 0) {
      setNotePrice(value);
    }
  };

  const clearInputs = () => {
    setNoteText('');
    setNotePrice('');
  }

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch({
      type: editId ? EDIT_NOTE : APPEND_NOTE,
      payload: {
        id: editId,
        text: noteText,
        price: notePrice,
      },
    });
    clearInputs();
  }

  const editNote = (noteId) => {
    let note = notesList.filter((item) => item.id === noteId)[0]
    if (note) {
      setNoteText(note.text)
      setNotePrice(note.price)
      setEditId(noteId);
    }
  }

  const cancelEdit = () => {
    clearInputs();
    setEditId('');
  }

  const deleteNote = (id) => {
    if (id === editId) {
      setEditId('');
      clearInputs();
    }

    dispatch({
      type: DELETE_NOTE,
      payload: { id: id },
    });
  }

  const filteredNotes = notesList.filter((note) =>
    note.text.toLowerCase().includes(filterText.toLowerCase())
  );

  return (
    <>
      <form onSubmit={submitHandler}>
        <div>
          <input type="text" required placeholder='Задача...' value={noteText}
            onChange={(e) => setNoteText(e.target.value)}
          />
          <input type="number" required placeholder='Цена...' value={notePrice}
            onChange={handleNotePriceChange}
          />
          <button>Save</button>
          {editId && <button onClick={cancelEdit}>Cacnel</button>}
        </div>
      </form>

      <input
        type="text"
        placeholder="Фильтр..."
        value={filterText}
        onChange={(e) => setFilterText(e.target.value)}
      />
      
      <div>
        {filteredNotes.map((note) => (
          <div key={note.id} className="notesList">
            <div>{note.text}</div>
            <div>{note.price}</div>
            <div>
              <button onClick={() => deleteNote(note.id)}>✘</button>
              <button onClick={() => editNote(note.id)}>✎</button>
            </div>
          </div>
        ))}

      </div>
    </>
  )
}

export default Notes;