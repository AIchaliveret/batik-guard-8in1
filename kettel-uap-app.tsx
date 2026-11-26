import React, { useEffect, useMemo, useState } from 'react';
import { Activity, AlertTriangle, ArrowDownToLine, ArrowUpFromLine, CheckCircle2, ClipboardCheck, Droplets, Flame, Gauge, Mail, MapPin, Pause, Play, Plus, RefreshCw, Ruler, Thermometer, Trash2, Zap, Wrench } from 'lucide-react';
import img1 from 'container:///mnt/data/src/assets/87ca215d339880b7-image_20261122_172636.webp';
import img2 from 'container:///mnt/data/src/assets/9da1e87aea41911b-image_20261122_170948.webp';
import img3 from 'container:///mnt/data/src/assets/1c4a0073a14d53d6-image_20261122_165527.webp';
import img4 from 'container:///mnt/data/src/assets/c5d9aa286587baf7-image_20261122_161929.webp';

type LogRecord = { id: string; value: any; created_at: string };
type CheckRecord = { id: string; value: any };

async function api(action: string, args: any) {
  const res = await fetch("actions", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ action, args }) });
  const json = await res.json().catch(() => ({}));
  if (!res.ok || json?.error) throw new Error(json?.error || `Gagal memanggil ${action}`);
  return json.data;
}
const keyFor = () => `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
const today = () => new Date().toISOString().slice(0, 10);

const checklistDefaults = [
  { key: 'repo', label: 'Repositori publik GitHub', detail: 'Kode aplikasi, README, dan arsip gambar teknik.' },
  { key: 'demo', label: 'URL demo', detail: 'Tautan demo yang dapat dibuka juri.' },
  { key: 'video', label: 'Video demo', detail: 'Alur kerja agen, pengisian 4 tahap, dan pembacaan alat ukur.' },
  { key: 'cover', label: 'Cover image', detail: 'Gambar sampul kompetisi yang jelas dan terbaca.' },
];

const agents = [
  { no: 'AGEN 01', name: 'Level & Tekanan', icon: Gauge, color: '#0B5A6B', job: 'Menjaga level Tabung Penyimpan dan tekanan kerja 2,5 bar.', rules: ['Isi ulang hanya lewat Tabung Pendukung.', 'Isi saat Sight Glass turun ke 50%. Jangan tunggu 40%.', 'Catat tekanan manual dan sensor pada setiap tahap.'], log: 'Sight Glass dibaca sebelum dan sesudah tiap tahap isi ulang.' },
  { no: 'AGEN 02', name: 'Daur Isi Ulang', icon: RefreshCw, color: '#D96C27', job: 'Membagi 200–300 L air dingin menjadi 4 tahap 50–75 L.', rules: ['Satu tahap 50–75 L lewat pipa 2,5 cm.', 'Jeda antar tahap sampai tekanan kembali stabil.', 'Total harian dicatat, bukan diperkirakan.'], log: 'Tahap dicatat satu per satu; tidak ada pengisian 300 L sekaligus.' },
  { no: 'AGEN 03', name: 'Sirkulasi & Suhu', icon: Thermometer, color: '#9A6700', job: 'Memastikan thermosiphon berjalan tanpa motor.', rules: ['Air dingin yang lebih berat turun dan mendorong sirkulasi.', 'Air panas yang lebih ringan naik ke ruang uap.', 'Periksa beda tinggi pusat ke pusat 1,2 m tetap terjaga.'], log: 'Sirkulasi diamati dari perubahan suhu, tekanan, dan level.' },
  { no: 'AGEN 04', name: 'Listrik & Logbook', icon: Zap, color: '#1E7A4C', job: 'Mengamankan keluaran turbin–alternator dan arsip harian.', rules: ['Target turbin Francis sampai 2.800 rpm.', 'Target alternator truk DC 2.400–3.000 Watt.', 'Setiap kejadian dicatat di log observasi.'], log: 'Logbook menjadi bukti kerja, bukan sekadar catatan tambahan.' },
];

const figures = [
  { src: img1, title: 'Gambar 1 — Arsip teknik lapangan', text: 'Dokumentasi visual untuk memeriksa rakitan, sambungan, dan posisi komponen sebelum pengujian. Gunakan sebagai pembanding saat perakitan di bengkel.' },
  { src: img2, title: 'Gambar 2 — Arsip teknik lapangan', text: 'Dokumentasi visual untuk menelusuri jalur pipa, kran, dan titik pengamatan. Cocokkan dengan denah dan keterangan pipa 2,5 cm.' },
  { src: img3, title: 'Gambar 3 — Arsip teknik lapangan', text: 'Dokumentasi visual untuk memeriksa kondisi tungku, kuali, dan ruang kerja. Perhatikan jarak aman dan akses perawatan.' },
  { src: img4, title: 'Gambar 4 — Arsip teknik lapangan', text: 'Dokumentasi visual untuk memeriksa susunan tabung, rangka, dan jalur sirkulasi. Cocokkan beda tinggi pusat ke pusat 1,2 m.' },
];

const stages = [
  { n: 1, time: '07.00', volume: '50–75 L', note: 'Mulai kerja. Baca Sight Glass sebelum isi.' },
  { n: 2, time: '09.30', volume: '50–75 L', note: 'Isi setelah tekanan stabil dari tahap 1.' },
  { n: 3, time: '12.00', volume: '50–75 L', note: 'Periksa sirkulasi dan suhu sebelum isi.' },
  { n: 4, time: '14.30', volume: '50–75 L', note: 'Tahap terakhir. Tutup log harian setelahnya.' },
];

function Bar({ label, value, max, unit, good }: { label: string; value: number; max: number; unit: string; good: string }) {
  const pct = Math.max(0, Math.min(100, (value / max) * 100));
  return <div>
    <div className="flex items-end justify-between gap-2"><span className="text-sm font-bold">{label}</span><span className="mono text-xl font-semibold">{value}<span className="text-xs text-[var(--muted)]"> {unit}</span></span></div>
    <div className="gauge-track mt-2"><div className="gauge-fill" style={{ width: `${pct}%`, background: 'var(--primary)' }} /></div>
    <div className="mt-1 text-xs text-[var(--muted)]">{good}</div>
  </div>;
}

export default function App() {
  const [simOn, setSimOn] = useState(true);
  const [support, setSupport] = useState(80);
  const [storageLevel, setStorageLevel] = useState(58);
  const [pressure, setPressure] = useState(2.4);
  const [rpm, setRpm] = useState(2360);
  const [watt, setWatt] = useState(2610);
  const [temp, setTemp] = useState(158);
  const [doneStage, setDoneStage] = useState(0);
  const [logs, setLogs] = useState<LogRecord[]>([]);
  const [checks, setChecks] = useState<CheckRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [apiNote, setApiNote] = useState('');
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<{ saved: number; remaining: number; error: string | null; reloadError: string | null } | null>(null);
  const [form, setForm] = useState({ date: today(), stage: 'Tahap 1', pressure: '2,5', level: '58', rpm: '2360', watt: '2610', note: '' });
  const [activeFigure, setActiveFigure] = useState(0);

  const reloadRecords = async () => {
    const [l, c] = await Promise.all([api("records.list", { collection: "observation_logs" }), api("records.list", { collection: "submission_checklist" })]);
    setLogs(l?.records || []);
    setChecks(c?.records || []);
  };

  useEffect(() => {
    reloadRecords().then(() => setLoading(false)).catch((e) => { setApiNote('Pratinjau: penyimpanan belum dapat dihubungi. Data yang dimasukkan belum tersimpan.'); setLoading(false); });
  }, []);

  useEffect(() => {
    if (!simOn) return;
    const t = window.setInterval(() => {
      setStorageLevel(v => Math.max(48, Math.min(64, v + (Math.random() - 0.52) * 1.1)));
      setPressure(v => Math.max(2.1, Math.min(2.7, +(v + (Math.random() - 0.5) * 0.06).toFixed(2))));
      setRpm(v => Math.max(2050, Math.min(2800, Math.round(v + (Math.random() - 0.48) * 55))));
      setWatt(v => Math.max(2400, Math.min(3000, Math.round(v + (Math.random() - 0.5) * 55))));
      setTemp(v => Math.max(145, Math.min(172, Math.round(v + (Math.random() - 0.5) * 3))));
    }, 2200);
    return () => window.clearInterval(t);
  }, [simOn]);

  const status = useMemo(() => {
    if (pressure >= 2.8) return { label: 'PERIKSA SAFETY VALVE', cls: 'bg-[var(--danger-soft)] text-[var(--danger)]' };
    if (storageLevel <= 50) return { label: 'SIAP ISI ULANG', cls: 'bg-[var(--warn-soft)] text-[var(--warn)]' };
    if (pressure >= 2.2 && pressure <= 2.7) return { label: 'STABIL · 2,5 BAR', cls: 'bg-[var(--ok-soft)] text-[var(--ok)]' };
    return { label: 'PANTAU', cls: 'bg-[var(--warn-soft)] text-[var(--warn)]' };
  }, [pressure, storageLevel]);

  const checkByKey = (k: string) => checks.find(x => x.value?.key === k);
  const doneCount = checklistDefaults.filter(d => checkByKey(d.key)?.value?.done).length;

  async function toggleCheck(item: typeof checklistDefaults[number]) {
    setBusy(true); setResult(null);
    const existing = checkByKey(item.key);
    try {
      if (existing) await api("records.replace", { collection: "submission_checklist", id: existing.id, value: { ...existing.value, done: !existing.value.done, updated_label: item.label } });
      else await api("records.create", { collection: "submission_checklist", value: { key: item.key, label: item.label, done: true }, idempotency_key: keyFor() });
      await reloadRecords();
    } catch (e) { setApiNote(e instanceof Error ? e.message : 'Gagal menyimpan checklist.'); }
    setBusy(false);
  }

  async function submitLog(e: React.FormEvent) {
    e.preventDefault();
    const row = { date: form.date, stage: form.stage, pressure: form.pressure, level: form.level, rpm: form.rpm, watt: form.watt, note: form.note.trim() };
    const rows = [row];
    setBusy(true); let saved = 0; let error: string | null = null;
    try { for (const r of rows) { await api("records.create", { collection: "observation_logs", value: r, idempotency_key: keyFor() }); saved += 1; } } catch (err) { error = err instanceof Error ? err.message : String(err); }
    let reloadError: string | null = null;
    try { await reloadRecords(); } catch (err) { reloadError = err instanceof Error ? err.message : String(err); }
    setResult({ saved, remaining: rows.length - saved, error, reloadError }); setBusy(false);
    if (!error) setForm({ ...form, note: '' });
  }

  async function deleteLog(id: string) {
    setBusy(true);
    try { await api("records.delete", { collection: "observation_logs", id }); await reloadRecords(); } catch (e) { setApiNote(e instanceof Error ? e.message : 'Gagal menghapus log.'); }
    setBusy(false);
  }

  async function markStage(n: number) {
    setDoneStage(n); setSupport(v => Math.min(92, v + 8)); setStorageLevel(v => Math.min(64, v + 7)); setPressure(v => Math.min(2.7, +(v + 0.08).toFixed(2)));
    setBusy(true);
    try { await api("records.create", { collection: "observation_logs", value: { date: today(), stage: `Tahap ${n}`, pressure: String(pressure), level: String(Math.round(storageLevel)), rpm: String(rpm), watt: String(watt), note: `Tahap ${n} selesai. Isi 50–75 L lewat Tabung Pendukung.` }, idempotency_key: keyFor() }); await reloadRecords(); } catch (e) { setApiNote('Tahap ditandai di layar, tetapi log otomatis belum tersimpan.'); }
    setBusy(false);
  }

  return (
    <div data-safe-area-inset-root style={{ boxSizing: 'border-box', paddingTop: 'var(--safe-area-inset-top)' }} className="min-h-screen bg-[var(--bg)] text-[var(--ink)] overflow-x-clip">
      <header data-safe-area-sticky-top style={{ top: 'var(--safe-area-inset-top)' }} className="sticky z-20 border-b border-[var(--line)] bg-[var(--bg)]/95 backdrop-blur">
        <div className="mx-auto flex max-w-[1240px] flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <div className="flex items-center gap-3"><div className="grid h-10 w-10 place-items-center rounded bg-[var(--primary)] text-white"><Flame size={22} /></div><div><p className="text-[11px] font-extrabold tracking-[0.18em] text-[var(--primary)]">PRACTICAL APPLICATION · AUTONOMOUS MANUFACTURING</p><p className="text-lg font-black leading-tight">Kettel Uap Plan B</p></div></div>
          <div className="flex flex-wrap items-center gap-2"><span className="chip bg-[var(--primary)] text-white">SKALA 1:100</span><span className="chip border border-[var(--line-2)]">SATUAN m & cm</span><a href="mailto:asuvelaikha@gmail.com" target="_blank" rel="noopener" className="chip bg-[var(--accent-soft)] text-[var(--accent)]"><Mail size={14} /> asuvelaikha@gmail.com</a></div>
        </div>
      </header>

      <main className="mx-auto max-w-[1240px] px-4 pb-16 sm:px-6">
        <section aria-label="Repositori gabungan" className="mt-5 grid gap-3 md:grid-cols-2">
          <article className="rounded-xl border border-[var(--line)] bg-[var(--surface)] p-4">
            <p className="chip bg-[var(--primary)] text-white">REPO 2 · SENSOR &amp; PELAKSANA LAPANGAN</p>
            <h3 className="mt-2 font-black leading-snug [overflow-wrap:anywhere]"><a href="https://github.com/AIchaliveret/batik-guard-8in1" target="_blank" rel="noopener" className="underline decoration-[var(--primary)] underline-offset-4">GitHub - AIchaliveret/batik-guard-8in1: IR SUPER BATIK GUARD 8-in-1 - 20x110M Autonomous Factory - Muse Spark Open 1026 + Modal</a></h3>
            <a href="https://github.com/AIchaliveret/batik-guard-8in1" target="_blank" rel="noopener" className="mt-2 inline-flex rounded-full bg-[var(--primary)] px-4 py-2 text-sm font-bold text-white">Buka repositori Repo 2 →</a>
          </article>
          <article className="rounded-xl border border-[var(--line)] bg-[var(--surface)] p-4">
            <p className="chip bg-[var(--accent)] text-white">REPO 1 · ALAT OBSERVASI &amp; KENDALI</p>
            <h3 className="mt-2 font-black leading-snug [overflow-wrap:anywhere]"><a href="https://github.com/asuveleikha-ai/praktek.aplikasi_autonomouse-batik" target="_blank" rel="noopener" className="underline decoration-[var(--primary)] underline-offset-4">GitHub - asuveleikha-ai/praktek.aplikasi_autonomouse-batik: Game Milimeter Blok - Desain Pabrik Batik 20x100m | Studio 2D/3D AutoCAD | Asyraf Eleka | Industrial Intelligent</a></h3>
            <a href="https://github.com/asuveleikha-ai/praktek.aplikasi_autonomouse-batik" target="_blank" rel="noopener" className="mt-2 inline-flex rounded-full bg-[var(--primary)] px-4 py-2 text-sm font-bold text-white">Buka repositori Repo 1 →</a>
          </article>
        </section>
        <section id="observasi-bukan-game" className="mt-5 rounded-2xl border-2 border-[var(--primary)] bg-[var(--surface)] p-5 sm:p-7">
          <p className="mono text-xs font-bold tracking-[0.18em] text-[var(--primary)]">01 · PERNYATAAN APLIKASI</p>
          <h1 className="mt-2 text-[clamp(1.8rem,5vw,3.2rem)] font-black leading-[0.98] tracking-tight">OBSERVASI BUKAN GAME</h1>
          <p className="mt-3 max-w-[860px] text-base leading-relaxed text-[var(--muted)]">Ini adalah alat observasi nyata untuk pabrik batik. Bukan permainan. Tidak ada skor, tidak ada poin, dan tidak ada level permainan. Setiap angka di dashboard adalah hasil observasi yang menentukan apakah kuali 600–750 L dapat uap atau tidak.</p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-xl border border-[var(--line)] bg-[var(--surface-2)] p-4"><p className="mono text-2xl font-bold">350 L air</p><p className="mt-1 text-sm leading-relaxed text-[var(--muted)]">Level air observasi: Tabung Pendukung 200 L + Tabung Penyimpan 150 L. Level di sini adalah tinggi air, bukan level permainan.</p></div>
            <div className="rounded-xl border border-[var(--line)] bg-[var(--surface-2)] p-4"><p className="mono text-2xl font-bold">2,5 bar</p><p className="mt-1 text-sm leading-relaxed text-[var(--muted)]">Tekanan kerja yang dibaca dari Pressure Gauge / Manometer Bourdon dan Pressure Sensor.</p></div>
            <div className="rounded-xl border border-[var(--line)] bg-[var(--surface-2)] p-4"><p className="mono text-2xl font-bold">2.800 rpm</p><p className="mt-1 text-sm leading-relaxed text-[var(--muted)]">Turbin Francis sampai 2.800 rpm. Alternator Truk DC 2.400–3.000 Watt.</p></div>
            <div className="rounded-xl border border-[var(--line)] bg-[var(--surface-2)] p-4"><p className="mono text-2xl font-bold">200–300 L / hari</p><p className="mt-1 text-sm leading-relaxed text-[var(--muted)]">Daur isi ulang harian dibagi 4 tahap, masing-masing 50–75 L. Bukan target skor.</p></div>
            <div className="rounded-xl border border-[var(--line)] bg-[var(--surface-2)] p-4"><p className="mono text-2xl font-bold">Isi ulang 50%</p><p className="mt-1 text-sm leading-relaxed text-[var(--muted)]">Isi saat Sight Glass turun ke 50%. Jangan tunggu 40%. Ini ambang observasi, bukan penalti game.</p></div>
            <div className="rounded-xl border border-[var(--line)] bg-[var(--surface-2)] p-4"><p className="mono text-2xl font-bold">Bukti = log</p><p className="mt-1 text-sm leading-relaxed text-[var(--muted)]">Setiap keputusan meninggalkan log observasi harian yang dapat diperiksa.</p></div>
          </div>
          <p className="mt-5 rounded-xl bg-[var(--primary-2)] p-4 text-sm leading-relaxed text-white"><strong>Observasi ini tidak ada orang lain yang punya, hanya kita yang punya.</strong> Logbook observasi Kettel Uap Plan B ini dibangun dari konfigurasi terkunci kita, bukan dari template permainan.</p>
        </section>

        <section id="kendali-maintenance" className="mt-5 rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-5 sm:p-7">
          <p className="mono text-xs font-bold tracking-[0.18em] text-[var(--accent)]">02 · PRODUK PURNA JUAL</p>
          <h2 className="mt-2 text-[clamp(1.8rem,5vw,3.2rem)] font-black leading-[0.98] tracking-tight">ALAT KENDALI DAN MAINTENANCE PURNA JUAL</h2>
          <p className="mt-3 max-w-[860px] text-base leading-relaxed text-[var(--muted)]">Ini yang dijual terpisah dari mesinnya. Mesin Autonomous Manufacturing Batik dijual sebagai hardware + sistem. Observasi ini dijual sebagai Alat Kendali dan Maintenance Purna Jual.</p>
          <div className="mt-5 grid gap-3 md:grid-cols-2">
            <div className="rounded-xl border border-[var(--line)] p-4"><p className="font-black">Pantau dari jauh</p><p className="mt-1 text-sm leading-relaxed text-[var(--muted)]">Level air, tekanan, suhu, RPM, dan Watt dibaca dan dicatat sebagai observasi harian, bukan sebagai hiburan.</p></div>
            <div className="rounded-xl border border-[var(--line)] p-4"><p className="font-black">Alarm observasi</p><p className="mt-1 text-sm leading-relaxed text-[var(--muted)]">Alarm jika Sight Glass turun ke 50 persen. Alarm jika tekanan turun dari patokan kerja 2,5 bar.</p></div>
            <div className="rounded-xl border border-[var(--line)] p-4"><p className="font-black">Jadwalkan maintenance</p><p className="mt-1 text-sm leading-relaxed text-[var(--muted)]">Jadwal perawatan dicatat dari riwayat kerja nyata, bukan dari misi atau misi harian permainan.</p></div>
            <div className="rounded-xl border border-[var(--line)] p-4"><p className="font-black">Catat riwayat isi ulang</p><p className="mt-1 text-sm leading-relaxed text-[var(--muted)]">Setiap tahap 50–75 L dicatat satu per satu. Total harian 200–300 L dapat ditelusur.</p></div>
          </div>
          <div className="mt-4 rounded-xl bg-[var(--warn-soft)] p-4"><p className="font-black">Prediksi penggantian komponen</p><p className="mt-1 text-sm leading-relaxed">Dari riwayat observasi, tim maintenance dapat memprediksi kapan shock drat, pipa 2,5 cm, Pressure Gauge, dan Solenoid Valve perlu diperiksa atau diganti. Ini yang bikin pelanggan tetap bayar setelah mesin terjual — karena mesin tetap aman, terukur, dan terawat.</p></div>
        </section>

        <section id="harga-terpisah" className="mt-5 rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-5 sm:p-7">
          <p className="mono text-xs font-bold tracking-[0.18em] text-[var(--primary)]">03 · PENAWARAN JUAL TERPISAH</p>
          <h2 className="mt-2 text-[clamp(1.8rem,5vw,3.2rem)] font-black leading-[0.98] tracking-tight">HARGA BEDA — JUAL TERPISAH</h2>
          <p className="mt-3 max-w-[860px] text-base leading-relaxed text-[var(--muted)]">Jangan dicampur. Observasi ini produk sendiri, margin sendiri, promosi sendiri. Dua penawaran di bawah ini terpisah: satu untuk mesin, satu untuk alat kendali dan observasi.</p>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <article className="rounded-2xl border-2 border-[var(--primary)] p-5">
              <p className="chip bg-[var(--primary)] text-white">HARGA 1 · PAKET TERPISAH</p>
              <h3 className="mt-3 text-xl font-black leading-snug">Autonomous Manufacturing Batik</h3>
              <p className="mt-1 text-sm font-bold text-[var(--muted)]">Harga mesin + instalasi — penawaran terpisah dari Harga 2.</p>
              <ul className="mt-4 space-y-2 text-sm leading-relaxed text-[var(--muted)]">
                <li>• Kettel Uap 500 L Plan B: Pendukung 250 L + Penyimpan 250 L</li>
                <li>• Pipa 5 cm ke 2,5 cm dengan reducer</li>
                <li>• Tungku 0,95 m × 0,95 m</li>
                <li>• Denah 20 m: 1–6 m kettel, 6–10 m tungku, 10–12 m jalan 2 m, 12–20 m ruang lainnya</li>
                <li>• Instalasi sesuai spesifikasi terkunci Plan B</li>
              </ul>
              <p className="mt-4 rounded-lg bg-[var(--surface-2)] p-3 text-sm"><strong>Harga mesin dihitung terpisah.</strong> Hubungi <a className="font-bold text-[var(--primary)] underline" href="mailto:asuvelaikha@gmail.com" target="_blank" rel="noopener">asuvelaikha@gmail.com</a> untuk penawaran mesin + instalasi.</p>
            </article>
            <article className="rounded-2xl border-2 border-[var(--accent)] p-5">
              <p className="chip bg-[var(--accent)] text-white">HARGA 2 · PAKET TERPISAH</p>
              <h3 className="mt-3 text-xl font-black leading-snug">Observasi Control &amp; Maintenance</h3>
              <p className="mt-1 text-sm font-bold text-[var(--muted)]">Harga alat kendali + langganan observasi + purna jual — penawaran terpisah dari Harga 1.</p>
              <ul className="mt-4 space-y-2 text-sm leading-relaxed text-[var(--muted)]">
                <li>• Alat kendali observasi untuk Kettel Uap Plan B</li>
                <li>• Langganan observasi: dashboard, alarm, dan logbook harian</li>
                <li>• Maintenance purna jual: jadwal, riwayat isi ulang, dan prediksi penggantian komponen</li>
                <li>• 4 agen otonom: Level &amp; Tekanan, Daur Isi Ulang, Sirkulasi &amp; Suhu, Listrik &amp; Logbook</li>
              </ul>
              <p className="mt-4 rounded-lg bg-[var(--accent-soft)] p-3 text-sm"><strong>Harga observasi dihitung terpisah dari harga mesin.</strong> Pelanggan dapat membeli mesin saja, observasi saja untuk mesin yang sudah ada, atau keduanya dengan dua penawaran yang tidak dicampur.</p>
            </article>
          </div>
          <p className="mt-5 rounded-xl bg-[var(--primary-2)] p-4 text-sm leading-relaxed text-white"><strong>Observasi ini hanya kita yang punya, tidak ada kompetitor yang punya logbook observasi Kettel Uap Plan B</strong> dengan 3 tingkat, bibir 60 persen, beda tinggi 1,2 m, dan daur isi ulang 4 tahap ini.</p>
        </section>

        <section className="blueprint-grid mt-5 overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--surface)]">
          <div className="grid gap-0 lg:grid-cols-[1.15fr_.85fr]">
            <div className="p-5 sm:p-8">
              <p className="mono text-xs font-semibold tracking-[0.18em] text-[var(--accent)]">AGENT STACK 48 · 11–13 DES 2026 · 48 JAM ONLINE</p>
              <h1 className="mt-3 text-[clamp(2rem,6vw,4.2rem)] font-black leading-[0.92] tracking-tight">Uap yang bekerja<br /><span className="text-[var(--primary)]">sendiri, terukur,</span><br />dan bisa dipertanggungjawabkan.</h1>
              <p className="mt-4 max-w-[620px] text-base leading-relaxed text-[var(--muted)]">Sistem terkunci untuk tukang dan juri: dua tabung 250 L, satu jalur isi ulang, satu aturan tekanan, dan empat agen yang mencatat setiap keputusan.</p>
              <div className="mt-5 flex flex-wrap gap-2"><a href="#dashboard" className="rounded-full bg-[var(--primary)] px-4 py-2.5 text-sm font-bold text-white">Buka dashboard</a><a href="#arsitektur" className="rounded-full border border-[var(--line-2)] px-4 py-2.5 text-sm font-bold">Arsitektur Gabungan</a><a href="#submission" className="rounded-full border border-[var(--line-2)] px-4 py-2.5 text-sm font-bold">Submission Agent Stack 48</a><a href="#checklist" className="rounded-full border border-[var(--line-2)] px-4 py-2.5 text-sm font-bold">Checklist submission</a><a href="#gambar" className="rounded-full border border-[var(--line-2)] px-4 py-2.5 text-sm font-bold">Lihat 4 gambar teknik</a></div>
              <div className="mt-3 flex flex-wrap gap-2"><a href="https://github.com/AIchaliveret/batik-guard-8in1" target="_blank" rel="noopener" className="rounded-full bg-[var(--accent-soft)] px-4 py-2 text-sm font-bold text-[var(--accent)]">Repo 2 · Sensor &amp; Pelaksana Lapangan</a><a href="https://github.com/asuveleikha-ai/praktek.aplikasi_autonomouse-batik" target="_blank" rel="noopener" className="rounded-full bg-[var(--accent-soft)] px-4 py-2 text-sm font-bold text-[var(--accent)]">Repo 1 · Alat Observasi &amp; Kendali</a></div>
              <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4"><div className="border-t-2 border-[var(--primary)] pt-2"><p className="mono text-2xl font-bold">1.000 L</p><p className="text-xs text-[var(--muted)]">Total sistem</p></div><div className="border-t-2 border-[var(--accent)] pt-2"><p className="mono text-2xl font-bold">350 L</p><p className="text-xs text-[var(--muted)]">Air di kettel</p></div><div className="border-t-2 border-[var(--ok)] pt-2"><p className="mono text-2xl font-bold">2,5 bar</p><p className="text-xs text-[var(--muted)]">Tekanan target</p></div><div className="border-t-2 border-[var(--warn)] pt-2"><p className="mono text-2xl font-bold">4 tahap</p><p className="text-xs text-[var(--muted)]">Daur isi ulang</p></div></div>
            </div>
            <aside className="border-t border-[var(--line)] bg-[var(--primary-2)] p-5 text-white sm:p-7 lg:border-l lg:border-t-0">
              <p className="text-xs font-extrabold tracking-[0.18em] text-[#9ED9E3]">KOMPETISI</p><h2 className="mt-2 text-2xl font-black leading-tight">Agent Stack 48 AI Agents Hackathon</h2><p className="mt-2 text-sm leading-relaxed text-white/80">lablab.build · 11–13 Desember 2026 · 48 jam · online</p>
              <div className="mt-5 space-y-3"><div className="rounded-lg bg-white/10 p-3"><p className="text-xs font-bold text-[#FFD8A8]">TRACK 01</p><p className="text-sm font-bold">Specialized AI Agents</p></div><div className="rounded-lg bg-white/10 p-3"><p className="text-xs font-bold text-[#FFD8A8]">TRACK 02</p><p className="text-sm font-bold">Tools &amp; Toolkits</p></div></div>
              <p className="mt-5 border-t border-white/20 pt-4 text-sm">Kontak: <a className="font-bold underline" href="mailto:asuvelaikha@gmail.com" target="_blank" rel="noopener">asuvelaikha@gmail.com</a></p>
            </aside>
          </div>
        </section>

        <section id="dashboard" className="mt-8 grid gap-5 lg:grid-cols-[1fr_.92fr]">
          <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-5 sm:p-6">
            <div className="flex flex-wrap items-start justify-between gap-3"><div><p className="mono text-xs font-bold tracking-widest text-[var(--primary)]">01 / DASHBOARD OPERASI</p><h2 className="mt-1 text-2xl font-black">Ruang kendali, satu pandangan</h2></div><div className="flex items-center gap-2"><span className={`chip ${status.cls}`}><Activity size={14} />{status.label}</span><button onClick={() => setSimOn(v => !v)} className="inline-flex items-center gap-1.5 rounded-full border border-[var(--line-2)] px-3 py-1.5 text-xs font-bold">{simOn ? <><Pause size={14} /> Jeda simulasi</> : <><Play size={14} /> Jalan simulasi</>}</button></div></div>
            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <Bar label="Tabung Pendukung · 250 L" value={Math.round(support * 2.5)} max={250} unit="L" good={`Level ${Math.round(support)}% · isi 80% = 200 L · ruang uap 50 L`} />
              <Bar label="Tabung Penyimpan · 250 L" value={Math.round(storageLevel * 2.5)} max={250} unit="L" good={`Level ${Math.round(storageLevel)}% · isi 60% = 150 L · ruang uap 100 L`} />
              <Bar label="Tekanan kerja" value={pressure} max={3.2} unit="bar" good="Target 2,5 bar · baca Bourdon + transmitter" />
              <Bar label="Suhu sirkulasi" value={temp} max={200} unit="°C" good="Thermosiphon · tanpa motor" />
              <Bar label="Turbin Francis" value={rpm} max={2800} unit="rpm" good="Maksimum 2.800 rpm" />
              <Bar label="Alternator Truk DC" value={watt} max={3000} unit="W" good="Rentang 2.400–3.000 Watt" />
            </div>
            <div className="mt-6 rounded-xl bg-[var(--surface-2)] p-4"><p className="flex items-center gap-2 text-sm font-bold"><AlertTriangle size={17} className="text-[var(--warn)]" /> Aturan kunci</p><p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">Isi ulang hanya lewat Tabung Pendukung. Isi saat Sight Glass turun ke <strong className="text-[var(--ink)]">50%</strong>, jangan tunggu <strong className="text-[var(--ink)]">40%</strong>. Satu tahap 50–75 L, lewat pipa 2,5 cm.</p></div>
          </div>

          <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-5 sm:p-6">
            <p className="mono text-xs font-bold tracking-widest text-[var(--accent)]">02 / KONFIGURASI TERKUNCI</p><h2 className="mt-1 text-2xl font-black">Kettel Uap Plan B Final</h2>
            <div className="mt-5 space-y-3">
              <div className="flex gap-3 border-b border-[var(--line)] pb-3"><Droplets className="shrink-0 text-[var(--primary)]" /><div><p className="font-bold">500 L kettel uap</p><p className="text-sm text-[var(--muted)]">250 L Tabung Pendukung + 250 L Tabung Penyimpan Bertekanan Tinggi.</p></div></div>
              <div className="flex gap-3 border-b border-[var(--line)] pb-3"><Ruler className="shrink-0 text-[var(--primary)]" /><div><p className="font-bold">Toren Plastik Air Dingin 500 L</p><p className="text-sm text-[var(--muted)]">Hanya untuk pengisian awal. Bukan bagian kettel bertekanan.</p></div></div>
              <div className="flex gap-3 border-b border-[var(--line)] pb-3"><Wrench className="shrink-0 text-[var(--primary)]" /><div><p className="font-bold">Dinding plat SS304 · 2–3 mm</p><p className="text-sm text-[var(--muted)]">Sight Glass kaca borosilikat dalam bingkai SS304 hanya di Tabung Penyimpan. Tabung Pendukung tanpa Sight Glass; level dari pipa sambungan berjenjang dan overflow.</p></div></div>
              <div className="flex gap-3"><ArrowUpFromLine className="shrink-0 text-[var(--primary)]" /><div><p className="font-bold">Beda tinggi pusat ke pusat 1,2 m</p><p className="text-sm text-[var(--muted)]">Tabung Pendukung bertingkat 3 tingkat. Air dingin turun, air panas naik.</p></div></div>
            </div>
            <div className="mt-5 grid grid-cols-3 gap-2 text-center"><div className="rounded-lg bg-[var(--accent-soft)] p-3"><p className="mono text-lg font-bold">250 L</p><p className="text-[11px]">Pendukung</p></div><div className="rounded-lg bg-[var(--accent-soft)] p-3"><p className="mono text-lg font-bold">250 L</p><p className="text-[11px]">Penyimpan</p></div><div className="rounded-lg bg-[var(--primary)] p-3 text-white"><p className="mono text-lg font-bold">500 L</p><p className="text-[11px]">Toren dingin</p></div></div>
          </div>
        </section>

        <section id="arsitektur" className="mt-8 rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-5 sm:p-6">
          <p className="mono text-xs font-bold tracking-widest text-[var(--primary)]">GABUNGAN / ARSITEKTUR DUA REPO</p>
          <h2 className="mt-1 text-2xl font-black">Arsitektur Gabungan: satu sistem observasi &amp; kendali</h2>
          <p className="mt-2 max-w-[820px] text-sm leading-relaxed text-[var(--muted)]">Repo 1 dan Repo 2 bukan dua aplikasi yang berjalan sendiri-sendiri. Repo 2 berada di lapangan sebagai sensor dan pelaksana, Repo 1 berada di atasnya sebagai alat observasi, pemantau, dan pengendali. Keputusan selalu kembali ke lapangan dalam bentuk perintah yang bisa dicek di log.</p>
          <div className="mt-5 grid gap-3 md:grid-cols-5">
            <div className="rounded-xl bg-[var(--primary)] p-4 text-white"><p className="mono text-xs font-bold">LANGKAH 1</p><p className="mt-1 font-black">Repo 2 · Sensor membaca lapangan</p><p className="mt-1 text-sm text-white/85">Level, tekanan, suhu, warna naphthol, CO₂, NOx, dan arus dibaca dari Kettel Uap 500 L.</p></div>
            <div className="grid place-items-center text-2xl font-black text-[var(--primary)]" aria-hidden="true">→</div>
            <div className="rounded-xl border border-[var(--line)] bg-[var(--surface-2)] p-4"><p className="mono text-xs font-bold text-[var(--primary)]">LANGKAH 2</p><p className="mt-1 font-black">Data dikirim ke Repo 1</p><p className="mt-1 text-sm text-[var(--muted)]">Pembacaan ditampilkan di dashboard observasi dan dibandingkan dengan patokan Plan B: 2,5 bar, isi ulang 50%, dan daur 4 tahap.</p></div>
            <div className="grid place-items-center text-2xl font-black text-[var(--primary)]" aria-hidden="true">→</div>
            <div className="rounded-xl bg-[var(--accent)] p-4 text-white"><p className="mono text-xs font-bold">LANGKAH 3</p><p className="mt-1 font-black">Repo 1 memutuskan &amp; memerintah</p><p className="mt-1 text-sm text-white/90">Repo 1 memerintahkan kembali ke Repo 2: buka/tutup solenoid valve dan relay. Setiap perintah dicatat di log observasi harian.</p></div>
          </div>
          <div className="mt-5 grid gap-5 lg:grid-cols-2">
            <div><h3 className="font-black">Repo 2 · Sensor dan pelaksana lapangan</h3><p className="mt-1 text-sm text-[var(--muted)]">IR SUPER BATIK GUARD 8-in-1 · Pabrik otonom 20 × 110 m.</p><div className="mt-3 overflow-x-auto"><table className="w-full min-w-[520px] border-collapse text-left text-sm"><thead><tr className="border-b-2 border-[var(--line-2)]"><th className="py-2 pr-3">Sensor / inti</th><th className="py-2">Yang dibaca / dikendalikan</th></tr></thead><tbody><tr className="border-b border-[var(--line)]"><td className="py-2 pr-3 font-bold">ESP32-S3</td><td className="py-2">Pengendali lapangan &amp; pembaca sensor</td></tr><tr className="border-b border-[var(--line)]"><td className="py-2 pr-3 font-bold">IMX219 8MP</td><td className="py-2">Kamera observasi visual &amp; warna</td></tr><tr className="border-b border-[var(--line)]"><td className="py-2 pr-3 font-bold">HX711 5 kg &amp; 50 kg</td><td className="py-2">Timbangan / beban</td></tr><tr className="border-b border-[var(--line)]"><td className="py-2 pr-3 font-bold">SHT41</td><td className="py-2">Suhu &amp; kelembapan</td></tr><tr className="border-b border-[var(--line)]"><td className="py-2 pr-3 font-bold">MLX90640 32×24</td><td className="py-2">Pemetaan termal Kettel Uap 500 L, 2,5 bar, 90 kg/jam</td></tr><tr className="border-b border-[var(--line)]"><td className="py-2 pr-3 font-bold">NDIR CO₂ 800 ppm</td><td className="py-2">Kadar CO₂, ambang pantau 800 ppm</td></tr><tr className="border-b border-[var(--line)]"><td className="py-2 pr-3 font-bold">MQ-135 NOx</td><td className="py-2">Gas NOx</td></tr><tr className="border-b border-[var(--line)]"><td className="py-2 pr-3 font-bold">SCT-013 current</td><td className="py-2">Arus listrik turbin–alternator</td></tr><tr><td className="py-2 pr-3 font-bold">Solenoid valve + relay</td><td className="py-2">Aktuator: membuka/menutup aliran dan beban dari perintah Repo 1</td></tr></tbody></table></div><p className="mt-3 text-sm">Live Demo Repo 2: <a className="font-bold text-[var(--primary)] underline" href="https://alchaliveret.github.io/batik-guard-8in1/" target="_blank" rel="noopener">alchaliveret.github.io/batik-guard-8in1</a></p></div>
            <div><h3 className="font-black">Repo 1 · Alat observasi, pemantau, dan pengendali</h3><p className="mt-1 text-sm text-[var(--muted)]">Game Milimeter Blok — Desain Pabrik Batik 20 × 100 m · Studio 2D/3D AutoCAD · Practical Application SaaS System for Market Intelligence &amp; Decision Support.</p><div className="mt-3 space-y-3"><div className="rounded-xl border border-[var(--line)] p-4"><p className="font-bold">1 · Neural</p><p className="text-sm text-[var(--muted)]">Mengolah pembacaan sensor menjadi pola: kapan tekanan mulai turun, kapan sirkulasi melemah, dan kapan isi ulang harus disiapkan.</p></div><div className="rounded-xl border border-[var(--line)] p-4"><p className="font-bold">2 · Classic Podcast</p><p className="text-sm text-[var(--muted)]">Menjelaskan cara kerja sistem dengan bahasa tukang: apa yang dilihat, apa artinya, dan apa yang harus dilakukan berikutnya.</p></div><div className="rounded-xl border border-[var(--line)] p-4"><p className="font-bold">3 · Teknis Pabrik Information</p><p className="text-sm text-[var(--muted)]">Menyimpan patokan terkunci Plan B: denah lebar 20 m, pipa, beda tinggi 1,2 m, daur isi ulang, dan panduan instalasi.</p></div><div className="rounded-xl border border-[var(--line)] p-4"><p className="font-bold">4 · Laporan &amp; Akuntabilitas</p><p className="text-sm text-[var(--muted)]">Mengubah pengamatan menjadi bukti: dashboard, laporan, kontrak, peralatan, dan tabel observasi harian di bawah.</p></div></div><div className="mt-4 rounded-xl bg-[var(--warn-soft)] p-4"><p className="font-bold">Aturan kendali yang tidak berubah</p><p className="mt-1 text-sm leading-relaxed">Perintah isi ulang hanya lewat Tabung Pendukung. Isi saat Sight Glass turun ke 50%, jangan tunggu 40%. Satu tahap 50–75 L lewat pipa 2,5 cm, jeda sampai tekanan stabil, lalu catat.</p></div><p className="mt-3 text-sm">Menjalankan Repo 1: <code className="rounded bg-[var(--surface-2)] px-2 py-1">streamlit run app.py</code>, lalu buka Web <code className="rounded bg-[var(--surface-2)] px-2 py-1">index.html</code>.</p></div>
          </div>
          <div className="mt-5 rounded-xl border border-[var(--line)] p-4"><p className="font-bold">Aliran data dalam satu kalimat</p><p className="mt-1 text-sm leading-relaxed text-[var(--muted)]">Sensor Repo 2 membaca level, tekanan, suhu, warna naphthol, CO₂, NOx, dan arus → Repo 1 menampilkan, membandingkan dengan patokan, dan memutuskan → perintah kembali ke Repo 2 untuk solenoid valve dan relay → hasilnya dibaca lagi oleh sensor dan dicatat di log.</p></div>
        </section>

        <section id="submission" className="mt-8 rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-5 sm:p-6">
          <p className="mono text-xs font-bold tracking-widest text-[var(--accent)]">GABUNGAN / SUBMISSION AGENT STACK 48</p>
          <h2 className="mt-1 text-2xl font-black">Submission Agent Stack 48</h2>
          <p className="mt-1 text-sm text-[var(--muted)]">Satu sistem, dua repositori. Repo 1 sebagai alat observasi dan kendali, Repo 2 sebagai sensor dan pelaksana lapangan. Demo aplikasi ini adalah halaman yang sedang dibuka.</p>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <article className="rounded-xl border border-[var(--line)] p-4">
              <p className="chip bg-[var(--primary)] text-white">REPO 2 · SENSOR &amp; PELAKSANA LAPANGAN</p>
              <h3 className="mt-3 font-black leading-snug [overflow-wrap:anywhere]"><a href="https://github.com/AIchaliveret/batik-guard-8in1" target="_blank" rel="noopener" className="underline decoration-[var(--primary)] underline-offset-4">Repo 2 · IR SUPER BATIK GUARD 8-in-1</a></h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">Membaca level, tekanan, suhu, warna naphthol, dan mengirim perintah ke solenoid valve dan relay.</p>
              <a href="https://github.com/AIchaliveret/batik-guard-8in1" target="_blank" rel="noopener" className="mt-3 inline-flex rounded-full bg-[var(--primary)] px-4 py-2 text-sm font-bold text-white">Buka repositori Repo 2 →</a>
            </article>
            <article className="rounded-xl border border-[var(--line)] p-4">
              <p className="chip bg-[var(--accent)] text-white">REPO 1 · ALAT OBSERVASI &amp; KENDALI</p>
              <h3 className="mt-3 font-black leading-snug [overflow-wrap:anywhere]"><a href="https://github.com/asuveleikha-ai/praktek.aplikasi_autonomouse-batik" target="_blank" rel="noopener" className="underline decoration-[var(--primary)] underline-offset-4">Repo 1 · Game Milimeter Blok — Desain Pabrik Batik</a></h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">Dashboard observasi, denah pabrik 20 × 100 m, laporan akuntabilitas, panduan instalasi, kontrak, dan peralatan.</p>
              <a href="https://github.com/asuveleikha-ai/praktek.aplikasi_autonomouse-batik" target="_blank" rel="noopener" className="mt-3 inline-flex rounded-full bg-[var(--primary)] px-4 py-2 text-sm font-bold text-white">Buka repositori Repo 1 →</a>
            </article>
          </div>
          <div className="mt-4 grid gap-3 md:grid-cols-3"><div className="rounded-xl bg-[var(--surface-2)] p-4"><p className="text-xs font-bold text-[var(--muted)]">DEMO APLIKASI INI</p><p className="mt-1 font-bold">Halaman yang sedang dibuka</p><p className="mt-1 text-sm text-[var(--muted)]">Dibagikan lewat tautan aplikasi ini.</p></div><div className="rounded-xl bg-[var(--surface-2)] p-4"><p className="text-xs font-bold text-[var(--muted)]">LIVE DEMO REPO 2</p><p className="mt-1 font-bold [overflow-wrap:anywhere]"><a href="https://alchaliveret.github.io/batik-guard-8in1/" target="_blank" rel="noopener" className="text-[var(--primary)] underline">alchaliveret.github.io/batik-guard-8in1</a></p></div><div className="rounded-xl bg-[var(--surface-2)] p-4"><p className="text-xs font-bold text-[var(--muted)]">KONTAK</p><p className="mt-1 font-bold [overflow-wrap:anywhere]"><a href="mailto:asuvelaikha@gmail.com" target="_blank" rel="noopener" className="text-[var(--primary)] underline">asuvelaikha@gmail.com</a></p><p className="mt-1 text-sm text-[var(--muted)]">Bahasa Indonesia · Agent Stack 48, 11–13 Des 2026.</p></div></div>
          <p className="mt-4 text-sm">Checklist lengkap ada di bagian <a href="#checklist" className="font-bold text-[var(--primary)] underline">Checklist Agent Stack 48</a> di bawah: repo publik, demo URL, video demo, dan cover image. Jangan kirim sebelum keempatnya lengkap.</p>
        </section>

        <section className="mt-8 rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-5 sm:p-6">
          <div className="flex flex-wrap items-end justify-between gap-3"><div><p className="mono text-xs font-bold tracking-widest text-[var(--primary)]">03 / DENAH · LEBAR 20 m · SKALA 1:100</p><h2 className="mt-1 text-2xl font-black">Satu garis, empat fungsi</h2></div><p className="text-sm text-[var(--muted)]">Baca dari kiri ke kanan. Semua ukuran dalam meter.</p></div>
          <div className="mt-5 overflow-hidden rounded-xl border border-[var(--line)]">
            <div className="flex min-h-[118px] flex-col sm:flex-row"><div className="flex flex-1 flex-col justify-between bg-[var(--primary)] p-3 text-white sm:w-[25%] sm:flex-none"><p className="text-xs font-bold">1–6 m</p><p className="font-bold leading-tight">Ruang Kettel Uap, Turbin &amp; Alternator</p><p className="mono text-xs">5 m</p></div><div className="flex flex-1 flex-col justify-between bg-[#E97B38] p-3 text-white sm:w-[20%] sm:flex-none"><p className="text-xs font-bold">6–10 m</p><p className="font-bold leading-tight">Ruang Tungku Raksasa · 2 Kuali 600–750 L</p><p className="mono text-xs">4 m</p></div><div className="flex flex-col justify-between bg-[var(--surface-2)] p-3 sm:w-[10%] sm:flex-none"><p className="text-xs font-bold">10–12 m</p><p className="font-bold leading-tight">Jalan</p><p className="mono text-xs">2 m</p></div><div className="flex flex-1 flex-col justify-between bg-[var(--ok-soft)] p-3 sm:w-[40%] sm:flex-none"><p className="text-xs font-bold text-[var(--ok)]">12–20 m</p><p className="font-bold leading-tight">Ruang Lainnya</p><p className="text-sm">Empu canting · gudang canting · solfit · jambangan · meja pewarna kimia napthol</p><p className="mono text-xs">8 m</p></div></div>
          </div>
          <div className="mt-4 grid gap-3 md:grid-cols-3"><div className="rounded-lg border border-[var(--line)] p-3"><p className="font-bold">Tungku 0,95 m × 0,95 m</p><p className="text-sm text-[var(--muted)]">Area terpakai 0,90 m × 0,90 m. Pipa tungku 5 cm (0,05 m).</p></div><div className="rounded-lg border border-[var(--line)] p-3"><p className="font-bold">Jarak tungku ke kettel</p><p className="text-sm text-[var(--muted)]">4 m sampai 5 m. Rencanakan jalur lurus yang mudah dirawat.</p></div><div className="rounded-lg border border-[var(--line)] p-3"><p className="font-bold">Pipa tungku ke kettel</p><p className="text-sm text-[var(--muted)]">Reducer 5 cm ke 2,5 cm untuk masuk dan keluar.</p></div></div>
        </section>

        <section className="mt-8 grid gap-5 lg:grid-cols-2">
          <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-5 sm:p-6"><p className="mono text-xs font-bold tracking-widest text-[var(--accent)]">04 / JALUR PIPA</p><h2 className="mt-1 text-2xl font-black">Kecil, jelas, anti bocor</h2><div className="mt-5 space-y-4"><div className="flex items-center gap-3"><span className="mono rounded bg-[var(--primary)] px-3 py-2 text-sm font-bold text-white">5 cm</span><div><p className="font-bold">Pipa tungku · 0,05 m</p><p className="text-sm text-[var(--muted)]">Di dalam tungku, lalu reducer ke 2,5 cm.</p></div></div><div className="flex items-center gap-3"><span className="mono rounded bg-[var(--accent)] px-3 py-2 text-sm font-bold text-white">2,5 cm</span><div><p className="font-bold">Pipa Kecil 1 · masukan air dingin</p><p className="text-sm text-[var(--muted)]">Stop Kran Manual Ball Valve + Stop Kran Otomatis Solenoid Valve, dikontrol ESP32-S3 dari sensor level.</p></div></div><div className="flex items-center gap-3"><span className="mono rounded bg-[var(--ok)] px-3 py-2 text-sm font-bold text-white">2,5 cm</span><div><p className="font-bold">Pipa Kecil 2 · output &amp; input air panas</p><p className="text-sm text-[var(--muted)]">Satu jalur ganda untuk uap / air panas dan sirkulasi balik.</p></div></div></div><p className="mt-5 rounded-lg bg-[var(--warn-soft)] p-3 text-sm"><strong>Shock drat / plug shock</strong> kuat anti bocor pada setiap sambungan yang sering dibuka.</p></div>
          <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-5 sm:p-6"><p className="mono text-xs font-bold tracking-widest text-[var(--primary)]">05 / ALAT UKUR &amp; KEAMANAN</p><h2 className="mt-1 text-2xl font-black">Manual dan otomatis saling memeriksa</h2><div className="mt-5 grid gap-3 sm:grid-cols-2"><div className="border border-[var(--line)] rounded-xl p-4"><Gauge className="text-[var(--primary)]" /><p className="mt-2 font-bold">Pressure Gauge / Manometer Bourdon</p><p className="text-sm text-[var(--muted)]">Pembacaan manual di tempat.</p></div><div className="border border-[var(--line)] rounded-xl p-4"><Activity className="text-[var(--primary)]" /><p className="mt-2 font-bold">Pressure Sensor / Transmitter</p><p className="text-sm text-[var(--muted)]">Pembacaan otomatis untuk agen.</p></div><div className="border border-[var(--line)] rounded-xl p-4"><AlertTriangle className="text-[var(--warn)]" /><p className="mt-2 font-bold">Safety Valve</p><p className="text-sm text-[var(--muted)]">Pengaman tekanan berlebih.</p></div><div className="border border-[var(--line)] rounded-xl p-4"><Thermometer className="text-[var(--warn)]" /><p className="mt-2 font-bold">Sensor level ESP32-S3</p><p className="text-sm text-[var(--muted)]">Mengontrol Solenoid Valve.</p></div></div></div>
        </section>

        <section className="mt-8 rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-5 sm:p-6">
          <div className="flex flex-wrap items-end justify-between gap-3"><div><p className="mono text-xs font-bold tracking-widest text-[var(--accent)]">06 / DAUR ISI ULANG</p><h2 className="mt-1 text-2xl font-black">200–300 L per hari, dibagi empat</h2><p className="mt-1 text-sm text-[var(--muted)]">Waktu kerja 8–10 jam. Tekan “Tandai selesai” setelah satu tahap benar-benar dilakukan.</p></div><span className="chip bg-[var(--ok-soft)] text-[var(--ok)]">{doneStage ? `Tahap ${doneStage} tercatat di layar` : 'Belum ada tahap ditandai'}</span></div>
          <div className="mt-5 grid gap-3 md:grid-cols-4">{stages.map(s => <article key={s.n} className={`rounded-xl border p-4 ${doneStage >= s.n ? 'border-[var(--ok)] bg-[var(--ok-soft)]' : 'border-[var(--line)]'}`}><div className="flex justify-between"><p className="mono text-xs font-bold">TAHAP {s.n}</p><p className="mono text-sm font-bold">{s.time}</p></div><p className="mt-3 text-2xl font-black">{s.volume}</p><p className="mt-1 text-sm leading-relaxed text-[var(--muted)]">{s.note}</p><button disabled={busy} onClick={() => markStage(s.n)} className="mt-4 w-full rounded-full bg-[var(--primary)] px-3 py-2 text-sm font-bold text-white">{doneStage >= s.n ? '✓ Tahap ditandai' : 'Tandai selesai'}</button></article>)}</div>
          <div className="mt-5 overflow-x-auto"><table className="w-full min-w-[560px] border-collapse text-left text-sm"><thead><tr className="border-b-2 border-[var(--line-2)]"><th className="py-3 pr-3">Pola isi ulang</th><th className="py-3 pr-3">Volume per isi</th><th className="py-3 pr-3">Dampak tekanan</th><th className="py-3">Keputusan</th></tr></thead><tbody><tr className="border-b border-[var(--line)]"><td className="py-3 pr-3 font-bold">1×</td><td className="py-3 pr-3">300 L</td><td className="py-3 pr-3">Drop besar</td><td className="py-3 text-[var(--danger)] font-bold">Tidak direkomendasikan</td></tr><tr className="border-b border-[var(--line)]"><td className="py-3 pr-3 font-bold">2×</td><td className="py-3 pr-3">150 L</td><td className="py-3 pr-3">Drop sedang</td><td className="py-3">Bisa, tetapi kurang stabil</td></tr><tr><td className="py-3 pr-3 font-bold">4×</td><td className="py-3 pr-3">75 L</td><td className="py-3 pr-3">Tekanan stabil</td><td className="py-3 text-[var(--ok)] font-bold">Direkomendasikan</td></tr></tbody></table></div>
        </section>

        <section className="mt-8">
          <div className="flex flex-wrap items-end justify-between gap-3"><div><p className="mono text-xs font-bold tracking-widest text-[var(--primary)]">07 / EMPAT AGEN OTONOM</p><h2 className="text-2xl font-black">Tiap agen punya aturan dan bukti</h2></div><p className="max-w-[520px] text-sm text-[var(--muted)]">Agen tidak menebak. Ia membaca alat ukur, menjalankan aturan, dan meninggalkan log.</p></div>
          <div className="mt-5 grid gap-4 md:grid-cols-2">{agents.map(a => <article key={a.no} className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-5"><div className="flex items-start justify-between gap-3"><div className="flex items-center gap-3"><span className="grid h-11 w-11 place-items-center rounded-xl text-white" style={{ background: a.color }}><a.icon size={22} /></span><div><p className="mono text-xs font-bold" style={{ color: a.color }}>{a.no}</p><h3 className="text-lg font-black">{a.name}</h3></div></div><span className="chip bg-[var(--ok-soft)] text-[var(--ok)]"><span className="h-2 w-2 rounded-full bg-[var(--ok)]" /> Aktif</span></div><p className="mt-3 font-medium leading-relaxed">{a.job}</p><ul className="mt-3 space-y-2">{a.rules.map(r => <li key={r} className="flex gap-2 text-sm text-[var(--muted)]"><CheckCircle2 size={16} className="mt-0.5 shrink-0 text-[var(--ok)]" /><span>{r}</span></li>)}</ul><p className="mt-4 border-t border-[var(--line)] pt-3 text-sm"><span className="font-bold">Log:</span> {a.log}</p></article>)}</div>
        </section>

        <section id="gambar" className="mt-8 rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-5 sm:p-6">
          <p className="mono text-xs font-bold tracking-widest text-[var(--accent)]">08 / DOKUMENTASI TEKNIK</p><h2 className="mt-1 text-2xl font-black">4 gambar yang disediakan</h2><p className="mt-1 text-sm text-[var(--muted)]">Pilih gambar untuk memperbesar keterangan. Gambar dipakai sebagai pembanding rakitan, bukan pengganti pengukuran.</p>
          <div className="mt-5 grid gap-4 lg:grid-cols-[1.25fr_.75fr]">
            <figure className="overflow-hidden rounded-xl border border-[var(--line)] bg-[var(--surface-2)]"><img src={figures[activeFigure].src} alt={figures[activeFigure].title} className="aspect-[4/3] w-full object-cover" /><figcaption className="bg-[var(--surface)] p-4"><p className="font-bold">{figures[activeFigure].title}</p><p className="mt-1 text-sm leading-relaxed text-[var(--muted)]">{figures[activeFigure].text}</p></figcaption></figure>
            <div className="grid grid-cols-2 gap-3 lg:grid-cols-1">{figures.map((f, i) => <button key={f.title} onClick={() => setActiveFigure(i)} className={`overflow-hidden rounded-xl border text-left ${i === activeFigure ? 'border-[var(--primary)] ring-2 ring-[var(--primary)]/20' : 'border-[var(--line)]'}`}><img src={f.src} alt={f.title} className="aspect-[16/9] w-full object-cover" /><span className="block p-2 text-xs font-bold">Gambar {i + 1} {i === activeFigure ? '· aktif' : ''}</span></button>)}</div>
          </div>
        </section>

        <section className="mt-8 grid gap-5 lg:grid-cols-[.95fr_1.05fr]">
          <div id="checklist" className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-5 sm:p-6">
            <div className="flex items-start justify-between gap-3"><div><p className="mono text-xs font-bold tracking-widest text-[var(--accent)]">09 / GITHUB SUBMISSION</p><h2 className="mt-1 text-2xl font-black">Checklist Agent Stack 48</h2><p className="mt-1 text-sm text-[var(--muted)]">Centang tersimpan. Jangan kirim sebelum empat item lengkap.</p></div><span className="chip bg-[var(--primary)] text-white">{doneCount} / 4 selesai</span></div>
            <div className="mt-4 h-2 overflow-hidden rounded-full bg-[var(--surface-2)]"><div className="h-full bg-[var(--ok)] transition-all" style={{ width: `${doneCount * 25}%` }} /></div>
            <div className="mt-4 space-y-3">{checklistDefaults.map(item => { const rec = checkByKey(item.key); const done = !!rec?.value?.done; return <label key={item.key} className={`flex cursor-pointer items-start gap-3 rounded-xl border p-4 ${done ? 'border-[var(--ok)] bg-[var(--ok-soft)]' : 'border-[var(--line)]'}`}><input type="checkbox" checked={done} disabled={busy} onChange={() => toggleCheck(item)} className="!h-5 !w-5 shrink-0 accent-[#1E7A4C]" /><span><span className="font-bold">{item.label}</span><span className="block text-sm text-[var(--muted)]">{item.detail}</span></span></label>; })}</div>
            {apiNote && <p className="mt-4 rounded-lg bg-[var(--warn-soft)] p-3 text-sm">{apiNote}</p>}
          </div>

          <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-5 sm:p-6">
            <p className="mono text-xs font-bold tracking-widest text-[var(--primary)]">10 / LOG OBSERVASI HARIAN</p><h2 className="mt-1 text-2xl font-black">Isi setelah pengamatan</h2>
            <form onSubmit={submitLog} className="mt-5 grid gap-3 sm:grid-cols-2">
              <label className="text-sm font-bold">Tanggal<input type="date" required value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} /></label>
              <label className="text-sm font-bold">Tahap<select value={form.stage} onChange={e => setForm({ ...form, stage: e.target.value })}><option>Tahap 1</option><option>Tahap 2</option><option>Tahap 3</option><option>Tahap 4</option><option>Pengamatan lain</option></select></label>
              <label className="text-sm font-bold">Tekanan (bar)<input required value={form.pressure} onChange={e => setForm({ ...form, pressure: e.target.value })} /></label>
              <label className="text-sm font-bold">Level Penyimpan (%)<input required value={form.level} onChange={e => setForm({ ...form, level: e.target.value })} /></label>
              <label className="text-sm font-bold">RPM<input value={form.rpm} onChange={e => setForm({ ...form, rpm: e.target.value })} /></label>
              <label className="text-sm font-bold">Watt<input value={form.watt} onChange={e => setForm({ ...form, watt: e.target.value })} /></label>
              <label className="text-sm font-bold sm:col-span-2">Catatan observasi<textarea rows={3} placeholder="Contoh: Sight Glass sebelum isi, kondisi kran, bunyi, kebocoran, atau sirkulasi." value={form.note} onChange={e => setForm({ ...form, note: e.target.value })} /></label>
              <button disabled={busy} className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--primary)] px-4 py-3 text-sm font-bold text-white sm:col-span-2"><Plus size={18} /> Simpan log observasi</button>
            </form>
            {result && <p className="mt-3 rounded-lg bg-[var(--surface-2)] p-3 text-sm">Tersimpan: <strong>{result.saved}</strong> · Belum tersimpan: <strong>{result.remaining}</strong>{result.error ? ` · ${result.error}` : ' · Log berhasil disimpan.'}</p>}
            <div className="mt-5 border-t border-[var(--line)] pt-4"><p className="flex items-center gap-2 font-bold"><ClipboardCheck size={18} /> Tabel observasi harian <span className="text-sm font-normal text-[var(--muted)]">({loading ? 'memuat…' : `${logs.length} entri`})</span></p>
              <div className="mt-3 overflow-x-auto"><table className="w-full min-w-[640px] border-collapse text-left text-sm"><thead><tr className="border-b-2 border-[var(--line-2)]"><th className="py-2 pr-3">Tanggal</th><th className="py-2 pr-3">Tahap</th><th className="py-2 pr-3">Tekanan</th><th className="py-2 pr-3">Level</th><th className="py-2 pr-3">RPM</th><th className="py-2 pr-3">Watt</th><th className="py-2">Catatan</th></tr></thead><tbody>{logs.length === 0 && <tr><td colSpan={7} className="py-3 text-[var(--muted)]">Belum ada log tersimpan. Isi formulir di atas setelah satu tahap pengamatan.</td></tr>}{logs.map(l => <tr key={l.id} className="border-b border-[var(--line)]"><td className="py-2 pr-3">{l.value?.date || '-'}</td><td className="py-2 pr-3">{l.value?.stage || '-'}</td><td className="py-2 pr-3">{l.value?.pressure || '-'} bar</td><td className="py-2 pr-3">{l.value?.level || '-'}%</td><td className="py-2 pr-3">{l.value?.rpm || '-'}</td><td className="py-2 pr-3">{l.value?.watt || '-'}</td><td className="py-2 [overflow-wrap:anywhere]">{l.value?.note || '-'}</td></tr>)}</tbody></table></div>
              <p className="mt-4 flex items-center gap-2 font-bold"><ClipboardCheck size={18} /> Log tersimpan <span className="text-sm font-normal text-[var(--muted)]">({loading ? 'memuat…' : `${logs.length} entri`})</span></p>
              <div className="mt-3 max-h-[330px] space-y-3 overflow-y-auto pr-1">{logs.length === 0 && <p className="rounded-lg bg-[var(--surface-2)] p-4 text-sm text-[var(--muted)]">Belum ada log tersimpan. Isi formulir di atas setelah satu tahap pengamatan.</p>}{logs.map(l => <article key={l.id} className="rounded-xl border border-[var(--line)] p-3"><div className="flex items-start justify-between gap-2"><p className="font-bold">{l.value?.date || '-'} · {l.value?.stage || '-'}</p><button disabled={busy} onClick={() => deleteLog(l.id)} aria-label="Hapus log" className="text-[var(--danger)]"><Trash2 size={17} /></button></div><p className="mono mt-1 text-xs text-[var(--muted)]">{l.value?.pressure || '-'} bar · {l.value?.level || '-'}% · {l.value?.rpm || '-'} rpm · {l.value?.watt || '-'} W</p>{l.value?.note && <p className="mt-2 text-sm leading-relaxed [overflow-wrap:anywhere]">{l.value.note}</p>}</article>)}</div>
            </div>
          </div>
        </section>

        <footer className="mt-8 rounded-2xl bg-[var(--primary-2)] p-5 text-white sm:p-6">
          <div className="flex flex-wrap items-start justify-between gap-4"><div><h2 className="text-xl font-black">Siap diuji, siap dinilai.</h2><p className="mt-1 max-w-[620px] text-sm text-white/80">Spesifikasi terkunci di atas adalah acuan kerja. Perubahan di lapangan harus dicatat di log, bukan diubah diam-diam.</p></div><div className="text-sm"><p className="font-bold">Kontak</p><a className="underline" href="mailto:asuvelaikha@gmail.com" target="_blank" rel="noopener">asuvelaikha@gmail.com</a><p className="mt-2 flex items-center gap-1 text-white/80"><MapPin size={14} /> Agent Stack 48 · 11–13 Des 2026</p></div></div>
        </footer>
      </main>
    </div>
  );
}
