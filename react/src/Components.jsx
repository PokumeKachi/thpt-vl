import './Components.css';
import logo from './assets/logo.svg';

function onLogoClick() {
  console.log('clicked!');
}

function Header() {
  return (
    <div className="row">
      <div className="col-9">...</div> 
      <div className='col-2'>
        <img className='logo-button' src={logo} alt='nut' onClick={onLogoClick}/>
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
