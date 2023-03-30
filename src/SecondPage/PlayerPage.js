import './PlayerPage.css';
import Player from './Player';



function PlayerPage() {
  return (
    <div className="App">
      <header className="App-header">

        <div className="player-container">
        <div className="player-image">
          <Player/>
        </div>
        <div className="player-text">
          <p>Summary</p>
          <button onclick='addNotes()' className="addcustomnotes">Add Custom Notes</button>
        </div>
        <br/>
        
        
        <br/>
        
        </div>
      
      </header>
    </div>
  );
}

export default PlayerPage;