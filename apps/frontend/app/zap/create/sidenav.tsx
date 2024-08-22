import { AiOutlineHome, AiOutlinePlusCircle, AiOutlineSetting, AiOutlineUser } from "react-icons/ai";
import { BsLightning } from "react-icons/bs";

export default function SideNav({ user }: { user: { name: string; email: string; avatar: string; } }) {
    return (
        <div className="w-64 h-full bg-[#F38186] text-white flex flex-col justify-between p-4">
            <div>
                <div className="flex items-center space-x-2 mb-6">
                    <BsLightning className="text-yellow-400 w-6 h-6" />
                    <span className="text-lg font-semibold">Create Your Zap!</span>
                </div>

                <nav className="space-y-4">
                    <a href="/" className="flex items-center space-x-3 hover:bg-[#FD9B59] p-3 rounded-lg transition-all duration-300 ease-in-out">
                        <AiOutlineHome className="w-6 h-6" />
                        <span>Home</span>
                    </a>
                    <a href="/zap/create" className="flex items-center space-x-3 hover:bg-[#FD9B59] p-3 rounded-lg transition-all duration-300 ease-in-out">
                        <AiOutlinePlusCircle className="w-6 h-6" />
                        <span>Create Zaps</span>
                    </a>
                    <a href="/dashboard" className="flex items-center space-x-3 hover:bg-[#FD9B59] p-3 rounded-lg transition-all duration-300 ease-in-out">
                        <BsLightning className="w-6 h-6" />
                        <span>My Zaps</span>
                    </a>
                    <a href="/dashboard" className="flex items-center space-x-3 hover:bg-[#FD9B59] p-3 rounded-lg transition-all duration-300 ease-in-out">
                        <AiOutlineSetting className="w-6 h-6" />
                        <span>Dashboard</span>
                    </a>
                </nav>
            </div>

            <div className="mt-6 flex items-center space-x-3 p-3 bg-[#FD9B59] rounded-lg">
                <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full" />
                <div>
                    <div className="font-semibold">{user.name}</div>
                    <div className="text-sm text-gray-300">{user.email}</div>
                </div>
                <AiOutlineUser className="w-6 h-6 ml-auto" />
            </div>
        </div>
    );
}
