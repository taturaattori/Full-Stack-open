const Header = (props) => {
  return <h1>{props.course.name}</h1>;
};

const Part = (props) => {
  return (
    <p>
      {props.name} {props.excercises}
    </p>
  );
};

const Content = (props) => {
  const parts = props.course.parts;
  return (
    <>
      <Part name={parts[0].name} excercises={parts[0].excercises} />
      <Part name={parts[1].name} excercises={parts[1].excercises} />
      <Part name={parts[2].name} excercises={parts[2].excercises} />
    </>
  );
};

const Total = (props) => {
  const parts = props.course.parts;
  const count = parts[0].excercises + parts[1].excercises + parts[2].excercises;
  return <p>Number of exercises {count}</p>;
};

const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      { name: "Fundamentals of React", excercises: 10 },
      { name: "Using props to pass data", excercises: 7 },
      { name: "State of a component", excercises: 14 },
    ],
  };

  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </div>
  );
};

export default App;
