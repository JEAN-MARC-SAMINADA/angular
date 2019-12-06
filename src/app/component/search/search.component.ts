import { Component, OnInit } from '@angular/core';
import { LibraryService } from 'src/app/services/library.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  rechercheLibrary = '';

  constructor(private libraryservice: LibraryService) { }

  ngOnInit() {
  }

  searchLibrary() {
    console.log(this.rechercheLibrary);
    this.libraryservice.searchValue.next(this.rechercheLibrary);
  }

}
