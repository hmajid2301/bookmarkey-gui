/**
 * This file was @generated using pocketbase-typegen
 */

export enum Collections {
	BookmarkTags = "bookmark_tags",
	Bookmarks = "bookmarks",
	BookmarksMetadata = "bookmarks_metadata",
	Collections = "collections",
	Groups = "groups",
	NestedCollections = "nested_collections",
	Tags = "tags",
	Users = "users"
}

// Alias types for improved usability
export type IsoDateString = string;
export type RecordIdString = string;

// System fields
export type BaseSystemFields = {
	id: RecordIdString;
	created: IsoDateString;
	updated: IsoDateString;
	collectionId: string;
	collectionName: Collections;
	expand?: { [key: string]: any };
};

export type AuthSystemFields = {
	email: string;
	emailVisibility: boolean;
	username: string;
	verified: boolean;
} & BaseSystemFields;

// Record types for each collection

export type BookmarkTagsRecord = {
	bookmark: RecordIdString;
	tag: RecordIdString;
};

export type BookmarksRecord = {
	collection?: RecordIdString;
	favourite?: boolean;
	custom_order?: number;
	bookmark_metadata: RecordIdString;
	user: RecordIdString;
};

export type BookmarksMetadataRecord = {
	url: string;
	image: string;
	description: string;
	title: string;
};

export type CollectionsRecord = {
	name: string;
	user: RecordIdString;
	group?: RecordIdString;
	custom_order?: number;
};

export type GroupsRecord = {
	user?: RecordIdString;
	name?: string;
	custom_order?: number;
};

export type NestedCollectionsRecord = {
	parent_collection: RecordIdString;
	child_collection: RecordIdString;
};

export type TagsRecord = {
	tag: string;
};

export type UsersRecord = {
	name?: string;
	avatar?: string;
};

// Response types include system fields and match responses from the PocketBase API
export type BookmarkTagsResponse = BookmarkTagsRecord & BaseSystemFields;
export type BookmarksResponse = BookmarksRecord & BaseSystemFields;
export type BookmarksMetadataResponse = BookmarksMetadataRecord & BaseSystemFields;
export type CollectionsResponse = CollectionsRecord & BaseSystemFields;
export type GroupsResponse = GroupsRecord & BaseSystemFields;
export type NestedCollectionsResponse = NestedCollectionsRecord & BaseSystemFields;
export type TagsResponse = TagsRecord & BaseSystemFields;
export type UsersResponse = UsersRecord & AuthSystemFields;

export type CollectionRecords = {
	bookmark_tags: BookmarkTagsRecord;
	bookmarks: BookmarksRecord;
	bookmarks_metadata: BookmarksMetadataRecord;
	collections: CollectionsRecord;
	groups: GroupsRecord;
	nested_collections: NestedCollectionsRecord;
	tags: TagsRecord;
	users: UsersRecord;
};
