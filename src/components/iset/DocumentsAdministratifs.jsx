import { useState } from "react";
import plan from "../../images/ISET/plan1.png";
import './RegmentInterne.css';
import ParticlesBackground from "../login/ParticlesBackground";
import { ReactComponent as PdfIcon } from "../../icons/pdf.svg";
import { ReactComponent as RarIcon } from "../../icons/rar.svg";
import { ReactComponent as FileIcon } from "../../icons/file.svg";

const DocumentsAdministratifs = () => {
    const [searchTerm, setSearchTerm] = useState("");

    const files = [
        { path: "/Reglements_interne.pdf", name: "Règlement Intérieur", type: "pdf" },
        { path: "/مطلب - تصريح على الشرف.pdf", name: "تصريح على الشرف", type: "pdf" },
        { path: "/بلاغ النقل الى المعاهد العليا للدراسات التكنولوجية.pdf", name: "بلاغ النقل", type: "pdf" },
        { path: "/demanderelecture.pdf", name: "Demande de lecture", type: "pdf" },
        { path: "/Stage_Perfectionnement.rar", name: "Stage_Perfectionnement.rar", type: "rar" },
        { path: "/Cahier Des Charges PFE.pdf", name: "Cahier Des Charges PFE", type: "pdf"},
        { path: "/Stage_Initiation.rar", name: "Stage_Initiation.rar", type: "rar" },
        { path: "/مطلب شهادة حضور.pdf", name: "مطلب شهادة حضور", type: "pdf"},
        { path:"/Documents Stages PFE Licence.pdf", name:"Documents Stages PFE Licence", type: "pdf" },
        { path: "livret_stage_ISET J.pdf", name:"livret_stage_ISET J", type:"pdf"},
        { path: "بطاقة إرشادات - إلتزام.pdf", name:"بطاقة إرشادات - إلتزام", type: "pdf"},
        { path: "مطلب الحصول على نظير.pdf", name:"مطلب الحصول على نظير", type: "pdf"},
        { path: "مطلب الحصول على وثائق بالفرنسية.pdf", name: "مطلب الحصول على وثائق بالفرنسية", type: "pdf"},
        { path: "القانون المنظم للامتحانات.pdf", name:"القانون المنظم للامتحانات", type: "pdf"}
    ];

    const fileIcons = {
        pdf: <PdfIcon style={{ width: "24px", height: "24px" }} />,
        rar: <RarIcon style={{ width: "24px", height: "24px" }} />,
        default: <FileIcon style={{ width: "24px", height: "24px" }} />
    };

    const handleDownload = (filePath, fileName) => {
        const absoluteUrl = new URL(filePath, window.location.origin).href;
        const link = document.createElement('a');
        link.href = absoluteUrl;
        link.download = fileName;
        link.style.display = 'none';
        link.setAttribute('type', 'application/x-rar-compressed');
        link.setAttribute('target', '_blank');
        document.body.appendChild(link);
        link.click();
        setTimeout(() => {
            document.body.removeChild(link);
        }, 1000);
    };

    const filteredFiles = files.filter(file =>
        file.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="reglement-container">
            <div style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                zIndex: -1
            }}>
                <ParticlesBackground bgColor="#000000" />
            </div>

            <h2>Documents Administratifs</h2>

            <input
                type="text"
                placeholder="🔍 Rechercher un document..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
            />

            <div className="download-grid">
                {filteredFiles.map((file, index) => (
                    <button
                        key={index}
                        onClick={() => handleDownload(file.path, file.name)}
                        className="download-button fade-in"
                        style={{ animationDelay: `${index * 0.1}s` }}
                    >
                        {fileIcons[file.type] || fileIcons.default}
                        {file.name}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default DocumentsAdministratifs;
