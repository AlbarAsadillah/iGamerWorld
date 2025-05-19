import React from 'react';
import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';

const ProductCard = ({ id, image, name, price, textColor = '#000' }) => { // Default color is black
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Link to={`/product/${id}`} style={{ textDecoration: 'none' }}>
                <Card
                    sx={{
                        width: 250,  // Set fixed width
                        height: 300, // Set fixed height for card to ensure uniformity
                        boxShadow: 3,
                        backgroundColor: 'transparent',
                        transition: 'all 0.3s ease', // Smooth transition for hover effect
                        border: '2px solid transparent', // Default border
                        '&:hover': {
                            border: '2px solid #FFD700', // White border on hover
                        },
                    }}
                >
                    <CardActionArea>
                        {/* Product Image */}
                        <CardMedia
                            component="img"
                            height="200" // Set a fixed height for images
                            image={image}
                            alt={name}
                            sx={{ objectFit: 'cover' }}  // Ensures the image covers the area without distortion
                            style={{
                                width: '100%',
                                height: '200px', // Set a consistent height for all images
                                // borderRadius: '10px 10px 0 0', // Rounded corners for the top
                            }}
                        />
                        {/* Product Content */}
                        <CardContent sx={{ textAlign: 'left', padding: '16px' }}>
                            <Typography
                                gutterBottom
                                variant="body1"
                                component="div"
                                sx={{ fontWeight: 'bold', color: textColor }} // Set text color here
                            >
                                {name}
                            </Typography>
                            <Typography
                                variant="body2"
                                sx={{ fontWeight: 'semibold', textAlign: 'left', color: textColor }} // Set text color here
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
