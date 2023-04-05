export const createUserFromUID = async (username, Email, Password,objectId,userId) => {
    const data = {username, Email, Password,objectId,userId};
    const response = await fetch(
      `http://localhost:8000/classifie/api/CreateUser`,
      {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json","AuthToken":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYWRtaW4iLCJ1c2VybmFtZSI6ImRhbWluZHUifQ.B8BvnQhFGX7QMJzsSH8z5mJwss3YdpHpSBH7M9Zia4kasda" },
      }
    );
    const user = await response.json();
    return user;
  };

  export const logUser = async (username, Password) => {
    const data = {username, Password};
    const response = await fetch(
      `http://localhost:8000/classifie/api/Login`,
      {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json","AuthToken":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYWRtaW4iLCJ1c2VybmFtZSI6ImRhbWluZHUifQ.B8BvnQhFGX7QMJzsSH8z5mJwss3YdpHpSBH7M9Zia4kasda" },
      }
    );
    const user =  response.json();
    return user;
  };