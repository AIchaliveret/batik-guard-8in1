"""
Streamlit App - IR SUPER BATIK GUARD 8-in-1 Dashboard
One Platform for Smarter Batik Buildings (ala Tuya B2B)
Repo: Alchaliveret/batik-guard-8in1
Live: https://alchaliveret.github.io/batik-guard-8in1/
"""

import streamlit as st
import json
from datetime import datetime

st.set_page_config(
    page_title="IR SUPER BATIK GUARD 8-in-1 - 20x110M",
    page_icon="🏭",
    layout="wide",
    initial_sidebar_state="expanded"
)

# Sidebar - Like Tuya B2B Platform
st.sidebar.title("🏭 Batik Guard 8-in-1")
st.sidebar.markdown("**20M x 110M = 2200m² Autonomous**")
st.sidebar.markdown("---")
st.sidebar.markdown("### 📡 ESP32-S3 Mesh")
st.sidebar.success("192.168.4.1 Laptop ✅")
st.sidebar.success("192.168.4.22 HP meta.aichaliveret ✅")
st.sidebar.markdown("### 🔋 Energy")
st.sidebar.metric("Tabung A Cold", "58%", "320 L/min")
st.sidebar.metric("Tabung B Steam", "58%", "2.5 bar")
st.sidebar.metric("Generator", "1000W x 4", "2000-4000W total")
st.sidebar.markdown("### 📹 14 CCTV")
st.sidebar.info("Cetak 4 | Jemuran 4 | Halaman 2 | Naphthol 2 | Generator 2")

# Main
st.title("IR SUPER BATIK GUARD 8-in-1 - Control Office 4x6M")
st.markdown("**One Platform for Smarter Batik Buildings | Tuya-style but for Batik | Muse Spark Multimodal: IMAGES + VIDEO + TEXT + DOCS**")

# Tabs like in index.html
tab1, tab2, tab3, tab4, tab5 = st.tabs(["📐 Floor Plan 1:200", "🎨 Chemical 25 Kodi", "🔥 Kuali & No Motor Water", "📊 Sensor Live", "🤖 Model API"])

with tab1:
    st.subheader("FLOOR PLAN 1:200 - 20M x 110M = 2200M² - Ruler Every Side")
    col1, col2 = st.columns([3,1])
    with col1:
        st.markdown("""
        **Gate 6M [7+6+7]**: 7M pagar + 6M gerbang + 7M pagar, simetris
        **GSB 10M**: dari jalan, **Taman Depan 10M**: filter debu + aesthetic + buffer anti maling + CCTV Halaman Depan 2 Security 24H
        **Gudang Besar 22M**: muat 10 kuali cetak Ø45cm + kuali pematangan 90x70
        **Gudang Kecil Kimia**: Reaktif, Naphthol A soda api dimasak, Naphthol B nitrit+air keras, Indanthrene + Water Glass gradasi kuning irregular
        **Kantor 4x6M = 24m²**: server ESP32-S3 mesh
        **Lapang Jemuran Pelangi 50M**: warna pelangi + CCTV Jemuran 4 + SHT41 + MLX90640
        **IPAL 10x8x3M**: filtrasi multi-layer + Clean water 2x2x1.5
        **Cerobong 12M**: SS304 800C inside Galvalum 315C outside Cyclone + Scrubber + Secondary + Spark black->white thin
        **Access Pick Up Carry Kayu Bakar**: via Pintu Depan Besar Utama - No side door
        **Skala 1:200**: 1cm drawing = 2M real - PDF ready for jury
        """)
        st.image("https://via.placeholder.com/800x400?text=Floor+Plan+1:200+20x110M+Gate+6M+GSB+10M", use_column_width=True)
    with col2:
        st.markdown("### Dimensi Kunci")
        st.json({
            "Total Lahan": "20M x 110M = 2200m²",
            "Gate Utama": "6M tengah [7+6+7]",
            "GSB": "10M dari jalan",
            "Taman Depan": "10M filter debu",
            "Gudang Besar": "22M",
            "Kantor": "4x6M = 24m²",
            "Jemuran": "50M pelangi",
            "IPAL": "10x8x3M",
            "Cerobong": "12M"
        })

