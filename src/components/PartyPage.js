import React, { useEffect, useState } from "react";
import axios from "axios";
import NewNameModal from "./NewName";
import AddItem from "./AddItem";
import axiosWithAuth from "../services/axiosWithAuth";

function PartyPage(props) {
  const token = localStorage.getItem("token");
  const guestNameItem = localStorage.getItem("name");
  const [items, setItems] = useState([]);
  const [guestName, setGuestName] = useState(guestNameItem);

  useEffect(() => {
    axios
      .get(
        `https://potluck-planning-app.herokuapp.com/api/items/${props.match.params.party_id}`
      )
      .then((res) => {
        setItems(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleClick = (item_index, party_item_id) => {
    const { completed, person_bringing } = items[item_index];
    const newName = person_bringing ? "" : guestName;
    const newCompleted = completed ? false : true;

    axios
      .put(
        `https://potluck-planning-app.herokuapp.com/api/items/update/${party_item_id}`,
        {
          completed: newCompleted,
          person_bringing: newName,
        }
      )
      .then((res) => {
        setItems(
          items.map((element, i) => {
            if (item_index === i) {
              element[completed] = newCompleted;
              element.person_bringing = newName;
              return element;
            } else {
              return element;
            }
          })
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const guestNameInput = (input) => {
    localStorage.setItem("name", input);
    setGuestName(input);
  };

  const handleAddItem = (newItemName) => {
    let newItem = {
      completed: false,
      person_bringing: null,
      item_name: newItemName,
    };
    axiosWithAuth()
      .post(
        `https://potluck-planning-app.herokuapp.com/api/items/${props.match.params.party_id}`,
        newItem
      )
      .then((res) => {
        setItems([...items, res.data]);
        console.log(items);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //Use Effect to see if name or token exists in local storage. if it doesn't have a pop that has confetti, "you've been inivited to "x session". What's your name?
  return (
    <div className="">
      <h2 className="text-3xl">Party Name</h2>
      <p>Select the items you're going to bring</p>
      {token && <AddItem handleAddItem={handleAddItem} />}
      <div className="flex flex-wrap w-full justify-center">
        {items.map((item, index) => {
          return (
            <div
              onClick={(e) => handleClick(index, item.party_item_id)}
              className={`h-36 w-64 border m-5 shadow-xl ${
                item.person_bringing ? "bg-green-300" : "bg-white"
              } relative flex flex-col justify-center align-center cursor-pointer`}
            >
              {item.person_bringing && (
                <p className="absolute inset-x-0 top-3 text-xl">
                  {item.person_bringing} is bringing the...
                </p>
              )}
              <h4 className="m-6 font-bold text-2xl">{item.item_name}</h4>
            </div>
          );
        })}
      </div>
      {!guestName && <NewNameModal guestNameInput={guestNameInput} />}
    </div>
  );
}

export default PartyPage;
