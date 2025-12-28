import type { INodeProperties } from 'n8n-workflow';

const showOnlyForTemplateGetAll = {
	operation: ['getAll'],
	resource: ['template'],
};

export const templateGetAllDescription: INodeProperties[] = [
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
			show: showOnlyForTemplateGetAll,
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
		displayName: 'Options',
		name: 'options',
		type: 'collection',
		placeholder: 'Add Option',
		default: {},
		displayOptions: {
			show: showOnlyForTemplateGetAll,
		},
		options: [
			{
				displayName: 'Include Layers',
				name: 'includeLayers',
				type: 'boolean',
				default: false,
				description: 'Whether to include layers in the response (slower for large templates)',
				routing: {
					send: {
						type: 'query',
						property: 'include_layers',
					},
				},
			},
			{
				displayName: 'Skip',
				name: 'skip',
				type: 'number',
				default: 0,
				typeOptions: {
					minValue: 0,
				},
				description: 'Number of results to skip (for pagination)',
				routing: {
					send: {
						type: 'query',
						property: 'skip',
					},
				},
			},
		],
	},
];
