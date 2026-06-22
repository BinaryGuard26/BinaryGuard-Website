const screens = {
  tenant: document.querySelector("#tenantScreen"),
  register: document.querySelector("#registerScreen"),
  login: document.querySelector("#loginScreen"),
  verify: document.querySelector("#verifyScreen"),
  recover: document.querySelector("#recoverScreen"),
  service: document.querySelector("#serviceScreen"),
  order: document.querySelector("#orderScreen")
};

const titles = {
  tenant: "User Authentication",
  register: "Register",
  login: "Login",
  verify: "Verify OTP",
  recover: "Recover Access",
  service: "Service Authorization",
  order: "Access Card Order Portal"
};

const layerText = {
  tenant: "Layer 1 · User Authentication",
  register: "Layer 1 · User Authentication",
  login: "Layer 1 · User Authentication",
  verify: "Layer 1 · User Authentication",
  recover: "Layer 1 · User Authentication",
  service: "Layer 2 · Service Authorization",
  order: "Layer 3 · Access Card Order Portal"
};

const state = {
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
const flowButtons = document.querySelectorAll(".flow-step[data-flow]");
const clearLogBtn = document.querySelector("#clearLogBtn");

const registerBtn = document.querySelector("#registerBtn");
const loginBtn = document.querySelector("#loginBtn");
const verifyBtn = document.querySelector("#verifyBtn");
const recoverBtn = document.querySelector("#recoverBtn");
const openServiceBtn = document.querySelector("#openServiceBtn");
const submitOrderBtn = document.querySelector("#submitOrderBtn");
const logoutBtn = document.querySelector("#logoutBtn");

function layerForScreen(name) {
  if (name === "order") return "order";
  if (name === "service") return "service";
  return "tenant";
}

function updateLayerLocks() {
  flowButtons.forEach((button) => {
    const flow = button.dataset.flow;
    button.classList.remove("locked");

    if (flow === "tenant" && state.otpVerified) button.classList.add("locked");
    if (flow === "service" && (!state.otpVerified || state.serviceAuthorized)) button.classList.add("locked");
    if (flow === "order" && !state.serviceAuthorized) button.classList.add("locked");
  });
}

function renderScreen(name) {
  Object.entries(screens).forEach(([key, screen]) => {
    if (screen) screen.classList.toggle("active", key === name);
  });

  const activeLayer = layerForScreen(name);
  flowButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.flow === activeLayer);
  });

  if (screenTitle) screenTitle.textContent = titles[name];
  if (screenEyebrow) screenEyebrow.textContent = layerText[name];

  updateLayerLocks();
}

function showScreen(name) {
  if (name === "service" && !state.otpVerified) {
    toast("Service Authorization is locked until OTP Verification is completed.");
    return;
  }

  if (name === "order" && !state.serviceAuthorized) {
    toast("Access Card Order Portal is locked until Service Authorization is completed.");
    return;
  }

  if (["tenant", "register", "login", "verify", "recover"].includes(name) && state.otpVerified) {
    toast("User Authentication is inactive after verification. Logout to start again.");
    return;
  }

  renderScreen(name);
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

function isApprovedDomain(email) {
  return approvedDomains.includes(getDomain(email));
}

function validateDomain(email) {
  if (!email.includes("@")) {
    toast("Enter a valid corporate email address.");
    return false;
  }
  if (!isApprovedDomain(email)) {
    toast("Your organization is not authorized. Please contact BinaryGuard.");
    log(`Access denied. Unauthorized domain attempted: ${email}`);
    return false;
  }

  state.email = email;
  state.domain = getDomain(email);
  toast("Domain approved. OTP generated.");
  log(`Domain approved through allowed_domains: ${state.domain}.`);
  log("OTP generated and sent to approved corporate email.");
  updateStatus("OTP Issued");
  return true;
}

function otpCode() {
  return [...document.querySelectorAll("#codeInputs input")].map((input) => input.value).join("");
}

document.querySelectorAll("[data-flow-target]").forEach((button) => {
  button.addEventListener("click", () => showScreen(button.dataset.flowTarget));
});

flowButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const flow = button.dataset.flow;

    if (button.classList.contains("locked")) {
      if (flow === "tenant") toast("User Authentication is inactive after verification. Logout to start again.");
      if (flow === "service") toast("Service Authorization is locked until OTP Verification is completed, or inactive after opening Layer 3.");
      if (flow === "order") toast("Access Card Order Portal is locked until Service Authorization is completed.");
      return;
    }

    if (flow === "tenant") showScreen("tenant");
    if (flow === "service") showScreen("service");
    if (flow === "order") showScreen("order");
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
    const name = document.querySelector("#regName").value.trim();
    const email = document.querySelector("#regEmail").value.trim().toLowerCase();
    const organization = document.querySelector("#regOrg").value.trim();

    if (!name || !organization) {
      toast("Enter full name and organization.");
      return;
    }

    if (!validateDomain(email)) return;
    log(`User record prepared for ${name} at ${organization}.`);
    renderScreen("verify");
  });
}

