// // CreatedAndDevelopedByWassimKhazri
// // https://www.linkedin.com/in/wassim-khazri-ab923a14b/
import plan from "../../images/ISET/plan1.png";
import './RegmentInterne.css';
import ParticlesBackground from "../login/ParticlesBackground";

const DocumentsAdministratifs = () => {
    // Liste des fichiers avec leurs noms d'affichage
    const files = [
        { path: "/Reglements_interne.pdf", name: "Règlement Intérieur", type: "pdf" },
        { path: "/مطلب - تصريح على الشرف.pdf", name: "تصريح على الشرف", type: "pdf" },
        { path: "/بلاغ النقل الى المعاهد العليا للدراسات التكنولوجية.pdf", name: "بلاغ النقل", type: "pdf" },
        { path: "/demanderelecture.pdf", name: "Demande de lecture", type: "pdf" },
        { path: "/Stage_Perfectionnement.rar", name: "Stage_Perfectionnement.rar" , type: "rar" },
        { path: "/Cahier Des Charges PFE.pdf", name: "Cahier Des Charges PFE", type: "pdf"},
        { path: "/Stage_Initiation.rar", name: "Stage_Initiation.rar", type: "rar" },
        { path: "/مطلب شهادة حضور.pdf", name: "مطلب شهادة حضور", type: "pdf"},
        { path:"/Documents Stages PFE Licence.pdf", name:"Documents Stages PFE Licence", type: "pdf" },
        { path: "livret_stage_ISET J.pdf", name:"livret_stage_ISET J", type:"pdf"},
        { path: "بطاقة إرشادات - إلتزام.pdf", name:"بطاقة إرشادات - إلتزام", type: "pdf"},
        { path: "مطلب الحصول على نظير.pdf", name:"مطلب الحصول على نظير", type: "pdf"},
        { path: "مطلب الحصول على وثائق بالفرنسية.pdf", name: "مطلب الحصول على وثائق بالفرنسية", type: "pdf"}


    ];

    // Icônes selon le type de fichier
    const fileIcons = {
        pdf: "📄",
        rar: "🗄️",
        default: "📁"
    };

const handleDownload = (filePath, fileName) => {
        // Solution ultra-fiable avec création d'URL absolue
        const absoluteUrl = new URL(filePath, window.location.origin).href;
        const link = document.createElement('a');
        
        link.href = absoluteUrl;
        link.download = fileName;
        link.style.display = 'none';
        
        // Spécifique aux fichiers RAR
        link.setAttribute('type', 'application/x-rar-compressed');
        link.setAttribute('target', '_blank');
        
        document.body.appendChild(link);
        link.click();
        
        // Nettoyage après 1 seconde
        setTimeout(() => {
            document.body.removeChild(link);
        }, 1000);
    };
    // Style commun pour les boutons
    const buttonStyle = {
        padding: '12px 24px',
        backgroundColor: '#4CAF50',
        color: 'white',
        border: 'none',
        borderRadius: '6px',
        cursor: 'pointer',
        fontSize: '16px',
        margin: '10px',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        transition: 'all 0.3s ease'
    };

    return (
        <div className="reglement-container" style={{
            // backgroundImage: `url(${plan})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
            minHeight: '400px',
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
         //   backgroundColor: 'rgba(0,0,0,0.5)', // Overlay sombre pour meilleure lisibilité
         //   backgroundBlendMode: 'multiply'
        }}>

                  {/* Arrière-plan de particules */}
      <div style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: -1
      }}>
        {/* <ParticlesBackground /> */}
        <ParticlesBackground bgColor="#000000" />
      </div>
            <h2 style={{ 
                color: 'white', 
                textShadow: '2px 2px 4px rgba(0,0,0,0.5)', 
                marginBottom: '20px',
                fontSize: '2rem'
            }}>
                Documents Administratifs
            </h2>
            
            <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
                gap: '15px',
                width: '100%',
                maxWidth: '900px'
            }}>
                {files.map((file, index) => (
                    <button
                        key={index}
                        onClick={() => handleDownload(file.path, file.name)}
                        style={buttonStyle}
                        className="download-button"
                    >
                        <span style={{ fontSize: '1.2em' }}>
                            {fileIcons[file.type] || fileIcons.default}
                        </span>
                        {file.name}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default DocumentsAdministratifs;