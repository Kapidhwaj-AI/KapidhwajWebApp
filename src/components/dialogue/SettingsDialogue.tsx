import { IconX } from '@tabler/icons-react';
import React from 'react';

interface SettingsDialogueProps {
    onClose?: () => void;
}

export const SettingsDialogue: React.FC<SettingsDialogueProps> = ({ onClose }) => {
    return (
        <div>
            <button onClick={onClose}>
                <IconX size={24} color='red' />
            </button>
        </div>
    );
}; 