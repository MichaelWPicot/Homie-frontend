import React, { ReactNode } from 'react';
import Header from './header';
import Footer from './footer';

interface LayoutProps {
    children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
    return (
        <div className="bg-white h-screen">
            <Header />
                <main className="m-5">
                    {children}
                </main>
            <Footer />
        </div>
    );
}

export default Layout;