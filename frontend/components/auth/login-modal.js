'use client';
import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { EmailIcon, PasswordIcon } from "@/components/svgs/svgs";
import InputField from "@/components/auth/modals-input";
import * as ServerActions from "@/actions/login";
import {showErrorAlert} from "@/lib/alerts";
import useAppContext from "@/hooks/useAppContext";


export default function LoginModal({ onChangeModal,closeModal }) {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [showPassword, setShowPassword] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { login } = useAppContext();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);



        const message = await ServerActions.login(formData);
        if (message.success) {
            // Login successful
            login({
                email: formData.email,
                username: message.username,
            })
            closeModal()

        } else {
            // Login failed
            showErrorAlert(message.message);
        }
        setIsSubmitting(false);


    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
            <Dialog.Panel
                className="w-full max-w-md transform overflow-hidden
                rounded-2xl bg-white p-6 text-left align-middle shadow-xl
                transition-all pt-6 sm:p-12 sm:pt-8 md:min-h-min
                md:min-w-[500px] md:p-14 md:pt-10 lg:p-16 lg:pt-16
                relative top-0 my-auto"
            >
                <Dialog.Title
                    as="h1"
                    className="text-primaryBlack mt-6 flex text-[28px] font-bold sm:mt-10
                     sm:text-[32px] md:mt-4 md:justify-center md:text-[38px]"
                >
                    Login
                </Dialog.Title>

                <form onSubmit={handleSubmit} className="mt-10 lg:mt-12">

                    {/*Email Input*/}
                    <InputField
                        id="emailId"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        label="Email"
                        Icon={EmailIcon}
                        disabled={isSubmitting}
                    />

                    {/*Password Input*/}
                    <div className="relative mt-10 lg:mt-12">
                        <InputField
                            id="passwordId"
                            type={showPassword ? "text" : "password"}
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            label="Password"
                            Icon={PasswordIcon}
                            disabled={isSubmitting}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            disabled={isSubmitting}
                            className="absolute right-0 top-[58%] -translate-y-1/2 cursor-pointer text-base font-bold hover:opacity-80"
                        >
                            {showPassword ? "Hide" : "Show"}
                        </button>
                    </div>

                    <div className="flex justify-between items-center mt-10 lg:mt-12">
                        <button
                            type="button"
                            onClick={onChangeModal}
                            className="text-blue-600 hover:underline"
                        >
                            Create New Account
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
                        >
                            {isSubmitting ? "Logging In..." : "Login"}
                        </button>
                    </div>
                </form>
            </Dialog.Panel>
        </div>
    );
}
