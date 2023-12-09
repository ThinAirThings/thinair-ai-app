


// Helper function to convert file to base64
export const convertFileToBase64 = (file: File) => {
    return new Promise<string>((resolve, reject) => {
        if (!file) reject('No file selected');
        const reader = new FileReader();
        reader.onloadend = () => {
            const base64String = reader.result as string;
            resolve(base64String);
        }
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
};