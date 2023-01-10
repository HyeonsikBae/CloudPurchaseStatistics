import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getCookie } from "../utils/cookie";

function PageLogin(): JSX.Element {
  const navigate = useNavigate();

  useEffect(() => {
    if (getCookie("access_token")) navigate("/main");
  }, []);

  return (
    <div>
      <a href="https://api.intra.42.fr/oauth/authorize?client_id=u-s4t2ud-62523bb6bbc18595e16bdef10cc5405a4de82ca9381c82ff17572a72aae7bab6&redirect_uri=http%3A%2F%2Flocalhost%3A4000%2Fmain&response_type=code">
        LOGIN
      </a>
    </div>
  );
}

export default PageLogin;
