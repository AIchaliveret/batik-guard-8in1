import React, { useState } from 'react';
import { AlertTriangle, ArrowRight, CheckCircle2, ChevronDown, Compass, DoorOpen, Factory, Flame, Gauge, MapPin, Ruler, Warehouse, Waves } from 'lucide-react';

const stats = [
  { k: 'LAHAN', v: '2000 m²', s: '20 × 100 meter' },
  { k: 'GATE', v: '6 M • 6+8+6', s: 'Di tengah, terukur' },
  { k: 'KUALI CETAK', v: '10 × Ø45 cm', s: 'Tembaga C110 • 3 mm' },
  { k: 'PEMATANGAN', v: '346L → 173L', s: 'Susut volume 50%' },
  { k: 'GENERATOR', v: '2–4 × 1000W', s: 'Total 2000–4000W' },
  { k: 'CCTV', v: '14 unit', s: 'Security 24H' },
];

const zones = [
  { id: 'gudang', label: 'Gudang Besar', detail: '6 m × 10 m = 60 m². Garasi 6×6 menjadi akses masuk ke gudang besar.' },
  { id: 'garasi', label: 'Garasi / Akses', detail: '6 m × 6 m. Bukan parkir buntu — jalur akses langsung ke Gudang Besar.' },
  { id: 'kantor', label: 'Kantor 4×6', detail: '4 m × 6 m = 24 m². Dekat pintu masuk, mudah mengawasi halaman.' },
  { id: 'kimia', label: 'Gudang Kimia', detail: 'Gudang kecil kimia reaktif, terpisah dari area cetak dan jemuran.' },
  { id: 'kuali', label: 'Kuali Cetak', detail: '10 kuali cetak Ø45 cm datar, tembaga C110 3 mm, plus kuali pematangan.' },
  { id: 'jemuran', label: 'Lapang Jemuran', detail: 'Lapang jemuran pelangi. Area terbuka paling luas di sisi belakang.' },
  { id: 'ipal', label: 'IPAL 3-Stage', detail: 'Grease trap → netralisasi → filtrasi multi-layer. Air bersih ditampung terpisah.' },
  { id: 'taman', label: 'Taman 10M', detail: 'Taman 10 m di depan, di dalam GSB 10 m. Area hijau penyangga jalan.' },
] as const;

type ZoneId = typeof zones[number]['id'] | 'semua';

