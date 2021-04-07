import { toastController } from '@ionic/vue'

export const showToast = async (message: string, duration: number, color: string) => {
    const toast = await toastController.create({
        message: message,
        duration: duration,
        color: color
    });
    return toast.present();
};

export const showToastWithButton = async (message: string, color: string) => {
    const toast = await toastController.create({
        message: message,
        color: color,
        buttons: [
            {
                text: 'OK',
                role: 'cancel'
            }
        ]
    });
    return toast.present();
};

