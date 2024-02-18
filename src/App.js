import "./App.css";
import React, { Component } from "react";
import Signup from "./Components/Signup";
import Login from "./Components/Login";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { auth, messageRef, roomRef } from "./fire";
import "bulma/css/bulma.css";
import MainPanel from "./Components/Mainpanel";
import { Side } from "./Components/Sidebar";
import ChatPanel from "./Components/ChatPanel";
import { set, push } from "firebase/database";

class App extends Component {
  state = {
    isLoggedIn: false,
    wantsToLogIn: false,
    email: "",
    uid: null,
    rooms: {},
    selectedRoom: null,
    messages: {},
  };

  loadData = () => {
    roomRef
      .once("value")
      .then((snapshot) => {
        const rooms = snapshot.val();
        const selectedRoom = Object.keys(rooms)[0];
        this.setState({
          rooms,
          selectedRoom,
        });
        return messageRef
          .orderByChild("roomId")
          .equalTo(selectedRoom)
          .once("value");
      })
      .then((snapshot) => {
        const messages = snapshot.val() || {};
        this.setState({
          messages,
        });
      })
      .catch((err) => console.error(err));
  };

  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        const { email, uid } = user;
        this.setState({
          email,
          uid,
          isLoggedIn: true,
        });
        this.loadData();
        roomRef.on("value", (snapshot) => {
          const rooms = snapshot.val();
          this.setState({
            rooms,
          });
        });
        messageRef.on("child_added", (snapshot) => {
          const message = snapshot.val();
          const key = snapshot.key;
          if (message.roomId === this.state.selectedRoom) {
            this.setState({
              messages: {
                ...this.state.messages,
                [key]: message,
              },
            });
          }
        });
      }
    });
  }
  handleSignUp = ({ email, password }) => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .catch((err) => console.error(err));
  };

  handleLogin = ({ email, password }) => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then((user) => {
        const { email, uid } = user;
        this.setState({
          isLoggedIn: true,
          email,
          uid,
        });
      })
      .catch((err) => console.error(err));
  };

  logout = (e) => {
    auth.signOut().then(() => {
      this.setState({
        email: "",
        uid: null,
        isLoggedIn: false,
      });
    });
  };
  setRoom = (id) => {
    messageRef
      .orderByChild("roomId")
      .equalTo(id)
      .once("value")
      .then((snapshot) => {
        const messages = snapshot.val() || {};
        this.setState({
          selectedRoom: id,
          messages,
        });
      })
      .catch((err) => console.error(err));
  };
  setRoom = (id) => {
    messageRef
      .orderByChild("roomId")
      .equalTo(id)
      .once("value")
      .then((snapshot) => {
        const messages = snapshot.val() || {};
        this.setState({
          selectedRoom: id,
          messages,
        });
      })
      .catch((err) => console.error(err));
  };

  addRoom = (roomName) => {
    const room = {
      author: this.state.uid,
      name: roomName,
      created: Date.now(),
    };
    push(roomRef, room);
  };
  sendMessage = (message) => {
    push(messageRef, message);
  };
  render() {
    return (
      <div className="columns vh-100 is-gapless" style={{ padding: "10px" }}>
        <Side
          logout={this.logout}
          rooms={this.state.rooms}
          selectedRoom={this.state.selectedRoom}
          setRoom={this.setRoom}
          addRoom={this.addRoom}
        />

        {this.state.isLoggedIn ? (
          <MainPanel>
            <ChatPanel
              messages={this.state.messages}
              roomId={this.state.selectedRoom}
              email={this.state.email}
              uid={this.state.uid}
              sendMessage={this.sendMessage}
            />
          </MainPanel>
        ) : (
          <MainPanel>
            {this.state.wantsToLogIn ? (
              <Login
                onLogin={this.handleLogin}
                gotoSignUp={() => this.setState({ wantsToLogIn: false })}
              />
            ) : (
              <Signup
                onSignUp={this.handleSignUp}
                gotoLogin={() => this.setState({ wantsToLogIn: true })}
              />
            )}
          </MainPanel>
        )}
      </div>
    );
  }
}

export default App;
