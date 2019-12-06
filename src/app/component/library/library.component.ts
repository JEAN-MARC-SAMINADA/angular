import { Component, OnInit, Input } from '@angular/core';
import { LibraryDTO } from 'src/app/shared-data/library-dto';
import { ActivatedRoute, Router } from '@angular/router';
import { LibraryService } from 'src/app/services/library.service';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.scss']
})
export class LibraryComponent implements OnInit {
  @Input()
  library: LibraryDTO;
  link: string;



  constructor(private libraryService: LibraryService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.link = "/modifier/" + this.library.id;
  }
  delete() {
    this.libraryService.deleteLibrary(this.library.id).subscribe(() => {
      console.log('SuccessDELETE');
      location.reload();
    });

  }
}
