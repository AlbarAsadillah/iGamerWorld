import React, { useState, useEffect } from 'react';
import { Layout, Drawer, Grid } from 'antd';
import AdminNavbar from './AdminNavbar'; // menggunakan AdminNavbar yang sama
import SuperAdminSideNav from './SuperAdminSideNav';
import '../styles/AdminPoppins.css'; // import CSS untuk font Poppins

const { Sider, Content } = Layout;
const { useBreakpoint } = Grid;

const SuperAdminLayout = ({ children }) => {
  const screens = useBreakpoint();
  const [drawerVisible, setDrawerVisible] = useState(false);

  useEffect(() => {
    if (screens.lg) {
      setDrawerVisible(false);
    }
  }, [screens.lg]);

  const showDrawer = () => setDrawerVisible(true);
  const closeDrawer = () => setDrawerVisible(false);

  return (
    <Layout
      className="admin-layout superadmin-layout"
      data-admin="true"
      style={{ minHeight: '100vh', fontFamily: 'Poppins, sans-serif' }}
    >
      {/* Navbar with toggle sidebar button for mobile */}
      <AdminNavbar onToggleSidebar={showDrawer} />

      <Layout>
        {/* Sidebar for desktop */}
        {screens.lg && (
          <Sider width={250} style={{ background: '#fff', fontFamily: 'Poppins, sans-serif' }}>
            <SuperAdminSideNav collapsed={false} />
          </Sider>
        )}

        {/* Drawer sidebar for mobile */}
        {!screens.lg && (
          <Drawer
            title="Menu"
            placement="left"
            closable
            onClose={closeDrawer}
            open={drawerVisible}
            styles={{
              body: { padding: 0, fontFamily: 'Poppins, sans-serif' },
              header: { fontFamily: 'Poppins, sans-serif' }
            }}
            width={250}
            destroyOnClose
          >
            <SuperAdminSideNav collapsed={false} />
          </Drawer>
        )}

        {/* Main content area */}
        <Layout style={{ padding: '24px', fontFamily: 'Poppins, sans-serif' }}>
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
              background: '#fff',
              borderRadius: 8,
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              fontFamily: 'Poppins, sans-serif',
            }}
          >
            {children}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default SuperAdminLayout;
