const tabButtons = document.querySelectorAll(".tab");
const panels = {
  login: document.getElementById("login-panel"),
  register: document.getElementById("register-panel")
};

if (tabButtons.length) {
  tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      tabButtons.forEach((btn) => btn.classList.toggle("active", btn === button));
      const target = button.dataset.tab;
      Object.entries(panels).forEach(([key, panel]) => {
        panel.classList.toggle("active", key === target);
      });
    });
  });
}

const messageElement = document.getElementById("message");

function showMessage(text, type = "success") {
  if (!messageElement) return;
  messageElement.textContent = text;
  messageElement.className = "message " + type;
}

async function redirectIfLoggedIn() {
  const response = await fetch("/api/session");
  const data = await response.json();

  if (data.authenticated) {
    window.location.href = "/dashboard";
  }
}

if (window.location.pathname === "/") {
  redirectIfLoggedIn();
}

const loginForm = document.getElementById("login-form");
if (loginForm) {
  loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const payload = {
      email: document.getElementById("login-email").value,
      password: document.getElementById("login-password").value
    };

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const data = await response.json();
      if (!response.ok) {
        showMessage(data.error || "Login failed.", "error");
        return;
      }

      showMessage("Logged in successfully.", "success");
      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 500);
    } catch (error) {
      showMessage("Unable to connect to the server.", "error");
    }
  });
}

const registerForm = document.getElementById("register-form");
if (registerForm) {
  registerForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const payload = {
      name: document.getElementById("register-name").value,
      email: document.getElementById("register-email").value,
      password: document.getElementById("register-password").value
    };

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const data = await response.json();
      if (!response.ok) {
        showMessage(data.error || "Registration failed.", "error");
        return;
      }

      showMessage("Account created successfully.", "success");
      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 500);
    } catch (error) {
      showMessage("Unable to connect to the server.", "error");
    }
  });
}

async function ensureAuthenticated() {
  const response = await fetch("/api/session");
  const data = await response.json();

  if (!data.authenticated) {
    window.location.href = "/";
    return null;
  }

  return data.user;
}

async function loadDashboard() {
  if (window.location.pathname !== "/dashboard") return;

  const user = await ensureAuthenticated();
  if (!user) return;

  document.getElementById("user-name").textContent = user.name;
  const shareToggle = document.getElementById("share-toggle");
  const consentBtn = document.getElementById("consent-share-btn");
  const stopBtn = document.getElementById("stop-share-btn");

  async function refreshStats() {
    const [contactsRes, locationsRes] = await Promise.all([
      fetch("/api/contacts"),
      fetch("/api/locations")
    ]);

    const contacts = await contactsRes.json();
    const locations = await locationsRes.json();

    document.getElementById("contact-count").textContent = contacts.length;
    document.getElementById("location-count").textContent = locations.length;

    if (locations.length) {
      const last = locations[0];
      document.getElementById("last-update").textContent = new Date(last.createdAt).toLocaleString();
    } else {
      document.getElementById("last-update").textContent = "—";
    }

    renderContacts(contacts);
    renderLocations(locations);
  }

  shareToggle.checked = user.sharingEnabled;

  shareToggle.addEventListener("change", async () => {
    const response = await fetch("/api/share-settings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sharingEnabled: shareToggle.checked })
    });

    if (response.ok) {
      const data = await response.json();
      if (data.user) {
        user.sharingEnabled = data.user.sharingEnabled;
      }
    }
  });

  consentBtn.addEventListener("click", async () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported on this browser.");
      return;
    }

    consentBtn.classList.add("hidden");
    stopBtn.classList.remove("hidden");

    navigator.geolocation.watchPosition(
      async (position) => {
        const response = await fetch("/api/location", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            accuracy: position.coords.accuracy,
            consentGiven: true,
            consentTimestamp: new Date().toISOString()
          })
        });

        if (response.ok) {
          await refreshStats();
        }
      },
      (error) => {
        console.error(error);
        consentBtn.classList.remove("hidden");
        stopBtn.classList.add("hidden");
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  });

  stopBtn.addEventListener("click", () => {
    consentBtn.classList.remove("hidden");
    stopBtn.classList.add("hidden");
    navigator.geolocation.clearWatch && navigator.geolocation.clearWatch(0);
  });

  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      const payload = {
        name: document.getElementById("contact-name").value,
        phone: document.getElementById("contact-phone").value,
        email: document.getElementById("contact-email").value
      };

      const response = await fetch("/api/contacts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        contactForm.reset();
        await refreshStats();
      }
    });
  }

  const logoutBtn = document.getElementById("logout-btn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", async () => {
      await fetch("/api/logout", { method: "POST" });
      window.location.href = "/";
    });
  }

  const navButtons = document.querySelectorAll(".nav-button");
  navButtons.forEach((button) => {
    button.addEventListener("click", () => {
      navButtons.forEach((item) => item.classList.toggle("active", item === button));
      const view = button.dataset.view;
      document.querySelectorAll(".panel-view").forEach((panel) => {
        panel.classList.toggle("active", panel.id === view);
      });
    });
  });

  refreshStats();
}

if (window.location.pathname === "/dashboard") {
  loadDashboard();
}

function renderContacts(contacts) {
  const list = document.getElementById("contact-list");
  if (!list) return;

  if (!contacts.length) {
    list.innerHTML = "<li>No trusted contacts yet.</li>";
    return;
  }

  list.innerHTML = contacts
    .map(
      (contact) => `
        <li>
          <div>
            <strong>${contact.name}</strong><br />
            ${contact.phone || ""} ${contact.email ? `| ${contact.email}` : ""}
          </div>
          <button data-contact-id="${contact.id}">Remove</button>
        </li>
      `
    )
    .join("");

  list.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", async () => {
      const id = button.dataset.contactId;
      await fetch(`/api/contacts/${id}`, { method: "DELETE" });
      const [contactsRes] = await Promise.all([fetch("/api/contacts")]);
      const freshContacts = await contactsRes.json();
      renderContacts(freshContacts);
      const locationsRes = await fetch("/api/locations");
      const locations = await locationsRes.json();
      renderLocations(locations);
    });
  });
}

function renderLocations(locations) {
  const list = document.getElementById("location-list");
  if (!list) return;

  if (!locations.length) {
    list.innerHTML = "<li>No location history yet.</li>";
    return;
  }

  list.innerHTML = locations
    .map(
      (location) => `
        <li>
          <div>
            <strong>${new Date(location.createdAt).toLocaleString()}</strong><br />
            ${location.latitude.toFixed(5)}, ${location.longitude.toFixed(5)}<br />
            Accuracy: ${location.accuracy}m
          </div>
        </li>
      `
    )
    .join("");
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    if (window.location.pathname === "/dashboard") {
      loadDashboard();
    }
  });
}
