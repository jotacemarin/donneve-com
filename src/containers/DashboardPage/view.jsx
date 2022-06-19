import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LayoutAdmin from "../../components/LayoutAdmin";
import { PATH_COMMANDS, PATH_MY_STATS } from "../../utils/routes";

export const DashboardPage = ({ isAdmin }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (isAdmin !== null) {
      const newRoute = isAdmin ? PATH_COMMANDS : PATH_MY_STATS;
      navigate(newRoute);
    }
  }, [isAdmin, navigate]);

  return (
    <LayoutAdmin isAdmin={isAdmin}>
      <p>Loading...</p>
    </LayoutAdmin>
  );
};

export default DashboardPage;