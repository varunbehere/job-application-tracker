import React, { useState, useEffect } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../Context/AppContext";
import { useLocation } from "react-router-dom";

function Form() {
  const navigate = useNavigate();
  const [organisation, setOrganisation] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("");
  const [date, setDate] = useState("");
  const [file, setFile] = useState(null);
  const [link, setLink] = useState("");
  const [notes, setNotes] = useState("");
  const { applications, addApplication } = useAppContext();

  const isSaveDisabled = !organisation || !role || !status || !date || !link;
  const location = useLocation();
  const isEditing = location.state.isEditing;

  useEffect(() => {
    if (isEditing) {
      const applicationId = location.state.applicationId;
      const application = applications.find(
        (application) => application.applicationId === applicationId
      );
      if (application) {
        setOrganisation(application.organisation);
        setRole(application.role);
        setStatus(application.status);
        setDate(application.date);
        setLink(application.link);
        setNotes(application.notes);
      }
    }
  }, [isEditing, location.state, applications]);

  function reset() {
    setOrganisation("");
    setRole("");
    setStatus("");
    setDate("");
    setFile(null);
    setLink("");
    setNotes("");
  }

  function onSubmitHandler(e) {
    e.preventDefault();
    const currentForm = {
      applicationId: Date.now(),
      organisation,
      role,
      status,
      date,
      file,
      link,
      notes,
    };
    addApplication(currentForm);
    reset();
  }

  return (
    <div className="flex justify-center pt-20">
      <div className="flex flex-col justify-center w-[700px] min-h-[300px] bg-gray-700 p-8 rounded-lg shadow-lg space-y-3">
        <div className="flex mb-3 justify-between">
          <p className="italic text-xl font-semibold mb-1">Add a content</p>
          <button
            className="flex items-center italic text-md mb-1"
            onClick={() => navigate("/")}
          >
            <IoMdArrowRoundBack />
            Navigate Back
          </button>
        </div>

        <form onSubmit={onSubmitHandler} className="space-y-3">
          <div className="flex flex-col">
            <label
              htmlFor="organisation"
              className="italic text-sm text-gray-400 mb-1"
            >
              Organisation {isEditing && "(Read Only)"}
            </label>
            <input
              id="organisation"
              placeholder="Enter Organisation"
              readOnly={isEditing}
              value={organisation}
              onChange={(e) => setOrganisation(e.target.value)}
              type="text"
              required
              className="bg-gray-800 p-2 rounded-lg shadow-md focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="role" className="italic text-sm text-gray-400 mb-1">
              Role {isEditing && "(Read Only)"}
            </label>
            <input
              id="role"
              placeholder="Enter Role"
              readOnly={isEditing}
              value={role}
              onChange={(e) => setRole(e.target.value)}
              type="text"
              required
              className="bg-gray-800 p-2 rounded-lg shadow-md focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="flex flex-row space-x-4">
            <div className="flex flex-col">
              <label
                htmlFor="status"
                className="italic text-sm text-gray-400 mb-1"
              >
                Current status
              </label>
              <select
                id="status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                required
                className="bg-gray-800 p-2 rounded-lg shadow-md focus:ring-2 focus:ring-blue-400"
              >
                <option value="">Select current status</option>
                <option value="Applied">Applied</option>
                <option value="Screening">Screening</option>
                <option value="Test">Test</option>
                <option value="Interviewing">Interviewing</option>
                <option value="Offered">Offered</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="date"
                className="italic text-sm text-gray-400 mb-1"
              >
                Date Applied
              </label>
              <input
                id="date"
                placeholder="Pick a date"
                type="date"
                readOnly={isEditing}
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
                className="bg-gray-800 p-2 rounded-lg shadow-md focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="file"
                className="italic text-sm text-gray-400 mb-1"
              >
                File or JD
              </label>
              <input
                id="file"
                type="file"
                onChange={(e) => setFile(e.target.files[0])}
                className="bg-gray-800 p-2 rounded-lg shadow-md focus:ring-2 focus:ring-blue-400"
              />
            </div>
          </div>

          <div className="flex flex-col">
            <label htmlFor="link" className="italic text-sm text-gray-400 mb-1">
              Portal Link
            </label>
            <input
              id="link"
              placeholder="Enter Portal Link"
              type="url"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              required
              className="bg-gray-800 p-2 rounded-lg shadow-md focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="notes"
              className="italic text-sm text-gray-400 mb-1"
            >
              Notes
            </label>
            <textarea
              id="notes"
              placeholder="Enter Notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={4}
              className="bg-gray-800 p-2 rounded-lg shadow-md focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="flex justify-center w-full space-x-6">
            <button
              type="submit"
              className="bg-green-600 w-full rounded-md shadow-md p-2 text-white disabled:bg-gray-400"
              disabled={isSaveDisabled}
            >
              Submit or Update
            </button>

            <button
              type="button"
              className="bg-red-600 w-full rounded-md shadow-md p-2 text-white"
              onClick={reset}
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Form;
