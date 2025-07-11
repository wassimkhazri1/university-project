import axios from "axios";
import VoiceCommand from "./VoiceCommand";

const VoiceCommandPdf = () => {
    const handleGeneratePDF = async () => {
        try {
            const response = await axios.get("http://localhost:8080/api/etudiants/export/pdf", {
                responseType: "blob",
            });
//CreatedAndDevelopedByWassimKhazri
//https://www.linkedin.com/in/wassim-khazri-ab923a14b/ 
            // Télécharger le fichier PDF
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", "operations.pdf");
            document.body.appendChild(link);
            link.click();
        } catch (error) {
            console.error("Erreur lors de la génération du PDF", error);
        }
    };

    return (
        <div>
            <h1>Génération de PDF avec commande vocale</h1>
            <VoiceCommand onGeneratePDF={handleGeneratePDF} />
        </div>
    );
};
//CreatedAndDevelopedByWassimKhazri
//https://www.linkedin.com/in/wassim-khazri-ab923a14b/ 
export default VoiceCommandPdf;
