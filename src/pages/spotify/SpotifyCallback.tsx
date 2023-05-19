import { useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { Buffer } from "buffer";
import SpotifyLoginAPI from "../../api/SpotifyLoginApi";

const SpotifyCallback = () => {
  const { code } = useParams<{ code: string }>();
  const params = new URLSearchParams(window.location.pathname);
  const code1 = params.get("code");
  const [searchParams] = useSearchParams();
  const code2 = searchParams.get("code");
  useEffect(() => {
    console.log(code);
    console.log("code1:", code1);
    console.log("searchParams:", searchParams.get("code"));
    callback();
  }, []);

  const callback = async () => {
    let client_id = import.meta.env.VITE_CLIENT_ID;
    let client_secret = import.meta.env.VITE_CLIENT_SECRET;
    let redirect_uri = import.meta.env.VITE_REDIRECT_URI;

    const tokenResponse = await fetch(
      "https://accounts.spotify.com/api/token",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization:
            "Basic " +
            Buffer.from(client_id + ":" + client_secret).toString("base64"),
        },
        body:
          "grant_type=authorization_code&code=" +
          code2 +
          "&redirect_uri=" +
          redirect_uri,
      }
    ).then((response) => response.json());

    console.log(tokenResponse);

    const refreshTokenResponse = tokenResponse.refresh_token;
    const accessTokenResponse = tokenResponse.access_token;
    let request = {
      refreshToken: refreshTokenResponse,
      accessToken: accessTokenResponse,
    };
    const saveRes = await SpotifyLoginAPI.saveRefreshToken(
      request
    );
    console.log("save Res:", saveRes);
    window.location.href = "/"; 
  };

  return <div>{/* <h1>SpotifyCallback</h1> */}</div>;
};

export default SpotifyCallback;
