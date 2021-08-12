import { ref, Ref, onMounted, onUnmounted } from 'vue'

export const useClickOutside = (dom: Ref<HTMLElement | null>) => {
  // 当前点击是否在区域内
  const isClickOutside = ref<boolean>(false)
  const handleClick = (e: MouseEvent) => {
    if (dom.value) isClickOutside.value = dom.value.contains((e.target as HTMLElement)) ? true : false
    else return
  }

  onMounted(() => {
    // 给元素添加一个点击事件
    window.addEventListener('click', handleClick)
  })
  onUnmounted(() => {
    window.removeEventListener('click', handleClick)
  })

  return {
    isClickOutside
  }
}