import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { getCookie } from "../../utils/cookie";

const FlexBox = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

function PageLogin(): JSX.Element {
  const navigate = useNavigate();

  useEffect(() => {
    if (getCookie("access_token")) navigate("/main");
  }, []);

  return (
    <FlexBox>
      <div style={{ border: "1px solid black", padding: "1rem" }}>
        <a href="https://api.intra.42.fr/oauth/authorize?client_id=u-s4t2ud-62523bb6bbc18595e16bdef10cc5405a4de82ca9381c82ff17572a72aae7bab6&redirect_uri=https%3A%2F%2F518e-121-135-181-34.jp.ngrok.io%2F&response_type=code">
          LOGIN
        </a>
      </div>
    </FlexBox>
  );
}

export default PageLogin;
