import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PATH_UPLOAD } from "../../utils/routes";

export const DonneveCom = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate(PATH_UPLOAD);
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, []);

  return <>Redirect</>;
};

export default DonneveCom;
