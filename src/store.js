export const initialStore=()=>{
  return{
    message: null,
    todos: [
      {
        id: 1,
        title: "x",
        background: null,
      },
      {
        id: 2,
        title: "y",
        background: null,
      }
    ],
        contacts: []
  }
}

export default function storeReducer(store, action = {}) {
  switch(action.type){
    case 'add_task':

      const { id,  color } = action.payload

      return {
        ...store,
        todos: store.todos.map((todo) => (todo.id === id ? { ...todo, background: color } : todo))
      };
    // case 'delete_contact':
    //   const { indexToDelete } = action.payload
    //   console.log("delete_contact INSIDE STORE indexToDelete: " + indexToDelete)

    //   return {
    //     ...store,
    //     contacts: store.contacts.filter((contact, index)=> index != indexToDelete)
    //   };
      case 'load_contacts':

      return {
        ...store,
        contacts: action.payload
      };
    default:
      throw Error('Unknown action.');
  }    
}
