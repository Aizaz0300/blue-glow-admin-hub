
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (token) {
      navigate("/");
    } else {
      navigate("/login");
    }
  }, [navigate]);

  return null;
};

export default Index;
