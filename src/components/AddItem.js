import React, { useState } from "react";

function AddItem(props) {
  const [formValue, setFormValue] = useState("");

  const handleChange = (e) => {
    setFormValue(e.target.value);
  };

  const handleSubmit = (e) => {
    console.log("works");
    e.preventDefault();
    props.handleAddItem(formValue);
  };

  return (
    <div className="flex justify-center mt-5">
      <form className="w-full max-w-sm  p-2">
        <div className="flex items-center border-b border-teal-500 py-2">
          <input
            className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
            type="text"
            placeholder="Add another item"
            aria-label="Full name"
            onChange={handleChange}
          />
          <button
            className="flex-shrink-0 bg-purple-500 text-sm text-white py-1 px-2 rounded ml-3"
            type="button"
            onClick={handleSubmit}
          >
            Add Item
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddItem;
