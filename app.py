import streamlit as st
from PIL import Image

st.set_page_config(page_title="Batik Guard 8-in-1", layout="wide")
st.title("Batik Guard 8-in-1 — Denah 20 x 100 = 2000 m2")
st.caption("Top view • Skala 1:200 • 3 cm = 2 m • Gate 6 + 8 + 6 = 20 m • GSB 10 m")

try:
    img = Image.open("denah-pabrik-batik-guard-FINAL-20x100.png")
    st.image(img, caption="Denah FINAL — PNG", use_container_width=True)
except:
    st.warning("PNG FINAL belum ke-upload. Upload file denah-pabrik-batik-guard-FINAL-20x100.png dulu.")

st.markdown("""
**Total: 200 + 420 + 580 + 340 + 460 = 2000 m2**
- Halaman Depan 20x10 = 200 • Zona Depan 20x21 = 420 • Zona Proses 20x29 = 580
- Produksi + Utilitas 20x17 = 340 • Jemur + Lab 20x23 = 460
- Gudang Besar 6x10 = 60 • Kantor 4x6 = 24 • Jemuran 14x20 = 280
- Utilitas 7x12 = 84: 2x Steam Catalyst Tube Ø38 cm x H200 cm staggered 36 cm + Turbin + Alternator Truk 24V
- Air: Mineral Sehat pH 6-8, TDS 50-70
""")
