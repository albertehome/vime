<div 
  class="break"
  bind:this={el}
></div>

<script context="module">
  export const LABEL = 'addNewLine';
</script>

<script>
  import { raf } from 'svelte/internal';
  import { onMount, onDestroy } from 'svelte';
  import { set_style, set_style_raf } from '@vime-js/utils';

  // --------------------------------------------------------------
  // Props
  // --------------------------------------------------------------

  let el;
  let nextControl;

  // --------------------------------------------------------------
  // Events
  // --------------------------------------------------------------

  onMount(() => {
    nextControl = el.nextElementSibling;
    set_style_raf(nextControl, 'marginLeft', 0);
  });

  onDestroy(() => {
    if (!nextControl) return;
    raf(() => {
      set_style(nextControl, 'marginLeft');
      nextControl = null;
    });
  });
</script>

<style type="text/scss">
  .break {
    width: 100%;
  }
</style>