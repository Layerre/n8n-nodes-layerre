import type { INodeProperties } from 'n8n-workflow';

const showOnlyForTemplateCreate = {
	operation: ['create'],
	resource: ['template'],
};

export const templateCreateDescription: INodeProperties[] = [
	{
		displayName: 'Canva URL',
		name: 'canvaUrl',
		type: 'string',
		default: '',
		required: true,
		typeOptions: {
			maxLength: 2048,
		},
		displayOptions: {
			show: showOnlyForTemplateCreate,
		},
		placeholder: 'e.g. https://www.canva.com/design/DAFxyz123/example',
		description: 'The Canva share URL for the design to import as a template',
		routing: {
			send: {
				type: 'body',
				property: 'canva_url',
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
			show: showOnlyForTemplateCreate,
		},
		options: [
			{
				displayName: 'Tags',
				name: 'tags',
				type: 'string',
				default: '',
				placeholder: 'campaign, summer-2026',
				description:
					'Comma-separated list of tags to apply to this template. Tags organise designs into folders in the Layerre dashboard.',
				routing: {
					send: {
						type: 'body',
						property: 'tags',
						value: '={{ $value.split(",").map(t => t.trim().toLowerCase()).filter(Boolean) }}',
					},
				},
			},
		],
	},
];

