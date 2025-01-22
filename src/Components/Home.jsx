import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import CardComponent from "./CardComponent";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../Context/AppContext";

function Home() {
  const navigate = useNavigate();
  const { applications } = useAppContext();
  const getLocalStorage = JSON.parse(localStorage.getItem("applications"));

  useEffect(() => {}, [applications]);

  console.log(applications);
  return (
    <>
      <div className="pt-20 w-full">
        <button
          className="bg-gray-800 p-6 m-4 rounded-lg w-80 shadow-lg"
          onClick={() => {
            navigate("/form", { state: { isEditing: false } });
          }}
        >
          <div className="flex justify-center mb-4">
            <FaPlus className="text-2xl" />
          </div>
          <h1 className="text-lg text-center font-semibold">Add Content</h1>
        </button>
      </div>
      <div className="flex flex-wrap">
        {applications.map((application) => (
          <CardComponent
            key={application.applicationId}
            applicationId={application.applicationId}
            organisation={application.organisation}
            role={application.role}
            status={application.status}
            dateApplied={application.date}
            portalLink={application.link}
          />
        ))}
      </div>
    </>
  );
}

export default Home;
