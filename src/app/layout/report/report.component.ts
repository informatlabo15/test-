import { Component, OnInit } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {

  sanitizer: DomSanitizer
  constructor() { 
 
  }
  
  ngOnInit() {
  }

  public captureScreen()  
  {  
    var generateData = function (amount) {
      var result = [];
      var data =
      {
          id: "0",
          coin: "100",
          game_group: "GameGroup",
          game_name: "XPTO2",
          game_version: "25",
          machine: "20485861",
          vlt: "0"
      };
      for (var i = 0; i < amount; i += 1) {
          data.id = (i + 1).toString();
          result.push(Object.assign({}, data));
      }
      return result;
  };
  
  function createHeaders(keys) {
      var result = [];
      for (var i = 0; i < keys.length; i += 1) {
          result.push({
          'id' : keys[i],
              'name': keys[i],
              'prompt': keys[i],
              'width': 65,
              'align': 'center',
              'padding': 0
          });
      }
      return result;
  }
  
  
  
  var headers = createHeaders(["id", "coin", "game_group", "game_name", "game_version", "machine", "vlt"]);
  
  var doc = new jsPDF({ putOnlyUsedFonts: true, orientation: 'landscape' });
  doc.table(1, 1, generateData(100), headers, { autoSize: true });
 //  doc.save('MYPdf.pdf'); // Generated PDF   
 var doc = new jsPDF();
 //var doc = new jsPDF('landscape');//Horizontal
 
 doc.setProperties({//Set the document properties
   title: 'Title',
   subject: 'This is the subject',		
   author: 'Dragon',
   keywords: 'javascript, web 2.0, ajax',
   creator: 'MEEE'
 });

 doc.setTextColor(0,255,0);
 doc.setFontSize(22);
 doc.setFont("times");
 doc.setFontType("italic");
 doc.text(20, 20, 'Hello world!');//Add text
 
 doc.setTextColor(255,0,0);
 doc.setFontSize(16);
 doc.setFont("helvetica");
 doc.setFontType("bold");
 doc.text(20, 30, 'This is client-side Javascript, pumping out a PDF.');
 
 doc.addPage();//Add page
 
 doc.setLineWidth(1);//To set the line width
 doc.setDrawColor(0,255,0);//Set the pen color
 doc.setFillColor(255,0,0);//Set the fill color
 doc.line(60, 20, 115, 60);//Painting line, two coordinates
 doc.rect(100, 50, 20, 30); //Draw a rectangle, coordinate of the upper left corner, width, height, only the border
 doc.ellipse(20, 20, 20, 10, 'F');//The ellipse, the center coordinates, width, height, and only the edge
 doc.circle(120, 20, 20, 'FD');//Draw a circle, the center coordinates, radius, borders and padding are
 doc.triangle(100, 100, 110, 100, 120, 130, 'FD');
 
 //doc.output('datauri');//Direct output to a new web page
 return this.sanitizer.bypassSecurityTrustHtml(doc.output('datauristring'));//Display in iframe


  }  

}