with tab2:
    st.subheader("Formula 25 Kodi = 500 Lembar x 200cm Paparan 40-60%")
    st.markdown("""
    **Naphthol AS variants**: AS, AS-BO, AS-BS, AS-G, AS-OL, AS-D, AS-RL, AS-BG, AS-TR + Fast salts
    - AS + Fast Red B = Merah Menyala Sido Mukti
    - AS-BO + Fast Red B = Maroon Sogan
    - AS-BS + Fast Blue BB = Biru Navy Pekalongan
    - AS-G + Fast Yellow GC = Kuning Emas 120 observasi
    - Total 25 kodi: Naphthol 6kg, NaOH 6L, NaNO2 3kg, HCl 8L, Garam Diazo 10kg
    **Reactive**: Yellow, Scarlet, Navy, Red Velvet, Green + Water Glass
    **Lorodan**: Soda Ash 30-50gr/L 90-100C + Solfite vs Kaporit
    **Lilin**: Parafin 60% 52-56C Micro 20% Siongkha 15% Beeswax 5% reform 40%/35%/15%/10% melting 65-68C anti 11-14 sun water <0.5% gravimetry
    """)

with tab3:
    st.subheader("Kuali & No Motor Water System - 2 Tabung Vakum")
    colA, colB = st.columns(2)
    with colA:
        st.metric("Kuali Cetak", "10x Ø45cm", "65-115W induction 20kHz")
        st.metric("Kuali Pematangan", "90x70", "346L -> 173L 50% susut")
        st.metric("Water Content", "40% -> 0%", "foam rubber")
    with colB:
        st.metric("Tabung A Cold", "500L", "58% - Clean")
        st.metric("Tabung B Steam", "500L 2 Ruang", "2.5 bar 90kg/h")
        st.success("No Motor Water: First steam presses Tabung A -> Kolam 320L/min - Zero 135W pump")
    st.markdown("**Thermosiphon**: panas naik dingin turun, passive, Relay COM-NC-NO, stop otomatis via SHT41 MLX90640")

with tab4:
    st.subheader("Sensor Live - IR SUPER BATIK GUARD 8-in-1")
    c1, c2, c3, c4 = st.columns(4)
    c1.metric("TCS34725 Bug No2", "120 obs", "Delta E 12%")
    c2.metric("IMX219 Gudang Kecil", "8MP 5500K", "Reactive low")
    c3.metric("HX711 5kg", "0.1gr", "5gr Naphthol")
    c4.metric("MLX90640", "32x24", "45C shade alarm")
    c1.metric("SHT41", "±0.2C", "RH 65%")
    c2.metric("NDIR CO2", "800 ppm", "fermentation check")
    c3.metric("MQ-135 NOx", "30 ppm", "Safe <50ppm")
    c4.metric("Thermal Battery", "500L", "07:00-19:00")
    st.json({
        "Naphthol": "45.2 mg/L Safe",
        "Reactive": "22.8 mg/L Normal",
        "Indanthrene": "18.5 mg/L Normal",
        "Labor": "08:42 Budi S. active 12 authorized",
        "CCTV": "14 nodes REC"
    })

with tab5:
    st.subheader("Model API - Muse Spark Open - Multimodality")
    st.markdown("""
    **From Threads share**: IMAGES + VIDEO + TEXT + DOCS -> Muse Spark understands natively
    - **IMAGES**: TCS34725_yellow_120.jpg, IMX219_gudang_kecil.jpg
    - **VIDEO**: CCTV_Jemuran_4.mp4 (14 CCTV + MLX90640)
    - **TEXT**: 25 kodi Naphthol AS-BO logs ESP32-S3
    - **DOCS**: Floor_Plan_1_200.pdf
    """)
    st.code("""
from meta_ai import MuseSpark
client = MuseSpark(model="muse-spark-open")
response = client.multimodal(
  images=["TCS34725_yellow_120.jpg", "IMX219_gudang_kecil.jpg"],
  video=["CCTV_Jemuran_4.mp4"],
  text="25 kodi Naphthol AS-BO",
  docs=["Floor_Plan_1_200.pdf"]
)
# Returns Delta E, stock alert, labor efficiency, energy, compliance
    """, language="python")
    st.success("GitHub: Alchaliveret/batik-guard-8in1 | Live Pages: https://alchaliveret.github.io/batik-guard-8in1/ | Team ID Even Garden | Credit $150")

st.sidebar.markdown("---")
st.sidebar.markdown("**Repo**: Alchaliveret/batik-guard-8in1")
st.sidebar.markdown("**Pages**: https://alchaliveret.github.io/batik-guard-8in1/")
st.sidebar.markdown("**Model API**: Muse Spark Open")
st.sidebar.markdown(f"Last update: {datetime.now().strftime('%Y-%m-%d %H:%M')}")
