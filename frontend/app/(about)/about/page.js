"use client";
import ImageViewer from "@/components/about/image-viewer";

import { useState, useEffect } from 'react';

function Profile() {
    return (
        <div className="sticky top-0 w-full md:w-1/3 mb-8 text-center md:text-left">
            {/* Profile Image and Name */}
            <div className="mb-8 text-center">
                <img
                    src="/me-m.jpeg"
                    alt="Profile Image"
                    className="w-32 h-32 mx-auto rounded-full object-cover"
                />
                <h2 className="text-3xl font-semibold mt-4">
                    Mario Nageh <span className="text-xs">(Alchemist)</span>
                </h2>
                <p className="text-xl text-gray-400">Senior Software Developer</p>

                <div className="flex justify-center space-x-8 mt-2">
                    <a
                        href="https://www.linkedin.com/in/marionageh/"
                        className="text-blue-500 hover:text-blue-300"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        LinkedIn
                    </a>
                    <a
                        href="https://github.com/MarioNageh"
                        className="text-blue-500 hover:text-blue-300"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        GitHub
                    </a>
                </div>
            </div>
        </div>
    );
}

function MobileNotSupported() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center text-center bg-gray-900 text-white p-4">
            <div className="max-w-md">
                <h2 className="text-3xl font-bold mb-4">Mobile App Not Supported</h2>
                <p className="text-lg mb-6">
                    We apologize, but our ATS Cracker application is currently optimized for desktop browsers.
                    Please access the application from a desktop or laptop computer for the best experience.
                </p>
                <div className="bg-red-600 text-white p-3 rounded-lg">
                    <p className="font-semibold">Recommended Minimum Screen Width: 1024px</p>
                </div>
            </div>
        </div>
    );
}

export default function AboutPage() {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 1024);
        };

        // Check initial width
        checkMobile();

        // Add event listener to check on resize
        window.addEventListener('resize', checkMobile);

        // Cleanup listener
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    if (isMobile) {
        return <MobileNotSupported />;
    }

    return (
        <div className="text-white min-h-screen px-8 py-12">
            <h1 className="text-4xl font-bold mb-8 text-center">
                ATS Cracker - Bypass ATS System with Avg 96-100% Score
            </h1>

            <section className="bg-dark py-20">
                <div className="container flex md:flex-row gap-8  ">
                    {/* Profile Section */}
                    <Profile/>

                    {/* Content Section */}
                    <div className="w-full md:w-2/3 ">
                        <section className="mb-8">
                            <div className="grid gap-8 md:grid-cols-2">
                                <div className="overflow-hidden rounded-xl">
                                    <img
                                        src="/ats2.png"
                                        alt="gallery image"
                                        className="w-full object-cover object-center"
                                    />
                                </div>

                                <div className="overflow-hidden rounded-xl">
                                    <img
                                        src="/ats1.png"
                                        alt="gallery image"
                                        className="w-full object-cover object-center"
                                    />
                                </div>
                            </div>
                        </section>

                        <p className="text-2xl font-bold mb-2 text-center">
                            This Results From <span> </span>
                            <span>
                                <a
                                    href="https://www.jobscan.co/"
                                    className="text-blue-500 hover:text-blue-300 underline"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    JobScan
                                </a>
                            </span>
                            <span> and </span>
                            <span>
                                <a
                                    href="https://www.resumego.net/"
                                    className="text-blue-500 hover:text-blue-300 underline"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    ResumeGo
                                </a>
                            </span>
                        </p>

                        <p className="text-2xl mb-4 text-center">
                            Your Cv Now Is Json Object <span className={"text-xs"}>[GPT Is Looking For You] 👀 👀</span>
                        </p>

                        <p className="text-xl font-semibold mb-12 text-center text-gray-200">
                            <span className="block text-3xl font-extrabold mb-4
                            text-pink-500">Some of the features of the ATS Cracker:</span>
                            <div className="rounded-2xl p-6 shadow-lg">
                                <ul className="list-none space-y-4 text-left pl-4">
                                    <li className="text-lg text-gray-300">
                                        <span className="font-bold text-pink-500">1-</span> Convert your CV to JSON
                                        object.
                                    </li>
                                    <li className="text-lg text-gray-300">
                                        <span className="font-bold text-pink-500">2-</span> Convert your JSON object to
                                        CV.
                                    </li>
                                    <li className="text-lg text-gray-300">
                                        <span className="font-bold text-pink-500">3-</span> Save your CV as PDF.
                                    </li>
                                    <li className="text-lg text-gray-300">
                                        <span className="font-bold text-pink-500">4-</span> Download your CV as JSON
                                        object.
                                    </li>
                                    <li className="text-lg text-gray-300">
                                        <span className="font-bold text-pink-500">5-</span> Download your CV as PDF.
                                    </li>
                                    <li className="text-lg text-gray-300">
                                        <span className="font-bold text-pink-500">6-</span> You can duplicate your CV
                                        via paste JSON object.
                                    </li>
                                </ul>
                            </div>
                        </p>

                        <section className="mb-8">
                            <ImageViewer/>
                        </section>

                    </div>
                </div>
            </section>
        </div>
    );
}