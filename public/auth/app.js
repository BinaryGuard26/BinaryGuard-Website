const tenant = {
  id: "tenant-gov-mb",
  name: "Government of Manitoba",
  active: true,
  services: {
    access_card_ordering: true,
    camera_ordering: false,
    quote_requests: false,
    service_requests: false
  },
  allowedRoles: ["tenant_user", "manager", "security_admin"],
  processingEmail: "support@binaryguard.ca",
  approvedEmailDomain: "@gov.mb.ca"
};

const seedUsers = [];

const seedAdminUsers = [{
  id: "adm-1001",
  name: "BinaryGuard Admin",
  email: "admin@binaryguard.ca",
  role: "super_admin",
  status: "Active",
  password: "Admin#2026!",
  mfaCode: "864209",
  approved_by_admin: true,
  mfa_enrolled: true,
  approved_at: "2026-01-01T00:00:00.000Z",
  created_from_registration_request_id: "seed-break-glass-admin"
}];

const user = { id: "", name: "", email: "", role: "", tenant_id: tenant.id, status: "Inactive", authenticated: false, otpVerified: false };

let dropdownOptions = JSON.parse(localStorage.getItem("bg-dropdown-options") || "null") || {
  request_type: ["New Card", "Replacement Card", "Temporary Card", "Cancel Card", "Access Change"],
  access_level: ["Standard Access", "Manager Access", "Restricted Area Access"],
  site: ["Winnipeg Central Office", "Brandon Regional Office", "Thompson Service Centre"],
  building: ["Government Administration Building", "Norquay Building", "Woodsworth Building"]
};

let tenantSettings = JSON.parse(localStorage.getItem("bg-tenant-settings") || "null") || tenant;
Object.assign(tenant, tenantSettings);

const pages = ["auth", "register", "adminRegister", "adminLogin", "registrationSubmitted", "admin", "otp", "services", "checking", "denied", "order", "success"];
const steps = ["auth", "otp", "services", "order"];
let referenceSequence = Number(localStorage.getItem("bg-reference-sequence") || 145);
let registrationSequence = Number(localStorage.getItem("bg-registration-sequence") || 1);
let auditLogs = JSON.parse(localStorage.getItem("bg-audit-logs") || "[]");
let activeAdminTab = "dashboard";
let adminSession = JSON.parse(sessionStorage.getItem("bg-admin-session") || "null");
let editingOrderId = null;
const $ = (selector) => document.querySelector(selector);

function readStore(key, fallback = []) { return JSON.parse(localStorage.getItem(key) || JSON.stringify(fallback)); }
function writeStore(key, value) { localStorage.setItem(key, JSON.stringify(value)); }
function saveTenant() { writeStore("bg-tenant-settings", tenant); }
function saveDropdowns() { writeStore("bg-dropdown-options", dropdownOptions); }

function getCompanyUsers() {
  const saved = readStore("bg-company-users", []);
  const merged = seedUsers.map((seed) => saved.find((item) => item.email === seed.email) || seed);
  saved.forEach((savedUser) => { if (!merged.some((item) => item.email === savedUser.email)) merged.push(savedUser); });
  return merged;
}
function saveCompanyUsers(users) {
  writeStore("bg-company-users", users);
}
function getAdminUsers() {
  const saved = readStore("bg-admin-users", []);
  const merged = seedAdminUsers.map((seed) => saved.find((item) => item.email === seed.email) || seed);
  saved.forEach((savedUser) => { if (!merged.some((item) => item.email === savedUser.email)) merged.push(savedUser); });
  return merged;
}
function saveAdminUsers(users) {
  writeStore("bg-admin-users", users);
}
function getRegistrationRequests() { return readStore("bg-user-registration-requests", []); }
function saveRegistrationRequests(requests) { writeStore("bg-user-registration-requests", requests); }
function getAdminRegistrationRequests() { return readStore("bg-admin-registration-requests", []); }
function saveAdminRegistrationRequests(requests) { writeStore("bg-admin-registration-requests", requests); }
function getOrders() { return readStore("bg-card-access-orders", []); }
function saveOrders(orders) { writeStore("bg-card-access-orders", orders); }

function escapeText(value = "") {
  return String(value).replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" }[char]));
}
function titleCase(value) { return value.replaceAll("_", " ").replace(/\b\w/g, (letter) => letter.toUpperCase()); }
function initials(name) { return name.split(" ").filter(Boolean).slice(0, 2).map((part) => part[0].toUpperCase()).join("") || "BG"; }

