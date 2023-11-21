import { useState } from "react";
import "./App.css";
import allContacts from "./contacts.json";

function App() {
  // const contactArray = allContacts.shift();
  const [contacts, setContacts] = useState(allContacts.slice(0, 4));

  const handleAddContact = () => {
    const contactIndex = Math.floor(Math.random() * allContacts.length);
    const contactToAdd = allContacts.splice(contactIndex, 1);
    const clone = JSON.parse(JSON.stringify(contacts));

    clone.unshift(contactToAdd[0]);
    setContacts(clone);
  };

  const handleSortByName = () => {
    const clone = JSON.parse(JSON.stringify(contacts));

    clone.sort((a, b) => {
      if (a.name[0] > b.name[0]) {
        return 1;
      } else {
        return -1;
      }
    });
    console.log(clone);
    setContacts(clone);
  };

  const handleSortByPopularity = () => {
    const clone = JSON.parse(JSON.stringify(contacts));

    clone.sort((a, b) => {
      if (a.popularity > b.popularity) {
        return -1;
      } else {
        return 1;
      }
    });
    console.log(clone);
    setContacts(clone);
  };

  const handleDelete = (contactToDelete) => {
    const filteredContacts = contacts.filter((eachContact) => {
      if (eachContact.id !== contactToDelete) {
        return true;
      }
    });
    setContacts(filteredContacts);
  };
  return (
    <div className="App">
      <h1>LAB | React IronContacts</h1>
      <button onClick={() => handleAddContact()}>Add Random Contact</button>
      <button onClick={() => handleSortByName()}>Sort by name</button>
      <button onClick={() => handleSortByPopularity()}>
        Sort by popularity
      </button>
      {contacts.map((eachContact, index) => {
        return (
          <div key={index}>
            <div></div>
            <table id="table">
              <tr>
                <th>Picture</th>
                <th>Name</th>
                <th>Popularity</th>
                <th>Won an Oscar</th>
                <th>Won an Emmy</th>
              </tr>
              <tr>
                <td>
                  <img
                    src={eachContact.pictureUrl}
                    alt={eachContact.name}
                    width="100px"
                  />
                </td>
                <td>{eachContact.name}</td>
                <td>{eachContact.popularity}</td>
                {eachContact.wonOscar === true && <td>🏆</td>}
                {eachContact.wonEmmy === true && <td>🌟</td>}
                <td>
                  <button onClick={() => handleDelete(eachContact.id)}>
                    Borrar
                  </button>
                </td>
              </tr>
            </table>
          </div>
        );
      })}
    </div>
  );
}

export default App;
