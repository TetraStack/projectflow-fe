import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
    layout("routes/auth/auth-layout.tsx", [
        index("routes/root/home.tsx"),
        route("sign-in", "routes/auth/sign-in.tsx"),
        route("sign-up", "routes/auth/sign-up.tsx"),
        route("reset-password", "routes/auth/reset-password.tsx"),
        route("forgot-password", "routes/auth/forgot-password.tsx"),
        route("verify-password", "routes/auth/verify-password.tsx"),
    ])
] satisfies RouteConfig;
