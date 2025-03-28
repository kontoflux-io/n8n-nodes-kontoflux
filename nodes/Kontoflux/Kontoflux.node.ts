import { INodeType, INodeTypeDescription, NodeConnectionType } from 'n8n-workflow';
import { accountsFields, accountsOperations } from './actions/AccountsDescription';
import { transactionsFields, transactionsOperations } from './actions/TransactionsDescription';
import { categoriesFields, categoriesOperations } from './actions/CategoriesDescription';
import { loadOptions } from './methods';

export class Kontoflux implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Kontoflux.io',
		name: 'kontoflux',
		icon: { light: 'file:Kontoflux.svg', dark: 'file:Kontoflux.dark.svg' },
		version: 1,
		group: ['transform'],
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Access your Bank Accounts and Transactions with Kontoflux.io',
		defaults: {
			name: 'Kontoflux.io',
		},	
		inputs: [NodeConnectionType.Main],
		outputs: [NodeConnectionType.Main],
		// @ts-ignore
		usableAsTool: true,
		credentials: [
			{
				name: 'kontofluxApi',
				required: true,
			},
		],
		requestDefaults: {
			baseURL: '={{"https://api.kontoflux.io/v1/" + $credentials?.workspaceId.trim()}}',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		},
		/**
		 * Main Resources for Bank Account Management
		 */
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Accounts',
						value: 'accounts',
					},
					{
						name: 'Transactions',
						value: 'transactions',
					},
					{
						name: 'Categories',
						value: 'categories',
					},
				],
				default: 'transactions',
			},
			// work with Bank Accounts
			...accountsOperations,
			...accountsFields,
			// work with Transactions
			...transactionsOperations,
			...transactionsFields,
			// work with Categories
			...categoriesOperations,
			...categoriesFields,
		],
	};
	methods = {
		loadOptions
	};
	
}
