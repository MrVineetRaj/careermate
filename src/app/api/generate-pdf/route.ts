import { NextResponse } from 'next/server';
import { chromium } from 'playwright';

export async function POST(request: Request) {
  const reqObj = await request.json();

  try {
    const browser = await chromium.launch({
      headless: true,
    });

    const page = await browser.newPage();

    await page.goto(
      `${process.env.NEXT_PUBLIC_BASE_URL}/share/resume?r=${reqObj.r}&u=${reqObj.u}`,
      {
        waitUntil: 'networkidle',
      }
    );

    await page.setViewportSize({ width: 595, height: 842 });
    const pdfBuffer = await page.pdf({ format: 'A4', printBackground: true });

    await browser.close();

    const responseHeaders = new Headers();
    responseHeaders.set('Content-Type', 'application/pdf');
    responseHeaders.set('Content-Disposition', `attachment; filename="${reqObj.f}.pdf"`);

    return new NextResponse(pdfBuffer, { headers: responseHeaders });

  } catch (error: any) {
    console.error('Error generating PDF:', error.message);
    return NextResponse.json({ success: false, error: error.message });
  }
}
