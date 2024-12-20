// // src/auth/roles.guard.ts
// import {
//     Injectable,
//     CanActivate,
//     ExecutionContext,
//   } from '@nestjs/common';
//   import { Reflector } from '@nestjs/core';
//   import { ROLES_KEY } from './roles.decorator';
//   import { Role } from './roles.enum';
  
//   /**
//    * Guard to check roles of the user for route access.
//    */
//   @Injectable()
//   export class RolesGuard implements CanActivate {
//     constructor(private reflector: Reflector) {}
  
//     canActivate(context: ExecutionContext): boolean {
//       // Retrieve roles required for the route.
//       const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
//         context.getHandler(),
//         context.getClass(),
//       ]);
  
//       if (!requiredRoles) {
//         return true; // No roles required, so allow access.
//       }
  
//       const { user } = context.switchToHttp().getRequest();
  
//       // Assuming 'user.role' is available in the request.
//       return requiredRoles.includes(user.role);
//     }
//   }
  