import React from 'react';
import { Link } from 'react-router-dom';
import logo from './assets/logo.png';

const Importer: React.FC = () => {
  const [recordedVideo, setRecordedVideo] = React.useState<string | null>(null);
  const [localVideo, setLocalVideo] = React.useState<string | null>(null);

  React.useEffect(() => {
    const data = localStorage.getItem("temporaryRecordedVideo");
    if (data) {
      const { base64, timestamp } = JSON.parse(data);
      const now = Date.now();
      const fiveMinutes = 10 * 60 * 1000;

      if (now - timestamp < fiveMinutes) {
        setRecordedVideo(base64);
      } else {
        localStorage.removeItem("temporaryRecordedVideo");
      }
    }
  }, []);

  const handleLocalImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLocalVideo(reader.result as string);
        setRecordedVideo(null); // On désactive la vidéo enregistrée si l’utilisateur en importe une
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyse = () => {
    const videoToAnalyse = localVideo || recordedVideo;
    if (videoToAnalyse) {
      // Appelle ici ton backend ou pipeline d’analyse
      console.log("Vidéo envoyée pour analyse !");
      // Tu peux faire un fetch/post ici si besoin
    }
  };

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
          <a href="#contacts" className="text-white font-semibold hover:text-sky-500">Contacts</a>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-grow px-6 py-8 overflow-y-auto">
        <section className="text-center mb-10">
          <h1 className="text-4xl font-bold text-custom-dark-blue mb-4 py-8">
            Import de vidéos
          </h1>
          <div className="bg-custom-dark-blue mx-auto p-6 rounded-md w-1/2 text-white-100 space-y-2">
            <p className="text-lg">Sélectionnez une vidéo que nous allons analyser</p>
            <p className="text-lg">Veillez à ce que la vidéo ne dépasse pas ...Mb.</p>
          </div>

          <div className="pt-10 space-y-6">
            {recordedVideo && (
              <div className="space-y-2">
                <p className="text-custom-dark-blue font-semibold">Vidéo enregistrée disponible :</p>
                <video src={recordedVideo} controls className="w-full max-w-xl mx-auto rounded-md shadow-md" />
              </div>
            )}

            {localVideo && (
              <div className="space-y-2">
                <p className="text-custom-dark-blue font-semibold">Vidéo locale importée :</p>
                <video src={localVideo} controls className="w-full max-w-xl mx-auto rounded-md shadow-md" />
              </div>
            )}

            <div className="space-y-2">
              <p className="text-custom-dark-blue font-semibold">Importer une vidéo locale :</p>
              <input type="file" accept="video/*" onChange={handleLocalImport} className="block mx-auto" />
            </div>

            {(recordedVideo || localVideo) && (
              <div className="pt-6">
                <button
                  onClick={handleAnalyse}
                  className="bg-green-600 text-white py-2 px-6 rounded-lg shadow-md hover:bg-green-700 transition"
                >
                  Analyser cette vidéo
                </button>
              </div>
            )}
          </div>
        </section>

        {/* About Section */}
        <section className="bg-custom-dark-blue p-6 rounded-md mx-auto w-1/2 mt-10">
          <p className="text-white">
            Explications sur le fonctionnement de l'import de vidéo et les spécifications techniques.
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

export default Importer;
