import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';

import { UserService } from 'src/app/services/user.service';
import { AddUserComponent } from '../add-user/add-user.component';
import { ShowUserComponent } from '../show-user/show-user.component';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'username', 'address', 'contact', 'age', 'experience', 'date', 'star'];

  dataSource: MatTableDataSource<any>;
  users: any;



  constructor(public dialog: MatDialog,
    private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe(data => {
      this.users = data.map(e => {
        return {
          id: e.payload.doc.id,
          username: e.payload.doc.data()['username'],
          address: e.payload.doc.data()['address'],
          contact: e.payload.doc.data()['contact'],
          age: e.payload.doc.data()['age'],
          experience: e.payload.doc.data()['experience'],
          date: e.payload.doc.data()['date'],
        };
      })
      console.log(this.users);
      this.dataSource = new MatTableDataSource(this.users);
    })
  }

  addUser() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.minWidth = 700;
    dialogConfig.data = {
      dataSource: this.dataSource
    };
    const dialogRef = this.dialog.open(AddUserComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(
      data => {
        console.log(data)

      }
    );
  }

  showUser(user) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.minWidth = 700;
    dialogConfig.data = {
      user: user
    };
    const dialogRef = this.dialog.open(ShowUserComponent, dialogConfig);

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
