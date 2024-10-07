import './Footer.css';
import { Copyright } from 'lucide-react';

function Footer() {
  return (
      <div className='footer'>
          <div className='container'>
              <p className='p1'>Home</p>
              <p className='p1'>Redeem</p>
              <p className='p1'>My Movies</p>
          </div>
          <div className='container'>
              <p>Help Center& Contact Us</p>
              <p>Legal Notice</p>
              <p>Privacy Policy</p>
              <p>Terms of Use</p>
              <p>Activate Your Device</p>
          </div>
          <div className='container'>
              <p>Interest-Based Ads</p>
              <p>Your Us State Privacy Rights</p>
              <p>Do Not Sell or Share My Personal Information</p>
              <p>Closed Captioning Inquiries</p>
          </div>
          <span><Copyright className="cr"/>Reels Orbit. All Rights Reserved.</span>
          <div className='logo3'>
              <p className='reels'>Reels</p>
              <p className='orbit'>Orbit</p>
          </div>
      </div>
  )
}

export default Footer
