using Serilog;
using System;
using ILogger = Common.WebApi.ILogger;

namespace Common.WebApi
{
    public class Logger : ILogger
    {
        public void LogError(string message, int userId, Exception ex = null)
        {
            Log.Logger.ForContext("UserId", userId).Error(ex, message);
        }

        public void LogInfo(string message, int userId)
        {
            Log.Logger.ForContext("UserId", userId).Information(message);
        }
    }
}