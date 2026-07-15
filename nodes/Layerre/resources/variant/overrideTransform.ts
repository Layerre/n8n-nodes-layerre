import type { IDataObject } from 'n8n-workflow';

export function transformOverridesList(
	overridesList: Array<Record<string, unknown>>,
): IDataObject[] {
	return overridesList.map((override) => {
		const apiOverride: IDataObject = {
			layer_id: override.layerId as string,
		};

		const overrideOptions = (override.overrideOptions as Record<string, unknown>) || {};

		if (overrideOptions.x !== undefined && overrideOptions.x !== 0) {
			apiOverride.x = overrideOptions.x;
		}
		if (overrideOptions.y !== undefined && overrideOptions.y !== 0) {
			apiOverride.y = overrideOptions.y;
		}

		const properties: IDataObject = {};

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
		if (overrideOptions.rtlEnabled) {
			properties.text_direction = 'rtl';
		}
		if (overrideOptions.letterSpacing !== undefined && overrideOptions.letterSpacing !== 0) {
			properties.letter_spacing = overrideOptions.letterSpacing;
		}
		if (overrideOptions.lineSpacing !== undefined && overrideOptions.lineSpacing !== 1000) {
			properties.line_spacing = overrideOptions.lineSpacing;
		}

		const fontStyle: IDataObject = {};
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

		if (overrideOptions.width && overrideOptions.width !== 0) {
			properties.width = overrideOptions.width;
		}
		if (overrideOptions.height && overrideOptions.height !== 0) {
			properties.height = overrideOptions.height;
		}
		if (overrideOptions.rotation !== undefined && overrideOptions.rotation !== 0) {
			properties.rotation = overrideOptions.rotation;
		}

		if (Object.keys(properties).length > 0) {
			apiOverride.properties = properties;
		}

		return apiOverride;
	});
}
