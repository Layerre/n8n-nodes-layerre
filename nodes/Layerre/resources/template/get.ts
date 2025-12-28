import type { INodeProperties } from 'n8n-workflow';

const showOnlyForTemplateGet = {
	operation: ['get'],
	resource: ['template'],
};

export const templateGetDescription: INodeProperties[] = [
	{
		displayName: 'Template ID',
		name: 'templateId',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: showOnlyForTemplateGet,
		},
		description: 'The ID of the template to retrieve',
	},
];