function showPage(name) {
  pages.forEach((key) => $(`#${key}Page`)?.classList.toggle("active", key === name));
  const titles = {
    auth: ["SECURE ACCESS", "Welcome to BinaryGuard"],
    register: ["USER REGISTRATION", "Register company user"],
    adminRegister: ["ADMIN REGISTRATION", "Request Admin CPanel access"],
    adminLogin: ["ADMIN MFA", "Admin CPanel secure login"],
    registrationSubmitted: ["PENDING APPROVAL", "Registration submitted"],
    admin: ["ADMIN CPANEL", "Portal Control Panel"],
    otp: ["IDENTITY VERIFICATION", "Enter your security code"],
    services: ["CLIENT PORTAL", "Authorized services"],
    checking: ["SERVICE AUTHORIZATION", "Checking access"],
    denied: ["SERVICE AUTHORIZATION", "Access denied"],
    order: ["SECURE ORDERING", "Access Card Ordering"],
    success: ["REQUEST CONFIRMATION", "Order submitted"]
  };
  $("#eyebrow").textContent = titles[name][0];
  $("#pageTitle").textContent = titles[name][1];
  updateJourney(name);
  if (name === "admin") {
    if (!isAdminSessionValid()) {
      audit("ADMIN_CPANEL_BLOCKED_NO_SESSION", "admin_session", "missing-or-expired");
      toast("Admin CPanel requires approved admin login and MFA.");
      showPage("adminLogin");
      return;
    }
    renderCPanel();
  }
  if (name === "services") renderClientDashboard();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function updateJourney(page) {
  const activeStep = ["register", "adminRegister", "adminLogin", "registrationSubmitted", "admin"].includes(page) ? "auth" : page === "checking" || page === "denied" ? "services" : page === "success" ? "order" : page;
  const activeIndex = steps.indexOf(activeStep);
  document.querySelectorAll(".journey-step").forEach((el, i) => {
    el.classList.toggle("active", i === activeIndex);
    el.classList.toggle("done", i < activeIndex);
    el.classList.toggle("locked", i > activeIndex);
    el.querySelector("i").textContent = i < activeIndex ? "✓" : i + 1;
  });
}

function status(text, ok = false) {
  $("#statusBadge").innerHTML = `<i></i> ${text}`;
  $("#statusBadge").classList.toggle("ok", ok);
}
function toast(message) {
  const el = $("#toast");
  el.textContent = message;
  el.classList.add("show");
  clearTimeout(el.timer);
  el.timer = setTimeout(() => el.classList.remove("show"), 3200);
}
function audit(action, entityType = "session", entityId = user.id || "anonymous") {
  auditLogs.unshift({ actor_user_id: user.id || "admin-cpanel", action, entity_type: entityType, entity_id: entityId, timestamp: new Date().toISOString(), ip_address: "Captured server-side" });
  localStorage.setItem("bg-audit-logs", JSON.stringify(auditLogs.slice(0, 250)));
}

function isAdminSessionValid() {
  if (!adminSession?.email || !adminSession?.expires_at) return false;
  if (new Date(adminSession.expires_at).getTime() < Date.now()) {
    sessionStorage.removeItem("bg-admin-session");
    adminSession = null;
    return false;
  }
  const admin = getAdminUsers().find((account) => account.email === adminSession.email);
  return Boolean(admin && admin.status === "Active" && admin.approved_by_admin === true && admin.mfa_enrolled === true);
}

function requireAdminSession(action = "this admin action") {
  if (isAdminSessionValid()) return true;
  audit("ADMIN_ACTION_BLOCKED_NO_SESSION", "admin_action", action);
  toast("Admin session locked. Please sign in with MFA again.");
  showPage("adminLogin");
  return false;
}

function openAdminArea() {
  if (isAdminSessionValid()) showPage("admin");
  else showPage("adminLogin");
}

function loadTenantOptions() {
  document.querySelectorAll("select[data-options]").forEach((select) => {
    select.innerHTML = `<option value="">Select an option</option>` + dropdownOptions[select.dataset.options].map((value) => `<option>${escapeText(value)}</option>`).join("");
  });
}

function setActiveUser(account) {
  Object.assign(user, {
    id: account.id,
    name: account.name,
    email: account.email,
    role: account.role,
    tenant_id: account.tenant_id,
    status: account.status,
    approved_by_admin: account.approved_by_admin === true,
    created_from_registration_request_id: account.created_from_registration_request_id || "",
    authenticated: true,
    otpVerified: false
  });
  $("#otpEmail").textContent = account.email;
  $("#sessionAvatar").textContent = initials(account.name);
  $("#sessionName").textContent = account.name;
  $("#sessionOrg").textContent = tenant.name;
  $("#serviceGreeting").textContent = `Good morning, ${account.name.split(" ")[0]}`;
  $("#serviceOrg").textContent = tenant.name;
  $("#requesterName").textContent = account.name;
  $("#requesterEmail").textContent = account.email;
  $("#requesterOrg").textContent = tenant.name;
  $("#confirmationEmail").textContent = account.email;
}

function authorizeService() {
  return [user.authenticated, user.otpVerified, user.status === "Active", user.approved_by_admin === true, user.created_from_registration_request_id, user.tenant_id === tenant.id, tenant.active, tenant.services.access_card_ordering, tenant.allowedRoles.includes(user.role)].every(Boolean);
}
function resetSession() {
  user.authenticated = false;
  user.otpVerified = false;
  user.status = "Inactive";
  $("#sessionInfo").hidden = true;
  status("Not verified");
  audit("LOGOUT");
  showPage("auth");
}
function makeRegistrationReference(prefix = "REG") {
  const reference = `${prefix}-${new Date().getFullYear()}-${String(registrationSequence++).padStart(6, "0")}`;
  localStorage.setItem("bg-registration-sequence", registrationSequence);
  return reference;
}

function renderCPanel() {
  if (!requireAdminSession("render_cpanel")) return;
  const companyPending = getRegistrationRequests().filter((item) => item.status === "Pending Approval").length;
  const adminPending = getAdminRegistrationRequests().filter((item) => item.status === "Pending Approval").length;
  $("#companyPendingBadge").textContent = companyPending;
  $("#adminPendingBadge").textContent = adminPending;
  $("#adminSessionBadge").textContent = `${adminSession.email} · MFA verified`;
  document.querySelectorAll(".cpanel-menu button[data-admin-tab]").forEach((button) => button.classList.toggle("active", button.dataset.adminTab === activeAdminTab));
  document.querySelectorAll(".admin-tab").forEach((tab) => tab.classList.toggle("active", tab.id === `admin-${activeAdminTab}`));
  renderDashboard();
  renderCompanyApprovals();
  renderAdminApprovals();
  renderUsers();
  renderAdminUsers();
  renderOrders();
  renderServices();
  renderDropdowns();
  renderAudit();
}

function cpanelHeader(title, note, action = "") {
  return `<div class="cpanel-heading"><div><h3>${title}</h3><p>${note}</p></div>${action}</div>`;
}

function renderDashboard() {
  const companyPending = getRegistrationRequests().filter((item) => item.status === "Pending Approval").length;
  const adminPending = getAdminRegistrationRequests().filter((item) => item.status === "Pending Approval").length;
  const activeUsers = getCompanyUsers().filter((item) => item.status === "Active").length;
  const orders = getOrders();
  $("#admin-dashboard").innerHTML = `
    ${cpanelHeader("Control overview", "Live snapshot of the portal state in this prototype.")}
    <div class="metric-grid">
      <article><b>${companyPending}</b><span>Company approvals</span></article>
      <article><b>${adminPending}</b><span>Admin approvals</span></article>
      <article><b>${activeUsers}</b><span>Active portal users</span></article>
      <article><b>${orders.length}</b><span>Access card orders</span></article>
    </div>
    <div class="cpanel-two">
      <article class="mini-panel"><h4>Tenant</h4><p>${tenant.name}</p><p>Status: <b>${tenant.active ? "Active" : "Inactive"}</b></p><p>Processing team: <b>${tenant.processingEmail}</b></p></article>
      <article class="mini-panel"><h4>Workflow</h4><p>Registration → Admin approval → Active account → OTP → Service authorization → Order portal</p></article>
    </div>`;
}

function requestCard(request, type) {
  const isAdmin = type === "admin";
  const name = isAdmin ? request.name : request.new_user_name;
  const email = isAdmin ? request.email : request.new_user_email;
  const role = isAdmin ? request.requested_role : request.requested_role;
  return `
    <article class="request-card ${request.status.toLowerCase().replaceAll(" ", "-")}">
      <div><small>${request.reference}</small><h3>${escapeText(name)}</h3><p>${escapeText(email)}</p></div>
      <dl>
        <div><dt>Type</dt><dd>${isAdmin ? "Admin user" : "Company user"}</dd></div>
        <div><dt>Role</dt><dd>${titleCase(role)}</dd></div>
        <div><dt>Submitted by</dt><dd>${escapeText(isAdmin ? "Self request" : request.operator_name)}</dd></div>
        <div><dt>Status</dt><dd><span>${request.status}</span></dd></div>
      </dl>
      <p class="reason">${escapeText(isAdmin ? request.reason : request.reason)}</p>
      <div class="request-actions">
        <button class="primary" data-approve-${type}="${request.id}" ${request.status !== "Pending Approval" ? "disabled" : ""}>Approve & activate</button>
        <button class="secondary" data-reject-${type}="${request.id}" ${request.status !== "Pending Approval" ? "disabled" : ""}>Reject</button>
      </div>
    </article>`;
}

function renderCompanyApprovals() {
  const requests = getRegistrationRequests();
  $("#admin-companyApprovals").innerHTML = cpanelHeader("Company user approvals", "Operator-submitted company users appear here before access is granted.") +
    (requests.length ? `<div class="request-list">${requests.map((request) => requestCard(request, "company")).join("")}</div>` : emptyState("No company-user approval requests yet."));
}
function renderAdminApprovals() {
  const requests = getAdminRegistrationRequests();
  $("#admin-adminApprovals").innerHTML = cpanelHeader("Admin user approvals", "New Admin CPanel users must be reviewed before they can control the portal.") +
    (requests.length ? `<div class="request-list">${requests.map((request) => requestCard(request, "admin")).join("")}</div>` : emptyState("No admin approval requests yet."));
}
function emptyState(text) { return `<article class="empty-state"><h3>${text}</h3><p>When requests are submitted, they will appear here.</p></article>`; }

function renderUsers() {
  const users = getCompanyUsers();
  $("#admin-users").innerHTML = cpanelHeader("Company users", "View, activate, suspend, or deactivate portal users.") + `
    <div class="table-wrap"><table><thead><tr><th>Name</th><th>Email</th><th>Role</th><th>Department</th><th>Status</th><th>Action</th></tr></thead><tbody>
    ${users.map((account) => `<tr><td>${escapeText(account.name)}</td><td>${escapeText(account.email)}</td><td>${titleCase(account.role)}</td><td>${escapeText(account.department || "-")}</td><td><span class="pill">${account.status}</span></td><td><button class="secondary small" data-toggle-user="${account.email}">${account.status === "Active" ? "Suspend" : "Activate"}</button></td></tr>`).join("")}
    </tbody></table></div>`;
}
function renderAdminUsers() {
  const admins = getAdminUsers();
  $("#admin-adminUsers").innerHTML = cpanelHeader("Admin users", "Control who can access the Admin CPanel.") + `
    <div class="table-wrap"><table><thead><tr><th>Name</th><th>Email</th><th>Admin role</th><th>Status</th><th>Action</th></tr></thead><tbody>
    ${admins.map((account) => `<tr><td>${escapeText(account.name)}</td><td>${escapeText(account.email)}</td><td>${titleCase(account.role)}</td><td><span class="pill">${account.status}</span></td><td><button class="secondary small" data-toggle-admin-user="${account.email}">${account.status === "Active" ? "Suspend" : "Activate"}</button></td></tr>`).join("")}
    </tbody></table></div>`;
}
function renderOrders() {
  const orders = getOrders();
  $("#admin-orders").innerHTML = cpanelHeader("Access card orders", "Process submitted card requests and change their status.") +
    (orders.length ? `<div class="table-wrap"><table><thead><tr><th>Reference</th><th>Cardholder</th><th>Type</th><th>Access</th><th>Status</th><th>Change status</th></tr></thead><tbody>
    ${orders.map((order) => `<tr><td>${order.reference}</td><td>${escapeText(order.cardholder_name)}</td><td>${escapeText(order.request_type)}</td><td>${escapeText(order.access_level)}</td><td><span class="pill">${order.status}</span></td><td><select data-order-status="${order.id}">${["Submitted", "Under Review", "More Information Required", "Approved", "In Progress", "Completed", "Cancelled", "Rejected"].map((status) => `<option ${order.status === status ? "selected" : ""}>${status}</option>`).join("")}</select></td></tr>`).join("")}
    </tbody></table></div>` : emptyState("No access card orders yet."));
}
function renderServices() {
  $("#admin-services").innerHTML = cpanelHeader("Tenant services", "Enable or disable services for this tenant. Access Card Ordering is checked before loading the form.") + `
    <div class="service-control-grid">
      ${Object.entries(tenant.services).map(([key, enabled]) => `<article class="mini-panel"><h4>${titleCase(key)}</h4><p>${enabled ? "Enabled" : "Disabled"}</p><button class="${enabled ? "secondary" : "primary"}" data-toggle-service="${key}">${enabled ? "Disable" : "Enable"}</button></article>`).join("")}
    </div>
    <div class="mini-panel"><h4>Tenant status</h4><p>${tenant.active ? "Active" : "Inactive"}</p><button class="secondary" data-toggle-tenant>${tenant.active ? "Deactivate tenant" : "Activate tenant"}</button></div>`;
}
function renderDropdowns() {
  $("#admin-dropdowns").innerHTML = cpanelHeader("Dropdown options", "Maintain tenant-specific form options loaded into the order form.") + `
    <div class="dropdown-admin-grid">
      ${Object.entries(dropdownOptions).map(([group, options]) => `<article class="mini-panel"><h4>${titleCase(group)}</h4><p>${options.map(escapeText).join(", ")}</p><div class="inline-form"><input data-option-input="${group}" placeholder="Add option"><button class="primary" data-add-option="${group}">Add</button></div></article>`).join("")}
    </div>`;
}
function renderAudit() {
  $("#admin-audit").innerHTML = cpanelHeader("Audit logs", "Every major portal and CPanel action is recorded here.") + `
    <div class="table-wrap"><table><thead><tr><th>Time</th><th>Actor</th><th>Action</th><th>Entity</th></tr></thead><tbody>
    ${auditLogs.slice(0, 40).map((log) => `<tr><td>${new Date(log.timestamp).toLocaleString()}</td><td>${escapeText(log.actor_user_id)}</td><td>${escapeText(log.action)}</td><td>${escapeText(log.entity_type)} / ${escapeText(log.entity_id)}</td></tr>`).join("")}
    </tbody></table></div>`;
}

function getClientOrders() {
  return getOrders().filter((order) => order.submitted_by_user_id === user.id && order.tenant_id === tenant.id);
}

function renderClientDashboard() {
  const holder = $("#clientRequests");
  const summary = $("#clientRequestSummary");
  if (!holder || !summary) return;
  const orders = getClientOrders();
  const activeCount = orders.filter((order) => !["Completed", "Cancelled", "Rejected"].includes(order.status)).length;
  const completedCount = orders.filter((order) => order.status === "Completed").length;
  summary.innerHTML = `
    <article><b>${orders.length}</b><span>Total submitted</span></article>
    <article><b>${activeCount}</b><span>Active requests</span></article>
    <article><b>${completedCount}</b><span>Completed</span></article>`;

  if (!orders.length) {
    holder.innerHTML = `<article class="empty-state"><h3>No submitted requests yet</h3><p>Use Access Card Ordering to create your first request. It will appear here after submission.</p></article>`;
    return;
  }

  holder.innerHTML = `
    <div class="table-wrap"><table><thead><tr><th>Reference</th><th>Request type</th><th>Cardholder</th><th>Site</th><th>Status</th><th>Actions</th></tr></thead><tbody>
      ${orders.map((order) => `<tr>
        <td>${escapeText(order.reference)}</td>
        <td>${escapeText(order.request_type)}</td>
        <td>${escapeText(order.cardholder_name)}</td>
        <td>${escapeText(order.site_name)}</td>
        <td><span class="pill">${escapeText(order.status)}</span></td>
        <td class="row-actions">
          <button class="secondary small" data-view-client-order="${order.id}">View</button>
          <button class="secondary small" data-edit-client-order="${order.id}">Edit</button>
          <button class="danger small" data-delete-client-order="${order.id}">Delete</button>
        </td>
      </tr>`).join("")}
    </tbody></table></div>`;
}

function setOrderFormMode(mode, reference = "") {
  const isEdit = mode === "edit";
  $("#orderFormTitle").textContent = isEdit ? `Edit request ${reference}` : "New access card request";
  $("#orderFormHelp").textContent = isEdit ? "Modify the request details below and save your changes." : "Complete the details below. Required fields are marked with an asterisk.";
  $("#orderModeBadge").textContent = isEdit ? "Edit mode" : "Secure form";
  const submit = document.querySelector("#orderForm button[type='submit']");
  if (submit) submit.innerHTML = isEdit ? "Save changes <span>→</span>" : "Submit access card order <span>→</span>";
}

function resetOrderFormForCreate() {
  editingOrderId = null;
  $("#orderForm").reset();
  loadTenantOptions();
  setOrderFormMode("create");
}

function loadOrderForEdit(orderId) {
  const order = getClientOrders().find((item) => item.id === orderId);
  if (!order) { toast("Request not found for this user."); return; }
  editingOrderId = order.id;
  loadTenantOptions();
  $("#requestType").value = order.request_type || "";
  $("#cardholderName").value = order.cardholder_name || "";
  $("#cardholderEmail").value = order.cardholder_email || "";
  $("#employeeId").value = order.employee_id || "";
  $("#department").value = order.department || "";
  $("#site").value = order.site_name || "";
  $("#building").value = order.building_address || "";
  $("#floor").value = order.floor || "";
  $("#accessLevel").value = order.access_level || "";
  $("#effectiveDate").value = order.effective_date || "";
  $("#expiryDate").value = order.expiry_date || "";
  $("#notes").value = order.notes || "";
  setOrderFormMode("edit", order.reference);
  audit("OPEN_ORDER_EDIT", "card_access_order", order.id);
  showPage("order");
}

function viewClientOrder(orderId) {
  const order = getClientOrders().find((item) => item.id === orderId);
  if (!order) { toast("Request not found for this user."); return; }
  toast(`${order.reference}: ${order.request_type} for ${order.cardholder_name} is ${order.status}.`);
  audit("VIEW_ORDER", "card_access_order", order.id);
}

function deleteClientOrder(orderId) {
  const order = getClientOrders().find((item) => item.id === orderId);
  if (!order) { toast("Request not found for this user."); return; }
  if (!confirm(`Delete request ${order.reference}? This cannot be undone in this prototype.`)) return;
  const remaining = getOrders().filter((item) => item.id !== orderId);
  saveOrders(remaining);
  audit("DELETE_ORDER", "card_access_order", orderId);
  renderClientDashboard();
  toast("Request deleted.");
}

function approveCompanyRegistration(id) {
  const requests = getRegistrationRequests();
  const request = requests.find((item) => item.id === id);
  if (!request || request.status !== "Pending Approval") return;
  request.status = "Approved";
  request.approved_at = new Date().toISOString();
  const users = getCompanyUsers();
  if (!users.some((account) => account.email === request.new_user_email)) {
    users.unshift({
      id: `usr-${crypto.randomUUID().slice(0, 8)}`,
      name: request.new_user_name,
      email: request.new_user_email,
      role: request.requested_role,
      department: request.department,
      tenant_id: tenant.id,
      status: "Active",
      approved_by_admin: true,
      approved_at: request.approved_at,
      registration_source: "operator_request",
      created_from_registration_request_id: request.id
    });
    saveCompanyUsers(users);
  }
  saveRegistrationRequests(requests);
  audit("APPROVE_USER_REGISTRATION", "user_registration_request", id);
  audit("ACTIVATE_USER_ACCOUNT", "user", request.new_user_email);
  $("#email").value = request.new_user_email;
  renderCPanel();
  toast("Company user approved and activated.");
}
function rejectCompanyRegistration(id) {
  const requests = getRegistrationRequests();
  const request = requests.find((item) => item.id === id);
  if (!request || request.status !== "Pending Approval") return;
  request.status = "Rejected";
  request.rejected_at = new Date().toISOString();
  saveRegistrationRequests(requests);
  audit("REJECT_USER_REGISTRATION", "user_registration_request", id);
  renderCPanel();
  toast("Company user request rejected.");
}
function approveAdminRegistration(id) {
  const requests = getAdminRegistrationRequests();
  const request = requests.find((item) => item.id === id);
  if (!request || request.status !== "Pending Approval") return;
  request.status = "Approved";
  request.approved_at = new Date().toISOString();
  const admins = getAdminUsers();
  if (!admins.some((account) => account.email === request.email)) {
    admins.unshift({
      id: `adm-${crypto.randomUUID().slice(0, 8)}`,
      name: request.name,
      email: request.email,
      role: request.requested_role,
      status: "Active",
      password: "Temp#2026!",
      mfaCode: "864209",
      approved_by_admin: true,
      mfa_enrolled: true,
      approved_at: request.approved_at,
      approved_by_admin_session: adminSession?.email || "seed-admin",
      created_from_registration_request_id: request.id
    });
    saveAdminUsers(admins);
  }
  saveAdminRegistrationRequests(requests);
  audit("APPROVE_ADMIN_REGISTRATION", "admin_registration_request", id);
  audit("ACTIVATE_ADMIN_ACCOUNT", "admin_user", request.email);
  renderCPanel();
  toast("Admin user approved and activated.");
}
function rejectAdminRegistration(id) {
  const requests = getAdminRegistrationRequests();
  const request = requests.find((item) => item.id === id);
  if (!request || request.status !== "Pending Approval") return;
  request.status = "Rejected";
  request.rejected_at = new Date().toISOString();
  saveAdminRegistrationRequests(requests);
  audit("REJECT_ADMIN_REGISTRATION", "admin_registration_request", id);
  renderCPanel();
  toast("Admin user request rejected.");
}

$("#loginForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const email = $("#email").value.trim().toLowerCase();
  if (!email.endsWith(tenant.approvedEmailDomain)) { toast("This email domain is not approved for portal access."); audit("LOGIN_DENIED_DOMAIN"); return; }
  const account = getCompanyUsers().find((item) => item.email === email);
  if (!account) {
    toast("No active account found. Please submit registration for admin approval.");
    audit("LOGIN_DENIED_NO_ACTIVE_ACCOUNT");
    showPage("register");
    $("#newUserEmail").value = email;
    return;
  }
  if (account.status !== "Active") { toast("This account is pending admin approval or suspended."); audit("LOGIN_DENIED_INACTIVE_USER", "user", account.id); return; }
  if (account.approved_by_admin !== true || !account.created_from_registration_request_id) {
    toast("Access blocked. This user must be registered by an operator and approved in Admin CPanel first.");
    audit("LOGIN_DENIED_NOT_APPROVED_REGISTRATION", "user", account.id);
    return;
  }
  setActiveUser(account);
  audit("LOGIN_ACCEPTED");
  status("OTP required");
  showPage("otp");
});

