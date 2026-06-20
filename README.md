# onvshark-toastify

Lightweight vanilla-JS toast notification — no dependencies, no jQuery, no framework required.

![version](https://img.shields.io/badge/version-1.0.0-blue?style=flat-square)
![license](https://img.shields.io/badge/license-MIT-green?style=flat-square)
![vanilla js](https://img.shields.io/badge/vanilla-JS-f7df1e?style=flat-square&logoColor=black)
![no dependencies](https://img.shields.io/badge/dependencies-none-brightgreen?style=flat-square)
![size](https://img.shields.io/badge/size-~5kb-lightgrey?style=flat-square)

**Author:** Refael Sinaga · [refaelsinaga.com](https://refaelsinaga.com)  
**Version:** 1.0.0  
**License:** MIT

---

## Installation

Copy the two files into your project:

```
toastify.css
toastify.js
```

Include them in your HTML:

```html
<link rel="stylesheet" href="toastify.css">
<script src="toastify.js"></script>
```

---

## Usage

```js
onvsToast(icon, type, message, subMessage, close, position)
```

| # | Parameter | Type | Description |
|---|-----------|------|-------------|
| 1 | `icon` | `boolean` | `true` = show icon, `false` = no icon |
| 2 | `type` | `string` | `'success'` · `'info'` · `'warning'` · `'danger'` |
| 3 | `message` | `string \| null` | Main text (pass `null` for default `"Message"`) |
| 4 | `subMessage` | `string \| null` | Small text below message (pass `null` to omit) |
| 5 | `close` | `number \| false` | Auto-dismiss in ms — `false` = close button only |
| 6 | `position` | `string` | See position table below |

### Position values

| Value | Description |
|-------|-------------|
| `'top-left'` | Top left corner |
| `'top-center'` | Top center |
| `'top-right'` | Top right corner (default) |
| `'bottom-left'` | Bottom left corner |
| `'bottom-center'` | Bottom center |
| `'bottom-right'` | Bottom right corner |
| `'middle'` | Center of screen |

---

## Examples

### With icon + sub-message + auto dismiss

```js
onvsToast(true, 'success', 'Data berhasil disimpan', 'Record tersimpan ke database', 4000, 'top-right')

onvsToast(true, 'info', 'Sinkronisasi berjalan', 'Mohon tunggu sebentar', 4000, 'top-right')

onvsToast(true, 'warning', 'Stok hampir habis', 'Segera lakukan pemesanan ulang', 4000, 'top-right')

onvsToast(true, 'danger', 'Gagal menyimpan data', 'Periksa koneksi dan coba lagi', 4000, 'top-right')
```

### Without icon, no sub-message

```js
onvsToast(false, 'success', 'Berhasil dihapus', null, 3000, 'top-right')

onvsToast(false, 'danger', 'Gagal menyimpan', null, 3000, 'top-right')
```

### Manual close only (no auto-dismiss)

```js
onvsToast(true, 'danger', 'Hanya tombol close', null, false, 'top-right')

onvsToast(true, 'warning', 'Konfirmasi diperlukan', 'Klik ✕ untuk menutup', false, 'middle')
```

### Custom duration

```js
onvsToast(true, 'success', 'Tersimpan!', null, 1000, 'top-right')   // 1 s

onvsToast(true, 'info', 'Info', null, 3000, 'top-right')             // 3 s

onvsToast(true, 'warning', 'Peringatan', null, 6000, 'top-right')    // 6 s
```

### All positions

```js
onvsToast(true, 'info', 'Top Left',      null, 3000, 'top-left')
onvsToast(true, 'info', 'Top Center',    null, 3000, 'top-center')
onvsToast(true, 'info', 'Top Right',     null, 3000, 'top-right')
onvsToast(true, 'info', 'Bottom Left',   null, 3000, 'bottom-left')
onvsToast(true, 'info', 'Bottom Center', null, 3000, 'bottom-center')
onvsToast(true, 'info', 'Bottom Right',  null, 3000, 'bottom-right')
onvsToast(true, 'info', 'Middle',        null, 3000, 'middle')
```

---

## Type colors

| Type | Color |
|------|-------|
| `success` | `#2ab57d` |
| `info` | `#4ba6ef` |
| `warning` | `#ffbf53` |
| `danger` | `#fd625e` |

---

## Behavior

- Progress bar shrinks automatically based on `close` duration.
- Passing `false` for `close` disables auto-dismiss — toast stays until the **✕** button is clicked.
- Multiple toasts stack in the same position container.
- Each position (`top-right`, `bottom-left`, `middle`, etc.) has its own animation direction.
- `subMessage` is optional — layout adjusts automatically when omitted.
- Responsive on mobile (≤ 480 px).
