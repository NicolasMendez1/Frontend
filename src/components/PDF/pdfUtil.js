import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const exportPDF = () => {

    const input = document.getElementById("Horario")
    html2canvas(input,{logging: true, letterRendering: 1, useCORS: true}).then(canvas =>{
            const imgWidth = 208;
            const imgHeight = canvas.height * imgWidth / canvas.width;
            const imgData = canvas.toDataURL("img/png");
            const pdf = new jsPDF("p","mm","a4");
            pdf.addImage(imgData, "PNG",0,0,imgWidth,imgHeight)
            pdf.save("nombreDelPdf.pdf")
        })
    }

export default exportPDF;
