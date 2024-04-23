import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-add-stock-dialog',
  templateUrl: './add-stock-dialog-component.component.html',
  styleUrls: ['./add-stock-dialog-component.component.css'],
  standalone: true,
  imports: [MatFormFieldModule, MatButtonModule, MatInputModule]
})
export class AddStockDialogComponent implements OnInit {

  stockName: string = '';
  currentPrice: number = 0;

  constructor(
    public dialogRef: MatDialogRef<AddStockDialogComponent>,
    // @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onSaveClick(): void {
    if (this.stockName && this.currentPrice) {
      const newStock = {
        stock_name: this.stockName,
        current_price: this.currentPrice
      };
      this.dialogRef.close(newStock);
    } else {
      console.error('Stock name and current price are required.');
    }
  }
  public handleValue(prop: string, event: Event) {
    const inputElement = event.target as HTMLInputElement;
    (this as any)[prop] = inputElement.value;
  }

}
