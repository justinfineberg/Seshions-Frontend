import React, { useEffect, useState } from "react";
import axios from "axios";
import axiosWithAuth from "../services/axiosWithAuth";
import { Link, Route } from "react-router-dom";
import PartyPage from "./PartyPage";
import NewPartyModal from "./NewPartyModal";

function Dashboard(props) {
  const [userParties, setUserParties] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    axiosWithAuth()
      .get("/api/parties")
      .then((res) => {
        setUserParties(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleDelete = (e, party_id) => {
    e.stopPropagation();
    e.preventDefault();
    axiosWithAuth()
      .delete(`api/parties/${party_id}`)
      .then((res) => {
        setUserParties(
          userParties.filter((item) => {
            if (item.party_id !== party_id) {
              return item;
            }
          })
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //wip
  const handleEdit = (e) => {
    e.stopPropagation();
    e.preventDefault();
  };

  return (
    <div className="w-2/3 m-auto">
      <h2 className="font-bold mt-6 text-3xl">Your Upcoming Parties</h2>
      <div>
        <button
          onClick={() => {
            setShowModal(!showModal);
          }}
          className="border rounded lg w-36 bg-purple-300 mt-4"
        >
          Create new Party!
        </button>
        <NewPartyModal
          showModal={showModal}
          setShowModal={setShowModal}
          setUserParties={setUserParties}
          userParties={userParties}
        />
        {userParties.map((item) => {
          return (
            <>
              <Link to={`/party/${item.party_id}`}>
                <div className="w-11/12 m-auto mt-6 h-56 border shadow-xl w-2/3 flex justify-evenly items-center relative cursor-pointer">
                  <div className="top-0 right-0 absolute flex flex-wrap">
                    <div onClick={(e) => handleEdit(e, item.party_id)}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                        />
                      </svg>
                    </div>
                    <div onClick={(e) => handleDelete(e, item.party_id)}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <img
                      className="w-36 rounded-full h-36"
                      src="https://images.unsplash.com/photo-1553356084-58ef4a67b2a7?ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8Y29sb3J8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1100&q=60"
                    />
                  </div>
                  <div className="flex flex-col items-center">
                    <h3 className="text-3xl mb-2 font-bold">Party Name</h3>
                    <div className="bg-gray-200 rounded-md p-1 flex justify-center items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      <p className="font-bold">{item.location}</p>
                    </div>
                    <p>{item.date}</p>
                    <p>@ {item.time}</p>
                  </div>
                </div>
              </Link>
            </>
          );
        })}
      </div>
    </div>
  );
}

export default Dashboard;
