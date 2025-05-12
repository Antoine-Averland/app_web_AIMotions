import React from 'react';

interface ButtonProps {
    onClick: () => void;
    buttonType?: "base" | "submit" | "disabled";
    disabled?: boolean;
    className?: string;
    children: React.ReactNode;
}

const buttonStyles = {
    base: 'py-2 px-6 rounded-lg shadow-md transition',
    disabled: 'bg-gray-400 cursor-not-allowed',
    submit: 'bg-blue-600 hover:bg-blue-700 text-white',
};

const Button: React.FC<ButtonProps> = ({ onClick, buttonType = "base", disabled = false, className = '', children }) => {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`py-2 px-6 rounded-lg shadow-md transition ${buttonStyles[buttonType]} ${className}`}
        >
            {children}
        </button>
    );
};

export default Button;