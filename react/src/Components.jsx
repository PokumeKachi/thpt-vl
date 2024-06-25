import './Components.css';

function Header() {
  return(
    <header>

      <h1>THPT VL</h1>
        
      <nav>
        <ul>
          <li> <a href="#"> Home </a> </li>
        </ul>
      </nav>

      <hr/>

    </header>
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
