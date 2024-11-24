export interface Discount {
	id: number;
	name: string;
	startDate: string;
	endDate: string;
	discountAmount: number;
	category: string;
}

export type Tab = {
	key: string;
	label: string;
};

export type TableHeader = {
	text: string;
	value: string;
};

export type TableItem = {
	[x: string]: any;
};

export type Option = {
	value: string;
	label: string;
};
