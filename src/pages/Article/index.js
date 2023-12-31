import { Link } from 'react-router-dom'
import { Table, Tag, Space, Card, Breadcrumb, Form, Button, Radio, DatePicker, Select } from 'antd'
import 'moment/locale/zh-cn'
import locale from 'antd/es/date-picker/locale/zh_CN'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import img404 from '@/assets/error.png'
import { useEffect, useState } from 'react'
import { http } from '@/utils'
// import './index.scss'

const { Option } = Select
const { RangePicker } = DatePicker

const Article = () => {

  // 文章列表区域管理
  const [articleList, setaArticleList] = useState({
    list: [], //文章列表
    count: 0 //文章数量
  })
  const [params, setParmas] = useState({
    page: 1,
    per_page: 10
  })



  useEffect(() => {
    const loadList = async () => {
      const res = await http.get('/mp/articles', { params })
      // console.log(res)
      const { results, total_count } = res.data
      setaArticleList({
        list: results,
        count: total_count
      })
    }
    loadList()
  }, [params])

  //筛选区域管理
  const [channelList, setChannelList] = useState([])
  const loadChannelList = async () => {
    const res = await http.get('/channels')
    setChannelList(res.data.channels)
  }
  useEffect(() => {
    loadChannelList()
  }, [])


  const onFinish = (values) => {
    console.log("在这里aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    console.log(values)
    const params = {}
    // params.a = null
    // params.a
  }


  const columns = [
    {
      title: '封面',
      dataIndex: 'cover',
      width: 120,
      render: cover => {
        return <img src={cover.images[0] || img404} width={80} height={60} alt="" />
      }
    },
    {
      title: '标题',
      dataIndex: 'title',
      width: 220
    },
    {
      title: '状态',
      dataIndex: 'status',
      render: data => <Tag color="green">审核通过</Tag>
    },
    {
      title: '发布时间',
      dataIndex: 'pubdate'
    },
    {
      title: '阅读数',
      dataIndex: 'read_count'
    },
    {
      title: '评论数',
      dataIndex: 'comment_count'
    },
    {
      title: '点赞数',
      dataIndex: 'like_count'
    },
    {
      title: '操作',
      render: data => {
        return (
          <Space size="middle">
            <Button type="primary" shape="circle" icon={<EditOutlined />} />
            <Button
              type="primary"
              danger
              shape="circle"
              icon={<DeleteOutlined />}
            />
          </Space>
        )
      }
    }
  ]


  return (
    <div>
      {/* 筛选区域 */}
      <Card
        title={
          <Breadcrumb separator=">">
            <Breadcrumb.Item>
              <Link to="/home">首页</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>内容管理</Breadcrumb.Item>
          </Breadcrumb>
        }
        style={{ marginBottom: 20 }}
      >
        <Form
          onFinish={onFinish}
          initialValues={{ status: null }}>
          <Form.Item label="状态" name="status">
            <Radio.Group>
              <Radio value={null}>全部</Radio>
              <Radio value={0}>草稿</Radio>
              <Radio value={1}>待审核</Radio>
              <Radio value={2}>审核通过</Radio>
              <Radio value={3}>审核失败</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item label="频道" name="channel_id">
            <Select
              placeholder="请选择文章频道"
              style={{ width: 120 }}
            >
              {channelList.map(channel => <Option key={channel.key} value={channel.id}>{channel.name}</Option>)}

            </Select>
          </Form.Item>

          <Form.Item label="日期" name="date">
            {/* 传入locale属性 控制中文显示*/}
            <RangePicker locale={locale}></RangePicker>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ marginLeft: 80 }}>
              筛选
            </Button>
          </Form.Item>
        </Form>
      </Card>
      {/* 文章列表区域 */}
      <Card title={`根据筛选条件共查询到 ${articleList.count} 条结果：`}>
        <Table rowKey="id" columns={columns} dataSource={articleList.list} />
      </Card>
    </div>
  )
}

export default Article