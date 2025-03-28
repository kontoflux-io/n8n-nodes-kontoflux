import { INodeProperties } from 'n8n-workflow';

// When the resource `httpVerb` is selected, this `operation` parameter will be shown.
export const accountsOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,

		displayOptions: {
			show: {
				resource: ['accounts'],
			},
		},
		options: [
			{
				name: 'Get All Accounts',
				value: 'getAll',
				description: 'Get all Bank Accounts with Balances and Informations',
				routing: {
					request: {
						method: 'GET',
						url: '/accounts',
					},
					operations: {
						pagination: {
							type: 'offset',
							properties: {
								limitParameter: 'limit',
								offsetParameter: 'offset',
								pageSize: 100,
								type: 'query',
							},
						},
					},
				},
			},
			{
				name: 'Get Account by Identifier',
				value: 'getSingle',
				description: 'Get a single Bank Account with Balances and Informations',
				routing: {
					request: {
						method: 'GET',
						url: '/accounts/{{$node["accountId"].value}}',
					}
				},
			},
		],
		default: 'getAll',
	},
];

/*
	Endpoint: /accounts
	Method: GET
	Description: Get all Bank Accounts with Balances and Informations
*/
const allAccountsParams: INodeProperties[] = [
	{
		displayName: 'Filter',
		name: 'filter',
		type: 'collection',
		placeholder: 'Add filter',
		displayOptions: {
			show: {
				resource: ['accounts'],
				operation: ['getAll'],
			},
		},
		default: {},
		options: [
	{
		displayName: 'BIC',
		name: 'bic',
		type: 'string',
		required: false,
		default: '',
		placeholder: 'BIC10100',
		description: 'Whether to filter Accounts by BIC',
	},
	{
		displayName: 'BLZ',
		name: 'blz',
		type: 'string',
		required: false,
		default: '',
		placeholder: '10123',
			description: 'Whether to filter Accounts by BLZ',
		},
	],
}];

/*
	Pagination Parameters
*/
const paginationParams: INodeProperties[] = [
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		routing: {
			send: {
				paginate: '={{$value}}',
			},
		},
		displayOptions: {
			show: {
				resource: ['accounts'],
				operation: ['getAll'],
			},
		},
		default: false,
		description: 'Whether to return all results or only up to a given limit',
	},
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		displayOptions: {
			show: {
				resource: ['accounts'],
				operation: ['getAll'],
				returnAll: [false],
			},
		},
		routing: {
			send: {
				type: 'query',
				property: 'limit',
			},
		},
		typeOptions: {
			minValue: 1,
			maxValue: 100,
		},
		default: 100,
		description: 'Max number of accounts to return',
	},
	{
		displayName: 'Offset',
		name: 'offset',
		type: 'number',
		displayOptions: {
			show: {
				resource: ['accounts'],
				operation: ['getAll'],
				returnAll: [false],
			},
		},
		routing: {
			send: {
				type: 'query',
				property: 'offset',
			},
		},
		default: 0,
		description: 'Offset for pagination',
	}
];


/*
	Endpoint: /accounts/{accountId}
	Method: GET
	Mandatory Parameters: accountId (ID or IBAN)
	Description: Get a single Bank Account with Balances and Informations
*/
const getAccountParams: INodeProperties[] = [
	{
		displayName: 'Account Identifier',
		name: 'accountId',
		type: 'options',
		required: true,
		default: '',
		hint: 'IBAN or Internal ID',
		placeholder: 'DE123456781234',
		displayOptions: {
			show: {
				resource: ['accounts'],
				operation: ['getSingle'],
			},
		},
		typeOptions: { 
			loadOptionsMethod: 'getAccounts',
			searchListMethod: 'getAccounts',
			searchable: true
		},
	},
];

export const accountsFields: INodeProperties[] = [
	...getAccountParams,
	...paginationParams,
	...allAccountsParams,
];
