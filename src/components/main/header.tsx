import React from 'react';
import Link from 'next/link';

const Header = () => {
    return (
        <header>
            <nav>
                <ul>
                    <li><Link href="/"><a>Home</a></Link></li>
                    <li><Link href="/about"><a>About</a></Link></li>
                    <li><Link href="/contact"><a>Contact</a></Link></li>
                    <li><Link href="/user"><a>Profile</a></Link></li>
                    <li><Link href="/groups"><a>Groups</a></Link></li>
                    <li><Link href="/tasks"><a>Tasks</a></Link></li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;
