/**
 * MarkeTec — Capa de datos compartida
 * Todas las páginas importan este archivo para leer/escribir datos.
 * Usa localStorage como base de datos del lado del cliente.
 */

const MT = (() => {

  const KEYS = {
    negocios : 'mt_negocios',
    usuarios : 'mt_usuarios',
    sesion   : 'mt_sesion',
    resenas  : 'mt_resenas',
    carrito  : 'mt_carrito',
    pedidos  : 'mt_pedidos',
  };

  const SEED_NEGOCIOS = [
    {
      id: 1, slug: 'restaurante-chi',
      nombre: 'Restaurante Chi', emoji: '🥗',
      tipo: 'Comida saludable', categoria: 'Comida',
      descripcion: 'Ensaladas frescas y deliciosas preparadas con ingredientes del día. Opciones veganas y sin gluten disponibles.',
      direccion: 'Av. Tecnológico 1234, Tijuana, BC',
      telefono: '6641234567', whatsapp: '526641234567',
      calificacion: 4.8, total_resenas: 34,
      disponible: true, estado: 'aprobado',
      hace_entregas: false, acepta_pedidos: false,
      dueno_id: 2, galeria: [],
      menu: [
        { id: 'm1', nombre: 'Ensalada César', precio: 120, descripcion: 'Lechuga romana, crutones, parmesano' },
        { id: 'm2', nombre: 'Ensalada Griega', precio: 130, descripcion: 'Pepino, aceitunas, queso feta' },
        { id: 'm3', nombre: 'Agua de Jamaica', precio: 30, descripcion: 'Natural, sin azúcar' },
        { id: 'm4', nombre: 'Smoothie Verde', precio: 55, descripcion: 'Espinaca, manzana, pepino' },
      ],
      horario: { lun:'8:00–20:00', mar:'8:00–20:00', mie:'8:00–20:00', jue:'8:00–20:00', vie:'8:00–21:00', sab:'9:00–18:00', dom:'Cerrado' },
      fecha_registro: '2024-01-10'
    },
    {
      id: 2, slug: 'jochos-tec',
      nombre: 'Jochos Tec', emoji: '🌭',
      tipo: 'Comida rápida', categoria: 'Antojitos',
      descripcion: 'Los mejores jochos estilo Sonora con todos los ingredientes clásicos. Perfectos para botanear entre clases.',
      direccion: 'Campus Tijuana, Puerta Principal',
      telefono: '6649876543', whatsapp: '526649876543',
      calificacion: 4.6, total_resenas: 27,
      disponible: true, estado: 'aprobado',
      hace_entregas: false, acepta_pedidos: true,
      dueno_id: 3, galeria: [],
      menu: [
        { id: 'm5', nombre: 'Jocho Clásico', precio: 60, descripcion: 'Hot dog, mostaza, catsup, mayo' },
        { id: 'm6', nombre: 'Jocho Sonora', precio: 75, descripcion: 'Con tocino, chile, queso' },
        { id: 'm7', nombre: 'Jocho XXL', precio: 90, descripcion: 'Doble salchicha, triple topping' },
        { id: 'm8', nombre: 'Refresco', precio: 25, descripcion: 'Lata fría, varios sabores' },
      ],
      horario: { lun:'10:00–18:00', mar:'10:00–18:00', mie:'10:00–18:00', jue:'10:00–18:00', vie:'10:00–18:00', sab:'Cerrado', dom:'Cerrado' },
      fecha_registro: '2024-01-15'
    },
    {
      id: 3, slug: 'el-chilaquil-express',
      nombre: 'El Chilaquil Express', emoji: '☀️',
      tipo: 'Desayunos', categoria: 'Desayunos',
      descripcion: 'Chilaquiles tradicionales rojos o verdes, con pollo o sin él. El mejor desayuno para arrancar el día en el Tec.',
      direccion: 'Blvd. Agua Caliente 560, Tijuana, BC',
      telefono: '6641112233', whatsapp: '526641112233',
      calificacion: 4.9, total_resenas: 52,
      disponible: true, estado: 'aprobado',
      hace_entregas: true, acepta_pedidos: true,
      dueno_id: 4, galeria: [],
      menu: [
        { id: 'm9',  nombre: 'Chilaquiles Rojos',  precio: 90,  descripcion: 'Con crema, queso y cebolla' },
        { id: 'm10', nombre: 'Chilaquiles Verdes', precio: 90,  descripcion: 'Salsa verde, crema y queso' },
        { id: 'm11', nombre: 'Con Pollo',          precio: 120, descripcion: 'Chilaquiles + pechuga a la plancha' },
        { id: 'm12', nombre: 'Café de Olla',       precio: 35,  descripcion: 'Canela y piloncillo' },
      ],
      horario: { lun:'7:00–14:00', mar:'7:00–14:00', mie:'7:00–14:00', jue:'7:00–14:00', vie:'7:00–15:00', sab:'8:00–13:00', dom:'Cerrado' },
      fecha_registro: '2024-02-01'
    },
    {
      id: 4, slug: 'gorditas-dona-mary',
      nombre: 'Gorditas Doña Mary', emoji: '👵',
      tipo: 'Antojitos mexicanos', categoria: 'Antojitos',
      descripcion: 'Gorditas rellenas de guisado del día: frijoles, chicharrón, rajas, picadillo. Hechas a mano con amor.',
      direccion: 'Zona Centro, Tijuana, BC',
      telefono: '6643334455', whatsapp: '526643334455',
      calificacion: 4.7, total_resenas: 41,
      disponible: false, estado: 'aprobado',
      hace_entregas: false, acepta_pedidos: false,
      dueno_id: 5, galeria: [],
      menu: [
        { id: 'm13', nombre: 'Gordita de Frijoles',    precio: 60, descripcion: 'Con queso y salsa' },
        { id: 'm14', nombre: 'Gordita de Chicharrón',  precio: 65, descripcion: 'Chicharrón en salsa verde' },
        { id: 'm15', nombre: 'Gordita de Rajas',       precio: 60, descripcion: 'Rajas con crema' },
        { id: 'm16', nombre: 'Gordita de Picadillo',   precio: 65, descripcion: 'Carne molida guisada' },
      ],
      horario: { lun:'9:00–17:00', mar:'9:00–17:00', mie:'9:00–17:00', jue:'9:00–17:00', vie:'9:00–18:00', sab:'9:00–15:00', dom:'10:00–14:00' },
      fecha_registro: '2024-02-10'
    },
    {
      id: 5, slug: 'mariscos-el-puerto',
      nombre: 'Mariscos El Puerto', emoji: '🦞',
      tipo: 'Mariscos y caldo', categoria: 'Mariscos',
      descripcion: 'Caldo de mariscos lleno de camarón, pulpo, almeja y más. La receta que calienta el alma.',
      direccion: 'Av. Internacional 890, Tijuana, BC',
      telefono: '6645556677', whatsapp: '526645556677',
      calificacion: 4.5, total_resenas: 19,
      disponible: true, estado: 'aprobado',
      hace_entregas: true, acepta_pedidos: true,
      dueno_id: 6, galeria: [],
      menu: [
        { id: 'm17', nombre: 'Caldo 7 Mares',      precio: 150, descripcion: 'Camarón, pulpo, almeja, jaiba' },
        { id: 'm18', nombre: 'Ceviche de Camarón', precio: 120, descripcion: 'Fresco, con limón y chile' },
        { id: 'm19', nombre: 'Tostada de Marlin',  precio: 55,  descripcion: 'Marlin ahumado, aguacate' },
        { id: 'm20', nombre: 'Agua Fresca',         precio: 30,  descripcion: 'Horchata, jamaica o tamarindo' },
      ],
      horario: { lun:'11:00–19:00', mar:'11:00–19:00', mie:'11:00–19:00', jue:'11:00–19:00', vie:'11:00–20:00', sab:'10:00–20:00', dom:'10:00–18:00' },
      fecha_registro: '2024-03-05'
    },
  ];

  const SEED_USUARIOS = [
    { id: 1, nombre: 'Admin MarkeTec', email: 'admin@marketec.mx', password: 'admin123', rol: 'admin',        avatar: '⚙️', fecha: '2024-01-01' },
    { id: 2, nombre: 'Ana García',     email: 'ana@tec.mx',        password: '1234',     rol: 'emprendedor', negocio_id: 1, avatar: '👩', fecha: '2024-01-10' },
    { id: 3, nombre: 'Carlos López',   email: 'carlos@tec.mx',     password: '1234',     rol: 'emprendedor', negocio_id: 2, avatar: '👨', fecha: '2024-01-15' },
    { id: 4, nombre: 'María Torres',   email: 'maria@tec.mx',      password: '1234',     rol: 'emprendedor', negocio_id: 3, avatar: '👩', fecha: '2024-02-01' },
    { id: 5, nombre: 'Pedro Ruiz',     email: 'pedro@tec.mx',      password: '1234',     rol: 'emprendedor', negocio_id: 4, avatar: '👨', fecha: '2024-02-10' },
    { id: 6, nombre: 'Laura Méndez',   email: 'laura@tec.mx',      password: '1234',     rol: 'emprendedor', negocio_id: 5, avatar: '👩', fecha: '2024-03-05' },
  ];

  const SEED_RESENAS = [
    { id: 1, negocio_id: 1, usuario: 'Diego S.',    calificacion: 5, comentario: 'La ensalada César está increíble, muy fresca y abundante.', fecha: '2024-04-10' },
    { id: 2, negocio_id: 1, usuario: 'Sofía M.',    calificacion: 5, comentario: 'Me encantan las opciones veganas, todo muy rico.',           fecha: '2024-04-15' },
    { id: 3, negocio_id: 1, usuario: 'Roberto A.',  calificacion: 4, comentario: 'Buen sabor, un poco caro pero vale la pena.',               fecha: '2024-05-01' },
    { id: 4, negocio_id: 2, usuario: 'Karen L.',    calificacion: 5, comentario: 'Los jochos Sonora son los mejores del campus.',             fecha: '2024-03-20' },
    { id: 5, negocio_id: 2, usuario: 'Iván R.',     calificacion: 4, comentario: 'Ricos y rápidos, perfecto entre clases.',                   fecha: '2024-04-02' },
    { id: 6, negocio_id: 3, usuario: 'Valeria P.',  calificacion: 5, comentario: '¡Los mejores chilaquiles verdes que he probado!',           fecha: '2024-04-20' },
    { id: 7, negocio_id: 3, usuario: 'Miguel F.',   calificacion: 5, comentario: 'El café de olla es perfecto para arrancar el día.',         fecha: '2024-05-05' },
    { id: 8, negocio_id: 4, usuario: 'Gabriela N.', calificacion: 5, comentario: 'Las gorditas de chicharrón son un sueño.',                  fecha: '2024-04-25' },
    { id: 9, negocio_id: 5, usuario: 'Héctor V.',   calificacion: 4, comentario: 'Caldo muy sabroso, ingredientes frescos.',                  fecha: '2024-05-10' },
  ];

  /* ── helpers ── */
  function _get(key)      { try { return JSON.parse(localStorage.getItem(key) || 'null') || []; } catch { return []; } }
  function _set(key, val) { localStorage.setItem(key, JSON.stringify(val)); }
  function _nextId(arr)   { return arr.length ? Math.max(...arr.map(x => x.id)) + 1 : 1; }

  /* ── seed ── */
  function init() {
    if (!localStorage.getItem(KEYS.negocios)) _set(KEYS.negocios, SEED_NEGOCIOS);
    if (!localStorage.getItem(KEYS.usuarios)) _set(KEYS.usuarios, SEED_USUARIOS);
    if (!localStorage.getItem(KEYS.resenas))  _set(KEYS.resenas,  SEED_RESENAS);
    if (!localStorage.getItem(KEYS.carrito))  _set(KEYS.carrito,  []);
    if (!localStorage.getItem(KEYS.pedidos))  _set(KEYS.pedidos,  []);
  }

  /* ══════════════════════════════════════════════════════
     AUTH
  ══════════════════════════════════════════════════════ */
  const Auth = {
    login(email, password) {
      const u = _get(KEYS.usuarios).find(u => u.email === email && u.password === password);
      if (!u) return null;
      const s = { ...u }; delete s.password;
      _set(KEYS.sesion, s); return s;
    },
    logout() { localStorage.removeItem(KEYS.sesion); },
    current() { try { return JSON.parse(localStorage.getItem(KEYS.sesion) || 'null'); } catch { return null; } },
    isAdmin()       { const u = Auth.current(); return !!(u && u.rol === 'admin'); },
    isEmprendedor() { const u = Auth.current(); return !!(u && u.rol === 'emprendedor'); },
    register(data) {
      const users = _get(KEYS.usuarios);
      if (users.find(u => u.email === data.email)) return { error: 'Email ya registrado' };
      const nu = { ...data, id: _nextId(users), fecha: new Date().toISOString().split('T')[0] };
      users.push(nu); _set(KEYS.usuarios, users); return nu;
    },
    updateUser(id, data) {
      const users = _get(KEYS.usuarios);
      const i = users.findIndex(u => u.id === parseInt(id));
      if (i === -1) return null;
      users[i] = { ...users[i], ...data }; _set(KEYS.usuarios, users);
      const s = Auth.current();
      if (s && s.id === parseInt(id)) _set(KEYS.sesion, { ...s, ...data });
      return users[i];
    }
  };

  /* ══════════════════════════════════════════════════════
     NEGOCIOS
  ══════════════════════════════════════════════════════ */
  const Negocios = {
    getAll()        { return _get(KEYS.negocios); },
    getAprobados()  { return Negocios.getAll().filter(n => n.estado === 'aprobado'); },
    getPendientes() { return Negocios.getAll().filter(n => n.estado === 'pendiente'); },
    getById(id)     { return Negocios.getAll().find(n => n.id === parseInt(id)); },
    getByDueno(uid) { return Negocios.getAll().find(n => n.dueno_id === parseInt(uid)); },
    save(neg) {
      const todos = Negocios.getAll();
      const i = todos.findIndex(n => n.id === neg.id);
      if (i === -1) {
        const n = { ...neg, id: _nextId(todos), fecha_registro: new Date().toISOString().split('T')[0] };
        todos.push(n); _set(KEYS.negocios, todos); return n;
      }
      todos[i] = { ...todos[i], ...neg }; _set(KEYS.negocios, todos); return todos[i];
    },
    aprobar(id)  { return Negocios.save({ id: parseInt(id), estado: 'aprobado' }); },
    rechazar(id) { return Negocios.save({ id: parseInt(id), estado: 'rechazado' }); },
    eliminar(id) { _set(KEYS.negocios, Negocios.getAll().filter(n => n.id !== parseInt(id))); },
    toggleDisponible(id) {
      const n = Negocios.getById(id);
      return n ? Negocios.save({ ...n, disponible: !n.disponible }) : null;
    },
    addMenuItem(nid, item) {
      const n = Negocios.getById(nid); if (!n) return null;
      const menu = [...(n.menu || []), { ...item, id: 'm' + Date.now() }];
      return Negocios.save({ ...n, menu });
    },
    removeMenuItem(nid, mid) {
      const n = Negocios.getById(nid); if (!n) return null;
      return Negocios.save({ ...n, menu: n.menu.filter(m => m.id !== mid) });
    },
    addGaleria(nid, url) {
      const n = Negocios.getById(nid); if (!n) return null;
      return Negocios.save({ ...n, galeria: [...(n.galeria || []), url] });
    },
    removeGaleria(nid, url) {
      const n = Negocios.getById(nid); if (!n) return null;
      return Negocios.save({ ...n, galeria: n.galeria.filter(u => u !== url) });
    }
  };

  /* ══════════════════════════════════════════════════════
     RESEÑAS
  ══════════════════════════════════════════════════════ */
  const Resenas = {
    getAll()         { return _get(KEYS.resenas); },
    getByNegocio(id) { return Resenas.getAll().filter(r => r.negocio_id === parseInt(id)); },
    add(r) {
      const todas = Resenas.getAll();
      const nueva = { ...r, id: _nextId(todas), fecha: new Date().toISOString().split('T')[0] };
      todas.push(nueva); _set(KEYS.resenas, todas);
      const neg = Resenas.getByNegocio(r.negocio_id);
      const avg = neg.reduce((s, x) => s + x.calificacion, 0) / neg.length;
      Negocios.save({ id: parseInt(r.negocio_id), calificacion: Math.round(avg * 10) / 10, total_resenas: neg.length });
      return nueva;
    },
    eliminar(id) { _set(KEYS.resenas, Resenas.getAll().filter(r => r.id !== parseInt(id))); }
  };

  /* ══════════════════════════════════════════════════════
     CARRITO
  ══════════════════════════════════════════════════════ */
  const Carrito = {
    get() { return _get(KEYS.carrito); },
    add(item) {
      const c = Carrito.get();
      const i = c.findIndex(x => x.id === item.id && x.negocio_id === item.negocio_id);
      if (i !== -1) c[i].cantidad += (item.cantidad || 1);
      else c.push({ ...item, cantidad: item.cantidad || 1 });
      _set(KEYS.carrito, c); return c;
    },
    remove(iid, nid) {
      const c = Carrito.get().filter(x => !(x.id === iid && x.negocio_id === nid));
      _set(KEYS.carrito, c); return c;
    },
    updateQty(iid, nid, qty) {
      if (qty <= 0) return Carrito.remove(iid, nid);
      const c = Carrito.get();
      const i = c.findIndex(x => x.id === iid && x.negocio_id === nid);
      if (i !== -1) { c[i].cantidad = qty; _set(KEYS.carrito, c); } return c;
    },
    clear(nid) {
      _set(KEYS.carrito, nid ? Carrito.get().filter(x => x.negocio_id !== nid) : []);
    },
    total(nid) { return Carrito.get().filter(x => !nid || x.negocio_id === nid).reduce((s, x) => s + x.precio * x.cantidad, 0); },
    count(nid) { return Carrito.get().filter(x => !nid || x.negocio_id === nid).reduce((s, x) => s + x.cantidad, 0); }
  };

  /* ══════════════════════════════════════════════════════
     PEDIDOS
  ══════════════════════════════════════════════════════ */
  const Pedidos = {
    getAll()        { return _get(KEYS.pedidos); },
    getByNegocio(id){ return Pedidos.getAll().filter(p => p.negocio_id === parseInt(id)); },
    add(p) {
      const todos = Pedidos.getAll();
      const nuevo = { ...p, id: _nextId(todos), fecha: new Date().toISOString(), estado: 'pendiente' };
      todos.push(nuevo); _set(KEYS.pedidos, todos); return nuevo;
    },
    updateEstado(id, estado) {
      const todos = Pedidos.getAll();
      const i = todos.findIndex(p => p.id === parseInt(id));
      if (i !== -1) { todos[i].estado = estado; _set(KEYS.pedidos, todos); }
    }
  };

  /* ══════════════════════════════════════════════════════
     USUARIOS (admin)
  ══════════════════════════════════════════════════════ */
  const Usuarios = {
    getAll()     { return _get(KEYS.usuarios).map(({ password, ...rest }) => rest); },
    getById(id)  { return Usuarios.getAll().find(u => u.id === parseInt(id)); },
    eliminar(id) { _set(KEYS.usuarios, _get(KEYS.usuarios).filter(u => u.id !== parseInt(id))); }
  };

  /* ══════════════════════════════════════════════════════
     UTILS
  ══════════════════════════════════════════════════════ */
  const Utils = {
    stars(n) {
      const f = Math.floor(n), h = n % 1 >= 0.5 ? 1 : 0, e = 5 - f - h;
      return '★'.repeat(f) + (h ? '✩' : '') + '☆'.repeat(e);
    },
    estaAbierto(horario) {
      const dias = ['dom','lun','mar','mie','jue','vie','sab'];
      const h = horario[dias[new Date().getDay()]];
      if (!h || h === 'Cerrado') return false;
      try {
        const [a, b] = h.split('–').map(t => { const [hh, mm] = t.split(':').map(Number); return hh * 60 + (mm||0); });
        const m = new Date().getHours() * 60 + new Date().getMinutes();
        return m >= a && m <= b;
      } catch { return true; }
    },
    horarioHoy(horario) {
      const dias = ['dom','lun','mar','mie','jue','vie','sab'];
      return horario[dias[new Date().getDay()]] || 'Cerrado';
    },
    toast(msg, tipo = 'success') {
      const t = document.createElement('div');
      t.className = `mt-toast mt-toast-${tipo}`;
      t.textContent = msg;
      document.body.appendChild(t);
      requestAnimationFrame(() => t.classList.add('show'));
      setTimeout(() => { t.classList.remove('show'); setTimeout(() => t.remove(), 400); }, 3000);
    },
    formatDate(iso) {
      return new Date(iso).toLocaleDateString('es-MX', { day:'2-digit', month:'short', year:'numeric' });
    },
    slug(s) { return s.toLowerCase().replace(/\s+/g,'-').replace(/[^a-z0-9-]/g,''); }
  };

  /* ══════════════════════════════════════════════════════
     NAV + TOAST STYLES
  ══════════════════════════════════════════════════════ */
  function renderNav() {
    const u = Auth.current();
    const el = document.querySelector('.nav-actions');
    if (!el) return;
    if (u) {
      const dash = u.rol === 'admin' ? 'admin.html' : 'dashboard.html';
      el.innerHTML = `
        <span style="font-weight:700;font-size:0.88rem">${u.avatar||'👤'} ${u.nombre.split(' ')[0]}</span>
        <a href="${dash}" class="btn-outline" style="text-decoration:none">Panel</a>
        <button class="btn-solid" onclick="MT.Auth.logout();window.location.href='index.html'">Salir</button>`;
    } else {
      el.innerHTML = `
        <a href="auth.html" class="btn-outline" style="text-decoration:none">Iniciar sesión</a>
        <a href="auth.html?tab=registro" class="btn-solid" style="text-decoration:none">Regístrate</a>`;
    }
  }

  function injectToastCSS() {
    if (document.getElementById('mt-toast-css')) return;
    const s = document.createElement('style'); s.id = 'mt-toast-css';
    s.textContent = `.mt-toast{position:fixed;bottom:28px;right:28px;z-index:9999;background:#1a1a2e;color:#fff;padding:14px 22px;border-radius:12px;font-family:'Nunito',sans-serif;font-weight:700;font-size:.9rem;box-shadow:0 4px 20px rgba(0,0,0,.2);transform:translateY(20px);opacity:0;transition:all .35s cubic-bezier(.4,0,.2,1);max-width:320px}.mt-toast.show{transform:translateY(0);opacity:1}.mt-toast-error{background:#e63030!important}.mt-toast-success{background:#2dba5e!important}`;
    document.head.appendChild(s);
  }

  init();
  document.addEventListener('DOMContentLoaded', () => { injectToastCSS(); renderNav(); });

  return { Auth, Negocios, Resenas, Carrito, Pedidos, Usuarios, Utils, renderNav };
})();
