import React from "react";

const Card = ({ name, email, gender, age }) => {
  return (
    <div className="flex flex-col ">
      <div>Name: {name}</div>
      <div>Email: {email} </div>
      <div>Gender: {gender}</div>
      <div>Age: {age}</div>
    </div>
  );
};

export default Card;
