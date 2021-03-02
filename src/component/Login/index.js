import React, { useState, useRef, useEffect } from 'react';
import { Modal, Button, Form, Input, Popover } from 'antd';
import 'antd/dist/antd.css';
import './login.css';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import axios from 'axios';
import Cookies from 'js-cookie';



const Login = () => {

  const [isModalVisible, setIsModalVisible] = useState(false);
  const avatarImage = useRef(null);
  const loginText = useRef(null);

  useEffect(() => {
    let status = Cookies.get('userCookie');
    let userAvatar = Cookies.get('userAvatar');
    let userAvatarUrl;
    if (userAvatar) {
      userAvatarUrl = JSON.parse(userAvatar);
    }
    if (status) {
      loginText.current.style.display = 'none';
      avatarImage.current.style.display = '';
      avatarImage.current.src = userAvatarUrl.avatar;
    } else {
      avatarImage.current.style.display = 'none';
    }

  });

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };



  const onFinish = (values) => {
    // console.log('Received values of form: ', values);
    // axios.post('http://localhost:3000/login/cellphone', {
    //   phone: values.phone,
    //   password: values.password,
    //   // md5_password: values.password 
    // },
    // {withCredentials: true,}
    // )
    axios({
      method: 'post',
      url: 'http://localhost:3000/login/cellphone',
      data: {
        phone: values.phone,
        password: values.password,
      },
      withCredentials: true
    })
      .then(function (res) {
        console.log(res);
        if (res.status === 200 && res.data.code === 200) {
          // let nickname = res.data.profile.nickname;
          let avatar = res.data.profile.avatarUrl;
          let cookie = res.data.cookie;
          loginText.current.style.display = 'none';
          avatarImage.current.style.display = '';
          Cookies.set('userCookie', { cookie }, { expires: 7, path: '/' });
          Cookies.set('userAvatar', { avatar }, { expires: 7 });
          avatarImage.current.src = avatar;
          setIsModalVisible(false);
          // this.history.push('/');

        } else {
          console.log('失败');
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };


  const loginOut = () => {
    Cookies.remove("userCookie");
    Cookies.remove("userAvatar");
    this.props.history.push('/');

    // axios.get('http://localhost:3000/logout')
    //   .then((res) => {
    //     console.log('退出',res);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   })


    // this.props.history.push('/');
  }


  const content = (
    <div style={{ width: '160px' }}>
      <ul className="functionArea">
        <li><a href="/#">我的主页</a></li>
        <li onClick={loginOut}><a href="/#">退出</a></li>
      </ul>
    </div>
  );

  return (
    <>
      <div >
        <Button type="primary" onClick={showModal} ref={loginText}>
          <span >登录</span>
        </Button>

        <Popover content={content} color={'rgb(60, 65, 68)'}>
          <img ref={avatarImage} style={{ width: '30px', height: '30px', borderRadius: '50%', display: 'none' }} alt='头像' />
        </Popover>
      </div>

      <Modal title="手机号登录"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        centered={true}
        destroyOnClose={true}
      >
        <Form
          name="normal_login"
          // className="login-form"
          initialValues={{ remember: true }}
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
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Phone" style={{ width: "50%" }} />
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
              style={{ width: "50%" }}
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
            <Button type="primary" htmlType="submit" className="login-form-button" style={{ width: "50%" }}>
              登录
            </Button>
          </Form.Item>

        </Form>
      </Modal>
    </>
  );

};

export default Login;