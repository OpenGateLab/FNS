<template>
  <div class="min-h-screen flex flex-col sm:w-auto max-w-screen">
    <Header />
    <div class="flex-1 flex items-stretch bg-[##F0F6FA]">
      <LeftMenu class="hidden sm:block" />
      <slot></slot>
    </div>
  </div>
</template>
