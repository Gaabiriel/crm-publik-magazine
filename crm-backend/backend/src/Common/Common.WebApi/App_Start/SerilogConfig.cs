using Serilog;
using Serilog.Events;
using Serilog.Sinks.MSSqlServer;
using System.Collections.Generic;
using System.Configuration;
using System.Data;

namespace Common.WebApi
{
    public static class SerilogConfig
    {
        public static void Configure()
        {
            var logDb = ConfigurationManager.ConnectionStrings["localDb"].ConnectionString;
            const string logTable = "Logs";
            var columnOptions = new ColumnOptions
            {
                AdditionalDataColumns = new List<DataColumn>
                {
                    new DataColumn("UserId", typeof(int))
                }
            };
            columnOptions.Store.Remove(StandardColumn.Properties);
            columnOptions.Store.Remove(StandardColumn.MessageTemplate);

            Log.Logger = new LoggerConfiguration()
                .WriteTo.MSSqlServer(
                    connectionString: logDb,
                    tableName: logTable,
                    restrictedToMinimumLevel: LogEventLevel.Debug,
                    autoCreateSqlTable: true,
                    columnOptions:columnOptions
                ).CreateLogger();
        }
    }
}