const timeline = [
  {
    n: '01', title: 'Awal — Lahan & Gate', tag: 'DENAH',
    body: 'Lahan 20M x 100M = 2000m², skala 1:200, ruler every side, Gate 6M middle pattern 6+8+6, GSB 10M, Taman 10M depan, Gudang Besar 60M, Gudang Kecil Kimia reaktif, Kantor 4x6M, Lapang Jemuran Pelangi.',
    points: ['Lebar 20 meter sudah pasti', 'Panjang 100 meter, bukan 110 meter', 'Gate di tengah, bukan di pinggir'],
  },
  {
    n: '02', title: 'CCTV & Security', tag: 'KEAMANAN',
    body: '14 CCTV: Cetak 4, Jemuran 4, Halaman Depan 2 Security 24H anti maling, Naphthol 2, Generator (dengan alternator truck) + Water Glass 2. PIR VCC GND Signal cold rooms, Face and move detector (optimalisasi JKL) Detection IMX219 hot rooms, TCS34725 sticks.',
    points: ['Cetak 4 • Jemuran 4 • Depan 2 • Naphthol 2 • Generator + Water Glass 2', 'PIR untuk cold rooms, deteksi wajah & gerak untuk hot rooms'],
  },
  {
    n: '03', title: 'Kuali & Tungku Raksasa Energi', tag: 'ENERGI / PRODUKSI',
    body: '10 Kuali Cetak Ø45cm datar tembaga C110 3mm 60-120C adjustable 65-115W induction 20k flip/sec eddy current, Kuali Pematangan 90cm Tinggi x 70cm Diameter 346L 8 jam api besar volume susut 50% jadi 173L water 40%->0% foam rubber, tongkat plakin. Tabung Kettle Uap 500L 2 Ruang Partition Pluit 2.5 bar 90kg/jam Turbine Francis magnets + copper coils Lenz.',
    points: ['Induksi 65–115W per kuali cetak', 'Pematangan 8 jam api besar', 'Kettle uap 2 ruang, 2.5 bar'],
  },
  {
    n: '04', title: 'IPAL & Cerobong', tag: 'LINGKUNGAN',
    body: 'Thermal Battery 500L 07:00-17:00 + lembur 17:00-19:00 ATS PLN no LiFePO4, 2-4 Generators (dengan alternator truck) 1000W each total 2000-4000W, IPAL 3-stage Grease Trap 1.5x1.5x1.5 Neutralization 2x2x1.5 Multi-layer filtration 10x8x3M, Clean water 2x2x1.5, Cerobong 12M SS304 800C inside Galvalum 315C outside Cyclone+Water Scrubber+Secondary Combustion+Spark Arrestor black->white thin.',
    points: ['IPAL: lemak → netral → filtrasi', 'Cerobong 12 m, asap hitam menjadi putih tipis'],
  },
  {
    n: '05', title: 'Kimia & Sensor', tag: 'KIMIA / SENSOR',
    body: 'Kimia 25 Kodi 500 lembar 200cm paparan 40-60%: Naphthol AS series + Fast Red/Blue etc total 6kg Naphthol 6L NaOH 3kg NaNO2 8L HCl 10kg Garam, Reactive, Lorodan Soda Ash 30-50gr/L 90-100C Solfite vs Kaporit, Lilin Parafin 60% 52-56C Micro 20% Gondorukem Siongkha 15% Beeswax 5% reform 40%/35%/15%/10% melting 65-68C. Sensor 8 items ESP32-S3 IMX219 HX711 SHT41 MLX90640 NDIR MQ-135, Tolls & Toys pocketable, 3-step workflow Opname 10s observation 120 yellow etc.',
    points: ['25 kodi = 500 lembar, paparan 40–60%', '8 item sensor berbasis ESP32-S3'],
  },
  {
    n: '06', title: 'No Motor Water System', tag: 'ALIRAN NATURAL',
    body: '2 Tabung Vakum Tabung A Air Dingin Bersih 500L SS304 vacuum insulated Tabung B Kettle Uap 500L 2 Ruang Partition (tabung b1 sebagai tabung uap tekanan tinggi + b2 tabung uap pendukung yang diletakan berjenjang dimana tabung b1 lebih tinggi 36 cm dibanding tabung b2), under Kuali Besar Tungku Besar Thermosiphon hot rises cold falls no pump, circulation loop Tabung A cold -> Tabung B hot until boiling point stop via Relay ESP32-S3 SHT41 MLX90640, First Steam Pressure 2.5 bar from Tabung B via Orange SS304 + Relay valve COM NO presses Tabung A pushing clean water to Kolam/Jambangan without motor.',
    points: ['Tanpa pompa — thermosiphon', 'B1 lebih tinggi 36 cm dari B2', 'Tekanan uap pertama 2.5 bar mendorong air bersih'],
  },
  {
    n: '07', title: 'Meta & Aplikasi Robotik', tag: 'SISTEM / APLIKASI',
    body: 'Meta Model API & Akun jugalachaliveret@gmail.com vs cinhonest@gmail.com / honestcin@gmail.com FB Even Garden, login via GitHub vs FB, team Even Garden, billing $150 credit claims form, deadline Wed Nov 4 2026 9PM ET = Thu Nov 5 09:00 WIB, 2FA g.co/sc, solution 2 Chrome Profiles Even Garden and Cerebral Valley, incognito. Aplikasi Robotik Full Otomatis WiFi ESP32-S3 mesh to laptop 192.168.4.1 and HP 192.168.4.22, dashboard sensor, CCTV feed 14, jam kerja efisien, anti maling, security 24H.',
    points: ['Deadline: Thu Nov 5, 09:00 WIB', 'Mesh ESP32-S3 ke laptop 192.168.4.1 dan HP 192.168.4.22'],
  },
];

