import React from "react";

const fileContext = React.createContext({
    language: '',
    words: [],
    setLanguage: () => {},
    setWords: () => {},
});

export default fileContext;