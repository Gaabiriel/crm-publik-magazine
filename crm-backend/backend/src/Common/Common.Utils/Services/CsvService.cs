using CsvHelper;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;

namespace Common.Utils.Services
{
    public class CsvService : ICsvService
    {
        public IEnumerable<T> GetCsvFileByFilePath<T>(string filePath, string culture)
        {
            using (var reader = new StreamReader(filePath))
            //using (var csv = new CsvReader(reader, CultureInfo.GetCultureInfo("es-ES"))) - Sample
            using (var csv = new CsvReader(reader, CultureInfo.GetCultureInfo(culture)))
            {
                return csv.GetRecords<T>().ToList();
            }
        }

        public IEnumerable<T> GetCsvFileByStream<T>(TextReader stream, string culture)
        {
            using (var csv = new CsvReader(stream, CultureInfo.GetCultureInfo(culture)))
            {
                return csv.GetRecords<T>().ToList();
            }
        }
    }
}
