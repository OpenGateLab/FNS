<template>
  <!--  <ClientOnly>-->
  <el-dropdown class="self-center" size="large" trigger="click" @command="changeLanguage">
    <span class="el-dropdown-link uppercase">
      {{ locale }}
      <el-icon class="el-icon--right">
        <arrow-down />
      </el-icon>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-radio-group v-model="locale" class="flex flex-col" size="large">
          <el-dropdown-item v-for="(item, index) in locales" :key="index" :command="item.code">
            <div class="flex-center px-4">
              <span class="w-20"> {{ item.name }}</span>
              <el-radio :label="item.code" class="uppercase" size="large"></el-radio>
            </div>
          </el-dropdown-item>
        </el-radio-group>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
  <!--  </ClientOnly>-->
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useAccountStore } from '~/store'
const accountStore = useAccountStore()

const { locale, locales } = useI18n()
const changeLanguage = localeCode => {
  locale.value = localeCode
  accountStore.setLanguage(locale.value)
}
</script>
