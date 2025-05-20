import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { Link, useLocation } from 'react-router-dom';
import logo from './assets/logo_sans_fond.png';
// import type { Payload } from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';

// Type des données
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

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#d0ed57', '#a4de6c', '#ff6384'];

const Resultats: React.FC = () => {
  const [data, setData] = useState<EmotionData[]>([]);
  const [view, setView] = useState<'bar' | 'line' | 'pie'>('bar');
  const [highlightedEmotion, setHighlightedEmotion] = useState<string | null>(null);
  const location = useLocation();
  const { resAnalyse } = location.state || {};
  console.log("resAnalyse", resAnalyse);

  useEffect(() => {
    if (resAnalyse && typeof resAnalyse === 'string') {
      Papa.parse(resAnalyse, {
        header: true,
        skipEmptyLines: true,
        dynamicTyping: true,
        complete: (results) => {
          const parsed = (results.data as Partial<Record<string, number>>[]).map((row) => ({
            second: row.second ?? row.seconde ?? 0,
            surprise: row.surprise ?? 0,
            joy: row.joy ?? row.joie ?? 0,
            anger: row.anger ?? row.colere ?? 0,
            fear: row.fear ?? row.peur ?? 0,
            neutral: row.neutral ?? row.neutre ?? 0,
            sadness: row.sadness ?? row.triste ?? 0,
            disgust: row.disgust ?? row.degout ?? 0,
          }));
          setData(parsed);
        },
      });
    }
  }, [resAnalyse]);
  
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result;
      if (typeof text === 'string') {
        Papa.parse(text, {
          header: true,
          skipEmptyLines: true,
          dynamicTyping: true,
          complete: (results) => {
            const parsed = (results.data as Partial<Record<string, number>>[]).map((row) => ({
              second: row.second ?? row.seconde ?? 0,
              surprise: row.surprise ?? 0,
              joy: row.joy ?? row.joie ?? 0,
              anger: row.anger ?? row.colere ?? 0,
              fear: row.fear ?? row.peur ?? 0,
              neutral: row.neutral ?? row.neutre ?? 0,
              sadness: row.sadness ?? row.triste ?? 0,
              disgust: row.disgust ?? row.degout ?? 0,
            }));
            setData(parsed);
          },
        });
      }
    };
    reader.readAsText(file);
  };

  // const handleLegendClick = (e: Payload) => {
  const handleLegendClick = (e: any) => {
    const key = e.dataKey as string;
    setHighlightedEmotion((prev) => (prev === key ? null : key));
  };

  const aggregateForPie = () => {
    const emotions = ['surprise', 'joy', 'anger', 'fear', 'neutral', 'sadness', 'disgust'] as (keyof EmotionData)[];
    const totals = emotions.map(emotion =>
      data.reduce((acc, cur) => acc + (cur[emotion] || 0), 0)
    );

    const totalSum = totals.reduce((a, b) => a + b, 0);
    let values = totals.map(val => Math.round((val / totalSum * 1000)) / 10);
    const correction = 100 - values.reduce((a, b) => a + b, 0);
    const maxIdx = values.indexOf(Math.max(...values));
    values[maxIdx] = Math.round((values[maxIdx] + correction) * 10) / 10;

    return emotions.map((emotion, idx) => ({
      name: emotion,
      value: values[idx],
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

      {/* Import & boutons */}
      <div className="flex flex-col items-center my-8 w-full max-w-5xl mx-auto flex-grow">
        <label className="cursor-pointer bg-gray-700 hover:bg-gray-800 text-white px-6 py-2 rounded-md shadow-md mb-4 transition">
          Choisir un fichier
          <input type="file" accept=".csv" onChange={handleFileUpload} className="hidden" />
        </label>

        {data.length === 0 && !resAnalyse && (
          <p className="text-custom-dark-blue font-medium text-center">Veuillez importer un fichier CSV pour afficher les résultats.</p>
        )}

        {data.length > 0 && (
          <div className="flex space-x-4 mt-4">
            <button onClick={() => setView('bar')} className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-custom-dark-blue">Vue Barres</button>
            <button onClick={() => setView('line')} className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-custom-dark-blue">Vue Courbe</button>
            <button onClick={() => setView('pie')} className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-custom-dark-blue">Vue Camembert</button>
          </div>
        )}
      </div>

      {/* Graphiques */}
      <AnimatePresence mode="wait">
        {data.length > 0 && (
          <motion.div
            key={view}
            className="flex-grow w-full max-w-5xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.4 }}
          >
            {view === 'bar' && (
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={data}>
                  <XAxis dataKey="second" />
                  <YAxis />
                  <Tooltip />
                  <Legend onClick={handleLegendClick} />
                  {(!highlightedEmotion || highlightedEmotion === 'surprise') && <Bar dataKey="surprise" fill="#8884d8" />}
                  {(!highlightedEmotion || highlightedEmotion === 'joy') && <Bar dataKey="joy" fill="#82ca9d" />}
                  {(!highlightedEmotion || highlightedEmotion === 'anger') && <Bar dataKey="anger" fill="#ffc658" />}
                  {(!highlightedEmotion || highlightedEmotion === 'fear') && <Bar dataKey="fear" fill="#ff7300" />}
                  {(!highlightedEmotion || highlightedEmotion === 'neutral') && <Bar dataKey="neutral" fill="#d0ed57" />}
                  {(!highlightedEmotion || highlightedEmotion === 'sadness') && <Bar dataKey="sadness" fill="#a4de6c" />}
                  {(!highlightedEmotion || highlightedEmotion === 'disgust') && <Bar dataKey="disgust" fill="#ff6384" />}
                </BarChart>
              </ResponsiveContainer>
            )}

            {view === 'line' && (
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={data}>
                  <XAxis dataKey="second" />
                  <YAxis />
                  <Tooltip />
                  <Legend onClick={handleLegendClick} />
                  {(!highlightedEmotion || highlightedEmotion === 'surprise') && <Line dataKey="surprise" stroke="#8884d8" />}
                  {(!highlightedEmotion || highlightedEmotion === 'joy') && <Line dataKey="joy" stroke="#82ca9d" />}
                  {(!highlightedEmotion || highlightedEmotion === 'anger') && <Line dataKey="anger" stroke="#ffc658" />}
                  {(!highlightedEmotion || highlightedEmotion === 'fear') && <Line dataKey="fear" stroke="#ff7300" />}
                  {(!highlightedEmotion || highlightedEmotion === 'neutral') && <Line dataKey="neutral" stroke="#d0ed57" />}
                  {(!highlightedEmotion || highlightedEmotion === 'sadness') && <Line dataKey="sadness" stroke="#a4de6c" />}
                  {(!highlightedEmotion || highlightedEmotion === 'disgust') && <Line dataKey="disgust" stroke="#ff6384" />}
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
                    label={({ name, value }) => `${name}: ${value}%`}
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
          </motion.div>
        )}
      </AnimatePresence>

      <footer className="bg-custom-dark-blue py-4 text-left pl-8">
        <a href="#about" className="text-white font-semibold hover:underline">À propos</a>
      </footer>
    </div>
  );
};

export default Resultats;
