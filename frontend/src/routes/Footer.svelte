<script>
  import { onMount } from 'svelte';
  onMount(main);

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

  const iconX = new Array(iconNames.length + 1).fill(0);
  const iconY = new Array(iconNames.length + 1).fill(0);
  const iconSize = new Array(iconNames.length + 1).fill(0.0);
  iconSize[iconNames.length] = 100;

  const mouse = { x: 0, y: 0 };

  let menuOpened = false;
  let iconsShowed = false;
  let clickDisabled = false;
  let bufferClose = false;
  let pressed = false;
  let animating = false;
  let selectedIndex = -1;

  let mainButton = null;

  const squared = x => x * x;
  const lerp = (a, b, t) => a + (b - a) * t;
  const smoothstep = x => -2 * Math.pow(x, 3) + 3 * Math.pow(x, 2);

  const schedule = (interval, callback, condition) => {
    if (!condition) {
      window.setTimeout(() => schedule(interval, callback, condition), interval);
    } else {
      callback();
    }
  }

  const selectionHandler = () => {
    const elements = document.querySelectorAll('.icon');

    const low = 1e3;
    const high = 2e4;

    let min_dist, min_index = -1;

    elements.forEach(element => {
      const { top, left, bottom, right } = element.getBoundingClientRect();
      const x = (left + right) / 2;
      const y = (top + bottom) / 2;

      const index = parseInt(element.getAttribute('index'));
      const ratio = (right - left) / iconSize[index];
      const distance = (squared(mouse.x - x) + squared(mouse.y - y)) / ratio;

      if (min_index == -1 || distance / ratio < min_dist) {
        min_dist = distance;
        min_index = index;
      }

      const size = (distance < low) ? 100 : (distance > high ? 25 : (25 + 75 * (high - distance) / (high - low)))
      iconSize[index] = size;
    });

    const set = () => {
      selectedIndex = min_index;
      elements[selectedIndex].classList.add('icon-hover');
    }

    const reset = () => {
      elements[selectedIndex].classList.remove('icon-hover');
    }

    if (min_dist < (low + (high - low) * 0.7)) {
      if (selectedIndex != min_index) {
        if (selectedIndex != -1) reset();
        set();
      }
      mainButton.classList.remove('icon-hover');
    } else {
      if (selectedIndex != -1) reset();
      mainButton.classList.add('icon-hover');
    }
  }

  const mouseLeaveHandler = () => mouseUp({ target: mainButton });
  const updateMousePos = ({ clientX, clientY }) => { mouse.x = clientX, mouse.y = clientY; };

  function main() {
    requestAnimationFrame(step);

    window.onmouseup = mouseLeaveHandler;
    window.onmousemove = updateMousePos;

    mainButton = document.getElementById('main-button');
  }

  function step(timeStamp) {
    if (menuOpened && !animating) selectionHandler();
    requestAnimationFrame(step);
  }

  function iconPosFormula(index,isOpened) {
    const duoIndex = Math.floor((index + 1)/2);

    const startY = -200.0;
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
    iconNames.forEach((icon, index) => iconSize[index] = 25 * menuOpened);
  }

  function showMenu(menuButton) {
    menuButton.classList.remove('hidden-button');
    menuButton.src = menuOpened ? close : logo;
    if (menuOpened) iconToggle(1);
  }

  function onMenuShown(menuButton) {
    if (menuOpened && !pressed) {
      menuInit(menuButton);
    } else {
      clickDisabled = false;
      animating = false;
    }
  }

  function animationEnd({ animationName, target }) {
    if (animationName === 'out') showMenu(target);
    if (animationName === 'in') onMenuShown(target);
  }

  function menuInit(button) {
    clickDisabled = true;
    animating = true;

    menuOpened = !menuOpened;
    iconSize[iconNames.length] = 100;
    document.documentElement.style.cursor = menuOpened ? 'none' : '';
    if (!menuOpened) {
      iconToggle(0);
    }
    button.classList.add('hidden-button');
  }

  function mouseDown({ target }) {
    if (clickDisabled || menuOpened) return;
    pressed = true;
    //document.onmouseleave = mouseLeaveHandler;
    menuInit(target);
  }

  function mouseUp({ target }) {
    pressed = false;
    document.onmouseleave = null;
    if (clickDisabled || !menuOpened) return;
    menuInit(target);
  }

</script>

<div class='footer'>
  {#each Object.entries(icons) as [alt,src], index}
    <div style='transform: translate( { iconX[index] }%, { iconY[index] }% )' class='icon-container noclick' >
      <img style='height: { iconSize[index] }%' class='icon' {src} {alt} {index}/>
    </div>
  {/each}

  <div class='img-container'>
    <img style='height: { (menuOpened && !animating) ? iconSize[iconNames.length] : 'auto' }%' id='main-button' class='main-button' src={logo} alt='menu' index={iconNames.length}
      on:animationend={animationEnd}
      on:mousedown={mouseDown}
      />
  </div>

</div>

<style>

</style>
