import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-header-report',
  templateUrl: './header-report.component.html',
  styleUrls: ['./header-report.component.scss']
})
export class HeaderReportComponent implements OnInit {

  @Input() heading: string;
  @Input() subHeading: string;
  @Input() icon: string;
  constructor() { }

  ngOnInit() {
  }

}
