# Batik Guard 8-in-1 — BARU BENAR — 20x100 = 2000m2
# JANGAN EDIT ANGKA DI BAWAH INI SEMBARANGAN — INI PATOKAN FINAL
# Kalau mau ganti ukuran, ganti HANYA di DIMENSI_KUNCI ini, semua halaman ikut berubah

import streamlit as st

st.set_page_config(page_title="Batik Guard 8-in-1 — 20x100 = 2000m2", layout="wide")

# ===== PATOKAN FINAL — JANGAN DIGANTI LAGI KECUALI PERINTAH BARU =====
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
    "Tabung Ke-1 Jettel": "Tabung Kettel Uap Tekanan Tinggi — masukan pipa air panas perapian PALING ATAS / PALING TINGGI",
    "Tabung Ke-2 Pendukung": "250 Liter — lubang keluar air residu PALING BAWAH, 80 cm s/d 120 cm LEBIH RENDAH dari masukan Tabung Ke-1",
    "Turbine + Generator": "Turbine Turbo + Generator — Turbine bermagnetic / Turbo, Faraday E=-N dPhi/dt, 1000W each total 2000-4000W",
    "Skala": "1:200 — 1cm gambar = 2M asli",
}

st.sidebar.title("Batik Guard 8-in-1")
st.sidebar.caption("20M x 100M = 2000m2 Autonomous")
st.sidebar.markdown("**ESP32-S3 Mesh**")
st.sidebar.success("192.168.4.1 Laptop ✅")
st.sidebar.success("192.168.4.22 HP ✅")
st.sidebar.markdown("**Energy**")
st.sidebar.metric("Tabung A Cold", "58%", "320 L/min")
st.sidebar.metric("Tabung B Steam", "58%", "2.5 bar")
st.sidebar.metric("Generator", "1000W x 4", "2000-4000W total")
st.sidebar.markdown("**14 CCTV**")
st.sidebar.caption("Cetak 4 | Jemuran 4 | Halaman Depan 2 | Naphthol 2 | Generator+Water Glass 2")

st.title("IR SUPER BATIK GUARD 8-in-1 - Control Office 4x6M")
st.caption("One Platform for Smarter Batik Buildings | Tuya-style but for Batik | ESP32-S3 Mesh + Model API")

tab1, tab2, tab3, tab4, tab5 = st.tabs(["Floor Plan 1:200", "Chemical 25 Kodi", "Kuali & No Motor Water", "Sensor Live", "Model API"])

