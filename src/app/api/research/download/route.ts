import fs from 'fs';
import { NextResponse } from 'next/server';

export async function GET() {
  const cwd = process.cwd();
  const candidates = [
    `${cwd}/public/download-report.pdf`,
    `${cwd}/public/assets/Survey/download-report.pdf`,
    `${cwd}/reports/download-report.pdf`,
  ];

  for (const p of candidates) {
    try {
      if (fs.existsSync(p)) {
        const buffer = fs.readFileSync(p);
        return new NextResponse(buffer, {
          status: 200,
          headers: {
            'Content-Type': 'application/pdf',
            'Content-Length': String(buffer.length),
            'Content-Disposition': 'attachment; filename="Business-Pulse-Report.pdf"',
          },
        });
      }
    } catch (e) {
      // ignore and try next candidate
    }
  }

  return NextResponse.json({ error: 'Report not found on server' }, { status: 404 });
}
