<template>
  <div class="flex mt-12 sm:mt-0 h-10 mb-10 justify-center border-t pt-6 box-border mx-4 sm:mx-8">
    <div class="flex-center justify-around mr-8" style="width: 8rem">
      <a href="https://discord.com/invite/3YDTJ2DnuE"
        ><img src="@/assets/imgs/LOGO_DC.png" style="height: 2.5rem"
      /></a>
      <a href="https://twitter.com/OpenGateNFT"
        ><img src="@/assets/imgs/LOGO_TW.png" style="height: 2.5rem"
      /></a>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    show?: boolean
  }>(),
  { show: false }
)
</script>

<style scoped lang="less"></style>
