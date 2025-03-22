"use client";
import Link from "next/link";
import { FaBug } from "react-icons/fa";
import NavComponent from "@/components/landing/nav-component";
import LoginBtn from "@/components/auth/login";
import AppProvider from "@/context/app-provider";

export default async function Header({ atsClass = 'text-white' }) {
    return (
        <header className="sticky top-0 z-50 w-full bg-black px-3 pt-4 md:px-6 lg:px-2 xl:px-6">
            <div
                className="grid w-full grid-cols-[max-content_max-content] items-center justify-between gap-4 
                 rounded-xl py-3 lg:grid-cols-[max-content_1fr_max-content] lg:px-4 
                 transition-all"
            >
                {/* Name */}
                <Link
                    href="/"
                    className={`ml-4 flex items-center gap-2 text-xl font-semibold ${atsClass}`}
                >
                    <FaBug className="text-red-500" /> Ats~Cracker
                </Link>

                <AppProvider>
                    {/* Navigation */}
                    <NavComponent />
                    {/* Login */}
                    <LoginBtn />
                </AppProvider>
            </div>
        </header>
    );
}
