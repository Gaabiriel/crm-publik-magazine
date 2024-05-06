using System.Collections.Generic;
using System.IO;

namespace Common.Utils.Services
{
    public interface ICsvService
    {
        IEnumerable<T> GetCsvFileByFilePath<T>(string filePath, string culture);
        IEnumerable<T> GetCsvFileByStream<T>(TextReader stream, string culture);
    }
}
