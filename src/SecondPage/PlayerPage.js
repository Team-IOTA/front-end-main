import './PlayerPage.css';
import Player from './Player';
import React from 'react';



function PlayerPage() {
  return (
    
    <div className="PlayerPage">
      <header className="Playerpage-header">
        <div className="playerpage-container">
          <div className="playerpage-image">
            <Player/>
          </div>
        <br/>
        <br/>
        </div>
      </header>
    </div>
    
  );
}

export default PlayerPage;