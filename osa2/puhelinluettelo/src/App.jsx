import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Notification from "./components/Notification";
import personService from "./services/personService";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [keyword, setKeyword] = useState("");
  const [message, setMessage] = useState(null);

  useEffect(() => {
    personService
      .getAll()
      .then((initialPersons) => {
        console.log("promise fulfilled");
        setPersons(initialPersons);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);

  console.log("render", persons.length, "persons");

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const addPerson = (event) => {
    event.preventDefault();
    const newPerson = {
      name: newName,
      number: newNumber,
    };
    const checkName = persons.find(({ name }) => name === newPerson.name);
    if (checkName !== undefined && checkName.number === newPerson.number) {
      alert(`${newName} is already added to phonebook`);
    } else if (
      checkName !== undefined &&
      checkName.number !== newPerson.number
    ) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        const updatedPerson = { ...checkName, number: newNumber };
        personService
          .update(checkName.id, updatedPerson)
          .then((returnedPerson) => {
            setPersons(
              persons.map((p) => (p.id !== checkName.id ? p : returnedPerson))
            );
          })
          .catch((error) => {
            console.log(error.message);
          });
      }
    } else {
      personService
        .create(newPerson)
        .then((returnedPerson) => {
          setPersons(persons.concat(returnedPerson));
          setMessage(`Added ${returnedPerson.name}`);
          setTimeout(() => {
            setMessage(null);
          }, 5000);
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
    setNewName("");
    setNewNumber("");
  };

  const deletePerson = (person) => {
    if (window.confirm(`Delete ${person.name}?`))
      personService
        .remove(person.id)
        .then((res) => {
          console.log(res);

          setPersons(persons.filter((p) => p.id !== person.id));
          setMessage(`Deleted ${person.name}`);
          setTimeout(() => {
            setMessage(null);
          }, 5000);
        })
        .catch((error) => {
          console.log(error.message);
        });
  };

  const handleKeywordChange = (event) => {
    setKeyword(event.target.value);
  };

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(keyword.toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <Filter keyword={keyword} handleChange={handleKeywordChange} />

      <h3>Add a new</h3>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />

      <h3>Numbers</h3>

      <Persons persons={filteredPersons} handleDelete={deletePerson} />
    </div>
  );
};

export default App;
