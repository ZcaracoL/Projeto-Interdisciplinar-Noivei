// src/components/CoracaoCard.jsx
import { useState } from 'react';
import './coracaoCard.css';

export default function CoracaoCard({ casal, onAbrirModal }) {
  const [animacao, setAnimacao] = useState(false);

  return (
    <div 
      className={`heart-card ${animacao ? 'animar' : ''}`}
      style={{
        left: `${casal.posicaoX || Math.random() * 85 + 5}%`,
        animationDuration: `${casal.duracao || Math.random() * 8 + 9}s`
      }}
      onClick={() => onAbrirModal(casal)}
    >
      <div className="heart-wrapper">
        <svg className="heart-svg" viewBox="0 0 100 100">
          <path 
            d="M50,30 C50,15 30,5 18,15 C5,25 5,40 18,55 L50,85 L82,55 C95,40 95,25 82,15 C70,5 50,15 50,30 Z" 
            fill="#ff4d6d" 
            stroke="#c9184a" 
            strokeWidth="1.5"
          />
          <path 
            d="M50,38 C50,28 38,20 30,28 C22,36 22,46 30,55 L50,73 L70,55 C78,46 78,36 70,28 C62,20 50,28 50,38 Z" 
            fill="#ff8fa3" 
            opacity="0.7"
          />
        </svg>
        <div className="heart-thumbnail">
          <img src={casal.fotoCasal} alt={`${casal.nomeNoiva} e ${casal.nomeNoivo}`} />
        </div>
      </div>
    </div>
  );
}