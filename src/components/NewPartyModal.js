import React from "react";
import axiosWithAuth from "../services/axiosWithAuth";

const initForm = {
  name: "",
  date: "",
  location: "",
  time: "",
};

export default function NewPartyModal(props) {
  const { showModal, setShowModal } = props;

  const [newPartyForm, setnewPartyForm] = React.useState(initForm);

  const handleChange = (e) => {
    setnewPartyForm({
      ...newPartyForm,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    const newParty = {
      //name: newPartyForm.name,
      date: newPartyForm.date,
      location: newPartyForm.location,
      time: newPartyForm.time,
    };
    axiosWithAuth()
      .post("/api/parties", newParty)
      .then((res) => {
        props.setUserParties([...props.userParties, res.data]);
      })
      .catch((err) => {
        console.log(err);
      });
    setShowModal(false);
    setnewPartyForm(initForm);
  };

  return (
    <>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold">Create new party</h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-4 flex-auto">
                  <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
                    What is the name of the party?
                  </p>
                  <input
                    className="border w-full h-12 px-4 text-lg text-gray-700 placeholder-gray-600 border rounded-lg focus:shadow-outline"
                    name="name"
                    onChange={handleChange}
                    value={newPartyForm.name}
                    placeholder="Who are you?"
                  />
                </div>
                <div className="relative py-2 px-3 flex-auto">
                  <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
                    When is the party?
                  </p>
                  <input
                    className="border w-full h-12 px-4 text-lg text-gray-700 placeholder-gray-600 border rounded-lg focus:shadow-outline"
                    name="date"
                    onChange={handleChange}
                    value={newPartyForm.date}
                    placeholder="Who are you?"
                  />
                </div>
                <div className="relative py-2 px-3 flex-auto">
                  <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
                    Where is the party?
                  </p>
                  <input
                    className="border w-full h-12 px-4 text-lg text-gray-700 placeholder-gray-600 border rounded-lg focus:shadow-outline"
                    name="location"
                    onChange={handleChange}
                    value={newPartyForm.location}
                    placeholder="Who are you?"
                  />
                </div>
                <div className="relative py-2 px-3 flex-auto">
                  <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
                    What time is the party?
                  </p>
                  <input
                    className="border w-full h-12 px-4 text-lg text-gray-700 placeholder-gray-600 border rounded-lg focus:shadow-outline"
                    name="time"
                    onChange={handleChange}
                    value={newPartyForm.time}
                    placeholder="Who are you?"
                  />
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end py-2 px-3 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-purple-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={onSubmit}
                  >
                    Save
                  </button>
                  <button onClick={() => setShowModal(false)}>Cancel</button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}
