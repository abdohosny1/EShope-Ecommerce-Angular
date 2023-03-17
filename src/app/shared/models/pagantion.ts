import { IProduct } from 'src/app/shared/models/Iproduct';
export interface IPaganation {
    pageIndex: number;
    pageSize: number;
    count: number;
    data: IProduct[];
}

export class Paganation implements IPaganation{
  pageIndex!: number;
  pageSize!: number;
  count!: number;
  data: IProduct[]=[  ];
}
