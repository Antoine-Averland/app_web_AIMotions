import React from 'react';
import ia_example from './assets/ia_exemple.png';
import logo from './assets/logo.png';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Recorder from './Recorder';
import Importer from './Importer';
import Contacts from './Contacts';
import Results from './Results';



import './App.css';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Page principale */}
        <Route
          path="/"
          element={
            <div className="flex flex-col min-h-screen bg-white">
              {/* Header */}
              <header className="flex justify-between items-center bg-custom-dark-blue px-6 py-4 border-b border-gray-300">
                <section className="flex justify-center">
                  <Link to="/" className="flex items-center">
                    <img src={logo} alt="Logo" className="shadow-md w-16 h-auto cursor-pointer" />
                  </Link>
                </section>
                <nav className="space-x-6">
                  <Link to="/recorder" className="text-white font-semibold hover:text-sky-500">Enregistreur</Link>
                  <Link to="/importer" className="text-white font-semibold hover:text-sky-500">Import de vidéos</Link>
                  <Link to="/results" className="text-white font-semibold hover:text-sky-500">Résultats de l'analyse</Link>
                  <Link to="/contacts" className="text-white font-semibold hover:text-sky-500">Contacts</Link>
                </nav>
              </header>

              {/* Main Content */}
              <main className="flex-grow px-6 py-8 overflow-y-auto">
                {/* Introduction Section */}
                <section className="text-center mb-10">
                  <h1 className="text-4xl font-bold text-custom-dark-blue mb-4 py-8">Analyse des émotions faciales à partir de vidéos pré-enregistrées</h1>
                  <div className="bg-custom-dark-blue mx-auto p-6 rounded-md w-1/2">
                    <p className="text-white-100 text-lg">
                      Enregistrez ou importez les vidéos de votre choix, et notre IA de détection des émotions
                      vous donnera les résultats, desquels nous sortirons une analyse pour vous.
                    </p>
                  </div>
                  <div className="flex justify-center space-x-20 pt-16">
                    <button className="bg-gray-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-custom-dark-blue">
                      <Link to="/recorder" className="text-white">Enregistrer une vidéo</Link>
                    </button>
                    <button className="bg-gray-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-custom-dark-blue">
                      <Link to="/importer" className="text-white">Importer une vidéo</Link>
                    </button>
                  </div>
                </section>

                {/* Image Section */}
                <section className="flex justify-center mb-10 py-10">
                  <img
                    src={ia_example}
                    alt="Description"
                    className="shadow-md"
                  />
                </section>

                {/* About Section */}
                <section className="bg-custom-dark-blue p-6 rounded-md mx-auto w-1/2 pb-20">
                  <p className="text-white">
                    Explications du fonctionnement de l'IA, du contexte du projet, de son déroulé et
                    présentation des auteurs.
                  </p>
                </section>
              </main>

              {/* Footer */}
              <footer className="bg-custom-dark-blue py-4 text-left pl-8">
                <p className="text-white">
                  À propos
                </p>
              </footer>
            </div>
          }
        />

        {/* Page Enregistreur */}
        <Route path="/recorder" element={<Recorder />} />
        <Route path="/importer" element={<Importer />} />
        <Route path="/results" element={<Results />} />
      </Routes>
    </Router>
  );
};

export default App;
