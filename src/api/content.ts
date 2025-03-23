import type {
  InfiniteData,
  QueryKey,
  UseInfiniteQueryOptions,
  UseMutationOptions,
  UseQueryOptions,
} from '@Tanstack/vue-query'

export type DefaultOptions<TQueryFnData> = Omit<
  UseQueryOptions<TQueryFnData, Error>,
  'queryKey' | 'queryFn'
>
export type DefaultMution<TData, TVariables> = UseMutationOptions<TData, Error, TVariables>
export type DefaultInfiniteQueryOptions<TQueryFnData, TPageParam> = UseInfiniteQueryOptions<
  TQueryFnData,
  Error,
  InfiniteData<TQueryFnData, TPageParam>,
  TQueryFnData,
  QueryKey,
  TPageParam
>

export type ParamsRequestFn<T> = {
  params: T
}
export type dataRequestFn<T> = {
  data: T
}
