import React from "react";
import useMockData from "../utils/mockData";

const Main = () => {
  const { error, inicialize, status, progress } = useMockData();
  const hadleClick = () => {
    inicialize();
  };
  return (
    <div className="container mt-5">
      <h2>Main</h2>
      <h3>Инициализация данных</h3>
      <ul>
        <li>Status: {status}</li>
        <li>Progress: {progress}%</li>
        {error && <li>Error: {error}</li>}
      </ul>
      <button className="btn btn-primary" onClick={hadleClick}>
        Инициализировать
      </button>
    </div>
  );
};

export default Main;
