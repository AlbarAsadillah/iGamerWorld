import React, { useState, useEffect } from 'react';
import { Layout, Menu, Button, Grid, Badge, Popover, List, Typography, Divider, Modal } from 'antd';
import { LogoutOutlined, MenuOutlined, BellOutlined, ShoppingCartOutlined, DesktopOutlined, MessageOutlined, CommentOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import ButtonDanger from './ButtonDanger.jsx';

const { Header } = Layout;
const { useBreakpoint } = Grid;
const { Text } = Typography;

const AdminNavbar = ({ onToggleSidebar }) => {
  const screens = useBreakpoint();
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  // Simulasi data notifikasi
  useEffect(() => {
    const mockNotifications = [
      {
        id: 1,
        type: 'order',
        title: 'Order Baru',
        message: 'Order #ORD001 dari Ahmad Rizki',
        time: '5 menit yang lalu',
        icon: <ShoppingCartOutlined style={{ color: '#1890ff' }} />,
        isRead: false
      },
      {
        id: 2,
        type: 'custom_pc',
        title: 'Custom PC Baru',
        message: 'Custom PC order dari Siti Nurhaliza',
        time: '10 menit yang lalu',
        icon: <DesktopOutlined style={{ color: '#52c41a' }} />,
        isRead: false
      },
      {
        id: 3,
        type: 'feedback',
        title: 'Feedback Baru',
        message: 'Feedback dari Budi Santoso - Rating 5',
        time: '15 menit yang lalu',
        icon: <MessageOutlined style={{ color: '#faad14' }} />,
        isRead: false
      },
      {
        id: 4,
        type: 'complaint',
        title: 'Pengaduan Baru',
        message: 'Pengaduan dari Andi Wijaya - Produk Rusak',
        time: '20 menit yang lalu',
        icon: <CommentOutlined style={{ color: '#f5222d' }} />,
        isRead: false
      }
    ];

    setNotifications(mockNotifications);
    setUnreadCount(mockNotifications.filter(n => !n.isRead).length);
  }, []);

  const handleLogout = () => {
    Modal.confirm({
      title: 'Konfirmasi Logout',
      icon: <ExclamationCircleOutlined style={{ color: '#faad14' }} />,
      content: (
        <div style={{ fontFamily: 'Poppins, sans-serif' }}>
          <p style={{ marginBottom: '8px', fontWeight: '500' }}>
            Apakah Anda yakin ingin keluar dari panel admin?
          </p>
          <p style={{ margin: '0', color: '#666', fontSize: '14px' }}>
            Anda akan diarahkan ke halaman login admin dan perlu login kembali untuk mengakses panel.
          </p>
        </div>
      ),
      okText: 'Ya, Keluar',
      cancelText: 'Batal',
      okType: 'danger',
      centered: true,
      maskClosable: false,
      keyboard: false,
      okButtonProps: {
        style: {
          fontFamily: 'Poppins, sans-serif',
          fontWeight: '500'
        }
      },
      cancelButtonProps: {
        style: {
          fontFamily: 'Poppins, sans-serif',
          fontWeight: '500'
        }
      },
      onOk() {
        localStorage.removeItem('role');
        window.location.href = '/admin-login';
      },
      onCancel() {
        // Do nothing, modal will close
      },
    });
  };

  const markAsRead = (notificationId) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === notificationId
          ? { ...notification, isRead: true }
          : notification
      )
    );
    setUnreadCount(prev => Math.max(0, prev - 1));
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notification => ({ ...notification, isRead: true }))
    );
    setUnreadCount(0);
  };

  const notificationMenu = (
    <div style={{ width: 350, maxHeight: 400, overflowY: 'auto' }}>
      <div style={{
        padding: '12px 16px',
        borderBottom: '1px solid #f0f0f0',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <Text strong style={{ fontFamily: 'Poppins, sans-serif' }}>
          Notifikasi ({unreadCount})
        </Text>
        {unreadCount > 0 && (
          <Button
            type="link"
            size="small"
            onClick={markAllAsRead}
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            Tandai Semua Dibaca
          </Button>
        )}
      </div>

      <List
        dataSource={notifications}
        renderItem={(item) => (
          <List.Item
            style={{
              padding: '12px 16px',
              cursor: 'pointer',
              backgroundColor: item.isRead ? 'transparent' : '#f6ffed',
              borderBottom: '1px solid #f0f0f0'
            }}
            onClick={() => markAsRead(item.id)}
          >
            <List.Item.Meta
              avatar={item.icon}
              title={
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <Text strong style={{ fontFamily: 'Poppins, sans-serif' }}>
                    {item.title}
                  </Text>
                  {!item.isRead && (
                    <Badge
                      status="processing"
                      style={{ marginLeft: 8 }}
                    />
                  )}
                </div>
              }
              description={
                <div>
                  <Text style={{ fontFamily: 'Poppins, sans-serif' }}>
                    {item.message}
                  </Text>
                  <br />
                  <Text
                    type="secondary"
                    style={{
                      fontSize: '12px',
                      fontFamily: 'Poppins, sans-serif'
                    }}
                  >
                    {item.time}
                  </Text>
                </div>
              }
            />
          </List.Item>
        )}
      />

      {notifications.length === 0 && (
        <div style={{
          padding: '40px 16px',
          textAlign: 'center',
          color: '#999'
        }}>
          <Text style={{ fontFamily: 'Poppins, sans-serif' }}>
            Tidak ada notifikasi
          </Text>
        </div>
      )}
    </div>
  );

  return (
    <Header
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        padding: '0 20px',
        // position: 'fixed',          // opsional, supaya navbar tetap di atas
        width: '100%',
        zIndex: 1000,               // agar tetap di atas elemen lain
        fontFamily: 'Poppins, sans-serif',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {!screens.md && (
          <Button
            type="text"
            icon={<MenuOutlined style={{ fontSize: 24, color: '#fff' }} />}
            onClick={onToggleSidebar}
            style={{ marginRight: 16, fontFamily: 'Poppins, sans-serif' }}
            aria-label="Toggle sidebar menu"
          />
        )}
        <div style={{ fontSize: 20, fontWeight: 'bold', color: 'black', fontFamily: 'Poppins, sans-serif' }}>
          IGAMERWORLD
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        {/* Notification Icon */}
        <Popover
          content={notificationMenu}
          trigger="click"
          placement="bottomRight"
          arrow
        >
          <Badge count={unreadCount} size="small">
            <Button
              type="text"
              icon={
                <BellOutlined
                  style={{
                    fontSize: '20px',
                    color: unreadCount > 0 ? '#1890ff' : '#666'
                  }}
                />
              }
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '40px',
                width: '40px',
                borderRadius: '50%',
                backgroundColor: unreadCount > 0 ? '#f6ffed' : 'transparent'
              }}
            />
          </Badge>
        </Popover>

        {/* Logout Button */}
        <ButtonDanger
          label="Log Out"
          icon={<LogoutOutlined />}
          onClick={handleLogout}
          style={{ width: '120px', fontWeight: 500 }}
        />
      </div>
    </Header>
  );
};

export default AdminNavbar;
