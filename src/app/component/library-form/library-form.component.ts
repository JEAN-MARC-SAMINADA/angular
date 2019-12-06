import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { typesValidator } from 'src/app/directives/type-validator.directive';
import { LibraryDTO } from 'src/app/shared-data/library-dto';
import { DirectorDTO } from 'src/app/shared-data/director-dto';
import { AdressDTO } from 'src/app/shared-data/adress-dto';
import { LibraryService } from 'src/app/services/library.service';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-library-form',
  templateUrl: './library-form.component.html',
  styleUrls: ['./library-form.component.scss']
})
export class LibraryFormComponent implements OnInit {
  libraryForm = new FormGroup({
    id: new FormControl(''),
    label: new FormControl('', [Validators.required,
    Validators.minLength(4)]),
    type: new FormControl('', [typesValidator()]),
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    city: new FormControl('', [Validators.required]),
    numberStreet: new FormControl(''),
    postalCode: new FormControl(''),
    street: new FormControl(''),
  });

  // Pour injecter un service, il est impératif de mettre dans le constructor en private le service qu'on veut injecter
  constructor(private libraryService: LibraryService,
    private router: Router,
    private route: ActivatedRoute, ) { }



  private library: LibraryDTO;

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    if (id !== undefined && id !== '') {
      this.libraryService.getLibrary(id).subscribe((library) => {
        this.library = library;
        this.libraryForm.controls['id'].setValue(this.library.id);
        this.libraryForm.controls['label'].setValue(this.library.label);
        this.libraryForm.controls['type'].setValue(this.library.type);
        this.libraryForm.controls['firstName'].setValue(this.library.directorDTO.firstname);
        this.libraryForm.controls['lastName'].setValue(this.library.directorDTO.lastname);
        this.libraryForm.controls['city'].setValue(this.library.addressDTO.city);
        this.libraryForm.controls['numberStreet'].setValue(this.library.addressDTO.numberStreet);
        this.libraryForm.controls['postalCode'].setValue(this.library.addressDTO.postalCode);
        this.libraryForm.controls['street'].setValue(this.library.addressDTO.street);
      });
    }
  }

  onSubmit() {
    console.warn(this.libraryForm.value);
    const libraryDTO = new LibraryDTO(this.libraryForm.value.id, this.libraryForm.value.label, this.libraryForm.value.type,
      new AdressDTO(this.libraryForm.value.city, this.libraryForm.value.numberStreet,
        this.libraryForm.value.postalCode, this.libraryForm.value.street),
      new DirectorDTO(this.libraryForm.value.firstName, this.libraryForm.value.lastName));

    console.log(libraryDTO);

    if (libraryDTO.id === null || libraryDTO.id === '') {
      this.libraryService.addLibrary(libraryDTO).subscribe(() => {
        console.log('SuccessADD');
        this.router.navigate(['/liste']);
      },
        (error) => {
          console.log("Une erreur est arrivée: " + error)
        });
    } else {
      this.libraryService.putLibrary(libraryDTO.id, libraryDTO).subscribe(() => {
        console.log('SuccessPUT');
        this.router.navigate(['/liste']);
      },
        (error) => {
          console.log("Une erreur est arrivée: " + error)
        });
    }
  }

  get city() { return this.libraryForm.get('city'); }
  get label() { return this.libraryForm.get('label'); }
  get type() { return this.libraryForm.get('type'); }
}
