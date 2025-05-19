import React from 'react';
import { Layout, Menu } from 'antd';
import { HomeOutlined, SearchOutlined, ShoppingCartOutlined, HistoryOutlined, UserOutlined } from '@ant-design/icons'; // Import ikon dari Ant Design
import { useNavigate } from 'react-router-dom'; // Import useNavigate untuk navigasi

const { Sider } = Layout;

const AdminSideNav = () => {
  const navigate = useNavigate(); // Inisialisasi useNavigate

  return (
    <Sider width={250} style={{ background: '#fff' }}>
      <Menu mode="inline" defaultSelectedKeys={['1']}>
        <Menu.Item key="1" icon={<HomeOutlined />} onClick={() => navigate('/admin-dashboard')}>
          Dashboard
        </Menu.Item>
        <Menu.Item key="2" icon={<SearchOutlined />} onClick={() => navigate('/admin-product')}>
          Product
        </Menu.Item>
        <Menu.Item key="3" icon={<ShoppingCartOutlined />} onClick={() => navigate('/admin-orders')}>
          Orders
        </Menu.Item>
        <Menu.Item key="4" icon={<HistoryOutlined />} onClick={() => navigate('/admin-feedback')}>
          Feedback
        </Menu.Item>
        <Menu.Item key="5" icon={<UserOutlined />} onClick={() => navigate('/admin-account')}>
          Account
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default AdminSideNav;