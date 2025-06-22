import React from 'react';
import NavigationBar from '../../components/Navbar';
import BannerCarousel from '../../components/Carousel';
import CategorySection from '../../components/CategorySection';
import ProdukUnggulan from '../../components/ProdukUnggulan';
import SubKategori from '../../components/SubKategori';
import ProdukList from '../../components/ProdukList';
import BrandSection from '../../components/BrandSection';
import LiputanMedia from '../../components/LiputanMedia';
import FootBanner from '../../components/FootBanner';
import Footer from '../../components/Footer';
import Unggulan from '../../components/Unggulan';
import HeadBanner from '../../components/HeadBanner';  // import komponen
import FeedbackSection from '../../components/FeedbackSection';
import { FloatingWhatsApp } from 'react-floating-whatsapp';
import WhatsappChat from '../../components/WhatsappChat';
import SectionBrandList from '../../components/SectionBrandList';


const HomePage = () => {
  return (
    <div
      className="customer-page"
      style={{
        ...styles.page,
        // backgroundImage: 'url("/images/category-bg.png")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* <NavigationBar /> */}
      <HeadBanner />
      <CategorySection />
      {/* <ProdukUnggulan /> */}
      <BannerCarousel />
      <SectionBrandList />
      <Unggulan />
      <SubKategori />
      <ProdukList />
      {/* <BrandSection /> */}
      <FootBanner />
      {/* <FeedbackSection /> */}
      <LiputanMedia />
      {/* <Footer /> */}
      {/* <WhatsappChat /> */}
      <FloatingWhatsApp
        phoneNumber="085174112887" // Ganti dengan nomor WhatsApp Anda
        accountName="Admin iGamerWorld"
        avatar="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
        statusMessage="Online"
        chatMessage="Halo, ada yang bisa kami bantu?"
        allowClickAway
        notification
        notificationSound
      />
    </div>
  );
};

const styles = {
  page: {
    backgroundColor: '#080808', // fallback kalau gambar gagal load
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
