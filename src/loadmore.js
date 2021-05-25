import { throttle } from './throttle-debounce.js'

export default class LoadMore {
  constructor(toLoadMore = () => { }, actionFn = () => { }, time = 300) {
    // 加载更多
    this.loadMoreFn = throttle(() => {
      const ele = document.documentElement
      const bo = document.body
      const clientHeight = ele.clientHeight || bo.clientHeight
      const scrollTop = ele.scrollTop || bo.scrollTop
      const scrollHeight = bo.scrollHeight || ele.scrollHeight
      actionFn(scrollTop)
      if (scrollTop + clientHeight >= scrollHeight - 80) {
        toLoadMore()
      }
    }, time)

    // 绑定事件
    window.addEventListener('scroll', this.loadMoreFn, { passive: false })
  }

  // 取消监听
  destroy() {
    if (this.loadMoreFn) {
      window.removeEventListener('scroll', this.loadMoreFn)
      this.loadMoreFn = null
    }
  }
}

// dom加载更多
export class LoadMoreDom {
  constructor(toLoadMore = () => { }, dom = null) {
    this.dom = dom
    // 加载更多
    this.loadMoreFn = throttle(() => {
      const clientHeight = dom.clientHeight
      const scrollTop = dom.scrollTop
      const scrollHeight = dom.scrollHeight
      if (scrollTop + clientHeight >= scrollHeight - 80) {
        toLoadMore()
      }
    })

    // 绑定事件
    dom.addEventListener('scroll', this.loadMoreFn, { passive: false })
  }

  // 取消监听
  destroy() {
    if (this.loadMoreFn) {
      this.dom.removeEventListener('scroll', this.loadMoreFn)
      this.loadMoreFn = null
    }
  }
}

// 下拉到顶部加载更多
export class LoadMoreTop {
  constructor(toLoadMore = () => { }) {
    // 加载更多
    this.loadMoreFn = throttle(() => {
      const ele = document.documentElement
      const bo = document.body
      const scrollTop = ele.scrollTop || bo.scrollTop
      if (scrollTop <= 80) {
        toLoadMore()
      }
    })

    // 绑定事件
    window.addEventListener('scroll', this.loadMoreFn, { passive: false })
  }

  // 取消监听
  destroy() {
    if (this.loadMoreFn) {
      window.removeEventListener('scroll', this.loadMoreFn)
      this.loadMoreFn = null
    }
  }
}