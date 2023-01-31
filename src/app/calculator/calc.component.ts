import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
// import { MatDialog } from '@angular/material/dialog';
// import { DayDialogComponent } from './day-dialog/day-dialog.component';

const DAY_MS = 60 * 60 * 24 * 1000;

@Component({
  selector: 'app-calculator',
  templateUrl: './calc.component.html',
  styleUrls: ['./calc.component.scss'],
})
export class CalculatorComponent implements OnInit {
  // days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  date = new Date();
  @Output() selected = new EventEmitter();

  constructor() {
    // this.dates = this.getCalendarDays(this.date);
  }

  ngOnInit(): void {}

  // openDialog() {
  //   let dialogRef = this.dialog.open(DayDialogComponent, {
  //     data: this.selectedDate,
  //     panelClass: 'custom-modal'
  //   })

  //   dialogRef.afterClosed().subscribe(res => {
  //     // received data from dialog-component
  //     if (res){
  //       console.log(res.data)
  //     }
  //   })
  // }

  // setDate(date) {
  //   this.selectedDate = date;
  // }

  // setMonth(inc) {
  //   const [year, month] = [this.date.getFullYear(), this.date.getMonth()];
  //   this.date = new Date(year, month + inc, 1);
  //   this.dates = this.getCalendarDays(this.date);
  // }

  // isToday() {
  //   const today = new Date();
  //   const dd = String(today.getDate()).padStart(2, '0');
  //   return dd;
  // }

  // isSameMonth(date) {
  //   return date.getMonth() === this.date.getMonth();
  // }

  // private getCalendarDays(date = new Date) {
  //   const calendarStartTime =  this.getCalendarStartDay(date).getTime();

  //   return this.range(0, 41)
  //     .map(num => new Date(calendarStartTime + DAY_MS * num));
  // }

  // private getCalendarStartDay(date = new Date) {
  //   const [year, month] = [date.getFullYear(), date.getMonth()];
  //   const firstDayOfMonth = new Date(year, month, 1).getTime();

  //   return this.range(1,7)
  //     .map(num => new Date(firstDayOfMonth - DAY_MS * num))
  //     .find(dt => dt.getDay() === 0)
  // }

  // private range(start, end, length = end - start + 1) {
  //   return Array.from({ length }, (_, i) => start + i)
  // }
}
