const Filter = ({ keyword, handleChange }) => {
  return (
    <div>
      filter shown with
      <input value={keyword} onChange={handleChange} />
    </div>
  );
};

export default Filter;
