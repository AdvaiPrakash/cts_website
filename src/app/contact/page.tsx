import { SiteShell } from "@/components/SiteShell";
import { Reveal } from "@/components/Reveal";

export default function ContactPage() {
  return (
    <SiteShell>
      <section className="relative min-h-screen pt-36 px-6 pb-24 overflow-hidden">
        <div className="absolute inset-0 ambient-glow pointer-events-none" />
        <div className="max-w-4xl mx-auto space-y-12 relative z-10">
          <div className="space-y-4 text-center">
            <Reveal direction="down">
              <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                Contact
              </span>
            </Reveal>
            <Reveal direction="up">
              <h1 className="text-4xl sm:text-5xl font-display font-bold text-gradient">
                Get In Touch
              </h1>
            </Reveal>
            <Reveal direction="up" delay={0.1}>
              <p className="text-text-muted max-w-lg mx-auto">
                Have questions about our tax strategy and advisory services? Drop us a line below or schedule a strategy consultation.
              </p>
            </Reveal>
          </div>

          <div className="grid md:grid-cols-5 gap-12 pt-8">
            {/* Info */}
            <div className="md:col-span-2 space-y-8">
              <Reveal direction="left" delay={0.2}>
                <div className="space-y-2">
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-primary">
                    Headquarters
                  </h3>
                  <p className="text-text-light/95 leading-relaxed text-sm">
                    100 Financial Plaza, Suite 400<br />
                    New York, NY 10005
                  </p>
                </div>
              </Reveal>

              <Reveal direction="left" delay={0.3}>
                <div className="space-y-2">
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-primary">
                    Direct Inquiry
                  </h3>
                  <p className="text-text-light/95 text-sm">
                    Email: info@cts-tax.com<br />
                    Phone: +1 (555) 019-2834
                  </p>
                </div>
              </Reveal>
            </div>

            {/* Quick Form */}
            <div className="md:col-span-3">
              <Reveal direction="right" delay={0.2}>
                <div className="p-8 rounded-2xl bg-bg-card border border-border-subtle space-y-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-medium text-text-muted uppercase tracking-wider mb-2">
                        Message
                      </label>
                      <textarea
                        rows={4}
                        placeholder="How can we help you?"
                        className="w-full px-4 py-3 rounded-lg bg-bg-dark border border-border-subtle text-text-light placeholder-text-muted/50 focus:outline-none focus:border-primary transition-colors text-sm resize-none"
                      />
                    </div>
                  </div>
                  <button
                    type="button"
                    className="w-full py-3 rounded-lg bg-primary hover:bg-primary-hover text-bg-dark font-medium text-sm transition-all shadow-md hover:shadow-primary/25 cursor-pointer text-center"
                  >
                    Send Message
                  </button>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
