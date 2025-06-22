export const dummyProducts = [
  {
    id: 1,
    name: 'Logitech G102',
    price: 230000,
    image: '/images/products/logitech-g102-1.png',
    images: [
      '/images/products/logitech-g102-1.png',
      '/images/products/logitech-g102-2.png',
    ],
    status: 'out-of-stock',
    category: 'Aksesoris',
    subcategory: 'Mouse',
    brand: 'Logitech',
    socket: null,
    stockStatus: 'Out of Stock',
    stock: 0,
    variants: [
      { id: 1, name: 'Black' },
      { id: 2, name: 'White' },
      { id: 3, name: 'Blue' }
    ],
    description: `- Tipe: Gaming Mouse Wired
- Sensor: Optical Sensor HERO generasi awal
- DPI: 200 – 8,000 (adjustable)
- Tombol: 6 tombol dapat diprogram
- Polling Rate: 1000 Hz (1 ms)
- Pencahayaan: RGB LIGHTSYNC, 16,8 juta warna
- Berat: ±85 gram
- Kabel: Braided, fleksibel dan tahan lama
- Software: Logitech G HUB kompatibel
- Desain: Simetris, cocok untuk tangan kanan/kiri
- Durabilitas: Klik sampai 10 juta kali`,
  },
  {
    id: 2,
    name: 'Ajazz-AK35i',
    price: 1500000,
    image: '/images/products/ajazz-ak35i.png',
    images: [
      '/images/products/ajazz-ak35i.png',
      '/images/products/ajazz-ak35i-2.png',
    ],
    status: 'ready-stock',
    category: 'Aksesoris',
    subcategory: 'Keyboard',
    brand: 'Ajazz',
    socket: null,
    stockStatus: 'Ready Stock',
    stock: 10,
    variants: [
      { id: 1, name: 'Black' },
      { id: 2, name: 'White' }
    ],
    description: `- Tipe: Keyboard Mekanikal Kompak 87 tombol
- Switch: Mekanikal (type tidak spesifik)
- Pencahayaan: RGB dapat disesuaikan
- Keycaps: ABS
- Koneksi: USB plug-and-play
- Kebisingan: Rendah
- Desain: Minimalis dan ergonomis`,
  },
  {
    id: 3,
    name: 'Ajazz-Apex',
    price: 500000,
    image: '/images/products/ajazz-apex.png',
    images: [
      '/images/products/ajazz-apex.png',
      '/images/products/ajazz-apex-2.png',
    ],
    status: 'out-of-stock',
    category: 'Aksesoris',
    subcategory: 'Mouse',
    brand: 'Ajazz',
    socket: null,
    stockStatus: 'Out of Stock',
    stock: 0,
    description: `- Tipe: Keyboard Mekanikal Fullsize
- Switch: Mekanikal responsif
- Keycaps: ABS berkualitas tinggi
- Pencahayaan: RGB dapat disesuaikan
- Fitur: Anti-ghosting, ergonomis
- Koneksi: USB plug-and-play
- Desain: Kompak dan efisien`,
  },
  {
    id: 4,
    name: 'Aria II',
    price: 560000,
    image: '/images/products/fantech-aria-ii.png',
    images: [
      '/images/products/fantech-aria-ii.png',
      '/images/products/fantech-aria-ii-2.png',
    ],
    status: 'ready-stock',
    category: 'Aksesoris',
    subcategory: 'Mouse',
    brand: 'Fantech',
    socket: null,
    stockStatus: 'Ready Stock',
    stock: 12,
    description: `- Tipe: Mouse Gaming Wired
- Sensor: Optical, hingga 10.000 DPI
- Tombol: Dapat diprogram
- Pencahayaan: RGB dapat disesuaikan
- Desain: Ergonomis untuk penggunaan lama
- Kabel: Fleksibel
- Ketahanan: Material berkualitas tinggi`,
  },
  {
    id: 5,
    name: 'Intel Core i5',
    price: 2410000,
    image: '/images/products/intel-core-i5.png',
    images: [
      '/images/products/intel-core-i5.png',
      '/images/products/intel-core-i5-2.png',
    ],
    status: 'ready-stock',
    category: 'Komponen',
    subcategory: 'Processor',
    brand: 'Intel',
    socket: 'Intel',
    stockStatus: 'Ready Stock',
    stock: 8,
    variants: [
      { id: 1, name: '12400F' },
      { id: 2, name: '12600K' },
      { id: 3, name: '13400F' }
    ],
    description: `- Core: 4-6 cores
- Thread: 8-12 threads
- Base clock: 2.0 - 3.0 GHz
- Turbo Boost: Yes
- Teknologi: Hyper-Threading (beberapa model)
- Integrated Graphics: Intel UHD/Iris Plus
- Efisiensi daya: Baik untuk laptop
- Cocok untuk: Gaming dan multitasking menengah`,
  },
  {
    id: 6,
    name: 'MSI PRO H610M',
    price: 2410000,
    image: '/images/products/msi-pro-h610m.png',
    images: [
      '/images/products/msi-pro-h610m.png',
      '/images/products/msi-pro-h610m.png',
    ],
    status: 'ready-stock',
    category: 'Komponen',
    subcategory: 'Motherboard',
    brand: 'MSI',
    socket: 'Intel',
    stockStatus: 'Ready Stock',
    stock: 8,
    description: `- Socket: Intel LGA 1700 (H610 chipset)
- Memory: DDR4 support
- Slot ekspansi: PCIe x16 dan lainnya
- Konektivitas: USB 3.x, LAN
- Form Factor: Micro ATX
- Cocok untuk: Sistem desktop kantor & gaming ringan`,
  },
  {
    id: 7,
    name: 'NVIDIA GeForce GTX 1060',
    price: 2410000,
    image: '/images/products/NVIDIA GeForce GTX 1060.png',
    images: [
      '/images/products/NVIDIA GeForce GTX 1060.png',
      '/images/products/NVIDIA GeForce GTX 1060.png',
    ],
    status: 'out-of-stock',
    category: 'Komponen',
    subcategory: 'GPU',
    brand: 'NVIDIA',
    socket: null,
    stockStatus: 'Out of Stock',
    stock: 0,
    description: `- CUDA Cores: 1280
- Memory: 6GB GDDR5
- Base Clock: 1506 MHz
- Boost Clock: 1708 MHz
- Interface: PCIe 3.0 x16
- DirectX: 12
- Cocok untuk: Gaming 1080p`,
  },
  {
    id: 8,
    name: 'Corsair Vengeance LPX 16GB (2x8GB) DDR4 3200MHz',
    price: 1250000,
    image: '/images/products/corsair-vengeance-lpx.png',
    images: [
      '/images/products/corsair-vengeance-lpx.png',
      '/images/products/corsair-vengeance-lpx-2.png',
    ],
    status: 'ready-stock',
    category: 'Komponen',
    subcategory: 'RAM',
    brand: 'Corsair',
    socket: null,
    stockStatus: 'Ready Stock',
    stock: 20,
    variants: [
      { id: 1, name: 'Black' },
      { id: 2, name: 'White' },
      { id: 3, name: 'Red' }
    ],
    description: `- Kapasitas: 16GB (2x8GB)
- Tipe: DDR4
- Kecepatan: 3200 MHz
- Latency: CL16
- Tegangan: 1.35V
- Desain: Low profile heat spreader
- Cocok untuk: Gaming dan multitasking`,
  },
  {
    id: 9,
    name: 'Samsung 970 EVO Plus NVMe SSD',
    price: 1200000,
    image: '/images/products/samsung-970-evo-plus.png',
    images: [
      '/images/products/samsung-970-evo-plus.png',
      '/images/products/samsung-970-evo-plus-2.png',
    ],
    status: 'ready-stock',
    category: 'Komponen',
    subcategory: 'Storage',
    brand: 'Samsung',
    socket: null,
    stockStatus: 'Ready Stock',
    stock: 15,
    variants: [
      { id: 1, name: '250GB' },
      { id: 2, name: '500GB' },
      { id: 3, name: '1TB' },
      { id: 4, name: '2TB' }
    ],
    description: `- Tipe: NVMe M.2 SSD
- Kecepatan baca: sampai 3500 MB/s
- Kecepatan tulis: sampai 3300 MB/s
- Interface: PCIe Gen 3.0 x4
- Cocok untuk: Sistem operasi dan aplikasi berat`,
  },
  {
    id: 10,
    name: 'NZXT H510',
    price: 1200000,
    image: '/images/products/nzxt-h510.png',
    images: [
      '/images/products/nzxt-h510.png',
      '/images/products/nzxt-h510-2.png',
    ],
    status: 'out-of-stock',
    category: 'Komponen',
    subcategory: 'Casing',
    brand: 'NZXT',
    socket: null,
    stockStatus: 'Out of Stock',
    stock: 0,
    variants: [
      { id: 1, name: 'Black' },
      { id: 2, name: 'White' },
      { id: 3, name: 'Red' }
    ],
    description: `- Tipe: Mid Tower
- Material: Steel & Tempered Glass
- Support Motherboard: ATX, Micro-ATX, Mini-ITX
- Slot Ekspansi: 7
- Support Pendingin: Radiator sampai 280mm
- Kabel Manajemen: Tersembunyi dan rapi`,
  },
  {
    id: 11,
    name: 'Corsair RM750x 750W 80+ Gold',
    price: 1800000,
    image: '/images/products/corsair-rm750x.png',
    images: [
      '/images/products/corsair-rm750x.png',
      '/images/products/corsair-rm750x-2.png',
    ],
    status: 'ready-stock',
    category: 'Komponen',
    subcategory: 'Power Supply',
    brand: 'Corsair',
    socket: null,
    stockStatus: 'Ready Stock',
    stock: 10,
    description: `- Daya: 750 Watt
- Sertifikasi: 80 Plus Gold
- Modular: Fully Modular
- Fan: 135mm dengan kontrol temperatur
- Proteksi: OVP, UVP, SCP, OPP, OTP
- Cocok untuk: Gaming PC dan workstation`,
  },
  {
    id: 12,
    name: 'Cooler Master Hyper 212 Black Edition',
    price: 400000,
    image: '/images/products/cooler-master-hyper-212.png',
    images: [
      '/images/products/cooler-master-hyper-212.png',
      '/images/products/cooler-master-hyper-212-2.png',
    ],
    status: 'ready-stock',
    category: 'Komponen',
    subcategory: 'Cooler',
    brand: 'Cooler Master',
    socket: null,
    stockStatus: 'Ready Stock',
    stock: 15,
    description: `- Tipe: CPU Air Cooler
- Fan: 120mm PWM
- Heatpipes: 4 heatpipes tembaga
- Kompatibilitas: Intel & AMD sockets
- Desain: Fin hitam anodized
- Cocok untuk: Pendinginan prosesor hingga overclocking ringan`,
  },
  {
    id: 13,
    name: 'PC Gaming',
    price: 13000000,
    image: '/images/products/pc-gaming.png',
    images: [
      '/images/products/pc-gaming.png',
      '/images/products/cooler-master-hyper-212-2.png',
    ],
    status: 'ready-stock',
    category: 'Komponen',
    subcategory: 'Cooler',
    brand: 'Cooler Master',
    socket: null,
    stockStatus: 'Ready Stock',
    stock: 15,
    description: `- Tipe: CPU Air Cooler
- Fan: 120mm PWM
- Heatpipes: 4 heatpipes tembaga
- Kompatibilitas: Intel & AMD sockets
- Desain: Fin hitam anodized
- Cocok untuk: Pendinginan prosesor hingga overclocking ringan`,
  },

];
