import streamlit as st

st.set_page_config(page_title="IR SUPER BATIK GUARD 8-in-1", layout="wide")

st.title("IR SUPER BATIK GUARD 8-in-1")
st.caption("Control Office 4x6M | GSB 10M | GATE 6+8+6 = 20M | TOTAL 2000M2 | 20M x 100M | BATIK GUARD 8-in-1")
st.markdown("---")

tab1, tab2, tab3, tab4, tab5, tab6, tab7 = st.tabs([
    "Floor Plan 1:200",
    "Chemical",
    "IPAL",
    "Safety",
    "Office",
    "Control",
    "Turbine"
])

# ================= TAB 1 - FLOOR PLAN - HANYA 2D + 3D, TIDAK ADA GAMBAR KANTOR DI SINI =================
with tab1:
    st.header("FLOOR PLAN 1:200 - 20M x 100M = 2000M2")

    st.markdown("""
    ### DIMENSI KUNCI — FINAL
    - **GATE:** 6M + 8M + 6M = 20M (full lebar tanah)
    - **GSB:** 10M
    - **TOTAL:** 20M x 100M = 2000M2
    - **GUDANG BESAR:** 6x10M = 60M2
    - **KANTOR:** 4x6M = 24M2
    - **JEMURAN PELANGIAN:** 14x20M = 280M2
    - **UTILITAS:** 7x12M = 84M2
    - **IPAL:** 10x8x3M
    - **CEROBONG:** 12M
    """)

    st.markdown("""
    ### SEGMENT — TOTAL 2000M2 (tidak ditambah lagi, sub-room sudah di dalam segment)
    - **Halaman Depan:** 20x10 = 200M2
    - **Zona Depan:** 20x21 = 420M2
    - **Zona Proses:** 20x29 = 580M2
    - **Produksi + Utilitas:** 20x17 = 340M2
    - **Jemur + Lab:** 20x23 = 460M2
    - **TOTAL:** 200 + 420 + 580 + 340 + 460 = **2000M2**
    """)

    # --- GAMBAR 1 - 2D DULU ---
    st.subheader("Gambar 2D — Denah Top View")
    try:
        st.image("denah-pabrik-batik-guard-20x100.png", caption="Denah 2D — 20 x 100 = 2000 m2", use_container_width=True)
    except:
        st.warning("File 2D denah-pabrik-batik-guard-20x100.png belum ketemu")

    # --- GAMBAR 2 - 3D SESUDAH 2D ---
    st.subheader("Gambar 3D — Isometrik Pabrik")
    try:
        st.image("architecture_3d_isometric.png", caption="Desain 3D Isometrik — Pabrik Batik Guard", use_container_width=True)
    except:
        st.warning("File 3D architecture_3d_isometric.png belum ketemu")

    st.markdown("""
    ### CATATAN YANG MENGIKAT
    - Ukuran yang dipakai adalah 20 x 100 = 2000 m2, bukan 20 x 110.
    - Gate 6+8+6 = 20 m, GSB 10 m.
    - Semua sub-room sudah masuk di dalam segment, jangan ditambah lagi.
    """)

# ================= TAB 2 - CHEMICAL =================
with tab2:
    st.header("Chemical — Batik Guard")
    st.markdown("""
    - **Area Chemical:** di Zona Proses, dekat Produksi
    - **Penyimpanan:** rak tertutup, ventilasi, jauh dari tungku
    - **SOP:** pakai APD, timbangan, label, MSDS
    - **Sensor:** IR + suhu + gas, alarm kalau bocor
    """)

# ================= TAB 3 - IPAL =================
with tab3:
    st.header("IPAL — 10x8x3M")
    st.markdown("""
    - **Ukuran IPAL:** 10 x 8 x 3 M
    - **Fungsi:** olah air limbah batik sebelum dibuang
    - **Alur:** Bak Ekualisasi > Koagulasi > Sedimentasi > Filter > Air Bersih
    - **Target Air:** pH 6-8, TDS 50-70 — sesuai observasi Mineral Sehat
    """)

# ================= TAB 4 - SAFETY =================
with tab4:
    st.header("Safety — Batik Guard 8-in-1")
    st.markdown("""
    - **8-in-1:** IR, Suhu, Gas, Api, CCTV, Akses, HVAC, Chemical
    - **Listrik:** AC dan DC dipisah, MCB 6A, RCD 30mA, ATS, Charge Controller, Baterai 24V, Inverter
    - **Jalur Evakuasi:** Gate 6+8+6 = 20M, bebas hambatan
    - **APAR + Hydrant:** di setiap zona
    """)

# ================= TAB 5 - OFFICE - GAMBAR KANTOR HANYA DI SINI, TIDAK DI TAB FLOOR PLAN =================
with tab5:
    st.header("Office — Control Office 4x6M")
    st.markdown("""
    - **Ukuran Kantor:** 4 x 6 M = 24M2
    - **Fungsi:** Control Office, monitoring CCTV, HVAC, Chemical, Lighting
    - **Posisi:** di Zona Depan, dekat Gate, mudah kontrol keluar-masuk
    """)
    st.subheader("Gambar Kantor — Interior Control Office")
    try:
        st.image("interior_control_office_4x6m.png", caption="Interior Control Office 4x6M", use_container_width=True)
    except:
        st.warning("File interior_control_office_4x6m.png belum ketemu")

# ================= TAB 6 - CONTROL =================
with tab6:
    st.header("Control — Monitoring")
    st.markdown("""
    - **Dashboard:** Suhu, IR, CCTV, HVAC, Lighting, Akses, Chemical
    - **Mode:** Otomatis + Manual, alarm kalau suhu / gas naik
    - **Data:** disimpan untuk SOP, OEE, ERP, KPI — Lembar Hijau
    """)

# ================= TAB 7 - TURBINE =================
with tab7:
    st.header("Turbine — Steam to Listrik")
    st.markdown("""
    - **4 Tungku:** 2 Medium untuk air panas, 2 Giant (Giant 1 backup air panas / bantu turbin, Giant 2 ke turbin)
    - **Alur:** Uap langsung > Turbo Turbine > Alternator Truk 24V 100A
    - **Target:** 1500-2000W stabil, maks 2400W DC
    - **Listrik:** Alternator > MCB > Charge Controller > Baterai 24V > Inverter > Lampu, Dispenser, Sensor, Cas HP
    - **PLN:** hanya untuk pompa air tanah / satelit + kompor listrik, tidak dicampur dengan DC
    - **Tanpa:** tanpa pompa motor air, tanpa mesin Beat, tanpa campur AC/DC langsung
    """)
