using System;
using System.Text.Json.Serialization;

namespace Application.Profiles
{
    public class UserActivityDto
    {
        public Guid ActivityId { get; set; }
        public string Title { get; set; }
        public string Type { get; set; }
        public DateTime ActivityDate { get; set; }
        [JsonIgnore]
        public string UserName { get; set; }
    }
}