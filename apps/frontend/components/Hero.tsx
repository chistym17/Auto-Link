"use client"
import { useRouter } from "next/navigation"
import { TextGenerateEffect } from "./Animation/texteffect";

export const Hero = () => {
    const router = useRouter();
    return (
        <div className="flex justify-center items-center py-16 ">
            <div className="bg-white rounded-xl shadow-xl p-8 max-w-6xl h-[500px] flex flex-col justify-between">
                <div className="text-center mt-2">
                    <TextGenerateEffect
                        words="Automate Your Workflow with IntegrateIT"
                        className="text-4xl font-extrabold"
                        duration={1}
                    />
                    <p className="text-lg text-gray-600 mt-4">
                        Achieve greater accuracy and speed in automating your workflows with IntegrateIT. Transform your ideas into efficient workflows that drive success.
                    </p>
                </div>

                <div className="flex justify-center pt-8">
                    <div className="flex space-x-4">
                        <button
                            onClick={() => router.push("/signup")}
                            className="bg-custom text-white font-semibold py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors duration-300"
                        >
                            Get Started Free
                        </button>
                        <button
                            onClick={() => router.push("/contact")}
                            className="bg-white text-orange border-custom font-semibold py-3 px-6 border rounded-lg  transition-colors duration-300"
                        >
                            Contact Us
                        </button>
                    </div>
                </div>

                <div className="flex justify-around pt-8">
                    <div className="text-center">
                        <h3 className="text-xl font-bold text-orange">Free Forever</h3>
                        <p className="text-gray-500">For core features</p>
                    </div>
                    <div className="text-center">
                        <h3 className="text-xl font-bold text-orange">More Apps</h3>
                        <p className="text-gray-500">Than any other platform</p>
                    </div>
                    <div className="text-center">
                        <h3 className="text-xl font-bold text-orange">Cutting Edge</h3>
                        <p className="text-gray-500">AI Features</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
