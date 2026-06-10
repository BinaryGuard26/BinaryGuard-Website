const screens = {
  register: document.querySelector("#registerScreen"),
  login: document.querySelector("#loginScreen"),
  mfa: document.querySelector("#mfaScreen"),
  reset: document.querySelector("#resetScreen"),
  dashboard: document.querySelector("#dashboardScreen")
};

const titles = {
  register: "Create secure account",
  login: "Sign in to BinaryGuard",
  mfa: "Verify identity",
  reset: "Recover account access",
  dashboard: "Authenticated dashboard"
};

const state = {
  registered: false,
  signedIn: false,
  role: "User",
  email: "azeem@example.com",
  password: "BinaryGuard#2026",
  trustedDevice: true
};

const screenTitle = document.querySelector("#screenTitle");
const statusPill = document.querySelector("#statusPill");
const auditLog = document.querySelector("#auditLog");
const flowButtons = document.querySelectorAll(".flow-step");
const createAccountBtn = document.querySelector("#createAccountBtn");
const loginBtn = document.querySelector("#loginBtn");
const verifyBtn = document.querySelector("#verifyBtn");
const resetBtn = document.querySelector("#resetBtn");
const toggleRoleBtn = document.querySelector("#toggleRoleBtn");
const logoutBtn = document.querySelector("#logoutBtn");
const clearLogBtn = document.querySelector("#clearLogBtn");

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
  if (state.signedIn) {
    statusPill.textContent = "Signed in";
    statusPill.classList.add("ok");
    return;
  }

  statusPill.textContent = "Not signed in";
  statusPill.classList.remove("ok");
}

function passwordChecks() {
  const password = document.querySelector("#regPassword").value;
  const confirm = document.querySelector("#regConfirm").value;
  return {
    length: password.length >= 12,
    upper: /[A-Z]/.test(password),
    number: /\d/.test(password),
    symbol: /[^A-Za-z0-9]/.test(password),
    match: password === confirm && password.length > 0
  };
}

function updatePasswordRules() {
  const checks = passwordChecks();
  Object.entries(checks).forEach(([rule, pass]) => {
    document.querySelector(`[data-rule="${rule}"]`).classList.toggle("pass", pass);
  });
  createAccountBtn.disabled = !Object.values(checks).every(Boolean);
}

function mfaCode() {
  return [...document.querySelectorAll("#codeInputs input")].map((input) => input.value).join("");
}

function syncDashboard() {
  document.querySelector("#roleLabel").textContent = state.role;
  document.querySelector("#deviceLabel").textContent = state.trustedDevice ? "Trusted" : "Untrusted";
}

flowButtons.forEach((button) => {
  button.addEventListener("click", () => showScreen(button.dataset.flow));
});

document.querySelectorAll("[data-flow-target]").forEach((button) => {
  button.addEventListener("click", () => showScreen(button.dataset.flowTarget));
});

document.querySelectorAll("#regPassword, #regConfirm").forEach((input) => {
  input.addEventListener("input", updatePasswordRules);
});

document.querySelectorAll("#codeInputs input").forEach((input, index, list) => {
  input.addEventListener("input", () => {
    input.value = input.value.replace(/\D/g, "").slice(0, 1);
    if (input.value && list[index + 1]) list[index + 1].focus();
  });
});

createAccountBtn.addEventListener("click", () => {
  const email = document.querySelector("#regEmail").value.trim();
  const name = document.querySelector("#regName").value.trim();

  if (!name || !email.includes("@")) {
    toast("Enter a valid name and email address.");
    log("Registration stopped because required identity details were missing.");
    return;
  }

  state.registered = true;
  state.email = email;
  state.password = document.querySelector("#regPassword").value;
  document.querySelector("#loginEmail").value = email;
  document.querySelector("#resetEmail").value = email;
  toast("Account created. Continue to sign in.");
  log(`Account registered for ${email}.`);
  showScreen("login");
});

loginBtn.addEventListener("click", () => {
  const email = document.querySelector("#loginEmail").value.trim();
  const password = document.querySelector("#loginPassword").value;
  state.trustedDevice = document.querySelector("#rememberMe").checked;

  if (!state.registered) {
    toast("Create an account before signing in.");
    log("Login blocked because no account has been registered.");
    showScreen("register");
    return;
  }

  if (email !== state.email || password !== state.password) {
    toast("Credentials do not match.");
    log("Login failed after credential validation.");
    return;
  }

  toast("Credentials accepted. MFA required.");
  log("Credential check passed; MFA challenge issued.");
  showScreen("mfa");
});

verifyBtn.addEventListener("click", () => {
  if (mfaCode() !== "248106") {
    toast("Invalid verification code.");
    log("MFA verification failed.");
    return;
  }

  state.signedIn = true;
  updateStatus();
  syncDashboard();
  toast("Identity verified.");
  log("MFA verified; secure session started.");
  showScreen("dashboard");
});

resetBtn.addEventListener("click", () => {
  const email = document.querySelector("#resetEmail").value.trim();
  const password = document.querySelector("#resetPassword").value;

  if (!state.registered || email !== state.email) {
    toast("No matching account found.");
    log("Password reset request did not match a registered account.");
    return;
  }

  if (password.length < 12) {
    toast("New password must be at least 12 characters.");
    log("Password reset stopped because the new password was too short.");
    return;
  }

  state.password = password;
  document.querySelector("#loginPassword").value = password;
  toast("Password reset complete. Sign in again.");
  log("Password reset completed after account email check.");
  showScreen("login");
});

toggleRoleBtn.addEventListener("click", () => {
  state.role = state.role === "User" ? "Admin" : "User";
  syncDashboard();
  log(`Role switched to ${state.role} for access-state testing.`);
});

logoutBtn.addEventListener("click", () => {
  state.signedIn = false;
  updateStatus();
  log("Session ended and user returned to login.");
  showScreen("login");
});

clearLogBtn.addEventListener("click", () => {
  auditLog.innerHTML = "";
});

updatePasswordRules();
updateStatus();
log("Prototype loaded with demo account details prefilled.");
