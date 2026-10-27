import modal

app = modal.App("batik-guard-muse-spark-open-1026")

# Image dengan semua deps buat TCS34725 + IMX219 + MLX90640 + HX711
image = modal.Image.debian_slim().pip_install(
    "fastapi[standard]",
    "transformers",
    "torch",
    "Pillow",
    "numpy",
    "colormath",
    "python-multipart"
)

# System prompt Batik Guard - Agentic 8-in-1
SYSTEM_PROMPT = """
Kamu adalah IR SUPER USEFUL BATIK GUARD 8-in-1 untuk pabrik 20x110M di Cerebral Valley.

Hardware:
- ESP32-S3 + IMX219 Colorimeter 8MP 5500K + HX711 5kg 0.1gr + HX711 50kg + SHT41 + MLX90640 32x24 thermal + NDIR CO2 4-ch + MQ-135 NOx
- Tongkat Plakin TCS34725 Bug No2: deteksi gradasi kuning Indanthrene + Water Glass, 120 observasi kuning celup 10 detik, Delta E >10% alarm merah HP
- IPAL 3-stage + Cerobong 12M SS304 800C Cyclone+Scrubber+Spark

Tugas agentic kamu:
1. Analisa warna dari IMX219: hitung Delta E CIE76/Lab untuk kuning muda->tua Indanthrene, deteksi gradasi tidak beraturan
2. Jika Delta E >10% -> trigger alarm merah + log ke IPAL
3. Baca stok gudang kimia: Naphthol A (soda api dimasak api), Naphthol B (nitrit+air keras HCl/H2SO4), Reaktif
4. Thermal mapping MLX90640 untuk komporisasi + 2 Tabung Vakum Thermosiphon
5. Beri instruksi operator via 4 LED Switch Board: Biru=Air, Hijau=Aman, Kuning=Siaga, Merah=Alarm

Jawab dalam format JSON: {"delta_e": float, "status": "AMAN/SIAGA/ALARM", "instruksi_led": "...", "stok": {...}, "co2_ppm": int}
"""

@app.function(image=image, gpu="T4", timeout=120)
@modal.web_endpoint(method="POST", docs=True)
def analyze_batik(data: dict):
    """
    Endpoint utama buat ESP32-S3 mesh 5 nodes
    POST ke: https://<team-id>--batik-guard-muse-spark-open-1026-analyze-batik.modal.run
    Body: {"rgb": [r,g,b], "rgb_ref": [r,g,b], "sht41": {"temp": 32.5, "hum": 65}, "mlx90640_max": 115, "hx711_5kg": 2.45, "hx711_50kg": 23.5, "co2": 800, "nox": 120}
    """
    import math

    # Hitung Delta E sederhana dari TCS34725/IMX219
    rgb = data.get("rgb", [200, 180, 50])
    rgb_ref = data.get("rgb_ref", [210, 190, 60])
    
    # Delta E CIE76 approximated dari RGB
    delta_e = math.sqrt(sum((a-b)**2 for a,b in zip(rgb, rgb_ref))) / 441.672 * 100
    
    status = "AMAN"
    led = "Hijau"
    if delta_e > 10:
        status = "ALARM MERAH"
        led = "Merah"
    elif delta_e > 5:
        status = "SIAGA"
        led = "Kuning"

    # Logic Thermal untuk Tabung Vakum
    mlx_max = data.get("mlx90640_max", 0)
    thermosiphon = "IDLE"
    if mlx_max > 90:
        thermosiphon = "UAP PERTAMA TEKAN TABUNG A -> DORONG KE KOLAM"
    elif mlx_max > 60:
        thermosiphon = "THERMOSIPHON AKTIF - PANAS NAIK DINGIN TURUN"

    # IPAL check
    co2 = data.get("co2", 0)
    iPal_trigger = co2 > 1500

    return {
        "team_id": "1409646471324297",
        "model": "meta-models/muse-spark-open-1026 (Muse Spark Open / Glimmer proxy)",
        "delta_e": round(delta_e, 2),
        "status": status,
        "instruksi_led": led,
        "instruksi_switch_board": f"LED {led} - {status}",
        "thermosiphon_status": thermosiphon,
        "stok_gudang": {
            "naphthol_a_soda_api": "AMAN" if data.get("hx711_50kg", 0) > 5 else "ISI ULANG",
            "naphthol_b_nitrit": "AMAN",
            "reaktif": "CEK IMX219"
        },
        "ipal_cerobong_12m": "TRIGGER SCRUBBER" if iPal_trigger else "NORMAL - HITAM->PUTIH TIPIS",
        "relay_com_nc_no": "STOP OTOMATIS" if mlx_max >= 100 else "JALAN",
        "mesh": "5 NODES ONLINE -> 192.168.4.1 laptop & 192.168.4.22 HP meta.aichaliveret"
    }

@app.function(image=image)
@modal.web_endpoint(docs=True)
def health():
    return {"status": "BATIK GUARD ONLINE", "team": "1409646471324297", "model": "muse-spark-open-1026", "ipal": "3-stage + 12M SS304", "pabrik": "20x110M=2200m2"}

# Untuk run lokal: python -m modal run app.py
