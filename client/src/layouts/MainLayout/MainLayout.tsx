import React from "react";
import Link from "next/link";
import { NavigationPath } from "../../constants";

type MainLayoutProps = React.PropsWithChildren;

export const MainLayout = React.memo(function MainLayout({
  children,
}: MainLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-gray-800 text-white py-4 px-6 md:px-10 lg:px-16">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
          <h1 className="text-xl md:text-2xl lg:text-3xl font-bold mb-4 md:mb-0">
            Welcome to Trello Board by Muhammad Mateen
          </h1>
          <Link href={NavigationPath.Home}>
            <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Home
            </button>
          </Link>
        </div>
      </header>
      <main className="flex-grow">{children}</main>
      <footer className="bg-gray-800 text-white py-4 px-6 mt-auto">
        <div className="container mx-auto text-center">
          {/* Footer content goes here */}
        </div>
      </footer>
    </div>
  );
});
