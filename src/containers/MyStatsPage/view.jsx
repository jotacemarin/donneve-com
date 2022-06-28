import LayoutAdmin from "../../components/LayoutAdmin";
import PieGraph from "../../components/PieGraph";

export const MyStatsPage = ({ user, isAdmin }) => {
  const dataset = [
    { label: "Red", data: 12 },
    { label: "Blue", data: 19 },
    { label: "Yellow", data: 3 },
    { label: "Green", data: 5 },
    { label: "Purple", data: 2 },
    { label: "Orange", data: 3 },
  ];

  return (
    <LayoutAdmin isAdmin={isAdmin}>
      <PieGraph label="# of Votes" dataset={dataset} />
    </LayoutAdmin>
  );
};

export default MyStatsPage;
