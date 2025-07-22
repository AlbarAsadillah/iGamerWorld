export const dummyProducts = [
  // ASUS
  {
    id: 1,
    name: 'ASUS PRIME B450M',
    image: '/images/products/Asus Prime1.png',
    images: ['/images/products/Asus Prime1.png'],
    status: 'ready-stock',
    category: 'Komponen',
    subcategory: 'Motherboard',
    brand: 'Asus',
    socket: 'AMD',
    stockStatus: 'Ready Stock',
    stock: 7,
    description: `Motherboard mATX, AMD B450, Socket AM4
- Form Factor: mATX
- Chipset: AMD B450
- Memory: 4x DDR4 up to 128GB
- Storage: 1x M.2, 4x SATA3
- Expansion: 1x PCIe x16, 2x PCIe x1
- Display: HDMI, DVI-D
- USB: 6x USB 3.1 Gen1
- LAN: Gigabit
- Audio: 8-channel
- Fitur: ASUS 5X Protection III, RGB Header`,
    variants: [
      { id: 1, name: 'B450M-A', price: 1500000, stock: 3, image: '/images/products/Asus Prime1.png' },
      { id: 2, name: 'B450M-K', price: 1550000, stock: 4, image: '/images/products/asus-prime-b450m.png' },
    ],
    price: 1500000,
  },
  {
    id: 2,
    name: 'ASUS TUF Gaming RTX 3060',
    image: '/images/products/Asus TUF1.png',
    images: ['/images/products/Asus TUF1.png'],
    status: 'ready-stock',
    category: 'Komponen',
    subcategory: 'GPU',
    brand: 'Asus',
    stockStatus: 'Ready Stock',
    stock: 5,
    description: `NVIDIA GeForce RTX 3060 12GB GDDR6
- CUDA Cores: 3584
- Memory: 12GB GDDR6
- Memory Bus: 192-bit
- Output: 3x DisplayPort 1.4a, 1x HDMI 2.1
- Power: 1x 8-pin, 170W
- Fitur: Ray Tracing, DLSS, TUF Cooling`,
    price: 6500000,
  },
  // MSI
  {
    id: 3,
    name: 'MSI B550M PRO-VDH',
    image: '/images/products/MSI Pro1.png',
    images: ['/images/products/MSI Pro1.png'],
    status: 'ready-stock',
    category: 'Komponen',
    subcategory: 'Motherboard',
    brand: 'MSI',
    socket: 'AMD',
    stockStatus: 'Ready Stock',
    stock: 8,
    description: `Motherboard mATX, AMD B550, Socket AM4
- Form Factor: mATX
- Chipset: AMD B550
- Memory: 4x DDR4 up to 128GB
- Storage: 2x M.2, 4x SATA3
- Expansion: 1x PCIe 4.0 x16, 2x PCIe x1
- Display: HDMI, DVI-D, VGA
- USB: 6x USB 3.2 Gen1
- LAN: Gigabit
- Audio: 8-channel
- Fitur: Core Boost, Steel Armor`,
    variants: [
      { id: 1, name: 'B550M PRO-VDH', price: 1800000, stock: 5, image: '/images/products/msi-b550m-pro-vdh.png' },
      { id: 2, name: 'B550M PRO-VDH WIFI', price: 2000000, stock: 3, image: '/images/products/msi-b550m-pro-vdh.png' },
    ],
    price: 1800000,
  },
  {
    id: 4,
    name: 'MSI GeForce GTX 1660 Super',
    image: '/images/products/MSI 16601.png',
    images: ['/images/products/MSI 16601.png'],
    status: 'ready-stock',
    category: 'Komponen',
    subcategory: 'GPU',
    brand: 'MSI',
    stockStatus: 'Ready Stock',
    stock: 4,
    description: `NVIDIA GeForce GTX 1660 Super 6GB GDDR6
- CUDA Cores: 1408
- Memory: 6GB GDDR6
- Memory Bus: 192-bit
- Output: HDMI, DisplayPort, DVI-D
- Power: 1x 8-pin, 125W
- Fitur: Turing Shaders, Afterburner OC`,
    price: 4200000,
  },
  // Gigabyte
  {
    id: 5,
    name: 'Gigabyte GTX 1650',
    image: '/images/products/gigabyte gtx1.png',
    images: ['/images/products/gigabyte gtx1.png'],
    status: 'ready-stock',
    category: 'Komponen',
    subcategory: 'GPU',
    brand: 'Gigabyte',
    stockStatus: 'Ready Stock',
    stock: 5,
    description: `NVIDIA GeForce GTX 1650 4GB GDDR5
- CUDA Cores: 896
- Memory: 4GB GDDR5
- Memory Bus: 128-bit
- Output: HDMI, DisplayPort, DVI-D
- Power: 1x 6-pin, 75W
- Fitur: Windforce 2X Cooling, Compact PCB`,
    variants: [
      { id: 1, name: 'GTX 1650 OC', price: 2550000, stock: 2, image: '/images/products/gigabyte-gtx-1650.png' },
      { id: 2, name: 'GTX 1650 D6', price: 2500000, stock: 3, image: '/images/products/gigabyte-gtx-1650.png' },
    ],
    price: 2500000,
  },
  {
    id: 6,
    name: 'Gigabyte B660M DS3H',
    image: '/images/products/Gigabyte1.png',
    images: ['/images/products/Gigabyte1.png'],
    status: 'ready-stock',
    category: 'Komponen',
    subcategory: 'Motherboard',
    brand: 'Gigabyte',
    socket: 'Intel',
    stockStatus: 'Ready Stock',
    stock: 6,
    description: `Motherboard mATX, Intel B660, Socket LGA1700
- Form Factor: mATX
- Chipset: Intel B660
- Memory: 4x DDR4 up to 128GB
- Storage: 2x M.2, 4x SATA3
- Expansion: 1x PCIe 4.0 x16, 2x PCIe x1
- Display: HDMI, DVI-D, VGA
- USB: 6x USB 3.2 Gen1
- LAN: Gigabit
- Audio: 8-channel
- Fitur: Q-Flash Plus, Ultra Durable`,
    price: 2100000,
  },
  // Intel
  {
    id: 7,
    name: 'Intel Core i5',
    image: '/images/products/Intel Core i51.png',
    images: ['/images/products/Intel Core i51.png'],
    status: 'ready-stock',
    category: 'Komponen',
    subcategory: 'Processor',
    brand: 'Intel',
    socket: 'Intel',
    stockStatus: 'Ready Stock',
    stock: 8,
    description: `6 core 12 thread, boost up to 4.6GHz
- Tipe: Desktop Processor
- Socket: LGA1200
- Jumlah Core: 6
- Jumlah Thread: 12
- Base Clock: 2.5GHz
- Turbo Boost: up to 4.6GHz
- Cache: 12MB Intel Smart Cache
- TDP: 65W`,
    variants: [
      { id: 1, name: '12400F', price: 2500000, stock: 3, image: '/images/products/intel-core-i5.png' },
      { id: 2, name: '12600K', price: 3200000, stock: 2, image: '/images/products/intel-core-i5.png' },
    ],
    price: 2500000,
  },
  {
    id: 8,
    name: 'Intel Core i7',
    image: '/images/products/Intel Core i71.png',
    images: ['/images/products/Intel Core i71.png'],
    status: 'ready-stock',
    category: 'Komponen',
    subcategory: 'Processor',
    brand: 'Intel',
    socket: 'Intel',
    stockStatus: 'Ready Stock',
    stock: 5,
    description: `8 core 16 thread, boost up to 5.0GHz
- Tipe: Desktop Processor
- Socket: LGA1200
- Jumlah Core: 8
- Jumlah Thread: 16
- Base Clock: 3.0GHz
- Turbo Boost: up to 5.0GHz
- Cache: 16MB Intel Smart Cache
- TDP: 125W`,
    price: 4800000,
  },
  // AMD
  {
    id: 9,
    name: 'AMD Ryzen 5 5600X',
    image: '/images/products/AMD Ryzen1.png',
    images: ['/images/products/AMD Ryzen1.png'],
    status: 'ready-stock',
    category: 'Komponen',
    subcategory: 'Processor',
    brand: 'AMD',
    socket: 'AMD',
    stockStatus: 'Ready Stock',
    stock: 10,
    description: `6 core 12 thread, boost up to 4.6GHz
- Tipe: Desktop Processor
- Socket: AM4
- Jumlah Core: 6
- Jumlah Thread: 12
- Base Clock: 3.7GHz
- Turbo Boost: up to 4.6GHz
- Cache: 35MB (L2: 3MB, L3: 32MB)
- TDP: 65W`,
    variants: [
      { id: 1, name: '5600X', price: 3200000, stock: 5, image: '/images/products/amd-ryzen-5-5600x.png' },
      { id: 2, name: '5600', price: 2950000, stock: 5, image: '/images/products/amd-ryzen-5-5600x.png' },
    ],
    price: 2950000,
  },
  {
    id: 10,
    name: 'AMD Ryzen 7 5800X',
    image: '/images/products/AMD Ryzen 71.png',
    images: ['/images/products/AMD Ryzen 71.png'],
    status: 'ready-stock',
    category: 'Komponen',
    subcategory: 'Processor',
    brand: 'AMD',
    socket: 'AMD',
    stockStatus: 'Ready Stock',
    stock: 7,
    description: `8 core 16 thread, boost up to 4.7GHz
- Tipe: Desktop Processor
- Socket: AM4
- Jumlah Core: 8
- Jumlah Thread: 16
- Base Clock: 3.2GHz
- Turbo Boost: up to 4.7GHz
- Cache: 36MB (L2: 4MB, L3: 32MB)
- TDP: 105W`,
    price: 5200000,
  },
  // Logitech
  {
    id: 11,
    name: 'Logitech G102 Lightsync',
    image: '/images/products/LogitechG1021.png',
    images: ['/images/products/LogitechG1021.png',
            '/images/products/LogitechG1022.png'],
    status: 'ready-stock',
    category: 'Aksesoris',
    subcategory: 'Mouse',
    brand: 'Logitech',
    stockStatus: 'Ready Stock',
    stock: 15,
    description: `RGB Gaming Mouse, 8000 DPI
- Sensor: Optical
- DPI: 200 - 8000
- Lighting: RGB Lightsync
- Buttons: 6 Programmable
- Connection: Wired USB
- Weight: 85g
- Polling Rate: 1000Hz
- Shape: Ambidextrous`,
    variants: [
      { id: 1, name: 'Hitam', price: 250000, stock: 3, image: '/images/products/Asus Prime1.png' },
      { id: 2, name: 'Putih', price: 230000, stock: 4, image: '/images/products/asus-prime-b450m.png' },
    ],
    price: 230000,
  },
  {
    id: 12,
    name: 'Logitech G Pro X Headset',
    image: '/images/products/Logitech Headset1.png',
    images: ['/images/products/Logitech Headset1.png'],
    status: 'ready-stock',
    category: 'Aksesoris',
    subcategory: 'Headset',
    brand: 'Logitech',
    stockStatus: 'Ready Stock',
    stock: 10,
    description: 'Gaming Headset, Blue Voice, 7.1 Surround',
    price: 950000,
  },
  // Ajazz
  {
    id: 13,
    name: 'Ajazz AK33 Mechanical Keyboard',
    image: '/images/products/Ajazz AK33 Mechanical Keyboard.png',
    images: ['/images/products/Ajazz AK33 Mechanical Keyboard.png'],
    status: 'ready-stock',
    category: 'Aksesoris',
    subcategory: 'Keyboard',
    brand: 'Ajazz',
    stockStatus: 'Ready Stock',
    stock: 10,
    description: 'Mechanical Keyboard 82 Keys, Blue Switch',
    price: 450000,
  },
  {
    id: 14,
    name: 'Ajazz AJ390 Mouse',
    image: '/images/products/Ajazz AJ390 Mouse1.png',
    images: ['/images/products/Ajazz AJ390 Mouse1.png'],
    status: 'ready-stock',
    category: 'Aksesoris',
    subcategory: 'Mouse',
    brand: 'Ajazz',
    stockStatus: 'Ready Stock',
    stock: 12,
    description: `Wired Gaming Mouse, 6400 DPI
- Sensor: Optical
- DPI: up to 6400
- Lighting: RGB
- Buttons: 7 Programmable
- Connection: Wired USB
- Weight: 90g
- Polling Rate: 1000Hz
- Shape: Ergonomic`,
    price: 220000,
  },
  // Fantech
  {
    id: 15,
    name: 'Fantech HG11 Captain 7.1',
    image: '/images/products/Fantech HG1.png',
    images: ['/images/products/Fantech HG1.png'],
    status: 'ready-stock',
    category: 'Aksesoris',
    subcategory: 'Headset',
    brand: 'Fantech',
    stockStatus: 'Ready Stock',
    stock: 12,
    description: 'Gaming Headset 7.1 Surround, RGB',
    price: 350000,
  },
  {
    id: 16,
    name: 'Fantech MAXFIT61 Keyboard',
    image: '/images/products/Fantech MAXFIT61 Keyboard1.png',
    images: ['/images/products/Fantech MAXFIT61 Keyboard1.png'],
    status: 'ready-stock',
    category: 'Aksesoris',
    subcategory: 'Keyboard',
    brand: 'Fantech',
    stockStatus: 'Ready Stock',
    stock: 8,
    description: 'Mechanical Keyboard 61 Keys, RGB',
    price: 500000,
  },
  // ASUS - Tambahan
  {
    id: 17,
    name: 'ASUS ROG Strix Z690-F Gaming WiFi',
    image: '/images/products/ASUS ROG Strix Z690-F Gaming WiFi1.png',
    images: ['/images/products/ASUS ROG Strix Z690-F Gaming WiFi1.png'],
    status: 'ready-stock',
    category: 'Komponen',
    subcategory: 'Motherboard',
    brand: 'Asus',
    socket: 'LGA1700',
    stockStatus: 'Ready Stock',
    stock: 4,
    description: `ATX, Intel Z690, 4x DDR5, 3x M.2, WiFi 6E, 2.5Gb LAN
- Chipset: Intel Z690
- Socket: LGA1700
- Memory: 4x DDR5 up to 128GB
- Storage: 3x M.2, 6x SATA
- Expansion: PCIe 5.0 x16, PCIe 4.0 x16
- Networking: Intel WiFi 6E, 2.5Gb Ethernet
- Audio: SupremeFX ALC4080
- RGB Aura Sync`,
    price: 5900000,
  },
  // MSI - Tambahan
  {
    id: 18,
    name: 'MSI MAG B660M Mortar',
    image: '/images/products/MSI MAG B660M Mortar1.png',
    images: ['/images/products/MSI MAG B660M Mortar1.png'],
    status: 'ready-stock',
    category: 'Komponen',
    subcategory: 'Motherboard',
    brand: 'MSI',
    socket: 'LGA1700',
    stockStatus: 'Ready Stock',
    stock: 6,
    description: `mATX, Intel B660, 4x DDR4, 2x M.2, 2.5Gb LAN
- Chipset: Intel B660
- Socket: LGA1700
- Memory: 4x DDR4 up to 128GB
- Storage: 2x M.2, 4x SATA
- Expansion: PCIe 4.0 x16
- Networking: 2.5Gb Ethernet
- Audio: Realtek ALC897`,
    price: 2300000,
  },
  // Gigabyte - Tambahan
  {
    id: 19,
    name: 'Gigabyte AORUS Gen4 SSD 1TB',
    image: '/images/products/Gigabyte Aorus1.png',
    images: ['/images/products/Gigabyte Aorus1.png'],
    status: 'ready-stock',
    category: 'Komponen',
    subcategory: 'Storage',
    brand: 'Gigabyte',
    stockStatus: 'Ready Stock',
    stock: 10,
    description: `NVMe PCIe Gen4x4, 1TB, 5000MB/s Read, 4400MB/s Write
- Form Factor: M.2 2280
- Interface: PCIe Gen4 x4, NVMe 1.3
- Capacity: 1TB
- Sequential Read: up to 5000 MB/s
- Sequential Write: up to 4400 MB/s
- NAND: 3D TLC`,
    price: 1700000,
  },
  // Intel - Tambahan
  {
    id: 20,
    name: 'Intel 670p Series 512GB NVMe SSD',
    image: '/images/products/Intel 5121.png',
    images: ['/images/products/Intel 5121.png'],
    status: 'ready-stock',
    category: 'Komponen',
    subcategory: 'Storage',
    brand: 'Intel',
    stockStatus: 'Ready Stock',
    stock: 8,
    description: `M.2 2280, PCIe 3.0 x4, 512GB, 3500MB/s Read, 2200MB/s Write
- Form Factor: M.2 2280
- Interface: PCIe 3.0 x4, NVMe
- Capacity: 512GB
- Sequential Read: up to 3500 MB/s
- Sequential Write: up to 2200 MB/s
- NAND: 3D QLC`,
    price: 900000,
  },
  {
    id: 21,
    name: 'AMD Radeon RX 6600 XT',
    image: '/images/products/AMD Radeon1.png',
    images: ['/images/products/AMD Radeon1.png'],
    status: 'ready-stock',
    category: 'Komponen',
    subcategory: 'GPU',
    brand: 'AMD',
    stockStatus: 'Ready Stock',
    stock: 5,
    description: `8GB GDDR6, PCIe 4.0, HDMI/DP
- GPU: Navi 23
- Stream Processors: 2048
- Memory: 8GB GDDR6
- Memory Bus: 128-bit
- Outputs: 1x HDMI 2.1, 3x DisplayPort 1.4a
- Power: 1x 8-pin, 160W`,
    price: 5400000,
  },
  // Logitech - Tambahan
  {
    id: 22,
    name: 'Logitech G915 TKL Wireless',
    image: '/images/products/Logitech G9151.png',
    images: ['/images/products/Logitech G9151.png'],
    status: 'ready-stock',
    category: 'Aksesoris',
    subcategory: 'Keyboard',
    brand: 'Logitech',
    stockStatus: 'Ready Stock',
    stock: 7,
    description: `Wireless RGB Mechanical, Low Profile, LIGHTSPEED
- Switch: GL Tactile/Linear/Clicky
- Wireless: LIGHTSPEED & Bluetooth
- Battery: 40+ hours
- RGB: LIGHTSYNC per-key
- Layout: TKL (Tenkeyless)
- Material: Aluminum Top Case`,
    price: 2100000,
  },
  // Ajazz - Tambahan
  {
    id: 23,
    name: 'Ajazz K870T Wireless Keyboard',
    image: '/images/products/Ajazz K1.png',
    images: ['/images/products/Ajazz K1.png'],
    status: 'ready-stock',
    category: 'Aksesoris',
    subcategory: 'Keyboard',
    brand: 'Ajazz',
    stockStatus: 'Ready Stock',
    stock: 9,
    description: `Wireless/Bluetooth, 87 Keys, RGB, Hot Swappable
- Layout: TKL 87 Keys
- Connection: Bluetooth 5.0, 2.4GHz Wireless, USB-C
- Battery: 2000mAh
- Switch: Outemu Hot-Swap
- RGB: 18 Modes`,
    price: 650000,
  },
  // Fantech - Tambahan
  {
    id: 24,
    name: 'Fantech Helios XD3 Wireless Mouse',
    image: '/images/products/Fantech Helios1.png',
    images: ['/images/products/Fantech Helios1.png'],
    status: 'ready-stock',
    category: 'Aksesoris',
    subcategory: 'Mouse',
    brand: 'Fantech',
    stockStatus: 'Ready Stock',
    stock: 11,
    description: `Wireless Gaming Mouse, 16000 DPI, RGB
- Sensor: Pixart 3335
- DPI: up to 16000
- Connection: Wireless 2.4GHz & Wired
- Battery: 70 hours
- Weight: 83g
- RGB: 16.8M Colors`,
    price: 480000,
  },
  // ASUS - RAM
  {
    id: 25,
    name: 'ASUS ROG Strix DDR4 16GB (2x8GB) 3600MHz',
    image: '/images/products/ASUS ROG Strix1.png',
    images: ['/images/products/ASUS ROG Strix1.png'],
    status: 'ready-stock',
    category: 'Komponen',
    subcategory: 'RAM',
    brand: 'Asus',
    stockStatus: 'Ready Stock',
    stock: 10,
    description: `DDR4, 16GB (2x8GB), 3600MHz, CL16, RGB
- Tipe: DDR4
- Kapasitas: 16GB (2x8GB)
- Kecepatan: 3600MHz
- Latency: CL16
- RGB Aura Sync
- Kompatibel Intel/AMD`,
    price: 1200000,
  },
  // MSI - RAM
  {
    id: 26,
    name: 'MSI SPATIUM DDR4 32GB (2x16GB) 3200MHz',
    image: '/images/products/MSI Spatium1.png',
    images: ['/images/products/MSI Spatium1.png'],
    status: 'ready-stock',
    category: 'Komponen',
    subcategory: 'RAM',
    brand: 'MSI',
    stockStatus: 'Ready Stock',
    stock: 8,
    description: `DDR4, 32GB (2x16GB), 3200MHz, CL16
- Tipe: DDR4
- Kapasitas: 32GB (2x16GB)
- Kecepatan: 3200MHz
- Latency: CL16
- Heatsink Aluminum
- Kompatibel Intel/AMD`,
    price: 2100000,
  },
  // ASUS - Casing
  {
    id: 29,
    name: 'ASUS TUF Gaming GT501',
    image: '/images/products/asus-tuf-gt501.png',
    images: ['/images/products/asus-tuf-gt501.png'],
    status: 'ready-stock',
    category: 'Komponen',
    subcategory: 'Casing',
    brand: 'Asus',
    stockStatus: 'Ready Stock',
    stock: 5,
    description: `Mid Tower, Tempered Glass, Steel, 4x Fan Included
- Form Factor: Mid Tower ATX
- Material: Steel, Tempered Glass
- Fan: 3x 120mm RGB Front, 1x 140mm Rear
- Drive Bays: 4x 2.5", 3x 3.5"
- Front Panel: USB 3.1, USB 2.0, Audio
- GPU Clearance: up to 420mm
- Weight: 10.5kg`,
    price: 1850000,
  },
  // MSI - Casing
  {
    id: 30,
    name: 'MSI MPG GUNGNIR 110R',
    image: '/images/products/msi-gungnir-110r.png',
    images: ['/images/products/msi-gungnir-110r.png'],
    status: 'ready-stock',
    category: 'Komponen',
    subcategory: 'Casing',
    brand: 'MSI',
    stockStatus: 'Ready Stock',
    stock: 7,
    description: `Mid Tower, Tempered Glass, 4x ARGB Fan
- Form Factor: Mid Tower ATX
- Material: Steel, Tempered Glass
- Fan: 4x 120mm ARGB
- Drive Bays: 2x 2.5", 2x 3.5"
- Front Panel: USB 3.2, USB 2.0, Audio
- GPU Clearance: up to 340mm
- Weight: 8.4kg`,
    price: 1350000,
  },
  // Gigabyte - Casing
  {
    id: 31,
    name: 'Gigabyte C200 Glass',
    image: '/images/products/gigabyte-c200-glass.png',
    images: ['/images/products/gigabyte-c200-glass.png'],
    status: 'ready-stock',
    category: 'Komponen',
    subcategory: 'Casing',
    brand: 'Gigabyte',
    stockStatus: 'Ready Stock',
    stock: 6,
    description: `Mid Tower, Tempered Glass, RGB Strip
- Form Factor: Mid Tower ATX
- Material: Steel, Tempered Glass
- Fan: 2x 120mm (Front/Rear)
- Drive Bays: 2x 2.5", 2x 3.5"
- Front Panel: USB 3.0, USB 2.0, Audio
- GPU Clearance: up to 330mm
- Weight: 6.6kg`,
    price: 950000,
  },
  // Fantech - Casing
  {
    id: 32,
    name: 'Fantech CG80 RGB',
    image: '/images/products/fantech-cg80.png',
    images: ['/images/products/fantech-cg80.png'],
    status: 'ready-stock',
    category: 'Komponen',
    subcategory: 'Casing',
    brand: 'Fantech',
    stockStatus: 'Ready Stock',
    stock: 9,
    description: `Mid Tower, Tempered Glass, 3x RGB Fan
- Form Factor: Mid Tower ATX
- Material: Steel, Tempered Glass
- Fan: 3x 120mm RGB
- Drive Bays: 2x 2.5", 2x 3.5"
- Front Panel: USB 3.0, USB 2.0, Audio
- GPU Clearance: up to 320mm
- Weight: 7.2kg`,
    price: 780000,
  },
  // ASUS - Power Supply
  {
    id: 33,
    name: 'ASUS ROG Strix 750W Gold',
    image: '/images/products/asus-rog-psu.png',
    images: ['/images/products/asus-rog-psu.png'],
    status: 'ready-stock',
    category: 'Komponen',
    subcategory: 'Power Supply',
    brand: 'Asus',
    stockStatus: 'Ready Stock',
    stock: 7,
    description: `ATX, 80+ Gold, Fully Modular, 750W
- Form Factor: ATX
- Power: 750W
- Efficiency: 80+ Gold
- Modular: Fully Modular
- Fan: 135mm Axial-tech
- Proteksi: OPP, OVP, UVP, SCP, OCP, OTP
- Kabel: Sleeved`,
    price: 1850000,
  },
  // MSI - Power Supply
  {
    id: 34,
    name: 'MSI MPG A650GF 650W Gold',
    image: '/images/products/msi-mpg-psu.png',
    images: ['/images/products/msi-mpg-psu.png'],
    status: 'ready-stock',
    category: 'Komponen',
    subcategory: 'Power Supply',
    brand: 'MSI',
    stockStatus: 'Ready Stock',
    stock: 8,
    description: `ATX, 80+ Gold, Fully Modular, 650W
- Form Factor: ATX
- Power: 650W
- Efficiency: 80+ Gold
- Modular: Fully Modular
- Fan: 140mm
- Proteksi: OVP, OPP, SCP, OCP, OTP
- Kabel: Flat`,
    price: 1350000,
  },
  // ASUS - Cooler
  {
    id: 37,
    name: 'ASUS ROG Ryujin II 240 ARGB',
    image: '/images/products/asus-rog-ryujin-ii-240.png',
    images: ['/images/products/asus-rog-ryujin-ii-240.png'],
    status: 'ready-stock',
    category: 'Komponen',
    subcategory: 'Cooler',
    brand: 'Asus',
    stockStatus: 'Ready Stock',
    stock: 5,
    description: `AIO Liquid Cooler, 240mm Radiator, OLED Display, ARGB
- Tipe: Liquid Cooler
- Ukuran Radiator: 240mm
- Fan: 2x 120mm ARGB
- Display: 3.5" OLED
- Kompatibilitas: Intel & AMD
- Fitur: Noctua iPPC Fan, LiveDash OLED, ARGB Lighting`,
    price: 3200000,
  },
  // MSI - Cooler
  {
    id: 38,
    name: 'MSI MAG CoreLiquid 240R V2',
    image: '/images/products/msi-coreliquid-240r.png',
    images: ['/images/products/msi-coreliquid-240r.png'],
    status: 'ready-stock',
    category: 'Komponen',
    subcategory: 'Cooler',
    brand: 'MSI',
    stockStatus: 'Ready Stock',
    stock: 7,
    description: `AIO Liquid Cooler, 240mm Radiator, ARGB
- Tipe: Liquid Cooler
- Ukuran Radiator: 240mm
- Fan: 2x 120mm ARGB
- Kompatibilitas: Intel & AMD
- Fitur: Rotatable Blockhead, ARGB Lighting`,
    price: 1850000,
  },
  // Gigabyte - Cooler
  {
    id: 39,
    name: 'Gigabyte AORUS Waterforce X 240',
    image: '/images/products/gigabyte-waterforce-x240.png',
    images: ['/images/products/gigabyte-waterforce-x240.png'],
    status: 'ready-stock',
    category: 'Komponen',
    subcategory: 'Cooler',
    brand: 'Gigabyte',
    stockStatus: 'Ready Stock',
    stock: 6,
    description: `AIO Liquid Cooler, 240mm Radiator, LCD Display, ARGB
- Tipe: Liquid Cooler
- Ukuran Radiator: 240mm
- Fan: 2x 120mm ARGB
- Display: LCD
- Kompatibilitas: Intel & AMD
- Fitur: RGB Fusion 2.0, Customizable LCD`,
    price: 2950000,
  },
  // AMD - Cooler
  {
    id: 40,
    name: 'AMD Wraith Prism RGB',
    image: '/images/products/amd-wraith-prism.png',
    images: ['/images/products/amd-wraith-prism.png'],
    status: 'ready-stock',
    category: 'Komponen',
    subcategory: 'Cooler',
    brand: 'AMD',
    stockStatus: 'Ready Stock',
    stock: 10,
    description: `CPU Air Cooler, RGB, 92mm Fan
- Tipe: Air Cooler
- Fan: 92mm RGB
- Kompatibilitas: Socket AM4
- Fitur: RGB Lighting, Direct Contact Heatpipes`,
    price: 450000,
  },
  // Intel - Cooler
  {
    id: 41,
    name: 'Intel Laminar RM1',
    image: '/images/products/intel-laminar-rm1.png',
    images: ['/images/products/intel-laminar-rm1.png'],
    status: 'ready-stock',
    category: 'Komponen',
    subcategory: 'Cooler',
    brand: 'Intel',
    stockStatus: 'Ready Stock',
    stock: 8,
    description: `CPU Air Cooler, Blue LED, 90mm Fan
- Tipe: Air Cooler
- Fan: 90mm Blue LED
- Kompatibilitas: LGA1700
- Fitur: Quiet Operation, Push-Pin Mount`,
    price: 350000,
  },
  // Fantech - Cooler
  {
    id: 42,
    name: 'Fantech AirCooler AC300',
    image: '/images/products/fantech-ac300.png',
    images: ['/images/products/fantech-ac300.png'],
    status: 'ready-stock',
    category: 'Komponen',
    subcategory: 'Cooler',
    brand: 'Fantech',
    stockStatus: 'Ready Stock',
    stock: 12,
    description: `CPU Air Cooler, 120mm RGB Fan
- Tipe: Air Cooler
- Fan: 120mm RGB
- Kompatibilitas: Intel & AMD
- Fitur: RGB Lighting, Easy Mount`,
    price: 250000,
  },
  // PC Bundling
  {
    id: 1001,
    name: 'PC Gaming Ryzen 5 RTX 3060',
    image: '/images/products/pc-gaming.png',
    images: ['/images/products/pc-gaming.png'],
    status: 'ready-stock',
    category: 'PC Bundling',
    subcategory: 'PC Gaming',
    brand: 'Custom',
    stockStatus: 'Ready Stock',
    stock: 3,
    description: `Spesifikasi:
- Processor: AMD Ryzen 5 5600X
- Motherboard: B550M
- RAM: 16GB DDR4 3200MHz
- VGA: NVIDIA RTX 3060 12GB
- SSD: 512GB NVMe
- PSU: 650W 80+ Bronze
- Casing: RGB Gaming
- OS: Windows 11 Trial`,
    price: 13500000,
  },
  {
    id: 1002,
    name: 'PC Kerja Intel i5',
    image: '/images/products/pc-kerja.png',
    images: ['/images/products/pc-kerja.png'],
    status: 'ready-stock',
    category: 'PC Bundling',
    subcategory: 'PC Kerja',
    brand: 'Custom',
    stockStatus: 'Ready Stock',
    stock: 5,
    description: `Spesifikasi:
- Processor: Intel Core i5-12400
- Motherboard: B660M
- RAM: 8GB DDR4 3200MHz
- SSD: 256GB NVMe
- PSU: 500W
- Casing: Mini Tower
- OS: Windows 11 Trial`,
    price: 6500000,
  },
  {
    id: 1003,
    name: 'PC Editing Ryzen 7',
    image: '/images/products/pc-editing.png',
    images: ['/images/products/pc-editing.png'],
    status: 'ready-stock',
    category: 'PC Bundling',
    subcategory: 'PC Editing',
    brand: 'Custom',
    stockStatus: 'Ready Stock',
    stock: 2,
    description: `Spesifikasi:
- Processor: AMD Ryzen 7 5800X
- Motherboard: B550M
- RAM: 32GB DDR4 3600MHz
- VGA: NVIDIA RTX 3060 Ti 8GB
- SSD: 1TB NVMe
- PSU: 750W 80+ Gold
- Casing: Editing Case
- OS: Windows 11 Trial`,
    price: 18500000,
  },
];
