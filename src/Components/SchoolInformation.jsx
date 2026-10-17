import { useEffect, useState } from "react";
import { getSchoolInformation } from "../requests/settingsRequests.js";

const SchoolInformation = () => {
  const [schoolInformation, setSchoolInformation] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchSchoolInformation = async () => {
      try {
        const response = await getSchoolInformation();

        if (isMounted) {
          // The controller returns { data: schoolInformation }.
          setSchoolInformation(response.data ?? response);
        }
      } catch (error) {
        console.error("Failed to load school information:", error);
      }
    };

    fetchSchoolInformation();

    return () => {
      isMounted = false;
    };
  }, []);

  return schoolInformation;
};

export default SchoolInformation;
