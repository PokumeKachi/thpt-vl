<script>
  import logo from '$lib/img/logo.svg';
  import close from '$lib/img/icons/close.svg';

  import home from '$lib/img/icons/home.svg';

  import './layout.css';
  import '$lib/style.css';

  let clickDebounce = false;
  let menuOpened = false;

  function logoClick(event) {
    if (clickDebounce) return;
    clickDebounce = true;
    menuOpened = !menuOpened;

    const button = event.target;

    button.classList.add('hidden');

    function appearHandler(event) {
      if (event.animationName === 'out') {
        button.classList.remove('hidden');

        if (menuOpened) {
          button.src = close;


        } else {
          button.src = logo;
        }

        clickDebounce = false
      }
    }

    button.addEventListener('animationend',appearHandler);
  }
</script>

<div class='img-container noclick'>
  <img class='home-icon' src={home} alt='home'/>
</div>

<div class='img-container'>
  <img on:click={logoClick} class='logo-button' src={logo} alt='menu'/>
</div>

<style>
  .hidden-icon {
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }

  .home-icon {
    transition: all .2s cubic-bezier(.7,.7,0,1);
    position: relative;
    top: 5%;
    right: 10%;
    aspect-ratio: 1;

    background-color: #529913;
    border-radius: 50%;
  }
</style>

<slot></slot>
