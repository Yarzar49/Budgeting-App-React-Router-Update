// rrd imports
import { useLoaderData } from "react-router-dom";

//Library
import { toast } from "react-toastify";

//  helper functions
import { fetchData } from "../helpers";
import { Intro } from "../components/Intro";

// loader
export function dashboardLoader() {
  const userName = fetchData("userName");
  return { userName };
}

//action
export async function dashboardAction({ request }) {
  const data = await request.formData();
  const formData = Object.fromEntries(data);
  try {
    // throw new Error("Ya done")
    localStorage.setItem("userName", formData.userName);
    return toast.success(() => (
      <div>
        Welcome, <span className="bold-toast-message">{formData.userName}</span>
      </div>
    ));
  } catch (err) {
    throw new Error(
      "There was a problem creating the your account. Please try again"
    );
  }
}

const Dashboard = () => {
  const { userName } = useLoaderData();

  return <div>{userName ? <p>{userName}</p> : <Intro />}</div>;
};
export default Dashboard;
