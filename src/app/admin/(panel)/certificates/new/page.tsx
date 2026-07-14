import { CertificateForm } from "@/components/admin/certificates/CertificateForm";
import Link from "next/link";

export default function NewCertificatePage() {
  return (
    <div className="space-y-6 text-left">
      <div className="mb-4">
        <Link
          href="/admin/certificates"
          className="inline-flex items-center gap-1.5 text-xs text-text-page/60 hover:text-text-page font-bold transition-colors"
        >
          <span>←</span>
          <span>Back to Certificates</span>
        </Link>
      </div>

      <CertificateForm />
    </div>
  );
}
