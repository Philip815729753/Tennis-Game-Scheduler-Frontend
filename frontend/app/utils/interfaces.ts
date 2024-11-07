// define interface
export interface Team {
    key: number;
    competition: string;
    section_code: number;
    section_name: string;
    draw_code: number;
    team_code: number;
    team_name: string;
    team_color: string;
  }
  
  export interface Season {
    id: string;
    name: string;
    teams: Team[];
  }
  

  // define interface
export interface SchedulingTeam {
  key: number;
  competition: string;
  section_code: number;
  section_name: string;
  draw_code: number;
  team_code: number;
  team_name: string;
  team_color: string;
  fixture_number: number;  // new attribute, competition ID
  conflict: boolean;       // new attribute, if a match is conflicted
}

export interface SchedulingSeason {
  id: string;
  name: string;
  teams: SchedulingTeam[];
}