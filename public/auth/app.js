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
  registered: false,
  tenantVerified: false,
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

function layerForScreen(name) {
  if (name === "order") return "order";
  if (name === "service") return "service";
  return "tenant";
}

function showScreen(name) {
  Object.entries(screens).forEach(([key, screen]) => {
    if (screen) screen.classList.toggle("active", key === name);
  });

  const activeLayer = layerForScreen(name);
  flowButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.flow === activeLayer);
  });

  if (screenTitle) screenTitle.textContent = titles[name] || "User Authentication";
  if (screenEyebrow) screenEyebrow.textContent = layerText[name] || "Layer 1 · User Authentication";
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
  window.setTimeout(() => node.remove(), 2800);
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
    log("User authentication stopped because email format was invalid.");
    return false;
  }

  if (!isApprovedDomain(email)) {
    toast("Your organization is not authorized. Please contact BinaryGuard.");
    log(`Access denied. Unauthorized domain attempted: ${email}`);
    return false;
  }

  state.email = email;
  state.domain = getDomain(email);
  state.tenantVerified = true;

  toast("Domain approved. OTP generated.");
  log(`Domain approved through allowed_domains: ${state.domain}.`);
  log("OTP generated and sent to approved corporate email.");
  updateStatus("OTP Issued");
  return true;
}

function otpCode() {
  return [...document.querySelectorAll("#codeInputs input")]
    .map((input) => input.value)
    .join("");
}

document.querySelectorAll("[data-flow-target]").forEach((button) => {
  button.addEventListener("click", () => showScreen(button.dataset.flowTarget));
});

flowButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (button.dataset.flow === "service") {
      if (!state.otpVerified) {
        toast("Please complete OTP verification first.");
        return;
      }
      showScreen("service");
      return;
    }

    if (button.dataset.flow === "order") {
      if (!state.serviceAuthorized) {
        toast("Please open the authorized service first.");
        return;
      }
      showScreen("order");
      return;
    }

    showScreen("tenant");
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
      log("Registration stopped because required identity details were missing.");
      return;
    }

    if (!validateDomain(email)) return;

    state.registered = true;
    document.querySelector("#loginEmail").value = email;
    document.querySelector("#recoverEmail").value = email;

    log(`User record prepared for ${name} at ${organization}.`);
    showScreen("verify");
  });
}

if (loginBtn) {
  loginBtn.addEventListener("click", () => {
    const email = document.querySelector("#loginEmail").value.trim().toLowerCase();

    if (!validateDomain(email)) return;

    log("Tenant status checked: active.");
    log("User status checked: active.");
    showScreen("verify");
  });
}

if (verifyBtn) {
  verifyBtn.addEventListener("click", () => {
    if (!state.tenantVerified) {
      toast("Please register or login first.");
      showScreen("tenant");
      return;
    }

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
    updateStatus("Verified", true);

    toast("OTP verified. Moving to Service Authorization.");
    log("OTP valid. Session created with token_hash and expiry.");
    log("OTP marked used and destroyed after successful verification.");
    showScreen("service");
  });
}

if (recoverBtn) {
  recoverBtn.addEventListener("click", () => {
    const email = document.querySelector("#recoverEmail").value.trim().toLowerCase();

    if (!validateDomain(email)) return;

    toast("Recovery code sent.");
    log(`Recovery process started for ${email}.`);
    log("Recovery OTP generated and sent to approved corporate email.");
    showScreen("verify");
  });
}

if (openServiceBtn) {
  openServiceBtn.addEventListener("click", () => {
    state.serviceAuthorized = true;
    toast("Opening Access Card Order Portal.");
    log("Layer 3 opened: Access Card Order Portal.");

    const requesterEmail = document.querySelector("#requesterEmail");
    if (requesterEmail) requesterEmail.value = state.email;

    showScreen("order");
  });
}

if (submitOrderBtn) {
  submitOrderBtn.addEventListener("click", () => {
    toast("Access card request submitted.");
    log("Access card request submitted and saved with tenant_id and user_id.");
  });
}

if (clearLogBtn) {
  clearLogBtn.addEventListener("click", () => {
    auditLog.innerHTML = "";
  });
}

updateStatus("Awaiting Verification");
showScreen("tenant");
log("User Authentication page loaded.");
log("Register, Login, Verify OTP, and Recover Access are ready.");
