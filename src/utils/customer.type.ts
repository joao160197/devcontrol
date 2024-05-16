export interface CustomersProp{
    id: string;
    name: string;
    phone: string;
    description?: string;
    email: string;
    created_at: Date | null;
    updated_at: Date | null;
    userId: string | null;
}