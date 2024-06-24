declare module 'vue' {
  export interface GlobalComponents {
    Icon: typeof import('@/components/Icon')['Icon']
    DictTag: typeof import('@/components/DictTag')['DictTag']
    BaiduMap: typeof import('vue-baidu-map-3x')
  }
}

export {}
