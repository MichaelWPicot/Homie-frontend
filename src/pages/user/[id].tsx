import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/main/layout';

interface User {
    id: number;
    firstName: string;
    lastName: string;
    lastModifiedDateTime: Date;
}
 export const getStaticPaths = async () => {
    const res = await fetch(`http://localhost:5190/users/`);
    const data = await res.json();

    const paths = data.map((user: User) => {
        return {
            params : {id: user.id.toString()}
        }
    })
    return {
        paths,
        fallback: false
    }

}
export const getStaticProps = async ({ params }) => {
    try {
        const id = params?.id;
        const res = await fetch(`http://localhost:5190/users/`+ id);
        const user = await res.json();
        return {
            props: {user}
        }
    }
    catch (err) {
        return {props:{errors:err.message}}
    }



}
const UserProfile = ({user}) => {
    return (
        <Layout>
            <h1>Your Profile</h1>
            {user ? (
                <div key={user?.id}>
                    <p>Name: {user?.firstName} {user?.lastName}</p>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </Layout>
    );
}

export default UserProfile;
