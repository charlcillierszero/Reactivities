using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class DataContext : IdentityDbContext<AppUser>
    {
        public DataContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Activity> Activities { get; set; }
        public DbSet<ActivityAttendee> ActivityAttendees { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<ActivityAttendee>(entity =>
              entity.HasKey(activityAttendee =>
                new { activityAttendee.AppUserId, activityAttendee.ActivityId }));

            builder.Entity<ActivityAttendee>()
              .HasOne(activityAttendee => activityAttendee.AppUser)
              .WithMany(appUser => appUser.Activities)
              .HasForeignKey(activityAttendee => activityAttendee.AppUserId);

            builder.Entity<ActivityAttendee>()
              .HasOne(activityAttendee => activityAttendee.Activity)
              .WithMany(activity => activity.Attendees)
              .HasForeignKey(activityAttendee => activityAttendee.ActivityId);
        }
    }
}