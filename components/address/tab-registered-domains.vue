<template>
  <div class="flex flex-col items-end">
    <el-table ref="tableRef" size="large" row-key="date" :data="data" @row-click="rowClick">
      <template #empty>
        <el-empty :description="$t('result.empty')" />
      </template>
      <el-table-column
        prop="name"
        :label="$t('result.domain')"
        sortable
        column-key="date"
        class-name="font-mono"
      >
        <template #default="scope">
          <div class="flex flex-col lg:flex-row items-center">
            <span>{{ scope.row.name }}</span>
            <el-button
              v-if="isMine && primaryName !== scope.row.name"
              class="ml-0 lg:ml-2"
              plain
              type="primary"
              :loading="loading"
              @click.stop="setPrimaryName(scope.row.name)"
              >{{ $t('fns.usePrimary') }}</el-button
            >
          </div>
        </template>
      </el-table-column>

      <el-table-column prop="registrant" :label="$t('result.registrant')" align="center" sortable>
        <template #default="scope">
          <el-tag disable-transitions>{{ scope.row.registrant }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="expires" :label="$t('result.expires')" align="center" sortable>
        <template #default="scope">
          <el-tag type="warning" disable-transitions>{{ scope.row.expires }}</el-tag>
        </template>
      </el-table-column>
    </el-table>
    <!-- <el-pagination
      class="mt-4 transform translate-x-4"
      layout="prev, pager, next"
      :total="data.length"
    /> -->
  </div>
</template>

<script setup lang="ts">
import { TipError, TipSuccess } from '~~/libs/utils'
import API from '~~/libs/api'
const router = useRouter()
withDefaults(defineProps<{ data?: any[]; primaryName?: string; isMine: boolean }>(), {
  data: () => [],
  primaryName: () => '',
  isMine: () => false
})
function rowClick(row) {
  router.push(`/domain/${row.name}${row.tokenId ? '/' + row.tokenId : ''}`)
}
const t = useNuxtApp().$i18n.t
const loading = ref(false)
const setPrimaryName = async (newName: string) => {
  try {
    loading.value = true
    await API.setPrimaryName(newName)
    TipSuccess(t('tip.submit'))
    // window.location.reload()
  } catch (error) {
    TipError(t('error.submit'))
    console.error(error)
  } finally {
    loading.value = false
  }
}
</script>
