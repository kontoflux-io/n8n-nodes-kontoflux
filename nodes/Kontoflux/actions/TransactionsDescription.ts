import { INodeProperties } from 'n8n-workflow';

/*
	Operations for the Transactions Resource
*/
export const transactionsOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,

		displayOptions: {
			show: {
				resource: ['transactions'],
			},
		},
		options: [
			{
				name: 'Get All Transactions',
				value: 'getAll',
				description: 'Get all Transactions',
				routing: {
					request: {
						method: 'GET',
						url: '/transactions',
					},
					operations: {
						pagination: {
							type: 'offset',
							properties: {
								limitParameter: 'limit',
								offsetParameter: 'offset',
								pageSize: 250,
								type: 'query',
							},
						},
					},
				},
			},
			{
				name: 'Get Transaction by Identifier',
				value: 'getSingle',
				description: 'Get a single Transaction by ID',
				routing: {
					request: {
						method: 'GET',
						url: '/transactions/{{$node["transactionId"].value}}',
					}
				},
			},
			{
				name: 'Search Transactions',
				value: 'search',
				description: 'Search Transactions by a given search string.',
				routing: {
					request: {
						method: 'GET',
						url: '/transactions/search',
					},
					operations: {
						pagination: {
							type: 'offset',
							properties: {
								limitParameter: 'limit',
								offsetParameter: 'offset',
								pageSize: 250,
								type: 'query',
							},
						},
					},
				},
			},
			{
				name: 'Match Transactions',
				value: 'match',
				description: 'Match Transactions with scoring by a given search string. Implements sophisticated matching algorithms.',
				routing: {
					request: {
						method: 'GET',
						url: '/transactions/match',
					},
					operations: {
						pagination: {
							type: 'offset',
							properties: {
								limitParameter: 'limit',
								offsetParameter: 'offset',
								pageSize: 250,
								type: 'query',
							},
						},
					},
				},
			}
		],
		default: 'getAll',
	},
];


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
				resource: ['transactions'],
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
				resource: ['transactions'],
				operation: ['getAll', 'search', 'match'],
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
			maxValue: 250,
		},
		default: 250,
		description: 'Max number of transactions to return',
	},
	{
		displayName: 'Offset',
		name: 'offset',
		type: 'number',
		displayOptions: {
			show: {
				resource: ['transactions'],
				operation: ['getAll', 'search', 'match'],
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
	},
	{
		displayName: 'Options',
		name: 'options',
		type: 'collection',
		placeholder: 'Add option',
		displayOptions: {
			show: {
				resource: ['transactions'],
				operation: ['getAll', 'search'],
			},
		},
		default: {},
		options: [
			{
				displayName: 'Sort',
				name: 'sort',
				type: 'options',
				options: [
					{ name: 'DESC', value: 'desc' },
					{ name: 'ASC', value: 'asc' },
				],
				routing: {
					send: {
						type: 'query',
						property: 'order',
						value: '={{$value}}',
					},
				},
				default: 'desc',
				description: 'Sort the transactions in the ascending/descending order',
			},
			{
				displayName: 'Sort By',
				name: 'sortBy',
				type: 'options',
				options: [
					{ name: 'Creation Date', value: '_id' },
					{ name: 'Amount', value: 'amount' },
					{ name: 'Booking Date', value: 'bookingDate' },
					{ name: 'Import Date', value: 'valueDate' },
					{ name: 'Value Date', value: 'importDate' },
				],
				routing: {
					send: {
						type: 'query',
						property: 'sortBy',
						value: '={{$value}}',
					},
				},
				required: false,
				default: '_id',
				description: 'Sort the transactions by a given field',
									
			}
		],
	},
];
/*
	Shared Filters for all common Transaction Operations
*/
const commonFilterParams: INodeProperties[] = [
	{
		displayName: 'Filter',
		name: 'filter',
		type: 'collection',
		placeholder: 'Add filter',
		displayOptions: {
			show: {
				resource: ['transactions'],
				operation: ['getAll', 'search', 'match'],
			},
		},
		default: {},
		options: [
			{
				displayName: 'Account',
				name: 'accountId',
				type: 'options',
				required: false,
				default: '',
				hint: 'IBAN or Internal Account ID',
				placeholder: 'DE123456781234',
				typeOptions: { 
					loadOptionsMethod: 'getAccounts',
					searchListMethod: 'getAccounts',
					searchable: true
				},
			},

			{
				displayName: 'Category',
				name: 'category',
				type: 'options',
				required: false,
				typeOptions: {
					loadOptionsMethod: 'getCategories',
					searchListMethod: 'getCategories',
					searchable: true
				},
				default: '',
				hint: 'Exact Category Name or Category ID',
				routing: {
					send: {
						type: 'query',
						property: 'category',
						value: '={{$value}}',
					},
				},
				
				description: 'Filter the transactions by a given category',
			},
			{
				displayName: 'Parent Category',
				name: 'parentCategory',
				type: 'string',
				required: false,
				typeOptions: {
					loadOptionsMethod: 'getCategories',
					searchListMethod: 'getCategories',
					searchable: true
				},
				default: '',
				hint: 'Exact Parent Category Name or Parent Category ID',
				routing: {
					send: {
						type: 'query',
						property: 'parentCategory',
						value: '={{$value}}',
					},
				},
				description: 'Filter the transactions by a given parent category',
			},
			{
				displayName: 'Valued before',
				name: 'valuedBefore',
				type: 'dateTime',
				default: '',
				routing: {
					send: {
						type: 'query',
						property: 'valuedBefore',
						value: '={{$value}}',
					},
				},
				description: 'Filter the transactions valued before a given date',
			},
			{
				displayName: 'Valued after',
				name: 'valuedAfter',
				type: 'dateTime',
				default: '',
				routing: {
					send: {
						type: 'query',
						property: 'valuedAfter',
						value: '={{$value}}',
					},
				},
				description: 'Filter the transactions valued after a given date',
			},
			{
				displayName: 'Booked before',
				name: 'bookedBefore',
				type: 'dateTime',
				default: '',
				routing: {
					send: {
						type: 'query',
						property: 'bookedBefore',
						value: '={{$value}}',
					},
				},
				description: 'Filter the transactions booked before a given date',
			},
			{
				displayName: 'Booked after',
				name: 'bookedAfter',
				type: 'dateTime',
				default: '',
				routing: {
					send: {
						type: 'query',
						property: 'bookedAfter',
						value: '={{$value}}',
					},
				},
				description: 'Filter the transactions booked after a given date',
			},
			{
				displayName: 'Imported before',
				name: 'importedBefore',
				type: 'dateTime',
				default: '',
				routing: {
					send: {
						type: 'query',
						property: 'importedBefore',
						value: '={{$value}}',
					},
				},
				description: 'Filter the transactions imported in Kontoflux before a given date',
			},
			{	
				displayName: 'Imported after',
				name: 'importedAfter',
				type: 'dateTime',
				default: '',
				routing: {
					send: {
						type: 'query',
						property: 'importedAfter',
						value: '={{$value}}',
					},
				},
				description: 'Filter the transactions imported in Kontoflux after a given date',
			},
		],
	}
];

/*
	Search and Match Endpoint Parameters
*/

const searchParams: INodeProperties[] = [ {
	displayName: 'Search String',
	name: 'query',
	type: 'string',
	required: true,
	placeholder: 'Search for a specific transaction',
	displayOptions: {
		show: {
			resource: ['transactions'],
			operation: ['search', 'match'],
		},
	},
	default: '',
	routing: {
		send: {
			type: 'query',
			property: 'query',
			value: '={{$value}}',
		},
	},
	description: 'Specific search string to match against the transactions'
}];

/*
	Get specific Transaction Parameters
*/

const getSingleParams: INodeProperties[] = [
	{
		displayName: 'Transaction ID',
		name: 'transactionId',
		type: 'number',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['transactions'],
				operation: ['getSingle'],
			},
		},
	},
];

export const transactionsFields: INodeProperties[] = [
	...searchParams,
	...paginationParams,
	...commonFilterParams,
	...getSingleParams,
];
