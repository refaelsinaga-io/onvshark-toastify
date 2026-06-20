/**
 * ONVSHARK TOASTIFY
 * Author  : Refael Sinaga 2026 | refaelsinaga.com
 * Version : 1.0.0
 *
 * onvsToast(icon, type, message, subMessage, close, position)
 *
 * @param {boolean}      icon       - true = icon SVG default, false = tanpa icon
 * @param {string}       type       - 'success' | 'info' | 'warning' | 'danger'
 * @param {string|null}  message    - teks utama (null → "Message")
 * @param {string|null}  subMessage - teks kecil di bawah (boleh null)
 * @param {number|false} close      - ms auto-dismiss, atau false = hanya tombol close
 * @param {string}       position   - 'top-left' | 'top-center' | 'top-right'
 *                                    'bottom-left' | 'bottom-center' | 'bottom-right'
 *                                    'middle'
 */
(function (window) {
    'use strict';

    /* ── SVG icons inline ── */
    const ICONS = {
        success: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="10"/>
                    <polyline points="9 12 11.5 14.5 15.5 9.5"/>
                  </svg>`,
        info:    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="10"/>
                    <line x1="12" y1="8" x2="12" y2="12"/>
                    <line x1="12" y1="16" x2="12.01" y2="16"/>
                  </svg>`,
        warning: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                    <line x1="12" y1="9" x2="12" y2="13"/>
                    <line x1="12" y1="17" x2="12.01" y2="17"/>
                  </svg>`,
        danger:  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="10"/>
                    <line x1="15" y1="9" x2="9" y2="15"/>
                    <line x1="9" y1="9" x2="15" y2="15"/>
                  </svg>`,
    };

    const CLOSE_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                         stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                         <line x1="18" y1="6" x2="6" y2="18"/>
                         <line x1="6" y1="6" x2="18" y2="18"/>
                       </svg>`;

    const POS_ID = {
        'top-left'      : 'onvs-toast-tl',
        'top-center'    : 'onvs-toast-tc',
        'top-right'     : 'onvs-toast-tr',
        'bottom-left'   : 'onvs-toast-bl',
        'bottom-center' : 'onvs-toast-bc',
        'bottom-right'  : 'onvs-toast-br',
        'middle'        : 'onvs-toast-mid',
    };

    const containers = {};
    let idCounter = 0;

    function getContainer(position) {
        const pos = POS_ID[position] ? position : 'top-right';
        const cid = POS_ID[pos];
        if (!containers[cid]) {
            const el = document.createElement('div');
            el.id = cid;
            el.className = `onvs-toast-container onvs-toast-pos-${pos.replace(/-/g, '_')}`;
            document.body.appendChild(el);
            containers[cid] = el;
        }
        return containers[cid];
    }

    function escape(str) {
        const d = document.createElement('div');
        d.textContent = str;
        return d.innerHTML;
    }

    function dismiss(el, timerId) {
        clearTimeout(timerId);
        el.classList.add('onvs-toast-closing');
        setTimeout(() => el.parentNode && el.parentNode.removeChild(el), 250);
    }

    function onvsToast(icon, type, message, subMessage, close, position) {
        const validTypes = ['success', 'info', 'warning', 'danger'];
        const t        = validTypes.includes(type) ? type : 'info';
        const msg      = (message && message !== '') ? message : 'Message';
        const useIcon  = icon !== false;
        const hasSub   = (subMessage && subMessage !== '');
        const duration = (close === false || close === 0) ? false : (Number(close) > 0 ? Number(close) : 4000);
        const pos      = POS_ID[position] ? position : 'top-right';

        const el = document.createElement('div');
        el.id    = `onvs-toast-${++idCounter}`;
        el.className = [
            'onvs-toast',
            `onvs-toast-${t}`,
            useIcon ? '' : 'onvs-toast-no-icon',
            hasSub  ? 'onvs-toast-has-sub' : '',
        ].filter(Boolean).join(' ');

        const showBar = duration !== false;
        if (showBar) el.style.setProperty('--onvs-toast-dur', duration + 'ms');

        el.innerHTML = `
            ${useIcon ? `<div class="onvs-toast-icon">${ICONS[t]}</div>` : ''}
            <div class="onvs-toast-body">
                <div class="onvs-toast-message">${escape(msg)}</div>
                ${hasSub ? `<div class="onvs-toast-sub">${escape(subMessage)}</div>` : ''}
            </div>
            <button class="onvs-toast-close" title="Tutup">${CLOSE_SVG}</button>
            ${showBar ? '<div class="onvs-toast-bar"></div>' : ''}
        `;

        getContainer(pos).appendChild(el);

        if (showBar) {
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    const bar = el.querySelector('.onvs-toast-bar');
                    if (bar) bar.style.width = '0%';
                });
            });
        }

        const timerId = duration !== false
            ? setTimeout(() => dismiss(el, null), duration)
            : null;

        el.querySelector('.onvs-toast-close').addEventListener('click', () => dismiss(el, timerId));
    }

    window.onvsToast = onvsToast;

})(window);
