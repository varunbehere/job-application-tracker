import { createContext, useContext, useState, useEffect } from "react";

const AppContext = createContext({
  applications: [],
  addApplication: (newApplication) => {},
  deleteApplication: (applicationId) => {},
  editApplication: (applicationId, application) => {},
});

const useAppContext = () => {
  return useContext(AppContext);
};
const AppProvider = ({ children }) => {
  const [applications, setApplications] = useState(() => {
    const savedApplications = localStorage.getItem("applications");
    return savedApplications ? JSON.parse(savedApplications) : [];
  });

  useEffect(() => {
    localStorage.setItem("applications", JSON.stringify(applications));
  }, [applications]);

  const addApplication = (newApplication) => {
    setApplications([...applications, newApplication]);
  };

  const deleteApplication = (applicationId) => {
    setApplications(
      applications.filter(
        (application) => application.applicationId !== applicationId
      )
    );
  };

  const editApplication = (applicationId, updatedApplication) => {
    setApplications(
      applications.map((application) => {
        if (application.id === applicationId) {
          return {
            ...application,
            updatedApplication,
          };
        }
        return application;
      })
    );
  };

  return (
    <AppContext.Provider
      value={{
        applications,
        addApplication,
        deleteApplication,
        editApplication,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider, useAppContext };
