type ApiResponse = {
    success: boolean;
    status: number;
    message?: string;
};

type LoginResponse = ApiResponse & {
    userRole: UserRole
}