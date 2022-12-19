import type { AuthProviderInfo } from 'pocketbase';

export interface AuthProviderWithRedirect extends AuthProviderInfo {
	redirect: string;
}
