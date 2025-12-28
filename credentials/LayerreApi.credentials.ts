import type {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
	Icon,
} from 'n8n-workflow';

export class LayerreApi implements ICredentialType {
	name = 'layerreApi';

	displayName = 'Layerre API';

	documentationUrl = 'https://docs.layerre.com';

	icon: Icon = 'file:../nodes/Layerre/layerre.svg';

	properties: INodeProperties[] = [
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: { password: true },
			required: true,
			default: '',
			description: 'Your Layerre API key (starts with lyr_)',
		},
		{
			displayName: 'Base URL',
			name: 'baseUrl',
			type: 'string',
			default: 'https://api.layerre.com',
			description: 'The base URL of the Layerre API',
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				Authorization: '=Bearer {{$credentials.apiKey}}',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: '={{$credentials.baseUrl}}',
			url: '/v1/templates',
			method: 'GET',
			qs: {
				limit: 1,
			},
		},
	};
}
