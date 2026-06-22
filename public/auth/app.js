const screens = {
  user: document.querySelector("#userScreen"),
  register: document.querySelector("#registerScreen"),
  login: document.querySelector("#loginScreen"),
  verify: document.querySelector("#verifyScreen"),
  recover: document.querySelector("#recoverScreen"),
  service: document.querySelector("#serviceScreen"),
  order: document.querySelector("#orderScreen")
};

const titles = {
  user: "User Authentication",
  register: "Register",
  login: "Login",
  verify: "Verify OTP",
  recover: "Recover Access",
  service: "Service Authorization",
  order: "Access Card Order Portal"
};

const layerText = {
  user: "Layer 1 · User Authentication",
  register: "Layer 1 · User Authentication",
  login: "Layer 1 · User Authentication",
  verify: "Layer 1 · User Authentication",
  recover: "Layer 1 · User Authentication",
  service: "Layer 2 · Service Authorization",
  order: "Layer 3 · Access Card Order Portal"
};

const state = {
  activeLayer: "user",
  otpVerified: false,
  serviceAuthorized: false,
  email: "john.smith@gov.mb.ca",
  domain: "",
  otp: "248106",
  otpAttempts: 0,
  maxOtpAttempts: 3
};

const approvedDomains = ["gov.mb.ca", "clientabc.com", "cityofx.ca"];

const screenTitle = document.querySelector("#screenTitle");
const screenEyebrow = document.querySelector("#screenEyebrow");
const statusPill = document.querySelector("#statusPill");
const auditLog = document.querySelector("#auditLog");
const flowButtons = document.querySelectorAll(".flow-step[data-layer]");

const registerBtn = document.querySelector("#registerBtn");
const loginBtn = document.querySelector("#loginBtn");
const verifyBtn = document.querySelector("#verifyBtn");
const recoverBtn = document.querySelector("#recoverBtn");
const openServiceBtn = document.querySelector("#openServiceBtn");
const submitOrderBtn = document.querySelector("#submitOrderBtn");
const logoutBtn = document.querySelector("#logoutBtn");
const clearLogBtn = document.querySelector("#clearLogBtn");

function layerForScreen(name) {
  if (["register", "login", "verify", "recover"].includes(name)) return "user";
  return name;
}

function isLayerAllowed(layer) {
  return state.activeLayer === layer;
}

function updateLayerButtons() {
  flowButtons.forEach((button) => {
    const layer = button.dataset.layer;
    const active = layer === state.activeLayer;
    button.classList.toggle("active", active);
    button.classList.toggle("locked", !active);
  });
}

function renderScreen(name) {
  const layer = layerForScreen(name);

  if (!isLayerAllowed(layer)) {
    if (layer === "user") toast("User Authentication is inactive. Logout to start again.");
    if (layer === "service") toast("Service Authorization is inactive until User Authentication is completed.");
    if (layer === "order") toast("Access Card Order Portal is inactive until Service Authorization is completed.");
    return;
  }

  Object.entries(screens).forEach(([key, screen]) => {
    if (screen) screen.classList.toggle("active", key === name);
  });

  if (screenTitle) screenTitle.textContent = titles[name];
  if (screenEyebrow) screenEyebrow.textContent = layerText[name];

  updateLayerButtons();
}

function log(message) {
  if (!auditLog) return;
  const item = document.createElement("li");
  const time = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  item.textContent = `${time} - ${message}`;
  auditLog.prepend(item);
}

function toast(message) {
  document.querySelector(".toast")?.remove();
  const node = document.createElement("div");
  node.className = "toast";
  node.textContent = message;
  document.body.append(node);
  setTimeout(() => node.remove(), 2800);
}

function updateStatus(text, ok = false) {
  if (!statusPill) return;
  statusPill.textContent = text;
  statusPill.classList.toggle("ok", ok);
}

function getDomain(email) {
  return email.split("@")[1]?.trim().toLowerCase() || "";
}

function validateDomain(email) {
  if (!email.includes("@")) {
    toast("Enter a valid corporate email address.");
    log("User authentication stopped because the email format was invalid.");
    return false;
  }

  const domain = getDomain(email);

  if (!approvedDomains.includes(domain)) {
    toast("Your organization is not authorized. Please contact BinaryGuard.");
    log(`Access denied. Unauthorized domain attempted: ${email}`);
    return false;
  }

  state.email = email;
  state.domain = domain;

  toast("Corporate domain approved. OTP generated.");
  log(`Domain approved through allowed_domains: ${domain}.`);
  log("OTP generated and sent to approved corporate email.");
  updateStatus("OTP Issued", false);
  return true;
}

function otpCode() {
  return [...document.querySelectorAll("#codeInputs input")]
    .map((input) => input.value)
    .join("");
}

document.querySelectorAll("[data-auth-target]").forEach((button) => {
  button.addEventListener("click", () => {
    if (!isLayerAllowed("user")) {
      toast("User Authentication is inactive. Logout to start again.");
      return;
    }

    renderScreen(button.dataset.authTarget);
  });
});

