import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddPositionDialogComponent } from '../add-position-dialog/add-position-dialog.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { StockService } from '../services/stock.service';
import { LoginService } from '../services/login.service';
@Component({
  selector: 'app-position',
  templateUrl: './position.component.html',
  styleUrls: ['./position.component.css'],
  standalone: true,
  imports: [MatCheckboxModule, MatTableModule, MatButtonModule, MatInputModule]
})
export class PositionComponent implements OnInit {
  positions: any[] = []; // Array to store positions
  displayedColumns: string[] = ['select', 'stockName', 'CurrentPrice', "SharesOwned", "AveragePrice"]; // Define columns for table
  username: string | null = ''
  constructor(private dialog: MatDialog, private stockService: StockService, private loginService: LoginService) { }

  ngOnInit(): void {
    // Fetch positions from API or local storage on component initialization
    // Example: this.positions = this.positionService.getPositions();
    let loggedIn = this.loginService.isLoggedIn()
    if (!loggedIn) {
      this.loginService.logout()
    }
    this.username = this.loginService.getUserName()
    const url = `http://localhost:8080/api/stock/getPosition/${this.username}`;
    this.stockService.getPosition(url).subscribe((data: any) => {
      this.positions = data;// Assign the received array of Stock objects to stocks

    })
  }

  openAddDialog(mode: string): void {
    // Open dialog for adding new position
    const dialogRef = this.dialog.open(AddPositionDialogComponent, {
      width: '500px', // Adjust width as needed
      data: { mode } // Pass any data if needed
    });

    dialogRef.afterClosed().subscribe(result => {
      // Handle result from dialog (e.g., add new position)
      if (result) {
        // Add position to the positions array
        result.username = this.username
        this.positions.push(result);
        let url: string = ''
        if (mode == 'add') {
          url = 'http://localhost:8080/api/stock/addPosition';
          this.stockService.addPosition(url, result).subscribe(() => {
            location.reload()
          })
        } else {
          url = `http://localhost:8080/api/stock/updatePosition/${this.username}`;
          this.stockService.editPosition(url, result).subscribe(() => {
            location.reload()
          })
        }

        // Save positions to API or local storage
        // Example: this.positionService.savePositions(this.positions);
      }
    });
  }

  toggleSelection(position: any): void {
    // Toggle selection of a position (for delete/update)
    position.selected = !position.selected;
  }

  deleteSelectedPositions(): void {
    // Delete selected positions
    const selectedStockNames = this.positions
      .filter(position => position.selected)
      .map(position => position.stock_name);
    this.positions = this.positions.filter(position => !position.selected);
    const url = `http://localhost:8080/api/stock/deletePosition/${this.username}`;
    this.stockService.deletePosition(url, selectedStockNames).subscribe(() => {
      location.reload()
    })
    // Save updated positions to API or local storage
    // Example: this.positionService.savePositions(this.positions);
  }
}