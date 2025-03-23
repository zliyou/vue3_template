import type { AxiosResponse } from 'axios'
import { clientFactory } from './base'
import type { ParamsRequestFn } from '.'

type HomeRequest = ParamsRequestFn<{
  type: string
}>
type HomeResponse = Array<{ id: number; title: string }>

export const getData = clientFactory<HomeRequest, HomeResponse>({
  url: 'https://jsonplaceholder.typicode.com/todos',
  method: 'get',
})
export const getList = clientFactory<HomeRequest, HomeResponse, { page: number; count: number }>({
  url: 'https://jsonplaceholder.typicode.com/todos',
  method: 'get',
  defaultConfig: {},
})
export const editHistory = clientFactory<
  {
    data: {
      type: string
    }
  },
  HomeResponse
>({
  url: 'https://jsonplaceholder.typicode.com/todos',
  method: 'post',
})