function SitePlan({ active }: { active: ZoneId }) {
  const on = (id: string) => active === 'semua' || active === id;
  const stroke = (id: string) => (active === id ? '#C84B18' : '#16211E');
  const sw = (id: string) => (active === id ? 3.5 : 1.4);
  const opacity = (id: string) => (on(id) ? 1 : 0.32);
  return (
    <svg viewBox="0 0 1140 330" role="img" aria-label="Denah site plan lahan 20 meter kali 100 meter, skala 1 banding 200" className="block h-auto w-full bg-[#FFFEFA] text-[11px]">
      <defs>
        <pattern id="hatch" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="8" height="8" fill="#fff" /><line x1="0" y1="0" x2="0" y2="8" stroke="#16211E" strokeWidth="1" /></pattern>
      </defs>
      {/* rulers */}
      <text x="620" y="18" textAnchor="middle" className="mono" fontWeight="700" fill="#16211E">RULER ATAS — PANJANG LAHAN 0M → 100M (tiap 10M)</text>
      {Array.from({ length: 11 }, (_, i) => (
        <g key={`top-${i}`}>
          <line x1={70 + i * 100} y1="26" x2={70 + i * 100} y2="36" stroke="#16211E" strokeWidth="1.5" />
          <text x={70 + i * 100} y="48" textAnchor="middle" className="mono" fill="#16211E">{i * 10}M</text>
        </g>
      ))}
      <text x="24" y="150" textAnchor="middle" className="mono" fontWeight="700" fill="#16211E" transform="rotate(-90 24 150)">LEBAR 20M</text>
      {Array.from({ length: 3 }, (_, i) => (
        <g key={`left-${i}`}>
          <line x1="52" y1={60 + i * 100} x2="62" y2={60 + i * 100} stroke="#16211E" strokeWidth="1.5" />
          <text x="44" y={64 + i * 100} textAnchor="end" className="mono" fill="#16211E">{i * 10}M</text>
        </g>
      ))}
      {/* plot */}
      <g>
        {/* grid */}
        {Array.from({ length: 11 }, (_, i) => <line key={`v-${i}`} x1={70 + i * 100} y1="60" x2={70 + i * 100} y2="260" stroke="#D8D0BC" strokeWidth="0.7" />)}
        {Array.from({ length: 5 }, (_, i) => <line key={`h-${i}`} x1="70" y1={60 + i * 50} x2="1070" y2={60 + i * 50} stroke="#D8D0BC" strokeWidth="0.7" />)}
        {/* taman */}
        <g opacity={opacity('taman')}><rect x="70" y="160" width="1000" height="100" fill="#DCE9D8" stroke={stroke('taman')} strokeWidth={sw('taman')} /><text x="570" y="190" textAnchor="middle" fontWeight="800" fill="#16211E">TAMAN 10M DEPAN</text><text x="570" y="208" textAnchor="middle" className="mono" fill="#4B5A55">di dalam GSB 10M • penyangga jalan</text><text x="570" y="232" textAnchor="middle" className="mono" fontWeight="700" fill="#14665B">GSB 10M — garis bangunan di 10M dari jalan</text></g>
        <line x1="70" y1="160" x2="1070" y2="160" stroke="#C84B18" strokeWidth="2" strokeDasharray="8 5" />
        {/* gudang besar */}
        <g opacity={opacity('gudang')}><rect x="90" y="60" width="60" height="100" fill="#F2D6A8" stroke={stroke('gudang')} strokeWidth={sw('gudang')} /><text x="120" y="98" textAnchor="middle" fontWeight="800" fill="#16211E">GUDANG</text><text x="120" y="114" textAnchor="middle" fontWeight="800" fill="#16211E">BESAR</text><text x="120" y="134" textAnchor="middle" className="mono" fontWeight="700" fill="#B32B1E">6×10 = 60M</text></g>
        {/* garasi */}
        <g opacity={opacity('garasi')}><rect x="150" y="100" width="60" height="60" fill="#E9E4D6" stroke={stroke('garasi')} strokeWidth={sw('garasi')} /><text x="180" y="126" textAnchor="middle" fontWeight="800" fill="#16211E">GARASI</text><text x="180" y="142" textAnchor="middle" className="mono" fill="#16211E">6×6 • AKSES</text></g>
        <path d="M 210 130 L 228 130" stroke="#C84B18" strokeWidth="3" markerEnd="url(#arrow)" />
        {/* kantor */}
        <g opacity={opacity('kantor')}><rect x="250" y="60" width="40" height="60" fill="#fff" stroke={stroke('kantor')} strokeWidth={sw('kantor')} /><text x="270" y="88" textAnchor="middle" fontWeight="800" fill="#16211E">KANTOR</text><text x="270" y="104" textAnchor="middle" className="mono" fill="#16211E">4×6M</text></g>
        {/* kimia */}
        <g opacity={opacity('kimia')}><rect x="310" y="60" width="60" height="60" fill="#F6C8BC" stroke={stroke('kimia')} strokeWidth={sw('kimia')} /><text x="340" y="86" textAnchor="middle" fontWeight="800" fill="#16211E">GUDANG KIMIA</text><text x="340" y="102" textAnchor="middle" className="mono" fill="#16211E">REAKTIF</text></g>
        {/* kuali */}
        <g opacity={opacity('kuali')}><rect x="410" y="60" width="160" height="100" fill="#FFE7CE" stroke={stroke('kuali')} strokeWidth={sw('kuali')} /><text x="490" y="82" textAnchor="middle" fontWeight="800" fill="#16211E">KUALI CETAK • 10 × Ø45cm</text>{[0, 1, 2, 3, 4].map(i => <circle key={`a-${i}`} cx={440 + i * 26} cy="105" r="10" fill="#C97A3B" stroke="#16211E" />)}{[0, 1, 2, 3, 4].map(i => <circle key={`b-${i}`} cx={440 + i * 26} cy="137" r="10" fill="#C97A3B" stroke="#16211E" />)}<text x="490" y="154" textAnchor="middle" className="mono" fill="#16211E">C110 3mm + PEMATANGAN 346L</text></g>
        {/* cerobong */}
        <g opacity={opacity('kuali')}><circle cx="610" cy="78" r="14" fill="#D8D0BC" stroke="#16211E" strokeWidth="1.5" /><text x="610" y="82" textAnchor="middle" fontWeight="800" fill="#16211E">12M</text><text x="610" y="112" textAnchor="middle" className="mono" fontWeight="700" fill="#16211E">CEROBONG</text><text x="610" y="124" textAnchor="middle" className="mono" fill="#4B5A55">SS304</text></g>
        {/* jemuran */}
        <g opacity={opacity('jemuran')}><rect x="660" y="60" width="280" height="100" fill="#fff" stroke={stroke('jemuran')} strokeWidth={sw('jemuran')} />{[ '#E9554A', '#EFAA2A', '#F4E45B', '#62A86D', '#4B85B8', '#7A5CA8'].map((c, i) => <rect key={c} x={660} y={60 + i * 17} width="280" height="16" fill={c} opacity="0.68" />)}<text x="800" y="104" textAnchor="middle" fontWeight="900" fill="#16211E" style={{ paintOrder: 'stroke', stroke: '#fff', strokeWidth: 4 }}>LAPANG JEMURAN PELANGI</text><text x="800" y="124" textAnchor="middle" className="mono" fontWeight="700" fill="#16211E" style={{ paintOrder: 'stroke', stroke: '#fff', strokeWidth: 4 }}>AREA TERBUKA</text></g>
        {/* IPAL */}
        <g opacity={opacity('ipal')}><rect x="960" y="60" width="100" height="80" fill="#CDE2EC" stroke={stroke('ipal')} strokeWidth={sw('ipal')} /><line x1="993" y1="60" x2="993" y2="140" stroke="#16211E" /><line x1="1026" y1="60" x2="1026" y2="140" stroke="#16211E" /><text x="1010" y="86" textAnchor="middle" fontWeight="800" fill="#16211E">IPAL</text><text x="1010" y="102" textAnchor="middle" fontWeight="800" fill="#16211E">3-STAGE</text><text x="1010" y="122" textAnchor="middle" className="mono" fill="#16211E">1 • 2 • 3</text></g>
        <text x="1010" y="154" textAnchor="middle" className="mono" fill="#1D5A8A">AIR BERSIH 2×2×1.5</text>
        {/* thermal */}
        <g opacity={opacity('taman')}><rect x="790" y="185" width="60" height="42" fill="#fff" stroke="#14665B" strokeWidth="1.4" /><text x="820" y="203" textAnchor="middle" className="mono" fontWeight="700" fill="#14665B">THERMAL</text><text x="820" y="217" textAnchor="middle" className="mono" fill="#14665B">BATTERY 500L</text></g>
        {/* boundary */}
        <rect x="70" y="60" width="1000" height="200" fill="none" stroke="#16211E" strokeWidth="2.5" />
        {/* gate */}
        <line x1="70" y1="260" x2="670" y2="260" stroke="#16211E" strokeWidth="4" />
        <rect x="670" y="252" width="80" height="16" fill="#C84B18" />
        <text x="710" y="264" textAnchor="middle" fontWeight="900" fill="#fff">GATE 6M</text>
        <line x1="750" y1="260" x2="1070" y2="260" stroke="#16211E" strokeWidth="4" />
        <text x="370" y="282" textAnchor="middle" className="mono" fill="#16211E">PAGAR 6M</text>
        <text x="710" y="282" textAnchor="middle" className="mono" fontWeight="700" fill="#C84B18">BUKAAN 8M • POLA 6+8+6 = 20M</text>
        <text x="910" y="282" textAnchor="middle" className="mono" fill="#16211E">PAGAR 6M</text>
      </g>
      <text x="70" y="306" className="mono" fill="#16211E">SKALA 1:200 • 1 kotak grid = 10M • Garis merah putus-putus = GSB 10M</text>
      <text x="1070" y="306" textAnchor="end" className="mono" fill="#16211E">JALAN DI DEPAN (SELATAN)</text>
      <text x="70" y="322" className="mono" fill="#4B5A55">Ruler kanan: 0M – 10M – 20M • Ruler bawah: 0M – 50M – 100M</text>
    </svg>
  );
}

