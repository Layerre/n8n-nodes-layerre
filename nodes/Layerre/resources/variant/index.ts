import type { INodeProperties, IExecuteSingleFunctions, IHttpRequestOptions } from 'n8n-workflow';
import { variantCreateDescription } from './create';
import { variantGetDescription } from './get';
import { variantGetAllDescription } from './getAll';
import { variantDeleteDescription } from './delete';

const showOnlyForVariant = {
	resource: ['variant'],
};

/**
 * Transform variant create body to API format
 */
async function transformVariantCreateBody(
	this: IExecuteSingleFunctions,
	requestOptions: IHttpRequestOptions,
): Promise<IHttpRequestOptions> {
	const overridesCollection = this.getNodeParameter('overrides', {}) as { override?: Array<Record<string, unknown>> };
	const variantDimensions = this.getNodeParameter('variantDimensions', {}) as Record<string, unknown>;

	const body: Record<string, unknown> = {};

	// Add dimension overrides if set
	if (variantDimensions.width) {
		body.width = variantDimensions.width;
	}
	if (variantDimensions.height) {
		body.height = variantDimensions.height;
	}

	// Transform overrides to API format
	const overridesList = overridesCollection.override || [];
	if (overridesList.length > 0) {
		body.overrides = overridesList.map((override) => {
			const apiOverride: Record<string, unknown> = {
				layer_id: override.layerId,
			};

			// Get override options (nested collection)
			const overrideOptions = (override.overrideOptions as Record<string, unknown>) || {};

			// Add position if set
			if (overrideOptions.x !== undefined && overrideOptions.x !== 0) {
				apiOverride.x = overrideOptions.x;
			}
			if (overrideOptions.y !== undefined && overrideOptions.y !== 0) {
				apiOverride.y = overrideOptions.y;
			}

			// Build properties object
			const properties: Record<string, unknown> = {};

			// Text properties
			if (overrideOptions.text) {
				properties.text = overrideOptions.text;
			}
			if (overrideOptions.color) {
				properties.color = overrideOptions.color;
			}
			if (overrideOptions.fontSize && overrideOptions.fontSize !== 0) {
				properties.font_size = overrideOptions.fontSize;
			}
			if (overrideOptions.fontName) {
				properties.font_name = overrideOptions.fontName;
			}
			if (overrideOptions.textAlign && overrideOptions.textAlign !== 'left') {
				properties.text_align = overrideOptions.textAlign;
			}
			if (overrideOptions.letterSpacing !== undefined && overrideOptions.letterSpacing !== 0) {
				properties.letter_spacing = overrideOptions.letterSpacing;
			}
			if (overrideOptions.lineSpacing !== undefined && overrideOptions.lineSpacing !== 1000) {
				properties.line_spacing = overrideOptions.lineSpacing;
			}

			// Font style (weight, italic, underline)
			const fontStyle: Record<string, unknown> = {};
			if (overrideOptions.fontWeight) {
				fontStyle.weight = overrideOptions.fontWeight;
			}
			if (overrideOptions.fontItalic) {
				fontStyle.italic = overrideOptions.fontItalic;
			}
			if (overrideOptions.fontUnderline) {
				fontStyle.underline = overrideOptions.fontUnderline;
			}
			if (Object.keys(fontStyle).length > 0) {
				properties.font_style = fontStyle;
			}

			// Image properties
			if (overrideOptions.imgUrl) {
				properties.img_url = overrideOptions.imgUrl;
			}
			if (overrideOptions.opacity !== undefined && overrideOptions.opacity !== 1) {
				properties.opacity = overrideOptions.opacity;
			}
			if (overrideOptions.flipHorizontal) {
				properties.flip_horizontal = overrideOptions.flipHorizontal;
			}
			if (overrideOptions.flipVertical) {
				properties.flip_vertical = overrideOptions.flipVertical;
			}

			// Common properties
			if (overrideOptions.width && overrideOptions.width !== 0) {
				properties.width = overrideOptions.width;
			}
			if (overrideOptions.height && overrideOptions.height !== 0) {
				properties.height = overrideOptions.height;
			}
			if (overrideOptions.rotation !== undefined && overrideOptions.rotation !== 0) {
				properties.rotation = overrideOptions.rotation;
			}

			// Only add properties if there are any
			if (Object.keys(properties).length > 0) {
				apiOverride.properties = properties;
			}

			return apiOverride;
		});
	}

	requestOptions.body = body;
	return requestOptions;
}

export const variantDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showOnlyForVariant,
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				action: 'Create a variant',
				description: 'Create a new variant from a template with layer overrides',
				routing: {
					request: {
						method: 'POST',
						url: '=/template/{{$parameter.templateId}}/variant',
					},
					send: {
						preSend: [transformVariantCreateBody],
					},
				},
			},
			{
				name: 'Delete',
				value: 'delete',
				action: 'Delete a variant',
				description: 'Delete a variant',
				routing: {
					request: {
						method: 'DELETE',
						url: '=/template/{{$parameter.templateId}}/variant/{{$parameter.variantId}}',
					},
				},
			},
			{
				name: 'Get',
				value: 'get',
				action: 'Get a variant',
				description: 'Get a variant by ID',
				routing: {
					request: {
						method: 'GET',
						url: '=/template/{{$parameter.templateId}}/variant/{{$parameter.variantId}}',
					},
				},
			},
			{
				name: 'Get Many',
				value: 'getAll',
				action: 'Get many variants',
				description: 'Get many variants for a template',
				routing: {
					request: {
						method: 'GET',
						url: '=/template/{{$parameter.templateId}}/variants',
					},
				},
			},
		],
		default: 'create',
	},
	...variantCreateDescription,
	...variantGetDescription,
	...variantGetAllDescription,
	...variantDeleteDescription,
];
