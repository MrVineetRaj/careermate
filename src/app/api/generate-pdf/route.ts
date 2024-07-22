import { NextResponse } from "next/server";
// import puppeteer from "puppeteer";
import chromium from "@sparticuz/chromium";
import puppeteer from "puppeteer-core";


export async function POST(request: Request) {
  const reqObj = await request.json();

  try {
    // const browser = await puppeteer.launch({
    //   headless: true,
    //   args: ["--no-sandbox", "--disable-setuid-sandbox"],
    //   executablePath: puppeteer.executablePath(), // Ensure Puppeteer uses the bundled Chromium
    // });

    const browser = await puppeteer.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath(),
      headless: chromium.headless,
    });

    // console.log("Chromium executable path:",await chromium.executablePath());
    // const browser = await puppeteer.launch({
    //   args: chromium.args,
    //   defaultViewport: chromium.defaultViewport,
    //   executablePath: await chromium.executablePath(),
    //   headless: chromium.headless,
    //   ignoreHTTPSErrors: true,
    // });

    const page = await browser.newPage();

    await page.goto(
      `${process.env.NEXT_PUBLIC_BASE_URL}/share/resume?r=${reqObj.r}&u=${reqObj.u}`,
      {
        waitUntil: "networkidle0",
      }
    );

    // Capture the PDF in memory
    await page.setViewport({ width: 595, height: 842 });
    const pdfBuffer = await page.pdf({ format: "a4", printBackground: true });

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