if (loginBtn) {
  loginBtn.addEventListener("click", () => {
    const email = document.querySelector("#loginEmail").value.trim().toLowerCase();
    if (!validateDomain(email)) return;
    log("Tenant status checked: active.");
    log("User status checked: active.");
    renderScreen("verify");
  });
}

if (verifyBtn) {
  verifyBtn.addEventListener("click", () => {
    state.otpAttempts += 1;

    if (state.otpAttempts > state.maxOtpAttempts) {
      toast("OTP attempt limit exceeded.");
      return;
    }

    if (otpCode() !== state.otp) {
      toast("Invalid verification code.");
      log(`OTP failed. Attempt ${state.otpAttempts} of ${state.maxOtpAttempts}.`);
      return;
    }

    state.otpVerified = true;
    updateStatus("Verified", true);
    toast("OTP verified. Moving to Service Authorization.");
    log("OTP valid. Session created with token_hash and expiry.");
    log("OTP marked used and destroyed after successful verification.");
    renderScreen("service");
  });
}

if (recoverBtn) {
  recoverBtn.addEventListener("click", () => {
    const email = document.querySelector("#recoverEmail").value.trim().toLowerCase();
    if (!validateDomain(email)) return;
    toast("Recovery code sent.");
    log(`Recovery process started for ${email}.`);
    renderScreen("verify");
  });
}

if (openServiceBtn) {
  openServiceBtn.addEventListener("click", () => {
    if (!state.otpVerified) {
      toast("Please complete OTP Verification first.");
      return;
    }

    state.serviceAuthorized = true;
    toast("Opening Access Card Order Portal.");
    log("Layer 3 opened: Access Card Order Portal.");

    const requesterEmail = document.querySelector("#requesterEmail");
    if (requesterEmail) requesterEmail.value = state.email;

    renderScreen("order");
  });
}

if (submitOrderBtn) {
  submitOrderBtn.addEventListener("click", () => {
    toast("Access card request submitted.");
    log("Access card request submitted and saved with tenant_id and user_id.");
  });
}

if (logoutBtn) {
  logoutBtn.addEventListener("click", () => {
    state.otpVerified = false;
    state.serviceAuthorized = false;
    state.otpAttempts = 0;
    updateStatus("Awaiting Verification", false);
    toast("Logged out. Returning to User Authentication.");
    log("Session ended. User returned to Layer 1.");
    renderScreen("tenant");
  });
}

if (clearLogBtn) {
  clearLogBtn.addEventListener("click", () => {
    auditLog.innerHTML = "";
  });
}

updateStatus("Awaiting Verification");
renderScreen("tenant");
log("User Authentication page loaded.");
log("Layer 2 and Layer 3 are locked until verification is completed.");
