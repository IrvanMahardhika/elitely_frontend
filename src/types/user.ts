export interface User {
  id: number;
  first_name: string;
  last_name: string;
  address: string;
}

export interface GetUserListResponse {
  status: string;
  data: User[];
}
