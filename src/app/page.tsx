import AdminLogin from "./auth/login/page"
import AdminDashboard from "./dashboard/page"; 

export default function Home() {
  return (
    <div>
      <AdminLogin />
      <AdminDashboard /> 
    </div>
  );
}

