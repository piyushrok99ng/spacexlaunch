import { Component, OnInit,OnDestroy } from '@angular/core';
import { DashboardService } from "./dashboard.service";
import { Subscription } from "rxjs";
import { Dashboard } from "./dashboard.modal";
import {FormBuilder,FormGroup,Validators} from "@angular/forms";


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy  {

  private postsSub: Subscription;
  posts: Dashboard[] = [];
  launchYear:any;
  launch_success:boolean;
  launch_landing:boolean;
 form: FormGroup = new FormGroup({});

  constructor(
    public dashboardService: DashboardService,
    public fb : FormBuilder
  ) { }

  ngOnInit(): void {

    this.form = this.fb.group({
      launchyear:[null],
      launchyearsuccessful:[null],
      launchyearlanding:[null]
    })

    // const queryParams = `?pagesize=${postsPerPage}&page=${currentPage}`;
    const queryParams = `?limit=${100}`;


    this.dashboardService.getPosts(queryParams);

    this.postsSub = this.dashboardService
      .getPostUpdateListener()
      .subscribe((postData: { dashboards: Dashboard[];}) => {
        this.posts = postData.dashboards;
      });

      this.launchYear = this.dashboardService.getLaunchYears();
      console.log(this.launchYear);


  }

  get f(){
    return this.form.controls;
  }

  ngOnDestroy() {
    this.postsSub.unsubscribe();
  }

  filterClick(data){
    console.log(data);
    // this.form.get('launchyear').setValue(data);
    var check = this.form.get('launchyear').value;


    if(check != null){
      if(check == data){
  this.form.get('launchyear').setValue(null);
 
   this.dashboardService.getPosts(this.filterPosts());
      }else{
  this.form.get('launchyear').setValue(data);
 
   this.dashboardService.getPosts(this.filterPosts());

      }
  }else{
  this.form.get('launchyear').setValue(data);
 
   this.dashboardService.getPosts(this.filterPosts());

  }


  }

  filterLaunch(data){
    console.log(this.form.get('launchyearsuccessful').value);

    var check = this.form.get('launchyearsuccessful').value;

    if(check != null){
        if(check == data){
    this.form.get('launchyearsuccessful').setValue(null);
   this.dashboardService.getPosts(this.filterPosts());

        }else{
    this.form.get('launchyearsuccessful').setValue(data);
   this.dashboardService.getPosts(this.filterPosts());


        }
    }else{
    this.form.get('launchyearsuccessful').setValue(data);
   this.dashboardService.getPosts(this.filterPosts());


    }

    
  }

  filterLanding(data){
    console.log(this.form.get('launchyearlanding').value);
    var check = this.form.get('launchyearlanding').value;

    if(check != null){
        if(check == data){
    this.form.get('launchyearlanding').setValue(null);
   this.dashboardService.getPosts(this.filterPosts());

        }else{
    this.form.get('launchyearlanding').setValue(data);
   this.dashboardService.getPosts(this.filterPosts());


        }
    }else{
    this.form.get('launchyearlanding').setValue(data);
   this.dashboardService.getPosts(this.filterPosts());


    }
  }

  filterPosts(){
    // const queryParams = `?limit=${100}&launch_year=${this.form.get('launchyear').value}`;

    var query;
  //  this.dashboardService.getPosts(queryParams);

    if(this.form.get('launchyear').value!== null){
       query = `?limit=${100}&launch_year=${this.form.get('launchyear').value}`;
        if(this.form.get('launchyearsuccessful').value!== null){
          // query = `?limit=${100}&launch_year=${this.form.get('launchyear').value}&launch_success=${this.form.get('launchyearsuccessful').value}`;

              if(this.form.get('launchyearlanding').value!== null){
                query = `?limit=${100}&launch_year=${this.form.get('launchyear').value}&land_success=${this.form.get('launchyearlanding').value}&launch_success=${this.form.get('launchyearsuccessful').value}`;
      
              }else{
                query = `?limit=${100}&launch_year=${this.form.get('launchyear').value}&launch_success=${this.form.get('launchyearsuccessful').value}`;
              }

        }else{

          if(this.form.get('launchyearlanding').value!== null){
            query = `?limit=${100}&launch_year=${this.form.get('launchyear').value}&land_success=${this.form.get('launchyearlanding').value}`;
  
          }else{
            query = `?limit=${100}&launch_year=${this.form.get('launchyear').value}`;
          }

        }
      
    }else{
      if(this.form.get('launchyearsuccessful').value!== null){
            if(this.form.get('launchyearlanding').value!== null){
              query = `?limit=${100}&land_success=${this.form.get('launchyearlanding').value}&launch_success=${this.form.get('launchyearsuccessful').value}`;
    
            }else{
              query = `?limit=${100}&launch_success=${this.form.get('launchyearsuccessful').value}`;
            }

      }else{

        if(this.form.get('launchyearlanding').value!== null){
          query = `?limit=${100}&land_success=${this.form.get('launchyearlanding').value}`;

        }else{
          query = `?limit=${100}`;
        }

      }
    }

    return query;

  }

}
