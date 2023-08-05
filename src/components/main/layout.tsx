import { ReactNode } from 'react';
import Link from 'next/link';

interface LayoutProps {
    children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
    return (
        <>
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

            <main>
                {children}
            </main>

            <footer>
                <p>Homie - 2023 Front End Implementation</p>
            </footer>
        </>
    );
}

export default Layout;