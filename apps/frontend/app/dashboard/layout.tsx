import React from "react";
import SideNav from "../zap/create/sidenav";
import { Appbar } from "../../components/Appbar";

const user = {
    name: "Chisty",
    email: "chisty@gmail.com",
    avatar: '../../albert-dera-ILip77SbmOE-unsplash.jpg' // Replace with the correct path to the image
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex min-h-screen">
            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                {/* App Bar */}
                <Appbar />

                <div className="flex">
                    {/* SideNav */}
                    <SideNav user={user} />

                    {/* Page Content */}
                    <div className="flex-1 flex flex-col">
                        {/* Header Section */}
                        <header className="bg-white shadow p-6">
                            <h1 className="text-2xl font-bold text-gray-800">Welcome to your dashboard</h1>
                            <p className="text-gray-600">Follow the steps to automate your workflow seamlessly.</p>
                        </header>

                        {/* Page Content */}
                        <main className="flex-1 p-6">
                            {children}
                        </main>
                    </div>
                </div>
            </div>
        </div>
    );
}
