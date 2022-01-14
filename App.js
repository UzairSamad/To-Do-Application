import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Navigation from "./src/navigation"
import firebase from 'firebase';
const App = () => {


  useEffect(() => {
    const firebaseConfig = {
      apiKey: "AIzaSyBkFArh7w6eJfCiN9AX4cEyZHdTiNHrdyY",
      authDomain: "techzone-f5e3e.firebaseapp.com",
      projectId: "techzone-f5e3e",
      storageBucket: "techzone-f5e3e.appspot.com",
      messagingSenderId: "754883547773",
      appId: "1:754883547773:web:7a60ceffa6a9b80aa51714",
      measurementId: "G-XX96G6KJ6E"
    };

  if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
}
  }, [])

  return (
    <NavigationContainer>
      <Navigation />
    </NavigationContainer>
  );
}

export default App