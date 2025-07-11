import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import './HexMenu.css';
import plan from "../../images/ISET/plan1.png";
//CreatedAndDevelopedByWassimKhazri
//https://www.linkedin.com/in/wassim-khazri-ab923a14b/
const hexButtons = [
    { 
        label: "SIGN UP", 
        icon: <i className="fa fa-pencil-square-o"></i>,
        path: "/signup"
    },
    { 
        label: "SIGN IN",
        icon: <i className="fa fa-sign-in"></i>,
        path: "/iset/login"
    }, 
    { 
        label: "INFORMATION", 
        icon: <i className="fa fa-info-circle"></i>,
        path: "/about"
    },
    { 
        label: "STATISTICS", 
        icon: <i className="fa fa-bar-chart"></i>,
        path: "/stats"
    }, 
    { 
        label: "NEWS", 
        icon: <i className="fa fa-television"></i>, 
        active: true,
        path: "/news"
    }, 
    { 
        label: "SITE RULES", 
        icon: <i className="fa fa-clipboard"></i>,
        path: "/rules"
    },
    { 
        label: "SUPPORT", 
        icon: <i className="fa fa-envelope"></i>,
        path: "/help"
    },
];

const HexButton = ({ path, label, icon, active }) => {
    const navigate = useNavigate();
    
    return (
        <motion.div
            className={`hex-button text-white text-sm font-semibold flex flex-col items-center justify-center relative cursor-pointer ${
                active ? "border-4 border-red-500" : "border-2 border-white"
            }`}
            whileHover={{ scale: 1.5 }}
            onClick={() => navigate(path)}
        >
            <div className="text-2xl mb-1">
                {icon}
            </div>
            <div>{label}</div>
        </motion.div>
    );
};

const HexMenu = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-200 to-blue-500 flex items-center justify-center p-4"
        style={{
            backgroundImage: `url(${plan})`,
            backgroundPosition: "center",
            backgroundSize: "cover"
        }}
        >
            <div className="hex-container">
                <div className="hexagon-menu clear">
                    <div className="hexagon-item">
                        <div className="hex-item">
                            {/* Première rangée */}
                            <div className="hex-row">
                                {hexButtons.slice(0, 4).map((btn, i) => (
                                    <HexButton key={i} {...btn} />
                                ))}
                            </div>
                            
                            {/* Deuxième rangée décalée */}
                            <div className="hex-row offset center">
                                {hexButtons.slice(4).map((btn, i) => (
                                    <HexButton key={i+4} {...btn} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="pt-table desktop-768">
            </div>
        </div>
    );
};

export default HexMenu;
//CreatedAndDevelopedByWassimKhazri
//https://www.linkedin.com/in/wassim-khazri-ab923a14b/