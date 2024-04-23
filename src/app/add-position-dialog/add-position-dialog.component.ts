import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-position-dialog',
  templateUrl: './add-position-dialog.component.html',
  styleUrls: ['./add-position-dialog.component.css'],
  standalone: true,
  imports: [MatFormFieldModule, MatButtonModule, MatInputModule, CommonModule]
})
export class AddPositionDialogComponent {
  mode: string = ''
  constructor(public dialogRef: MatDialogRef<AddPositionDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.mode = data.mode;
  }
  stockName: string = '';
  average_price: number = 0;
  quantity: number = 0;


  onCancelClick(): void {
    this.dialogRef.close();
  }

  checkMode(): boolean {
    return this.mode == 'add' ? true : false
  }

  savePosition(): void {
    if (this.stockName && this.average_price) {
      const newStock = {
        stock_name: this.stockName,
        average_price: this.average_price,
        shares_owned: this.quantity,
      };
      // Close the dialog and pass the new stock data back to the parent component
      this.dialogRef.close(newStock);
    } else {
      console.error('Stock name and current price are required.');
    }
  }
  handleValue(prop: string, event: Event) {
    const inputElement = event.target as HTMLInputElement;
    (this as any)[prop] = inputElement.value;
  }
}