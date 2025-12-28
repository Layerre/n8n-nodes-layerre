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
		placeholder: 'https://www.canva.com/design/...',
		description: 'The Canva share URL for the design to import as a template',
		routing: {
			send: {
				type: 'body',
				property: 'canva_url',
			},
		},
	},
];

