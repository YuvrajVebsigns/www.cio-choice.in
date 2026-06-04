import fs from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

export async function GET() {
  const candidates = [
    path.join(process.cwd(), 'public', 'download-report.pdf'),
    path.join(process.cwd(), 'public', 'assets', 'Survey', 'download-report.pdf'),
    path.join(process.cwd(), 'reports', 'download-report.pdf'),
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
