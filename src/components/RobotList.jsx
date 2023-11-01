import React, { useState } from 'react';
import axios from 'axios';

const RobotList = () => {
  const [inputQuery, setInputQuery] = useState('');
  const [robotStrs, setRobotStrs] = useState([]);
  const url = `https://robohash.org`;
  const onSubmitForm = async (e) => {
    e.preventDefault();
    setRobotStrs([...robotStrs, inputQuery]);
    setInputQuery('');
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
      }}
    >
      <form onSubmit={onSubmitForm}>
        <input
          type='text'
          placeholder='Generate Robot'
          onChange={(e) => setInputQuery(e.target.value)}
          value={inputQuery}
        />
        <button type='submit'>Enter</button>
      </form>
      {robotStrs.map((item, idx) => (
        <img
          key={idx}
          src={`${url}/${item}`}
          width={200}
          height={200}
          onClick={() => setRobotStrs((prev) => prev.filter((i) => i != item))}
        />
      ))}
    </div>
  );
};

export default RobotList;
