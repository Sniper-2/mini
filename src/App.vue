<template>
	<div id="app">
    <!-- <div class="header">
      <header-com></header-com>
    </div> -->

    <div class="content">
      <router-view />
    </div>
	</div>
</template>

<script>
// const headerCom = () => import('@/pages/header')
export default {
  name: 'app',
  components: {
    // headerCom
  },
};
</script>

<style>
@import url('//at.alicdn.com/t/font_1413581_b14gxc7z7c9.css');
*::-webkit-scrollbar {
  display: none;
}
</style>
