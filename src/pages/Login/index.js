import logo from '@/assets/logo.png'
import { Card, Form, Input, Checkbox, Button } from 'antd'
import './index.scss'
import { useStore } from '@/store'
import { useNavigate } from 'react-router-dom'
import { useMessageApi } from '@/utils'

function Login () {
  const { loginStore } = useStore()
  const navigate = useNavigate()
  const { messageApi } = useMessageApi()

  async function onFinish (values) {
    console.log(values)
    try {
      await loginStore.getToken({ mobile: values["Phone Number"], code: values["Verification Code"] })
      navigate('/', { replace: true })
      messageApi.open({
        type: 'success',
        content: 'login success',
      })
    } catch (e) {
      messageApi.open({
        type: 'error',
        content: 'login failed',
      })
    }
  }
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }
  return (
    <div className="login">
      <Card className="login-container">
        <img className="login-logo" src={logo} alt=""></img>
        <Form validateTrigger={['onBlur', 'onChange']}
          initialValues={{
            "Phone Number": '13911111111',
            "Verification Code": '246810',
            remember: true
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="Phone Number"
            name="Phone Number"
            rules={[
              {
                required: true,
                message: 'please inpute your phone number!',
              },
              {
                pattern: /^1[3-9]\d{9}$/,
                message: 'mobile phone number is wrong',
                validateTrigger: 'onBlur'
              }
            ]}
          >
            <Input size="large" placeholder="请输入手机号" />
          </Form.Item>
          <Form.Item
            label="Verification Code"
            name="Verification Code"
            rules={[
              {
                required: true,
                message: "please inpute verification code"
              },
              {
                len: 6,
                message: 'code is 6 digits',
                validateTrigger: 'onBlur'
              }
            ]}
          >
            <Input size="large" placeholder="请输入验证码" />
          </Form.Item>
          <Form.Item name="remember" valuePropName='checked'>
            <Checkbox className="login-checkbox-lable">
              我已阅读并同意「用户协议」和「隐私条款」
            </Checkbox>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" size="large" block>
              登录
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}




export default Login