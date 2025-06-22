import React from 'react';
import {
  List,
  Avatar,
  Typography,
  Breadcrumb,
} from 'antd';
import { StarFilled } from '@ant-design/icons';
import SuperAdminLayout from '../../components/SuperAdminLayout';

const { Paragraph } = Typography;

const feedbackData = [
  { id: '1', name: 'Mikael Renaldi', comment: 'Barangnya keren-keren', rating: 4 },
  { id: '2', name: 'Wahyyuuu', comment: 'Pelayananya Oke', rating: 4 },
  { id: '3', name: 'Raawull', comment: 'Joossss', rating: 4 },
];

const SuperAdminFeedback = () => {

  const renderStars = (count) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <StarFilled
          key={i}
          style={{ color: i < count ? '#fadb14' : '#d9d9d9', marginRight: 4 }}
          aria-label={i < count ? 'filled star' : 'empty star'}
        />
      );
    }
    return stars;
  };

  return (
    <SuperAdminLayout>
      <div className="admin-page">
        <Breadcrumb style={{ marginBottom: 16 }}>
          <Breadcrumb.Item>Super Admin</Breadcrumb.Item>
          <Breadcrumb.Item>Feedback</Breadcrumb.Item>
        </Breadcrumb>
            <List
              itemLayout="vertical"
              dataSource={feedbackData}
              renderItem={(item) => (
                <List.Item
                  key={item.id}
                  style={{
                    background: '#fafafa',
                    padding: 20,
                    marginBottom: 16,
                    borderRadius: 8,
                    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                  }}
                >
                  <List.Item.Meta
                    avatar={
                      <Avatar
                        style={{ backgroundColor: '#1890ff', verticalAlign: 'middle' }}
                        size="large"
                      >
                        {item.name.charAt(0).toUpperCase()}
                      </Avatar>
                    }
                    title={
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                        }}
                      >
                        <strong>{item.name}</strong>
                        <div>{renderStars(item.rating)}</div>
                      </div>
                    }
                    description={<Paragraph style={{ marginBottom: 0 }}>{item.comment}</Paragraph>}
                  />
                </List.Item>
              )}
            />
      </div>
    </SuperAdminLayout>
  );
};

export default SuperAdminFeedback;