$("#registrationForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const newUserEmail = $("#newUserEmail").value.trim().toLowerCase();
  const operatorEmail = $("#operatorEmail").value.trim().toLowerCase();
  if (!newUserEmail.endsWith(tenant.approvedEmailDomain) || !operatorEmail.endsWith(tenant.approvedEmailDomain)) { toast("Registration is limited to approved organization email addresses."); audit("USER_REGISTRATION_DENIED_DOMAIN"); return; }
  if (getCompanyUsers().some((account) => account.email === newUserEmail)) { toast("This user already has an account."); return; }
  const requests = getRegistrationRequests();
  const existingPending = requests.find((request) => request.new_user_email === newUserEmail && request.status === "Pending Approval");
  if (existingPending) { $("#registrationReference").textContent = existingPending.reference; toast("A pending registration request already exists for this user."); showPage("registrationSubmitted"); return; }
  const id = crypto.randomUUID();
  const request = { id, reference: makeRegistrationReference("REG"), tenant_id: tenant.id, organization_name: tenant.name, operator_name: $("#operatorName").value.trim(), operator_email: operatorEmail, new_user_name: $("#newUserName").value.trim(), new_user_email: newUserEmail, department: $("#newUserDepartment").value.trim(), requested_role: $("#requestedRole").value, reason: $("#registrationReason").value.trim(), status: "Pending Approval", created_at: new Date().toISOString() };
  requests.unshift(request);
  saveRegistrationRequests(requests);
  audit("CREATE_USER_REGISTRATION_REQUEST", "user_registration_request", id);
  audit("ADMIN_REGISTRATION_NOTIFICATION_QUEUED", "user_registration_request", id);
  $("#registrationReference").textContent = request.reference;
  showPage("registrationSubmitted");
});

