* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: Arial, sans-serif;
  background: linear-gradient(135deg, #0f172a, #1d4ed8);
  color: #0f172a;
}

button,
input {
  font: inherit;
}

.auth-shell {
  min-height: 100vh;
  display: grid;
  place-items: center;
  padding: 24px;
}

.auth-card {
  width: min(100%, 420px);
  background: rgba(255, 255, 255, 0.95);
  border-radius: 18px;
  box-shadow: 0 20px 40px rgba(15, 23, 42, 0.2);
  padding: 28px;
}

.brand-box {
  text-align: center;
  margin-bottom: 18px;
}

.brand-box h1 {
  margin: 0 0 8px;
  font-size: 1.8rem;
}

.tabs {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  margin-bottom: 18px;
}

.tab {
  border: 1px solid #dbe2ff;
  background: #eef2ff;
  padding: 10px 16px;
  border-radius: 10px;
  cursor: pointer;
  font-weight: 600;
  color: #1e3a8a;
}

.tab.active {
  background: #2563eb;
  color: white;
  border-color: #2563eb;
}

.panel {
  display: none;
}

.panel.active {
  display: block;
}

form {
  display: grid;
  gap: 14px;
}

label {
  display: grid;
  gap: 8px;
  font-weight: 600;
  color: #334155;
}

input {
  border: 1px solid #cbd5e1;
  border-radius: 10px;
  padding: 12px 14px;
  background: white;
}

button {
  border: none;
  border-radius: 10px;
  padding: 12px 16px;
  cursor: pointer;
  transition: 0.2s ease;
}

button:hover {
  transform: translateY(-1px);
}

button[type="submit"], .primary-btn {
  background: linear-gradient(135deg, #2563eb, #1d4ed8);
  color: #fff;
  font-weight: 700;
}

.secondary-btn {
  background: #ef4444;
  color: white;
  font-weight: 700;
}

.message {
  min-height: 24px;
  margin-top: 16px;
  font-weight: 600;
  color: #1e3a8a;
}

.message.error {
  color: #b91c1c;
}

.message.success {
  color: #166534;
}

.dashboard-body {
  background: #f1f5f9;
}

.dashboard-shell {
  min-height: 100vh;
  display: grid;
  grid-template-columns: 260px 1fr;
}

.sidebar {
  background: #0f172a;
  color: white;
  padding: 24px 20px;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.sidebar h2 {
  margin: 0;
}

.sidebar nav {
  display: grid;
  gap: 12px;
}

.nav-button {
  background: transparent;
  border: 1px solid rgba(255,255,255,0.15);
  color: white;
  text-align: left;
  padding: 10px 12px;
}

.nav-button.active {
  background: #1d4ed8;
  border-color: #1d4ed8;
}

.logout-btn {
  margin-top: auto;
  background: #ef4444;
  color: white;
}

.dashboard-main {
  padding: 28px;
}

.topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  margin-bottom: 24px;
}

.eyebrow {
  margin: 0 0 4px;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: #64748b;
  font-size: 0.8rem;
}

.topbar h1 {
  margin: 0;
}

.switch-wrap {
  display: flex;
  align-items: center;
  gap: 12px;
  background: white;
  padding: 10px 14px;
  border-radius: 999px;
  box-shadow: 0 8px 18px rgba(15,23,42,0.08);
}

.switch-wrap input {
  display: none;
}

.slider {
  width: 44px;
  height: 24px;
  background: #cbd5e1;
  border-radius: 999px;
  position: relative;
  display: inline-block;
}

.slider::after {
  content: "";
  position: absolute;
  width: 18px;
  height: 18px;
  top: 3px;
  left: 3px;
  background: white;
  border-radius: 50%;
  transition: 0.2s ease;
}

.switch-wrap input:checked + .slider {
  background: #22c55e;
}

.switch-wrap input:checked + .slider::after {
  left: 23px;
}

.panel-view {
  display: none;
}

.panel-view.active {
  display: block;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(160px, 1fr));
  gap: 16px;
  margin-bottom: 24px;
}

.stat-card,
.card,
.action-card {
  background: white;
  border-radius: 14px;
  padding: 20px;
  box-shadow: 0 10px 22px rgba(15, 23, 42, 0.06);
}

.stat-card {
  display: grid;
  gap: 8px;
}

.label {
  color: #64748b;
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.stat-card strong {
  font-size: 1.8rem;
}

.action-card {
  max-width: 620px;
}

.action-card h3,
.card h3 {
  margin-top: 0;
}

.hidden {
  display: none !important;
}

.mini-form {
  display: grid;
  grid-template-columns: repeat(2, minmax(160px, 1fr));
  gap: 12px;
  margin-top: 16px;
}

.mini-form input:last-of-type {
  grid-column: span 2;
}

.mini-form button {
  grid-column: 1 / -1;
}

.list {
  list-style: none;
  padding: 0;
  margin: 18px 0 0;
  display: grid;
  gap: 12px;
}

.list li {
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  padding: 12px 14px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
}

.list button {
  background: #dc2626;
  color: white;
  padding: 8px 10px;
}

@media (max-width: 800px) {
  .dashboard-shell {
    grid-template-columns: 1fr;
  }

  .sidebar {
    padding-bottom: 12px;
  }

  .stats-grid,
  .mini-form {
    grid-template-columns: 1fr;
  }
}
