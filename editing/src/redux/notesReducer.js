import { v4 as uuidv4 } from 'uuid';
import { APPEND_NOTE, EDIT_NOTE, DELETE_NOTE } from "./actions";

const initialState = {
  notesList: [
    {
      id: "1",
      text: "Замена стекла",
      price: 21000,
    }
  ],
};

const notesReducer = (state = initialState, action) => {
  switch (action.type) {
    case APPEND_NOTE:
      return {
        ...state,
        notesList: [
          ...state.notesList,
          {
            id: uuidv4(),
            text: action.payload.text,
            price: Number(action.payload.price)
          }
        ]
      };

    case EDIT_NOTE:
      return {
        ...state,
        notesList: state.notesList.map(note =>
          note.id === action.payload.id ?
            {
              ...note,
              text: action.payload.text,
              price: Number(action.payload.price)
            } : note
        )
      };

    case DELETE_NOTE:
      return {
        ...state,
        notesList: state.notesList.filter(item => item.id !== action.payload.id)
      };
      
    default:
      return state;
  }
};

export default notesReducer;