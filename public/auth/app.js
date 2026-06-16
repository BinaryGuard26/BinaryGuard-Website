const screens = {
  tenant: document.querySelector("#tenantScreen"),
  otp: document.querySelector("#otpScreen"),
  services: document.querySelector("#servicesScreen"),
  security: document.querySelector("#securityScreen"),
  admin: document.querySelector("#adminScreen")
};

const titles = {
  tenant: "Tenant Authentication",
  otp: "OTP Verification",
  services: "Service Authorization",
  security: "Supabase Security",
  admin: "Admin Authorization"
};

const state = {
  tenantVerified: false,
  otpVerified: false,
  authorized: false,
  email: "john.smith@gov.mb.ca",
  domain: "",
  otp: "248106",
  otpAttempts: 0,
  maxOtpAttempts: 3
};

const approvedDomains = ["gov.mb.ca", "clientabc.com"];
const screenTitle = document.querySelector("#screenTitle");
const statusPill = document.querySelector("#statusPill");
const auditLog = document.querySelector("#auditLog");
const flowButtons = document.querySelectorAll(".flow-step");
const tenantBtn = document.querySelector("#tenantBtn");
const verifyBtn = document.querySelector("#verifyBtn");
const openServiceBtn = document.querySelector("#openServiceBtn");
const adminLoginBtn = document.querySelector("#adminLoginBtn");
const clearLogBtn = document.querySelector("#clearLogBtn");
const domainRule = document.querySelector("#domainRule");
const tenantDomain = document.querySelector("#tenantDomain");

function showScreen(name) {
  Object.entries(screens).forEach(([key, screen]) => {
    screen.classList.toggle("active", key === name);
  });

  flowButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.flow === name);
  });

  screenTitle.textContent = titles[name];
}

function log(message) {
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

function updateStatus() {
  if (state.authorized) {
    statusPill.textContent = "Authorized";
    statusPill.classList.add("ok");
    return;
  }

  statusPill.textContent = "Awaiting Verification";
  statusPill.classList.remove("ok");
}

function getDomain(email) {
  return email.split("@")[1]?.trim().toLowerCase() || "";
}

function isApprovedDomain(email) {
  return approvedDomains.includes(getDomain(email));
}

function otpCode() {
  return [...document.querySelectorAll("#codeInputs input")]
    .map((input) => input.value)
    .join("");
}

flowButtons.forEach((button) => {
  button.addEventListener("click", () => showScreen(button.dataset.flow));
});

document.querySelectorAll("#codeInputs input").forEach((input, index, list) => {
  input.addEventListener("input", () => {
    input.value = input.value.replace(/\D/g, "").slice(0, 1);
    if (input.value && list[index + 1]) list[index + 1].focus();
  });
});

tenantBtn.addEventListener("click", () => {
  const email = document.querySelector("#corporateEmail").value.trim().toLowerCase();

  if (!email.includes("@")) {
    toast("Enter a valid corporate email address.");
    log("Tenant authentication stopped because email format was invalid.");
    return;
  }

  if (!isApprovedDomain(email)) {
    domainRule.classList.remove("pass");
    toast("You are not authorized. Please contact BinaryGuard.");
    log(`Unauthorized domain attempted: ${email}`);
    return;
  }

  state.email = email;
  state.domain = getDomain(email);
  state.tenantVerified = true;
  domainRule.classList.add("pass");
  tenantDomain.textContent = state.domain;

  toast("Corporate domain approved. OTP issued.");
  log(`Tenant authenticated using allowed_domains: ${state.domain}.`);
  log("Short-lived OTP generated, hashed, and sent to approved email.");
  showScreen("otp");
});

verifyBtn.addEventListener("click", () => {
  if (!state.tenantVerified) {
    toast("Complete tenant authentication first.");
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
    log(`OTP verification failed. Attempt ${state.otpAttempts} of ${state.maxOtpAttempts}.`);
    return;
  }

  state.otpVerified = true;
  state.authorized = true;
  updateStatus();

  toast("OTP verified. Temporary session created.");
  log("OTP verified; used_at set and code invalidated.");
  log("Temporary session created with token_hash and expiry.");
  log("Service authorization checked using tenant_services and user_roles.");
  showScreen("services");
});

openServiceBtn.addEventListener("click", () => {
  if (!state.authorized) {
    toast("Authorization required before opening services.");
    showScreen("tenant");
    return;
  }

  toast("Opening Access Card Ordering Portal.");
  log("Authorized client_user opened Access Card Ordering Portal.");
});

adminLoginBtn.addEventListener("click", () => {
  toast("Admin portal requires staff email, password, MFA, role check, and audit logging.");
  log("Admin access requested. Email OTP alone is not sufficient.");
});

clearLogBtn.addEventListener("click", () => {
  auditLog.innerHTML = "";
});

updateStatus();
log("Secure Client Gateway loaded.");
log("Waiting for corporate tenant authentication.");