$("#adminRegistrationForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const email = $("#adminApplicantEmail").value.trim().toLowerCase();
  const sponsorEmail = $("#adminSponsorEmail").value.trim().toLowerCase();
  const inviteCode = $("#adminInviteCode").value.trim();
  if (!email.endsWith("@binaryguard.ca") || !sponsorEmail.endsWith("@binaryguard.ca")) {
    toast("Admin registration requires BinaryGuard email addresses.");
    audit("ADMIN_REGISTRATION_DENIED_DOMAIN", "admin_registration_request", email);
    return;
  }
  if (inviteCode !== "BG-ADMIN-2026") {
    toast("Invalid admin invitation code.");
    audit("ADMIN_REGISTRATION_DENIED_INVITE_CODE", "admin_registration_request", email);
    return;
  }
  if (!$("#adminSecurityAck").checked) {
    toast("Security acknowledgement is required.");
    return;
  }
  if (getAdminUsers().some((account) => account.email === email)) { toast("This admin user already exists."); return; }
  const requests = getAdminRegistrationRequests();
  const existingPending = requests.find((request) => request.email === email && request.status === "Pending Approval");
  if (existingPending) { $("#registrationReference").textContent = existingPending.reference; toast("A pending admin request already exists."); showPage("registrationSubmitted"); return; }
  const id = crypto.randomUUID();
  const request = { id, reference: makeRegistrationReference("ADM"), name: $("#adminApplicantName").value.trim(), email, sponsor_email: sponsorEmail, invite_code_verified: true, security_acknowledged: true, requested_role: $("#requestedAdminRole").value, reason: $("#adminAccessReason").value.trim(), status: "Pending Approval", created_at: new Date().toISOString() };
  requests.unshift(request);
  saveAdminRegistrationRequests(requests);
  audit("CREATE_ADMIN_REGISTRATION_REQUEST", "admin_registration_request", id);
  audit("ADMIN_ACCESS_NOTIFICATION_QUEUED", "admin_registration_request", id);
  $("#registrationReference").textContent = request.reference;
  showPage("registrationSubmitted");
});

