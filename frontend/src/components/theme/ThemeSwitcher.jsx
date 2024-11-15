import React from "react";
import { CiDark, CiLight } from "react-icons/ci";
import useTheme from "../../hooks/useTheme";

const ThemeSwitcher = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <div className="flex items-center justify-center space-x-4">
            {/* <button
                onClick={toggleTheme}
                className="btn btn-primary"
                >
                Switch Theme
                </button> */}
            {/* <input onChange={toggleTheme} type="checkbox" className="toggle" /> */}
            <span className="text-lg">
                {theme === "dark" ? (
                    <CiDark onClick={toggleTheme} className="text-white size-6 cursor-pointer transition-all duration-150" />
                ) : (
                    <CiLight onClick={toggleTheme} className="text-black size-7 cursor-pointer transition-all duration-150" />
                )}
            </span>
        </div>
    );
};

export default ThemeSwitcher;
