import type { AuthProviderInfo } from "pocketbase";

export interface GroupSwap {
	new_order: number;
	group_id: string;
}

export interface CollectionMove {
	new_order: number;
	collection_id: string;
	group_id?: string;
}

export interface BookmarkMove {
	new_collection_id: string;
}

export interface AuthProviderWithRedirect extends AuthProviderInfo {
	redirect: string;
}
