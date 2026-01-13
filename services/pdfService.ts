
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

export const exportComponentToPDF = async (elementId: string, filename: string) => {
  const element = document.getElementById(elementId);
  if (!element) {
    console.error(`Element med ID ${elementId} blev ikke fundet.`);
    return;
  }

  try {
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff'
    });

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.width;
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save(`${filename}.pdf`);
  } catch (error) {
    console.error("Fejl under PDF generering:", error);
  }
};

export const exportAllToPDF = async (containerId: string, filename: string) => {
  const container = document.getElementById(containerId);
  if (!container) return;

  const recipes = container.querySelectorAll('.printable-area');
  if (recipes.length === 0) return;

  try {
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    for (let i = 0; i < recipes.length; i++) {
      const recipe = recipes[i] as HTMLElement;
      const canvas = await html2canvas(recipe, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#ffffff'
      });

      const imgData = canvas.toDataURL('image/png');
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.width;
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      if (i > 0) pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    }

    pdf.save(`${filename}.pdf`);
  } catch (error) {
    console.error("Fejl under batch PDF generering:", error);
  }
};

export const downloadAsHTML = (elementId: string, filename: string) => {
  const element = document.getElementById(elementId);
  if (!element) return;

  const styles = Array.from(document.querySelectorAll('style, link[rel="stylesheet"]'))
    .map(s => s.outerHTML)
    .join('\n');

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>${filename}</title>
      <script src="https://cdn.tailwindcss.com"></script>
      ${styles}
      <style>
        @media print { .no-print { display: none !important; } }
      </style>
    </head>
    <body class="bg-white p-8">
      <div class="max-w-[210mm] mx-auto">
        ${element.innerHTML}
      </div>
    </body>
    </html>
  `;

  const blob = new Blob([htmlContent], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${filename}.html`;
  link.click();
  URL.revokeObjectURL(url);
};
