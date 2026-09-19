import React from 'react';
import { MaterialsSection } from './MaterialsSection';
import { SpecialOffer, PlumbingMaterial } from '../types';

interface SpecialOffersProps {
  onClaimOffer?: (offer: SpecialOffer) => void;
  onSelectMaterial?: (material: PlumbingMaterial) => void;
}

export const SpecialOffers: React.FC<SpecialOffersProps> = ({ onClaimOffer, onSelectMaterial }) => {
  return (
    <MaterialsSection
      onSelectMaterial={(mat) => {
        if (onSelectMaterial) onSelectMaterial(mat);
        if (onClaimOffer) {
          onClaimOffer({
            id: mat.id,
            title: mat.name,
            price: mat.price,
            originalPrice: mat.originalPrice,
            note: 'Material selecionado',
            code: 'MATERIAL',
            iconName: 'leak',
          });
        }
      }}
    />
  );
};
