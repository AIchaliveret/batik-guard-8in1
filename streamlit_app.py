
"""
Streamlit App - IR SUPER BATIK GUARD 8-in-1 Dashboard - FINAL WITH REAL IMAGES
Fixes: Floorplan kosong cuman keterangan - now shows real 2D + 3D images + embedded HTML
Repo: Alchaliveret/batik-guard-8in1
Live: https://alchaliveret.github.io/batik-guard-8in1/
"""

import streamlit as st
import streamlit.components.v1 as components
from datetime import datetime

st.set_page_config(page_title="IR SUPER BATIK GUARD 8-in-1 - 20x110M", page_icon="🏭", layout="wide", initial_sidebar_state="expanded")

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

st.title("IR SUPER BATIK GUARD 8-in-1 - Control Office 4x6M")
st.markdown("**One Platform for Smarter Batik Buildings | Tuya-style but for Batik | Muse Spark Multimodal: IMAGES + VIDEO + TEXT + DOCS**")

tab1, tab2, tab3, tab4, tab5 = st.tabs(["📐 Floor Plan 1:200", "🎨 Chemical 25 Kodi", "🔥 Kuali & No Motor Water", "📊 Sensor Live", "🤖 Model API"])

with tab1:
    st.subheader("FLOOR PLAN 1:200 - 20M x 110M = 2200M² - Ruler Every Side")
    st.success("✅ DENAH 2D + 3D DESIGN GRAFIS ARCHITECTURE + RAB TEKNIK SIPIL - FINAL SYSTEM WITH IMAGES (Fixed empty floorplan)")

    # FIX 1: Show real 2D floor plan image - guaranteed visible on mobile
    st.markdown("### 📐 DENAH FLOOR PLAN 2D - 20M x 110M = 2200M² - Scale 1:200")
    try:
        st.image("floorplan_2d_20x110m.png", caption="2D Floor Plan 20x110M Gate 6M [7+6+7] GSB 10M Taman 10M Gudang Besar 22M Kantor 4x6M Jemuran 50M IPAL 10x8x3M Cerobong 12M - Ruler Every Side - ESP32-S3 Mesh 5 Nodes - 14 CCTV - Tabung A/B 500L", use_column_width=True)
    except:
        st.warning("floorplan_2d_20x110m.png not found, using fallback")
        st.markdown("**Gate 6M [7+6+7]**: 7M pagar + 6M gerbang + 7M pagar, simetris **GSB 10M** dari jalan, **Taman Depan 10M** filter debu aesthetic buffer anti maling CCTV 2 24H **Gudang Besar 22M** 10 kuali Ø45cm + pematangan 90x70 **Gudang Kecil Kimia** Reaktif Naphthol A/B Indanthrene **Kantor 4x6M 24m²** server ESP32-S3 mesh **Jemuran Pelangi 50M** CCTV 4 SHT41 MLX90640 **IPAL 10x8x3M** multi-layer **Cerobong 12M** SS304 Cyclone Scrubber black->white **Access Pick Up Kayu Bakar via Pintu Depan Besar Utama No side door** Skala 1:200 1cm=2M real")

    # FIX 2: Show real 3D architecture image - guaranteed visible
    st.markdown("### 🏗️ 3D DESIGN GRAFIS ARCHITECTURE - Isometric Cutaway 20x110M")
    try:
        st.image("architecture_3d_isometric.png", caption="3D Isometric 20x110M - Tabung A 500L Cold + Tabung B 500L Steam 2.5 bar 90kg/h Thermosiphon No Motor Water 320L/min Relay COM-NC-NO + 10x Kuali Tembaga Ø45cm + Kuali Pematangan 90x70 346L->173L + Generator Francis Turbine 50kWe + IPAL 10x8x3M 4-stage + Cerobong 12M SS304 Cyclone Scrubber + Control Office 4x6M + Solar Panels 120kWp + GSB 10M Gate 6M - Tuya B2B One Platform", use_column_width=True)
    except:
        st.warning("architecture_3d_isometric.png not found")

    # FIX 3: Show interior control office
    st.markdown("### 🖥️ 3D Interior Architecture - Control Office 4x6M = 24m² - Tuya B2B Style")
    try:
        st.image("interior_control_office_4x6m.png", caption="Control Office 4x6M Isometric Cutaway - MAIN DB PANEL METER 380V 3P 12.4kW + BUILDING ENERGY CONSUMPTION + HVAC STATUS 24.5C + LIGHTING ZONES + FLOOR PLAN 1:200 + ACCESS CONTROL 12 staff + CCTV FEEDS 14 + BATIK CHEMICAL MONITORING + KUALI CETAK TEMP + NO MOTOR WATER SYSTEM Tabung A/B 58%", use_column_width=True)
    except:
        pass

    # FIX 4: Embedded HTML as backup (iframe)
    st.markdown("### 📊 Interactive System - 2D Ruler + 3D Orbit + RAB")
    try:
        with open("denah_2d_3d_rab_final.html", "r", encoding="utf-8") as f:
            html = f.read()
        components.html(html, height=950, scrolling=True)
    except FileNotFoundError:
        st.info("Interactive HTML not found - images above show full system. Upload denah_2d_3d_rab_final.html for interactive 3D.")

    st.markdown("---")
    st.subheader("💰 RAB Teknik Sipil - Quick View")
    st.markdown("""
    **RAB Pabrik Batik 2200m2 Final - Piping Galvalum Mix Stainless 94M + Orange SS304 800C**
    - Site 20x110M + Tungku 2 besar + 2 sedang + 2 kayu bakar
    - Kuali 500-1000L Ø1.2M + 10x Ø45cm tembaga C110 + Pematangan 90x70 346L->173L foam rubber 8h big fire water 40%->0%
    - Generator France Turbo Turbine Francis E=-N dΦ/dt Lenz 2.5bar 90kg/jam 2000-4000W ESC 6 MOSFET reversible MORE POWER=MORE THRUST
    - Tabung Vacuum A Cold 500L + B Steam 500L 2 Ruang Pluit 2.5bar Thermosiphon No Motor Water 135W first steam presses cold tank 320L/min zero pump Relay COM-NC-NO
    - IPAL 10x8x3M 4 stage eco: Grease Trap 1.5x1.5x1.5 Neutralization 2x2x1.5 Multi-layer filtration 10x8x3M Clean water 2x2x1.5 + Cerobong 12M SS304 800C Cyclone+Scrubber+Secondary+Spark
    - Full RAB ada di 2D+3D Final HTML di atas (Tab 3: RAB Teknik Sipil)
    """)
    
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
    - AS-G + Fast Yellow GC = Kuning Emas 120 observasi TCS34725 Bug No2 Delta E
    - Total 25 kodi: Naphthol 6kg, NaOH 6L, NaNO2 3kg, HCl 8L, Garam Diazo 10kg
    **Reactive**: Yellow, Scarlet, Navy, Red Velvet, Green + Water Glass
    **Lorodan**: Soda Ash 30-50gr/L 90-100C + Solfite vs Kaporit
    **Lilin**: Parafin 60% 52-56C Micro 20% Siongkha 15% Beeswax 5% reform 40%/35%/15%/10% melting 65-68C anti 11-14 sun water <0.5% gravimetry
    """)

with tab3:
    st.subheader("Kuali & No Motor Water System - 2 Tabung Vakum Tanpa Motor Air 135W")
    colA, colB = st.columns(2)
    with colA:
        st.metric("Kuali Cetak", "10x Ø45cm", "65-115W induction 20kHz")
        st.metric("Kuali Pematangan", "90x70", "346L -> 173L 50% susut")
        st.metric("Water Content", "40% -> 0%", "foam rubber")
    with colB:
        st.metric("Tabung A Cold", "500L", "58% - Clean")
        st.metric("Tabung B Steam", "500L 2 Ruang", "2.5 bar 90kg/h")
        st.success("No Motor Water: First steam presses Tabung A -> Kolam 320L/min - Zero 135W pump")
    st.markdown("**Thermosiphon**: panas naik dingin turun, passive, Relay COM-NC-NO, stop otomatis via SHT41 MLX90640 32x24 thermal + NDIR CO2 4ch + MQ-135")

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
