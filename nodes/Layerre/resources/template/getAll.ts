import type { INodeProperties } from 'n8n-workflow';

const showOnlyForTemplateGetAll = {
	operation: ['getAll'],
	resource: ['template'],
};

export const templateGetAllDescription: INodeProperties[] = [
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: showOnlyForTemplateGetAll,
		},
		description: 'Whether to return all results or only up to a given limit',
	},
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		default: 50,
		typeOptions: {
			minValue: 1,
			maxValue: 1000,
		},
		displayOptions: {
			show: {
				...showOnlyForTemplateGetAll,
				returnAll: [false],
			},
		},
		description: 'Max number of results to return',
		routing: {
			send: {
				type: 'query',
				property: 'limit',
			},
		},
	},
	{
		displayName: 'Include Layers',
		name: 'includeLayers',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: showOnlyForTemplateGetAll,
		},
		description: 'Whether to include layers in the response (slower for large templates)',
		routing: {
			send: {
				type: 'query',
				property: 'include_layers',
			},
		},
	},
];

