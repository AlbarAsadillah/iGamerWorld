import React from 'react';
import { Layout, Menu, Drawer } from 'antd';
import {
  HomeOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
  HistoryOutlined,
  UserOutlined,
  DesktopOutlined,   // import icon untuk Custom PC
  MessageOutlined,   // import icon untuk Pengaduan
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Sider } = Layout;

const AdminSideNav = ({ collapsed = false, isMobile = false, visible, onClose }) => {
  const navigate = useNavigate();

  const menuContent = (
    <Menu
      mode="inline"
      defaultSelectedKeys={['1']}
      style={{ height: '100%', borderRight: 0, fontFamily: 'Poppins, sans-serif' }}
      onClick={() => {
        if (isMobile && onClose) onClose(); // close drawer on menu click in mobile
      }}
    >
      <Menu.Item key="1" icon={<HomeOutlined />} onClick={() => navigate('/admin-dashboard')}>
        Dashboard
      </Menu.Item>
      <Menu.Item key="2" icon={<SearchOutlined />} onClick={() => navigate('/admin-product')}>
        Product
      </Menu.Item>
      <Menu.Item key="3" icon={<ShoppingCartOutlined />} onClick={() => navigate('/admin-orders')}>
        Orders
      </Menu.Item>
      <Menu.Item key="4" icon={<DesktopOutlined />} onClick={() => navigate('/admin-custom-pc')}>
        Custom PC
      </Menu.Item>
      {/* <Menu.Item key="5" icon={<HistoryOutlined />} onClick={() => navigate('/admin-feedback')}>
        Feedback
      </Menu.Item> */}
      <Menu.Item key="6" icon={<MessageOutlined />} onClick={() => navigate('/admin-complaint')}>
        Complaint
      </Menu.Item>
      <Menu.Item key="7" icon={<UserOutlined />} onClick={() => navigate('/admin-account')}>
        Account
      </Menu.Item>
    </Menu>
  );

  if (isMobile) {
    // Render Drawer on mobile
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

  // Render Sider on desktop
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

export default AdminSideNav;
