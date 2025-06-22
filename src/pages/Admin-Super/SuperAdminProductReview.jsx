import React from 'react';
import { Card, List, Typography, Breadcrumb, Button } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { dummyProducts } from '../../data/dummyProducts';
import SuperAdminLayout from '../../components/SuperAdminLayout';

const { Title, Text } = Typography;

// Dummy review data
const dummyReviews = [
  {
    id: 1,
    reviewer: 'Budi',
    rating: 5,
    comment: 'Produk sangat bagus, pengiriman cepat!',
    date: '2024-06-01',
  },
  {
    id: 2,
    reviewer: 'Siti',
    rating: 4,
    comment: 'Kualitas oke, harga bersaing.',
    date: '2024-06-02',
  },
  {
    id: 3,
    reviewer: 'Andi',
    rating: 3,
    comment: 'Cukup memuaskan, tapi packing kurang rapi.',
    date: '2024-06-03',
  },
];

const SuperAdminProductReview = () => {
  const navigate = useNavigate();
  const { productId } = useParams();
  const product = dummyProducts.find((p) => p.id.toString() === productId);

  return (
    <SuperAdminLayout>
      <div style={{ background: '#fff', minHeight: '100vh' }}>
        <Breadcrumb style={{ marginBottom: 16 }}>
          <Breadcrumb.Item>Super Admin</Breadcrumb.Item>
          <Breadcrumb.Item>
            <a onClick={() => navigate('/superadmin-product')}>Products</a>
          </Breadcrumb.Item>
          <Breadcrumb.Item>Review Produk</Breadcrumb.Item>
        </Breadcrumb>
        <Button onClick={() => navigate(-1)} style={{ marginBottom: 16 }}>Kembali</Button>
        <Card title={<span style={{ fontFamily: 'Poppins, sans-serif' }}>{product?.name || 'Produk Tidak Ditemukan'}</span>}>
          <Title level={4}>Daftar Review Produk</Title>
          <List
            dataSource={dummyReviews}
            renderItem={review => (
              <List.Item>
                <List.Item.Meta
                  title={<span>{review.reviewer} - {review.rating}⭐</span>}
                  description={<span>{review.comment} <br /><Text type="secondary">{review.date}</Text></span>}
                />
              </List.Item>
            )}
          />
        </Card>
      </div>
    </SuperAdminLayout>
  );
};

export default SuperAdminProductReview;
