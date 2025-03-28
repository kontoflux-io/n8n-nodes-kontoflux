import { INodeProperties } from 'n8n-workflow';

/*
	Operations for the Categories Resource
*/
export const categoriesOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,

		displayOptions: {
			show: {
				resource: ['categories'],
			},
		},
		options: [
			{
				name: 'Get All Categories',
				value: 'getAll',
				description: 'Get all Categories',
				routing: {
					request: {
						method: 'GET',
						url: '/categories',
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
				name: 'Get Category by Identifier',
				value: 'getSingle',
				description: 'Get a single Category by ID',
				routing: {
					request: {
						method: 'GET',
						url: '/categories/{{$node["categoryId"].value}}',
					}
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
				resource: ['categories'],
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
				resource: ['categories'],
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
				resource: ['categories'],
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
	},
];					

export const categoriesFields: INodeProperties[] = [
	...paginationParams,
];
