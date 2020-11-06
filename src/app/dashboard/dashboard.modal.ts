export interface Dashboard {
    mission_id: [];
    launch_year: string;
    launch_success: string;
    rocket:{
      first_stage:{
        cores:[
          {
            land_success:string;
          }
        ]
      }
    };
    mission_name: string;
    links:[];
  }
  