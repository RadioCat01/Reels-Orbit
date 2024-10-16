import './Hero.css';
import joker from '../../assets/joker.jpg';
import outlaw from '../../assets/outlaw.jpg';
import godFather from '../../assets/godfather.jpg';
import borderland from '../../assets/borderland.jpg';
import alien from '../../assets/alien.jpg';
import killerH from '../../assets/killerHeat.jpg';
import lor from '../../assets/lor.jpg';
import flesh from '../../assets/flesh.jpg';
import fifty from '../../assets/fifty.jpg';
import gbu from '../../assets/gbu.jpg';
import wr from '../../assets/wr.jpg';
import gf from '../../assets/gf.jpg';

function Hero() {
  return (
    <div className="herosection">
        <div className="banner">
        <div className='logoHero'>
              <p className='reels'>Reels</p>
              <p className='orbit'>Orbit</p>
        </div>
     
      <div className="slider"  style={{ '--quantity': 12 }}>
        <div className="item" style={{ '--position': 1 }}><img src={joker} alt="bg" /></div>
        <div className="item" style={{ '--position': 2 }}><img src={outlaw} alt="bg" /></div>
        <div className="item" style={{ '--position': 3 }}><img src={godFather} alt="bg" /></div>
        <div className="item" style={{ '--position': 4 }}><img src={borderland} alt="bg" /></div>
        <div className="item" style={{ '--position': 5 }}><img src={alien} alt="bg" /></div>
        <div className="item" style={{ '--position': 6 }}><img src={killerH} alt="bg" /></div>
        <div className="item" style={{ '--position': 7 }}><img src={lor} alt="bg" /></div>
        <div className="item" style={{ '--position': 8 }}><img src={flesh} alt="bg" /></div>
        <div className="item" style={{ '--position': 9 }}><img src={fifty} alt="bg" /></div>
        <div className="item" style={{ '--position': 10 }}><img src={gbu} alt="bg" /></div>
        <div className="item" style={{ '--position': 11 }}><img src={wr} alt="bg" /></div>
        <div className="item" style={{ '--position': 12 }}><img src={gf} alt="bg" /></div>
      </div>
      </div>

     </div>
  )
}

export default Hero