export default function App() {
  const [active, setActive] = useState<ZoneId>('semua');
  const [open, setOpen] = useState<Set<string>>(new Set(['01']));
  const [view, setView] = useState<'semua' | 'denah' | 'timeline'>('semua');
  const activeZone = zones.find(z => z.id === active);
  const toggle = (n: string) => setOpen(prev => { const next = new Set(prev); if (next.has(n)) next.delete(n); else next.add(n); return next; });

  return (
    <div data-safe-area-inset-root style={{ boxSizing: 'border-box', paddingTop: 'var(--safe-area-inset-top)', minHeight: '100vh', background: 'var(--paper)' }} className="overflow-x-clip">
      <header data-safe-area-sticky-top style={{ top: 'var(--safe-area-inset-top)' }} className="sticky z-20 border-b-2 border-[var(--line)] bg-[var(--paper)]">
        <div className="mx-auto flex max-w-[1240px] flex-wrap items-center justify-between gap-2 px-4 py-3 sm:px-6">
          <div className="flex items-center gap-2"><span className="bg-[var(--ink)] px-2 py-1 text-[11px] font-black tracking-[0.18em] text-[var(--paper)]">HALAMAN UTAMA</span><span className="mono text-[11px] font-semibold uppercase tracking-wider">Timeline Hari Ini</span></div>
          <nav className="flex flex-wrap gap-1" aria-label="Navigasi halaman">
            <button onClick={() => setView('semua')} className={`rounded-full border px-3 py-1.5 text-xs font-bold ${view === 'semua' ? 'bg-[var(--ink)] text-[var(--paper)]' : 'border-[var(--line)]'}`}>Semua</button>
            <button onClick={() => setView('denah')} className={`rounded-full border px-3 py-1.5 text-xs font-bold ${view === 'denah' ? 'bg-[var(--ink)] text-[var(--paper)]' : 'border-[var(--line)]'}`}>Denah saja</button>
            <button onClick={() => setView('timeline')} className={`rounded-full border px-3 py-1.5 text-xs font-bold ${view === 'timeline' ? 'bg-[var(--ink)] text-[var(--paper)]' : 'border-[var(--line)]'}`}>Timeline saja</button>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-[1240px] px-4 pb-16 sm:px-6">
        {/* HERO */}
        <section className="border-b-2 border-[var(--line)] py-8 sm:py-12">
          <p className="mono text-[11px] font-bold tracking-[0.22em] text-[var(--accent)]">DARI LAHAN KOSONG → PABRIK FULL OTOMATIS WIFI</p>
          <h1 className="mt-4 max-w-[1020px] text-[clamp(2rem,6vw,4.6rem)] font-black leading-[0.92] tracking-tight">Lahan Kosong Bisa Juga Kita Perbaiki dan Upgrade Pabrik Lama Bekas</h1>
          <p className="mt-6 max-w-[980px] text-base leading-relaxed text-[var(--ink-soft)] sm:text-lg wrap">Dari lahan kosong lebar 20 × panjang 100 sampai sistem robotik full otomatis WiFi. Komplit sesuai bahasan yang kita bicarakan dari awal halaman sampai hari ini. Termasuk gate 6M pattern 6+8+6, GSB 10M, taman 10M, garasi juga sebagai access ke gudang besar lebar 6m x panjang 6m, gudang besar lebar 6m x panjang 10m = 60M, gudang kimia reaktif, kantor 4×6, lapang jemuran pelangi, kuali tembaga C110, thermal battery, IPAL 3-stage, cerobong 12M SS304, 5 layer instalasi, dan Meta Model API.</p>
          <div className="mt-6 flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1 rounded-full bg-[var(--teal)] px-3 py-1.5 text-xs font-bold text-white"><Factory size={14} /> Bukan dokumen baru</span>
            <span className="inline-flex items-center gap-1 rounded-full border border-[var(--line)] px-3 py-1.5 text-xs font-bold"><Compass size={14} /> Halaman utama yang digubah</span>
            <span className="inline-flex items-center gap-1 rounded-full border border-[var(--line)] px-3 py-1.5 text-xs font-bold"><Ruler size={14} /> Skala denah 1:200</span>
          </div>
        </section>

        {/* CORRECTIONS */}
        {(view === 'semua' || view === 'timeline') && (
          <section aria-labelledby="koreksi" className="py-8">
            <div className="flex flex-wrap items-end justify-between gap-3"><div><p className="mono text-xs font-bold tracking-[0.2em] text-[var(--red)]">DIBETULKAN DI HALAMAN INI</p><h2 id="koreksi" className="mt-1 text-2xl font-black sm:text-3xl">Angka yang salah, diluruskan.</h2></div><p className="max-w-[420px] text-sm text-[var(--ink-soft)]">Tiga angka ini sering tertukar. Di halaman utama ini, yang dipakai hanya angka yang benar.</p></div>
            <div className="mt-5 grid gap-3 md:grid-cols-3">
              {[
                { t: 'LUAS LAHAN', wrong: '20 × 110 = 2200 m²', right: '20 × 100 = 2000 m²', note: 'Lebar 20 itu sudah pasti. Panjangnya 100, bukan 110.' },
                { t: 'GATE', wrong: '7 + 6 + 7', right: '6 + 8 + 6', note: 'Gate 6M di tengah. Pola pagar 6 + bukaan 8 + pagar 6 = 20M.' },
                { t: 'GUDANG BESAR', wrong: '22M', right: '6 × 10 = 60M', note: 'Lebar 6 m, panjang 10 m. Luasnya 60 meter persegi.' },
              ].map(c => (
                <article key={c.t} className="border-2 border-[var(--line)] bg-[var(--surface)] p-4">
                  <div className="flex items-center justify-between"><h3 className="text-sm font-black tracking-wide">{c.t}</h3><AlertTriangle className="text-[var(--red)]" size={18} /></div>
                  <p className="mt-4 text-sm text-[var(--ink-soft)]"><span className="font-bold text-[var(--red)]">SALAH:</span> <s>{c.wrong}</s></p>
                  <p className="mt-2 flex items-start gap-2 text-lg font-black leading-tight"><CheckCircle2 className="mt-0.5 shrink-0 text-[var(--green)]" size={20} /><span className="wrap">BENAR: {c.right}</span></p>
                  <p className="mt-3 border-t border-dashed border-[var(--line)] pt-3 text-sm leading-relaxed text-[var(--ink-soft)]">{c.note}</p>
                </article>
              ))}
            </div>
          </section>
        )}

        {/* DENAH */}
        {(view === 'semua' || view === 'denah') && (
          <section aria-labelledby="denah" className="border-y-2 border-[var(--line)] py-8">
            <div className="flex flex-wrap items-end justify-between gap-3"><div><p className="mono text-xs font-bold tracking-[0.2em] text-[var(--teal)]">DENAH ARSITEK • PROPORSIONAL • TERUKUR</p><h2 id="denah" className="mt-1 text-2xl font-black sm:text-4xl">Site Plan 20 × 100 Meter</h2></div><p className="mono text-xs font-bold">UTARA / BELAKANG ↑ &nbsp;•&nbsp; JALAN / DEPAN ↓</p></div>

            <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
              {stats.map(s => <div key={s.k} className="border border-[var(--line)] bg-[var(--surface)] p-3"><p className="mono text-[10px] font-bold tracking-widest text-[var(--ink-soft)]">{s.k}</p><p className="mt-1 text-base font-black leading-none sm:text-lg wrap">{s.v}</p><p className="mt-1 text-xs text-[var(--ink-soft)]">{s.s}</p></div>)}
            </div>

            <div className="mt-4 border-2 border-[var(--line)] bg-[var(--surface)]">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--line)] px-3 py-2"><p className="mono text-[11px] font-bold">GAMBAR 01 — SITE PLAN • SKALA 1:200</p><p className="mono text-[11px]">Garis lurus • Kotak terukur • Label meter</p></div>
              <div className="blueprint-grid p-2 sm:p-4"><SitePlan active={active} /></div>
              <div className="grid gap-3 border-t border-[var(--line)] p-3 sm:grid-cols-3">
                <p className="flex gap-2 text-sm leading-relaxed"><MapPin size={18} className="shrink-0 text-[var(--accent)]" /><span><strong>Baca denah:</strong> atas = belakang lahan, bawah = jalan. Kotak grid membantu memeriksa ukuran tiap bangunan.</span></p>
                <p className="flex gap-2 text-sm leading-relaxed"><Warehouse size={18} className="shrink-0 text-[var(--accent)]" /><span><strong>Alur:</strong> Gate → garasi 6×6 → gudang besar 60M. Kantor dan gudang kimia berada di sisi kiri depan area produksi.</span></p>
                <p className="flex gap-2 text-sm leading-relaxed"><Waves size={18} className="shrink-0 text-[var(--accent)]" /><span><strong>Air &amp; asap:</strong> IPAL di ujung kanan, cerobong 12M di tengah area kuali, taman 10M menahan debu jalan.</span></p>
              </div>
            </div>

            <div className="mt-4">
              <p className="mono text-xs font-bold tracking-widest">KETUK ZONA UNTUK MEMFOKUSKAN DENAH</p>
              <div className="mt-2 flex flex-wrap gap-2">
                <button onClick={() => setActive('semua')} className={`rounded-full border px-3 py-1.5 text-xs font-bold ${active === 'semua' ? 'bg-[var(--ink)] text-[var(--paper)]' : 'bg-[var(--surface)]'}`}>Semua zona</button>
                {zones.map(z => <button key={z.id} onClick={() => setActive(z.id)} aria-pressed={active === z.id} className={`rounded-full border px-3 py-1.5 text-xs font-bold ${active === z.id ? 'bg-[var(--accent)] text-white' : 'bg-[var(--surface)]'}`}>{z.label}</button>)}
              </div>
              {activeZone && <p className="mt-3 max-w-[760px] border-l-4 border-[var(--accent)] bg-[var(--surface)] px-3 py-2 text-sm leading-relaxed"><strong>{activeZone.label} —</strong> {activeZone.detail}</p>}
            </div>
          </section>
        )}

        {/* TIMELINE */}
        {(view === 'semua' || view === 'timeline') && (
          <section aria-labelledby="timeline" className="py-10">
            <div className="flex flex-wrap items-end justify-between gap-3"><div><p className="mono text-xs font-bold tracking-[0.2em] text-[var(--accent)]">TIMELINE PEMBAHASAN</p><h2 id="timeline" className="mt-1 text-3xl font-black sm:text-4xl">Awal sampai hari ini, urut 1–7.</h2></div><p className="max-w-[400px] text-sm text-[var(--ink-soft)]">Ketuk judul untuk membuka atau menutup tiap bahasan. Semua kalimat pembahasan ditampilkan utuh.</p></div>
            <div className="relative mt-8 border-l-2 border-[var(--line)]">
              {timeline.map((item, idx) => {
                const isOpen = open.has(item.n);
                return (
                  <article key={item.n} className="relative pb-6 pl-5 sm:pl-8">
                    <span className="absolute -left-[13px] top-0 flex h-6 w-6 items-center justify-center rounded-full border-2 border-[var(--line)] bg-[var(--paper)] text-[10px] font-black">{idx + 1}</span>
                    <div className="border-2 border-[var(--line)] bg-[var(--surface)]">
                      <button onClick={() => toggle(item.n)} aria-expanded={isOpen} className="flex w-full flex-wrap items-center justify-between gap-3 px-4 py-4 text-left">
                        <span className="flex flex-wrap items-center gap-3"><span className="mono text-3xl font-black text-[var(--accent)]">{item.n}</span><span><span className="mono block text-[10px] font-bold tracking-[0.18em] text-[var(--teal)]">{item.tag}</span><span className="block text-lg font-black leading-tight sm:text-xl wrap">{item.title}</span></span></span>
                        <span className="flex items-center gap-1 text-xs font-bold"><span className="hidden sm:inline">{isOpen ? 'Tutup' : 'Buka'}</span><ChevronDown size={18} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} /></span>
                      </button>
                      {isOpen && <div className="border-t border-[var(--line)] px-4 py-4 sm:px-5"><p className="text-[15px] leading-relaxed wrap">{item.body}</p><ul className="mt-4 space-y-2">{item.points.map(p => <li key={p} className="flex gap-2 text-sm leading-relaxed"><ArrowRight size={16} className="mt-0.5 shrink-0 text-[var(--accent)]" /><span className="wrap">{p}</span></li>)}</ul></div>}
                    </div>
                  </article>
                );
              })}
            </div>

            <div className="grid gap-3 md:grid-cols-3">
              <div className="border-2 border-[var(--line)] bg-[var(--teal)] p-4 text-white"><Flame size={22} /><h3 className="mt-2 font-black">Sistem Energi</h3><p className="mt-1 text-sm leading-relaxed">Thermal battery, generator, tungku, dan kettle uap bekerja sebagai satu rantai panas — bukan alat yang berdiri sendiri.</p></div>
              <div className="border-2 border-[var(--line)] bg-[var(--surface)] p-4"><Gauge size={22} className="text-[var(--accent)]" /><h3 className="mt-2 font-black">Sistem Air Tanpa Motor</h3><p className="mt-1 text-sm leading-relaxed">Thermosiphon: panas naik, dingin turun. Tekanan uap pertama mendorong air bersih tanpa pompa.</p></div>
              <div className="border-2 border-[var(--line)] bg-[var(--ink)] p-4 text-[var(--paper)]"><DoorOpen size={22} /><h3 className="mt-2 font-black">Sistem Robotik</h3><p className="mt-1 text-sm leading-relaxed">ESP32-S3 mesh ke laptop 192.168.4.1 dan HP 192.168.4.22. Dashboard sensor, CCTV 14, keamanan 24 jam.</p></div>
            </div>
          </section>
        )}

        <footer className="border-t-2 border-[var(--line)] pt-5">
          <div className="flex flex-wrap items-center justify-between gap-2"><p className="mono text-xs font-bold">HALAMAN UTAMA • TIMELINE HARI INI</p><p className="mono text-xs">LAHAN 2000 m² • GATE 6+8+6 • GUDANG 60M</p></div>
          <p className="mt-3 max-w-[760px] text-sm leading-relaxed text-[var(--ink-soft)]">Halaman ini digubah dari bahasan awal sampai hari ini. Angka denah mengikuti koreksi: lebar 20 m sudah pasti, panjang 100 m, total 2000 m².</p>
        </footer>
      </main>
    </div>
  );
}
