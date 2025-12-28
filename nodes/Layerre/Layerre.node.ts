import {
	NodeConnectionTypes,
	type INodeType,
	type INodeTypeDescription,
	type ILoadOptionsFunctions,
	type INodePropertyOptions,
	type IDataObject,
} from 'n8n-workflow';
import { templateDescription } from './resources/template';
import { variantDescription } from './resources/variant';
import { layerreApiRequest } from './GenericFunctions';

export class Layerre implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Layerre',
		name: 'layerre',
		icon: { light: 'file:layerre.svg', dark: 'file:layerre.dark.svg' },
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Create templates and variants from Canva designs with Layerre',
		defaults: {
			name: 'Layerre',
		},
		usableAsTool: true,
		inputs: [NodeConnectionTypes.Main],
		outputs: [NodeConnectionTypes.Main],
		credentials: [{ name: 'layerreApi', required: true }],
		requestDefaults: {
			baseURL: '={{$credentials.baseUrl || "https://api.layerre.com"}}/v1',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		},
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Template',
						value: 'template',
						description: 'Create and manage templates from Canva designs',
					},
					{
						name: 'Variant',
						value: 'variant',
						description: 'Create variants with layer overrides',
					},
				],
				default: 'template',
			},
			...templateDescription,
			...variantDescription,
		],
	};

	methods = {
		loadOptions: {
			/**
			 * Load templates for dropdown selection
			 */
			async getTemplates(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
				try {
					const templates = await layerreApiRequest.call(this, 'GET', '/v1/templates', {}, { limit: 1000 });
					
					if (!Array.isArray(templates)) {
						return [];
					}

					return templates.map((template: IDataObject) => ({
						name: (template.name as string) || 'Unnamed Template',
						value: template.id as string,
						description: `${template.width}x${template.height} - ${(template.layers as IDataObject[])?.length || 0} layers`,
					}));
				} catch {
					return [];
				}
			},

			/**
			 * Load layers for the selected template
			 */
			async getLayers(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
				try {
					const templateId = this.getCurrentNodeParameter('templateId') as string;
					
					if (!templateId) {
						return [];
					}

					const template = await layerreApiRequest.call(this, 'GET', `/v1/template/${templateId}`) as IDataObject;
					
					if (!template || !Array.isArray(template.layers)) {
						return [];
					}

					return (template.layers as IDataObject[]).map((layer: IDataObject) => {
						const layerType = layer.layer_type as string;
						const properties = (layer.properties as IDataObject) || {};
						let description = `${layerType} layer`;
						
						if (layerType === 'text' && properties.text) {
							const text = properties.text as string;
							description = text.length > 50 ? text.substring(0, 50) + '...' : text;
						}

						return {
							name: `${layer.name as string} (${layerType})`,
							value: layer.id as string,
							description,
						};
					});
				} catch {
					return [];
				}
			},
		},
	};
}
