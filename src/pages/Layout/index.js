import { Layout, Menu, Popconfirm } from 'antd'
import {
  HomeOutlined,
  DiffOutlined,
  EditOutlined,
  LogoutOutlined
} from '@ant-design/icons'
import './index.scss'
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom'
import { useStore } from '@/store'
import { useEffect } from 'react'
import { observer } from 'mobx-react-lite'

const { Header, Sider } = Layout

const GeekLayout = () => {
  const location = useLocation().pathname
  // console.log(location)
  const { userStore, loginStore } = useStore()
  const navigate = useNavigate()
  useEffect(() => {
    try {
      userStore.getUserInfo()
      console.log(userStore.useInfo)
    } catch { }
  }, [userStore])

  const confirm = () => {
    //clear off token, navigate to login
    loginStore.loginOut()
    navigate('/login')
  }

  return (
    <Layout>
      <Header className="header">
        <div className="logo" />
        <div className="user-info" >
          <span className="user-name">{userStore.userInfo.name}</span>
          <span className="user-logout">
            <Popconfirm
              title="comfirm to logout?"
              onConfirm={confirm}
              okText="yes"
              cancelText="no">
              <LogoutOutlined /> logout
            </Popconfirm>
          </span>
        </div>
      </Header>
      <Layout>/
        <Sider width={200} className="site-layout-background">
          <Menu
            mode="inline"
            theme="dark"
            defaultSelectedKeys={[location]}
            style={{ height: '100%', borderRight: 0 }}
          >
            <Menu.Item icon={<HomeOutlined />} key='/'>
              <Link to={'/'}>数据概览</Link>
            </Menu.Item>
            <Menu.Item icon={<DiffOutlined />} key='/article'>
              <Link to={'/article'}>内容管理</Link>
            </Menu.Item>
            <Menu.Item icon={<EditOutlined />} key='/publish'>
              <Link to={"/publish"}>发布文章</Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="layout-content" style={{ padding: 20 }}>
          <Outlet />
        </Layout>
      </Layout>
    </Layout>
  )
}

export default observer(GeekLayout)