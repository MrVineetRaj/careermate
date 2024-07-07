import { NextResponse } from "next/server";
import puppeteer from "puppeteer";
// import puppeteerCore from "puppeteer-core";
// import chromium from "@sparticuz/chromium";

export async function POST(request: Request) {
  const reqObj = await request.json();

  try {
    let browser;

    browser = await puppeteer.launch({
      headless: false,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
      executablePath: puppeteer.executablePath(),
    });

    // browser = await puppeteerCore.launch({
    //   args: chromium.args,
    //   defaultViewport: chromium.defaultViewport,
    //   executablePath: await chromium.executablePath(),
    //   headless: chromium.headless,
    // });

    const page = await browser.newPage();

    await page.goto(
      `${process.env.NEXT_PUBLIC_BASE_URL}/share?r=${reqObj.r}&u=${reqObj.u}`,
      {
        waitUntil: "networkidle0",
      }
    );

    // Capture the PDF in memory
    await page.setViewport({ width: 595, height: 842 });
    const pdfBuffer = await page.pdf({ format: "A4", printBackground: true });

    await browser.close();

    // Set response headers to indicate a file attachment
    const responseHeaders = new Headers();
    responseHeaders.set("Content-Type", "application/pdf");
    responseHeaders.set(
      "Content-Disposition",
      `attachment; filename="${reqObj.f} "`
    );

    // Return the PDF buffer as a response
    return new NextResponse(pdfBuffer, { headers: responseHeaders });
  } catch (error: any) {
    console.error("Error generating PDF:", error.message);
    return NextResponse.json({ success: false, error: error.message });
  }
}
