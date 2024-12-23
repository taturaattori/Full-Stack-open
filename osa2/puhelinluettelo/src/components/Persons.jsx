import Person from "./Person";

const Persons = ({ persons }) => {
  return (
    <div>
      {persons.map((person) => (
        <Person name={person.name} number={person.number} key={person.name} />
      ))}
    </div>
  );
};

export default Persons;
