import React from "react";
import SideNav from "./sidenav";
import { Appbar } from "../../../components/Appbar";

const user = {
    name: "Chisty",
    email: "chisty@gmail.com",
    avatar: '../../albert-dera-ILip77SbmOE-unsplash.jpg'
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex min-h-screen">
            <div className="flex-1 flex flex-col">
                <Appbar />
                <div className="flex">
                    <SideNav user={user} />
                    <div className="flex-1 flex flex-col">
                        <header className="bg-white shadow p-6">
                            <h1 className="text-2xl font-bold text-gray-800">Let's Create Your First Zap!</h1>
                            <p className="text-gray-600">Follow the steps to automate your workflow seamlessly.</p>
                        </header>
                        <main className="flex-1 p-6">
                            {children}
                        </main>
                    </div>
                </div>
            </div>
        </div>
    );
}
