import { useSchoolInformation } from "../hooks/queries/useSchoolInformation.js";

const SchoolInformation = () => {
  const { data: schoolInformation } = useSchoolInformation();

  return schoolInformation;
};

export default SchoolInformation;
