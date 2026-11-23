# Wiring Box Kontroler ESP32 — Untuk Tukang Listrik

## Yang dikontrol
- Float Level Switch LOW 120 cm dan HIGH 160 cm
- Relay CH1 -> Pompa DC 24V
- Relay CH2 -> Solenoid Valve 24V
- 3x Water Meter, Pressure Gauge 0-6 bar, Safety Valve, Voice Recorder

## Logika Otomatis
1. Air turun ke 120 cm -> Float Switch LOW -> ESP32 ON -> Pompa nyala + Solenoid buka. Auto Refill ON.
2. Air naik ke 160 cm -> Float Switch HIGH -> ESP32 OFF -> Pompa mati + Solenoid nutup. Auto Refill OFF.
3. Per tahap isi hanya 40 cm, sekitar 50-75 liter, sehari 4 tahap = 200-300 liter.

## Notif HP
- Level Rendah - Auto Refill ON - Level 120cm - Tekanan 1,2 bar
- Level Normal - Auto Refill OFF - Level 160cm - Siap

## Catatan Listrik
- Sumber: 220VAC -> MCB 2A -> PSU 24VDC 10A
- Kabel Merah = +24VDC, Hitam = GND / 0VDC, Kuning = Sinyal Data / GPIO, Biru = Sinyal Sensor / Input
- Enclosure: Kotak Panel IP65 dengan pendingin dan sekring
- Safety: Kalau tekanan > 3 bar, Safety Valve buka otomatis, Voice Recorder putar notifikasi suara: PERINGATAN TEKANAN TINGGI

## Catatan Sight Glass untuk Tukang Las
- Sight Glass / Water Level Gauge - Borosilikat 3.3, JANGAN kaca biasa. Kaca biasa kena uap 2,5 bar langsung pecah.
- Pasang 2 Valve Isolasi di atas dan bawah kaca. Kaca di SAMPING tabung, jangan di depan, biar tidak kena panas langsung pas buka tutup.
- Pelindung Kaca / Guard dari besi hollow biar tidak kesenggol.
- Skala: 120 cm = 3/5 BATAS BAWAH, 160 cm = 4/5 BATAS ATAS, 200 cm = MAKSIMUM
