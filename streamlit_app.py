import streamlit as st

st.set_page_config(page_title="IR BATIK GUARD - Prototype Robotics 20x110M", layout="wide")

st.title("🏭 IR BATIK GUARD 8-in-1 - Prototype Robotics Pabrik Batik 20Mx110M")
st.subheader("Semua Instalasi Pipa Galvalum+Stainless 2-3cm → Tabung Cattler → Generator DC | Controllable HP & Laptop WiFi+Internet")

col1, col2, col3 = st.columns(3)
col1.metric("Lahan", "20x110=2200m²", "SCALE 1:200")
col2.metric("Gate", "6M [7+6+7]", "GSB 10M")
col3.metric("Status", "Robotik Otomatis", "WiFi 192.168.4.1/.22")

st.divider()
st.header("🔧 Semua Instalasi Pipa - Galvalum + Stainless 2-3cm Campuran")
c1, c2 = st.columns(2)
with c1:
    st.info("**Pipa Galvalum 2-3cm Ø (Abu-abu)**\n\n- Besi campuran zinc-aluminium harga murah\n- Diameter 2cm cabang, 3cm main line 94M\n- Jalur dingin: KOLAM → KUALI MASAK 90x70 346L → TABUNG CATTLER Bawah Tabung A 500L vacuum\n- Garis abu-abu putus-putus — — —")
with c2:
    st.info("**Pipa Stainless SS304 2-3cm Ø (Silver)**\n\n- Food grade tahan panas 800°C inside / 315°C outside\n- Tahan uap 2.5 bar 90kg/jam\n- Jalur panas: TABUNG CATTLER Atas Tabung B 500L kettle uap → GENERATOR Turbine Francis\n- Garis silver tebal ═══")

st.divider()
st.code("""
KOLAM (8 unit) + KUALI MASAK 90x70 346L → 173L (Api besar 8 jam + Kayu Bakar Tungku Lilin 2 Units)
   ↓ Pipa Galvalum 2-3cm Ø abu-abu jalur dingin
TABUNG CATTLER (KETTLE) 500L Bawah = Tabung A air dingin bersih SS304 vacuum insulated
   ↓ Thermosiphon hot rises cold falls NO MOTOR 135W steam pump like
TABUNG CATTLER Atas = Tabung B kettle uap 2 Ruang Partition Pluit 2.5 bar 90kg/jam
   ↓ Pipa Stainless 2-3cm Ø silver jalur panas
GENERATOR Turbine Francis magnets+copper E=-N dΦ/dt Faraday Lenz ε=-dΦ/dt DC 12V/24V/48V
   ↓ Orange SS304 + Relay valve COM-NO ESP32-S3 SHT41 MLX90640
Thermal Battery 500L 07:00-17:00 + lembur 17:00-19:00 ATS PLN no LiFePO4 → RUANG CETAK 10 Kompor DC
""", language="text")

st.divider()
st.header("⚡ Instalasi Listrik DC - Belum AC")
st.warning("""
- Semua DC dari Generator 2000-4000W (2-4x1000W) → Thermal Battery 500L ATS PLN no LiFePO4 explosion
- 10 Kuali Cetak Ø45cm C110 3mm 65-115W induction 20k flip/sec eddy current DC 48V
- Relay COM NC NO coil armature spring safety
- Switch Board 4 LEDs blue green yellow red status kuali
- ESC 6 MOSFETs 3 phases A B C reverse as generator MORE SWITCHING=MORE THRUST
- Merah listrik AC/DC generator only for small stoves not 4 large kuali danger
""")

st.divider()
st.header("📡 Controllable via WiFi + Internet - HP & Laptop - Prototype Robotik")
st.write("ESP32-S3 mesh WiFi SSID meta.aichaliveret - Laptop: 192.168.4.1 - HP: 192.168.4.22 - 5 nodes")
st.write("Dashboard sensor 8 items + CCTV 14 feed + jam kerja 07:00-19:00 anti maling security 24H")

if st.button("Test Control Kuali 1 ON via WiFi DC"):
    st.success("✅ Kuali 1 ON via 192.168.4.1 laptop - Relay COM-NO closed - Induction 75W - DC 48V - Pipa Stainless 2-3cm → Cattler → Generator")

if st.button("Test Pipa Galvalum+Stainless 2-3cm → Cattler"):
    st.success("✅ Alur: KOLAM → Galvalum 2-3cm abu-abu → CATTLER Bawah → Thermosiphon → CATTLER Atas → Stainless 2-3cm silver → GENERATOR DC 2.5 bar 90kg/jam")

st.divider()
st.header("📍 Site Plan - Ikutin Foto Tangan Lo")
st.info("TEMPAT ISTIRAHAT, MESS x3, KOLAM x8, RUANG CETAK 10 MEJA 10 KOMPOR LISTRIK, TAMAN, FILTER DRAINASE PARKIR MOTOR 10M, MEJA KRIWILAN WATER GLASS, GENERATOR TABUNG KETTLE, KUALI MASAK, KAYU BAKAR TUNGKU LILIN 2 UNITS, SOLFITE 2Mx2M, AIR MASIN 2M•4M•4M, CELAP WARNA NAPTOL REACTIVE 8M, GUDANG KECIL MEJA KRIW 4M, GUDANG BESAR 2+2M 22M, HALAMAN JEMURAN, RUANG JEMURAN 50M 8M, KANTOR 4Mx6M RAK, CAR PARK, TRUCK PARK, PINTU GERBANG, ACCESS ROAD 20M")

st.link_button("Buka Floor Plan Interaktif (GitHub Pages)", "https://aichaliveret.github.io/batik-guard-8in1/")

st.divider()
st.caption("Team 1409646471324297 AIchaliveret - Prototype Robotics Pabrik Batik 20x110M = 2200M² - Semua instalasi pipa galvalum+stainless 2-3cm campuran → tabung cattler → generator DC - Controllable HP & Laptop WiFi+Internet")
