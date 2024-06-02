import React from 'react'

const Footer = () => {
  return (
    <div className='footer-container'>
        <div className='footer-text'>
        <h1>Instructions</h1>
        <p className='font-1'>Move tiles in grid to order them from <span className='bold-text'> 1 to 15</span>. To move a tile you can click on it or use your arrow keys. Press ESC to pause game.</p>
        </div>
        <hr />
        <div className="footer-img">
            <img src="https://lorecioni.github.io/fifteen-puzzle-game/img/15teenlogo.png" alt="" className='foot-img'/>
            <div className="foot-text">
                <p>15teen Puzzle Game</p>
            </div>
        </div>
     <div className='bottom-text'>
        Designed by <a href='https://github.com/Jahanvi215' target='_blanck'>
            Jahanvi Tharu</a>
     </div>
    </div>
  )
}

export default Footer