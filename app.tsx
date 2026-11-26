import React, { useEffect, useMemo, useRef, useState } from "react";
import { Check, ChevronDown, CircleAlert, Droplets, Flame, Gauge, Layers, Ruler, ShieldCheck, Wrench, Zap } from "lucide-react";

type Item = { id:string; group:string; name:string; spec:string; qty:number; unit:string; price:number; note:string };
type Persisted = { checked: Record<string, boolean>; checklist: Record<string, boolean> };

const GROUPS = [
  { id:"A", title:"Tabung Boiler", short:"A · Boiler" },
  { id:"B", title:"Pipa dan Fitting", short:"B · Pipa" },
  { id:"C", title:"Stop Keran dan Sensor", short:"C · Keran" },
  { id:"D", title:"Tungku dan Kuali", short:"D · Tungku" },
  { id:"E", title:"Kolam Bak Jambangan dan Bak Kontrol", short:"E · Kolam" },
  { id:"F", title:"Turbin, Alternator, Pompa", short:"F · Turbin" },
  { id:"G", title:"Struktur dan Bangunan", short:"G · Struktur" },
  { id:"H", title:"Kaca Penduga", short:"H · Kaca Penduga" },
  { id:"I", title:"Auto Refill", short:"I · Auto Refill" },
];

