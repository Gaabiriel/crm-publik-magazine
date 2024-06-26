﻿using Common.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Common.Services.Infrastructure
{
    public interface IIdentityUserRepository<TUser> where TUser : User
    {
        Task Delete(int id, ContextSession session);
        Task<TUser> GetById(int id, ContextSession session, bool includeDeleted = false);
        Task<TUser> GetByLogin(string login, ContextSession session, bool includeDeleted = false);
        Task<IList<TUser>> GetUsersByRole(int roleId, ContextSession session, bool includeDeleted = false);
        Task<IList<TUser>> GetUsersByClaim(string claimType, string claimValue, ContextSession session, bool includeDeleted = false);
        Task<TUser> GetByEmail(string email, ContextSession session, bool includeDeleted = false);
        Task<TUser> Edit(TUser user, ContextSession session);
    }
}
