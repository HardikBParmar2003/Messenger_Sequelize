export interface userData {
  first_name: string;
  last_name: string;
}


export interface Chat {
    sender_id: number;
    receiver_id:number;
    message: string;
    createdAt: Date;
    // add other fields as needed
  }