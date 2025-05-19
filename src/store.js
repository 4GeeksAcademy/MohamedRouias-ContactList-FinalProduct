export const initialStore = () => {
  return {
    slug: "MohamedRouias",
    contacts: [
      {
        name: "",
        phone: "",
        email: "",
        address: "",
        id: 0
      },
    ]
  }
}

export default function storeReducer(state, action) {
  switch (action.type) {

    case "set_contacts":
      // Reemplaza toda la lista de contactos con los datos traídos de la API
      return {
        ...state,
        contacts: action.payload
      };

    case "add_contact":
      // Añade un nuevo contacto al array existente
      return {
        ...state,
        contacts: [...state.contacts, action.payload]
      };

    case "edit_contact":
      // Reemplaza un contacto existente con uno nuevo usando su ID
      return {
        ...state,
        contacts: state.contacts.map(contact =>
          contact.id === action.payload.id ? action.payload : contact
        )
      };
  
    case "delete_contact":
      // Elimina un contacto por ID
      return {
        ...state,
        contacts: state.contacts.filter(contact => contact.id !== action.payload)
      };


    default:
      return state;
  }
}

