import { Component } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UsersService } from './users.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0', visibility: 'hidden' })),
      state('expanded', style({ height: '*', visibility: 'visible' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class UsersComponent {

  disabledSpinner:boolean=false;
  loadData:boolean=true;
  userData:any=[];
  newData:any=[];


  columnsToDisplay = ['username','age','gender','email','phone','birthDate'];
  genderArray=[
    {
      name:"male",
      value:"male",
    },
    {
      name:"female",
      value:"female",
    }
  ];
  dataSource:any

  save:boolean=false;
  expandedElement: any;
  userForm:any=FormGroup;
  private _unsubscribeAll: Subject<any>;


  constructor(
    private _usersService:UsersService,
    private formGroup: FormBuilder,
    public datepipe: DatePipe,
    
  ) {

    this._unsubscribeAll = new Subject();

   }

  ngOnInit(): void {

    this.userForm = this.formGroup.group({
      id:['',[Validators.required]],
      firstName:['',[Validators.required]],
      maidenName:['',[Validators.required]],
      lastName:['',[Validators.required]],
      age:['',[Validators.required]],
      gender:['',[Validators.required]],
      email:['',[Validators.required]],
      phone:['',[Validators.required]],
      birthDate:['',[Validators.required]],
    });

    this.getUserList();
  }
  getUserList()
  {
    this._usersService.getUserList().pipe(takeUntil(this._unsubscribeAll)).subscribe(res=>{
     
      this.userData=res.users;
      this.userData.forEach((element:any) => {
        element.show=false
      });
      this.loadData=false;
       
      });
  }

  
  toggleRow(value:any)
  {
    const foundElement = this.userData.find((elem:any) => elem !== undefined && elem.id === value.id)    
    console.log("The found element is " + JSON.stringify(foundElement));
    const index = this.userData.indexOf(foundElement);
  
    this.userData.forEach((element:any,mainindex:any) => {
      
      if(index!=mainindex)
      {
        element.show=false;
      }
    });
    this.userForm.get('id').setValue(foundElement.id);
    this.userForm.get('firstName').setValue(foundElement.firstName);
    this.userForm.get('maidenName').setValue(foundElement.maidenName);
    this.userForm.get('lastName').setValue(foundElement.lastName);
    this.userForm.get('age').setValue(foundElement.age);
    this.userForm.get('gender').setValue(foundElement.gender);
    this.userForm.get('gender').setValue(foundElement.gender);
    this.userForm.get('email').setValue(foundElement.email);
    this.userForm.get('phone').setValue(foundElement.phone);
    this.userForm.get('birthDate').setValue(foundElement.birthDate);
    
    this.userData[index].show = !this.userData[index].show;
  }


  saveUser()
  {
    this.disabledSpinner=true;
    this.save=true;
    this.newData= this.userData;
    setTimeout(() => {
    this.newData.forEach((element:any) => {

      if(element.id===this.userForm.value.id)
      {
        
        element.firstName = this.userForm.value.firstName;
        element.lastName = this.userForm.value.lastName;
        element.maidenName = this.userForm.value.maidenName;
        element.gender = this.userForm.value.gender;
        element.age = this.userForm.value.age;
        element.email = this.userForm.value.email;
        element.phone = this.userForm.value.phone;
        element.birthDate = this.userForm.value.birthDate;
        element.show = false;
      }
   });

   this.userData=this.newData;
 
    this.disabledSpinner=false;
    this.save=false;
  }, 5000);

   
  }

  closeExpendedDiv(value:any)
  {
    const foundElement = this.userData.find((elem:any) => elem !== undefined && elem.id === value.id)    
    const index = this.userData.indexOf(foundElement);
    this.userData[index].show = !this.userData[index].show;
    this.disabledSpinner=false;
    this.save=false;
  }

}

