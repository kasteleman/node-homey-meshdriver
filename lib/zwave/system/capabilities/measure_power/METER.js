'use strict';

module.exports = {
	get: 'METER_GET',
	getOpts: {
		getOnStart: true,
	},
	getParserV2: () => ({
		Properties1: {
			Scale: 2,
		},
	}),
	getParserV4: () => ({
		Properties1: {
			'Rate Type': 'Import',
			Scale: 2,
		},
		'Scale 2': 0,
	}),
	report: 'METER_REPORT',
	reportParserV1: report => {
		if (report &&
			report.hasOwnProperty('Meter Type') &&
			(report['Meter Type'] === 'Electric meter' || report['Meter Type'] === 1) &&
			report.hasOwnProperty('Properties1') &&
			report.Properties1.hasOwnProperty('Scale') &&
			report.Properties1.Scale === 2) {
			return report['Meter Value (Parsed)'];
		}
		return null;
	},
	reportParserV2: report => {
		if (report &&
			report.hasOwnProperty('Properties1') &&
			report.Properties1.hasOwnProperty('Meter Type') &&
			(report.Properties1['Meter Type'] === 'Electric meter' || report.Properties1['Meter Type'] === 1) &&
			report.hasOwnProperty('Properties2') &&
			report.Properties2.hasOwnProperty('Scale') &&
			report.Properties2.Scale === 2) {
			return report['Meter Value (Parsed)'];
		}
		return null;
	},
	reportParserV3: report => {
		if (report &&
			report.hasOwnProperty('Properties1') &&
			report.Properties1.hasOwnProperty('Meter Type') &&
			(report.Properties1['Meter Type'] === 'Electric meter' || report.Properties1['Meter Type'] === 1) &&
			report.Properties1.hasOwnProperty('Scale bit 2') &&
			report.Properties1['Scale bit 2'] === false &&
			report.hasOwnProperty('Properties2') &&
			report.Properties2.hasOwnProperty('Scale bits 10') &&
			report.Properties2['Scale bits 10'] === 2) {
			return report['Meter Value (Parsed)'];
		}
		return null;
	},
};
