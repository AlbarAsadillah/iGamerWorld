import React from 'react';
import NavigationBar from '../../components/Navbar';
import BannerCarousel from '../../components/Carousel';
import CategorySection from '../../components/CategorySection';
import ProdukUnggulan from '../../components/ProdukUnggulan';
import SubKategori from '../../components/SubKategori';
import ProdukList from '../../components/ProdukList';
import  BrandSection from '../../components/BrandSection';
import  LiputanMedia from '../../components/LiputanMedia';
import  FootBanner from '../../components/FootBanner';
import  Footer from '../../components/Footer';
import  Unggulan from '../../components/Unggulan';



const HomePage = () => {
    return (
        <div style={styles.page}>
            {/* <NavigationBar /> */}
            <BannerCarousel />
            <CategorySection />
            {/* <ProdukUnggulan /> */}
            <Unggulan />
            <SubKategori />
            <ProdukList />
            <BrandSection/>
            <FootBanner/>
            <LiputanMedia/>

        </div>
    );
};

const styles = {
    page: {
        backgroundColor: '#0D0D0D',
        // color: '#fff',
        minHeight: '100vh',
    },
    heading: {
        textAlign: 'center',
        marginTop: '2rem',
        fontSize: '1.8rem',
        fontWeight: 'bold',
    },
};

export default HomePage;