import React from "react";
import { useRouter } from "next/router";

const Home = () => {
  const router = useRouter();
  const userId = 1;
  const handleButtonClick = () => {
    router.push(`/user/${userId}`);
  };
  return (
    <>
      <h1>Welcome to Homie</h1>
      <p>This is the Home page.</p>
      <div>
        <button onClick={handleButtonClick}>
          Go to User Profile: {userId}
        </button>
      </div>
    </>
  );
};

export default Home;
