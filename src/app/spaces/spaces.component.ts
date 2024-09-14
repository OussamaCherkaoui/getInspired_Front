import {Component, OnInit} from '@angular/core';
import {FooterComponent} from "../footer/footer.component";
import {Space} from "../models/space";
import {SpaceService} from "../services/space.service";
import {NgForOf} from "@angular/common";
import {MatButton} from "@angular/material/button";
import {MatCardActions} from "@angular/material/card";
import {MatPaginator, PageEvent} from "@angular/material/paginator";

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

  constructor(private spaceService: SpaceService) {
  }

  ngOnInit(): void {
    this.getAllSpaces();
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

}
