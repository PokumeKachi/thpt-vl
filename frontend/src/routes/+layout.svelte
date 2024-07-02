<script>
  import { onMount } from 'svelte';

  import './layout.css';
  import '$lib/style.css';

  import logo from '$lib/img/logo.svg';
  import close from '$lib/img/close.svg';

  import home from '$lib/img/icons/home.svg';
  import news from '$lib/img/icons/news.svg';
  import event from '$lib/img/icons/event.svg';
  import resource from '$lib/img/icons/resource.svg';

  import chat from '$lib/img/icons/chat.svg';
  import setting from '$lib/img/icons/setting.svg';
  import about from '$lib/img/icons/about.svg';

  const icons = {
    'home': home,
    'news': news,
    'event': event,
    'resource': resource,
    'chat': chat,
    'setting': setting,
    'about': about,
  };

  const iconNames = Object.keys(icons);

  let clickDebounce = false;
  let menuOpened = false;

  const iconX = new Array(iconNames.length).fill(0);
  const iconY = new Array(iconNames.length).fill(0);

  function iconPosFormula(index,isOpened) {
    const duoIndex = Math.floor((index + 1)/2);

    const startY = -400.0;
    const alpha = duoIndex/5.7;

    iconX[index] = Math.sin(alpha * 3.14) * startY * (index % 2 ? 1 : -1);
    iconY[index] = Math.cos(alpha * 3.14) * startY;

    iconX[index] *= isOpened;
    iconY[index] *= isOpened;
  }

  function iconToggle(isOpened) {
    const startY = -175;
    const stepY = 50;
    iconNames.forEach((icon, index) => iconPosFormula(index,isOpened));
  }

  function appearHandler(event) {
    if (event.animationName === 'out') {
      const button = event.target;
      button.classList.remove('hidden-button');

      if (menuOpened) {
        button.src = close;
        iconToggle(1);
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

    button.classList.add('hidden-button');

    if (!menuOpened) iconToggle(0);

    button.addEventListener('animationend',appearHandler)
  }

  function step(timeStamp) {
    requestAnimationFrame(step);
  }

  onMount(() => {
    requestAnimationFrame(step);
  })
</script>

<div class='header'>
  {#each Object.entries(icons) as [alt,src], index}
    <img class='icon' style='transform: translate({iconX[index]}%,{iconY[index]}%);' {src} {alt}/>
  {/each}

  <img on:click={logoClick} class='logo-button' src={logo} alt='menu'/>
</div>

<slot></slot>
