export interface StoresStockResponse {
	totalNumberOfStores: number;
	storeStocks: StoreStock[];
}

export interface StoreStock {
	store: Store;
	stockBalance: StockBalance;
}

export interface Store {
	siteId: string;
	depotStockId: string;
	alias?: string;
	isDepot: boolean;
	isStore: boolean;
	isActive: boolean;
	isBlocked: boolean;
	isOpen: boolean;
	isBlockedByOrderLimit: boolean;
	isFullAssortmentOrderStore: boolean;
	isBlockedByFullAssortmentOrderLimit: boolean;
	isTastingStore: boolean;
	isActiveForPrepaidOrder: boolean;
	isActiveForPrepaidEmployeeOrder: boolean;
	address: string;
	postalCode: string;
	city: string;
	phone: string;
	county: string;
	openingHours: OpeningHour[];
	parentSiteId: string;
	searchArea: string;
	position: Position;
	informationHeader: string | null;
	informationMessage: string | null;
	lastModified: string;
}

export interface OpeningHour {
	date: string;
	openFrom: string;
	openTo: string;
	reason?: string;
}

export interface Position {
	latitude: number;
	longitude: number;
}

export interface StockBalance {
	productId: string;
	storeId: string;
	shelf?: string;
	stock: number;
}
