import React, { useState, useEffect } from "react";
import Spinner from "../components/Spinner";
import Home from "../pages/home/index";

export default function Index() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
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
