import { createContext, useContext } from 'react'
import { message } from 'antd'
// 创建Context对象

const Context = createContext()

export const useMessageApi = () => useContext(Context)

export function MessageWrapper ({ children }) {
  const [messageApi, contextHolder] = message.useMessage()
  return (
    // 顶层组件通过Provider 提供数据    
    <Context.Provider value={{ messageApi }}>
      {contextHolder}
      {children}
    </Context.Provider>
  )
}
