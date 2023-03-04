export interface Collection {
	id: string;
	name: string;
	bookmarkCount: number;
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

export interface User {
	isLoggedIn: boolean;
	email: string;
	avatar?: string;
	nickname: string;
}