$("#adminLoginForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const email = $("#adminLoginEmail").value.trim().toLowerCase();
  const password = $("#adminLoginPassword").value;
  const mfaCode = $("#adminMfaCode").value.trim();
  const admin = getAdminUsers().find((account) => account.email === email);

  if (!admin) {
    audit("ADMIN_LOGIN_DENIED_UNKNOWN_USER", "admin_user", email);
    toast("Admin account not found or not approved.");
    return;
  }
  if (admin.status !== "Active" || admin.approved_by_admin !== true || !admin.created_from_registration_request_id) {
    audit("ADMIN_LOGIN_DENIED_INACTIVE_OR_UNAPPROVED", "admin_user", email);
    toast("Admin account is not active or not approved.");
    return;
  }
  if (admin.password !== password) {
    audit("ADMIN_LOGIN_DENIED_BAD_PASSWORD", "admin_user", email);
    toast("Incorrect admin password.");
    return;
  }
  if (admin.mfa_enrolled !== true || admin.mfaCode !== mfaCode) {
    audit("ADMIN_LOGIN_DENIED_BAD_MFA", "admin_user", email);
    toast("Invalid MFA code.");
    return;
  }

  adminSession = {
    email,
    admin_user_id: admin.id,
    role: admin.role,
    mfa_verified: true,
    started_at: new Date().toISOString(),
    expires_at: new Date(Date.now() + 15 * 60 * 1000).toISOString()
  };
  sessionStorage.setItem("bg-admin-session", JSON.stringify(adminSession));
  audit("ADMIN_LOGIN_MFA_SUCCESS", "admin_user", email);
  toast("Admin session unlocked for 15 minutes.");
  showPage("admin");
});

