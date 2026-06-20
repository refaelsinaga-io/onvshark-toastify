# ONVSHARK TOASTIFY

**Author** : Refael Sinaga 2026 | refaelsinaga.com  
**Version** : 1.0.0  
**Prefix** : `onvs-`  
**Function** : `onvsToast()`

---

## Install

Cukup include 2 file — tidak perlu library lain.

```html
<link href="onvshark-toastify/toastify.css" rel="stylesheet">
<script src="onvshark-toastify/toastify.js"></script>
```

---

## Penggunaan

```js
onvsToast(icon, type, message, subMessage, close, position)
```

### Parameter

| # | Parameter    | Type              | Keterangan |
|---|-------------|-------------------|------------|
| 1 | `icon`       | `boolean`         | `true` = tampilkan icon SVG default, `false` = tanpa icon |
| 2 | `type`       | `string`          | `'success'` `'info'` `'warning'` `'danger'` |
| 3 | `message`    | `string` / `null` | Teks utama. Jika `null` → default `"Message"` |
| 4 | `subMessage` | `string` / `null` | Teks kecil di bawah message. Boleh `null` |
| 5 | `close`      | `number` / `false`| Durasi auto-dismiss dalam ms. `false` = hanya tombol ✕ |
| 6 | `position`   | `string`          | Lihat tabel posisi di bawah |

### Posisi

| Value             | Keterangan        |
|-------------------|-------------------|
| `'top-left'`      | Atas kiri         |
| `'top-center'`    | Atas tengah       |
| `'top-right'`     | Atas kanan (default) |
| `'bottom-left'`   | Bawah kiri        |
| `'bottom-center'` | Bawah tengah      |
| `'bottom-right'`  | Bawah kanan       |
| `'middle'`        | Tengah layar      |

---

## Contoh

```js
// With icon + sub-message + auto dismiss 4 detik
onvsToast(true, 'success', 'Data berhasil disimpan', 'Record tersimpan ke database', 4000, 'top-right')

// Without icon, no sub-message, auto dismiss 3 detik
onvsToast(false, 'danger', 'Gagal menyimpan', null, 3000, 'top-right')

// Manual close only (tidak auto-dismiss)
onvsToast(true, 'warning', 'Konfirmasi diperlukan', 'Klik ✕ untuk menutup', false, 'middle')

// Auto dismiss cepat 1 detik
onvsToast(true, 'info', 'Tersimpan!', null, 1000, 'bottom-right')
```

---

## Type & Warna

| Type      | Border / Icon / Message |
|-----------|------------------------|
| `success` | `#2ab57d` (hijau)      |
| `info`    | `#4ba6ef` (biru)       |
| `warning` | `#ffbf53` (kuning)     |
| `danger`  | `#fd625e` (merah)      |

---

## Fitur

- Independen — tidak butuh jQuery, Bootstrap, atau library apapun
- Icon SVG inline — tidak butuh CDN icon
- Progress bar otomatis sesuai durasi `close`
- Animasi berbeda per posisi (slide kiri/kanan, fade, scale)
- Stack — beberapa toast bisa muncul bersamaan
- Sub-message opsional — layout otomatis menyesuaikan
- Responsive mobile

---

## Independence Check

| Dependency       | Status |
|-----------------|--------|
| CSS framework   | Tidak  |
| JS framework    | Tidak  |
| Icon library    | Tidak (SVG inline) |
| Font library    | Tidak (system font) |
| jQuery          | Tidak  |
