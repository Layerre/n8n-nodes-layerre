import type { INodeProperties } from 'n8n-workflow';

const showOnlyForTemplateGet = {
	operation: ['get'],
	resource: ['template'],
};

export const templateGetDescription: INodeProperties[] = [
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
			show: showOnlyForTemplateGet,
		},
		description: 'The template to retrieve. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
	},
];
