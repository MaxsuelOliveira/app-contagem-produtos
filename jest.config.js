module.exports = {
  preset: "react-native",
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "babel-jest", // Isso garante que os arquivos JS e JSX sejam transformados pelo Babel
  },
  // transformIgnorePatterns: [
  //   'node_modules/(?!react-native|@react-navigation/)', // Permite que certas bibliotecas de node_modules sejam transformadas
  // ],
  transformIgnorePatterns: [
     "node_modules/(?!@react-native|@react-navigation|@expo/vector-icons|react-native|expo-font|expo-status-bar|react-native-uuid|realm|@expo/vector-icons/AntDesign)/"
    
    ],
  
};
