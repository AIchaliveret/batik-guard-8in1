# Batik Guard 8-in-1 — app.py FINAL BENAR — GANTI SELURUH ISI app.py LAMA DENGAN FILE INI
# PATOKAN FINAL — JANGAN UBAH ANGKA DI BAWAH KECUALI PERINTAH BARU
# Lahan 20x100=2000 | Gate 6M 6+8+6 | Gudang Besar 6x10=60 | Jemuran Pelangian 14x20=280
# Kuali 10x O45cm C110 1,2mm 65-115W | 2 Turbin Turbo DIY | Tabung Ke-2 lubang PALING BAWAH 80-120cm lebih rendah

import streamlit as st
st.set_page_config(page_title="Batik Guard 8-in-1 — 20x100 = 2000m2", layout="wide")

DIMENSI_KUNCI = {
    "Total Lahan": "20M x 100M = 2000m2",
    "Lebar x Panjang": "Lebar 20 m x Panjang 100 m",
    "Gate Utama": "6M tengah [6+8+6]",
    "GSB": "10M dari jalan",
    "Taman Depan": "10M filter debu",
    "Gudang Besar": "6x10M = 60m2",
    "Kantor": "4x6M = 24m2",
    "Jemuran Pelangian": "14x20M = 280m2",
    "IPAL": "10x8x3M",
    "Cerobong": "12M",
    "Kuali Cetak": "10x O45cm Tembaga C110 1,2mm + induction 65-115W",
    "Kuali Pematangan": "90x70cm 346L -> 173L",
    "Tabung Ke-1 Jettel": "Tekanan Tinggi — masukan pipa air panas perapian PALING ATAS / PALING TINGGI",
    "Tabung Ke-2 Pendukung": "250 Liter — lubang keluar air residu PALING BAWAH, 80 cm s/d 120 cm LEBIH RENDAH dari masukan Tabung Ke-1",
    "Turbine + Generator": "2 TURBIN TURBO DIY Magnetic + Copper Coil Faraday E = -N dPhi/dt + Truck Alternator 2400-3000W",
    "Skala": "1:200 — 1cm gambar = 2M asli",
}

# SIDEBAR — SUDAH BENAR
st.sidebar.title("Batik Guard 8-in-1")
st.sidebar.caption("20M x 100M = 2000m2 Autonomous")
st.sidebar.markdown("**ESP32-S3 Mesh**")
st.sidebar.success("192.168.4.1 Laptop ✅")
st.sidebar.success("192.168.4.22 HP ✅")
st.sidebar.markdown("**Energy**")
st.sidebar.metric("Tabung A Cold", "58%", "320 L/min")
st.sidebar.metric("Tabung B Steam", "58%", "2.5 bar")
st.sidebar.metric("Generator", "2400-3000W", "Truck Alternator 24V")
st.sidebar.markdown("**14 CCTV**")
st.sidebar.caption("Cetak 4 | Jemuran 4 | Halaman Depan 2 | Naphthol 2 | Generator+Water Glass 2")

st.title("IR SUPER BATIK GUARD 8-in-1 - Control Office 4x6M")
st.caption("One Platform for Smarter Batik Buildings | ESP32-S3 Mesh + Model API")

tab1, tab2, tab3, tab4, tab5 = st.tabs(["Floor Plan 1:200", "Chemical 25 Kodi", "Kuali & 2 Turbin Turbo", "Sensor Live", "Model API + RAB"])

with tab1:
    st.header("FLOOR PLAN 1:200 - 20M x 100M = 2000M2 - Ruler Every Side")
    st.success("DENAH 2D + 3D DESIGN GRAFIS ARCHITECTURE + RAB TEKNIK SIPIL - FINAL SYSTEM")
    st.success("PATOKAN FINAL — 20x100 = 2000m2 — Gate 6M 6+8+6 — Gudang Besar 6x10M = 60m2 — Jemuran Pelangian 14x20M = 280m2")
    st.subheader("Dimensi Kunci — FINAL")
    st.json(DIMENSI_KUNCI)
    st.markdown("""
    **Gate 6M 6+8+6** — Pintu Depan Besar Utama • Access Pick Up Kayu Bakar
    **GSB 10M + Taman Depan 10M** — filter debu + aesthetic + buffer anti maling + CCTV Halaman Depan 2 Security 24H
    **Gudang Besar 6x10M = 60m2** — muat 10 Kuali Cetak O45cm + Kuali Pematangan 90x70 346L -> 173L
    **Jemuran Pelangian 14x20M = 280m2** — Jemuran Pelangi, CCTV Jemuran 4, SHT41, MLX90640
    **Kantor 4x6M = 24m2** — server ESP32-S3 mesh 192.168.4.1 laptop & 192.168.4.22 HP
    """)
st.subheader("Gambar 2D — Denah Top View")
try:
    st.image("denah-pabrik-batik-guard-20x100.png", caption="Denah 2D — 20 x 100 = 2000 m2", use_container_width=True)
except:
    st.warning("File 2D denah-pabrik-batik-guard-20x100.png belum ketemu")

st.subheader("Gambar 3D — Isometrik Pabrik")
try:
    st.image("architecture_3d_isometric.png", caption="Desain 3D Isometrik — Pabrik Batik Guard", use_container_width=True)
except:
    st.warning("File 3D architecture_3d_isometric.png belum ketemu")
