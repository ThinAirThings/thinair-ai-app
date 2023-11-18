import styled from "styled-components";


export const CleanInput = styled.input`
    background: none;
    border: none;
    padding: 0;
    margin: 0;
    outline: none;
    box-shadow: none;
    appearance: none; // Removes inner padding and search cancel button in Safari and Chrome on macOS
    font-family: inherit; // To ensure the font is consistent with the rest of the UI
    font-size: 1em; // Reset font size to match the user's base setting
    color: currentColor; // Ensures the text color inherits from the parent element
    line-height: inherit; // Inherits the line-height from the parent
    width: 100%; // Assumes you want the input to fill its container

    &::-webkit-inner-spin-button,
    &::-webkit-outer-spin-button,
    &::-webkit-search-cancel-button,
    &::-webkit-search-decoration,
    &::-webkit-search-results-button,
    &::-webkit-search-results-decoration {
        -webkit-appearance: none;
        margin: 0;
    }
    
    &:focus {
        outline-offset: 0;
    }
`