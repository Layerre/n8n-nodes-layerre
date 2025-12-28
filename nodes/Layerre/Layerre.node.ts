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
		icon: 'file:layerre.png',
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
					const templates = await layerreApiRequest.call(
						this,
						'GET',
						'/v1/templates',
						{},
						{
							limit: 100,
							skip: 0,
						},
					);

					if (!Array.isArray(templates)) {
						return [
							{
								name: 'Invalid response from API',
								value: '',
								description: 'Please check your API credentials and try again',
							},
						];
					}

					if (templates.length === 0) {
						return [
							{
								name: 'No Templates Found',
								value: '',
								description: 'Create a template first to see it here',
							},
						];
					}

					// Sort by updated_at (most recent first) - API should do this, but ensure it
					const sortedTemplates = templates.sort((a: IDataObject, b: IDataObject) => {
						const dateA = a.updated_at ? new Date(a.updated_at as string).getTime() : 0;
						const dateB = b.updated_at ? new Date(b.updated_at as string).getTime() : 0;
						return dateB - dateA;
					});

					const options = sortedTemplates.map((template: IDataObject) => {
						const name = (template.name as string) || 'Unnamed Template';
						const id = (template.id as string).substring(0, 8);

						return {
							name: `${name}`,
							value: template.id as string,
							description: `ID: ${id}`,
						};
					});

					// Add info message if we hit the limit
					if (templates.length >= 100) {
						options.push({
							name: '─────────────────────────────',
							value: '',
							description: 'Showing most recent 100 templates. Use Template ID directly if not listed.',
						});
					}

					return options;
				} catch (error) {
					return [
						{
							name: 'Could not load templates',
							value: '',
							description: `${error instanceof Error ? error.message : 'Unknown error'}. Please check your API credentials and try again`,
						},
					];
				}
			},

			/**
			 * Load layers for the selected template
			 */
			async getLayers(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
				try {
					const templateId = this.getCurrentNodeParameter('templateId') as string;

					if (!templateId) {
						return [
							{
								name: 'Please Select a Template First',
								value: '',
								description: 'Choose a template to see its layers',
							},
						];
					}

					const template = (await layerreApiRequest.call(
						this,
						'GET',
						`/v1/template/${templateId}`,
					)) as IDataObject;

					if (!template || !Array.isArray(template.layers)) {
						return [
							{
								name: 'Could not load template layers',
								value: '',
								description: 'Template may not exist or has no layers. Please check the template ID and try again',
							},
						];
					}

					if (template.layers.length === 0) {
						return [
							{
								name: 'No Layers Found',
								value: '',
								description: 'This template has no editable layers',
							},
						];
					}

					// Group and sort layers by type for better UX
					const layers = template.layers as IDataObject[];
					const sortedLayers = layers.sort((a: IDataObject, b: IDataObject) => {
						// Sort by layer type first (text, image, shape), then by name
						const typeOrder: Record<string, number> = { text: 1, image: 2, shape: 3 };
						const typeA = typeOrder[a.layer_type as string] || 99;
						const typeB = typeOrder[b.layer_type as string] || 99;

						if (typeA !== typeB) return typeA - typeB;
						return (a.name as string).localeCompare(b.name as string);
					});

					return sortedLayers.map((layer: IDataObject) => {
						const layerType = layer.layer_type as string;
						const properties = (layer.properties as IDataObject) || {};
						const layerName = layer.name as string;

						// Build better description based on layer type
						let description = `${layerType.charAt(0).toUpperCase() + layerType.slice(1)} layer`;

						if (layerType === 'text' && properties.text) {
							const text = properties.text as string;
							description = text.length > 40 ? `"${text.substring(0, 40)}..."` : `"${text}"`;
						} else if (layerType === 'image' && properties.img_url) {
							const url = properties.img_url as string;
							const fileName = url.split('/').pop() || 'image';
							description = fileName.length > 30 ? fileName.substring(0, 30) + '...' : fileName;
						}

						return {
							name: layerName,
							value: layer.id as string,
							description: description,
						};
					});
				} catch (error) {
					return [
						{
							name: 'Could not load layers',
							value: '',
							description: `${error instanceof Error ? error.message : 'Unknown error'}. Please check the template ID and try again`,
						},
					];
				}
			},

			/**
			 * Load variants for the selected template
			 */
			async getVariants(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
				try {
					const templateId = this.getCurrentNodeParameter('templateId') as string;

					if (!templateId) {
						return [
							{
								name: 'Please Select a Template First',
								value: '',
								description: 'Choose a template to see its variants',
							},
						];
					}

					const variants = await layerreApiRequest.call(
						this,
						'GET',
						`/v1/template/${templateId}/variants`,
						{},
						{ limit: 100 },
					);

					if (!Array.isArray(variants)) {
						return [
							{
								name: 'Invalid response from API',
								value: '',
								description: 'Please check your API credentials and try again',
							},
						];
					}

					if (variants.length === 0) {
						return [
							{
								name: 'No Variants Found',
								value: '',
								description: 'Create a variant for this template first',
							},
						];
					}

					// Sort by created_at (most recent first)
					const sortedVariants = variants.sort((a: IDataObject, b: IDataObject) => {
						const dateA = a.created_at ? new Date(a.created_at as string).getTime() : 0;
						const dateB = b.created_at ? new Date(b.created_at as string).getTime() : 0;
						return dateB - dateA;
					});

					const options = sortedVariants.map((variant: IDataObject, index: number) => {
						const id = (variant.id as string).substring(0, 8);
						const createdAt = variant.created_at
							? new Date(variant.created_at as string).toLocaleDateString()
							: 'Unknown date';

						return {
							name: `Variant #${index + 1} (${createdAt})`,
							value: variant.id as string,
							description: `ID: ${id}`,
						};
					});

					// Add info message if we hit the limit
					if (variants.length >= 100) {
						options.push({
							name: '─────────────────────────────',
							value: '',
							description: 'Showing most recent 100 variants. Use Variant ID directly if not listed.',
						});
					}

					return options;
				} catch (error) {
					return [
						{
							name: 'Could not load variants',
							value: '',
							description: `${error instanceof Error ? error.message : 'Unknown error'}. Please check the template ID and try again`,
						},
					];
				}
			},
		},
	};
}
