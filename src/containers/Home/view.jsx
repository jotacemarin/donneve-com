import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { PATH_UPLOAD } from "../../utils/routes";

export const App = () => {
  const navigate = useNavigate();
  const { search } = useLocation();

  useEffect(() => {
    navigate(`${PATH_UPLOAD}${search}`);
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, []);

  return <>Redirect</>;
};

export default App;
