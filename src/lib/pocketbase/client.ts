import * as Sentry from "@sentry/node";
import PocketBase from "pocketbase";

export interface CookieAuth {
	loadAuthFromCookie(cookie: string): void;
	exportToCookie(isProd: boolean): string;
	refreshAuth(): Promise<void>;
}

export interface Auth {
	isAuthValid(): boolean;
	refreshAuth(): void;
	logout(): void;
}

export interface AuthEmails {
	sendVerificationEmail(email: string): Promise<void>;
	sendResetPasswordEmail(email: string): Promise<void>;
}

export interface AuthLogin {
	createUser(email: string, password: string): Promise<void>;
	loginWithPassword(email: string, password: string): Promise<void>;
	loginWithOAuth2(
		providerName: string,
		code: string,
		codeVerification: string,
		redirectURL: string
	): Promise<void>;
}

export class PBClient {
	pb: PocketBase;

	constructor(url: string) {
		this.pb = new PocketBase(url);
	}

	loadAuthFromCookie(cookie: string) {
		this.pb.authStore.loadFromCookie(cookie);
	}

	isAuthValid() {
		return this.pb.authStore.isValid;
	}

	async refreshAuth() {
		await this.pb.collection("users").authRefresh();
	}

	exportToCookie(isProd: boolean) {
		return this.pb.authStore.exportToCookie({ secure: isProd, sameSite: "Lax" });
	}

	getAuthModel() {
		return structuredClone(this.pb.authStore.model);
	}

	logout() {
		this.pb.authStore.clear();
	}

	async sendVerificationEmail(email: string) {
		try {
			await this.pb?.collection("users").requestVerification(email);
		} catch (err) {
			Sentry.captureException(err);
			throw Error("Failed to send verification email.");
		}
	}

	async sendPasswordResetEmail(email: string) {
		try {
			await this.pb?.collection("users").requestPasswordReset(email);
		} catch (err) {
			Sentry.captureException(err);
			throw Error("Failed to send password reset email.");
		}
	}

	async createUser(email: string, password: string) {
		try {
			await this.pb.collection("users").create({
				username: "",
				email: email,
				password: password,
				passwordConfirm: password
			});
		} catch (err) {
			Sentry.captureException(err);
			throw Error("Failed to create account.");
		}
	}

	async loginWithPassword(email: string, password: string) {
		try {
			await this.pb.collection("users").authWithPassword(email, password);
		} catch (err) {
			Sentry.captureException(err);
			throw Error("Failed to log you in.");
		}
	}

	async loginWithOAuth2(
		providerName: string,
		code: string,
		codeVerification: string,
		redirectURL: string
	) {
		try {
			await this.pb
				.collection("users")
				.authWithOAuth2(providerName, code, codeVerification, redirectURL);
		} catch (err) {
			Sentry.captureException(err);
			throw Error("Failed to log you in with OAuth2.");
		}
	}
}
