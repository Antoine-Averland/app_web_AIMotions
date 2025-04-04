import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import logo from './assets/logo.png';


const Recorder: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white overflow-y-auto">
      {/* Header */}
      <header className="flex justify-between items-center bg-custom-dark-blue px-6 py-4 border-b border-gray-300">
        <Link to="/" className="flex items-center">
          <img src={logo} alt="Logo" className="shadow-md w-16 h-auto cursor-pointer" />
        </Link>
        <nav className="space-x-6">
          <a href="/" className="text-white font-semibold hover:text-sky-500">Accueil</a>
          <a href="/importer" className="text-white font-semibold hover:text-sky-500">Import de vidéos</a>
          <a href="#results" className="text-white font-semibold hover:text-sky-500">Résultats de l'analyse</a>
          <a href="#contacts" className="text-white font-semibold hover:text-sky-500">Contacts</a>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-grow px-6 py-8 overflow-y-auto">
        {/* Introduction Section */}
        <section className="text-center mb-10">
          <h1 className="text-4xl font-bold text-custom-dark-blue mb-4 py-8">
            Enregistreur de vidéos
          </h1>
          <div className="bg-custom-dark-blue mx-auto p-6 rounded-md w-1/2">
            <p className="text-white-100 text-lg">
                Préparez vous à enregistrer votre vidéo.
            </p>
            <p className="text-white-100 text-lg">
                Pensez à bien vous positionner devant la caméra.
            </p>
            <p className="text-white-100 text-lg pt-4">
                Vous pourrez recommencer l’enregistrement si vous le souhaitez
            </p>
            <p className="text-white-100 text-lg">
                avant de le soumettre à l’IA pour analyse
            </p>
          </div>
          <div className='pt-10'>
          <button className="bg-gray-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-custom-dark-blue">Commencer l'enregistrement</button>
          </div>
        </section>

        {/* Image Section */}
        <section className="flex justify-center mb-10">
          <img
            src="https://via.placeholder.com/600x300" // Remplace par le chemin de l'image locale ou en ligne
            alt="Enregistreur"
            className="rounded-lg shadow-md"
          />
        </section>

        {/* About Section */}
        <section className="bg-custom-dark-blue p-6 rounded-md mx-auto w-1/2">
          <p className="text-white">
            Explications sur le fonctionnement de l'enregistreur vidéo et
            les spécifications techniques.
          </p>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-custom-dark-blue py-4 text-left pl-8">
        <a href="#about" className="text-white font-semibold hover:underline">À propos</a>
      </footer>
    </div>
  );
};

export default Recorder;
