export interface IClientsDataWithId extends IClientsData {
  id: number;
}

export interface IClientsData {
   num_cotisant: number;
   début_période: date; 
   fin_période: date; 
   type_compte: string;
   nature_activite: string;
   cat_cotisant: string;
   etat_image: string;
}
