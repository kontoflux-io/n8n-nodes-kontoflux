import {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class KontofluxApi implements ICredentialType {
	name = 'kontofluxApi';
	displayName = 'Kontoflux.io API';
	documentationUrl = 'https://api.kontoflux.io';
	properties: INodeProperties[] = [
		{
			displayName: 'API-Key',
			name: 'apiKey',
			type: 'string',
			default: '',
			required: true,
			typeOptions: {
				password: true,
			}
		},
		{
			displayName: 'Workspace ID',
			name: 'workspaceId',
			type: 'string',
			required: true,
			placeholder: 's0m3w0rksp4ce',
			default: '',
		},
	];

	// This allows the credential to be used by other parts of n8n
	// stating how this credential is injected as part of the request
	// An example is the Http Request node that can make generic calls
	// reusing this credential
	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				Authorization: '={{"Bearer " + $credentials.apiKey}}',
			},
		},
	};

	// The block below tells how this credential can be tested
	test: ICredentialTestRequest = {
		request: {
			baseURL: '={{"https://api.kontoflux.io/v1/" + $credentials?.workspaceId.trim()}}',
			url: '/key/scope',
		},
	};
}