with tab1:
    st.header("FLOOR PLAN 1:200 - 20M x 100M = 2000M2 - Ruler Every Side")
    st.success("DENAH 2D + 3D DESIGN GRAFIS ARCHITECTURE + RAB TEKNIK SIPIL - FINAL SYSTEM")
    st.subheader("DENAH FLOOR PLAN 2D - 20M x 100M = 2000M2 - Scale 1:200")
    st.info("""
    **KOREKSI FINAL — JANGAN PAKAI ANGKA LAMA LAGI:**
    - Lahan lama 20x110 = 2200m2 ❌ — yang benar **20x100 = 2000m2** ✅
    - Gate lama 7+6+7 ❌ — yang benar **Gate 6M 6+8+6** ✅
    - Gudang Besar lama 22M ❌ — yang benar **6x10M = 60m2** ✅
    - Jemuran lama 50M ❌ — yang benar **Jemuran Pelangian 14x20M = 280m2** ✅
    - Kuali lama C110 3mm ❌ — yang benar **C110 1,2mm + induction 65-115W** ✅
    """)
    st.markdown("### Dimensi Kunci")
    st.json(DIMENSI_KUNCI)
    st.markdown("""
    **Gate 6M 6+8+6** — Pintu Depan Besar Utama • Access Pick Up Kayu Bakar
    **GSB 10M + Taman Depan 10M** — filter debu + aesthetic + buffer anti maling + CCTV Halaman Depan 2 Security 24H
    **Gudang Besar 6x10M = 60m2** — muat 10 Kuali Cetak Ø45cm + Kuali Pematangan 90x70 346L -> 173L
    **Jemuran Pelangian 14x20M = 280m2** — Jemuran Pelangi, CCTV Jemuran 4, SHT41, MLX90640
    **Kantor 4x6M = 24m2** — server ESP32-S3 mesh 192.168.4.1 laptop & 192.168.4.22 HP — Control Office 4x6M Isometric Cutaway
    **Kantor + Kamar + Gudang Serba Guna + Koridor + Garasi** — lihat Kitab Komplit HTML untuk tabel lengkap 20x100
    """)

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
    st.header("Kuali & No Motor Water System")
    st.markdown("""
    **Kuali Cetak: 10x Ø45cm Tembaga C110 1,2mm + induction 65-115W** — 60-120C adjustable, 20k flip/sec eddy current
    **Kuali Pematangan: 90x70cm — 346L -> 173L** — 8 jam api besar susut 50%, water 40% -> 0% like foam rubber
    """)
    st.subheader("Tabung Jettel — PIPA PALING PENTING")
    st.error("**Tabung Ke-1 Jettel Tekanan Tinggi:** Masukan pipa air panas dari perapian di PALING ATAS / PALING TINGGI — mengisi Tabung Ke-1")
    st.error("**Tabung Ke-2 Kettel Pendukung 250 Liter:** Lubang keluar air residu di PALING BAWAH tabung — 80 cm s/d 120 cm LEBIH RENDAH dari masukan Tabung Ke-1")
    st.info("Alur: Perapian → Pipa Air Panas (ATAS) → Tabung Ke-1 → Tabung Ke-2 (250L) → Lubang PALING BAWAH (80-120cm lebih rendah) → Pipa Residu → Instalasi Pengapian Tungku Raksasa + kembali ke Kuali Masak. Thermosiphon: hot rises, cold falls, tanpa pompa.")
    st.markdown("""
    **2 Tabung Vakum No Motor:**
    - Tabung A Air Dingin Bersih 500L SS304 vacuum insulated — 62% • 22°C
    - Tabung B Kettle Uap 500L 2 Ruang Partition Pluit 2.5 bar 90kg/jam — 88% • 92°C • 2.5 bar
    - Thermosiphon hot rises cold falls • No pump • Relay COM-NO • 135W steam pump like
    """)

with tab4:
    st.header("Sensor Live — SUPER USEFUL BATIK GUARD")
    c1, c2, c3, c4 = st.columns(4)
    c1.metric("SHT41 Suhu", "28.4°C", "Normal")
    c2.metric("NDIR CO2", "412 ppm", "4-ch safe")
    c3.metric("MQ-135 NOx", "12.0 ppm", "Normal")
    c4.metric("HX711 5kg", "2.45 kg", "0.1gr precision")
    st.caption("ESP32-S3 + SHT41 + HX711 + IMX219 • 18650 Double • IP65 M12 gland • 8 items: ESP32-S3, IMX219 8MP 5500K, HX711 5kg 0.1gr, HX711 50kg, SHT41, MLX90640 32x24, NDIR CO2 4-ch, MQ-135 NOx >50ppm alarm")

with tab5:
    st.header("Model API — Untuk Juri")
    st.code(We use Model API to analyze batik color Delta E from IMX219 5500K + TCS34725 sticks, predict pematangan 346L->173L foam rubber phase via MLX90640 + SHT41, optimize 2.5 bar steam + 1000W generator scheduling, and auto-generate IPAL compliance logs. Fully local ESP32-S3 mesh, no LiFePO4, safe for batik artisan., language="text")
    st.markdown("**RAB Teknik Sipil — Quick View** — Lihat Kitab Komplit HTML untuk RAB lengkap Rp 534.800.000 estimasi")

st.divider()
st.caption("Kitab Komplit Batik Clearance • Awal Sampai Hari Ini • 20x100 = 2000m2 • 1:200 • 192.168.4.1 / 192.168.4.22 • ESP32-S3 Mesh")
