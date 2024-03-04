<template>
  <div
    v-loading="loading"
    :element-loading-text="$t('result.loading')"
    class="p-4 flex-1 flex flex-col items-end max-w-full md:w-auto overflow-x-auto"
  >
    <el-table
      border
      size="large"
      header-cell-class-name="!bg-gray-100"
      :data="storedDomains"
      stripe
    >
      <el-table-column prop="name" label="Name" class-name="font-mono" sortable>
        <template #default="scope">
          <span class="flex-center justify-start">
            {{ scope.row.name }}
            <template v-if="scope.row.address">
              <el-icon class="mx-2"><Right /></el-icon>
              <el-tag>{{ scope.row.address }}</el-tag>
            </template>
          </span>
        </template>
      </el-table-column>
      <el-table-column
        prop="expires"
        :label="$t('result.expires')"
        align="center"
        width="300"
        sortable
      >
        <template #default="scope">
          <el-tag v-if="scope.row.expires" type="warning" disable-transitions>{{
            scope.row.expires
          }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="available"
        :label="$t('result.available')"
        align="center"
        sortable
        width="200"
      >
        <template #default="scope">
          <span v-if="scope.row.available" class="text-green-500 font-semibold flex-center text-xs">
            <el-icon size="15" class="mr-1"><SuccessFilled /></el-icon>
            {{ $t('result.available') }}
          </span>
          <span v-else class="text-gray-400 font-semibold flex-center text-xs">
            <el-icon size="15" class="mr-1"><WarningFilled /></el-icon>
            {{ $t('result.unavailable') }}
          </span>
        </template>
      </el-table-column>

      <el-table-column :label="$t('fav.handle')" align="center" width="250">
        <template #default="scope">
          <NuxtLink :to="`/domain/${scope.row.name}`" class="mr-2.5 cursor-pointer">
            <el-button
              :type="scope.row.available ? 'success' : 'primary'"
              size="small"
              class="!w-20"
              plain
              >{{ scope.row.available ? $t('domain.register2') : $t('fav.detail') }}</el-button
            ></NuxtLink
          >

          <el-popconfirm
            :title="$t('fav.remove')"
            @confirm="domainsStore.storeDomain(scope.row.name)"
          >
            <template #reference>
              <el-button type="danger" size="small" icon="Delete" circle plain />
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="mt-4 transform translate-x-4"
      layout="prev, pager, next"
      :total="storedDomains.length"
    />
  </div>
</template>

<script setup lang="ts">
import { useDomainsStore } from '~/store'
import { TipError } from '~~/composables'
import API from '~~/libs/api'

const loading = ref(false)
const domainsStore = useDomainsStore()
const storedDomains = ref([])
const t = useNuxtApp().$i18n.t

async function getFavouriteNames() {
  const _names = domainsStore.$state.storedDomains
  if (!_names.length) return

  try {
    loading.value = true
    const requests = _names.filter(n => n).map(API.getNameInfo)
    storedDomains.value = await Promise.all(requests)
  } catch (error) {
    TipError(t('error.network'))
  } finally {
    loading.value = false
  }
}

watchEffect(getFavouriteNames)
</script>

<style scoped lang="less"></style>
