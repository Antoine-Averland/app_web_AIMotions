import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import logo from './assets/logo.png';

const Recorder: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const [recording, setRecording] = useState(false);
  const [recordedChunks, setRecordedChunks] = useState<Blob[]>([]);
  const [videoURL, setVideoURL] = useState<string | null>(null);

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    if (videoRef.current) {
      videoRef.current.srcObject = stream;
    }

    const recorder = new MediaRecorder(stream);
    mediaRecorderRef.current = recorder;

    const chunks: Blob[] = [];
    recorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        chunks.push(event.data);
      }
    };

    recorder.onstop = () => {
      const blob = new Blob(chunks, { type: 'video/webm' });
      setVideoURL(URL.createObjectURL(blob));
      setRecordedChunks([]);
      stream.getTracks().forEach(track => track.stop());

      // Convertir en base64 et stocker dans localStorage
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        const dataToStore = {
          base64,
          timestamp: Date.now()
        };
        localStorage.setItem("temporaryRecordedVideo", JSON.stringify(dataToStore));
      };
      reader.readAsDataURL(blob);
    };

    recorder.start();
    setRecording(true);
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setRecording(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white overflow-y-auto">
      <header className="flex justify-between items-center bg-custom-dark-blue px-6 py-4 border-b border-gray-300">
        <Link to="/" className="flex items-center">
          <img src={logo} alt="Logo" className="shadow-md w-16 h-auto cursor-pointer" />
        </Link>
        <nav className="space-x-6">
          <a href="/" className="text-white font-semibold hover:text-sky-500">Accueil</a>
          <a href="/importer" className="text-white font-semibold hover:text-sky-500">Import de vidéos</a>
          <a href="/results" className="text-white font-semibold hover:text-sky-500">Résultats de l'analyse</a>
          <a href="#contacts" className="text-white font-semibold hover:text-sky-500">Contacts</a>
        </nav>
      </header>

      <main className="flex-grow px-6 py-8 overflow-y-auto">
        <section className="text-center mb-10">
          <h1 className="text-4xl font-bold text-custom-dark-blue mb-4 py-8">Enregistreur de vidéos</h1>
          <div className="bg-custom-dark-blue mx-auto p-6 rounded-md w-full max-w-xl">
            <p className="text-white text-lg">Préparez-vous à enregistrer votre vidéo.</p>
            <p className="text-white text-lg">Positionnez-vous correctement devant la caméra.</p>
            <p className="text-white text-lg pt-4">Vous pourrez recommencer l’enregistrement si nécessaire avant l’analyse.</p>
          </div>

          <div className="pt-10 space-x-4">
            {!recording ? (
              <button
                onClick={startRecording}
                className="bg-gray-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-custom-dark-blue"
              >
                Commencer l'enregistrement
              </button>
            ) : (
              <button
                onClick={stopRecording}
                className="bg-red-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-red-700"
              >
                Arrêter l'enregistrement
              </button>
            )}
          </div>
        </section>

        {/* Video Preview */}
        <section className="flex flex-col items-center mb-10">
          <video ref={videoRef} autoPlay muted className="w-full max-w-xl rounded-lg shadow-md mb-4" />
          {videoURL && (
            <div className="text-center">
              <a
                href={videoURL}
                download="enregistrement.webm"
                className="text-blue-600 hover:underline"
              >
                Télécharger la vidéo
              </a>
            </div>
          )}
          {videoURL && (
          <div className="text-center mt-6 space-y-4">
            <video
              src={videoURL}
              controls
              className="w-full max-w-xl rounded-lg shadow-md"
            />
          </div>
          )}
        </section>

        <section className="bg-custom-dark-blue p-6 rounded-md mx-auto w-full max-w-xl">
          <p className="text-white">
            L'enregistreur utilise votre webcam et votre micro. Les vidéos sont enregistrées localement au format WebM.
          </p>
        </section>
      </main>

      <footer className="bg-custom-dark-blue py-4 text-left pl-8">
        <a href="#about" className="text-white font-semibold hover:underline">À propos</a>
      </footer>
    </div>
  );
};

export default Recorder;
