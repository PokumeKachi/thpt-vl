<script>
  import logo from '$lib/img/logo.svg';
  import close from '$lib/img/icons/close.svg';

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
      if (event.propertyName === 'height') {
        console.log(event);
        clickDebounce = false
        button.classList.remove('hidden');

        if (menuOpened) {
          console.log(button.src);
          button.src = close;
        } else {
          button.src = logo;
        }
      }
    }

    button.addEventListener('transitionend',appearHandler);
  }
</script>

<div class='row header-row'>
  <div class='col-9'>...</div>
  <div class='col-2'>
    <div class='img-container'>
      <img on:click={logoClick}
        class='logo-button' src={logo} alt='menu'/>
      <img
        class='latch noclick' src={logo}/>
    </div>
  </div>
  <div class='col-9'>...</div>
</div>


<slot></slot>
