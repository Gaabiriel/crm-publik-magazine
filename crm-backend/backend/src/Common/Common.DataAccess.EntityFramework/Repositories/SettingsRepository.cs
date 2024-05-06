using Common.Entities;
using Common.Services.Infrastructure;

namespace Common.DataAccess.EntityFramework
{
    public class SettingsRepository : BaseRepository<Settings, DataContext>, ISettingsRepository
    {
    }
}
