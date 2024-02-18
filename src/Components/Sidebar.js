import React from "react";
import "bulma/css/bulma.css";
import { RoomList } from "./Roomlist";

const Side = ({ logout, rooms, selectedRoom, setRoom, addRoom }) => {
  return (
    <div className="column is-3 hero is-primary is-paddingless">
      <RoomList
        rooms={rooms}
        selectedRoom={selectedRoom}
        setRoom={setRoom}
        addRoom={addRoom}
      />
      <div className="control">
        <button onClick={logout} className="buttton is-fullwidth">
          Logout
        </button>
      </div>
    </div>
  );
};

export { Side };
