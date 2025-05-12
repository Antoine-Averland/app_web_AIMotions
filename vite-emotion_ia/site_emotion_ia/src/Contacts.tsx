// import React from 'react';
// import { Link } from 'react-router-dom';

// const people = [
//   { name: 'Alice Dupont', job: 'Développeur Web' },
//   { name: 'Jean Martin', job: 'Ingénieur IA' },
//   { name: 'Sophie Lambert', job: 'Chef de Projet' },
//   { name: 'Thomas Renault', job: 'Data Scientist' },
//   { name: 'Emma Lefevre', job: 'UX/UI Designer' },
//   { name: 'Lucas Morel', job: 'Analyste Sécurité' }
// ];

// const Contacts: React.FC = () => {
//   return (
//     <div className="flex flex-col min-h-screen bg-white">
//       {/* Header */}
//       <header className="flex justify-between items-center bg-custom-dark-blue px-6 py-4 border-b border-gray-300">
//         <Link to="/" className="flex items-center">
//           <img src="/path-to-logo.png" alt="Logo" className="shadow-md w-16 h-auto cursor-pointer" />
//         </Link>
//         <nav className="space-x-6">
//             <a href="/" className="text-white font-semibold hover:text-sky-500">Accueil</a>
//             <a href="/recorder" className="text-white font-semibold hover:text-sky-500">Enregistreur de vidéos</a>
//             <a href="#results" className="text-white font-semibold hover:text-sky-500">Résultats de l'analyse</a>
//             <a href="/contacts" className="text-white font-semibold hover:text-sky-500">Contacts</a>        </nav>
//       </header>
      
//       {/* Main Content */}
//       <main className="flex-grow px-6 py-8">
//         <h1 className="text-3xl font-bold text-custom-dark-blue text-center mb-6">Nos Contacts</h1>
//         <div className="mx-auto w-1/2 bg-custom-dark-blue p-6 rounded-md">
//           {people.map((person, index) => (
//             <div key={index} className="flex items-center bg-white p-4 rounded-lg shadow-md mb-4">
//               <div className="w-16 h-16 bg-gray-300 rounded-full mr-4"></div> {/* Remplacer par l'image */}
//               <div>
//                 <h2 className="text-lg font-semibold text-custom-dark-blue">{person.name}</h2>
//                 <p className="text-gray-600">{person.job}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </main>

//       {/* Footer */}
//       <footer className="bg-custom-dark-blue py-4 text-left pl-8">
//         <p className="text-white">À propos</p>
//       </footer>
//     </div>
//   );
// };

// export default Contacts;

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import logo from './assets/logo.png'
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

const Contacts: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white overflow-y-auto">
      {/* Header */}
      <header className="flex justify-between items-center bg-custom-dark-blue px-6 py-4 border-b border-gray-300">
        <Link to="/" className="flex items-center">
          <img src={logo} alt="Logo" className="shadow-md w-16 h-auto cursor-pointer" />
        </Link>
        <nav className="space-x-6">
          <a href="/" className="text-white font-semibold hover:text-sky-500">Accueil</a>
          <a href="/recorder" className="text-white font-semibold hover:text-sky-500">Enregistreur de vidéos</a>
          <a href="#results" className="text-white font-semibold hover:text-sky-500">Résultats de l'analyse</a>
          <a href="/contacts" className="text-white font-semibold hover:text-sky-500">Contacts</a>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-grow px-6 py-8 overflow-y-auto">
        {/* Introduction Section */}
        <section className="text-center mb-10">
          <h1 className="text-4xl font-bold text-custom-dark-blue mb-4 py-8">
            Import de vidéos
          </h1>
          <div className="bg-custom-dark-blue mx-auto p-6 rounded-md w-1/2">
            <p className="text-white-100 text-lg">
                Sélectionnez une vidéo que nous allons analyser
            </p>
            <p className="text-white-100 text-lg">
                Veillez à ce que la vidéo ne dépasse pas ...Mb.
            </p>
          </div>
          <div className='pt-10'>
          <button className="bg-gray-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-custom-dark-blue">importer une vidéo locale</button>
          </div>
        </section>

        {/* About Section */}
        <section className="bg-custom-dark-blue p-6 rounded-md mx-auto w-1/2">
          <p className="text-white">
            Explications sur le fonctionnement de l'importer vidéo et
            les spécifications techniques.
          </p>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Contacts;
