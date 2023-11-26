
type ShadowToken = {
  shadowType: string;
  radius: number;
  color: string;
  offsetX: number;
  offsetY: number;
  spread: number;
};

export const shadowTokenToString = (tokens: ShadowToken[]) => {
    return tokens.reduce((acc, token, index) => {
        // Destructure the token for easier access to properties
        const { offsetX, offsetY, radius, spread, color } = token;
        return acc + `${index !==0 ?',':''}${offsetX}px ${offsetY}px ${radius}px ${spread}px ${color}`;
    }, '')
}