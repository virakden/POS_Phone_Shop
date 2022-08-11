export interface LeadsModel {
  id: string;
  item_name: string;
  brand: string;
  stock_avai: Array<{}>;
  priority: string;
  priorityClass: string;
  isSelected?:any;
}
