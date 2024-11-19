import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import Appbar from '../components/ui/appbar';
import './globals.css';

export const metadata: Metadata = {
    title: 'Taska',
    description: 'Task manager by me for me with ai & cool shit',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>
                <Appbar />
                {children}
            </body>
        </html>
    );
}
