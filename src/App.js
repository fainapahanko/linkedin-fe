import React from 'react';
import MainComponent from './Components/MainComponent';
import NavigationBar from './Components/NavigationBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import LoadingBar from "./Components/LoadingBar";

function App() {
  return (
    <div className='App'>
      <NavigationBar />
      <MainComponent />
    </div>
  );
}
export default App;
