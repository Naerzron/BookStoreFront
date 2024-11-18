type UserToken = {
    sub: string;
    jti: string;
    userId: string;
    role: UserRole;
    exp: number;
    iss: string;
    aud: string;
};

type UserRole = "Administrador" | "Usuario" | "Default";