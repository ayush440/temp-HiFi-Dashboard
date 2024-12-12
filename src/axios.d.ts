import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'

declare module 'axios' {
  export interface AxiosRequestConfig {
    silent?: boolean
  }
}
