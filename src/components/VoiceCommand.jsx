import React, { useEffect } from "react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";

const VoiceCommand = ({ onGeneratePDF }) => {
    const { transcript, listening, resetTranscript } = useSpeechRecognition();
//CreatedAndDevelopedByWassimKhazri
//https://www.linkedin.com/in/wassim-khazri-ab923a14b/ 
    useEffect(() => {
        // Démarrer l'écoute dès le chargement du composant
        SpeechRecognition.startListening({ continuous: true, language: "fr-FR" });
    }, []);

    // Vérifier si la commande "générer le PDF" est détectée
    useEffect(() => {
        //if (transcript.toLowerCase().includes("générer le pdf")) {
            if (transcript.toLowerCase().includes("générer")) {
            onGeneratePDF(); // Appeler la méthode pour générer le PDF
            resetTranscript(); // Réinitialiser le texte reconnu pour éviter les répétitions
        }
    }, [transcript, onGeneratePDF, resetTranscript]);

    return (
        <div>
            <p>Commande vocale : {transcript}</p>
            {listening ? <p>🎤 Écoute en cours...</p> : <p>🔴 Arrêté</p>}
            <button onClick={SpeechRecognition.stopListening}>
                ⏹️ Arrêter
            </button>
        </div>
    );
};
//CreatedAndDevelopedByWassimKhazri
//https://www.linkedin.com/in/wassim-khazri-ab923a14b/ 
export default VoiceCommand;