$("#otpForm").addEventListener("submit", (event) => {
  event.preventDefault();
  if ($("#otpCode").value !== "248106") { toast("That code is incorrect. Please try again."); audit("OTP_FAILED"); return; }
  user.otpVerified = true;
  $("#sessionInfo").hidden = false;
  status("Verified", true);
  audit("OTP_VERIFIED");
  showPage("services");
});

$("#openServiceBtn").addEventListener("click", () => {
  showPage("checking");
  audit("SERVICE_AUTHORIZATION_STARTED", "tenant_service", "access_card_ordering");
  const items = [...document.querySelectorAll("#checkList li")];
  items.forEach((item) => item.classList.remove("checked"));
  items.forEach((item, index) => setTimeout(() => item.classList.add("checked"), 320 * (index + 1)));
  setTimeout(() => {
    if (authorizeService()) { resetOrderFormForCreate(); audit("SERVICE_AUTHORIZED", "tenant_service", "access_card_ordering"); showPage("order"); }
    else { audit("SERVICE_ACCESS_DENIED", "tenant_service", "access_card_ordering"); showPage("denied"); }
  }, 2100);
});

$("#orderForm").addEventListener("submit", (event) => {
  event.preventDefault();
  if (editingOrderId) {
    const orders = getOrders();
    const order = orders.find((item) => item.id === editingOrderId && item.submitted_by_user_id === user.id && item.tenant_id === tenant.id);
    if (!order) {
      toast("This request could not be updated.");
      editingOrderId = null;
      showPage("services");
      return;
    }
    Object.assign(order, {
      cardholder_name: $("#cardholderName").value,
      cardholder_email: $("#cardholderEmail").value,
      employee_id: $("#employeeId").value,
      department: $("#department").value,
      site_name: $("#site").value,
      building_address: $("#building").value,
      floor: $("#floor").value,
      request_type: $("#requestType").value,
      access_level: $("#accessLevel").value,
      effective_date: $("#effectiveDate").value,
      expiry_date: $("#expiryDate").value || null,
      notes: $("#notes").value,
      updated_at: new Date().toISOString()
    });
    saveOrders(orders);
    audit("UPDATE_ORDER", "card_access_order", order.id);
    editingOrderId = null;
    setOrderFormMode("create");
    toast("Request updated.");
    showPage("services");
    return;
  }
  const id = crypto.randomUUID();
  const reference = `ACO-${new Date().getFullYear()}-${String(referenceSequence++).padStart(6, "0")}`;
  localStorage.setItem("bg-reference-sequence", referenceSequence);
  const order = { id, reference, tenant_id: tenant.id, submitted_by_user_id: user.id, cardholder_name: $("#cardholderName").value, cardholder_email: $("#cardholderEmail").value, employee_id: $("#employeeId").value, department: $("#department").value, site_name: $("#site").value, building_address: $("#building").value, floor: $("#floor").value, request_type: $("#requestType").value, access_level: $("#accessLevel").value, effective_date: $("#effectiveDate").value, expiry_date: $("#expiryDate").value || null, notes: $("#notes").value, status: "Submitted", created_at: new Date().toISOString() };
  const orders = getOrders();
  orders.unshift(order);
  saveOrders(orders);
  audit("CREATE_ORDER", "card_access_order", id);
  audit("CONFIRMATION_EMAIL_QUEUED", "card_access_order", id);
  audit("STAFF_NOTIFICATION_QUEUED", "card_access_order", id);
  $("#referenceNumber").textContent = reference;
  showPage("success");
});

