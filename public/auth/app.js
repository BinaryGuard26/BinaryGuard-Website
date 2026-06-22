const tenant = {
  id: "tenant-gov-mb", name: "Government of Manitoba", active: true,
  services: { access_card_ordering: true },
  allowedRoles: ["tenant_user", "manager", "security_admin"],
  processingEmail: "support@binaryguard.ca"
};
const user = { id: "usr-1042", name: "John Smith", email: "john.smith@gov.mb.ca", role: "tenant_user", authenticated: false, otpVerified: false };
const dropdownOptions = {
  request_type: ["New Card", "Replacement Card", "Temporary Card", "Cancel Card", "Access Change"],
  access_level: ["Standard Access", "Manager Access", "Restricted Area Access"],
  site: ["Winnipeg Central Office", "Brandon Regional Office", "Thompson Service Centre"],
  building: ["Government Administration Building", "Norquay Building", "Woodsworth Building"]
};
const pages = ["auth","otp","services","checking","denied","order","success"];
const steps = ["auth","otp","services","order"];
let referenceSequence = Number(localStorage.getItem("bg-reference-sequence") || 145);
let auditLogs = JSON.parse(localStorage.getItem("bg-audit-logs") || "[]");
const $ = (selector) => document.querySelector(selector);

function showPage(name) {
  pages.forEach(key => $(`#${key}Page`)?.classList.toggle("active", key === name));
  const titles = {auth:["SECURE ACCESS","Welcome to BinaryGuard"],otp:["IDENTITY VERIFICATION","Enter your security code"],services:["CLIENT PORTAL","Authorized services"],checking:["SERVICE AUTHORIZATION","Checking access"],denied:["SERVICE AUTHORIZATION","Access denied"],order:["SECURE ORDERING","Access Card Ordering"],success:["REQUEST CONFIRMATION","Order submitted"]};
  $("#eyebrow").textContent = titles[name][0]; $("#pageTitle").textContent = titles[name][1];
  updateJourney(name); window.scrollTo({top:0,behavior:"smooth"});
}
function updateJourney(page) {
  const activeStep = page === "checking" || page === "denied" ? "services" : page === "success" ? "order" : page;
  const activeIndex = steps.indexOf(activeStep);
  document.querySelectorAll(".journey-step").forEach((el,i) => {
    el.classList.toggle("active", i === activeIndex); el.classList.toggle("done", i < activeIndex); el.classList.toggle("locked", i > activeIndex);
    el.querySelector("i").textContent = i < activeIndex ? "✓" : i + 1;
  });
}
function status(text, ok=false){$("#statusBadge").innerHTML=`<i></i> ${text}`;$("#statusBadge").classList.toggle("ok",ok)}
function toast(message){const el=$("#toast");el.textContent=message;el.classList.add("show");clearTimeout(el.timer);el.timer=setTimeout(()=>el.classList.remove("show"),2800)}
function audit(action, entityType="session", entityId=user.id) {
  auditLogs.unshift({actor_user_id:user.id,action,entity_type:entityType,entity_id:entityId,timestamp:new Date().toISOString(),ip_address:"Captured server-side"});
  localStorage.setItem("bg-audit-logs",JSON.stringify(auditLogs.slice(0,100)));
}
function loadTenantOptions(){document.querySelectorAll("select[data-options]").forEach(select=>{select.innerHTML=`<option value="">Select an option</option>`+dropdownOptions[select.dataset.options].map(v=>`<option>${v}</option>`).join("")})}
function authorizeService(){return [user.authenticated,user.otpVerified,tenant.active,tenant.services.access_card_ordering,tenant.allowedRoles.includes(user.role)].every(Boolean)}
function resetSession(){user.authenticated=false;user.otpVerified=false;$("#sessionInfo").hidden=true;status("Not verified");audit("LOGOUT");showPage("auth")}

$("#loginForm").addEventListener("submit",e=>{e.preventDefault();const email=$("#email").value.trim().toLowerCase();if(!email.endsWith("@gov.mb.ca")){toast("This email domain is not approved for portal access.");audit("LOGIN_DENIED");return}user.email=email;user.authenticated=true;$("#otpEmail").textContent=email;audit("LOGIN_ACCEPTED");status("OTP required");showPage("otp")});
$("#otpForm").addEventListener("submit",e=>{e.preventDefault();if($("#otpCode").value!=="248106"){toast("That code is incorrect. Please try again.");audit("OTP_FAILED");return}user.otpVerified=true;$("#sessionInfo").hidden=false;status("Verified",true);audit("OTP_VERIFIED");showPage("services")});
$("#openServiceBtn").addEventListener("click",()=>{showPage("checking");audit("SERVICE_AUTHORIZATION_STARTED","tenant_service","access_card_ordering");const items=[...document.querySelectorAll("#checkList li")];items.forEach(x=>x.classList.remove("checked"));items.forEach((item,i)=>setTimeout(()=>item.classList.add("checked"),350*(i+1)));setTimeout(()=>{if(authorizeService()){loadTenantOptions();audit("SERVICE_AUTHORIZED","tenant_service","access_card_ordering");showPage("order")}else{audit("SERVICE_ACCESS_DENIED","tenant_service","access_card_ordering");showPage("denied")}},1900)});
$("#orderForm").addEventListener("submit",e=>{e.preventDefault();const id=crypto.randomUUID();const reference=`ACO-${new Date().getFullYear()}-${String(referenceSequence++).padStart(6,"0")}`;localStorage.setItem("bg-reference-sequence",referenceSequence);const order={id,reference,tenant_id:tenant.id,submitted_by_user_id:user.id,cardholder_name:$("#cardholderName").value,cardholder_email:$("#cardholderEmail").value,employee_id:$("#employeeId").value,department:$("#department").value,site_name:$("#site").value,building_address:$("#building").value,floor:$("#floor").value,request_type:$("#requestType").value,access_level:$("#accessLevel").value,effective_date:$("#effectiveDate").value,expiry_date:$("#expiryDate").value||null,notes:$("#notes").value,status:"Submitted",created_at:new Date().toISOString()};const orders=JSON.parse(localStorage.getItem("bg-card-access-orders")||"[]");orders.unshift(order);localStorage.setItem("bg-card-access-orders",JSON.stringify(orders));audit("CREATE_ORDER","card_access_order",id);audit("CONFIRMATION_EMAIL_QUEUED","card_access_order",id);audit("STAFF_NOTIFICATION_QUEUED","card_access_order",id);$("#referenceNumber").textContent=reference;showPage("success")});
$("#newOrderBtn").addEventListener("click",()=>{$("#orderForm").reset();loadTenantOptions();showPage("order")});
$("#printBtn").addEventListener("click",()=>window.print());
$("#logoutBtn").addEventListener("click",resetSession);
document.querySelectorAll("[data-back-services]").forEach(b=>b.addEventListener("click",()=>showPage("services")));
document.querySelectorAll(".journey-step").forEach((button,i)=>button.addEventListener("click",()=>{if(!button.classList.contains("locked"))showPage(steps[i])}));
$("#effectiveDate").min=new Date().toISOString().slice(0,10);
showPage("auth");