const ITEMS: Item[] = [
  { id:"A1", group:"A", name:"Plat stainless SS304", spec:"Tebal 2 mm · lembaran 120 × 240 cm", qty:2, unit:"lembar", price:2850000, note:"1 lembar = 1 tabung lengkap. Badan 119 × 200 cm + sisa 120 × 40 cm untuk 2 tutup lingkaran Ø 38 cm." },
  { id:"A2", group:"A", name:"Kawat las SS304 + argon", spec:"Elektroda / kawat TIG SS304 · gas argon las keliling", qty:1, unit:"paket", price:1450000, note:"Las bulat keliling. Jangan bentuk persegi." },
  { id:"A3", group:"A", name:"Kaki + dudukan tabung", spec:"Pipa / plat SS304 · dudukan berjenjang Boiler 1 +36 cm", qty:2, unit:"set", price:875000, note:"Kunci beda tinggi 36 cm. Ukur dari dasar Boiler 2." },
  { id:"A4", group:"A", name:"Isolasi tabung + cladding", spec:"Rockwool tahan panas + pelapis aluminium · 2 tabung", qty:2, unit:"set", price:1150000, note:"Sisakan akses sight glass, keran, dan lubang pipa." },
  { id:"A5", group:"A", name:"Flange + baut + gasket tahan panas", spec:"Flange pipa uap · baut SS · gasket EPDM / PTFE", qty:1, unit:"paket", price:980000, note:"Kencangkan silang. Uji bocor sebelum isolasi ditutup." },

  { id:"B1", group:"B", name:"Pipa uap utama SS", spec:"Ø 5 cm · panjang 8,1 m di dalam tungku · volume 15,9 liter", qty:8.1, unit:"meter", price:385000, note:"Jalur uap utama. Jaga radius tekuk, jangan tekuk tajam." },
  { id:"B2", group:"B", name:"Reducer uap", spec:"Reducer SS 5 cm → 2,5 cm", qty:2, unit:"buah", price:425000, note:"Pasang searah aliran. Tandai arah di badan reducer." },
  { id:"B3", group:"B", name:"Pipa distribusi", spec:"Pipa SS Ø 2,5 cm · jalur distribusi uap", qty:14, unit:"meter", price:145000, note:"Topang tiap sambungan berat. Cek kemiringan drain kondensat." },
  { id:"B4", group:"B", name:"Pipa cabang / penghubung", spec:"Pipa SS Ø 2 cm · cabang + penghubung antar tabung", qty:10, unit:"meter", price:98000, note:"Penghubung di posisi PALING RENDAH antar tabung." },
  { id:"B5", group:"B", name:"Elbow, tee, union, nipel", spec:"Fitting SS Ø 2–5 cm · sambungan bongkar-pasang", qty:1, unit:"paket", price:2350000, note:"Union di tiap peralatan servis. Jangan las mati semua sambungan." },
  { id:"B6", group:"B", name:"Pipa sirkulasi + reserve / drain", spec:"Pipa SS Ø 2 cm · input sirkulasi, output tungku, reserve / drain", qty:12, unit:"meter", price:98000, note:"Urut dari atas: Uap (vakum) – Input – Output – Penghubung – Reserve / Drain." },

  { id:"C1", group:"C", name:"Stop keran manual utama", spec:"Ball valve SS · Ø 5 cm · jalur uap utama", qty:2, unit:"buah", price:1250000, note:"Lapis 1: manual. Harus mudah dijangkau saat darurat." },
  { id:"C2", group:"C", name:"Stop keran manual distribusi", spec:"Ball valve SS · Ø 2,5 cm", qty:4, unit:"buah", price:465000, note:"Satu keran per jalur utama ke tungku / kolam." },
  { id:"C3", group:"C", name:"Solenoid valve otomatis", spec:"Solenoid 24 V DC · Ø 2,5 cm · normally closed", qty:4, unit:"buah", price:685000, note:"Lapis 2: otomatis. Pasangan manual + solenoid di setiap jalur utama." },
  { id:"C4", group:"C", name:"Safety valve + pressure gauge", spec:"Safety valve set 2,5 bar · manometer 0–4 bar", qty:2, unit:"set", price:1125000, note:"Jangan ganti setelan safety valve. Uji sebelum operasi." },
  { id:"C5", group:"C", name:"Sight glass + sensor level / suhu", spec:"Sight glass tahan panas · sensor level + termometer", qty:2, unit:"set", price:1480000, note:"Tandai garis 120 cm (Boiler 1) dan 160 cm (Boiler 2)." },
  { id:"C6", group:"C", name:"Panel kontrol + kabel + sensor", spec:"Panel 24 V · relay · kabel tahan panas · indikator", qty:1, unit:"paket", price:3250000, note:"Uji solenoid tanpa tekanan dulu, lalu uji bertekanan." },

  { id:"D1", group:"D", name:"Tungku raksasa", spec:"0,95 m × 0,95 m · bata tahan api + rangka · 2 buah", qty:2, unit:"buah", price:4850000, note:"Ruang bakar harus menampung jalur pipa uap 8,1 m." },
  { id:"D2", group:"D", name:"Kuali", spec:"Ø 1,2 m · tinggi 0,9 m · volume penuh 1.018 liter · kerja 600–750 liter", qty:2, unit:"buah", price:6250000, note:"Kerja 600–750 liter. Jangan isi sampai bibir." },
  { id:"D3", group:"D", name:"Bibir bata merah kuali", spec:"Bata merah + adukan tahan panas · bibir penahan kuali", qty:2, unit:"paket", price:1450000, note:"Bibir menahan kuali, bukan menutup jalur api." },
  { id:"D4", group:"D", name:"Bata tahan api + semen tahan api", spec:"Bata api · semen castable · mortar tahan panas", qty:1, unit:"paket", price:3850000, note:"Keringkan tungku bertahap sebelum bakar penuh." },
  { id:"D5", group:"D", name:"Cerobong + pintu tungku + jeruji", spec:"Cerobong baja · pintu baja · jeruji bakar", qty:2, unit:"set", price:2350000, note:"Cerobong jauh dari jalur servis. Cek tarikan asap." },

  { id:"E1", group:"E", name:"Kolam Bak Jambangan SS304", spec:"280 × 120 × 70 cm · SS304 tebal 2 mm · 2 kompartemen", qty:1, unit:"unit", price:16850000, note:"2 kompartemen @ 500 liter · total 1.000 liter · untuk 2× pencucian." },
  { id:"E2", group:"E", name:"Sekat + rangka + kaki kolam", spec:"Sekat SS304 2 mm · rangka + kaki adjustable", qty:1, unit:"paket", price:3250000, note:"Sekat kedap antar kompartemen. Kaki rata sebelum isi air." },
  { id:"E3", group:"E", name:"Bak Kontrol Limbah SS304", spec:"SS304 · tinggi 70 cm · bak penampung + kontrol limbah", qty:1, unit:"unit", price:4850000, note:"Alur limbah terpisah dari air pencucian bersih." },
  { id:"E4", group:"E", name:"Keran, drain, saringan kolam", spec:"Keran + drain Ø 2 cm · saringan · selang bilas", qty:2, unit:"set", price:895000, note:"Drain tiap kompartemen. Saringan cegah serat menyumbat." },
  { id:"E5", group:"E", name:"Pipa daur isi ulang", spec:"Pipa + keran daur ulang · 200–300 liter/hari · 4 tahap", qty:1, unit:"paket", price:1850000, note:"Daur 50–75 liter per tahap. Tandai tahap 1–4." },

  { id:"F1", group:"F", name:"Turbin Uap Turbo", spec:"1 unit · 2.500–2.800 RPM max", qty:1, unit:"unit", price:12500000, note:"Kopling sejajar. Cek getaran pada RPM awal." },
  { id:"F2", group:"F", name:"Alternator Truk 24 V", spec:"24 V DC · 2.400–3.000 W", qty:1, unit:"unit", price:4850000, note:"Kabel + sekring sesuai arus. Jangan bypass pengaman." },
  { id:"F3", group:"F", name:"Pompa sirkulasi", spec:"75 W · max 125 W · PULSE 3–4 menit per tahap", qty:1, unit:"unit", price:1850000, note:"Mode PULSE, bukan jalan terus. Timer 3–4 menit / tahap." },
  { id:"F4", group:"F", name:"Aki 24 V + charger + kabel daya", spec:"Aki 24 V · charger · kabel + terminal", qty:1, unit:"paket", price:3850000, note:"Ventilasi aki. Terminal kencang, bebas karat." },
  { id:"F5", group:"F", name:"Dudukan turbin + pelindung putar", spec:"Dudukan baja · guard putar · baut anti-getar", qty:1, unit:"paket", price:2150000, note:"Guard wajib sebelum uji putar." },

  { id:"G1", group:"G", name:"Struktur baja + atap Zona 1–2", spec:"Baja hollow / WF · atap + ventilasi panas", qty:1, unit:"paket", price:18500000, note:"Ventilasi di atas tungku dan boiler. Akses servis dari samping." },
  { id:"G2", group:"G", name:"Lantai beton + parit + jalan servis", spec:"Lantai beton · parit limbah · jalan servis 2 m (Zona 3)", qty:1, unit:"paket", price:12500000, note:"Jalan servis Zona 3 (10–12 m) jangan dipakai gudang." },
  { id:"G3", group:"G", name:"Dinding + pintu + pencahayaan", spec:"Dinding bata / panel · pintu · lampu + instalasi", qty:1, unit:"paket", price:8750000, note:"Lampu tahan panas di dekat tungku. Stop kontak jauh dari air." },
  { id:"G4", group:"G", name:"Pagar pengaman + rambu + APAR", spec:"Pagar area panas · rambu bahaya · APAR", qty:1, unit:"paket", price:3250000, note:"Area panas dipagari. APAR mudah dijangkau." },

  { id:"H1", group:"H", name:"Sight Glass / Water Level Gauge - Borosilikat", spec:"Kaca Borosilikat 3.3 · tahan panas dan tekanan · JANGAN kaca biasa · panjang 200 cm · Pelampung Bola Merah + Skala 0–200 cm + 2 Valve Isolasi + Guard", qty:1, unit:"Set", price:1850000, note:"Prinsip bejana berhubungan: air di kaca = air di tabung. 120 cm = 3/5 = BATAS BAWAH → waktunya isi ulang. 160 cm = 4/5 = BATAS ATAS → berhenti isi. 200 cm = MAKSIMUM → jangan pernah lewat sini." },

  { id:"I1", group:"I", name:"Float Level Switch", spec:"Sensor Level Atas-Bawah · 120 cm & 160 cm", qty:1, unit:"Set", price:650000, note:"Kirim sinyal LOW di 120 cm dan HIGH di 160 cm ke Box Kontroler." },
  { id:"I2", group:"I", name:"Solenoid Valve", spec:"24 V DC · untuk Air Panas", qty:1, unit:"Pcs", price:425000, note:"Buka saat Box Kontroler ON, nutup saat OFF. Pasang searah aliran." },
  { id:"I3", group:"I", name:"Pompa Air Kecil", spec:"DC 24 V · Auto Refill", qty:1, unit:"Pcs", price:775000, note:"Nyala hanya saat Auto Refill ON. Air dari Reservoir masuk dari bawah tabung." },
  { id:"I4", group:"I", name:"Box Kontroler + Monitoring HP", spec:"ESP32 + Relay + IoT Telemetri + Notif HP", qty:1, unit:"Set", price:1950000, note:"Otak IoT: ESP32 / PLC Mini + relay Pompa + Solenoid. Notif HP: Level Rendah - Auto Refill ON - Level 120cm - Tekanan 1,2 bar / Level Normal - Auto Refill OFF - Level 160cm - Siap." },
];

