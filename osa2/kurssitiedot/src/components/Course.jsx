const Header = ({ course }) => {
  return <h2>{course.name}</h2>;
};

const Part = (props) => {
  return (
    <p>
      {props.name} {props.exercises}
    </p>
  );
};

const Content = ({ course }) => {
  const parts = course.parts;
  return (
    <div>
      {parts.map((part) => (
        <Part name={part.name} exercises={part.exercises} key={part.id} />
      ))}
    </div>
  );
};

const Total = ({ course }) => {
  const parts = course.parts;
  const count = parts.reduce((prev, current) => prev + current.exercises, 0);
  return (
    <p>
      <b>total of {count} exercises</b>
    </p>
  );
};

const Course = ({ course }) => {
  return (
    <>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </>
  );
};

export default Course;
