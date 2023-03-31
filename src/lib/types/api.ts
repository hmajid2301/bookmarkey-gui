import type { AuthProviderInfo } from "pocketbase";

export interface GroupSwap {
	new_order: number;
	group_id: string;
}

export interface CollectionMove {
	newOrder: number;
	groupId?: string;
}

export interface AuthProviderWithRedirect extends AuthProviderInfo {
	redirect: string;
}
