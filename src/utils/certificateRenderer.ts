import type { jsPDF } from "jspdf";

export interface CertificateData {
  studentName: string;
  studentRegnumber: string;
  courseTitle: string;
  issueDate: string;
  grade: string;
  status: string;
}

/* ─────────────────────────────────────────────────────────
 * Pure jsPDF certificate renderer — Kerala University style.
 * Portrait A4, formal serif layout, ornate borders, wax seal.
 * ────────────────────────────────────────────────────────── */
export async function drawCertificatePage(
  pdf: jsPDF,
  cert: CertificateData
) {
  const W = pdf.internal.pageSize.getWidth();  // 595.28 pt (A4 portrait)
  const H = pdf.internal.pageSize.getHeight(); // 841.89 pt
  const cx = W / 2;

  // ── Background ──
  pdf.setFillColor(252, 251, 248);
  pdf.rect(0, 0, W, H, "F");

  // ── Outer border ──
  pdf.setDrawColor(30, 30, 30);
  pdf.setLineWidth(2.5);
  pdf.rect(20, 20, W - 40, H - 40);

  // ── Inner border ──
  pdf.setLineWidth(0.6);
  pdf.rect(28, 28, W - 56, H - 56);

  // ── Corner flourishes (L-shapes) ──
  const cLen = 18;
  const cOff = 34;
  pdf.setLineWidth(1.2);
  pdf.setDrawColor(30, 30, 30);
  pdf.line(cOff, cOff, cOff + cLen, cOff);
  pdf.line(cOff, cOff, cOff, cOff + cLen);
  pdf.line(W - cOff, cOff, W - cOff - cLen, cOff);
  pdf.line(W - cOff, cOff, W - cOff, cOff + cLen);
  pdf.line(cOff, H - cOff, cOff + cLen, H - cOff);
  pdf.line(cOff, H - cOff, cOff, H - cOff - cLen);
  pdf.line(W - cOff, H - cOff, W - cOff - cLen, H - cOff);
  pdf.line(W - cOff, H - cOff, W - cOff, H - cOff - cLen);

  // ── Register Number (top-left, italic) ──
  pdf.setFont("times", "italic");
  pdf.setFontSize(10);
  pdf.setTextColor(30, 30, 30);
  pdf.text("Register No :", 50, 58);
  pdf.setFont("times", "bold");
  pdf.text(` ${cert.studentRegnumber}`, 50 + pdf.getTextWidth("Register No :"), 58);

  // ── Small blue seal circle (top-right) ──
  const sealX = W - 70;
  const sealY = 68;
  pdf.setDrawColor(50, 100, 160);
  pdf.setLineWidth(1.2);
  pdf.circle(sealX, sealY, 20);
  pdf.setLineWidth(0.4);
  pdf.circle(sealX, sealY, 16);
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(5);
  pdf.setTextColor(50, 100, 160);
  pdf.text("CTS", sealX, sealY - 4, { align: "center" });
  pdf.text("CERTIFIED", sealX, sealY + 1, { align: "center" });
  pdf.text("INSTITUTE", sealX, sealY + 6, { align: "center" });

  // ── Ornamental header decoration ──
  const bannerY = 110;
  const bannerW = 340;
  const bannerH = 60;
  const bx = cx - bannerW / 2;

  pdf.setFillColor(20, 25, 20);
  pdf.roundedRect(bx, bannerY - bannerH / 2, bannerW, bannerH, 8, 8, "F");

  pdf.setDrawColor(180, 160, 120);
  pdf.setLineWidth(0.6);
  pdf.roundedRect(bx + 4, bannerY - bannerH / 2 + 4, bannerW - 8, bannerH - 8, 5, 5);

  pdf.setDrawColor(30, 30, 30);
  pdf.setLineWidth(1);
  pdf.line(bx - 30, bannerY, bx, bannerY);
  pdf.circle(bx - 34, bannerY, 3);
  pdf.line(bx + bannerW, bannerY, bx + bannerW + 30, bannerY);
  pdf.circle(bx + bannerW + 34, bannerY, 3);

  pdf.setFont("times", "bold");
  pdf.setFontSize(22);
  pdf.setTextColor(240, 235, 220);
  pdf.text("CREATIVE TAX SOLUTIONS", cx, bannerY + 2, { align: "center" });

  // ── Affiliation text ──
  pdf.setFont("times", "italic");
  pdf.setFontSize(8);
  pdf.setTextColor(80, 80, 80);
  pdf.text("Affiliated with", cx, bannerY + 45, { align: "center" });
  pdf.setFont("times", "bold");
  pdf.setFontSize(8.5);
  pdf.setTextColor(30, 30, 30);
  pdf.text("World Human Resource Development (WHRDE)", cx, bannerY + 56, { align: "center" });

  // ── Horizontal rules ──
  pdf.setDrawColor(30, 30, 30);
  pdf.setLineWidth(0.8);
  pdf.line(60, bannerY + 72, W - 60, bannerY + 72);
  pdf.setLineWidth(0.3);
  pdf.line(60, bannerY + 75, W - 60, bannerY + 75);

  // ── Department Title ──
  const facY = bannerY + 100;
  pdf.setFont("times", "bold");
  pdf.setFontSize(17);
  pdf.setTextColor(20, 20, 20);
  pdf.text("BOARD OF PROFESSIONAL EDUCATION", cx, facY, { align: "center" });

  // ── Certificate body text ──
  const bodyStartY = facY + 45;
  const leftM = 65;
  const rightM = W - 65;
  const textW = rightM - leftM;
  let curY = bodyStartY;
  const lineH = 20;

  pdf.setFont("times", "italic");
  pdf.setFontSize(13);
  pdf.setTextColor(40, 40, 40);
  pdf.text("The Board of Creative Tax Solutions hereby makes known that", cx, curY, { align: "center" });
  curY += lineH + 8;

  // Student name
  pdf.setFont("times", "bolditalic");
  pdf.setFontSize(22);
  pdf.setTextColor(20, 20, 20);
  pdf.text(cert.studentName, cx, curY, { align: "center" });
  const nameW = pdf.getTextWidth(cert.studentName);
  pdf.setDrawColor(30, 30, 30);
  pdf.setLineWidth(0.6);
  pdf.line(cx - nameW / 2, curY + 4, cx + nameW / 2, curY + 4);
  curY += lineH + 12;

  pdf.setFont("times", "italic");
  pdf.setFontSize(13);
  pdf.setTextColor(40, 40, 40);
  pdf.text("has been admitted to the Professional Certification in", cx, curY, { align: "center" });
  curY += lineH + 4;

  // Course title
  pdf.setFont("times", "bold");
  pdf.setFontSize(17);
  pdf.setTextColor(20, 20, 20);
  pdf.text(cert.courseTitle, cx, curY, { align: "center" });
  curY += lineH + 10;

  // Closing paragraph
  pdf.setFont("times", "italic");
  pdf.setFontSize(12);
  pdf.setTextColor(40, 40, 40);
  const closingText = `he/she having been certified by duly appointed Examiners to be qualified to receive the same and having been by them placed in the`;
  const closingLines = pdf.splitTextToSize(closingText, textW);
  pdf.text(closingLines, cx, curY, { align: "center" });
  curY += closingLines.length * 16 + 4;

  // Grade
  pdf.setFont("times", "bold");
  pdf.setFontSize(16);
  pdf.setTextColor(20, 20, 20);
  pdf.text(cert.grade, cx, curY, { align: "center" });
  const gradeW = pdf.getTextWidth(cert.grade);
  pdf.setLineWidth(0.5);
  pdf.line(cx - gradeW / 2 - 4, curY + 3, cx + gradeW / 2 + 4, curY + 3);
  curY += 20;

  // Format date
  const issueParts = cert.issueDate.split("-");
  let formattedDate = cert.issueDate;
  if (issueParts.length === 3) {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const monthIdx = parseInt(issueParts[1], 10) - 1;
    formattedDate = `${months[monthIdx] || issueParts[1]} ${parseInt(issueParts[2], 10)}, ${issueParts[0]}`;
  }

  pdf.setFont("times", "italic");
  pdf.setFontSize(12);
  pdf.setTextColor(40, 40, 40);
  pdf.text("at the Examination held in", cx, curY, { align: "center" });
  curY += 18;
  pdf.setFont("times", "bold");
  pdf.setFontSize(13);
  pdf.text(`${formattedDate}.`, cx, curY, { align: "center" });

  // ── "Given under the seal" ──
  const sealTextY = H - 200;
  pdf.setFont("times", "italic");
  pdf.setFontSize(10);
  pdf.setTextColor(60, 60, 60);
  pdf.text("Given under the seal of the Institute", cx, sealTextY, { align: "center" });

  // ── Red wax seal ──
  const waxY = H - 155;
  pdf.setDrawColor(160, 30, 30);
  pdf.setFillColor(250, 245, 240);
  pdf.setLineWidth(2);
  pdf.circle(cx, waxY, 32, "FD");
  pdf.setLineWidth(0.5);
  pdf.setLineDashPattern([2, 2], 0);
  pdf.circle(cx, waxY, 26);
  pdf.setLineDashPattern([], 0);
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(10);
  pdf.setTextColor(160, 30, 30);
  pdf.text("CTS", cx, waxY - 7, { align: "center" });
  pdf.setFontSize(6.5);
  pdf.text("CREATIVE TAX", cx, waxY + 1, { align: "center" });
  pdf.text("SOLUTIONS", cx, waxY + 8, { align: "center" });
  pdf.setFontSize(5);
  pdf.text("SEAL", cx, waxY + 15, { align: "center" });

  // ── Bottom: Location + Date (left) / Signature (right) ──
  const bottomY = H - 85;

  pdf.setFont("times", "italic");
  pdf.setFontSize(9);
  pdf.setTextColor(40, 40, 40);
  pdf.text("Training Center", 55, bottomY);
  pdf.text("Kochi, Kerala", 55, bottomY + 14);
  pdf.setFont("times", "bold");
  pdf.setFontSize(9);
  pdf.text(formattedDate, 55, bottomY + 28);

  const sigX = W - 55;
  pdf.setDrawColor(60, 60, 60);
  pdf.setLineWidth(0.4);
  pdf.line(sigX - 110, bottomY - 2, sigX, bottomY - 2);
  pdf.setFont("times", "italic");
  pdf.setFontSize(12);
  pdf.setTextColor(40, 40, 40);
  pdf.text("Advai Prakash", sigX - 55, bottomY + 14, { align: "center" });
  pdf.setFont("times", "normal");
  pdf.setFontSize(9);
  pdf.setTextColor(80, 80, 80);
  pdf.text("Director", sigX - 55, bottomY + 28, { align: "center" });
}
