import React from "react";
import { MdOutlineModeEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { useAppContext } from "../Context/AppContext";
import { useNavigate } from "react-router-dom";

function CardComponent({
  applicationId,
  status,
  organisation,
  role,
  portalLink,
  dateApplied,
}) {
  const statusColors = {
    Applied: "bg-blue-400",
    Screening: "bg-yellow-400",
    Test: "bg-yellow-400",
    Interviewing: "bg-yellow-400",
    Offered: "bg-green-600",
    Rejected: "bg-red-700",
  };
  const navigate = useNavigate();
  const { applications, deleteApplication } = useAppContext();
  const statusColor = statusColors[status];

  return (
    <>
      <div className="bg-gray-800 p-5 m-4 rounded-lg w-80 shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <div className="inline-flex pr-3 items-center bg-gray-100 rounded-full text-black p-1 space-x-1 shadow-sm">
            <div
              className={`flex items-center justify-center rounded-full w-5 h-5 ${statusColor}`}
            />
            <p className="text-sm font-medium">{status}</p>
          </div>
          <div className="flex space-x-5">
            <button
              onClick={() =>
                navigate("/form", { state: { isEditing: true, applicationId } })
              }
            >
              <MdOutlineModeEdit className="text-gray-400" />
            </button>
            <button onClick={() => deleteApplication(applicationId)}>
              <MdDelete className="text-gray-400" />
            </button>
          </div>
        </div>
        <div className="mb-2">
          <p className=" italic text-sm text-gray-400">Organisation</p>
          <h1 className="text-xl font-semibold">{organisation}</h1>
        </div>
        <div className="mb-2">
          <p className=" italic text-sm text-gray-400">Role</p>
          <h1 className="text-xl font-semibold">{role}</h1>
        </div>
        <div className="mb-2">
          <p className=" italic text-sm text-gray-400">Portal Link</p>
          <a
            className="text-xl text-blue-400 hover:underline"
            target="_blank"
            href={portalLink}
          >
            Visit Portal
          </a>
        </div>
        <div>
          <p className="italic text-sm text-gray-400">Date Applied</p>
          <h1 className="text-xl font-semibold text-white">{dateApplied}</h1>
        </div>
      </div>
    </>
  );
}

export default CardComponent;
