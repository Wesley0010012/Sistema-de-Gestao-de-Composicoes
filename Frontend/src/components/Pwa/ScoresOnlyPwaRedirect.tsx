import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { isPwaStandalone } from "../../utils/pwa/register-service-worker";

export function ScoresOnlyPwaRedirect() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (isPwaStandalone() && location.pathname.startsWith("/admin")) {
      navigate("/", { replace: true });
    }
  }, [location.pathname, navigate]);

  return null;
}
