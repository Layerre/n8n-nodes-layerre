import type { INodeProperties } from 'n8n-workflow';

const showOnlyForTemplateDelete = {
	operation: ['delete'],
	resource: ['template'],
};

export const templateDeleteDescription: INodeProperties[] = [
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
			show: showOnlyForTemplateDelete,
		},
		description: 'The template to delete. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
	},
];
