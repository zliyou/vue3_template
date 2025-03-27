<script setup lang="ts">
import { getData, getList, editHistory } from '@/api'
import { useCounterStore } from '@/stores'

const params = reactive({
  type: 'xxx',
})
const { data: aData } = getData.useQuery(
  { params },
  {
    enabled: false,
  },
)
const { data, isLoading } = getList.useInfiniteQuery(
  { params },
  {
    getNextPageParam(lastPage, allPages, lastPageParams) {
      return {
        page: lastPageParams.page + 1,
        count: lastPageParams.count,
      }
    },
    initialPageParam: {
      page: 1,
      count: 10,
    },
  },
)
const { mutateAsync } = editHistory.useMutation()
const countStore = useCounterStore()
const list = computed(() => {
  //   return aData.value?.data
  return data.value?.pages.map((ele) => ele.data).flat()
})
function handleClick() {
  mutateAsync({
    data: {
      type: 'xxxx',
    },
  }).then((res) => {
    console.log('target res', res.data)
    getData.invalidateQueries({ params })
  })
}
onMounted(() => {
  // Todo
})
</script>

<template>
  <main class="text-center">
    <TheWelcome class="mt-4 text-lg font-bold" />
    <van-button
      type="primary"
      class="text-red-400 mt-4 text-xl"
      @click="(countStore.increment(), handleClick())"
      >Add</van-button
    >
    <span class="ml-2 text-xl text-teal-300">{{ countStore.count }}</span>
    <div class="text-left">
      <div v-for="{ id: key, title } in list" :key class="mb-2">{{ key }}: {{ title }}</div>
    </div>
  </main>
</template>
<style lang="scss" scoped>
.sss {
  color: red;
}
</style>
