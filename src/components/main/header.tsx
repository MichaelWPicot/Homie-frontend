import React from 'react';
import Link from 'next/link';

const Header = () => {
    return (
        <header className="bg-blue-600 p-4 text-white shadow-md">
            <nav>
                <ul className="flex justify-center space-x-8">
                    <li><Link href="/"><span className="hover:text-blue-300 transition duration-150 ease-in-out">Home</span></Link></li>
                    <li><Link href="/about"><span className="hover:text-blue-300 transition duration-150 ease-in-out">About</span></Link></li>
                    <li><Link href="/contact"><span className="hover:text-blue-300 transition duration-150 ease-in-out">Contact</span></Link></li>
                    <li><Link href="/user"><span className="hover:text-blue-300 transition duration-150 ease-in-out">Profile</span></Link></li>
                    <li><Link href="/groups"><span className="hover:text-blue-300 transition duration-150 ease-in-out">Groups</span></Link></li>
                    <li><Link href="/tasks"><span className="hover:text-blue-300 transition duration-150 ease-in-out">Tasks</span></Link></li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;