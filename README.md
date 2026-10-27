# IR BATIK GUARD 8-in-1 - Prototype Robotics Pabrik Batik 20x110M = 2200M²

**Team 1409646471324297 AIchaliveret - Cerebral Valley Competition**

## Prototype Robotics Seluruh Pabrik Batik - Controllable HP & Laptop WiFi+Internet

Pabrik batik 20M x 110M = 2200M² sudah seperti robotik full otomatis, semua terinstall di HP & Laptop, bisa dikendalikan via koneksi internet WiFi.

### Semua Instalasi - Pipa Air Panas Galvalum + Stainless 2-3cm Diameter Campuran

- **Pipa Galvalum 2-3cm Ø (abu-abu)**: Besi campuran zinc-aluminium, harga murah, jalur dingin KOLAM → KUALI MASAK 90×70 346L → TABUNG CATTLER Bawah Tabung A 500L vacuum
- **Pipa Stainless SS304 2-3cm Ø (silver)**: Food grade tahan panas 800°C inside / 315°C outside Galvalum, tahan uap 2.5 bar 90kg/jam, jalur panas TABUNG CATTLER Atas Tabung B 500L kettle uap → GENERATOR Turbine Francis → Thermal Battery → RUANG CETAK 10 Kompor DC
- **Campuran**: Galvalum + Stainless 2-3cm lari ke tabung cattler lalu ke generator DC - hemat + tahan panas

### Alur: Besi → Cattler → Generator DC

KOLAM (8 unit) + KUALI MASAK 90×70 346L (Api besar 8 jam + Kayu Bakar Tungku Lilin 2 Units)
↓ Pipa Galvalum 2-3cm abu-abu jalur dingin
TABUNG CATTLER (KETTLE) 500L Bawah = Tabung A air dingin bersih SS304 vacuum insulated
↓ Thermosiphon hot rises cold falls NO MOTOR 135W steam pump like
TABUNG CATTLER Atas = Tabung B kettle uap 2 Ruang Partition Pluit 2.5 bar 90kg/jam
↓ Pipa Stainless 2-3cm silver jalur panas
GENERATOR Turbine Francis magnets+copper E=-N dΦ/dt Faraday Lenz ε=-dΦ/dt DC 12V/24V/48V
↓ Orange SS304 + Relay valve COM-NO ESP32-S3 SHT41 MLX90640
Thermal Battery 500L 07:00-17:00 + lembur 17:00-19:00 ATS PLN no LiFePO4 → RUANG CETAK 10 Kompor DC

### Instalasi Listrik DC - Belum AC

- Semua DC dari Generator 2000-4000W (2-4×1000W) → Thermal Battery 500L ATS PLN no LiFePO4 explosion
- 10 Kuali Cetak Ø45cm C110 3mm 65-115W induction 20k flip/sec eddy current @zackdfilms DC 48V
- Relay COM NC NO coil armature spring safety @techlabprojectsv5s
- Switch Board 4 LEDs @filmagicart blue green yellow red status kuali
- ESC 6 MOSFETs 3 phases A B C reverse as generator MORE SWITCHING=MORE THRUST
- Merah listrik AC/DC generator only for small stoves not 4 large kuali danger

### Site Plan - Ikutin Foto Tangan

SCALE 1:200, Gate 6M [7+6+7], GSB 10M, Taman 10M, Gudang Besar 22M, Gudang Kecil Kimia Reaktif, Kantor 4×6M, Lapang Jemuran Pelangi 50M, Kuali Cetak 10× Ø45cm C110 3mm, Kuali Pematangan 90×70 346L → 173L, Tabung A/B 500L, Turbine Francis, Thermal Battery, IPAL 3-stage, Cerobong 12M SS304, Instalasi 5 layer, CCTV 14, Jam kerja 07:00-19:00.

### Deploy - HP & Laptop Controllable WiFi+Internet

#### 1. GitHub + GitHub Pages (index.html)
- Upload index.html ke repo AIchaliveret/batik-guard-8in1
- Settings → Pages → main / root → Save
- Link: https://aichaliveret.github.io/batik-guard-8in1/

#### 2. Streamlit Cloud (HP & Laptop)
- streamlit-app.py
- Connect GitHub repo → Deploy
- Bisa dibuka di HP & Laptop via internet

#### 3. Modal - Model API (Backend)
- app.py
- modal deploy app.py
- Endpoint FastAPI /sensors /pipa /control/{device}/{action}

#### 4. Meta AI Model API
- Akun Even Garden vs Cerebral Valley pisah
- 2 Chrome Profiles solusi login GitHub vs FB
- Billing $150 credit claims form
- Deadline Wed Nov 4 2026 9PM ET = Thu Nov 5 09:00 WIB

### Controllable via WiFi + Internet

ESP32-S3 mesh WiFi SSID meta.aichaliveret
- Laptop: 192.168.4.1
- HP: 192.168.4.22
- 5 nodes Kantor + Halaman Jemuran + Ruang Cetak
- Dashboard sensor 8 items + CCTV 14 feed + jam kerja efisien anti maling security 24H

### Files

- index.html / index_fixed_final.html / index_semua_instalasi_galvalum_stainless_dc.html = Floor plan interaktif drag + semua instalasi pipa galvalum+stainless 2-3cm + listrik DC + IPPAL + WiFi
- app.py = FastAPI + Modal Model API backend - controllable HP & Laptop
- streamlit-app.py = Dashboard Streamlit - HP & Laptop via internet
- requirements.txt
- README.md

### Links Previous Artifacts

- kitab-batik-floor-1-200.html, batik-guard-tongkat-tcs34725.html, batik-kimia-25-kodi-lilin.html, kuali-pematangan-90x70-346L.html, no-motor-water-system-2-tabung.html, generator-francis-faraday-lenz.html, ipal-3-stage-cerobong-12M.html, cctv-14-jam-kerja.html, rab-cv-fajar-setia.html, app-wifi-robotik-meta-aichaliveret.html, kitab-komplit-batik-clearance-awal-sampai-hari-ini.html
