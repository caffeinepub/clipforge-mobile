import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type Time = bigint;
export interface UserProfile {
    name: string;
    entitlement: Entitlement;
}
export interface TemplateMetadata {
    id: string;
    modifiedAt: Time;
    name: string;
    createdAt: Time;
    description: string;
    templateType: TemplateType;
    entitlement: Entitlement;
}
export enum Entitlement {
    pro = "pro",
    free = "free"
}
export enum TemplateType {
    video = "video",
    photo = "photo"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    deleteTemplate(id: string): Promise<void>;
    getAllTemplates(): Promise<Array<TemplateMetadata>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getTemplate(id: string): Promise<TemplateMetadata | null>;
    getTemplatesByEntitlement(entitlement: Entitlement): Promise<Array<TemplateMetadata>>;
    getTemplatesByType(templateType: TemplateType): Promise<Array<TemplateMetadata>>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    saveTemplate(template: TemplateMetadata): Promise<void>;
}