const CHECKLIST = [
  { id:"K1", title:"Berjenjang 36 cm terkunci", detail:"Dasar Boiler 1 lebih tinggi 36 cm dari dasar Boiler 2. Ukur ulang sebelum dudukan dilas mati." },
  { id:"K2", title:"Urutan lubang dari atas ke bawah", detail:"1 Uap (vakum) · 2 Input Sirkulasi PALING TINGGI · 3 Output dari Tungku TENGAH · 4 Penghubung PALING RENDAH · 5 Reserve / Drain paling bawah." },
  { id:"K3", title:"Tutup lingkaran muat di sisa lembaran", detail:"Sisa 120 × 40 cm dipakai untuk 2 tutup lingkaran Ø 38 cm. Potong lingkaran dulu, baru sisa lain." },
  { id:"K4", title:"Las bulat, bukan persegi", detail:"Tabung dibentuk melingkar. Sudut 90° rawan retak pada tekanan kerja 2,5 bar." },
  { id:"K5", title:"Stop keran 2 lapis di tiap jalur utama", detail:"Manual + solenoid otomatis di setiap jalur utama. Uji keduanya sebelum operasi." },
  { id:"K6", title:"Garis air ditandai di tabung", detail:"Boiler 1: 120 cm = 136 liter · Boiler 2: 160 cm = 181 liter. Total air 317 liter." },
];

const rupiah = (n:number) => "Rp " + Math.round(n).toLocaleString("id-ID");
const fmt = (n:number) => n.toLocaleString("id-ID");

async function api(action:string, args:Record<string,unknown>){
  const res = await fetch("actions", { method:"POST", headers:{ "content-type":"application/json" }, body: JSON.stringify({ action, args }) });
  const json = await res.json().catch(()=>({}));
  if(!res.ok || json.error) throw new Error(json.error || `Gagal memuat (${res.status})`);
  return json.data;
}

