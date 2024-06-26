﻿using Common.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Common.Services.Infrastructure
{
    public interface IUserRepository<TUser> where TUser : User
    {
        Task Delete(int id, ContextSession session);
        Task<TUser> GetByLogin(string login, ContextSession session, bool includeDeleted = false);
        Task<TUser> GetByEmail(string email, ContextSession session, bool includeDeleted = false);
        Task<TUser> Get(int id, ContextSession session, bool includeDeleted = false);
        Task<TUser> Edit(TUser user, ContextSession session);
        Task<IList<TUser>> GetAll(ContextSession session, bool includeDeleted = false);
    }
}
