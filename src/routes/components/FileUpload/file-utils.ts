


// Helper function to convert file to base64
export const convertFileToBase64 = (file: File) => {
    return new Promise<string>((resolve, reject) => {
        if (!file) reject('No file selected');
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
};