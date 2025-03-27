using System;
using System.ComponentModel.DataAnnotations;

namespace UltimateService.Data
{
    public class Event
    {
        [Key]
        public int? Id { get; set; }
        
        [Required]
        public string? Title { get; set; }
        
        [Required]
        public DateTime? Date { get; set; }

        [Required]
        public int? Attendees { get; set; }

        [Required]
        public string? Description { get; set; }

        [Required]
        public string? Group { get; set; }

        [Required]
        public TimeSpan? Time { get; set; }

        [Required]
        public string? Location { get; set; }
    }
}