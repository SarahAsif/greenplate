// src/components/Spinner.js
import React from "react";
import { ClipLoader } from "react-spinners";

const Spinner = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <ClipLoader color="#000000" size={50} />
    </div>
  );
};

export default Spinner;
