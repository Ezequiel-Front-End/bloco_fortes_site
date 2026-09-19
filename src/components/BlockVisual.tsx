import React from 'react';

export type BlockType =
  | 'bloco-concreto-eps'
  | 'bloco-eps-100'
  | 'bloco-estrutural-14'
  | 'bloco-vedacao-14'
  | 'canaleta-concreto-u'
  | 'paver-intertravado-6cm'
  | 'cobogo-decorativo-concreto'
  | 'meio-bloco-estrutural'
  | 'bloco-celular-cca'
  | 'grout-alvenaria-25kg';

interface BlockVisualProps {
  type: string;
  className?: string;
  size?: number | string;
  isHovered?: boolean;
}

export const BlockVisual: React.FC<BlockVisualProps> = ({
  type,
  className = '',
  size = '100%',
  isHovered = false,
}) => {
  const isEps = type.toLowerCase().includes('eps');

  // Usa as imagens enviadas pelo usuário
  const imageSrc = isEps ? '/bloco-eps-transparente.png' : '/bloco-transparente.png';

  const imageStyles: React.CSSProperties = {
    width: '100%',
    height: '100%',
    // Ambas as imagens agora são PNGs com fundo removido, não precisamos mais de mixBlendMode
    mixBlendMode: 'normal',
    filter: 'contrast(1.1) brightness(1.2)'
  };

  return (
    <div style={{ width: size, height: 'auto', display: 'flex', justifyContent: 'center' }}>
      <img
        src={imageSrc}
        alt={`Bloco modelo para ${type}`}
        style={imageStyles}
        className={`transition-transform duration-500 object-contain drop-shadow-2xl scale-[1.65] ${
          isHovered ? 'scale-[1.85] -translate-y-3' : ''
        } ${className}`}
      />
    </div>
  );
};
