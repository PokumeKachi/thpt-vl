<script>
  import logo from '$lib/img/logo.svg';
  import close from '$lib/img/icons/close.svg';

  import './layout.css';
  import '$lib/style.css';

  function logoClick(event) {
    let logoButton = document.getElementById('logo-button');
    let closeButton = document.getElementById('close-button');

    logoButton.classList.toggle('logo-button-hidden');
    closeButton.classList.toggle('close-button-hidden');

    logoButton.classList.add('noclick');
    closeButton.classList.add('noclick');

    if (closeButton.classList.contains('logo-button-hidden')) {
      closeButton.classList.toggle('close-button-shrunk');
    }
  }
</script>

<div class='row header-row'>
  <div class='col-9'>...</div>
  <div class='col-2'>
    <div class='header-container'>
      <img on:click={logoClick}
        id='close-button' class='close-button close-button-hidden' src={close} alt='close'/>
      <img on:click={logoClick}
        id='logo-button' class='logo-button' src={logo} alt='menu'/>
    </div>
  </div>
  <div class='col-9'>...</div>
</div>


<slot></slot>
