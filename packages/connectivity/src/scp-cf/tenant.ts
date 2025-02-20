import { JwtPayload } from './jsonwebtoken-type';
import { decodeJwt, getTenantId } from './jwt';
import { getIssuerSubdomain } from './subdomain-replacer';

/**
 * Get the tenant ID of a decoded JWT, based on its `zid` property or, if not available, the `iss` subdomain.
 * @param token - Token to read the tenant ID from.
 * @returns The tenant ID, if available.
 * @internal
 */
export function getTenantIdWithFallback(
  token: string | JwtPayload | undefined
): string | undefined {
  const decodedJwt = token ? decodeJwt(token) : {};
  return getTenantId(decodedJwt) || getIssuerSubdomain(decodedJwt) || undefined;
}

/**
 * Compare two decoded JWTs based on their `tenantId`s.
 * @param userTokenPayload - User JWT payload.
 * @param providerTokenPayload - Provider JWT payload.
 * @returns Whether the tenant is identical.
 * @internal
 */
export function isIdenticalTenant(
  userTokenPayload: JwtPayload,
  providerTokenPayload: JwtPayload
): boolean {
  return getTenantId(userTokenPayload) === getTenantId(providerTokenPayload);
}
