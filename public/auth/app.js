const screens={tenant:document.querySelector("#tenantScreen"),otp:document.querySelector("#otpScreen"),services:document.querySelector("#servicesScreen"),admin:document.querySelector("#adminScreen")};
const titles={tenant:"Tenant Authentication",otp:"OTP Verification",services:"Service Authorization",admin:"Admin Authorization"};
const state={tenantVerified:false,otpVerified:false,authorized:false,email:"user@gov.mb.ca",domain:"",otp:"248106",otpAttempts:0,maxOtpAttempts:3,adminAuthRequired:true};
const approvedDomains=["gov.mb.ca"];
const screenTitle=document.querySelector("#screenTitle");
const statusPill=document.querySelector("#statusPill");
const auditLog=document.querySelector("#auditLog");
const flowButtons=document.querySelectorAll(".flow-step");
const tenantBtn=document.querySelector("#tenantBtn");
const verifyBtn=document.querySelector("#verifyBtn");
const openServiceBtn=document.querySelector("#openServiceBtn");
const adminLoginBtn=document.querySelector("#adminLoginBtn");
const clearLogBtn=document.querySelector("#clearLogBtn");
const domainRule=document.querySelector("#domainRule");
function showScreen(name){Object.entries(screens).forEach(([key,screen])=>{screen.classList.toggle("active",key===name)});flowButtons.forEach((button)=>{button.classList.toggle("active",button.dataset.flow===name)});screenTitle.textContent=titles[name]}
function log(message){const item=document.createElement("li");const time=new Date().toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"});item.textContent=`${time} - ${message}`;auditLog.prepend(item)}
function toast(message){document.querySelector(".toast")?.remove();const node=document.createElement("div");node.className="toast";node.textContent=message;document.body.append(node);window.setTimeout(()=>node.remove(),2800)}
function updateStatus(){if(state.authorized){statusPill.textContent="Authorized";statusPill.classList.add("ok");return}statusPill.textContent="Awaiting Verification";statusPill.classList.remove("ok")}
function getDomain(email){return email.split("@")[1]?.trim().toLowerCase()||""}
function isApprovedDomain(email){return approvedDomains.includes(getDomain(email))}
function mfaCode(){return[...document.querySelectorAll("#codeInputs input")].map((input)=>input.value).join("")}
flowButtons.forEach((button)=>{button.addEventListener("click",()=>showScreen(button.dataset.flow))});
document.querySelectorAll("#codeInputs input").forEach((input,index,list)=>{input.addEventListener("input",()=>{input.value=input.value.replace(/\D/g,"").slice(0,1);if(input.value&&list[index+1])list[index+1].focus()})});
tenantBtn.addEventListener("click",()=>{const email=document.querySelector("#corporateEmail").value.trim().toLowerCase();if(!email.includes("@")){toast("Enter a valid corporate email address.");log("Tenant authentication stopped because email format was invalid.");return}if(!isApprovedDomain(email)){domainRule.classList.remove("pass");toast("Corporate domain not authorized.");log(`Unauthorized domain attempted: ${email}`);return}state.email=email;state.domain=getDomain(email);state.tenantVerified=true;domainRule.classList.add("pass");toast("Corporate domain approved. OTP issued.");log(`Tenant authenticated for approved domain: ${state.domain}.`);log("Short-lived OTP generated and sent to approved corporate email.");showScreen("otp")});
verifyBtn.addEventListener("click",()=>{if(!state.tenantVerified){toast("Complete tenant authentication first.");showScreen("tenant");return}state.otpAttempts+=1;if(state.otpAttempts>state.maxOtpAttempts){toast("OTP attempt limit exceeded.");log("OTP verification blocked after too many attempts.");return}if(mfaCode()!==state.otp){toast("Invalid verification code.");log(`OTP verification failed. Attempt ${state.otpAttempts} of ${state.maxOtpAttempts}.`);return}state.otpVerified=true;state.authorized=true;updateStatus();toast("OTP verified. Service authorization completed.");log("OTP verified; code invalidated after successful verification.");log("Service authorization completed for Card Access Ordering.");showScreen("services")});
openServiceBtn.addEventListener("click",()=>{if(!state.authorized){toast("Authorization required before opening services.");showScreen("tenant");return}toast("Opening Card Access Ordering.");log("Authorized user opened Card Access Ordering service. Camera Ordering, Quote Request, and Service Request remain Coming Soon.")});
adminLoginBtn.addEventListener("click",()=>{toast("Admin login requires stronger authentication.");log("Admin access requested. Email OTP alone is not sufficient for management access.")});
clearLogBtn.addEventListener("click",()=>{auditLog.innerHTML=""});
updateStatus();log("Secure Client Gateway loaded.");log("Waiting for tenant authentication.");
