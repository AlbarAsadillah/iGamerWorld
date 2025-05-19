import React from 'react';
import { Layout, Menu, Button } from 'antd';
import { LogoutOutlined } from '@ant-design/icons'; // Menggunakan ikon Log Out dari Ant Design
import { Link } from 'react-router-dom'; // Jika ingin mengarahkan ke halaman lain
const { Header } = Layout;

const AdminNavbar = () => {
  const handleLogout = () => {
    // Logika untuk logout, misalnya menghapus data pengguna dari localStorage
    localStorage.removeItem('role');
    window.location.href = '/admin-login'; // Redirect ke halaman login setelah logout
  };

  return (
    <Header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#fff', padding: '0 20px' }}>
      <div style={{ fontSize: '20px', fontWeight: 'bold' }}>IGAMERWORLD</div>

      <Menu theme="light" mode="horizontal" style={{ flex: 1, justifyContent: 'flex-end' }}>
        <Menu.Item key="1" style={{ padding: '0 20px' }}>
          <Button
            type="primary"
            icon={<LogoutOutlined />}
            onClick={handleLogout}
            style={{ backgroundColor: 'red', borderColor: 'red' }}
          >
            Log Out
          </Button>
        </Menu.Item>
      </Menu>
    </Header>
  );
};

export default AdminNavbar;
