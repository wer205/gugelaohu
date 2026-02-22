(function() {
  'use strict';

  // Ensure viewport meta tag exists (Notion exports lack it, breaking mobile rendering)
  if (!document.querySelector('meta[name="viewport"]')) {
    var meta = document.createElement('meta');
    meta.name = 'viewport';
    meta.content = 'width=device-width, initial-scale=1.0';
    document.head.appendChild(meta);
  }

  // Page directory structure
  var pages = {
    beginners: [
      { emoji: '\uD83D\uDCB5', title: '\u8D26\u6237\u548C\u670D\u52A1\u4EF7\u683C', file: '\u8D26\u6237\u548C\u670D\u52A1\u4EF7\u683C.html' },
      { emoji: '\uD83D\uDD0E', title: '\u5982\u4F55\u9009\u62E9\u9002\u5408\u60A8\u9700\u6C42\u7684\u6D88\u8D39\u989D\u5EA6\uFF1F', file: '\u5982\u4F55\u9009\u62E9\u9002\u5408\u60A8\u9700\u6C42\u7684\u6D88\u8D39\u989D\u5EA6\uFF1F.html' },
      { emoji: '\uD83D\uDCF2', title: '\u8D26\u6237\u8F6C\u79FB', file: '\u8D26\u6237\u8F6C\u79FB.html' }
    ],
    guides: [
      { emoji: '\u26D4', title: '\u4F7F\u7528\u6211\u4EEC\u8D26\u6237\u65F6\u7684\u7981\u6B62\u4E8B\u9879', file: '\u4F7F\u7528\u6211\u4EEC\u8D26\u6237\u65F6\u7684\u7981\u6B62\u4E8B\u9879.html' },
      { emoji: '\uD83D\uDD79\uFE0F', title: 'VDS\u5DE5\u4F5C\u57FA\u7840', file: 'VDS\u5DE5\u4F5C\u57FA\u7840.html' },
      { emoji: '\uD83D\uDCB1', title: '\u652F\u4ED8\u8D44\u6599\u8BBE\u7F6E', file: '\u652F\u4ED8\u8D44\u6599\u8BBE\u7F6E.html' },
      { emoji: '\u2705', title: '\u8D26\u6237\u9A8C\u8BC1', file: '\u8D26\u6237\u9A8C\u8BC1.html' },
      { emoji: '\uD83D\uDE80', title: '\u8BBE\u7F6E\u548C\u542F\u52A8\u5DE5\u5177', file: '\u8BBE\u7F6E\u548C\u542F\u52A8\u5DE5\u5177.html' },
      { emoji: '\uD83D\uDD10', title: '\u6280\u672F\u8BBE\u7F6E\u548C\u9690\u85CF', file: '\u6280\u672F\u8BBE\u7F6E\u548C\u9690\u85CF.html' },
      { emoji: '\uD83D\uDEA6', title: '\u5982\u4F55\u5728Google Ads\u4E0A\u8FD0\u884C\u9ED1\u5E3D\u5E7F\u544A\uFF1F', file: '\u5982\u4F55\u5728Google Ads\u4E0A\u8FD0\u884C\u9ED1\u5E3D\u5E7F\u544A\uFF1F.html' },
      { emoji: '\uD83D\uDCB0', title: '\u9884\u7B97\u589E\u52A0\u548C\u8D26\u6237\u6682\u505C', file: '\u9884\u7B97\u589E\u52A0\u548C\u8D26\u6237\u6682\u505C.html' }
    ]
  };

  // Detect current page
  var currentPath = decodeURIComponent(window.location.pathname.split('/').pop() || 'index.html');
  if (currentPath === '' || currentPath === '/') currentPath = 'index.html';

  var isIndex = (currentPath === 'index.html');
  var isKnowledgeBase = (currentPath === '\u5E7F\u544A\u77E5\u8BC6\u5E93.html');

  // Find current page info
  var currentPage = null;
  var allPages = pages.beginners.concat(pages.guides);
  for (var i = 0; i < allPages.length; i++) {
    if (allPages[i].file === currentPath) {
      currentPage = allPages[i];
      break;
    }
  }

  // Build breadcrumb
  var breadcrumbHTML = '<a href="index.html" class="nav-breadcrumb-link">\uD83C\uDFE0 \u9996\u9875</a>';
  if (!isIndex) {
    breadcrumbHTML += '<span class="nav-breadcrumb-sep">\u203A</span>';
    breadcrumbHTML += '<a href="\u5E7F\u544A\u77E5\u8BC6\u5E93.html" class="nav-breadcrumb-link">\uD83D\uDCDA \u5E7F\u544A\u77E5\u8BC6\u5E93</a>';
    if (currentPage && !isKnowledgeBase) {
      breadcrumbHTML += '<span class="nav-breadcrumb-sep">\u203A</span>';
      breadcrumbHTML += '<span class="nav-breadcrumb-current">' + currentPage.emoji + ' ' + currentPage.title + '</span>';
    }
  }

  // Build dropdown menu items HTML
  function buildMenuItems(group) {
    var html = '';
    for (var i = 0; i < group.length; i++) {
      var p = group[i];
      var isActive = (p.file === currentPath) ? ' nav-menu-item-active' : '';
      html += '<a href="' + p.file + '" class="nav-menu-item' + isActive + '">';
      html += '<span class="nav-menu-emoji">' + p.emoji + '</span>';
      html += '<span class="nav-menu-title">' + p.title + '</span>';
      html += '</a>';
    }
    return html;
  }

  // Build mobile full menu
  function buildMobileMenu() {
    var html = '<div class="nav-menu-group-label">\u5165\u95E8\u6307\u5357</div>';
    html += buildMenuItems(pages.beginners);
    html += '<div class="nav-menu-divider"></div>';
    html += '<div class="nav-menu-group-label">\u64CD\u4F5C\u6307\u5357</div>';
    html += buildMenuItems(pages.guides);
    return html;
  }

  // Inject CSS
  var style = document.createElement('style');
  style.textContent = [
    /* ===== Navbar ===== */
    '.site-nav { position: fixed; top: 0; left: 0; right: 0; z-index: 99999; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); box-shadow: 0 2px 20px rgba(0,0,0,0.15); height: 56px; display: flex; align-items: center; justify-content: space-between; padding: 0 24px; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif; }',
    '.site-nav * { box-sizing: border-box; margin: 0; padding: 0; }',
    '.site-nav a { text-decoration: none; }',

    /* ===== Breadcrumb ===== */
    '.nav-breadcrumb { display: flex; align-items: center; gap: 6px; overflow: hidden; white-space: nowrap; min-width: 0; }',
    '.nav-breadcrumb-link { color: rgba(255,255,255,0.85); text-decoration: none; font-size: 14px; font-weight: 500; transition: color 0.2s; flex-shrink: 0; }',
    '.nav-breadcrumb-link:hover { color: #fff; }',
    '.nav-breadcrumb-sep { color: rgba(255,255,255,0.5); font-size: 14px; flex-shrink: 0; }',
    '.nav-breadcrumb-current { color: #fff; font-size: 14px; font-weight: 600; overflow: hidden; text-overflow: ellipsis; }',

    /* ===== Desktop nav links (right side) ===== */
    '.nav-desktop-links { display: flex; align-items: center; gap: 4px; margin-left: auto; flex-shrink: 0; }',
    '.nav-dropdown-trigger { position: relative; }',
    '.nav-dropdown-btn { background: rgba(255,255,255,0.15); border: none; color: #fff; font-size: 13px; font-weight: 500; padding: 8px 16px; border-radius: 6px; cursor: pointer; transition: background 0.2s; font-family: inherit; white-space: nowrap; }',
    '.nav-dropdown-btn:hover, .nav-dropdown-trigger:hover .nav-dropdown-btn { background: rgba(255,255,255,0.25); }',
    '.nav-dropdown-btn::after { content: " \u25BE"; font-size: 10px; opacity: 0.7; }',

    /* Desktop dropdown panel */
    '.nav-dropdown-panel { position: absolute; top: calc(100% + 8px); right: 0; min-width: 280px; background: #fff; border-radius: 10px; box-shadow: 0 10px 40px rgba(0,0,0,0.18); opacity: 0; visibility: hidden; transform: translateY(-8px); transition: all 0.2s ease; z-index: 100000; padding: 6px 0; }',
    '.nav-dropdown-trigger:hover .nav-dropdown-panel { opacity: 1; visibility: visible; transform: translateY(0); }',

    /* Menu items (shared by desktop dropdown & mobile menu) */
    '.nav-menu-item { display: flex; align-items: center; padding: 10px 18px; text-decoration: none; color: #333; font-size: 14px; transition: background 0.15s; border-left: 3px solid transparent; white-space: pre-wrap; }',
    '.nav-menu-item:hover { background: #f8f6ff; }',
    '.nav-menu-item-active { background: #f3eeff; border-left-color: #764ba2; font-weight: 600; color: #764ba2; }',
    '.nav-menu-emoji { margin-right: 10px; font-size: 16px; flex-shrink: 0; }',
    '.nav-menu-title { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }',
    '.nav-menu-group-label { font-size: 11px; font-weight: 700; color: #764ba2; text-transform: uppercase; letter-spacing: 1px; padding: 12px 18px 6px; }',
    '.nav-menu-divider { height: 1px; background: #eee; margin: 6px 16px; }',

    /* ===== Hamburger (mobile only) ===== */
    '.nav-hamburger { width: 40px; height: 40px; display: none; flex-direction: column; align-items: center; justify-content: center; cursor: pointer; background: none; border: none; padding: 0; flex-shrink: 0; margin-left: 12px; position: relative; }',
    '.nav-hamburger span { display: block; width: 22px; height: 2px; background: #fff; border-radius: 2px; transition: all 0.3s ease; position: absolute; }',
    '.nav-hamburger span:nth-child(1) { transform: translateY(-7px); }',
    '.nav-hamburger span:nth-child(2) { transform: translateY(0); }',
    '.nav-hamburger span:nth-child(3) { transform: translateY(7px); }',
    '.nav-hamburger.open span:nth-child(1) { transform: rotate(45deg); }',
    '.nav-hamburger.open span:nth-child(2) { opacity: 0; }',
    '.nav-hamburger.open span:nth-child(3) { transform: rotate(-45deg); }',

    /* ===== Mobile slide-in menu ===== */
    '.nav-mobile-menu { position: fixed; top: 56px; right: 0; width: 100%; max-width: 360px; max-height: calc(100vh - 56px); background: #fff; box-shadow: -4px 4px 20px rgba(0,0,0,0.15); overflow-y: auto; transform: translateX(100%); transition: transform 0.3s ease; z-index: 99998; display: none; }',
    '.nav-mobile-menu.open { transform: translateX(0); }',

    /* Overlay */
    '.nav-overlay { position: fixed; top: 56px; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.3); z-index: 99997; opacity: 0; visibility: hidden; transition: opacity 0.3s ease, visibility 0.3s ease; display: none; }',
    '.nav-overlay.open { opacity: 1; visibility: visible; }',

    /* Body padding */
    'body { padding-top: 56px !important; }',

    /* ===== Mobile responsive ===== */
    '@media (max-width: 768px) {',
    '  .nav-desktop-links { display: none !important; }',
    '  .nav-hamburger { display: flex !important; }',
    '  .nav-mobile-menu { display: block; }',
    '  .nav-overlay { display: block; }',
    '  .nav-breadcrumb-current { max-width: 160px; }',
    '}',

    /* ===== Notion pages mobile fix ===== */
    '@media (max-width: 768px) {',
    '  .column-list { flex-direction: column !important; }',
    '  .column-list > .column { width: 100% !important; padding: 0 !important; }',
    '  body { margin-left: 0.8em !important; margin-right: 0.8em !important; }',
    '  .page-body img { max-width: 100%; height: auto; }',
    '}'
  ].join('\n');
  document.head.appendChild(style);

  // ===== Build DOM =====
  var nav = document.createElement('nav');
  nav.className = 'site-nav';

  // Left: breadcrumb
  var bcDiv = document.createElement('div');
  bcDiv.className = 'nav-breadcrumb';
  bcDiv.innerHTML = breadcrumbHTML;

  // Right (desktop): two dropdown triggers
  var desktopLinks = document.createElement('div');
  desktopLinks.className = 'nav-desktop-links';

  var trigger1 = document.createElement('div');
  trigger1.className = 'nav-dropdown-trigger';
  trigger1.innerHTML = '<button class="nav-dropdown-btn">\u5165\u95E8\u6307\u5357</button>' +
    '<div class="nav-dropdown-panel">' + buildMenuItems(pages.beginners) + '</div>';

  var trigger2 = document.createElement('div');
  trigger2.className = 'nav-dropdown-trigger';
  trigger2.innerHTML = '<button class="nav-dropdown-btn">\u64CD\u4F5C\u6307\u5357</button>' +
    '<div class="nav-dropdown-panel">' + buildMenuItems(pages.guides) + '</div>';

  desktopLinks.appendChild(trigger1);
  desktopLinks.appendChild(trigger2);

  // Right (mobile): hamburger button
  var hamburger = document.createElement('button');
  hamburger.className = 'nav-hamburger';
  hamburger.setAttribute('aria-label', '\u83DC\u5355');
  hamburger.innerHTML = '<span></span><span></span><span></span>';

  nav.appendChild(bcDiv);
  nav.appendChild(desktopLinks);
  nav.appendChild(hamburger);

  // Mobile slide-in menu
  var mobileMenu = document.createElement('div');
  mobileMenu.className = 'nav-mobile-menu';
  mobileMenu.innerHTML = buildMobileMenu();

  // Overlay
  var overlay = document.createElement('div');
  overlay.className = 'nav-overlay';

  // Insert into DOM
  document.body.insertBefore(overlay, document.body.firstChild);
  document.body.insertBefore(mobileMenu, document.body.firstChild);
  document.body.insertBefore(nav, document.body.firstChild);

  // ===== Mobile menu toggle =====
  function closeMobileMenu() {
    mobileMenu.classList.remove('open');
    overlay.classList.remove('open');
    hamburger.classList.remove('open');
  }

  hamburger.addEventListener('click', function(e) {
    e.stopPropagation();
    var isOpen = mobileMenu.classList.contains('open');
    if (isOpen) {
      closeMobileMenu();
    } else {
      mobileMenu.classList.add('open');
      overlay.classList.add('open');
      hamburger.classList.add('open');
    }
  });

  overlay.addEventListener('click', closeMobileMenu);
})();
