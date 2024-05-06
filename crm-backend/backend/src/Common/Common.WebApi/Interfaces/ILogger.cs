using System;

namespace Common.WebApi
{
    public interface ILogger
    {
        void LogError(string message, int userId, Exception ex = null);
        void LogInfo(string message, int userId);
    }
}