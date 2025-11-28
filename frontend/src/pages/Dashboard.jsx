import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import StarterDashboard from "./dashboards/StarterDashboard";
import ProDashboard from "./dashboards/ProDashboard";
import EnterpriseDashboard from "./dashboards/EnterpriseDashboard";

export default function Dashboard({ bots }) {
  const { planChoosen } = useContext(UserContext);

  if (planChoosen === "starter") return <StarterDashboard bots={bots} />;
  if (planChoosen === "pro") return <ProDashboard bots={bots} />;
  if (planChoosen === "enterprise") return <EnterpriseDashboard bots={bots} />;

  return <p className="text-white text-center mt-24">No plan selected.</p>;
}