$("#showRegisterBtn").addEventListener("click", () => showPage("register"));
$("#showAdminRegisterBtn")?.addEventListener("click", () => showPage("adminRegister"));
$("#showAdminBtn")?.addEventListener("click", openAdminArea);
$("#goAdminReviewBtn").addEventListener("click", openAdminArea);
$("#clearAdminSessionBtn").addEventListener("click", () => {
  sessionStorage.removeItem("bg-admin-session");
  adminSession = null;
  audit("ADMIN_SESSION_LOCKED", "admin_session", "manual-lock");
  toast("Admin session locked.");
  showPage("adminLogin");
});
$("#newOrderBtn").addEventListener("click", () => { resetOrderFormForCreate(); showPage("order"); });
$("#refreshClientDashboardBtn").addEventListener("click", renderClientDashboard);
$("#cancelOrderEditBtn")?.addEventListener("click", () => { editingOrderId = null; setOrderFormMode("create"); showPage("services"); });
$("#printBtn").addEventListener("click", () => window.print());
$("#logoutBtn").addEventListener("click", resetSession);

$("#clientRequests").addEventListener("click", (event) => {
  const target = event.target;
  if (target.dataset.viewClientOrder) viewClientOrder(target.dataset.viewClientOrder);
  if (target.dataset.editClientOrder) loadOrderForEdit(target.dataset.editClientOrder);
  if (target.dataset.deleteClientOrder) deleteClientOrder(target.dataset.deleteClientOrder);
});

