import {Component, OnInit} from '@angular/core';
import {FooterComponent} from "../footer/footer.component";
import {Space} from "../models/space";
import {SpaceService} from "../services/space.service";
import {NgForOf} from "@angular/common";
import {MatButton} from "@angular/material/button";
import {MatCardActions} from "@angular/material/card";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {Role} from "../models/role";
import {Router} from "@angular/router";
import {UserService} from "../services/user.service";
import {DecodejwtService} from "../services/decodejwt.service";
import {MatDialog} from "@angular/material/dialog";
import {SpaceReservationDialogComponent} from "../space-reservation-dialog/space-reservation-dialog.component";
import _default from "chart.js/dist/core/core.interaction";
import dataset = _default.modes.dataset;
import {ConfirmationDialogComponent} from "../confirmation-dialog/confirmation-dialog.component";
import {UserReservationsSpaceComponent} from "../user-reservations-space/user-reservations-space.component";

@Component({
  selector: 'app-spaces',
  standalone: true,
  imports: [
    FooterComponent,
    NgForOf,
    MatButton,
    MatCardActions,
    MatPaginator
  ],
  templateUrl: './spaces.component.html',
  styleUrl: './spaces.component.css'
})
export class SpacesComponent implements OnInit {

  spaces: Space[] = [];
  pagedSpaces:Space[] = [];
  pageSize = 6;
  pageIndex = 0;
  username: string="";
  isLoggedIn: boolean=false;
  isAdmin: boolean=false;
  membreId!: number;

  constructor(private spaceService: SpaceService,private router: Router, private authService: UserService,private decodeJwt: DecodejwtService,private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.getAllSpaces();
    this.verifyAuth();
  }


  getAllSpaces(){
    this.spaceService.getAllSpace().subscribe((data: Space[]) => {
      this.spaces = data;
      this.setPagedSpaces();
    });
  }

  onPageChange(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.setPagedSpaces();
  }

  setPagedSpaces() {
    const startIndex = this.pageIndex * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.pagedSpaces = this.spaces.slice(startIndex, endIndex);
  }

  verifyAuth(){
    this.authService.isLoggedIn.subscribe(
      (loggedIn: boolean) => {
        if (loggedIn)
        {
          this.decodeJwt.getIdByUsername().subscribe(data=>{
            if (data)
            {
              this.membreId=data;
            }
          });
          console.log(this.membreId);
          this.username=this.decodeJwt.getUsernameFromToken();
          this.isLoggedIn = loggedIn;
          if(this.decodeJwt.getRoleFromToken()===Role.ADMIN){
            this.isAdmin=true;
          }
        }
      }
    );
  }

  reserveSpace(id: number | undefined) {
    console.log(this.membreId)
    if (!this.isLoggedIn)
    {
      this.router.navigate(['/logIn']);
    }
    else if (this.isAdmin)
    {
      alert("You Are Admin , You Can' t reserve !!")
    }
    else{
      const dialogRef = this.dialog.open(SpaceReservationDialogComponent, {
        width: '400px',
        data: { spaceId: id, memberId: this.membreId }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result === true) {
          const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
            width: '300px',
            data: { message: 'Votre demande de réservation a été enregistrée avec succès.', username:this.username },
            disableClose: true,
            panelClass: 'custom-dialog-container',
          });
        } else {
          console.log('Réservation annulée');
        }
      });
    }
  }


  getReservedSpaces() {
    if (!this.isLoggedIn)
    {
      this.router.navigate(['/logIn']);
    }
    else if (this.isAdmin)
    {
      alert("You Are Admin , You dont have reserved spaces !!")
    }
    else{
      const dialogRef = this.dialog.open(UserReservationsSpaceComponent, {
        width: '700px',
        data: { memberId: this.membreId }
      });
    }
  }
}
