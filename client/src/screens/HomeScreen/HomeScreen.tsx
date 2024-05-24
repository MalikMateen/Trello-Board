import React from "react";
import Link from "next/link";
import { NavigationPath } from "../../constants";

export const HomeScreen = React.memo(function HomeScreen() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="flex flex-col md:flex-row space-y-4 md:space-x-4 md:space-y-0">
        <Link href={NavigationPath.BoardManagement}>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Board Management
          </button>
        </Link>
        <Link href={NavigationPath.TaskManagement}>
          <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Task Management
          </button>
        </Link>
        <Link href={NavigationPath.TaskList}>
          <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Task List
          </button>
        </Link>
      </div>
    </div>
  );
});
