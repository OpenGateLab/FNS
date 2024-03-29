import { ElMessage, ElNotification } from 'element-plus'
import copy from 'copy-to-clipboard'
import { utils } from 'ethers'
import { validateAddressString } from '@glif/filecoin-address'
import store from 'store'
import { KEY_FAVORITE_DOMAINS } from '~~/constants'
/* import { useI18n } from 'vue-i18n'
const { t } = useI18n()
export function $t(key: string) {
  return t(key)
} */

export function storeDomainToLocal(domain: string) {
  const storedDomains = getStoredDomainsFromLocal()
  storedDomains.push(domain)
  store.set(KEY_FAVORITE_DOMAINS, storedDomains)
}

export function removeDomainFromLocal(domain: string) {
  const storedDomains = getStoredDomainsFromLocal()
  const _storedDomains = storedDomains.filter(d => d !== domain)
  store.set(KEY_FAVORITE_DOMAINS, _storedDomains)
}

export function getStoredDomainsFromLocal() {
  return store.get(KEY_FAVORITE_DOMAINS) || []
}

export function TipWarning(message: string) {
  ElMessage({ showClose: true, message, type: 'warning' })
}

export function TipSuccess(message: string) {
  ElMessage({ showClose: true, message, type: 'success' })
}

export function TipError(message: string) {
  ElMessage({ showClose: true, message, type: 'error' })
}

export function NoteSuccess(message: string) {
  ElNotification({
    title: 'Success',
    message,
    type: 'success'
  })
}

export function NoteError(message: string) {
  ElNotification({
    title: 'Error',
    message,
    type: 'error'
  })
}

export function NoteInfo(message: string) {
  ElNotification({
    title: 'Notification',
    message,
    type: 'info'
  })
}

export function NoteWarning(message: string) {
  ElNotification({
    title: 'Warning',
    message,
    type: 'warning'
  })
}

export function Copy(text: string, tip: string = '') {
  copy(text)
  if (tip) TipSuccess(tip)
  else {
    const t = useNuxtApp().$i18n.t
    TipSuccess(t('tip.copy'))
  }
}

export function isAddress(str: string) {
  return utils.isAddress(str) || validateAddressString(str)
}

export function isDomainValid(str: any) {
  const specialChar = [
    '.',
    '/',
    ':',
    ';',
    '<',
    '=',
    '>',
    '?',
    '@',
    '{',
    '|',
    '}',
    '~',
    '!',
    '"',
    '#',
    '%',
    '&',
    '`',
    '(',
    ')',
    '*',
    '+',
    ',',
    '[',
    '\\',
    ']',
    '^',
    ' ',
    "'",
    '、',
    '”',
    '【',
    '】',
    '…',
    '』',
    '『',
    '？',
    '》',
    '《',
    '：',
    '；',
    '！',
    '，',
    '。',
    '（',
    '）',
    '”',
    '“',
    '’',
    '_',
    '—',
    '‘'
  ]
  // debugger
  const domain = str.replace(/\.fil$/i, '')
  for (let i = 0; i < specialChar.length; i++) {
    if (domain.indexOf(specialChar[i]) !== -1) {
      return false
    }
  }
  return true
}
