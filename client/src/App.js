import logo from './logo.svg';
import './App.css';

function App() {
   return (
      <div className="App">
         <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p>Hello Rafa</p>
            <a
               className="App-link"
               href="/auth/google"
               target="_blank"
               rel="noopener noreferrer"
            >
               Sign In With Google
            </a>
         </header>
      </div>
   );
}

export default App;
