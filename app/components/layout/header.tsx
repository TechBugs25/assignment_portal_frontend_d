import { SearchIcon, BellIcon, SettingsIcon } from "@/app/components/ui/icons";
import { Avatar, AvatarFallback, AvatarImage } from "@/app/components/ui/avatar";

export function Header() {
    return (
        <header className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold">Office Overview</h2>

            <div className="flex items-center gap-6">
                {/* Search Bar */}
                <div className="relative">
                    <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                    <input
                        placeholder="Search stories, tasks, or staff..."
                        className="bg-[#161b22] border border-gray-800 rounded-lg py-2 pl-10 pr-4 text-sm w-80 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                </div>

                {/* Action Icons */}
                <div className="flex items-center gap-3">
                    <button className="p-2 hover:bg-gray-800 rounded-full text-gray-400">
                        <BellIcon size={20} />
                    </button>
                    <button className="p-2 hover:bg-gray-800 rounded-full text-gray-400">
                        <SettingsIcon size={20} />
                    </button>
                </div>

                {/* User Profile */}
                <div className="flex items-center gap-3 border-l border-gray-800 pl-6">
                    <div className="text-right">
                        <p className="text-sm font-medium">Alex Rivera</p>
                        <p className="text-xs text-gray-500">Editor-in-Chief</p>
                    </div>
                    <Avatar>
                        <AvatarImage src="/path-to-alex.jpg" />
                        <AvatarFallback>AR</AvatarFallback>
                    </Avatar>
                </div>
            </div>
        </header>
    );
}