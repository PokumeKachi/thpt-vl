<script>
  import { onMount } from 'svelte';
  import logo from '$lib/img/logo.svg';
  import close from '$lib/img/icons/close.svg';

  import home from '$lib/img/icons/home.svg';

  import './layout.css';
  import '$lib/style.css';

  let clickDebounce = false;
  let menuOpened = false;
  const icons = []

  function iconToggle() {
    icons.forEach(icon => {
      icon.classList.toggle('hidden-icon');
    });
  }

  function appearHandler(event) {
    if (event.animationName === 'out') {
      const button = event.target;
      button.classList.remove('hidden');

      if (menuOpened) {
        button.src = close;
        iconToggle();
      } else {
        button.src = logo;
      }


      clickDebounce = false
    }
  }

  function logoClick(event) {
    if (clickDebounce) return;
    clickDebounce = true;
    menuOpened = !menuOpened;

    const button = event.target;

    button.classList.add('hidden');

    if (!menuOpened) iconToggle();

    button.addEventListener('animationend',appearHandler)
  }

  function main() {
    document.querySelectorAll('.icon').forEach(icon => {
      icons.push(icon);
    });;
  }

  onMount(main);
</script>

<div class='img-container noclick'>
  <img class='icon home-icon hidden-icon' src={home} alt='home'/>
</div>

<div class='img-container'>
  <img on:click={logoClick} class='logo-button' src={logo} alt='menu'/>
</div>

<style>
  .home-icon {
    transition: all .3s cubic-bezier(.7,.7,0,1);
    position: absolute;
    transform: translate(-150%,-50%);

    aspect-ratio: 1;

    background-color: #529913;
    border-radius: 50%;
  }

  .hidden-icon {
    transform: translate(0,0);
  }
</style>

<slot></slot>
