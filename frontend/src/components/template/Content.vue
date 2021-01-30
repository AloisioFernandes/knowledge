<template>
  <div class="content">
    <router-view></router-view> <!-- Rederiza em Content o componente selecionado na rota -->
  </div>
</template>

<script>
export default {
  name: 'Content'
}
</script>

<style>
  .content {
    grid-area: content;
    background-color: #efefef;
    padding: 20px;
  }
</style>