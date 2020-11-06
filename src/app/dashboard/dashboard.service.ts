import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";
import { map } from "rxjs/operators";
import { Dashboard } from "./dashboard.modal";

// const BACKEND_URL = environment.apiUrl + "/posts/";
const BACKEND_URL = "https://api.spacexdata.com/v3/launches";



@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private dashboards: Dashboard[] = [];
  private dashboardsUpdated = new Subject<{ dashboards: Dashboard[];}>();
  public launchYear = [2006,2007,2008,2009,2010,2011,2012,2013,2014,2015,2016,2017,2018,2019,2020];


  constructor(private http: HttpClient) { }

  getPosts(query: string) {
    // const queryParams = `?pagesize=${postsPerPage}&page=${currentPage}`;
    // const queryParams = `?limit=${limit}`;
    this.http
      .get<[Dashboard]>(
        BACKEND_URL + query
      )
      .pipe(
        map(postData => {
          return {
            posts: postData.map(post => {
              return {
                mission_id:post.mission_id,
                launch_year:post.launch_year ,
                launch_success:post.launch_success ,
                rocket:post.rocket,
                mission_name:post.mission_name ,
                links:post.links
              };
            })
          };
        })
      )
      .subscribe(transformedPostData => {
        this.dashboards = transformedPostData.posts;
        this.dashboardsUpdated.next({
          dashboards: [...this.dashboards]
        });
        console.log(this.dashboards);
      });  
  }

  getPostUpdateListener() {
    return this.dashboardsUpdated.asObservable();
  }

  getLaunchYears() {
    return this.launchYear;
  }



}

