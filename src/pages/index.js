import Home from "../pages/home/index";
import React, { useState, useEffect } from "react";
import Spinner from "../components/Spinner";

export default function Index() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate a loading process, like fetching data
    setTimeout(() => {
      setLoading(false);
    }, 2000); // Adjust the timeout as needed
  }, []);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div className="mt-20">
          <Home />
        </div>
      )}
    </>
  );
}
