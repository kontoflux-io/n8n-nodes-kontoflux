import type { IDataObject, ILoadOptionsFunctions, INodePropertyOptions } from 'n8n-workflow';

import { apiRequest } from '../transport';


export async function getAccounts(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
    const accounts = await apiRequest.call(
        this,
        'GET',
        '/accounts',
    );
    const returnData = accounts.map((o: any) => ({
        name: o.name + ' (' + o.iban + ')',
        value: o.id,
        description: (o.bank?.name ?? '') + ' ' + (o.bank?.blz ?? ''),
    })) as INodePropertyOptions[];
    return returnData;
}   

export async function getCategories(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
    const categories = await apiRequest.call(
        this,
        'GET',
        '/categories',
    );
    const returnData = categories.map((o: IDataObject) => ({
        name: o.name,
        value: o.id
    })) as INodePropertyOptions[];
    return returnData;
};