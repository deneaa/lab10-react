# Crearea unei Aplicații de Documentație cu React Router

## Cerințe Generale

### Configurare Proiect
- Creează un proiect `React` folosind `Vite` și `react-router` v7.
- Aplicația trebuie să fie un **site de documentație** cu navigare completă prin toate mecanismele oferite de React Router, având conținut structurat local (fișiere JSON).

### Tematica
- Fiecare student își alege propria tematică pentru documentație. Tematica trebuie să acopere cel puțin **3 secțiuni distincte** și **minim 15 pagini de conținut** (câte 5 per secțiune).
- Exemple orientative: documentație pentru o librărie JS fictivă, ghid pentru un joc, referențe API pentru un framework, tutoriale de bucătărie, manual pentru un instrument muzical etc.
- Fiecare pagină trebuie să aibă `id`, `titlu`, `sectiune`, `tag-uri` și `continut`.

---

## Funcționalități

### 1. Structura Ierarhică de Rute

- Configurează `<BrowserRouter>` la rădăcina aplicației în `main.jsx`.
- Definește următoarea structură de rute:
  - `/` — pagina de start cu `<Layout />`, care împarte header/footer cu `/despre` și `/contact` printr-o **rută layout fără `path`**.
  - `/docs` — rută părinte cu `<DocsLayout />` și `<Outlet />`.
    - rută `index` care randează un ecran de bun venit la URL-ul exact `/docs`.
    - `/docs/:sectiune` — prezintă paginile din secțiunea respectivă.
    - `/docs/:sectiune/:paginaId` — afișează conținutul paginii specifice.
    - `/docs/:sectiune/:paginaId/editare` — afișează un formular de editare pentru o pagină.
  - `/cauta` — pagină de căutare globală.
  - `/istoric` — pagină care arată ultimele pagini vizitate.
  - `*` — catch-all 404 cu mesaj prietenos și buton "Înapoi" ce apelează `navigate(-1)`.

### 2. Layout Imbricat cu `<Outlet />`

- `<DocsLayout />` conține:
  - **Sidebar** cu lista secțiunilor și paginilor, generată dinamic din datele JSON.
  - **`<Outlet />`** central unde se randează ruta copil activă.
- Sidebar-ul rămâne vizibil pentru toate rutele `/docs/*` — nu se re-randează la schimbarea paginii.
- Pe rutele de tip `/docs/:sectiune/:paginaId`, adaugă un **al doilea `<Outlet />`** imbricat într-un panou lateral care poate afișa opțional ruta `/docs/:sectiune/:paginaId/comentarii` (rută imbricată suplimentară).

### 3. Breadcrumb Dinamic din URL

- Pe orice rută din `/docs/*`, afișează un breadcrumb construit exclusiv din segmentele URL-ului curent (ex: `Docs / Ghid de start / Instalare / Editare`).
- Fiecare nivel al breadcrumb-ului este un `<Link>` funcțional către URL-ul său parțial.
- Folosește `useLocation()` pentru a accesa `pathname` și construi breadcrumb-ul dinamic.

### 4. Rute Dinamice cu `useParams`

- Ruta `/docs/:sectiune/:paginaId` citește ambii parametri cu `useParams()`.
- Afișează conținutul paginii corespunzătoare pe baza celor doi parametri.
- Dacă `sectiune` sau `paginaId` nu există în date, randează un component `<PaginaInexistenta />` — **nu** folosi ruta catch-all `*` pentru asta.
- Implementează navigare "Pagina anterioară / Pagina următoare" în cadrul unei secțiuni, folosind `<Link>`-uri generate din ordonarea paginilor din JSON.

### 5. Căutare cu `useSearchParams`

- Pe `/cauta`, implementează o căutare care citește **exclusiv din URL** query params:
  - `?q=text` — textul căutat.
  - `?sectiune=api` — filtru pe secțiune.
  - `?tag=hooks` — filtru pe tag (multi-valoare: `?tag=hooks&tag=routing`).
- Input-ul de căutare actualizează URL-ul la tastare — sursa de adevăr este mereu URL-ul, nu un `useState` local.
- Butoanele "Resetează filtrele" și "Adaugă tag" modifică `searchParams` prin `setSearchParams`.
- La refresh-ul paginii, toate filtrele rămân active (pentru că sunt în URL).
- Rezultatele căutării sunt `<Link>`-uri directe către `/docs/:sectiune/:paginaId`.

### 6. `<Link>` vs `<a>` vs `<NavLink>`

