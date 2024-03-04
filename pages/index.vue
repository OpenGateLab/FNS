<template>
  <div>
    <div class="home flex flex-col items-center flex-1 px-4 sm:px-8 pb-24 sm:pb-36 lg:pb-48">
      <h1
        class="mt-24 mb-4 sm:mb-8 text-[#0092FA] text-4xl md:text:5xl xl:text-6xl font-extrabold uppercase text-center"
      >
        {{ $t('home.start1') }}<br />{{ $t('home.start2') }}
      </h1>
      <h3 class="mt-4 sm:mt-6 mb-12 sm:mb-18 text-gray-500 text-2xl text-center">
        {{ $t('home.desc1') }}<br class="hidden sm:block" />{{ $t('home.desc2') }}
      </h3>
      <HomeSearch />
    </div>
    <div style="background: linear-gradient(180deg, #2c51c9 0%, #2c86ef 100%)">
      <div
        class="pt-8 sm:pt-12 md:pt-10 px-4 sm:px-auto flex flex-col items-center pb-10 cooperative-box"
      >
        <h2 class="text-4xl text-white font-extrabold text-center mb-10">
          {{ $t('home.partnership') }}
        </h2>
        <!-- <h3 class="text-2xl text-white mt-4 sm:mt-6 text-center w-auto sm:w-1/2">
          {{ $t('home.desc5') }}
          {{ $t('home.desc6') }}
          {{ $t('home.desc7') }}
          {{ $t('home.desc8') }}
        </h3> -->
        <div
          class="cooperative-wrap flex flex-wrap items-center justify-center"
          style="max-width: 1080px"
        >
          <div
            class="item-wrap flex items-center justify-center w-1/2 md:w-1/5 pl-5 pr-5"
           
          >
            <img style="width: 100%" alt="" src="@/assets/imgs/LOGO/1.png" />
          </div>
          <div
            class="item-wrap flex items-center justify-center w-1/2 md:w-1/5 pl-5 pr-5"
           
          >
            <img style="width: 100%" alt="" src="@/assets/imgs/LOGO/2.png" />
          </div>
          <div class="item-wrap flex items-center justify-center w-1/2 md:w-1/5 pl-5 pr-5">
            <img style="width: 100%" alt="" src="@/assets/imgs/LOGO/3.png" />
          </div>
          <div class="item-wrap flex items-center justify-center w-1/2 md:w-1/5 pl-5 pr-5">
            <img style="width: 100%" alt="" src="@/assets/imgs/LOGO/4.png" />
          </div>
          <div class="item-wrap flex items-center justify-center w-1/2 md:w-1/5 pl-5 pr-5">
            <img style="width: 100%" alt="" src="@/assets/imgs/LOGO/7.png" />
          </div>
          <div class="item-wrap flex items-center justify-center w-1/2 md:w-1/6 pl-5 pr-5">
            <img style="width: 100%" alt="" src="@/assets/imgs/LOGO/5.png" />
          </div>
          <div class="item-wrap flex items-center justify-center w-1/2 md:w-1/6 pl-5 pr-5">
            <img style="width: 100%" alt="" src="@/assets/imgs/LOGO/6.png" />
          </div>
          <div class="item-wrap flex items-center justify-center w-1/2 md:w-1/6 pl-5 pr-5">
            <img style="width: 100%" alt="" src="@/assets/imgs/LOGO/8.png" />
          </div>
          <div class="item-wrap flex items-center justify-center w-1/2 md:w-1/6 pl-5 pr-5">
            <img style="width: 100%" alt="" src="@/assets/imgs/LOGO/9.png" />
          </div>
          <div class="item-wrap flex items-center justify-center w-1/2 md:w-1/6 pl-5 pr-5">
            <img style="width: 100%" alt="" src="@/assets/imgs/LOGO/10.png" />
          </div>
        </div>
      </div>
      <!-- <div
        style="margin-top: -18rem"
        class="flex justify-start sm:justify-center flex-row px-4 overflow-x-auto flex-nowrap w-full items-stretch h-164 sm:h-172 text-center"
      >
        <div class="flex flex-col items-center w-10/12 sm:w-90 px-4 flex-shrink-0 h-full">
          <img src="@/assets/imgs/home1.png" class="w-80 h-auto" />
          <h5 class="py-3 sm:py-6 md:py-8 text-3xl text-[#374957] font-bold">
            {{ $t('home.intro1title') }}
          </h5>
          <p class="text-base text-[#8D8D8D] px-2 flex-1">
            {{ $t('home.intro1desc') }}
          </p>
          <button
            class="text-xl text-[#3373EB] rounded-xl px-8 py-4 mt-3 sm:mt-5"
            style="background: linear-gradient(132deg, #cbe6fc 0%, #ebeeff 100%)"
          >
            {{ $t('home.coming') }}
          </button>
        </div>
        <div class="flex flex-col items-center w-10/12 sm:w-90 flex-shrink-0 px-4 h-full">
          <img src="@/assets/imgs/home2.png" class="w-80 h-auto" />
          <h5 class="py-3 sm:py-6 md:py-8 text-3xl text-[#374957] font-bold">
            {{ $t('home.intro2title') }}
          </h5>
          <p class="text-base text-[#8D8D8D] px-2 flex-1">
            {{ $t('home.intro2desc') }}
          </p>
          <button
            class="text-xl text-[#3373EB] rounded-xl px-8 py-4 mt-3 sm:mt-5"
            style="background: linear-gradient(132deg, #cbe6fc 0%, #ebeeff 100%)"
          >
            {{ $t('home.coming') }}
          </button>
        </div>
        <div class="flex flex-col items-center w-10/12 sm:w-90 flex-shrink-0 px-4 h-full">
          <img src="@/assets/imgs/home3.png" class="w-80 h-auto" />
          <h5 class="py-3 sm:py-6 md:py-8 text-3xl text-[#374957] font-bold">
            {{ $t('home.intro3title') }}
          </h5>
          <p class="text-base text-[#8D8D8D] px-2 flex-1">
            {{ $t('home.intro3desc') }}
          </p>
          <button
            class="text-xl text-[#3373EB] rounded-xl px-8 py-4 mt-3 sm:mt-5"
            style="background: linear-gradient(132deg, #cbe6fc 0%, #ebeeff 100%)"
          >
            {{ $t('home.coming') }}
          </button>
        </div>
      </div> -->
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'home' })
</script>

<style scoped lang="less">
.home {
  background: url('~/assets/imgs/Background.png') top center no-repeat;
}

.item-wrap {
  min-height: 60px;
}

@media (min-width: 1560px) {
  .cooperative-box {
    background: url('~/assets/imgs/logo-bg.png');
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    width: 100%;
    // max-width: 1080px;
    height: auto;
  }
}

</style>
