import React from 'react';
import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';

// Data dummy disimpan di sini
export const dummyProducts = [
    {
        id: 1,
        name: 'Mouse Gaming XYZ',
        price: 150000,
        image: '/images/products/fantech-mh82.png',
        status: 'ready-stock',
    },
    {
        id: 2,
        name: 'Keyboard Mechanical ABC',
        price: 450000,
        image: '/images/products/fantech-mh82.png',
        status: 'pre-order',
    },
    {
        id: 3,
        name: 'Headset 7.1 Surround',
        price: 300000,
        image: '/images/products/fantech-mh82.png',
        status: 'ready-stock',
    },
    {
        id: 4,
        name: 'Gaming Chair Pro',
        price: 1200000,
        image: '/images/products/fantech-mh82.png',
        status: 'pre-order',
    },
    {
        id: 5,
        name: 'Monitor 144Hz UltraWide',
        price: 2500000,
        image: 'https://via.placeholder.com/200x150',
        status: 'ready-stock',
    },
    {
        id: 6,
        name: 'Gaming Desk RGB',
        price: 1800000,
        image: 'https://via.placeholder.com/200x150',
        status: 'ready-stock',
    },
    {
        id: 7,
        name: 'Processor Intel i7',
        price: 3500000,
        image: 'https://via.placeholder.com/200x150',
        status: 'pre-order',
    },
    {
        id: 8,
        name: 'Graphic Card RTX 3060',
        price: 7000000,
        image: 'https://via.placeholder.com/200x150',
        status: 'ready-stock',
    },
    {
        id: 9,
        name: 'SSD 1TB NVMe',
        price: 1500000,
        image: 'https://via.placeholder.com/200x150',
        status: 'ready-stock',
    },
    {
        id: 10,
        name: 'Power Supply 750W',
        price: 1200000,
        image: 'https://via.placeholder.com/200x150',
        status: 'pre-order',
    },
    {
        id: 11,
        name: 'Gaming Mousepad XXL',
        price: 250000,
        image: 'https://via.placeholder.com/200x150',
        status: 'ready-stock',
    },
    {
        id: 12,
        name: 'Webcam Full HD',
        price: 800000,
        image: 'https://via.placeholder.com/200x150',
        status: 'ready-stock',
    },
    {
        id: 13,
        name: 'Mechanical Keyboard RGB',
        price: 900000,
        image: 'https://via.placeholder.com/200x150',
        status: 'pre-order',
    },
    {
        id: 14,
        name: 'Gaming Headset Wireless',
        price: 1500000,
        image: 'https://via.placeholder.com/200x150',
        status: 'ready-stock',
    },
    {
        id: 15,
        name: 'Capture Card 4K',
        price: 2500000,
        image: 'https://via.placeholder.com/200x150',
        status: 'pre-order',
    },
    {
        id: 16,
        name: 'VR Headset',
        price: 5000000,
        image: 'https://via.placeholder.com/200x150',
        status: 'ready-stock',
    },
    {
        id: 17,
        name: 'External Hard Drive 2TB',
        price: 1200000,
        image: 'https://via.placeholder.com/200x150',
        status: 'ready-stock',
    },
    {
        id: 18,
        name: 'Gaming Controller',
        price: 600000,
        image: 'https://via.placeholder.com/200x150',
        status: 'pre-order',
    },
    {
        id: 19,
        name: 'Streaming Microphone',
        price: 1300000,
        image: 'https://via.placeholder.com/200x150',
        status: 'ready-stock',
    },
    {
        id: 20,
        name: 'Gaming Laptop Stand',
        price: 400000,
        image: 'https://via.placeholder.com/200x150',
        status: 'ready-stock',
    },
    {
        id: 21,
        name: 'Gaming Glasses',
        price: 300000,
        image: 'https://via.placeholder.com/200x150',
        status: 'pre-order',
    },
    {
        id: 22,
        name: 'Cable Management Kit',
        price: 150000,
        image: 'https://via.placeholder.com/200x150',
        status: 'ready-stock',
    },
    {
        id: 23,
        name: 'Gaming Router',
        price: 2000000,
        image: 'https://via.placeholder.com/200x150',
        status: 'ready-stock',
    },
];

// Data tambahan selesai

const ProductCard = ({ id, image, name, price, textColor = '#000' }) => { // Default warna teks hitam
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Link to={`/product/${id}`} style={{ textDecoration: 'none' }}>
                <Card
                    sx={{
                        maxWidth: 250,
                        boxShadow: 3,
                        borderRadius: 2,
                        backgroundColor: 'transparent',
                        transition: 'background-color 0.3s ease',
                        '&:hover': {
                            backgroundColor: '#FFD700', // Warna kuning saat hover
                        },
                    }}
                >
                    <CardActionArea>
                        {/* Gambar Produk */}
                        <CardMedia
                            component="img"
                            height="200"
                            image={image}
                            alt={name}
                            sx={{ objectFit: 'contain' }}
                            style={{
                                width: '100%',
                                height: 'auto',
                                borderRadius: '10px 10px 0 0', // Rounded corners for the top
                            }}
                        />
                        {/* Konten Produk */}
                        <CardContent sx={{ textAlign: 'left' }}>
                            <Typography
                                gutterBottom
                                variant="body1"
                                component="div"
                                sx={{ fontWeight: 'bold', color: textColor }} // Warna teks diatur di sini
                            >
                                {name}
                            </Typography>
                            <Typography
                                variant="body2"
                                sx={{ fontWeight: 'semibold', textAlign: 'left', color: textColor }} // Warna teks diatur di sini
                            >
                                {price}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </Link>
        </div>
    );
};

export default ProductCard;