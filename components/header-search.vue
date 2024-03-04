<template>
  <div class="h-10 flex flex-center items-stretch border border-[#ffffff5f] rounded-full">
    <input
      v-model.trim="input"
      type="text"
      :placeholder="$t('hint.search')"
      style="border-radius: 22px"
      class="flex-1 px-4 text-lg text-gray-500 border border-gray-500 outline-none font-mono transition bg-transparent"
      @keydown.enter="search"
    />
    <div
      class="flex-center hidden sm:flex cursor-pointer rounded-r-md px-2 lg:px-5 transition text-gray-300 hover:text-gray-600"
    >
      <IconSearch class="h-8" @click="search" />
    </div>
    <LanguageSelector class="ml-2 sm:ml-4 flex-shrink-0"></LanguageSelector>
  </div>
</template>

<script setup lang="ts">
import { simpleToTradition, traditionToSimple } from 'chinese-simple2traditional'
import { SEARCH_TYPE_ADDRESS, SEARCH_TYPE_DOMAIN } from '~~/constants'
import { isAddress, TipWarning, isDomainValid } from '~~/libs/utils'
import { eventHub } from '~~/libs/event-hub'

const inputValue = ref('')
const input = computed({
  get: () => inputValue.value,
  set: val => {
    if (val) inputValue.value = val.toLowerCase()
    else inputValue.value = ''
  }
})
const route = useRoute()
const router = useRouter()
const inputType = computed(() =>
  isAddress(input.value) ? SEARCH_TYPE_ADDRESS : SEARCH_TYPE_DOMAIN
)

const searchContent = computed(() => {
  let _input = input.value

  if (_input && inputType.value === SEARCH_TYPE_DOMAIN) {
    _input = /\.fil$/.test(_input) ? _input : `${_input}.fil`
  }
  _input = ConverterToSimplified(_input)

  return _input
})

function syncSearch() {
  if (Array.isArray(route.params.id)) input.value = route.params.id[0]
  else input.value = route.params.id
}

function search() {
  if (!searchContent.value) {
    TipWarning('The search content cannot be empty !')
    return
  }
  if (!isDomainValid(searchContent.value)) {
    TipWarning('The search content cannot contain special characters !')
    return
  }

  if (route.params?.id === searchContent.value) {
    eventHub.emit('update')
    return
  }

  const path = inputType.value.toLowerCase()
  router.push(`/${path}/${searchContent.value}`)
}

function isTraditionalChinese(str) {
  const simplified = traditionToSimple(str)
  console.log(str + '=>' + simplified)
  return simplified !== str
}
function ConverterToSimplified(str) {
  const simplified = traditionToSimple(str)
  console.log(str + '=>' + simplified)
  return simplified
}

onMounted(syncSearch)
watch(() => route.params?.id, syncSearch)
</script>
