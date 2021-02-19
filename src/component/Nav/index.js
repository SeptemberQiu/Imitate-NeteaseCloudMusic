import React from 'react';
import { Menu} from 'antd';
import 'antd/dist/antd.css';
import Login from '../Login/index';

const Nav = () => {


  return (
    <>
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']} >
        <Menu.Item key="1">发现音乐</Menu.Item>
        <Menu.Item key="2">我的音乐</Menu.Item>
        <Menu.Item key="3">朋友</Menu.Item>
        <Menu.Item key="4">商城</Menu.Item>
        <Menu.Item key="5">音乐人</Menu.Item>
        <Menu.Item key="6">下载客户端</Menu.Item>
        <Menu.Item key="7"> <Login /> </Menu.Item>
      </Menu>
    </>
  )
}

export default Nav;