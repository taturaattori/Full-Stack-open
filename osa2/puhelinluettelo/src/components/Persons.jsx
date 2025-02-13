import Person from "./Person";

const Persons = ({ persons, handleDelete }) => {
  return (
    <div>
      {persons.map((person) => (
        <div key={person.id}>
          <Person
            name={person.name}
            number={person.number}
            id={person.id}
            handleDelete={handleDelete}
          />
          <button onClick={() => handleDelete(person)}>delete</button>
        </div>
      ))}
    </div>
  );
};

export default Persons;
