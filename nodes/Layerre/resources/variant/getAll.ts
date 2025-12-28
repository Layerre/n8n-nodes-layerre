import type { INodeProperties } from 'n8n-workflow';

const showOnlyForVariantGetAll = {
	operation: ['getAll'],
	resource: ['variant'],
};

export const variantGetAllDescription: INodeProperties[] = [
	{
		displayName: 'Template Name or ID',
		name: 'templateId',
		type: 'options',
		typeOptions: {
			loadOptionsMethod: 'getTemplates',
		},
		default: '',
		required: true,
		displayOptions: {
			show: showOnlyForVariantGetAll,
		},
		description: 'The template to list variants for. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
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
			show: showOnlyForVariantGetAll,
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
			show: showOnlyForVariantGetAll,
		},
		options: [
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
