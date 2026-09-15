import React from "react";
import { Link } from "react-router-dom";

const notauth = () => {
  return (
    <div className="flex-col justify-center gap-5 h-screen flex items-center">
      <h1 className="text-xl">You are not authorized</h1>
      <Link
        className="rounded-2xl text-bone hover:shadow-2xl shadow-egg-dark duration-300 hover:scale-105 active:scale-95 bg-swamp-green py-2 px-5"
        to="/"
      >
        Home
      </Link>
    </div>
  );
};

export default notauth;
