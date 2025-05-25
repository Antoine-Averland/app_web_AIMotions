import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

// Data
import { questions, getRandomQuestionByDomaine } from "./data/question.data";

// Components
import SelectInput from './components/FormInput';
import Button from './components/Button';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

const Importer: React.FC = () => {
  const [selectedDomain, setSelectedDomain] = React.useState<string>("");
  const [selectedRandomQuestion, setSelectedRandomQuestion] = React.useState<string>("");
  const [recordedVideo, setRecordedVideo] = React.useState<string | null>(null);
  const [localVideo, setLocalVideo] = React.useState<string>("");
  const [localVideoFile, setLocalVideoFile] = React.useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = React.useState(false);
  const [analysisDone, setAnalysisDone] = React.useState(false);
  const [resAnalyse, setResAnalyse] = React.useState<any>(null);
  const navigate = useNavigate();

  const domainsList = Object.keys(questions);

  React.useEffect(() => {
    const data = localStorage.getItem("temporaryRecordedVideo");
    if (data) {
      const { base64, timestamp } = JSON.parse(data);
      const now = Date.now();
      const fiveMinutes = 5 * 60 * 1000;

      if (now - timestamp < fiveMinutes) {
        setRecordedVideo(base64);
      } else {
        localStorage.removeItem("temporaryRecordedVideo");
      }
    }

    if (domainsList.length > 0) {
      setSelectedDomain(domainsList[0]);
    }
  }, []);

  const handleLocalImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setLocalVideoFile(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setLocalVideo(reader.result as string);
        setRecordedVideo(null); // désactive la vidéo enregistrée si une locale est choisie
      };
      reader.readAsDataURL(file);
    }
  };

  const handleViewResults = () => {
    navigate('/results', {
      state: {
        resAnalyse: resAnalyse,
      },
    });
  };

  const handleSelectDomain = (val: string) => {
    setSelectedDomain(val);
    setSelectedRandomQuestion("");
  }

  const pickRandomQuestion = () => {
    const question = getRandomQuestionByDomaine(selectedDomain);
    if (question) {
      setSelectedRandomQuestion(question.question);
    } else {
      setSelectedRandomQuestion("");
    }
  }

  const handleAnalyzeVideoResult = async () => {
    console.log("Click, envoi de la vidéo");
    
    if (!localVideoFile) { 
      console.log("Pas de vidéo à envoyer");
      return;
    }
    const formData = new FormData();
    formData.append("file", localVideoFile);

    try {
      const response = await fetch("http://localhost:8000/video/upload-document", {
        method: "POST",
        body: formData,
        credentials: "include"
      });
      // console.log("response ->", response);
      if (!response.ok) {
        console.error("Erreur lors de l'envoi de la vidéo");
        return;
      }
      
      const resText = await response.text();
      if (resText) {
        setResAnalyse(resText);
        setAnalysisDone(true);
      };
    } catch(error) {
      console.error("error:", error);
    }    
  }

  const getCsvFile = async () => {
    const documentId = document.cookie
      .split("; ")
      .find(row => row.startsWith("document_id="))
      ?.split("=")[1];
  
    if (!documentId) {
      console.error("Aucun cookie document_id trouvé");
      return;
    }
  
    try {
      const response = await fetch(`http://localhost:8000/video/get-document/csv/${documentId}`, {
        method: "GET",
        credentials: "include"
      });
  
      const resJson = await response.json();
      const csvUrl = resJson.csv_url;
  
      const csvResponse = await fetch(csvUrl);
      const csvText = await csvResponse.text();
  
      const blob = new Blob([csvText], { type: "text/csv" });
      const url = URL.createObjectURL(blob);
  
      const link = document.createElement("a");
      link.href = url;
      link.download = `resultat_${documentId}.csv`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
  
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Erreur lors du téléchargement du CSV :", err);
    }
  };
  

  return (
    <div className="flex flex-col min-h-screen bg-white overflow-y-auto">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="flex-grow px-6 py-8 overflow-y-auto">
        <section className="text-center flex flex-col gap-10">
          <h1 className="text-4xl font-bold text-custom-dark-blue mb-4 py-8">
            Import de vidéos
          </h1>

          <div>
            <h2>Veuillez choisir un domaine où vous souhaitez vous exercer :</h2>
            <SelectInput
              label=""
              options={domainsList.map((domain) => ({ value: domain, label: domain }))}
              value={selectedDomain}
              onChange={handleSelectDomain}
            />
            <Button onClick={pickRandomQuestion} className="mt-4">
              Obtenir une question aléatoire
            </Button>
            {selectedRandomQuestion && (
              <p className="text-lg text-custom-dark-blue mt-4">
                Voici votre question : {selectedRandomQuestion}
              </p>
            )}
          </div>

          {selectedRandomQuestion && (
            <>
              <div className="bg-custom-dark-blue mx-auto p-6 rounded-md w-1/2 text-white-100 space-y-2">
                <p className="text-lg text-white">Sélectionnez une vidéo que nous allons analyser</p>
                <p className="text-lg text-white">Veillez à ce que la vidéo ne dépasse pas ...Mb.</p>
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
                  <div className="flex justify-center items-center gap-4">
                    <button
                      onClick={handleAnalyzeVideoResult}
                      disabled={isAnalyzing}
                      className={`py-2 px-6 rounded-lg shadow-md transition ${
                        isAnalyzing ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700 text-white'
                      }`}
                    >
                      {isAnalyzing ? 'Analyse en cours...' : 'Analyser cette vidéo'}
                    </button>

                    {analysisDone && (
                      <>
                        <button
                          onClick={handleViewResults}
                          className="bg-blue-600 text-white py-2 px-6 rounded-lg shadow-md hover:bg-blue-700 transition"
                          >
                          Voir les résultats
                        </button>
                        <button
                          onClick={getCsvFile}
                          className="bg-blue-600 text-white py-2 px-6 rounded-lg shadow-md hover:bg-blue-700 transition"
                          >
                          Télécharger le fichier CSV
                        </button>
                      </>
                    )}
                  </div>
                )}
              </div>
            </>
          )}
        </section>

        {/* About Section */}
        <section className="bg-custom-dark-blue p-6 rounded-md mx-auto w-1/2 mt-10">
          <p className="text-white">
            Explications sur le fonctionnement de l'import de vidéo et les spécifications techniques.
          </p>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Importer;

