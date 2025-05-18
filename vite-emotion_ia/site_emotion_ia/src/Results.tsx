import React, { useState } from 'react';
import Papa from 'papaparse';
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { Link } from 'react-router-dom';
import logo from './assets/logo.png';

// Définition d'un type pour chaque ligne de ton CSV
type EmotionData = {
  second: number;
  surprise: number;
  joy: number;
  anger: number;
  fear: number;
  neutral: number;
  sadness: number;
  disgust: number;
};

// Couleurs fixes pour les émotions
const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#d0ed57', '#a4de6c', '#ff6384'];

const Resultats: React.FC = () => {
  const [data, setData] = useState<EmotionData[]>([]);
  const [view, setView] = useState<'bar' | 'line' | 'pie'>('bar');

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    Papa.parse<EmotionData>(file, {
      header: true,
      skipEmptyLines: true,
      dynamicTyping: true, // pour convertir 'second' en nombre
      complete: (results) => {
        setData(results.data);
      },
    });
  };

  // Transformer les données pour le PieChart (moyenne par émotion)
  const aggregateForPie = () => {
    const emotions = ['surprise', 'joy', 'anger', 'fear', 'neutral', 'sadness', 'disgust'] as (keyof EmotionData)[];
    const totals = emotions.map((emotion) =>
      data.reduce((acc, cur) => acc + (cur[emotion] || 0), 0) / data.length
    );

    return emotions.map((emotion, idx) => ({
      name: emotion,
      value: totals[idx],
    }));
  };

  return (
    <div className="flex flex-col min-h-screen bg-white overflow-y-auto">
      {/* Header */}
      <header className="flex justify-between items-center bg-custom-dark-blue px-6 py-4 border-b border-gray-300">
        <Link to="/" className="flex items-center">
          <img src={logo} alt="Logo" className="shadow-md w-16 h-auto cursor-pointer" />
        </Link>
        <nav className="space-x-6">
          <Link to="/" className="text-white font-semibold hover:text-sky-500">Accueil</Link>
          <Link to="/recorder" className="text-white font-semibold hover:text-sky-500">Enregistreur de vidéos</Link>
          <Link to="/importer" className="text-white font-semibold hover:text-sky-500">Import de vidéos</Link>
          <Link to="/results" className="text-white font-semibold hover:text-sky-500">Résultats de l'analyse</Link>
          <Link to="/contacts" className="text-white font-semibold hover:text-sky-500">Contacts</Link>
        </nav>
      </header>

      {/* Fichier et boutons */}
      <div className="flex flex-col items-center my-8 w-full max-w-5xl mx-auto">
        <input type="file" accept=".csv" onChange={handleFileUpload} className="mb-6" />
        <div className="flex space-x-4">
          <button onClick={() => setView('bar')} className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-custom-dark-blue">
            Vue Barres
          </button>
          <button onClick={() => setView('line')} className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-custom-dark-blue">
            Vue Courbe
          </button>
          <button onClick={() => setView('pie')} className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-custom-dark-blue">
            Vue Camembert
          </button>
        </div>
      </div>

      {/* Graphiques */}
      <div className="flex-grow">
        {view === 'bar' && (
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={data}>
              <XAxis dataKey="second" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="surprise" fill="#8884d8" />
              <Bar dataKey="joy" fill="#82ca9d" />
              <Bar dataKey="anger" fill="#ffc658" />
              <Bar dataKey="fear" fill="#ff7300" />
              <Bar dataKey="neutral" fill="#d0ed57" />
              <Bar dataKey="sadness" fill="#a4de6c" />
              <Bar dataKey="disgust" fill="#ff6384" />
            </BarChart>
          </ResponsiveContainer>
        )}

        {view === 'line' && (
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={data}>
              <XAxis dataKey="second" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="surprise" stroke="#8884d8" />
              <Line type="monotone" dataKey="joy" stroke="#82ca9d" />
              <Line type="monotone" dataKey="anger" stroke="#ffc658" />
              <Line type="monotone" dataKey="fear" stroke="#ff7300" />
              <Line type="monotone" dataKey="neutral" stroke="#d0ed57" />
              <Line type="monotone" dataKey="sadness" stroke="#a4de6c" />
              <Line type="monotone" dataKey="disgust" stroke="#ff6384" />
            </LineChart>
          </ResponsiveContainer>
        )}

        {view === 'pie' && (
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={aggregateForPie()}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={150}
                label
              >
                {COLORS.map((color, index) => (
                  <Cell key={`cell-${index}`} fill={color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        )}
      </div>
      <footer className="bg-custom-dark-blue py-4 text-left pl-8">
        <a href="#about" className="text-white font-semibold hover:underline">À propos</a>
      </footer>
    </div>
  );
};

export default Resultats;
