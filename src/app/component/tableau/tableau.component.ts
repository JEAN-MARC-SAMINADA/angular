import { Component, OnInit } from '@angular/core';
import { LibraryDTO } from 'src/app/shared-data/library-dto';
import { AdressDTO } from 'src/app/shared-data/adress-dto';
import { DirectorDTO } from 'src/app/shared-data/director-dto';
import { LibraryService } from 'src/app/services/library.service';

@Component({
  selector: 'app-tableau',
  templateUrl: './tableau.component.html',
  styleUrls: ['./tableau.component.scss']
})
export class TableauComponent implements OnInit {
  libraries: LibraryDTO[];

  constructor(private libraryservice: LibraryService) { }

  ngOnInit() {
    this.libraryservice.getAllLibraries().subscribe((libraries) => { this.libraries = libraries; });
  }

}
