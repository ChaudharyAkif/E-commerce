// pdfGenerator.js
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';

// Design System Constants
const DESIGN = {
  colors: {
    primary: rgb(0.16, 0.37, 0.64),
    secondary: rgb(0.46, 0.46, 0.46),
    accent: rgb(0.82, 0.24, 0.27),
    dark: rgb(0.2, 0.2, 0.2),
    light: rgb(0.96, 0.96, 0.96),
    success: rgb(0.22, 0.62, 0.38)
  },
  typography: {
    fontSizes: {
      xxl: 28,
      xl: 22,
      lg: 18,
      md: 14,
      sm: 12,
      xs: 10
    },
    lineHeights: {
      normal: 1.4,
      tight: 1.2
    }
  },
  spacing: {
    pageMargins: 48,
    sectionGap: 32,
    elementGap: 16,
    paragraphGap: 8
  },
  dimensions: {
    pageWidth: 595,
    pageHeight: 842
  }
};

async function fetchImageBytes(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.arrayBuffer();
  } catch (error) {
    console.error('Failed to fetch image:', error);
    throw new Error('Could not load company logo');
  }
}

function formatCurrency(amount) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  }).format(amount || 0);
}

function formatDate(dateString, format = 'medium') {
  if (!dateString) return 'N/A';
  
  const options = {
    short: { year: 'numeric', month: 'short', day: 'numeric' },
    medium: { year: 'numeric', month: 'long', day: 'numeric' },
    long: { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
  }[format];

  return new Date(dateString).toLocaleDateString('en-US', options);
}

function drawBadge(page, text, x, y, color, font) {
  const textWidth = font.widthOfTextAtSize(text, DESIGN.typography.fontSizes.xs);
  const padding = 8;
  const badgeWidth = textWidth + padding * 2;
  const badgeHeight = 20;

  // Draw badge background (standard rectangle)
  page.drawRectangle({
    x,
    y: y - badgeHeight,
    width: badgeWidth,
    height: badgeHeight,
    color,
    opacity: 0.15,
    borderColor: color,
    borderWidth: 1
  });

  // Draw badge text
  page.drawText(text, {
    x: x + padding,
    y: y - badgeHeight + 5,
    size: DESIGN.typography.fontSizes.xs,
    font,
    color
  });

  return badgeHeight + DESIGN.spacing.elementGap;
}

async function generateInvoicePDF(invoiceData = {}) {
  try {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([DESIGN.dimensions.pageWidth, DESIGN.dimensions.pageHeight]);
    const { width } = page.getSize();
    
    const [fontRegular, fontBold] = await Promise.all([
      pdfDoc.embedFont(StandardFonts.Helvetica),
      pdfDoc.embedFont(StandardFonts.HelveticaBold)
    ]);

    let y = DESIGN.dimensions.pageHeight - DESIGN.spacing.pageMargins;

    // Header Section
    if (invoiceData.logoUrl) {
      try {
        const logoBytes = await fetchImageBytes(invoiceData.logoUrl);
        const logoImage = await pdfDoc.embedPng(logoBytes);
        const logoAspectRatio = logoImage.width / logoImage.height;
        const logoHeight = 48;
        
        page.drawImage(logoImage, {
          x: DESIGN.spacing.pageMargins,
          y: y - logoHeight,
          width: logoHeight * logoAspectRatio,
          height: logoHeight
        });
      } catch (err) {
        console.warn("Logo could not be loaded:", err.message);
      }
    }

    // Invoice header
    page.drawText('Akif', {
      x: width - DESIGN.spacing.pageMargins - 120,
      y: y - 10,
      size: DESIGN.typography.fontSizes.xxl,
      font: fontBold,
      color: DESIGN.colors.primary
    });

    // Invoice metadata
    const metaData = [
      { label: 'Akif #', value: invoiceData.id || 'N/A' },
      { label: 'Date', value: formatDate(invoiceData.created_at, 'medium') },
      { label: 'Due Date', value: formatDate(invoiceData.due_date, 'medium') || 'Upon receipt' }
    ];

    let metaY = y - 40;
    metaData.forEach(({ label, value }) => {
      page.drawText(`${label}:`, {
        x: width - DESIGN.spacing.pageMargins - 120,
        y: metaY,
        size: DESIGN.typography.fontSizes.sm,
        font: fontBold,
        color: DESIGN.colors.secondary
      });

      page.drawText(value, {
        x: width - DESIGN.spacing.pageMargins - 40,
        y: metaY,
        size: DESIGN.typography.fontSizes.sm,
        font: fontRegular,
        color: DESIGN.colors.dark
      });

      metaY -= DESIGN.typography.fontSizes.sm * DESIGN.typography.lineHeights.normal;
    });

    y = y - 80;

    // Status badge
    if (invoiceData.status) {
      const statusColor = invoiceData.status.toLowerCase() === 'paid' 
        ? DESIGN.colors.success 
        : DESIGN.colors.accent;
      
      y -= drawBadge(
        page, 
        invoiceData.status.toUpperCase(), 
        DESIGN.spacing.pageMargins, 
        y, 
        statusColor, 
        fontBold
      );
    }

    // Divider line
    page.drawLine({
      start: { x: DESIGN.spacing.pageMargins, y },
      end: { x: width - DESIGN.spacing.pageMargins, y },
      thickness: 1,
      color: DESIGN.colors.secondary,
      opacity: 0.3
    });
    y -= DESIGN.spacing.sectionGap;

    // Two-column layout
    const columnWidth = (width - DESIGN.spacing.pageMargins * 2 - DESIGN.spacing.elementGap) / 2;

    // From Section
    page.drawText('From:', {
      x: DESIGN.spacing.pageMargins,
      y,
      size: DESIGN.typography.fontSizes.lg,
      font: fontBold,
      color: DESIGN.colors.primary
    });
    y -= DESIGN.typography.fontSizes.lg * DESIGN.typography.lineHeights.tight;

    const companyInfo = [
      invoiceData.company?.name || 'Muhammad Akif Hussain Company',
      invoiceData.company?.address?.line1,
      invoiceData.company?.address?.line2,
      `${invoiceData.company?.address?.city || ''}, ${invoiceData.company?.address?.state || ''} ${invoiceData.company?.address?.postal_code || ''}`,
      invoiceData.company?.address?.country,
      `Tax ID: ${invoiceData.company?.tax_id || '7418965'}`,
      `Email: ${invoiceData.company?.email || 'makifhussainmn.com'}`,
      `Phone: ${invoiceData.company?.phone || '+923013200651'}`
    ].filter(Boolean);

    companyInfo.forEach(line => {
      page.drawText(line, {
        x: DESIGN.spacing.pageMargins,
        y,
        size: DESIGN.typography.fontSizes.sm,
        font: fontRegular,
        color: DESIGN.colors.dark
      });
      y -= DESIGN.typography.fontSizes.sm * DESIGN.typography.lineHeights.normal;
    });

    // To Section
    let customerY = y + (companyInfo.length * DESIGN.typography.fontSizes.sm * DESIGN.typography.lineHeights.normal) + DESIGN.typography.fontSizes.lg * DESIGN.typography.lineHeights.tight;
    
    page.drawText('Bill To:', {
      x: DESIGN.spacing.pageMargins + columnWidth + DESIGN.spacing.elementGap,
      y: customerY,
      size: DESIGN.typography.fontSizes.lg,
      font: fontBold,
      color: DESIGN.colors.primary
    });
    customerY -= DESIGN.typography.fontSizes.lg * DESIGN.typography.lineHeights.tight;

    const customerAddress = invoiceData.shipping_address || {};
    const customerInfo = [
      customerAddress.name || invoiceData.user_email || 'Customer',
      customerAddress.line1,
      customerAddress.line2,
      `${customerAddress.city || ''}, ${customerAddress.state || ''} ${customerAddress.postal_code || ''}`,
      customerAddress.country,
      `Email: ${invoiceData.user_email || 'N/A'}`
    ].filter(Boolean);

    customerInfo.forEach(line => {
      page.drawText(line, {
        x: DESIGN.spacing.pageMargins + columnWidth + DESIGN.spacing.elementGap,
        y: customerY,
        size: DESIGN.typography.fontSizes.sm,
        font: fontRegular,
        color: DESIGN.colors.dark
      });
      customerY -= DESIGN.typography.fontSizes.sm * DESIGN.typography.lineHeights.normal;
    });

    y -= DESIGN.spacing.sectionGap * 1.5;

    // Items Table
    page.drawText('Items', {
      x: DESIGN.spacing.pageMargins,
      y,
      size: DESIGN.typography.fontSizes.lg,
      font: fontBold,
      color: DESIGN.colors.primary
    });
    y -= DESIGN.typography.fontSizes.lg * DESIGN.typography.lineHeights.tight + DESIGN.spacing.elementGap;

    // Table Header
    const tableY = y;
    const tableWidth = width - DESIGN.spacing.pageMargins * 2;
    const columnWidths = {
      description: tableWidth * 0.5,
      quantity: tableWidth * 0.1,
      price: tableWidth * 0.2,
      total: tableWidth * 0.2
    };

    // Draw table header background
    page.drawRectangle({
      x: DESIGN.spacing.pageMargins,
      y: tableY - 24,
      width: tableWidth,
      height: 28,
      color: DESIGN.colors.primary,
      opacity: 0.1,
      borderColor: DESIGN.colors.primary,
      borderWidth: 1
    });

    // Table column headers
    const headers = [
      { text: 'Description', x: DESIGN.spacing.pageMargins + 8 },
      { text: 'Qty', x: DESIGN.spacing.pageMargins + columnWidths.description },
      { text: 'Unit Price', x: DESIGN.spacing.pageMargins + columnWidths.description + columnWidths.quantity },
      { text: 'Amount', x: DESIGN.spacing.pageMargins + columnWidths.description + columnWidths.quantity + columnWidths.price }
    ];

    headers.forEach(header => {
      page.drawText(header.text, {
        x: header.x,
        y: tableY - 18,
        size: DESIGN.typography.fontSizes.sm,
        font: fontBold,
        color: DESIGN.colors.primary
      });
    });

    y = tableY - 28 - DESIGN.spacing.paragraphGap;

    // Table Rows
    const items = invoiceData.cart_items || [];
    items.forEach((item, index) => {
      const rowY = y - (index * 24);
      const itemTotal = (item.price || 0) * (item.quantity || 1);

      // Alternate row background
      if (index % 2 === 0) {
        page.drawRectangle({
          x: DESIGN.spacing.pageMargins,
          y: rowY - 20,
          width: tableWidth,
          height: 24,
          color: DESIGN.colors.light,
          opacity: 0.05
        });
      }

      // Item description
      const description = item.title || 'Item';
      page.drawText(description, {
        x: DESIGN.spacing.pageMargins + 8,
        y: rowY,
        size: DESIGN.typography.fontSizes.sm,
        font: fontRegular,
        color: DESIGN.colors.dark,
        maxWidth: columnWidths.description - 16
      });

      // Quantity
      page.drawText(String(item.quantity || 1), {
        x: DESIGN.spacing.pageMargins + columnWidths.description,
        y: rowY,
        size: DESIGN.typography.fontSizes.sm,
        font: fontRegular,
        color: DESIGN.colors.dark
      });

      // Unit price
      page.drawText(formatCurrency(item.price), {
        x: DESIGN.spacing.pageMargins + columnWidths.description + columnWidths.quantity,
        y: rowY,
        size: DESIGN.typography.fontSizes.sm,
        font: fontRegular,
        color: DESIGN.colors.dark
      });

      // Line total
      page.drawText(formatCurrency(itemTotal), {
        x: DESIGN.spacing.pageMargins + columnWidths.description + columnWidths.quantity + columnWidths.price,
        y: rowY,
        size: DESIGN.typography.fontSizes.sm,
        font: fontRegular,
        color: DESIGN.colors.dark
      });
    });

    // Summary Section
    const summaryWidth = 200;
    const summaryX = width - DESIGN.spacing.pageMargins - summaryWidth;
    const summaryY = y - (items.length * 24) - DESIGN.spacing.sectionGap;

    // Summary background
    page.drawRectangle({
      x: summaryX,
      y: summaryY - 120,
      width: summaryWidth,
      height: 120,
      color: DESIGN.colors.light,
      opacity: 0.05,
      borderColor: DESIGN.colors.primary,
      borderWidth: 1
    });

    // Summary content
    page.drawText('Summary', {
      x: summaryX + 8,
      y: summaryY - 30,
      size: DESIGN.typography.fontSizes.md,
      font: fontBold,
      color: DESIGN.colors.primary
    });

    // Subtotal
    page.drawText('Subtotal:', {
      x: summaryX + 5,
      y: summaryY - 40,
      size: DESIGN.typography.fontSizes.sm,
      font: fontRegular,
      color: DESIGN.colors.dark
    });

    page.drawText(formatCurrency(invoiceData.subtotal || invoiceData.total_amount), {
      x: summaryX + summaryWidth - 8,
      y: summaryY - 50,
      size: DESIGN.typography.fontSizes.sm,
      font: fontRegular,
      color: DESIGN.colors.dark
    });

    // Tax
    if (invoiceData.tax_amount) {
      page.drawText(`Tax (${invoiceData.tax_rate || 0}%):`, {
        x: summaryX + 8,
        y: summaryY - 70,
        size: DESIGN.typography.fontSizes.sm,
        font: fontRegular,
        color: DESIGN.colors.dark
      });

      page.drawText(formatCurrency(invoiceData.tax_amount), {
        x: summaryX + summaryWidth - 8,
        y: summaryY - 70,
        size: DESIGN.typography.fontSizes.sm,
        font: fontRegular,
        color: DESIGN.colors.dark
      });
    }

    // Total
    page.drawText('Total Due:', {
      x: summaryX + 8,
      y: summaryY - 100,
      size: DESIGN.typography.fontSizes.md,
      font: fontBold,
      color: DESIGN.colors.primary
    });

    page.drawText(formatCurrency(invoiceData.total_amount), {
      x: summaryX + summaryWidth - 8,
      y: summaryY - 100,
      size: DESIGN.typography.fontSizes.md,
      font: fontBold,
      color: DESIGN.colors.accent
    });

    // Footer
    const footerY = DESIGN.spacing.pageMargins;
    page.drawLine({
      start: { x: DESIGN.spacing.pageMargins, y: footerY + 20 },
      end: { x: width - DESIGN.spacing.pageMargins, y: footerY + 20 },
      thickness: 0.5,
      color: DESIGN.colors.secondary,
      opacity: 0.3
    });

    const footerText = [
      invoiceData.company?.name || 'Your Company Name',
      'Thank you for your business!',
      invoiceData.company?.support_email ? `Support: ${invoiceData.company.support_email}` : null,
      invoiceData.company?.website ? `Website: ${invoiceData.company.website}` : null
    ].filter(Boolean);

    footerText.forEach((text, i) => {
      page.drawText(text, {
        x: DESIGN.spacing.pageMargins,
        y: footerY - (i * DESIGN.typography.fontSizes.sm * DESIGN.typography.lineHeights.normal),
        size: DESIGN.typography.fontSizes.sm,
        font: i === 0 ? fontBold : fontRegular,
        color: DESIGN.colors.secondary
      });
    });

    const pdfBytes = await pdfDoc.save();
    return pdfBytes;
  } catch (error) {
    console.error("Error generating PDF:", error);
    throw new Error("Failed to generate invoice PDF");
  }
}

export  default generateInvoicePDF ;