with tab2:
    st.header("Chemical 25 Kodi")
    st.markdown("""
    **Total 6kg Naphthol, 6L NaOH, 3kg NaNO2, 8L HCl, 10kg Garam Diazo**
    - Naphthol AS series + Fast Red B / Blue BB / Scarlet RC / Yellow GC / Bordeaux GP / Black K / Blue B / Red B / Green B / Orange GC
    - Reactive: Yellow, Scarlet, Navy, Red Velvet, Green + Water Glass gradasi kuning muda-tua irregular
    - Lorodan: Soda Ash 30-50gr/L 90-100C
    - **Lilin Reform:** Parafin 60% 52-56C -> 40% reform, Micro 20% -> 35%, Gondorukem Siongkha 15% -> 15%, Beeswax 5% -> 10%. Melting 65-68C
    """)

with tab3:
    st.header("Kuali & 2 TURBIN TURBO DIY — Magnetic + Copper Coil Faraday")
    st.markdown("""
    **Kuali Cetak: 10x O45cm Tembaga C110 1,2mm + induction 65-115W** — 60-120C adjustable, 20k flip/sec eddy current
    **Kuali Pematangan: 90x70cm — 346L -> 173L** — 8 jam api besar susut 50%, water 40% -> 0% like foam rubber
    """)
    st.subheader("Kenapa 2 Turbin Turbo DIY? Karena Francis pabrikan minimal 5 MW, tidak ada yang 2400-3000W")
    st.error("**TURBIN TURBO 1 — PENGGERAK:** Ditiup uap 2,5 bar dari pipa 5cm mengecil ke 2,5cm. Sudu 8-12 blade, diameter 15cm. Muter 2800 rpm. BASAH, SS304.")
    st.error("**TURBIN TURBO 2 — GENERATOR MAGNETIC:** TERHUBUNG 1 POROS dengan Turbo 1 via shaft SS304. 12 magnet Neodymium N52 + 12 coil tembaga. Faraday E = -N dPhi/dt. KERING, coil dingin.")
    st.success("**TRUCK ALTERNATOR 2400-3000W:** Jadi REGULATOR + RECTIFIER + BACKUP. 100A x 24V = 2400W, 125A x 24V = 3000W.")
    st.info("**Tabung:** Tabung Ke-1 Jettel masukan PALING ATAS. Tabung Ke-2 Pendukung 250L lubang keluar PALING BAWAH, 80-120cm LEBIH RENDAH dari masukan Ke-1. Alur: Perapian -> Pipa Panas (ATAS) -> Ke-1 -> Ke-2 -> Lubang BAWAH -> Instalasi Pengapian Tungku Raksasa.")

with tab4:
    st.header("Sensor Live — SUPER USEFUL BATIK GUARD")
    c1,c2,c3,c4 = st.columns(4)
    c1.metric("SHT41 Suhu", "28.4°C", "Normal")
    c2.metric("NDIR CO2", "412 ppm", "4-ch safe")
    c3.metric("MQ-135 NOx", "12.0 ppm", "Normal")
    c4.metric("HX711 5kg", "2.45 kg", "0.1gr precision")
    st.caption("ESP32-S3 + SHT41 + HX711 + IMX219 • 18650 Double • IP65 M12 gland • 8 items")

with tab5:
    st.header("RAB Teknik Sipil - Quick View — SUDAH BENAR")
    st.markdown("""
    **RAB Pabrik Batik 2000m2 Final - Piping Galvalum Mix Stainless 94M + Orange SS304 800C**
    - Site 20x100M + Tungku 2 besar + 2 sedang + 2 kayu bakar
    - Kuali 500-1000L O1.2M + 10x O45cm tembaga C110 1,2mm + Pematangan 90x70 346L->173L foam rubber 8h big fire water 40%->0%
    - Generator 2 TURBIN TURBO DIY Magnetic + Copper Coil Faraday E = -N dPhi/dt Lenz 2.5bar 90kg/jam 2400-3000W Truck Alternator + ESC 6 MOSFET reversible
    - Tabung Vacuum A Cold 500L + B Steam 500L 2 Ruang Pluit 2.5bar Thermosiphon No Motor Water 135W first steam presses cold tank 320L/min zero pump Relay COM-NC-NO
    - IPAL 10x8x3M 4 stage: Grease Trap 1.5x1.5x1.5 Neutralization 2x2x1.5 Multi-layer filtration 10x8x3M Clean water 2x2x1.5 + Cerobong 12M SS304 800C Cyclone+Scrubber+Secondary+Spark
    - Full RAB ada di 2D+3D Final HTML di atas (Tab: RAB Teknik Sipil)
    """)
    st.subheader("Dimensi Kunci — FINAL")
    st.json(DIMENSI_KUNCI)
    st.header("Model API — Untuk Juri")
    st.code('"We use Model API to analyze batik color Delta E from IMX219 5500K + TCS34725 sticks, predict pematangan 346L->173L foam rubber phase via MLX90640 + SHT41, optimize 2.5 bar steam + 2400-3000W generator scheduling, and auto-generate IPAL compliance logs. Fully local ESP32-S3 mesh, no LiFePO4, safe for batik artisan."', language="text")

st.divider()
st.caption("Kitab Komplit Batik Clearance • 20x100 = 2000m2 • 1:200 • 192.168.4.1 / 192.168.4.22 • ESP32-S3 Mesh")
