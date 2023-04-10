export const publicRoutes = ['/event', '/about', '/contact-us', '/terms-and-conditions', '/vote'];

export const authRoutes = ['/auth/sign-in', '/auth/sign-up', '/auth/forgot-password', '/auth/reset-password', '/auth/omniauth'];

export const unAuthenticatedRoutes = [...authRoutes, '/'];

export const universalRoutes = ['/profile'];
export const patronRoutes = ['/share', '/events'];

export const checkIfInPublicRoutes = pathname => publicRoutes.includes(pathname);

export const checkIfInAuthRoutes = pathname => authRoutes.includes(pathname);
export const checkIfInUnAuthenticated = pathname => unAuthenticatedRoutes.includes(pathname);

export const checkIfInPatronRoutes = pathname => (
  [...patronRoutes, ...universalRoutes].includes(pathname)
);

export const checkIfInAuthenticatedRoutes = pathname => (checkIfInPatronRoutes(pathname));
