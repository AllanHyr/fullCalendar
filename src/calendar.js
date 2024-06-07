import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

document.addEventListener('DOMContentLoaded', function() {
    var calendarEl = document.getElementById('calendar');

    var calendar = new Calendar(calendarEl, {
        plugins: [ dayGridPlugin ],
        initialView: 'dayGridMonth'
        // autres options de configuration
    });

    calendar.render();

    document.getElementById('exportButton').addEventListener('click', function() {
        html2canvas(document.querySelector('#calendar')).then(canvas => {
            var imgData = canvas.toDataURL('image/png');
            var pdf = new jsPDF('landscape');
            pdf.addImage(imgData, 'PNG', 10, 10);
            pdf.save('calendar.pdf');
        });
    });
});