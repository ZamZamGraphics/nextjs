import { useRouter } from "next/router";
import { useEffect } from "react";
// import jwtDecode from "jwt-decode";
import setAuthToken from "@/utils/setAuthToken";

const PrivateRoute = ({ children }) => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    // const decode = jwtDecode(token);
    if (token) {
      setAuthToken(token);
    } else {
      router.push("/login");
    }
  }, [router]);

  return <>{children}</>;
};

export default PrivateRoute;
