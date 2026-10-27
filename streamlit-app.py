import streamlit as st
import math, json

st.set_page_config(page_title="IR BATIK GUARD 8-in-1", layout="wide", page_icon="🦇")

st.title("🦇 IR SUPER USEFUL BATIK GUARD 8-in-1")
st.subheader("20x110M Autonomous Factory - Team 1409646471324297 - AIchaliveret")
st.caption("Muse Spark Open 1026 + Modal + SAM 3.1 | 192.168.4.1 laptop & 192.168.4.22 HP meta.aichaliveret")

col1, col2, col3 = st.columns(3)

with col1:
    st.markdown("### 1. Tongkat Plakin TCS34725 Bug No2")
    r1 = st.slider("R current", 0, 255, 200)
    g1 = st.slider("G current", 0, 255, 180)
    b1 = st.slider("B current", 0, 255, 50)
    r_ref = st.number_input("R ref kuning emas", value=210)
    g_ref = st.number_input("G ref", value=190)
    b_ref = st.number_input("B ref", value=60)
    delta_e = math.sqrt(sum((a-b)**2 for a,b in zip([r1,g1,b1],[r_ref,g_ref,b_ref]))) / 441.672 * 100
    st.metric("Delta E CIE76", f"{delta_e:.2f}")
    if delta_e > 10:
        st.error("ALARM MERAH - Trigger IPAL + HP")
        led = "🔴 Merah"
    elif delta_e > 5:
        st.warning("SIAGA - Kuning")
        led = "🟡 Kuning"
    else:
        st.success("AMAN - Hijau")
        led = "🟢 Hijau"
    st.info(f"Switch Board 4 LED: {led} | 120 observasi 10 detik celup")

with col2:
    st.markdown("### 2. IMX219 8MP Gudang Kimia")
    st.text("Stock detection SAM 3.1 text prompt")
    hx_50 = st.slider("HX711 50kg Dacin (kg)", 0.0, 50.0, 23.5)
    hx_5 = st.slider("HX711 5kg 0.1gr (kg)", 0.0, 5.0, 2.45)
    st.metric("Naphthol A soda api dimasak api", f"{hx_50} kg - {'AMAN' if hx_50>5 else 'ISI ULANG'}")
    st.metric("Naphthol B nitrit+air keras", f"{hx_5} kg")
    st.caption("Reaktif, AS, AS-BO, AS-BS, Fast salts Merah Menyala, Biru Navy")

with col3:
    st.markdown("### 3. MLX90640 + Thermal Battery")
    mlx_max = st.slider("MLX90640 max °C", 0, 150, 95)
    co2 = st.slider("NDIR CO2 ppm", 0, 3000, 800)
    nox = st.slider("MQ-135 NOx ppm", 0, 500, 120)
    if mlx_max > 90:
        st.error(f"THERMOSIPHON: UAP PERTAMA TEKAN TABUNG A -> DORONG KE KOLAM ({mlx_max}°C)")
    elif mlx_max > 60:
        st.warning("THERMOSIPHON AKTIF - Panas naik dingin turun")
    st.metric("Tabung A 500L dingin bersih", "OK")
    st.metric("Tabung B Kettle Uap 500L 2 Ruang Pluit 2.5bar 90kg/jam", f"{mlx_max}°C")
    st.metric("IPAL Cerobong 12M", "TRIGGER SCRUBBER" if co2>1500 else "NORMAL Hitam->Putih tipis")

st.divider()
st.markdown("### 4. Generator 2000-4000W + 14 CCTV + RAB")
c4, c5, c6 = st.columns(3)
c4.metric("Turbine Francis", "E=-N dΦ/dt Lenz", "MORE THRUST=MORE POWER")
c4.metric("Thermal Battery 500L", "07:00-17:00 + lembur 17:00-19:00 ATS PLN")
c5.metric("14 CCTV", "Cetak 4 Jemuran 4 Halaman 2 Security 24H Naphthol 2 Generator")
c5.metric("PIR cold only Face hot only", "Log jam kerja")
c6.metric("RAB Total", "Rp 1.478.500.000")
c6.metric("Floor Plan", "20x110M=2200m² Gate 6M tengah (7+6+7) GSB 10M")

st.json({
    "team_id": "1409646471324297",
    "model": "meta-models/muse-spark-open-1026",
    "delta_e": round(delta_e,2),
    "status": led,
    "mesh": "5 NODES 192.168.4.1 & 192.168.4.22",
    "modal_endpoint": "https://1409646471324297--batik-guard-muse-spark-open-1026-analyze-batik.modal.run"
})

st.caption("Deploy: streamlit run streamlit_app.py | Modal: modal deploy app.py | Kitab Komplit 11 tabs inside repo")
