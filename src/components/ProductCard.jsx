import React from 'react';
import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

const ProductCard = ({ id, image, name, price, textColor = '#000', onDelete }) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Link to={`/product/${id}`} style={{ textDecoration: 'none' }}>
        <Card
          sx={{
            width: 325,
            height: 300,
            boxShadow: 3,
            backgroundColor: 'transparent',
            transition: 'all 0.3s ease',
            border: '2px solid transparent',
            '&:hover': {
              border: '2px solidrgb(0, 0, 0)',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(8px)',
            },
          }}
        >
          <CardActionArea>
            {/* Container gambar untuk overlay gelap */}
            <div style={{ position: 'relative', width: '100%', height: 200, overflow: 'hidden' }}>
              <CardMedia
                component="img"
                image={image}
                alt={name}
                sx={{
                  width: '100%',
                  height: '200px',
                  objectFit: 'cover',
                  display: 'block',
                  transition: 'filter 0.3s ease',
                  backgroundColor:'#212121'
                }}
                className="product-image"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://via.placeholder.com/250x200?text=No+Image';
                }}
              />
              {/* Overlay gelap muncul saat hover */}
              <div
                className="image-overlay"
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundColor: 'rgba(0, 0, 0, 0)', // default transparan
                  pointerEvents: 'none',
                  transition: 'background-color 0.3s ease',
                }}
              />
            </div>

            <CardContent sx={{ textAlign: 'left', padding: '16px' }}>
              <Typography
                gutterBottom
                variant="body1"
                sx={{ fontWeight: 'bold', color: textColor }}
              >
                {name}
              </Typography>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography variant="body2" sx={{ fontWeight: 'semibold', color: textColor }}>
                  {price}
                </Typography>
                {onDelete && (
                  <IconButton
                    aria-label="delete"
                    onClick={(e) => {
                      e.preventDefault();
                      onDelete(id);
                    }}
                    sx={{
                      padding: 0,
                      marginLeft: 1,
                      color: textColor,
                    }}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                )}
              </div>
            </CardContent>
          </CardActionArea>

          {/* Inline style untuk hover efek */}
          <style>
            {`
              .MuiCard-root:hover .product-image {
                filter: brightness(0.6);
              }
            `}
          </style>
        </Card>
      </Link>
    </div>
  );
};

export default ProductCard;
