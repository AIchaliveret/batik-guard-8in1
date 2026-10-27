# IR SUPER USEFUL BATIK GUARD 8-in-1
### Meta Global AI Developer Hackathon - Cerebral Valley
**Team ID:** 1409646471324297 (Solo) - Tuan Cin Personal Account
**Project:** Autonomous Batik Factory 20x110M = 2200m²

### Problem
Batik clearance 25 kodi / 500 lembar manual, gradasi kuning Indanthrene + Water Glass tidak beraturan (Bug No 2), stok kimia Gudang Kecil hilang, Kuali Pematangan 90x70 346L->173L 8 jam tidak terkontrol, IPAL 3-stage + Cerobong 12M asap hitam, tanpa log jam kerja 14 CCTV.

### Solution - Agentic 8-in-1 Guard
ESP32-S3 mesh 5 nodes (192.168.4.1 laptop & 192.168.4.22 HP meta.aichaliveret)

- **Tongkat Plakin TCS34725 Bug No 2**: Celup 10 detik 120 observasi kuning, Delta E CIE76 >10% alarm merah HP + trigger IPAL
- **IMX219 8MP 5500K Colorimeter**: Gudang Kecil Kimia - Reaktif, Naphthol A (soda api dimasak api), Naphthol B (nitrit+air keras HCl/H2SO4), HX711 50kg dacin + HX711 5kg 0.1gr
- **MLX90640 32x24 Thermal + SHT41 + NDIR CO2 4-ch + MQ-135 NOx**: Mapping for 2 Tabung Vakum Tanpa Motor Air 135W (Tabung A 500L dingin bersih + Tabung B Kettle Uap 500L 2 Ruang Pluit 2.5 bar 90kg/jam Thermosiphon)
- **Generator 2-4x1000W=2000-4000W**: Turbine Francis magnet+coil Faraday E=-N dΦ/dt Lenz + Thermal Battery 500L 07:00-17:00 + lembur ATS PLN no LiFePO4, ESC 6 MOSFET 3 fasa rectifier MORE THRUST=MORE POWER
- **14 CCTV**: Cetak 4 Jemuran 4 Halaman Depan 2 Security 24H Naphthol 2 Generator+Water Glass 2 - PIR cold only Face Detection hot only log jam kerja
- **Switch Board 4 LED**: Biru Hijau Kuning Merah

### Tech Stack - Meta Products
- **Muse Spark Open (meta-models/muse-spark-open-1026)**: Downloaded, deployed on Modal Endpoints + Baseten $100 + Fireworks Glimmer 30B free SFT - Agentic brain for colorimetry & thermal control
- **Muse Wonder (Context 1M)**: Frontier agent planning long-running tasks, delegates sub-agents, recovers from errors - dev.meta.ai platform team 1409646471324297
- **Muse Wonder Full**: Via Muse Code subscription for SOTA workflows
- **SAM 3.1**: Detect/segment/track stock kimia from text prompt "kuning Indanthrene irregular" across IMX219 video
- **Meta AI App**: Integration 192.168.4.22 meta.aichaliveret

### Deployment - 3 Jalur
**Jalur A - Modal ($1.00 credits):**
```bash
pip install modal
python3 -m modal setup
modal deploy app.py
# URL: https://1409646471324297--batik-guard-muse-spark-open-1026-analyze-batik.modal.run
```

**Jalur B - Baseten ($0.00):**
Overview | Baseten -> Deploy new -> meta-models/muse-spark-open-1026 -> Deploy

**Jalur C - Fireworks ($0.00 + Glimmer 30B gratis tanpa kartu):**
Home - Fireworks AI -> Deploy a model ondemand -> muse-glimmer-30b -> Deploy

### Floor Plan 1:200
Lahan 20x110M=2200m² | Gate 6M tengah (7+6+7) | GSB 10M | Taman 10M | Gudang Besar 22M | Gudang Kecil Kimia | Kantor 4x6M | Lapang Jemuran Pelangi 50M | Access Pick Up Kayu Bakar Pintu Depan Besar Utama

### Kimia 25 Kodi + Lilin
Naphthol AS, AS-BO, AS-BS, AS-G, AS-OL, AS-D, AS-RL, AS-BG, AS-TR + Fast salts = Merah Menyala, Maroon Sogan, Biru Navy, Kuning Emas 120, Hitam, Hijau Botol, Ungu - 6kg Naphthol 6L NaOH 3kg NaNO2 8L HCl 10kg Garam Diazo, Reactive, Water Glass, Soda Ash 30-50gr/L, Lilin reform 40% Parafin 35% Micro 15% Siongkha 10% Beeswax 65-68C anti matahari 11-14 <0.5% air

### Instalasi & IPAL
5 Layer: Merah listrik AC/DC kompor kecil only, Orange SS304 800C+Galvalum 315C, Biru air bersih, Abu IPPAL Ø110 PVC no bends, Abu Putus drainase, Ungu Putus IoT WiFi
IPAL 10x8x3M multi-layer + Cerobong 12M Cyclone+Scrubber+Secondary+Spark hitam->putih tipis

### RAB
Total Rp 1.478.500.000 - Lahan & Sipil, Kuali & Induksi, Guard 8-in-1 5 nodes, Generator & Thermal Battery, IPAL & Cerobong, CCTV 14ch, Kimia 25 kodi, Lilin reform

### Kitab Komplit
File `Kitab-Komplit-Batik-Clearance-Awal-Sampai-Hari-Ini.html` - 11 tabs komplit dari awal sampai hari ini, include floor plan ruler, sensor, kimia, pematangan, energy, instalasi, CCTV, RAB, app WiFi + Meta API, checklist upload

### Submission - Cerebral Valley
- Build: 26 Oct - 2 Nov
- Submit Project (bukan Untitled Event): Repo PUBLIC + Video demo 3 menit pabrik 20x110M + IMX219 jalan + deskripsi
- Tracks: Indie developer track + Build for Your World (agentic use-case) - Best Agentic $5K + Best Build on Meta Open Weight $10K + Best Meta AI Integration $5K

### Demo API
POST https://<modal-url>/analyze_batik
Body: {"rgb": [200,180,50], "rgb_ref": [210,190,60], "sht41": {"temp": 32.5, "hum": 65}, "mlx90640_max": 115, "hx711_5kg": 2.45, "hx711_50kg": 23.5, "co2": 800, "nox": 120}

Returns: {"delta_e": 8.2, "status": "SIAGA", "instruksi_led": "Kuning", "thermosiphon_status": "UAP PERTAMA TEKAN TABUNG A", ...}

### Team
Solo builder - Even Garden (honestcin@gmail.com) + Cerebral Valley (jugalachaliveret@gmail.com) - 2 Chrome Profile solution for 2FA g.co/sc

### License
MIT - Open for batik artisans
