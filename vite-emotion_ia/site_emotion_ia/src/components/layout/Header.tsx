import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo_sans_fond.png'; // Adjust the path to your logo file

const Header: React.FC = () => {
    return (
        <header className="flex justify-between items-center bg-custom-dark-blue px-6 py-4 border-b border-gray-300">
            <Link to="/" className="flex items-center">
                <img src={logo} alt="Logo" className="shadow-md w-16 h-auto cursor-pointer" />
            </Link>
            <nav className="space-x-6">
                <a href="/" className="text-white font-semibold hover:text-sky-500">Accueil</a>
                <a href="/recorder" className="text-white font-semibold hover:text-sky-500">Enregistreur de vidéos</a>
                <a href="/results" className="text-white font-semibold hover:text-sky-500">Résultats de l'analyse</a>
                <a href="#contacts" className="text-white font-semibold hover:text-sky-500">Contacts</a>
            </nav>
        </header>
    );
};

export default Header;