document.querySelectorAll("[data-back-user]").forEach((button) => {
  button.addEventListener("click", () => renderScreen("user"));
});

flowButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const layer = button.dataset.layer;

    if (!isLayerAllowed(layer)) {
      if (layer === "user") toast("User Authentication is inactive after OTP verification. Logout to start again.");
      if (layer === "service") toast("Service Authorization is locked until User Authentication and OTP Verification are completed.");
      if (layer === "order") toast("Access Card Order Portal is locked until Service Authorization is completed.");
      return;
    }

    if (layer === "user") renderScreen("user");
    if (layer === "service") renderScreen("service");
    if (layer === "order") renderScreen("order");
  });
});

document.querySelectorAll("#codeInputs input").forEach((input, index, list) => {
  input.addEventListener("input", () => {
    input.value = input.value.replace(/\D/g, "").slice(0, 1);
    if (input.value && list[index + 1]) list[index + 1].focus();
  });
});

if (registerBtn) {
  registerBtn.addEventListener("click", () => {
    if (!isLayerAllowed("user")) return;

    const name = document.querySelector("#regName").value.trim();
    const email = document.querySelector("#regEmail").value.trim().toLowerCase();
    const organization = document.querySelector("#regOrg").value.trim();

    if (!name || !organization) {
      toast("Enter full name and organization.");
      log("Registration stopped because required identity details were missing.");
      return;
    }

    if (!validateDomain(email)) return;

    document.querySelector("#loginEmail").value = email;
    document.querySelector("#recoverEmail").value = email;
    log(`User record prepared for ${name} at ${organization}.`);
    renderScreen("verify");
  });
}

if (loginBtn) {
  loginBtn.addEventListener("click", () => {
    if (!isLayerAllowed("user")) return;

    const email = document.querySelector("#loginEmail").value.trim().toLowerCase();

    if (!validateDomain(email)) return;

    log("Tenant status checked: active.");
    log("User status checked: active.");
    renderScreen("verify");
  });
}

if (verifyBtn) {
  verifyBtn.addEventListener("click", () => {
    if (!isLayerAllowed("user")) return;

    state.otpAttempts += 1;

    if (state.otpAttempts > state.maxOtpAttempts) {
      toast("OTP attempt limit exceeded.");
      log("OTP verification blocked after maximum attempts.");
      return;
    }

    if (otpCode() !== state.otp) {
      toast("Invalid verification code.");
      log(`OTP failed. Attempt ${state.otpAttempts} of ${state.maxOtpAttempts}.`);
      return;
    }

    state.otpVerified = true;
    state.activeLayer = "service";

    updateStatus("Verified", true);
    toast("OTP verified. Moving to Service Authorization.");
    log("OTP valid. Session created with token_hash and expiry.");
    log("OTP marked used and destroyed after successful verification.");
    log("Layer 1 is now inactive. Layer 2 is now active.");

    renderScreen("service");
  });
}

if (recoverBtn) {
  recoverBtn.addEventListener("click", () => {
    if (!isLayerAllowed("user")) return;

    const email = document.querySelector("#recoverEmail").value.trim().toLowerCase();

    if (!validateDomain(email)) return;

    toast("Recovery code sent.");
    log(`Recovery process started for ${email}.`);
    log("Recovery OTP generated and sent to approved corporate email.");
    renderScreen("verify");
  });
}

if (openServiceBtn) {
  openServiceBtn.addEventListener("click", () => {
    if (!isLayerAllowed("service")) {
      toast("Service Authorization is not active.");
      return;
    }

    state.serviceAuthorized = true;
    state.activeLayer = "order";

    const requesterEmail = document.querySelector("#requesterEmail");
    if (requesterEmail) requesterEmail.value = state.email;

    toast("Opening Access Card Order Portal.");
    log("Service authorized. Layer 2 is now inactive.");
    log("Layer 3 opened: Access Card Order Portal.");

    renderScreen("order");
  });
}

if (submitOrderBtn) {
  submitOrderBtn.addEventListener("click", () => {
    if (!isLayerAllowed("order")) return;

    toast("Access card request submitted.");
    log("Access card request submitted and saved with tenant_id and user_id.");
  });
}

if (logoutBtn) {
  logoutBtn.addEventListener("click", () => {
    state.activeLayer = "user";
    state.otpVerified = false;
    state.serviceAuthorized = false;
    state.otpAttempts = 0;

    updateStatus("Not Verified", false);
    toast("Logged out. Returning to User Authentication.");
    log("Logout completed. Layer 1 is active. Layer 2 and Layer 3 are inactive.");

    renderScreen("user");
  });
}

if (clearLogBtn) {
  clearLogBtn.addEventListener("click", () => {
    auditLog.innerHTML = "";
  });
}

updateStatus("Not Verified", false);
renderScreen("user");
log("User Authentication page loaded.");
log("Layer 2 and Layer 3 are inactive until User Authentication is completed.");
