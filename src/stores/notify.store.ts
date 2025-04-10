import { create } from 'zustand';

interface NotifyState {
    notification: {
        title: string;
        description: string;
    };
    isActive: boolean;
    notify: (title: string, description: string) => void;
    close: () => void;
}

export const useNotifyStore = create<NotifyState>((set) => ({
    notification: {
        title: '',
        description: '',
    },
    isActive: false,

    /**
     * 
     * @param title 
     * @param description 
     */
    notify: (title: string, description: string): void => {
        set({
            notification: {
                title,
                description,
            }, isActive: true
        });
        setTimeout(() => {
            set({ isActive: false });
        }, 3000);
    },
    /**
     * 
     * @returns void
     * @description This function closes the notification.
     * It sets the isActive state to false, effectively hiding the notification.
     */
    close: () => set({ isActive: false })
}));