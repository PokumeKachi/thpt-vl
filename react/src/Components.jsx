import './Components.css';
import logo from './assets/logo.svg';
import closeButton from './assets/icons/close.svg'

function onLogoClick(event) {
  let button = event.target;

  if (button.classList.contains('logo-button-hidden')) {
    button.classList.remove('logo-button-hidden'); 
  } else {
    button.classList.add('logo-button-hidden');
  }
  console.log('clicked!');
}

function Header() {
  return (
    <div className="row header-row">
      <div className="col-9">...</div> 
      <div className='col-2'>
        <div className='header-container'>
          <img className='logo-button' src={logo} alt='menu' onClick={onLogoClick}/>
          <img id='close-button' className='close-button' src={closeButton} alt='close'/>
        </div>
      </div>
      <div className="col-9">...</div>
    </div>
  );
}

function Card(props) {
  return(
    <div className='card'>

      <img className='card-img' src='https://pbs.twimg.com/media/D3cGs3FXkAA6cWn.png' alt='profile picture' />

      <h2 className='card-title'> Kachi </h2>

      <p className='card-text'> I write code </p>

    </div>
  );
}

function Footer() {
  return(
    <footer>

      <p>

        &copy; {new Date().getFullYear()} THPT VL 

      </p>

    </footer>
  );
}

export { Header, Card, Footer };
