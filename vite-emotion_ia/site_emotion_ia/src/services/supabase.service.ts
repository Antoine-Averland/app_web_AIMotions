const fileTypeConfig = {
    csv: {
      mimeType: "text/csv",
      extension: "csv",
      urlKey: "csv_url"
    },
    video: {
      mimeType: "video/mp4",
      extension: "mp4",
      urlKey: "video_url"
    }
};
  

export const downloadFileFromSupabase = async ({
    type,
    suffix = "",
    filenamePrefix = "resultat"
  }: {
    type: "csv" | "video";
    suffix?: string;
    filenamePrefix?: string;
  }) => {
    const config = fileTypeConfig[type];
    if (!config) {
      console.error(`Type de fichier inconnu : ${type}`);
      return;
    }
  
    const documentId = document.cookie
      .split("; ")
      .find((row) => row.startsWith("document_id="))
      ?.split("=")[1];
  
    if (!documentId) {
      console.error("Aucun cookie document_id trouvé");
      return;
    }
  
    try {
      const fullId = `${documentId}${suffix}`;
      const response = await fetch(`http://localhost:8000/document/get-document/${type}/${fullId}`, {
        method: "GET",
        credentials: "include"
      });
  
      const resJson = await response.json();
      const fileUrl = resJson[config.urlKey];
  
      const fileResponse = await fetch(fileUrl);
      const fileBlob = await fileResponse.blob();
  
      const blob = new Blob([fileBlob], { type: config.mimeType });
      const url = URL.createObjectURL(blob);
  
      const link = document.createElement("a");
      link.href = url;
      link.download = `${filenamePrefix}_${documentId}.${config.extension}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
  
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error(`Erreur lors du téléchargement du fichier ${type} :`, err);
    }
  };
  