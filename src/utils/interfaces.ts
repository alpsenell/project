import { TableData } from '@/utils/types';

export interface MovieState {
    data: TableData[];
    page: number;
    total: number;
    totalPage: number;
    perPage: number;
    title: string | number;
}