- Toate navigările interne folosesc `<Link>` sau `<NavLink>` — **niciun `<a href>` intern**.
- Linkurile din sidebar sunt `<NavLink>` cu stil activ vizibil (fundal, text bold) pentru pagina curentă.
- Linkurile către secțiuni (`/docs/:sectiune`) folosesc prop-ul `end` corect pentru a nu rămâne active pe sub-rute.
- Folosește funcția `className={({ isActive }) => ...}` și `children={({ isActive }) => ...}` pentru afișarea unui indicator ✓ lângă linkul activ.
- `<a href>` folosit **doar** pentru linkuri externe.

### 7. Navigare Programatică cu `useNavigate`

- Formularul de căutare rapidă din header folosește `useNavigate('/cauta?q=...')` la submit.
- Pe pagina de editare, butonul "Salvează" apelează `navigate('/docs/:sectiune/:paginaId', { replace: true })` pentru ca Back să sară peste formular.
- Butonul "Anulează" din formular folosește `navigate(-1)`.
- Pe pagina 404, buton "Înapoi" cu `navigate(-1)` și buton "Acasă" cu `<Link to="/">`.
- Implementează un shortcut pentru tastatură (`Ctrl+K`) care apelează `navigate('/cauta')` și focusează input-ul.

### 8. Redirecționări Declarative cu `<Navigate>`

- Ruta `/docs` (fără sub-path, **în afara** rutei index) poate redirecționa la prima secțiune disponibilă cu `<Navigate to="..." replace />`.
- Implementează un "mod privat" simulat: secțiunea `/docs/privat/*` cere un flag simplu (ex: boolean din context).
- Dacă flag-ul e `false`, componentul randează `<Navigate to="/login" replace  />` **în timpul randării**.
- Pagina `/login` are un buton care setează flag-ul și folosește `navigate(state.from.pathname)` pentru a reveni la ruta inițial cerută.

### 9. Ruta Catch-all și Matching Specific

- Ruta `*` prinde orice URL necunoscut și randează `<NotFound />`.
- Asigură-te că rutele specifice (ex: `/cauta`, `/docs`) câștigă în fața rutei catch-all.
- Adaugă o rută suplimentară `/docs/*` care prinde URL-uri invalide **doar sub `/docs/`** (ex: `/docs/abc/xyz/ceva`) și afișează un 404 specific contextului docs, cu sidebar-ul încă vizibil.

### 10. Istoric de Navigare Propriu

- Implementează o pagină `/istoric` care afișează ultimele 10 pagini vizitate din `/docs/*`.
- Fiecare intrare din istoric este un `<Link>` funcțional care duce utilizatorul înapoi la acea pagină.
- Buton "Șterge istoric" care resetează lista.

---

## Barem de notare

| Punctaj | Sarcina |
|---------|---------|
| 1 | Crearea corectă a proiectului (Vite + React + react-router v7); date JSON cu minim 15 pagini în 3+ secțiuni |
| 1 | Structura ierarhică de rute completă, inclusiv rută layout fără `path` și rută `index` |
| 1 | Layout imbricat cu `<Outlet />` (inclusiv al doilea `<Outlet />` pentru rute imbricate suplimentare) |
| 1 | Rute dinamice cu `useParams` (două segmente), navigare prev/next între pagini|
| 1 | Breadcrumb construit dinamic din `useLocation().pathname` cu `<Link>`-uri funcționale pentru fiecare nivel |
| 1 | Căutare completă cu `useSearchParams` (q + filtre + tag-uri multiple), URL ca unică sursă de adevăr |
| 1 | Navigare corectă cu `<Link>`, `<NavLink>` (cu `isActive`, `end`) și `<a>` exclusiv pentru linkuri externe |
| 1 | `useNavigate` în toate contextele cerute (push, `replace`, `navigate(-1)`, pasare `state`) |
| 1 | Redirecționare declarativă cu `<Navigate>` |
| 1 | Ruta catch-all `*` + catch-all contextual `/docs/*` + pagina `/istoric` funcțională |

### Link de exemplu de soluție: [Docs App](https://lab10-react-example.vercel.app/)

## !! BAREM-UL DE MAI SUS ESTE PENTRU VERIFICAREA INIȚIALĂ A LABORATORULUI — LA ÎNCĂRCAREA ACESTUIA PE GITHUB. NOTA FINALĂ POATE FI MODIFICATĂ ÎN DEPENDENȚA APĂRĂRII LABORATORULUI ÎN CADRUL ORELOR !!

## !! NU SE ACCEPTĂ ÎNTÂRZIERI !!
****