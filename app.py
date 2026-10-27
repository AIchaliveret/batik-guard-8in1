
"""
IR BATIK GUARD 8-in-1 - Prototype Robotics Pabrik Batik 20x110M
Semua instalasi pipa galvalum+stainless 2-3cm -> tabung cattler -> generator DC
Controllable via WiFi + Internet - HP & Laptop
Team 1409646471324297 AIchaliveret
"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import modal

app = FastAPI(title="IR Batik Guard 8-in-1 - Prototype Robotics", version="1.0")

app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_methods=["*"], allow_headers=["*"])

# Mock sensor data - ESP32-S3 mesh 192.168.4.1 laptop / 192.168.4.22 HP
SENSORS = {
    "esp32_mesh": {"laptop": "192.168.4.1", "hp": "192.168.4.22", "ssid": "meta.aichaliveret", "nodes": 5},
    "sht41": {"temp": 28.4, "humidity": 68, "location": "Ruang Cetak + Jemuran"},
    "mlx90640": {"kuali_temp": 92, "resolution": "32x24", "range": "60-120C"},
    "hx711_5kg": {"weight": 2.45, "precision": "0.1gr", "raw_vs_after": "Delta"},
    "hx711_50kg": {"weight": 12.5, "dacin": True, "imx219_photo": True},
    "imx219": {"mp": 8, "colorimeter": "5500K", "face_detection": "hot rooms only"},
    "ndir_co2": {"co2": 412, "channels": 4, "safe": True},
    "mq135_nox": {"nox": 12, "alarm": ">50ppm", "cerobong": "12M SS304"},
    "pipa": {
        "galvalum_2cm": "abu-abu jalur dingin KOLAM->KUALI->CATTLER Bawah",
        "galvalum_3cm": "abu-abu main line 94M",
        "stainless_2cm": "silver jalur panas CATTLER Atas->GENERATOR",
        "stainless_3cm": "silver uap 2.5bar 90kg/jam -> Thermal Battery",
        "campuran": "galvalum+stainless 2-3cm lari ke tabung cattler lalu generator DC"
    },
    "cattler": {"type": "Kettle Uap 500L 2 Ruang Pluit", "pressure": "2.5 bar", "flow": "90kg/jam", "thermosiphon": "135W no motor hot rises cold falls", "tabung_a": "Air dingin bersih 500L SS304 vacuum", "tabung_b": "Kettle uap 500L"},
    "generator": {"type": "Turbine Francis magnets+copper", "formula": "E=-N dΦ/dt Faraday Lenz ε=-dΦ/dt", "power": "1000W each x2-4 = 2000-4000W", "dc": "12V/24V/48V DC murni belum AC", "esc": "6 MOSFETs 3 phases A B C reverse MORE SWITCHING=MORE THRUST"},
    "cctv": {"total": 14, "cetak": 4, "jemuran": 4, "halaman_depan": 2, "naphthol": 2, "generator": 2}
}

@app.get("/")
def root():
    return {"message": "IR BATIK GUARD 8-in-1 Prototype Robotics 20x110M", "status": "Pabrik Batik Robotik WiFi+Internet HP+Laptop", "team": "1409646471324297"}

@app.get("/sensors")
def get_sensors():
    return SENSORS

@app.get("/pipa")
def get_pipa():
    return {"galvalum_stainless_2_3cm": SENSORS["pipa"], "flow": "KOLAM->KUALI 90x70 346L->CATTLER Bawah->CATTLER Atas->GENERATOR DC->Thermal Battery->Ruang Cetak 10 Kompor DC"}

@app.get("/control/{device}/{action}")
def control_device(device: str, action: str):
    # Controllable via WiFi + Internet - HP & Laptop
    return {"device": device, "action": action, "via": "WiFi mesh 192.168.4.1 laptop / 192.168.4.22 HP meta.aichaliveret", "relay": "COM-NC-NO coil armature spring safety", "dc": True}

# Modal deploy
modal_app = modal.App("batik-guard-8in1")

@modal_app.function(image=modal.Image.debian_slim().pip_install(["fastapi","uvicorn"]))
@modal.asgi_app()
def fastapi_app():
    return app

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
