import React, { useState } from 'react';
import { Modal, Button, Form, Input} from 'antd';
import 'antd/dist/antd.css';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import axios from 'axios';

// const { Option } = Select;

// const options = [
//   {
//     value: 'zhejiang',
//     label: 'Zhejiang',
//     children: [
//       {
//         value: 'hangzhou',
//         label: 'Hangzhou',
//         children: [
//           {
//             value: 'xihu',
//             label: 'West Lake',
//           },
//         ],
//       },
//     ],
//   },
// ];

const Login = () => {
  
  // const { Option } = Select;
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onFinish = (values) => {
    console.log('Received values of form: ', values);

    let result = axios.post('http://localhost:3000/login/cellphone', {
      phone : values.phone,
      password: values.password
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });

    console.log(result);

    setIsModalVisible(false);
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        登录
      </Button>

      <Modal title="手机号登录" 
            visible={isModalVisible} 
            onCancel={handleCancel}
            footer={null}
            centered={true}
      >
        <Form
          name="normal_login"
          // className="login-form"
          initialValues={{remember: true}}
          onFinish={onFinish}
          // style={{border:"1px solid red",marginLeft:"40px"}}
        >
          <Form.Item
            name="phone"
            rules={[
              {
                required: true,
                message: 'Please input your Phone!',
              },
            ]}
          >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Phone" style={{width:"50%"}}/>
            {/* <Input.Group compact>
              <Select defaultValue="+86">
                <Option value="Zhejiang">Zhejiang</Option>
                <Option value="Jiangsu">Jiangsu</Option>
              </Select>
              <Input style={{ width: '50%' }} placeholder="请输入手机号"/>
            </Input.Group> */}
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your Password!',
              },
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
              style={{width:"50%"}}
            />
          </Form.Item>

          <Form.Item>
            {/* <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>自动登录</Checkbox>
            </Form.Item> */}

            <a className="login-form-forgot" href="/#">
              忘记密码
            </a>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button" style={{width: "50%"}}>
              登录
            </Button>
          </Form.Item>

        </Form>
      </Modal>
    </>
  );

};

export default Login;