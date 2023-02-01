export interface Collection {
	id: string;
	name: string;
}

export interface Group {
	id: string;
	name: string;
	collections: Collection[];
}

export interface CollectionGroups {
	collections: Collection[];
	groups?: Group[];
}