document.querySelector(".cpanel").addEventListener("click", (event) => {
  if (!requireAdminSession("cpanel_click")) return;
  const target = event.target;
  if (target.dataset.adminTab) { activeAdminTab = target.dataset.adminTab; renderCPanel(); return; }
  if (target.dataset.approveCompany) approveCompanyRegistration(target.dataset.approveCompany);
  if (target.dataset.rejectCompany) rejectCompanyRegistration(target.dataset.rejectCompany);
  if (target.dataset.approveAdmin) approveAdminRegistration(target.dataset.approveAdmin);
  if (target.dataset.rejectAdmin) rejectAdminRegistration(target.dataset.rejectAdmin);
  if (target.dataset.toggleService) {
    const key = target.dataset.toggleService;
    tenant.services[key] = !tenant.services[key];
    saveTenant();
    audit("TOGGLE_TENANT_SERVICE", "tenant_service", key);
    renderCPanel();
  }
  if (target.dataset.toggleTenant !== undefined) {
    tenant.active = !tenant.active;
    saveTenant();
    audit("TOGGLE_TENANT_STATUS", "tenant", tenant.id);
    renderCPanel();
  }
  if (target.dataset.toggleUser) {
    const users = getCompanyUsers();
    const account = users.find((item) => item.email === target.dataset.toggleUser);
    if (account) { account.status = account.status === "Active" ? "Suspended" : "Active"; saveCompanyUsers(users); audit("TOGGLE_USER_STATUS", "user", account.email); renderCPanel(); }
  }
  if (target.dataset.toggleAdminUser) {
    const admins = getAdminUsers();
    const account = admins.find((item) => item.email === target.dataset.toggleAdminUser);
    if (account) { account.status = account.status === "Active" ? "Suspended" : "Active"; saveAdminUsers(admins); audit("TOGGLE_ADMIN_USER_STATUS", "admin_user", account.email); renderCPanel(); }
  }
  if (target.dataset.addOption) {
    const group = target.dataset.addOption;
    const input = document.querySelector(`[data-option-input="${group}"]`);
    const value = input.value.trim();
    if (value && !dropdownOptions[group].includes(value)) {
      dropdownOptions[group].push(value);
      saveDropdowns();
      audit("ADD_DROPDOWN_OPTION", "dropdown_options", group);
      renderCPanel();
      toast("Dropdown option added.");
    }
  }
});

document.querySelector(".cpanel").addEventListener("change", (event) => {
  if (!requireAdminSession("cpanel_change")) return;
  if (!event.target.dataset.orderStatus) return;
  const orders = getOrders();
  const order = orders.find((item) => item.id === event.target.dataset.orderStatus);
  if (!order) return;
  order.status = event.target.value;
  order.updated_at = new Date().toISOString();
  saveOrders(orders);
  audit("STATUS_CHANGED", "card_access_order", order.id);
  renderCPanel();
  toast("Order status updated.");
});

document.querySelectorAll("[data-back-services]").forEach((button) => button.addEventListener("click", () => showPage("services")));
document.querySelectorAll("[data-back-auth]").forEach((button) => button.addEventListener("click", () => showPage("auth")));
document.querySelectorAll(".journey-step").forEach((button, index) => button.addEventListener("click", () => { if (!button.classList.contains("locked")) showPage(steps[index]); }));

$("#effectiveDate").min = new Date().toISOString().slice(0, 10);
showPage("auth");
