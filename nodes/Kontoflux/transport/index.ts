import type {
	IDataObject,
	IExecuteFunctions,
	IPollFunctions,
	ILoadOptionsFunctions,
	IHttpRequestMethods,
	IRequestOptions,
} from 'n8n-workflow';
import { ApplicationError } from 'n8n-workflow';

/**
 * Make an API request to Kontoflux
 */
export async function apiRequest(
	this: IExecuteFunctions | ILoadOptionsFunctions | IPollFunctions,
	method: IHttpRequestMethods,
	endpoint: string,
	body: IDataObject = {},
	query?: IDataObject,
	uri?: string,
	option: IDataObject = {},
) {
	query = query || {};
	
	const creds = await this.getCredentials('kontofluxApi');
    const workspaceId = creds.workspaceId.toString().trim();
	const baseUrl = "https://api.kontoflux.io/v1/"+workspaceId;

	if(!workspaceId) {
		throw new ApplicationError("Workspace ID is not set in the credentials");
	}

	const options: IRequestOptions = {
		headers: {
			'content-type': 'application/json; charset=utf-8',
		},
		method,
		body,
		qs: query,
		uri: uri || `${baseUrl}/${endpoint}`,
		json: true,
	};

	if (Object.keys(option).length !== 0) {
		Object.assign(options, option);
	}

	if (Object.keys(body).length === 0) {
		delete options.body;
	}

	return this.helpers.requestWithAuthentication.call(this, 'kontofluxApi', options);
}

export async function apiRequestAllItems(
	this: IExecuteFunctions | ILoadOptionsFunctions | IPollFunctions,
	method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'HEAD',
	endpoint: string,
	body: IDataObject = {},
	query: IDataObject = {},
) {
	const returnData: IDataObject[] = [];

	let responseData;
	query.offset = 0;
	query.limit = 250;

	do {
		responseData = await apiRequest.call(this, method, endpoint, body, query);
		query.offset++;
		returnData.push.apply(returnData, responseData);
	} while (responseData.length !== 0);

	return returnData;
}