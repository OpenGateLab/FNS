<template>
  <div
    class="h-18 flex flex-row items-stretch w-full shadow-md shadow-gray-500 rounded-xl overflow-hidden sm:w-full md:w-20/24 lg:w-18/24 xl:w-16/24"
  >
    <input
      v-model.trim="input"
      type="text"
      maxlength="100"
      :placeholder="$t('home.search')"
      class="px-3 sm:px-6 flex-1 text-2xl text-gray-600 border-2 border-transparent outline-none font-extralight tracking-wider opacity-80 w-full"
      @keydown.enter="skip"
    />
    <div class="flex-shrink-0 flex-center pr-2 sm:pr-4 pl-2 sm:pl-4 bg-white opacity-80">
      <LanguageSelector />
    </div>
    <div
      class="bg-[#0092FA] hidden sm:flex w-18 md:w-24 flex-center cursor-pointer opacity-80 hover:opacity-100"
      @click="skip"
    >
      <IconSearch class="h-8 text-white" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { TipWarning } from "~~/composables";
import { useSearchStore } from "~/store";
import { SEARCH_TYPE_ADDRESS, SEARCH_TYPE_DOMAIN } from "~~/constants";
import { isAddress, isDomainValid } from "~~/libs/utils";
import { traditionToSimple } from 'chinese-simple2traditional'

const i18n = useNuxtApp().$i18n;
const t = i18n.t;
const searchStore = useSearchStore();
const inputValue = ref("");

const input = computed({
  get: () => inputValue.value,
  set: (val) => {
    if (val) inputValue.value = val.toLowerCase();
    else inputValue.value = "";
  },
});
const router = useRouter();
const inputType = computed(() =>
  isAddress(input.value) ? SEARCH_TYPE_ADDRESS : SEARCH_TYPE_DOMAIN
);

const { locale, locales } = useI18n();
const changeLanguage = (localeCode) => {
  console.log(localeCode);
  locale.value = localeCode;
  i18n.setLocaleCookie(localeCode);
};

function ConverterToSimplified(str) {
  var simplified = traditionToSimple(str);
  console.log(str + "=>" + simplified);
  return simplified;
}

const searchContent = computed(() => {
  let _input = input.value;

  if (_input && inputType.value === SEARCH_TYPE_DOMAIN) {
    _input = /\.fil$/.test(_input) ? _input : `${_input}.fil`;
  }
  _input = ConverterToSimplified(_input)
  return _input;
});

function skip() {

  if (!searchContent.value) {
    TipWarning(t("tip.searchEmpty"));
    return;
  }

  if (!isDomainValid(searchContent.value)) {
    TipWarning(t("tip.searchSpecialChar"));
    return;
  }

  searchStore.setSearchContent(searchContent.value);
  const path = inputType.value.toLowerCase();
  router.push(`/${path}/${searchContent.value}`);
}
</script>