export default function App(){
  const [filter,setFilter] = useState("SEMUA");
  const [checked,setChecked] = useState<Record<string,boolean>>({});
  const [checklist,setChecklist] = useState<Record<string,boolean>>({});
  const [stateId,setStateId] = useState<string|null>(null);
  const [expanded,setExpanded] = useState<Record<string,boolean>>({});
  const [saveState,setSaveState] = useState<"idle"|"saving"|"saved"|"error">("idle");
  const [saveMsg,setSaveMsg] = useState("");
  const keyRef = useRef(`rab-${Math.random().toString(36).slice(2)}-${Date.now()}`);

  useEffect(()=>{
    let alive=true;
    (async()=>{
      try{
        const data = await api("records.list",{ collection:"rab_state" }) as {records:{id:string;value:Persisted}[]};
        if(!alive) return;
        const rec = data.records?.[0];
        if(rec){ setStateId(rec.id); setChecked(rec.value?.checked||{}); setChecklist(rec.value?.checklist||{}); }
      }catch{ if(alive) setSaveMsg("Koneksi penyimpanan belum tersedia. Centang masih bisa dipakai di layar ini."); }
    })();
    return ()=>{ alive=false; };
  },[]);

  const save = async(nextChecked:Record<string,boolean>, nextList:Record<string,boolean>)=>{
    setSaveState("saving"); setSaveMsg("Menyimpan…");
    try{
      const value = { checked:nextChecked, checklist:nextList };
      if(stateId){ await api("records.replace",{ collection:"rab_state", id:stateId, value }); }
      else{
        const rec = await api("records.create",{ collection:"rab_state", value, idempotency_key:keyRef.current }) as {id:string};
        setStateId(rec.id);
      }
      setSaveState("saved"); setSaveMsg("Tersimpan.");
    }catch(e){ setSaveState("error"); setSaveMsg(e instanceof Error? e.message : "Gagal menyimpan."); }
  };

  const toggleItem = (id:string)=>{ const next={...checked,[id]:!checked[id]}; setChecked(next); save(next,checklist); };
  const toggleCheck = (id:string)=>{ const next={...checklist,[id]:!checklist[id]}; setChecklist(next); save(checked,next); };

  const filtered = useMemo(()=> filter==="SEMUA" ? ITEMS : ITEMS.filter(i=>i.group===filter),[filter]);
  const totals = useMemo(()=>{ const t:Record<string,number>={}; ITEMS.forEach(i=> t[i.group]=(t[i.group]||0)+i.qty*i.price); return t; },[]);
  const grand = ITEMS.reduce((s,i)=>s+i.qty*i.price,0);
  const bought = ITEMS.filter(i=>checked[i.id]).reduce((s,i)=>s+i.qty*i.price,0);
  const remaining = grand-bought;
  const progress = grand? Math.round(bought/grand*100):0;
  const boughtCount = ITEMS.filter(i=>checked[i.id]).length;
  const doneCheck = CHECKLIST.filter(c=>checklist[c.id]).length;

  return (
    <div data-safe-area-inset-root style={{boxSizing:"border-box", paddingTop:"var(--safe-area-inset-top)", minHeight:"100vh", background:"var(--surface)"}} className="overflow-x-clip">
      <header data-safe-area-sticky-top style={{top:"var(--safe-area-inset-top)"}} className="sticky z-20 blueprint text-white shadow-lg">
        <div className="mx-auto max-w-[1180px] px-4 py-4 sm:px-6 sm:py-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <div className="grid h-11 w-11 shrink-0 place-items-center whitespace-nowrap rounded-xl bg-white px-1 text-sm font-black text-[#0a3a72]">BA</div>
              <div className="min-w-0">
                <p className="text-[11px] font-bold tracking-[.18em] text-sky-200 uppercase">Pabrik Batik Autonomous · Plan B</p>
                <h1 className="text-[clamp(1.45rem,4.5vw,2.5rem)] leading-[1.02] font-black tracking-tight [overflow-wrap:anywhere]">RAB / Daftar Bahan Lengkap</h1>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-white/15 px-3 py-1.5 text-xs font-bold">Sistem Ketel Uap</span>
              <span className="rounded-full bg-[#e9a227] px-3 py-1.5 text-xs font-black text-[#0a2138]">Kolam Bak Jambangan</span>
            </div>
          </div>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-sky-100 [overflow-wrap:anywhere]">Dokumen kerja untuk arsitek, tukang las, dan tukang bangunan. Patokan di bawah ini terkunci — jangan diubah tanpa revisi desain.</p>
        </div>
      </header>

      <main className="mx-auto max-w-[1180px] px-4 pb-14 sm:px-6">
        {/* PATOKAN TERKUNCI */}
        <section aria-labelledby="patokan" className="mt-5">
          <div className="flex flex-wrap items-end justify-between gap-2">
            <div><p className="text-xs font-extrabold tracking-[.16em] text-[var(--blue)]">01 · PATOKAN TERKUNCI</p><h2 id="patokan" className="text-xl font-black sm:text-2xl">Jangan diubah di lapangan</h2></div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[var(--amber-soft)] px-3 py-1.5 text-xs font-bold text-[var(--ink)]"><ShieldCheck size={15}/> Revisi hanya lewat gambar revisi</span>
          </div>
          <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <article className="rounded-2xl border border-[var(--line)] bg-[var(--surface-2)] p-4 shadow-[var(--shadow)]">
              <div className="flex items-center gap-2 text-[var(--blue)]"><Layers size={18}/><h3 className="text-sm font-extrabold">Tabung Boiler</h3></div>
              <p className="mono mt-3 text-2xl font-semibold">2 × 227 L</p><p className="text-sm text-[var(--muted)]">Total <strong className="text-[var(--ink)]">454 liter</strong></p>
              <p className="mt-3 border-t border-[var(--line-2)] pt-3 text-sm leading-relaxed">SS304 · Ø 38 cm · tinggi 200 cm · vertikal.</p>
            </article>
            <article className="rounded-2xl border border-[var(--line)] bg-[var(--surface-2)] p-4 shadow-[var(--shadow)]">
              <div className="flex items-center gap-2 text-[var(--blue)]"><Droplets size={18}/><h3 className="text-sm font-extrabold">Air &amp; Ruang Uap</h3></div>
              <p className="mono mt-3 text-2xl font-semibold">317 L air</p>
              <p className="mt-2 text-sm leading-relaxed"><strong>Boiler 1:</strong> 136 L = ⅗ = 120 cm · uap 80 cm = ⅖<br/><strong>Boiler 2:</strong> 181 L = ⅘ = 160 cm · uap 40 cm = ⅕</p>
            </article>
            <article className="rounded-2xl border border-[var(--line)] bg-[var(--surface-2)] p-4 shadow-[var(--shadow)]">
              <div className="flex items-center gap-2 text-[var(--blue)]"><Ruler size={18}/><h3 className="text-sm font-extrabold">Pipa</h3></div>
              <p className="mono mt-3 text-2xl font-semibold">Ø 5 → 2,5 → 2 cm</p>
              <p className="mt-2 text-sm leading-relaxed">Uap utama 5 cm · 8,1 m · <strong className="text-[var(--ink)]">15,9 liter</strong>. Reducer 5 → 2,5 cm. Distribusi 2,5 cm. Cabang 2 cm.</p>
            </article>
            <article className="rounded-2xl border-2 border-[var(--amber)] bg-[var(--amber-soft)] p-4 shadow-[var(--shadow)]">
              <div className="flex items-center gap-2"><Gauge size={18}/><h3 className="text-sm font-extrabold">Berjenjang 36 cm</h3></div>
              <p className="mono mt-3 text-2xl font-semibold">+36 cm</p>
              <p className="mt-2 text-sm leading-relaxed">Dasar <strong>Boiler 1 lebih tinggi 36 cm</strong> dari Boiler 2. Aliran mengandalkan beda tinggi ini.</p>
            </article>
          </div>
        </section>

        {/* DENAH */}
        <section aria-labelledby="denah" className="mt-4 rounded-2xl border border-[var(--line)] bg-[var(--surface-2)] p-4 shadow-[var(--shadow)]">
          <div className="flex flex-wrap justify-between gap-2"><h2 id="denah" className="font-black">Denah garis 0–20 m</h2><span className="text-xs font-bold text-[var(--muted)]">Skala proporsional · baca dari kiri ke kanan</span></div>
          <div className="mt-3 grid grid-cols-1 overflow-hidden rounded-xl border border-[var(--line)] text-white min-[560px]:flex">
            <div className="bg-[#1156a6] px-3 py-3 min-[560px]:w-[25%]"><p className="text-[11px] font-bold opacity-80 [overflow-wrap:anywhere]">ZONA 1 · 1–6 m</p><p className="text-xs font-bold leading-snug [overflow-wrap:anywhere] sm:text-sm">Boiler + Turbin + Alternator</p></div>
            <div className="bg-[#1d78e0] px-3 py-3 min-[560px]:w-[20%]"><p className="text-[11px] font-bold opacity-80 [overflow-wrap:anywhere]">ZONA 2 · 6–10 m</p><p className="text-xs font-bold leading-snug [overflow-wrap:anywhere] sm:text-sm">Tungku + Kuali</p></div>
            <div className="bg-[#e9a227] px-3 py-3 text-[#0a2138] min-[560px]:w-[10%]"><p className="text-[11px] font-bold [overflow-wrap:anywhere]">ZONA 3</p><p className="text-xs font-bold leading-snug [overflow-wrap:anywhere]">10–12 m<br/>Jalan servis 2 m</p></div>
            <div className="bg-[#5f7f9e] px-3 py-3 min-[560px]:w-[45%]"><p className="text-[11px] font-bold opacity-80 [overflow-wrap:anywhere]">ZONA 4 · 12–20 m</p><p className="text-xs font-bold leading-snug [overflow-wrap:anywhere] sm:text-sm">Ruang lain</p></div>
          </div>
          <div className="mt-3 grid gap-2 text-sm text-[var(--muted)] sm:grid-cols-3">
            <p><strong className="text-[var(--ink)]">Turbin:</strong> 2.500–2.800 RPM max.</p>
            <p><strong className="text-[var(--ink)]">Alternator:</strong> Truk 24 V · 2.400–3.000 W DC.</p>
            <p><strong className="text-[var(--ink)]">Daur:</strong> 200–300 L/hari · 4 tahap · 50–75 L/tahap.</p>
          </div>
        </section>

        {/* RINGKASAN */}
        <section aria-label="Ringkasan RAB" className="mt-4 grid gap-3 sm:grid-cols-3">
          <div className="rounded-2xl bg-[#0a3a72] p-4 text-white"><p className="text-xs font-bold tracking-wider text-sky-200">TOTAL RAB · ESTIMASI</p><p className="mono mt-1 text-[clamp(1.6rem,5vw,2.2rem)] font-semibold leading-none">{rupiah(grand)}</p><p className="mt-2 text-xs text-sky-200">{ITEMS.length} baris bahan · harga pasar Indonesia 2026</p></div>
          <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface-2)] p-4"><p className="text-xs font-bold tracking-wider text-[var(--muted)]">SUDAH DIBELI</p><p className="mono mt-1 text-[clamp(1.6rem,5vw,2.2rem)] font-semibold leading-none">{rupiah(bought)}</p><p className="mt-2 text-xs text-[var(--muted)]">{boughtCount} dari {ITEMS.length} baris dicentang</p></div>
          <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface-2)] p-4"><p className="text-xs font-bold tracking-wider text-[var(--muted)]">SISA BELANJA · PROGRES</p><p className="mono mt-1 text-[clamp(1.6rem,5vw,2.2rem)] font-semibold leading-none">{rupiah(remaining)}</p><div className="mt-3 h-2.5 overflow-hidden rounded-full bg-[var(--surface-3)]"><div className="h-full bg-[var(--green)] transition-all" style={{width:`${progress}%`}}/></div><p className="mt-1 text-xs font-bold">{progress}% nilai bahan terbeli</p></div>
        </section>

        {/* FILTER */}
        <section className="mt-6" aria-label="Filter kelompok">
          <div className="flex flex-wrap items-center justify-between gap-2"><h2 className="text-xl font-black">02 · Tabel RAB</h2><p className="rounded-full bg-[var(--red-soft)] px-3 py-1 text-xs font-extrabold text-[var(--red)]">HARGA SATUAN = ESTIMASI</p></div>
          <p className="mt-1 text-sm text-[var(--muted)]">Centang baris yang sudah dibeli. Centang tersimpan otomatis dan tetap ada saat halaman dibuka lagi.</p>
          <div className="mt-3 flex flex-wrap gap-2">
            <button onClick={()=>setFilter("SEMUA")} className={`rounded-full border px-3.5 py-2 text-sm font-bold ${filter==="SEMUA"?"bg-[var(--blue)] text-white border-[var(--blue)]":"bg-[var(--surface-2)] border-[var(--line)]"}`}>Semua · {rupiah(grand)}</button>
            {GROUPS.map(g=>(<button key={g.id} onClick={()=>setFilter(g.id)} aria-pressed={filter===g.id} className={`rounded-full border px-3.5 py-2 text-sm font-bold ${filter===g.id?"bg-[var(--blue)] text-white border-[var(--blue)]":"bg-[var(--surface-2)] border-[var(--line)]"}`}>{g.short} · {rupiah(totals[g.id]||0)}</button>))}
          </div>
          <p aria-live="polite" className="mt-2 text-sm"><span className={saveState==="error"?"text-[var(--red)] font-bold":"text-[var(--muted)]"}>{saveMsg || "Siap. Pilih kelompok di atas untuk memfilter tabel."}</span></p>
        </section>

        {/* TABLE */}
        <section aria-label="Daftar bahan">
          <div className="hidden md:grid grid-cols-12 gap-3 px-4 py-2 table-head"><span className="col-span-1">Beli</span><span className="col-span-3">Nama bahan / spesifikasi</span><span className="col-span-1 text-right">Jumlah</span><span className="col-span-2 text-right">Harga satuan</span><span className="col-span-2 text-right">Subtotal</span><span className="col-span-3">Catatan tukang las</span></div>
          <div className="space-y-4">
            {(filter==="SEMUA"?GROUPS:GROUPS.filter(g=>g.id===filter)).map(g=>{
              const rows = ITEMS.filter(i=>i.group===g.id);
              return (
                <article key={g.id} className="overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--surface-2)] shadow-[var(--shadow)]">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--line-2)] bg-[var(--surface-3)] px-4 py-3">
                    <h3 className="font-black"><span className="mr-2 inline-grid h-7 w-7 place-items-center rounded-lg bg-[var(--blue)] text-sm text-white">{g.id}</span>{g.title}</h3>
                    <p className="text-sm"><span className="text-[var(--muted)]">Total kelompok: </span><strong className="mono">{rupiah(totals[g.id]||0)}</strong></p>
                  </div>
                  {g.id==="I" && (
                    <div className="border-b border-[var(--line-2)] bg-[var(--surface-2)] px-4 py-4">
                      <p className="text-xs font-extrabold tracking-[.14em] text-[var(--blue)]">LOGIKA OTOMATIS YANG DIKUNCI · JANGAN DIUBAH</p>
                      <ol className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
                        <li className="rounded-xl border border-[var(--line)] bg-[var(--surface-3)] p-3"><span className="inline-grid h-7 w-7 place-items-center rounded-full bg-[var(--blue)] text-sm font-black text-white">1</span><p className="mt-2 text-sm leading-relaxed [overflow-wrap:anywhere]">Air turun ke <strong>120 cm</strong> → Float Switch kirim sinyal <strong>LOW</strong>.</p></li>
                        <li className="rounded-xl border border-[var(--line)] bg-[var(--surface-3)] p-3"><span className="inline-grid h-7 w-7 place-items-center rounded-full bg-[var(--blue)] text-sm font-black text-white">2</span><p className="mt-2 text-sm leading-relaxed [overflow-wrap:anywhere]">Box Kontroler <strong>ON</strong>: Pompa DC 24 V nyala + Solenoid Valve buka. Air dari Reservoir masuk dari bawah tabung.</p></li>
                        <li className="rounded-xl border border-[var(--line)] bg-[var(--surface-3)] p-3"><span className="inline-grid h-7 w-7 place-items-center rounded-full bg-[var(--blue)] text-sm font-black text-white">3</span><p className="mt-2 text-sm leading-relaxed [overflow-wrap:anywhere]">Air naik ke <strong>160 cm</strong> → Float Switch kirim sinyal <strong>HIGH</strong>.</p></li>
                        <li className="rounded-xl border border-[var(--line)] bg-[var(--surface-3)] p-3"><span className="inline-grid h-7 w-7 place-items-center rounded-full bg-[var(--blue)] text-sm font-black text-white">4</span><p className="mt-2 text-sm leading-relaxed [overflow-wrap:anywhere]">Box Kontroler <strong>OFF</strong>: Pompa mati + Solenoid nutup. Berhenti.</p></li>
                      </ol>
                      <div className="mt-3 grid gap-3 text-sm leading-relaxed md:grid-cols-3">
                        <p className="rounded-xl bg-[var(--amber-soft)] p-3"><strong>Per tahap isi hanya 40 cm</strong> — sekitar 50–75 liter. Sehari 4 tahap = <strong>200–300 liter</strong>. Aman, tidak luber, tidak kekeringan.</p>
                        <p className="rounded-xl bg-[var(--surface-3)] p-3"><strong>Isi Box Kontroler:</strong> ESP32 / PLC Mini buat otak IoT, Relay buat Pompa + Solenoid, Koneksi ke HP. Notif: <span className="mono text-xs">Level Rendah - Auto Refill ON - Level 120cm - Tekanan 1,2 bar</span> / <span className="mono text-xs">Level Normal - Auto Refill OFF - Level 160cm - Siap</span>.</p>
                        <p className="rounded-xl bg-[var(--surface-3)] p-3"><strong>Yang nyambung ke Box ini juga:</strong> 3× Water Meter, Pressure Gauge, Safety Valve (wajib — kalau tekanan lewat 2,5 bar dia buang sendiri), Voice Recorder.</p>
                      </div>
                    </div>
                  )}
                  <div className="divide-y divide-[var(--line-2)]">
                    {rows.map(item=>{
                      const isChecked = !!checked[item.id]; const show = !!expanded[item.id]; const subtotal = item.qty*item.price;
                      return (
                        <div key={item.id} className={`grid grid-cols-1 gap-2 px-4 py-4 md:grid-cols-12 md:items-start ${isChecked?"bg-[var(--green-soft)]/50":""}`}>
                          <label className="flex cursor-pointer items-center gap-2 md:col-span-1"><input type="checkbox" checked={isChecked} onChange={()=>toggleItem(item.id)} className="h-5 w-5 accent-[#137a4f]"/><span className="text-xs font-bold md:hidden">Sudah dibeli</span>{isChecked && <span className="inline-flex items-center gap-1 rounded-full bg-[var(--green)] px-2 py-0.5 text-[11px] font-bold text-white"><Check size={12}/>Dibeli</span>}</label>
                          <div className="md:col-span-3"><p className={`font-bold leading-snug [overflow-wrap:anywhere] ${isChecked?"line-through opacity-70":""}`}>{item.name}</p><p className="mt-1 text-sm leading-relaxed text-[var(--muted)] [overflow-wrap:anywhere]">{item.spec}</p><p className="mono mt-1 text-xs text-[var(--muted)]">Kode {item.id}</p></div>
                          <p className="md:col-span-1 md:text-right"><span className="mono font-bold">{fmt(item.qty)}</span> <span className="text-sm text-[var(--muted)]">{item.unit}</span></p>
                          <p className="mono md:col-span-2 md:text-right">{rupiah(item.price)}<span className="block text-xs font-sans text-[var(--muted)]">/{item.unit} · ESTIMASI</span></p>
                          <p className="mono font-bold md:col-span-2 md:text-right">{rupiah(subtotal)}</p>
                          <div className="md:col-span-3">
                            {item.id==="H1" && (
                              <div className="mb-3 rounded-xl border-2 border-[var(--amber)] bg-[var(--amber-soft)] p-3 sm:p-4">
                                <p className="flex items-center gap-1.5 text-sm font-black"><CircleAlert size={17} className="shrink-0 text-[#8a5b00]"/> CATATAN WAJIB TUKANG LAS — BACA DULU</p>
                                <p className="mt-2 text-[15px] font-bold leading-relaxed [overflow-wrap:anywhere]">Pasang 2 buah Valve Isolasi di atas dan bawah kaca. Jadi kalau kaca pecah / mau dibersihin, bisa ditutup tanpa kuras tabung.</p>
                                <p className="mt-2 text-[15px] font-bold leading-relaxed [overflow-wrap:anywhere]">+ Kasih Pelindung Kaca / Guard dari besi hollow biar tidak kesenggol.</p>
                                <p className="mt-2 text-[15px] font-black leading-relaxed [overflow-wrap:anywhere]">Kacanya di SAMPING tabung, jangan di depan, biar tidak kena panas langsung pas buka tutup.</p>
                                <p className="mt-2 text-sm font-bold leading-relaxed text-[#8a5b00] [overflow-wrap:anywhere]">JANGAN kaca biasa. Kaca biasa kena uap 2,5 bar langsung pecah, bahaya.</p>
                              </div>
                            )}
                            <p className={`text-sm leading-relaxed text-[var(--muted)] [overflow-wrap:anywhere] ${show?"":"line-clamp-3 md:line-clamp-none"}`}>{item.note}</p><button onClick={()=>setExpanded(s=>({...s,[item.id]:!s[item.id]}))} className="mt-1 inline-flex items-center gap-1 text-xs font-bold text-[var(--blue)]"> <ChevronDown size={14} className={show?"rotate-180":""}/> {show?"Sembunyikan catatan":"Lihat catatan lengkap"}</button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {/* TOTAL BAWAH */}
        <section className="mt-5 rounded-2xl border-2 border-[var(--blue)] bg-[var(--surface-2)] p-4 sm:p-5">
          <div className="flex flex-wrap items-end justify-between gap-3"><div><p className="text-xs font-extrabold tracking-[.16em] text-[var(--blue)]">TOTAL RAB OTOMATIS</p><p className="mono mt-1 text-[clamp(1.8rem,6vw,2.8rem)] font-semibold leading-none">{rupiah(grand)}</p><p className="mt-2 text-sm text-[var(--muted)]">Total dihitung dari Jumlah × Harga satuan (ESTIMASI) di semua kelompok A–I, termasuk Kelompok H (Kaca Penduga) dan Kelompok I (Auto Refill).</p></div><div className="grid grid-cols-2 gap-3 text-right"><div><p className="text-xs text-[var(--muted)]">Sudah dibeli</p><p className="mono font-bold text-[var(--green)]">{rupiah(bought)}</p></div><div><p className="text-xs text-[var(--muted)]">Sisa</p><p className="mono font-bold">{rupiah(remaining)}</p></div></div></div>
          <div className="mt-4 grid gap-2 rounded-xl bg-[var(--surface-3)] p-3 text-sm sm:grid-cols-3"><p><strong>Kolam:</strong> 2 × 500 L = 1.000 L</p><p><strong>Bak kontrol:</strong> SS304 · tinggi 70 cm</p><p><strong>Pompa:</strong> PULSE 3–4 menit / tahap</p></div>
        </section>

        {/* SKETSA WIRING */}
        <section aria-labelledby="wiring-title" className="mt-6 rounded-2xl border border-[var(--line)] bg-[var(--surface-2)] p-4 shadow-[var(--shadow)] sm:p-5">
          <p className="text-xs font-extrabold tracking-[.16em] text-[var(--blue)]">DI BAWAH RAB · UNTUK TUKANG LISTRIK — TINGGAL NYONTEK</p>
          <h2 id="wiring-title" className="mt-1 text-xl font-black sm:text-2xl">Sketsa Wiring Box Kontroler ke HP</h2>
          <p className="mt-2 text-sm leading-relaxed text-[var(--muted)] [overflow-wrap:anywhere]">Ikuti dua jalur ini apa adanya. Semua sinyal masuk ke Box Kontroler dulu, baru diteruskan ke HP lewat WiFi. Jangan sambung pompa atau solenoid langsung ke HP.</p>

          <h3 className="mt-5 text-sm font-extrabold">Jalur 1 — Perintah isi ulang (otomatis)</h3>
          <div className="mt-2 flex flex-col items-stretch gap-2 sm:flex-row sm:items-center">
            <div className="flex-1 rounded-xl border-2 border-[var(--blue)] bg-[var(--surface-3)] p-3 text-center"><p className="text-xs font-bold text-[var(--muted)]">INPUT</p><p className="font-extrabold [overflow-wrap:anywhere]">Float Switch</p><p className="text-xs leading-relaxed [overflow-wrap:anywhere]">LOW di 120 cm · HIGH di 160 cm</p></div>
            <span aria-hidden="true" className="text-center text-xl font-black text-[var(--blue)]">→</span>
            <div className="flex-1 rounded-xl border-2 border-[var(--blue)] bg-[var(--blue)] p-3 text-center text-white"><p className="text-xs font-bold text-sky-200">OTAK</p><p className="font-extrabold [overflow-wrap:anywhere]">Box Kontroler</p><p className="text-xs leading-relaxed [overflow-wrap:anywhere]">ESP32 / PLC Mini</p></div>
            <span aria-hidden="true" className="text-center text-xl font-black text-[var(--blue)]">→</span>
            <div className="flex-1 rounded-xl border-2 border-[var(--blue)] bg-[var(--surface-3)] p-3 text-center"><p className="text-xs font-bold text-[var(--muted)]">PENGHUBUNG</p><p className="font-extrabold [overflow-wrap:anywhere]">Relay</p><p className="text-xs leading-relaxed [overflow-wrap:anywhere]">Satu relay Pompa · satu relay Solenoid</p></div>
            <span aria-hidden="true" className="text-center text-xl font-black text-[var(--blue)]">→</span>
            <div className="flex-1 rounded-xl border-2 border-[var(--amber)] bg-[var(--amber-soft)] p-3 text-center"><p className="text-xs font-bold text-[var(--muted)]">OUTPUT 24 V DC</p><p className="font-extrabold [overflow-wrap:anywhere]">Pompa + Solenoid</p><p className="text-xs leading-relaxed [overflow-wrap:anywhere]">Nyala bareng saat ON · mati bareng saat OFF</p></div>
          </div>

          <h3 className="mt-5 text-sm font-extrabold">Jalur 2 — Pantau + notif ke HP</h3>
          <div className="mt-2 flex flex-col items-stretch gap-2 sm:flex-row sm:items-center">
            <div className="flex-1 rounded-xl border border-[var(--line)] bg-[var(--surface-3)] p-3 text-center"><p className="text-xs font-bold text-[var(--muted)]">SENSOR &amp; ALAT</p><p className="font-extrabold [overflow-wrap:anywhere]">Water Meter + Pressure Gauge + Safety Valve + Voice Recorder</p><p className="text-xs leading-relaxed [overflow-wrap:anywhere]">3× Water Meter · Safety Valve buang sendiri lewat 2,5 bar</p></div>
            <span aria-hidden="true" className="text-center text-xl font-black text-[var(--blue)]">→</span>
            <div className="flex-1 rounded-xl border-2 border-[var(--blue)] bg-[var(--blue)] p-3 text-center text-white"><p className="text-xs font-bold text-sky-200">OTAK</p><p className="font-extrabold [overflow-wrap:anywhere]">ESP32 di Box Kontroler</p><p className="text-xs leading-relaxed [overflow-wrap:anywhere]">Baca level + tekanan + meteran</p></div>
            <span aria-hidden="true" className="text-center text-xl font-black text-[var(--blue)]">→</span>
            <div className="flex-1 rounded-xl border border-[var(--line)] bg-[var(--surface-3)] p-3 text-center"><p className="text-xs font-bold text-[var(--muted)]">KONEKSI</p><p className="font-extrabold [overflow-wrap:anywhere]">WiFi</p><p className="text-xs leading-relaxed [overflow-wrap:anywhere]">Telemetri IoT dari Box ke HP</p></div>
            <span aria-hidden="true" className="text-center text-xl font-black text-[var(--blue)]">→</span>
            <div className="flex-1 rounded-xl border-2 border-[var(--green)] bg-[var(--green-soft)] p-3 text-center"><p className="text-xs font-bold text-[var(--muted)]">DI HP</p><p className="font-extrabold [overflow-wrap:anywhere]">Notif Monitoring</p><p className="mono text-xs leading-relaxed [overflow-wrap:anywhere]">Level Rendah - Auto Refill ON - Level 120cm - Tekanan 1,2 bar</p><p className="mono mt-1 text-xs leading-relaxed [overflow-wrap:anywhere]">Level Normal - Auto Refill OFF - Level 160cm - Siap</p></div>
          </div>

          <ol className="mt-5 list-decimal space-y-2 pl-5 text-sm leading-relaxed [overflow-wrap:anywhere]">
            <li><strong>Pasang Float Switch</strong> pada titik 120 cm (LOW) dan 160 cm (HIGH), lalu tarik kabel sinyalnya ke input Box Kontroler.</li>
            <li><strong>Dari Box Kontroler,</strong> keluar lewat relay — bukan langsung dari ESP32 — ke Pompa DC 24 V dan Solenoid Valve 24 V DC.</li>
            <li><strong>Sambungkan</strong> 3× Water Meter, Pressure Gauge, Safety Valve, dan Voice Recorder ke Box Kontroler / ESP32 sesuai jalur pemantau.</li>
            <li><strong>Uji tanpa tekanan dulu:</strong> turunkan level → cek Pompa + Solenoid ON dan notif “Level Rendah” masuk HP. Naikkan ke 160 cm → cek OFF dan notif “Level Normal”.</li>
            <li><strong>Uji bertekanan</strong> setelah uji tanpa tekanan lolos. Safety Valve tetap terpasang dan tidak boleh dilepas.</li>
          </ol>
        </section>

        {/* CHECKLIST */}
        <section className="mt-8" aria-labelledby="checklist-title">
          <div className="flex flex-wrap items-end justify-between gap-2"><div><p className="text-xs font-extrabold tracking-[.16em] text-[var(--blue)]">03 · VERIFIKASI LAPANGAN</p><h2 id="checklist-title" className="text-xl font-black sm:text-2xl">Checklist arsitek / tukang</h2></div><span className="rounded-full bg-[var(--surface-2)] border border-[var(--line)] px-3 py-1.5 text-sm font-bold">{doneCheck} / {CHECKLIST.length} terverifikasi</span></div>
          <div className="mt-3 grid gap-3 md:grid-cols-2">
            {CHECKLIST.map((c,idx)=>{
              const done=!!checklist[c.id];
              return <button key={c.id} onClick={()=>toggleCheck(c.id)} aria-pressed={done} className={`flex gap-3 rounded-2xl border p-4 text-left shadow-[var(--shadow)] ${done?"border-[var(--green)] bg-[var(--green-soft)]":"border-[var(--line)] bg-[var(--surface-2)]"}`}>
                <span className={`grid h-7 w-7 shrink-0 place-items-center rounded-full border-2 ${done?"bg-[var(--green)] border-[var(--green)] text-white":"border-[var(--line)] text-transparent"}`}><Check size={16}/></span>
                <span><span className="flex flex-wrap gap-2"><span className="text-xs font-bold text-[var(--muted)]">CEK {idx+1}</span>{done && <span className="text-xs font-bold text-[var(--green)]">Terperiksa</span>}</span><span className="mt-1 block font-extrabold leading-snug [overflow-wrap:anywhere]">{c.title}</span><span className="mt-1 block text-sm leading-relaxed text-[var(--muted)] [overflow-wrap:anywhere]">{c.detail}</span></span>
              </button>;
            })}
          </div>
        </section>

        {/* CATATAN LAS */}
        <section className="mt-6 rounded-2xl border-l-8 border-[var(--amber)] bg-[var(--amber-soft)] p-4 sm:p-5">
          <h2 className="flex items-center gap-2 font-black"><CircleAlert className="text-[#8a5b00]"/> Catatan wajib untuk tukang las</h2>
          <ul className="mt-3 space-y-2 text-sm leading-relaxed [overflow-wrap:anywhere]">
            <li>• <strong>1 lembaran = 1 tabung.</strong> Badan 119 × 200 cm, sisa 120 × 40 cm untuk 2 tutup lingkaran Ø 38 cm.</li>
            <li>• <strong>Jangan bikin persegi.</strong> Bentuk tabung melingkar penuh, las bulat keliling. Sudut 90° rawan retak pada tekanan kerja 2,5 bar.</li>
            <li>• <strong>Urutan lubang dari atas ke bawah:</strong> Pipa Uap (vakum) → Input Sirkulasi PALING TINGGI → Output dari Tungku TENGAH → Penghubung PALING RENDAH → Reserve / Drain paling bawah.</li>
            <li>• <strong>Stop keran 2 lapis:</strong> Manual + solenoid otomatis di setiap jalur utama. Jangan mengandalkan satu lapis.</li>
            <li>• Uji bocor dan uji safety valve 2,5 bar sebelum isolasi ditutup dan sebelum operasi penuh.</li>
          </ul>
        </section>

        <footer className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-[var(--line-2)] pt-4 text-xs text-[var(--muted)]">
          <p className="flex items-center gap-1.5"><Wrench size={14}/> Dokumen kerja Plan B · Pabrik Batik Autonomous</p>
          <p className="flex items-center gap-1.5"><Flame size={14}/> Semua harga di tabel adalah ESTIMASI pasar Indonesia 2026 — konfirmasi ke supplier sebelum pembelian.</p>
          <p className="flex items-center gap-1.5"><Zap size={14}/> Sistem: ketel uap + turbin + alternator 24 V + kolam jambangan.</p>
        </footer>
      </main>
    </div>
  );
}
