import React from 'react';
import { useRouter } from 'next/router';

import Layout from '../components/main/layout';

const Home = () => {
  const router = useRouter();
  const userId = 1; 
  const handleButtonClick = () => {
    router.push(`/user/${userId}`);
  }
    return (
        <Layout>
            <h1>Welcome to Homie</h1>
            <p>This is the Home page.</p>
            <div>
               <button onClick={handleButtonClick}>Go to User Profile: {userId}</button>
            </div>
        </Layout>
    );
}

export default Home;
