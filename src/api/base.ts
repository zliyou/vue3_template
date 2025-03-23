import {
  QueryClient,
  useInfiniteQuery,
  useMutation,
  useQuery,
  type QueryKey,
  type UseInfiniteQueryOptions,
  type UseMutationOptions,
  type UseQueryOptions,
} from '@Tanstack/vue-query'
import axios, { type AxiosRequestConfig, type AxiosResponse, type Method } from 'axios'
import type { DefaultInfiniteQueryOptions, DefaultMution, DefaultOptions } from './content'

export const client = new QueryClient()

export function clientFactory<
  Request extends Omit<AxiosRequestConfig<unknown>, 'url' | 'method'> & {
    pathParams?: Record<string, string>
  },
  Response,
  PageParams extends object = object,
>({
  url,
  method,
  defaultConfig,
}: {
  url: string
  method: Method
  defaultConfig?: DefaultOptions<AxiosResponse<Response>>
}) {
  defaultConfig
  return {
    useQuery: function (
      req?: Request,
      queryOptions: DefaultOptions<AxiosResponse<Response>> = {},
      queryClient?: QueryClient,
    ) {
      const queryKey = [url, req?.params, req?.pathParams]
      let resolveUrl = url
      if (req?.pathParams) {
        Object.entries(req.pathParams).forEach(([key, value]) => {
          resolveUrl = resolveUrl.replace(`{${key}}`, String(value))
        })
      }

      return useQuery(
        {
          ...defaultConfig,
          ...queryOptions,
          queryKey,
          queryFn() {
            return axios.request<Response>({
              method,
              url: resolveUrl,
              params: req?.params,
              ...req,
            })
          },
        },
        queryClient,
      )
    },
    useMutation: function (
      queryOptions?: DefaultMution<AxiosResponse<Response>, Request>,
      queryClient?: QueryClient,
    ) {
      return useMutation(
        {
          mutationFn: (body) => {
            console.log('target body', body)
            const { pathParams, ...arg } = body
            let resolveUrl = url
            if (pathParams) {
              Object.entries(pathParams).forEach(([key, value]) => {
                resolveUrl = resolveUrl.replace(`{${key}}`, String(value))
              })
            }
            return axios.request({
              method,
              url: resolveUrl,
              ...arg,
            })
          },
          ...queryOptions!,
        },
        queryClient,
      )
    },
    useInfiniteQuery: function (
      req: Request,
      optionsParams: Omit<
        DefaultInfiniteQueryOptions<AxiosResponse<Response>, PageParams>,
        'queryKey' | 'queryFn'
      >,
      queryClient?: QueryClient,
    ) {
      const { pathParams, params, ...arg } = req
      let resolveUrl = url
      if (req?.pathParams) {
        Object.entries(req.pathParams).forEach(([key, value]) => {
          resolveUrl = resolveUrl.replace(`{${key}}`, String(value))
        })
      }
      const queryKey = [url, req?.params, req?.pathParams]

      return useInfiniteQuery(
        {
          ...optionsParams!,
          queryKey,
          queryFn: ({ pageParam }) => {
            return axios.request<Response>({
              method,
              url: resolveUrl,
              params: {
                ...params!,
                ...(typeof pageParam === 'object' && pageParam !== null ? pageParam : {}),
              },
              ...arg,
            })
          },
        } as DefaultInfiniteQueryOptions<AxiosResponse<Response>, PageParams>,
        queryClient,
      )
    },
    invalidateQueries: function (req?: Request, queryClient?: QueryClient) {
      const queryKey = [url, req?.params, req?.pathParams]
      return (queryClient || client).invalidateQueries({
        queryKey,
      })
    },
  }
}
