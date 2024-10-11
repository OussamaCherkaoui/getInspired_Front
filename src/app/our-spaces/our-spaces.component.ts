import {Component, OnInit, ViewChild} from '@angular/core';
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatCard, MatCardContent} from "@angular/material/card";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
  MatTable, MatTableDataSource
} from "@angular/material/table";
import {MatIcon} from "@angular/material/icon";
import {MatPaginator} from "@angular/material/paginator";
import {Space} from "../models/space";
import {SpaceService} from "../services/space.service";
import {CurrencyPipe, NgIf, SlicePipe} from "@angular/common";
import {ActivatedRoute, NavigationEnd, Router, RouterLink, RouterOutlet} from "@angular/router";
import {filter} from "rxjs";

@Component({
  selector: 'app-our-spaces',
  standalone: true,
  imports: [
    MatButton,
    MatCard,
    MatCardContent,
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatCell,
    MatCellDef,
    MatHeaderCellDef,
    MatIconButton,
    MatIcon,
    MatHeaderRow,
    MatRow,
    MatPaginator,
    MatHeaderRowDef,
    MatRowDef,
    SlicePipe,
    CurrencyPipe,
    RouterLink,
    RouterOutlet,
    NgIf
  ],
  templateUrl: './our-spaces.component.html',
  styleUrl: './our-spaces.component.css'
})
export class OurSpacesComponent implements OnInit{
  displayedColumns: string[] = ['name', 'description', 'picture', 'price_per_day', 'actions'];
  spaces!: MatTableDataSource<Space>;
  isChildRouteActive: boolean=false;

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  constructor(private spaceService: SpaceService,private router:Router,private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.loadSpaces();
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.isChildRouteActive = this.activatedRoute.firstChild !== null;
      this.loadSpaces();
    });
  }

  loadSpaces() {
    this.spaceService.getAllSpace().subscribe(
      (data: Space[]) => {
        this.spaces = new MatTableDataSource(data);
        // @ts-ignore
        this.spaces.paginator = this.paginator;
      }
    );

  }


  editSpace(spaceId: number) {
    this.router.navigate(['/admin/spaces/ourSpaces/updateSpace', spaceId]);
  }

  deleteSpace(spaceId: number) {
    this.spaceService.deleteSpace(spaceId).subscribe(
      data => {
        this.loadSpaces();
      }
    );
  }
}
