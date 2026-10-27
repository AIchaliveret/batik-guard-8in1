
import streamlit as st
import requests
import random, time

st.set_page_config(page_title="IR BATIK GUARD - Prototype Robotics Pabrik 20x110M", layout="wide")

st.title("🏭 IR BATIK GUARD 8-in-1 - Prototype Robotics Pabrik Batik 20Mx110M")
st.subheader("Semua Instalasi Pipa Galvalum+Stainless 2-3cm → Tabung Cattler → Generator DC | Controllable HP & Laptop WiFi+Internet")

col1, col2, col3 = st.columns(3)
col1.metric("Lahan", "20×110=2200m²", "SCALE 1:200")
col2.metric("Gate", "6M [7+6+7]", "GSB 10M Taman 10M")
col3.metric("Status", "Robotik Full Otomatis", "WiFi 192.168.4.1 / .22")

st.divider()
st.header("🔧 Semua Instalasi Pipa - Galvalum + Stainless 2-3cm Campuran")

c1, c2 = st.columns(2)
with c1:
    st.subheader("Pipa Galvalum 2-3cm Ø (Abu-abu)")
    st.write("- Besi campuran zinc-aluminium, harga murah")
    st.write("- Diameter 2cm cabang, 3cm main line 94M")
    st.write("- Jalur dingin: KOLAM → KUALI MASAK 90×70 346L → TABUNG CATTLER Bawah Tabung A 500L vacuum")
    st.write("- Garis abu-abu putus-putus — — —")
with c2:
    st.subheader("Pipa Stainless SS304 2-3cm Ø (Silver)")
    st.write("- Food grade tahan panas 800°C inside / 315°C outside Galvalum")
    st.write("- Tahan uap 2.5 bar 90kg/jam")
    st.write("- Jalur panas: TABUNG CATTLER Atas Tabung B 500L kettle uap → GENERATOR Turbine Francis")
    st.write("- Garis silver tebal ═══")

st.divider()
st.header("🔄 Alur: Besi → Cattler → Generator DC")
st.code("""
KOLAM (8 unit) + KUALI MASAK 90×70 346L → 173L (Api besar 8 jam + Kayu Bakar Tungku Lilin 2 Units)
   ↓ Pipa Galvalum 2-3cm Ø abu-abu jalur dingin
TABUNG CATTLER (KETTLE) 500L Bawah = Tabung A air dingin bersih SS304 vacuum insulated
   ↓ Thermosiphon hot rises cold falls NO MOTOR 135W steam pump like
TABUNG CATTLER Atas = Tabung B kettle uap 2 Ruang Partition Pluit 2.5 bar 90kg/jam
   ↓ Pipa Stainless 2-3cm Ø silver jalur panas
GENERATOR Turbine Francis magnets+copper E=-N dΦ/dt Faraday Lenz ε=-dΦ/dt DC 12V/24V/48V
   ↓ Orange SS304 + Relay valve COM-NO ESP32-S3 SHT41 MLX90640
Thermal Battery 500L 07:00-17:00 + lembur 17:00-19:00 ATS PLN no LiFePO4 → RUANG CETAK 10 Kompor DC
""")

st.divider()
st.header("⚡ Instalasi Listrik DC - Belum AC")
st.write("- Semua DC dari Generator 2000-4000W (2-4×1000W) → Thermal Battery 500L ATS PLN no LiFePO4 explosion")
st.write("- 10 Kuali Cetak Ø45cm C110 3mm 65-115W induction 20k flip/sec eddy current @zackdfilms DC 48V")
st.write("- Relay COM NC NO coil armature spring safety @techlabprojectsv5s")
st.write("- Switch Board 4 LEDs @filmagicart blue green yellow red status kuali")
st.write("- ESC 6 MOSFETs 3 phases A B C reverse as generator MORE SWITCHING=MORE THRUST")
st.write("- Merah listrik AC/DC generator only for small stoves not 4 large kuali danger")

st.divider()
st.header("📡 Controllable via WiFi + Internet - HP & Laptop - Prototype Robotik")
st.write("ESP32-S3 mesh WiFi SSID meta.aichaliveret")
st.write("- Laptop: 192.168.4.1")
st.write("- HP: 192.168.4.22")
st.write("- 5 nodes coverage Kantor + Halaman Jemuran + Ruang Cetak")
st.write("- Dashboard sensor 8 items + CCTV 14 feed")
st.write("- Operator+Supervisor+Business Owner jadi pembelajar perekam log CSV")
st.write("- Fully automatic tapi manual override via Relay COM NO HP/Laptop")

if st.button("Test Control Kuali 1 ON via WiFi"):
    st.success("Kuali 1 ON via 192.168.4.1 laptop - Relay COM-NO closed - Induction 75W - DC 48V")

st.divider()
st.header("📍 Site Plan - Ikutin Foto Tangan Lo")
st.write("TEMPAT ISTIRAHAT, MESS x3, KOLAM x8, RUANG CETAK 10 MEJA 10 KOMPOR LISTRIK, TAMAN, FILTER DRAINASE PARKIR MOTOR 10M, MEJA KRIWILAN WATER GLASS, GENERATOR TABUNG KETTLE, KUALI MASAK, KAYU BAKAR TUNGKU LILIN 2 UNITS, SOLFITE 2Mx2M, AIR MASIN 2M•4M•4M, CELAP WARNA NAPTOL REACTIVE 8M, GUDANG KECIL MEJA KRIW 4M, GUDANG BESAR 2+2M 22M, HALAMAN JEMURAN, RUANG JEMURAN 50M 8M, KANTOR 4Mx6M RAK, CAR PARK, TRUCK PARK, PINTU GERBANG, ACCESS ROAD 20M")
st.info("Buka index.html di tab sebelah untuk floor plan interaktif drag + layer pipa galvalum+stainless 2-3cm + listrik DC + IPPAL")
