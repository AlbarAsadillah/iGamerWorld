import React from 'react';
import { Layout, Menu, Drawer } from 'antd';
import {
  HomeOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
  HistoryOutlined,
  UserOutlined,
  DesktopOutlined,
  SettingOutlined,
  MessageOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Sider } = Layout;

const SuperAdminSideNav = ({ collapsed = false, isMobile = false, visible, onClose }) => {
  const navigate = useNavigate();

  // Menu superadmin dengan text-align kiri
  const menuContent = (
    <Menu
      mode="inline"
      defaultSelectedKeys={['1']}
      style={{ height: '100%', borderRight: 0, textAlign: 'left' }}
      onClick={({ key }) => {
        if (isMobile && onClose) onClose(); // close drawer on mobile menu click
        switch (key) {
          case '1':
            navigate('/superadmin-dashboard');
            break;
          case '2':
            navigate('/superadmin-product');
            break;
          case '3':
            navigate('/superadmin-orders');
            break;
          case '4':
            navigate('/superadmin-custom-pc');
            break;
          case '5':
            navigate('/superadmin-feedback');
            break;
          case '6':
            navigate('/superadmin-complaint');
            break;
          case '7':
            navigate('/superadmin-account');
            break;
          case '8':
            navigate('/superadmin-admin');
            break;
          case '9':
            navigate('/superadmin-web-settings');
            break;
          default:
            break;
        }
      }}
    >
      <Menu.Item key="1" icon={<HomeOutlined />} style={{ textAlign: 'left' }}>
        Dashboard
      </Menu.Item>
      <Menu.Item key="2" icon={<SearchOutlined />} style={{ textAlign: 'left' }}>
        Product
      </Menu.Item>
      <Menu.Item key="3" icon={<ShoppingCartOutlined />} style={{ textAlign: 'left' }}>
        Order
      </Menu.Item>
      <Menu.Item key="4" icon={<DesktopOutlined />} style={{ textAlign: 'left' }}>
        Pc Customs
      </Menu.Item>
      {/* <Menu.Item key="5" icon={<HistoryOutlined />} style={{ textAlign: 'left' }}>
        Feedback
      </Menu.Item> */}
      <Menu.Item key="6" icon={<MessageOutlined />} style={{ textAlign: 'left' }}>
        Complaint
      </Menu.Item>
      <Menu.Item key="7" icon={<UserOutlined />} style={{ textAlign: 'left' }}>
        Account
      </Menu.Item>
      <Menu.Item key="8" icon={<UserOutlined />} style={{ textAlign: 'left' }}>
        Admin
      </Menu.Item>
      <Menu.Item key="9" icon={<SettingOutlined />} style={{ textAlign: 'left' }}>
        Web-Settings
      </Menu.Item>
    </Menu>
  );

  if (isMobile) {
    return (
      <Drawer
        title="Menu"
        placement="left"
        closable={true}
        onClose={onClose}
        visible={visible}
        bodyStyle={{ padding: 0 }}
        width={250}
        destroyOnClose
      >
        {menuContent}
      </Drawer>
    );
  }

  return (
    <Sider
      width={250}
      collapsible
      collapsed={collapsed}
      trigger={null}
      style={{ background: '#fff', minHeight: '100vh' }}
    >
      {menuContent}
    </Sider>
  );
};

export default SuperAdminSideNav;
