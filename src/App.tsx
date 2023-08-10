import React, { useState } from 'react';
import './App.css';
import { useSelector, useDispatch } from 'react-redux';
import { UsersData, userdata } from './FakeData';
import { User, UserState, addUser, deleteUser, updateUser } from './features/Users';

function App() {
  const users = useSelector((state: { users: { value: User[] } }) => state.users.value);
  const dispatch = useDispatch();
  const [name, setName] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [newUsername, setNewUsername] = useState<string>('');
  const [userId, setUserId] = useState<number>(UsersData[UsersData.length - 1].id);

  const handler = () => {
    dispatch(addUser({ id: userId + 1, name, username }));
    setUserId(userId + 1);
  };

  return (
    <div className="App">
      <div>
        <input
          type="text"
          placeholder="name"
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <input
          type="text"
          placeholder="username"
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <button onClick={handler}>Add user</button>
      </div>
      <div>
        {users.map((user: User) => {
          return (
            <div key={user.id}>
              <h1>{user.name}</h1>
              <h2>{user.username}</h2>
              <input
                type="text"
                placeholder="update username"
                onChange={(e) => {
                  setNewUsername(e.target.value);
                }}
              />
              <button
                onClick={() => {
                  dispatch(updateUser({ id: user.id, username: newUsername }));
                }}
              >
                update
              </button>
              <button
                onClick={() => {
                  dispatch(deleteUser({ id: user.id }));
                }}
              >
                delete
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
