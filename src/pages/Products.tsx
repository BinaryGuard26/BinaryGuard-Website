import Footer from '../components/Footer';

type Page = 'home' | 'about' | 'services' | 'products' | 'contact' | 'solutions';

interface ProductsProps {
  onNavigate: (page: Page) => void;
}

export default function Products({ onNavigate }: ProductsProps) {
  return (
    <div className="bg-slate-950 text-white min-h-screen flex flex-col">

      {/* Hero Section */}
      <section className="relative overflow-hidden py-24 px-6 border-b border-white/10">
        <div className="absolute inset-0">
          <img
            src="/Products.jpg"
            alt="Access Card Ordering Portal"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/90 to-slate-950" />
        </div>

        <div className="relative max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-start">

          <div>
            <p className="text-cyan-400 font-semibold mb-3 tracking-wide uppercase text-sm">
              Secure Product-Specific Ordering Portal
            </p>

            <h1 className="text-5xl font-bold leading-tight mb-6">
              Access Card Ordering Portal
            </h1>

            <p className="text-slate-300 leading-relaxed text-lg mb-8 max-w-2xl">
              A controlled, client-specific ordering system designed for organizations
              that require secure access card requests through approved corporate email
              verification, OTP authentication, backend validation, admin approval,
              cancellation workflow, and automated email status updates.
            </p>

            <div className="flex flex-wrap gap-4">
              <button className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold px-7 py-3 rounded-xl transition-all duration-300 shadow-lg shadow-cyan-500/20">
                Order Access Card
              </button>

              <button
                onClick={() => onNavigate('contact')}
                className="border border-white/20 hover:border-cyan-400 text-white hover:text-cyan-400 px-7 py-3 rounded-xl transition-all duration-300"
              >
                Contact Us
              </button>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-semibold">Authentication Workflow</h3>
              <span className="bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 px-3 py-1 rounded-full text-xs tracking-wide uppercase">
                Secure Flow
              </span>
            </div>

            <ol className="space-y-4 text-slate-300 list-decimal list-inside leading-relaxed">
              <li>User opens the direct product link such as <strong>/access-card</strong>.</li>
              <li>User enters their approved corporate email address.</li>
              <li>The system validates the approved domain such as <strong>gov.mb.ca</strong>.</li>
              <li>If approved, a secure OTP verification code is sent by email.</li>
              <li>After successful OTP verification, access is granted only to that specific product form.</li>
              <li>The verified email address is automatically populated and locked as read-only.</li>
              <li>The backend securely binds the order to the authenticated email address.</li>
              <li>Admin reviews, approves, rejects, or processes the request.</li>
              <li>Email notifications are automatically sent during each workflow stage.</li>
            </ol>
          </div>

        </div>
      </section>

      {/* Product Features */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-6">

          <div className="bg-white/5 border border-white/10 rounded-3xl p-8 hover:border-cyan-500/30 transition-all duration-300">
            <h3 className="text-2xl font-semibold mb-6 text-cyan-400">
              Order Form Fields
            </h3>

            <ul className="text-slate-300 space-y-3 leading-relaxed">
              <li>Verified Email (Read-Only)</li>
              <li>Full Name</li>
              <li>Designation</li>
              <li>Contact Number</li>
              <li>Site / Building</li>
              <li>PO Number</li>
              <li>Card Type</li>
              <li>Quantity</li>
              <li>Delivery Address</li>
              <li>Remarks / Special Instructions</li>
            </ul>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-3xl p-8 hover:border-cyan-500/30 transition-all duration-300">
            <h3 className="text-2xl font-semibold mb-6 text-cyan-400">
              Security Controls
            </h3>

            <ul className="text-slate-300 space-y-3 leading-relaxed">
              <li>Approved domain validation</li>
              <li>Passwordless OTP authentication</li>
              <li>Server-side email binding</li>
              <li>OTP expiry and resend limits</li>
              <li>Rate limiting protection</li>
              <li>Audit logging</li>
              <li>Role-based admin access</li>
              <li>Supabase Row Level Security</li>
              <li>HTTPS-only access</li>
              <li>Encrypted environment secrets</li>
              <li>No direct public database access</li>
            </ul>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-3xl p-8 hover:border-cyan-500/30 transition-all duration-300">
            <h3 className="text-2xl font-semibold mb-6 text-cyan-400">
              Order Cancellation Workflow
            </h3>

            <ul className="text-slate-300 space-y-3 leading-relaxed">
              <li>Unique cancellation link generated after submission</li>
              <li>Cancellation link included in confirmation email</li>
              <li>User must complete OTP verification again</li>
              <li>Email must match original authenticated submitter</li>
              <li>Only pending orders can be cancelled</li>
              <li>Approved or shipped orders cannot be cancelled</li>
              <li>Cancellation updates database status automatically</li>
              <li>User and admin receive cancellation notifications</li>
            </ul>
          </div>

        </div>
      </section>

      {/* Architecture Section */}
      <section className="py-20 px-6 border-t border-white/10 border-b border-white/10 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto">

          <div className="text-center max-w-4xl mx-auto mb-16">
            <p className="text-cyan-400 uppercase tracking-widest text-sm mb-3">
              Platform Architecture
            </p>

            <h2 className="text-4xl font-bold mb-6">
              Built for Secure Enterprise Ordering Workflows
            </h2>

            <p className="text-slate-300 leading-relaxed text-lg">
              Designed for DigitalOcean deployment today and portable enough for
              future migration to Proxmox, Docker, or Kubernetes-based infrastructure.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">

            <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
              <h3 className="text-2xl font-semibold mb-6 text-cyan-400">
                Infrastructure Components
              </h3>

              <ul className="space-y-4 text-slate-300 leading-relaxed">
                <li>
                  <strong className="text-white">Frontend:</strong> DigitalOcean App Platform hosting for public website and ordering portal.
                </li>

                <li>
                  <strong className="text-white">Backend API:</strong> Containerized Node.js API service using Docker.
                </li>

                <li>
                  <strong className="text-white">Database & Authentication:</strong> Self-hosted Supabase/PostgreSQL hosted on DigitalOcean Droplet.
                </li>

                <li>
                  <strong className="text-white">Container Registry:</strong> DigitalOcean Container Registry for secure backend image deployment.
                </li>

                <li>
                  <strong className="text-white">Future Growth:</strong> Kubernetes-ready architecture for scalable microservice deployment.
                </li>
              </ul>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
              <h3 className="text-2xl font-semibold mb-6 text-cyan-400">
                Product Isolation Design
              </h3>

              <ul className="space-y-4 text-slate-300 leading-relaxed">
                <li>Each product form operates as an isolated module or microservice.</li>
                <li>Shared authentication workflow across all product portals.</li>
                <li>Users can only access the specific form link assigned to them.</li>
                <li>No public browsing of products, clients, or unrelated orders.</li>
                <li>Each form supports separate workflows, fields, and approval rules.</li>
                <li>Dedicated database structure for secure multi-client separation.</li>
                <li>Role-based admin review and order management controls.</li>
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-20 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-6">
            Secure Enterprise Access Card Ordering
          </h2>

          <p className="text-slate-300 text-lg leading-relaxed mb-8">
            Built for organizations that require controlled ordering workflows,
            authenticated corporate access, secure backend validation, and scalable deployment architecture.
          </p>

          <button
            onClick={() => onNavigate('contact')}
            className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold px-8 py-4 rounded-2xl transition-all duration-300 shadow-lg shadow-cyan-500/20"
          >
            Request Demo
          </button>
        </div>
      </section>

      <Footer onNavigate={onNavigate} />
    </div>
  );
}
