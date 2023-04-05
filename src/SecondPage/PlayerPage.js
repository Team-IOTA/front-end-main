import './PlayerPage.css';
import Player from './Player';
import React from 'react';



function PlayerPage() {
  return (
    
    <div className="PlayerPage">
      <header>
        <div className="playerpage-container">
            <Player/>
          </div>
        
      </header>
    </div>
    
  );
}

export default PlayerPage;